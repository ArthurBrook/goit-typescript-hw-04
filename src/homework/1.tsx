import React, { ReactNode, useEffect, useRef, RefObject } from "react";

// Опишіть інтерфейс Props
interface ObserverProps {
  children: ReactNode;
  onContentEndVisible: () => void;
}

export function Observer({ children, onContentEndVisible }: ObserverProps) {
  // Використовуйте RefObject з вказанням типу HTMLDivElement
  const endContentRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Використовуйте IntersectionObserverInit для типу options
    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      {/* Використовуйте додатковий div для вказівки кінця вмісту */}
      <div ref={endContentRef} />
    </div>
  );
}
