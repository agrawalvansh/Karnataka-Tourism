// ui/Hero.js
import React from 'react';
import { useKarnatakaTheme } from '../../context/ThemeContext';

const Hero = ({ title, subtitle, backgroundImage }) => {
  const theme = useKarnatakaTheme();

  return (
    <div 
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 
          className="text-5xl md:text-6xl font-bold mb-6" 
          style={{
            fontFamily: theme.typography.fontFamily.heading,
            color: theme.colors.text.light,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          {title}
        </h1>
        <p 
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
          style={{
            fontFamily: theme.typography.fontFamily.body,
            color: theme.colors.cream,
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
          }}
        >
          {subtitle}
        </p>
        <button 
          className="px-8 py-3 text-lg font-semibold rounded-md shadow-lg transform transition-transform hover:scale-105"
          style={{
            backgroundColor: theme.colors.goldenYellow,
            color: theme.colors.forestGreen,
            fontFamily: theme.typography.fontFamily.body,
            fontWeight: theme.typography.fontWeight.semibold
          }}
        >
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Hero;