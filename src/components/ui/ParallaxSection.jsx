// ui/ParallaxSection.js
import React from 'react';

const ParallaxSection = ({ backgroundImage, height, children }) => {
  return (
    <div 
      className="relative flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: height || '50vh'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;