// ui/ScrollytellingSection.js
import React from 'react';
import { useKarnatakaTheme } from '../../context/ThemeContext';

const ScrollytellingSection = ({ title, content, backgroundImage, height }) => {
  const theme = useKarnatakaTheme();
  
  return (
    <div 
      className="relative flex items-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(30, 86, 49, 0.9), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: height || '60vh'
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-8 rounded-lg shadow-lg">
          <h2 
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: theme.typography.fontFamily.heading,
              color: theme.colors.text.light
            }}
          >
            {title}
          </h2>
          <p 
            className="text-lg"
            style={{
              fontFamily: theme.typography.fontFamily.body,
              color: theme.colors.cream
            }}
          >
            {content}
          </p>
          <button 
            className="mt-6 px-6 py-2 rounded-md text-sm font-medium transition-colors"
            style={{
              backgroundColor: theme.colors.goldenYellow,
              color: theme.colors.forestGreen,
              fontFamily: theme.typography.fontFamily.body,
              fontWeight: theme.typography.fontWeight.semibold
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrollytellingSection;