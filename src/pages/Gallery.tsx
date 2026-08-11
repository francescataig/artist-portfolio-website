
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

// Video path for gallery background
const galleryVideo = '/videos/gallery-background.mp4';

// Every image inside src/assets/gallery is picked up automatically when the site
// is built, so adding artwork is just a matter of uploading a file to that folder.
// Images are shown in filename order — the numeric prefixes control the sequence.
const images = Object.entries(
  import.meta.glob<string>(
    '../assets/gallery/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF}',
    { eager: true, query: '?url', import: 'default' }
  )
)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, url]) => url);

const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload only the upcoming image instead of the whole gallery, so clicking
  // through stays instant however many artworks are in the folder.
  useEffect(() => {
    if (images.length === 0) return;
    const nextIndex = currentImageIndex === null ? 0 : (currentImageIndex + 1) % images.length;
    const img = new Image();
    img.src = images[nextIndex];
  }, [currentImageIndex]);

  const handleGalleryClick = () => {
    if (images.length === 0) return;
    if (currentImageIndex === null) {
      setCurrentImageIndex(0);
      setImageLoaded(false);
    } else {
      setImageLoaded(false);
      setCurrentImageIndex((prevIndex) => (prevIndex! + 1) % images.length);
    }
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully');
    setImageLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Failed to load image: ${images[currentImageIndex ?? 0]}`);
    console.error('Error event:', e);
  };

  return (
    <Layout videoSrc={galleryVideo}>
      {/* Make the entire page clickable by applying onClick to a div that fills the entire layout */}
      <div
        className="absolute inset-0 cursor-pointer z-10"
        onClick={handleGalleryClick}
      ></div>
      <div className="gallery-container h-full w-full flex items-center justify-center pointer-events-none">
        {currentImageIndex !== null ? (
          <div className="max-w-4xl mx-auto transition-all duration-500 ease-in-out">
            <img
              src={images[currentImageIndex]}
              alt={`Artwork ${currentImageIndex + 1} by Francesca Taiganides`}
              className={`max-h-[80vh] max-w-full object-contain shadow-lg ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <p className="text-white text-xs md:text-sm font-light mt-2 opacity-70 text-center">
              Artwork {currentImageIndex + 1} of {images.length} - Click anywhere for next
            </p>
          </div>
        ) : (
          <p className="text-white text-base font-light opacity-70 animate-pulse">
            Click anywhere to reveal artwork
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
