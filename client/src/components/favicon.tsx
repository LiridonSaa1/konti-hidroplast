import { useEffect } from 'react';

interface FaviconProps {
  href?: string;
}

export function Favicon({ href = '/attached_assets/favicon.svg' }: FaviconProps) {
  useEffect(() => {
    // Update favicon
    const updateFavicon = (href: string) => {
      // Remove existing favicon links
      const existingLinks = document.querySelectorAll('link[rel*="icon"]');
      existingLinks.forEach(link => link.remove());
      
      // Add new favicon
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      link.href = href;
      document.head.appendChild(link);
    };

    updateFavicon(href);
  }, [href]);

  return null; // This component doesn't render anything
}
