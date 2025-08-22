import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Show indicator when scrolling
      setIsScrolling(true);
      
      // Calculate scroll progress
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollProgress(progress);

      // Hide indicator after scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isScrolling && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed top-1/2 right-4 -translate-y-1/2 z-40"
        >
          {/* Progress bar container */}
          <div className="relative">
            <div className="w-1 h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg">
              <motion.div
                className="w-full bg-gradient-to-t from-[#1c2d56] to-blue-500 rounded-full"
                style={{
                  height: `${scrollProgress}%`,
                  transformOrigin: 'bottom'
                }}
                initial={{ height: 0 }}
                animate={{ height: `${scrollProgress}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
            
            {/* Progress percentage */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-lg">
              <span className="text-xs font-medium text-gray-700">
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}