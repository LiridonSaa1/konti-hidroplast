import { useState, useEffect } from "react";
import logoPath from "@assets/urban-rohr-logo.svg";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start fade out animation
          setTimeout(() => {
            setFadeOut(true);
            // Complete loading after fade animation
            setTimeout(() => {
              onLoadingComplete();
            }, 500);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-gray-100 flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Logo with subtle animation */}
        <div className="animate-pulse">
          <img
            src={logoPath}
            alt="Urban Rohr"
            className="h-20 w-auto"
          />
        </div>

        {/* Simple loading indicator */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-konti-blue rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-konti-blue rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-konti-blue rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    </div>
  );
}