// providers/LenisProvider.tsx
'use client';

import Lenis from 'lenis';
import {type ReactNode, useEffect } from 'react';

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    //   smoothTouch: false,
      touchMultiplier: 2,
    });

    // Add event listener to check if we should prevent Lenis from handling scroll
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the scroll event comes from a scrollable container
      const scrollableContainer = target.closest('[data-lenis-prevent]');
      
      if (scrollableContainer) {
        // If it's a scrollable container, prevent Lenis from handling this scroll
        e.stopPropagation();
        return;
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      document.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, []);

  return <>{children}</>;
}