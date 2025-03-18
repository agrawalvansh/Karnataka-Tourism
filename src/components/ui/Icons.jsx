// Icons.js
import React from 'react';

// Water location icon (lakes, rivers, waterfalls)
export const WaterIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#7EC8E3" stroke="#1E5631" strokeWidth="2"/>
    <path d="M16 7C14.6667 8.5 10.8 13.5 10 17.5C9.2 21.5 12 24.5 16 24.5C20 24.5 22.8 21.5 22 17.5C21.2 13.5 17.3333 8.5 16 7Z" fill="#1E5631"/>
  </svg>
);

// Mountain/Hill location icon
export const MountainIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#F8F5E6" stroke="#1E5631" strokeWidth="2"/>
    <path d="M8 24L16 9L24 24H8Z" fill="#1E5631"/>
    <path d="M12 24L16 16L20 24H12Z" fill="#78C850"/>
  </svg>
);

// Monument/Historical location icon (temples, forts)
export const MonumentIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#FFF8DC" stroke="#1E5631" strokeWidth="2"/>
    <path d="M16 7L10 10V11H22V10L16 7Z" fill="#8B4513"/>
    <rect x="11" y="11" width="10" height="10" fill="#8B4513"/>
    <rect x="12" y="12" width="2" height="9" fill="#FFF8DC"/>
    <rect x="16" y="12" width="2" height="9" fill="#FFF8DC"/>
    <rect x="10" y="21" width="12" height="2" fill="#8B4513"/>
  </svg>
);

// Default landmark icon
export const LandmarkIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#F2B705" stroke="#1E5631" strokeWidth="2"/>
    <circle cx="16" cy="12" r="3" fill="#1E5631"/>
    <path d="M16 15L16 22" stroke="#1E5631" strokeWidth="2"/>
    <path d="M12 19L16 23L20 19" fill="#1E5631"/>
  </svg>
);

// Export all icons as a component that returns the appropriate icon based on type
export const LocationIcon = ({ type }) => {
  switch (type) {
    case 'water':
      return <WaterIcon />;
    case 'mountain':
      return <MountainIcon />;
    case 'monument':
      return <MonumentIcon />;
    default:
      return <LandmarkIcon />;
  }
};

// Helper function to determine icon type from location data
export const getIconTypeFromLocation = (location) => {
  const description = location.fullDescription.toLowerCase();
  
  if (description.includes('lake') || description.includes('reservoir') || description.includes('water')) {
    return 'water';
  } else if (description.includes('mountain') || description.includes('peak') || description.includes('hill')) {
    return 'mountain';
  } else if (description.includes('fort') || description.includes('temple') || description.includes('monument')) {
    return 'monument';
  } else {
    return 'landmark';
  }
};

export default LocationIcon;