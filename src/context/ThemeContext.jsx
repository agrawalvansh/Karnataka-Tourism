// ThemeContext.js
import React, { createContext, useContext } from 'react';

// Karnataka Tourism Color Palette
const KarnatakaTheme = {
  colors: {
    // Primary Colors
    forestGreen: '#1E5631',
    goldenYellow: '#F2B705',
    earthyBrown: '#8B4513',
    
    // Secondary Colors
    skyBlue: '#7EC8E3',
    sunsetOrange: '#FF7F50',
    cream: '#FFF8DC',
    
    // Accent Colors
    deepPurple: '#4B0082',
    leafGreen: '#78C850',
    
    // Functional Colors
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#FFFFFF',
      accent: '#1E5631',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#FFF8DC',
      accent: '#F8F5E6',
    },
    border: {
      light: '#E0E0E0',
      medium: '#C0C0C0',
      dark: '#1E5631',
    }
  },
  
  typography: {
    fontFamily: {
      heading: "'Montserrat', sans-serif", // Replace with your preferred font
      body: "'Open Sans', sans-serif",      // Replace with your preferred font
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },
  
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '2.5rem',  // 40px
    '3xl': '3rem',    // 48px
  },
  
  borderRadius: {
    sm: '0.125rem',   // 2px
    md: '0.25rem',    // 4px
    lg: '0.5rem',     // 8px
    xl: '1rem',       // 16px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },
  
  // Brand-specific elements
  brandElements: {
    
    gradients: {
      forestSunset: 'linear-gradient(to right, #1E5631, #FF7F50)',
      skyWater: 'linear-gradient(to bottom, #7EC8E3, #1E5631)',
      culturalVibrance: 'linear-gradient(135deg, #F2B705, #4B0082)',
    }
  }
};

// Create Context
const ThemeContext = createContext(KarnatakaTheme);

// Theme Provider Component
export const KarnatakaThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={KarnatakaTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme
export const useKarnatakaTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useKarnatakaTheme must be used within a KarnatakaThemeProvider');
  }
  return theme;
};

export default KarnatakaTheme;