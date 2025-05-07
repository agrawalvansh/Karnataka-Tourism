// ui/LocationCard.js
import React from 'react';
import { useKarnatakaTheme } from '../../context/ThemeContext';

const LocationCard = ({ location, theme: propTheme }) => {
  // Use provided theme or get from context
  const theme = propTheme || useKarnatakaTheme();
  
  return (
    <div 
      className="rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
      style={{
        backgroundColor: theme.colors.background.secondary,
        borderLeft: `4px solid ${theme.colors.forestGreen}`
      }}
    >
      <div className="relative">
        <img 
          src={location.image} 
          alt={location.name} 
          className="w-full h-60 object-cover"
        />
        <div className="absolute top-0 right-0 p-2">
          <span 
            className="px-3 py-1 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: location.category === 'Forest' 
                ? theme.colors.forestGreen 
                : location.category === 'Heritage' 
                  ? theme.colors.deepPurple
                  : theme.colors.sunsetOrange,
              color: theme.colors.text.light
            }}
          >
            {location.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 
          className="text-xl font-bold mb-2"
          style={{
            fontFamily: theme.typography.fontFamily.heading,
            color: theme.colors.text.accent
          }}
        >
          {location.name}
        </h3>
        <p 
          className="text-base mb-4"
          style={{
            fontFamily: theme.typography.fontFamily.body,
            color: theme.colors.text.secondary
          }}
        >
          {location.description}
        </p>
        <div className="flex items-center justify-between">
          <span 
            className="text-sm font-medium"
            style={{ color: theme.colors.earthyBrown }}
          >
            {location.region}
          </span>
          <button 
            className="px-4 py-2 rounded-md text-sm font-medium"
            style={{
              backgroundColor: theme.colors.goldenYellow,
              color: theme.colors.forestGreen
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;