import { useRef, useState, useEffect } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const VideoPlayer = ({ videoSrc, posterSrc, title, autoplayOnView = false }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeout = useRef(null);
  
  const [videoWrapperRef, isVisible] = useIntersectionObserver({
    threshold: 0.7,
    rootMargin: '0px',
  });

  useEffect(() => {
    if (isVisible && autoplayOnView && videoRef.current) {
      playVideo();
    } else if (!isVisible && isPlaying && videoRef.current) {
      pauseVideo();
    }
  }, [isVisible, autoplayOnView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      showControlsTemporarily();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setControlsVisible(true);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  const seekVideo = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(pos * 100);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const showControlsTemporarily = () => {
    setControlsVisible(true);
    
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    
    if (isPlaying) {
      controlsTimeout.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    }
  };

  return (
    <div 
      ref={videoWrapperRef}
      className="relative overflow-hidden rounded-lg shadow-xl bg-black aspect-video"
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setControlsVisible(false)}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        playsInline
      />
      
      <div 
        className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 ${
          isPlaying && !controlsVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {!isPlaying && (
          <button
            className="w-20 h-20 rounded-full bg-white bg-opacity-75 hover:bg-opacity-90 flex items-center justify-center transition-transform duration-300 transform hover:scale-110"
            onClick={playVideo}
          >
            <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>
      
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${
          isPlaying && !controlsVisible ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {title && <h3 className="text-white font-medium mb-2">{title}</h3>}
        
        <div className="flex items-center space-x-3">
          <button
            className="text-white hover:text-primary-400 transition-colors"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          
          <div 
            className="relative flex-1 h-2 bg-gray-700 rounded-full cursor-pointer"
            onClick={seekVideo}
          >
            <div 
              className="absolute h-full bg-primary-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;