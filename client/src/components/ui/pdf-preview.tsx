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

    // Define the function outside the block to avoid strict mode issues
    const loadPDFDocument = async () => {
      try {
        const pdfjsLib = (window as any).pdfjsLib;
        
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

    const loadPDF = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load PDF.js from CDN if not already loaded
        let pdfjsLib: any = (window as any).pdfjsLib;
        
        if (!pdfjsLib) {
          // Load PDF.js script from CDN
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          script.onload = async () => {
            // Set worker source
            (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            await loadPDFDocument();
          };
          script.onerror = () => {
            setError('Failed to load PDF library');
            setIsLoading(false);
          };
          document.head.appendChild(script);
          return;
        }

        await loadPDFDocument();
      } catch (err) {
        console.error('Error in PDF preview:', err);
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
