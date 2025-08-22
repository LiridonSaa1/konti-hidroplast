import { useEffect, useState } from "react";

interface UseCounterAnimationProps {
  end: number;
  start?: number;
  duration?: number;
  isActive: boolean;
}

export function useCounterAnimation({
  end,
  start = 0,
  duration = 2000,
  isActive,
}: UseCounterAnimationProps) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(start + (end - start) * easeOutCubic);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, start, duration, isActive]);

  return count;
}
