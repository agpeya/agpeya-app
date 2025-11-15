import { useEffect, useRef } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function useSwipe(handlers: SwipeHandlers) {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  const minSwipeDistance = 80; // Minimale afstand voor een swipe
  const maxVerticalDistance = 150; // Max verticale beweging voor horizontale swipe
  const edgeThreshold = 80; // Hoe ver van de rand moet de swipe beginnen

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isSwiping.current = false;
      
      // Check of de touch binnen de rand zones begint
      if (touchStartX.current < edgeThreshold || touchStartX.current > window.innerWidth - edgeThreshold) {
        isSwiping.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwiping.current) return;
      
      touchEndX.current = e.touches[0].clientX;
      touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (!isSwiping.current) return;
      
      const distanceX = touchEndX.current - touchStartX.current;
      const distanceY = Math.abs(touchEndY.current - touchStartY.current);

      // Check of het een horizontale swipe is (niet te veel verticaal)
      if (distanceY < maxVerticalDistance && Math.abs(distanceX) > minSwipeDistance) {
        // Swipe naar rechts vanaf linker rand (open linker menu)
        if (distanceX > 0 && touchStartX.current < edgeThreshold) {
          handlers.onSwipeRight?.();
        }
        // Swipe naar links vanaf rechter rand (open rechter menu)
        else if (distanceX < 0 && touchStartX.current > window.innerWidth - edgeThreshold) {
          handlers.onSwipeLeft?.();
        }
      }

      // Reset
      isSwiping.current = false;
      touchStartX.current = 0;
      touchStartY.current = 0;
      touchEndX.current = 0;
      touchEndY.current = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handlers.onSwipeLeft, handlers.onSwipeRight]);
}