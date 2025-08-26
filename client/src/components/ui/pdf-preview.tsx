import { useEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';

interface PDFPreviewProps {
  url: string;
  className?: string;
  alt?: string;
}

export function PDFPreview({ url, className = "", alt = "PDF Preview" }: PDFPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [url]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
          <div className="text-gray-600 text-sm">Loading PDF...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center bg-red-50 border-2 border-red-200 ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 border border-red-300 rounded-full flex items-center justify-center mx-auto mb-2">
          <FileText className="w-8 h-8 text-red-600" />
        </div>
        <div className="text-red-600 text-sm font-medium">PDF Document</div>
        <div className="text-red-500 text-xs mt-1">Click to View</div>
        <button
          onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
          className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
        >
          Open PDF
        </button>
      </div>
    </div>
  );
}
