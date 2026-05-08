'use client';

import { useEffect } from 'react';

/**
 * CustomCursor Component
 * 
 * This component reverts the website to use the default browser cursor,
 * matching the clean and professional look of taxiserviceksa.com.
 */
export default function CustomCursor() {
  useEffect(() => {
    // Ensure the body cursor is set to auto
    document.body.style.cursor = 'auto';

    // Remove any global styles that might be hiding the default cursor
    const styleTags = document.head.querySelectorAll('style');
    styleTags.forEach(style => {
      if (style.innerHTML.includes('cursor: none !important;')) {
        document.head.removeChild(style);
      }
    });

    // Cleanup function to ensure styles are reset if the component unmounts
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Returning null as we no longer need to render custom cursor elements
  return null;
}
