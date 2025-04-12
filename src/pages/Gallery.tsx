
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

// Video path for gallery background
const galleryVideo = 'public/videos/gallery-background.mp4';

// Actual images from your public/images folder
const images = [
  'public/images/meliadesign.png',
  'public/images/meliapostcard1.png',
  'public/images/melia2.png',
  'public/images/notaigalbum.png',
  'public/images/djnotaig.png',
  'public/images/tiles.png',
  'public/images/madleinmenu.png',
  'public/images/herocover1.png',
  'public/images/carvingprint.png',
  'public/images/phix2.png',
  'public/images/mycenean.png',
  'public/images/eliabnw.png',
  'public/images/shotsign.png',
];

const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('Gallery component mounted');
    // Preload images
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleGalleryClick = () => {
    console.log('Gallery clicked, current index:', currentImageIndex);
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
      <div
        className="gallery-container h-full w-full flex items-center justify-center cursor-pointer"
        onClick={handleGalleryClick}
      >
        {currentImageIndex !== null ? (
          <div className="max-w-4xl mx-auto transition-all duration-500 ease-in-out">
            <img
              src={images[currentImageIndex]}
              alt={`Artwork ${currentImageIndex + 1} by Francesca Taiganides`}
              className={`max-h-[80vh] max-w-full object-contain shadow-lg ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <p className="text-white text-sm font-light mt-2 opacity-70 text-center">
              Artwork {currentImageIndex + 1} of {images.length} - Click for next
            </p>
          </div>
        ) : (
          <p className="text-white text-xl font-light opacity-70 animate-pulse">
            Click anywhere to reveal artwork
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
