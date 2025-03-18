import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Add CSS to hide scrollbar
    document.body.style.overflow = 'auto';
    document.body.style.msOverflowStyle = 'none';  // for IE
    document.body.style.scrollbarWidth = 'none';   // for Firefox
    document.documentElement.style.setProperty('--scroll-bar', 'none'); // for modern browsers
    
    // Add CSS to hide webkit scrollbar
    const style = document.createElement('style');
    style.textContent = `
      ::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
    
    window.scrollTo(0, 0);
    
    // Cleanup function
    return () => {
      document.head.removeChild(style);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;