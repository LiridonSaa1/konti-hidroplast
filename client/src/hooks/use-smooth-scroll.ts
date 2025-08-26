import { useCallback } from 'react';

export interface ScrollOptions {
  duration?: number;
  offset?: number;
  easing?: (t: number) => number;
}

export const useAnimatedScroll = () => {
  const scrollToElement = useCallback((
    elementId: string, 
    options: ScrollOptions = {}
  ) => {
    const {
      duration = 800,
      offset = 0,
      easing = (t: number) => t * t * (3 - 2 * t) // Smooth step easing
    } = options;

    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with id "${elementId}" not found`);
      return;
    }

    const startPosition = window.pageYOffset;
    const targetPosition = element.offsetTop - offset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easing(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  const scrollToContact = useCallback((options?: ScrollOptions) => {
    console.log('scrollToContact called with options:', options);
    scrollToElement('contact', { offset: 80, ...options });
  }, [scrollToElement]);

  return {
    scrollToElement,
    scrollToContact
  };
};