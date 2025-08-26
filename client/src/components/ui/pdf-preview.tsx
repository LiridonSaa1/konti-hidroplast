import { useEffect, useRef, useState } from 'react';

// Dynamic import for pdfjs-dist to avoid build issues
let pdfjsLib: any = null;

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
        setIsLoading(true);
        setError(null);

        // Dynamically import pdfjs-dist if not already loaded
        if (!pdfjsLib) {
          try {
            pdfjsLib = await import('pdfjs-dist');
            // Set the worker source for PDF.js
            pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
          } catch (importError) {
            console.error('Failed to import pdfjs-dist:', importError);
            setError('PDF library failed to load');
            setIsLoading(false);
            return;
          }
        }

        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;

        // Get the first page
        const page = await pdf.getPage(1);

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

        // Render the page
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };

        await page.render(renderContext).promise;
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
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
