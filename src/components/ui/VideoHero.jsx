// VideoHero.js
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VideoHero = ({ 
  videoSrc = "/videos/Hero.mp4" // Default video path
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  
  // Toggle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        
        // Calculate visibility percentage (0 to 1)
        const visiblePercentage = Math.min(
          Math.max(
            (rect.bottom) / rect.height, 
            0
          ),
          1
        );
        
        setIsVisible(visiblePercentage > 0.1); // Consider visible if more than 10% shown
        
        // Adjust volume based on visibility
        if (videoRef.current && !videoRef.current.muted) {
          videoRef.current.volume = Math.max(0, Math.min(visiblePercentage, 1));
        }
        
        // Pause video when not visible at all
        if (visiblePercentage <= 0 && videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        } else if (visiblePercentage > 0 && videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(err => console.log('Auto-play prevented:', err));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-play when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log('Auto-play prevented:', err));
    }
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
        autoPlay
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Mute/Unmute Button */}
      {isVisible && (
        <button 
          onClick={toggleMute}
          className="absolute bottom-8 right-8 p-3 rounded-full bg-black bg-opacity-50 text-white z-10 hover:bg-opacity-70 transition-all"
          aria-label={isMuted ? "Mute video" : "Unmute video"}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}
    </div>
  );
};

export default VideoHero;