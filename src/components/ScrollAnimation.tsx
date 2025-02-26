'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideRight' | 'slideLeft' | 'zoom';
  delay?: number;
  threshold?: number;
  className?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  threshold = 0.1,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px', // Trigger a bit before the element is in view
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fadeIn':
        return 'opacity-0 translate-y-8';
      case 'slideUp':
        return 'opacity-0 translate-y-16';
      case 'slideRight':
        return 'opacity-0 -translate-x-16';
      case 'slideLeft':
        return 'opacity-0 translate-x-16';
      case 'zoom':
        return 'opacity-0 scale-95';
      default:
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        getAnimationClass()
      } ${
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100'
          : ''
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
