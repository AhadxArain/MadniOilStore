import { useEffect, useRef, useState } from 'react';

export type AnimationType = 'fade-in' | 'slide-up' | 'slide-in-left' | 'slide-in-right' | 'scale-in';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollAnimation = (
  animationType: AnimationType = 'fade-in',
  options: UseScrollAnimationOptions = {}
) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, delay]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (!isVisible) {
      switch (animationType) {
        case 'fade-in':
          return `${baseClasses} opacity-0 translate-y-6`;
        case 'slide-up':
          return `${baseClasses} opacity-0 translate-y-12`;
        case 'slide-in-left':
          return `${baseClasses} opacity-0 -translate-x-12`;
        case 'slide-in-right':
          return `${baseClasses} opacity-0 translate-x-12`;
        case 'scale-in':
          return `${baseClasses} opacity-0 scale-95`;
        default:
          return `${baseClasses} opacity-0 translate-y-6`;
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return {
    ref: elementRef,
    className: getAnimationClasses(),
    isVisible
  };
};