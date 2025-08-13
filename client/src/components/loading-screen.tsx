import { useEffect, useState } from "react";
import logoPath from "@assets/Logo-konti_1755091117511.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Simulate minimum loading time
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade out animation to complete before calling onLoadingComplete
      setTimeout(onLoadingComplete, 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center animate-fade-out">
        <div className="text-center">
          <div className="relative">
            <img
              src={logoPath}
              alt="Konti Hidroplast"
              className="h-24 w-auto mx-auto animate-fade-out"
              onLoad={() => setLogoLoaded(true)}
              data-testid="loading-logo"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Logo with reveal animation */}
          <img
            src={logoPath}
            alt="Konti Hidroplast"
            className={`h-24 w-auto mx-auto transition-all duration-1000 ${
              logoLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onLoad={() => setLogoLoaded(true)}
            data-testid="loading-logo"
          />
          
          {/* Subtle pulse animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
        </div>
        
        {/* Loading text */}
        <div className={`mt-6 transition-all duration-1000 delay-500 ${
          logoLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <p className="text-[#1c2d56] font-semibold text-lg tracking-wide">
            KONTI HIDROPLAST
          </p>
          <div className="mt-3 flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#1c2d56] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-[#1c2d56] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-[#1c2d56] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}