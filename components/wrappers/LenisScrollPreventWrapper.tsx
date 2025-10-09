// components/LenisPreventWrapper.tsx
'use client';

import { useEffect } from 'react';

export default function LenisPreventWrapper() {
  useEffect(() => {
    const shouldPreventLenis = (container: Element): boolean => {
      const isScrollable = container.scrollHeight > container.clientHeight;
      
      if (!isScrollable) {
        return false; // Not scrollable, don't prevent
      }

      const isAtTop = container.scrollTop === 0;
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1; // Small buffer

      return !(isAtBottom || isAtTop);
    };

    const updateContainerAttributes = () => {
      const scrollContainers = document.querySelectorAll('.fd-scroll-container');
      
      scrollContainers.forEach(container => {
        const shouldPrevent = shouldPreventLenis(container);
        
        if (shouldPrevent) {
          container.setAttribute('data-lenis-prevent', '');
        } else {
          container.removeAttribute('data-lenis-prevent');
        }
      });
    };

    // MutationObserver for new elements
    const observer = new MutationObserver(() => {
      updateContainerAttributes();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial run
    updateContainerAttributes();

    // Also update on scroll events to handle dynamic content
    const handleScroll = (e: Event) => {
      const target = e.target as Element;
      if (target.classList.contains('fd-scroll-container')) {
        updateContainerAttributes();
      }
    };

    document.addEventListener('scroll', handleScroll, { capture: true });

    return () => {
      observer.disconnect();
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, []);

  return null;
}