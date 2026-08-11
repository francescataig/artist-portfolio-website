import type { Plugin } from 'vite';
import sharp from 'sharp';

/**
 * Longest edge, in pixels, that a bundled image is allowed to keep. The gallery
 * displays artwork at up to 80vh, so this still covers a large retina screen.
 */
const MAX_EDGE = 2400;

/** Encoder quality for images that had to be re-encoded after downscaling. */
const JPEG_QUALITY = 85;
const WEBP_QUALITY = 85;
const AVIF_QUALITY = 60;

const IMAGE_RE = /\.(png|jpe?g|webp|avif)$/i;

const encode = (image: sharp.Sharp, extension: string) => {
  switch (extension) {
    // Lossless: a downscaled artwork should not also get colour-quantised.
    case 'png':
      return image.png({ compressionLevel: 9 });
    case 'jpg':
    case 'jpeg':
      return image.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
    case 'webp':
      return image.webp({ quality: WEBP_QUALITY });
    case 'avif':
      return image.avif({ quality: AVIF_QUALITY });
    default:
      return null;
  }
};

/**
 * Caps the size of images Vite bundles out of src/assets, so an artwork
 * uploaded straight from a phone or camera doesn't get served at its full
 * 12-megapixel size.
 *
 * Images already within MAX_EDGE are passed through completely untouched — no
 * re-encoding, no quantisation, byte-for-byte identical. Only oversized images
 * are resized, and those are re-encoded losslessly where the format allows it.
 * Anything that fails to decode is left as-is rather than failing the build, so
 * one bad upload can't block a deploy.
 *
 * Only runs on build; the dev server always serves the originals.
 */
export default function optimizeImages(): Plugin {
  return {
    name: 'optimize-images',
    apply: 'build',

    async generateBundle(_options, bundle) {
      const resized: string[] = [];
      let savedBytes = 0;

      await Promise.all(
        Object.values(bundle).map(async (output) => {
          if (output.type !== 'asset') return;
          if (!IMAGE_RE.test(output.fileName)) return;
          if (typeof output.source === 'string') return;

          const original = Buffer.from(output.source);
          const extension = output.fileName.split('.').pop()!.toLowerCase();

          try {
            const { width, height } = await sharp(original).metadata();
            if (!width || !height) return;
            if (Math.max(width, height) <= MAX_EDGE) return;

            // .rotate() with no argument bakes in EXIF orientation, which phone
            // photos rely on, and has to happen before the resize.
            const pipeline = encode(
              sharp(original, { failOn: 'none' })
                .rotate()
                .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside' }),
              extension
            );
            if (!pipeline) return;

            const optimized = await pipeline.toBuffer();

            // Re-encoding can inflate an already-efficient file; keep the
            // smaller of the two so this can never make the site heavier.
            if (optimized.byteLength < original.byteLength) {
              output.source = optimized;
              savedBytes += original.byteLength - optimized.byteLength;
              resized.push(
                `${output.fileName} ${width}x${height} -> max ${MAX_EDGE}px, ` +
                  `${(original.byteLength / 1024 / 1024).toFixed(1)}MB -> ` +
                  `${(optimized.byteLength / 1024 / 1024).toFixed(1)}MB`
              );
            }
          } catch (error) {
            this.warn(
              `Could not optimize ${output.fileName}, using it as-is: ${
                error instanceof Error ? error.message : error
              }`
            );
          }
        })
      );

      if (resized.length > 0) {
        this.info(
          `optimize-images: resized ${resized.length} oversized image(s), ` +
            `saving ${(savedBytes / 1024 / 1024).toFixed(1)}MB\n  ` +
            resized.join('\n  ')
        );
      }
    },
  };
}
