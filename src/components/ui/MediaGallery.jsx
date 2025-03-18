import { useState } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const MediaGallery = ({ media = [] }) => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [galleryRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const openModal = (index) => {
    setSelectedItem(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  const navigateItem = (direction) => {
    const newIndex = selectedItem + direction;
    if (newIndex >= 0 && newIndex < media.length) {
      setSelectedItem(newIndex);
    }
  };

  const isVideo = (src) => {
    return src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
  };

  const renderThumbnail = (item, index) => {
    if (isVideo(item.src)) {
      return (
        <video
          src={item.src}
          className="w-full h-full object-cover"
          muted
          preload="metadata"
        />
      );
    } else {
      return (
        <img
          src={item.src}
          alt={item.alt || `Gallery item ${index + 1}`}
          className="w-full h-full object-cover"
        />
      );
    }
  };

  const renderModalContent = (item, index) => {
    if (isVideo(item.src)) {
      return (
        <video
          src={item.src}
          alt={item.alt || `Gallery item ${index + 1}`}
          className="max-w-full max-h-[80vh] object-contain"
          controls
          autoPlay
        />
      );
    } else {
      return (
        <img
          src={item.src}
          alt={item.alt || `Gallery item ${index + 1}`}
          className="max-w-full max-h-[80vh] object-contain"
        />
      );
    }
  };

  return (
    <div ref={galleryRef}>
      <div 
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {media?.map((item, index) => (
          <div 
            key={index}
            className="aspect-square overflow-hidden rounded-lg cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => openModal(index)}
          >
            {renderThumbnail(item, index)}
          </div>
        ))}
      </div>

      {selectedItem !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {renderModalContent(media[selectedItem], selectedItem)}
            
            <div className="absolute top-2 right-2">
              <button
                className="bg-black bg-opacity-25 hover:bg-opacity-50 rounded-full p-2 text-white transition-all"
                onClick={closeModal}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
              <p>{media[selectedItem].caption || ''}</p>
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  className={`bg-black bg-opacity-25 hover:bg-opacity-50 rounded-full p-2 transition-all ${
                    selectedItem === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                  }`}
                  onClick={() => navigateItem(-1)}
                  disabled={selectedItem === 0}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className={`bg-black bg-opacity-25 hover:bg-opacity-50 rounded-full p-2 transition-all ${
                    selectedItem === media.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                  }`}
                  onClick={() => navigateItem(1)}
                  disabled={selectedItem === media.length - 1}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;