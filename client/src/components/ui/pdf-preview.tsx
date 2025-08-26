import { useEffect, useRef, useState } from 'react';

interface PDFPreviewProps {
  url: string;
  className?: string;
  alt?: string;
}

export function PDFPreview({ url, className = "", alt = "PDF Preview" }: PDFPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url || !canvasRef.current) return;

    const loadPDF = async () => {
      try {
        console.log('PDFPreview: Starting PDF load for URL:', url);
        setIsLoading(true);
        setError(null);

        // Check if PDF.js is already loaded
        let pdfjsLib = (window as any).pdfjsLib;
        console.log('PDFPreview: PDF.js library available:', !!pdfjsLib);
        
        if (!pdfjsLib) {
          console.log('PDFPreview: Loading PDF.js from CDN...');
          // Load PDF.js from CDN
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = () => {
              console.log('PDFPreview: PDF.js script loaded successfully');
              // Set worker source
              (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
              console.log('PDFPreview: Worker source set');
              resolve();
            };
            script.onerror = () => {
              console.error('PDFPreview: Failed to load PDF.js script from primary CDN, trying fallback...');
              // Try fallback CDN
              const fallbackScript = document.createElement('script');
              fallbackScript.src = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js';
              fallbackScript.onload = () => {
                console.log('PDFPreview: PDF.js script loaded from fallback CDN');
                (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
                console.log('PDFPreview: Fallback worker source set');
                resolve();
              };
              fallbackScript.onerror = () => {
                console.error('PDFPreview: Both CDNs failed');
                reject(new Error('Failed to load PDF.js library from all sources'));
              };
              document.head.appendChild(fallbackScript);
            };
            document.head.appendChild(script);
          });
          
          pdfjsLib = (window as any).pdfjsLib;
          console.log('PDFPreview: PDF.js library loaded:', !!pdfjsLib);
        }

        if (!pdfjsLib) {
          throw new Error('PDF.js library not available');
        }

        console.log('PDFPreview: Loading PDF document...');
        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        console.log('PDFPreview: PDF document loaded, pages:', pdf.numPages);

        // Get the first page
        const page = await pdf.getPage(1);
        console.log('PDFPreview: First page loaded');

        // Set up canvas dimensions
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const context = canvas.getContext('2d');
        if (!context) return;

        // Calculate viewport to fit the canvas
        const viewport = page.getViewport({ scale: 1 });
        const scale = Math.min(
          canvas.width / viewport.width,
          canvas.height / viewport.height
        );
        const scaledViewport = page.getViewport({ scale });

        // Set canvas dimensions
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        console.log('PDFPreview: Rendering page to canvas...');
        // Render the page
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };

        await page.render(renderContext).promise;
        console.log('PDFPreview: Page rendered successfully');
        setIsLoading(false);
      } catch (err) {
        console.error('PDFPreview: Error loading PDF:', err);
        setError('Failed to load PDF preview');
        setIsLoading(false);
      }
    };

    loadPDF();
  }, [url]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-red-50 border-2 border-red-200 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 border border-red-300 rounded-full flex items-center justify-center mx-auto mb-2">
            <div className="text-red-600 font-bold text-lg">PDF</div>
          </div>
          <div className="text-red-600 text-sm font-medium">PDF Document</div>
          <div className="text-red-500 text-xs mt-1">Preview Failed</div>
        </div>
      </div>
    );
  }

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
    <canvas
      ref={canvasRef}
      className={className}
    />
  );
}
