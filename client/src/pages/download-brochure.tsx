import { useEffect, useState } from "react";
import { useSearchParams } from "wouter";
import { Download, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DownloadParams {
  hash: string;
  email: string;
  brochure: string;
  timestamp: string;
}

function DownloadBrochurePage() {
  const [searchParams] = useSearchParams();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [downloadData, setDownloadData] = useState<DownloadParams | null>(null);

  useEffect(() => {
    const validateDownloadLink = async () => {
      try {
        const hash = searchParams.get("hash");
        const email = searchParams.get("email");
        const brochure = searchParams.get("brochure");
        const timestamp = searchParams.get("timestamp");

        if (!hash || !email || !brochure || !timestamp) {
          setError("Invalid download link. Missing required parameters.");
          setIsValid(false);
          setIsLoading(false);
          return;
        }

        const params: DownloadParams = { hash, email, brochure, timestamp };
        setDownloadData(params);

        // Check if link is expired (24 hours)
        const linkTimestamp = parseInt(timestamp);
        const now = Date.now();
        const linkAge = now - linkTimestamp;
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours

        if (linkAge > maxAge) {
          setError("This download link has expired. Please request a new one.");
          setIsValid(false);
          setIsLoading(false);
          return;
        }

        // Validate hash with server
        const response = await fetch("/api/validate-download-link", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });

        if (response.ok) {
          setIsValid(true);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Invalid download link");
          setIsValid(false);
        }
      } catch (err) {
        setError("Failed to validate download link. Please try again.");
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateDownloadLink();
  }, [searchParams]);

  const handleDownload = async () => {
    if (!downloadData) return;

    try {
      // Get the actual PDF URL from the server
      const response = await fetch("/api/get-brochure-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brochureName: downloadData.brochure,
          email: downloadData.email,
        }),
      });

      if (response.ok) {
        const { pdfUrl } = await response.json();
        
        // Track the actual download
        await fetch("/api/track-actual-download", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            brochureName: downloadData.brochure,
            email: downloadData.email,
            downloadDate: new Date().toISOString(),
          }),
        });

        // Open PDF in new tab
        window.open(pdfUrl, "_blank");
      } else {
        setError("Failed to retrieve brochure. Please try again.");
      }
    } catch (err) {
      setError("Download failed. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating download link...</p>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-600">Download Link Invalid</CardTitle>
            <CardDescription>
              We couldn't validate your download link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <p className="text-sm text-gray-600 mb-4">
              This could happen if:
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-1">
              <li>• The link has expired</li>
              <li>• The link was already used</li>
              <li>• The link is invalid or corrupted</li>
            </ul>
            <Button 
              onClick={() => window.location.href = "/brochures"}
              className="w-full"
            >
              Request New Brochure
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-green-600">Download Ready!</CardTitle>
          <CardDescription>
            Your brochure is ready for download
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Brochure Details</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Name:</strong> {downloadData?.brochure}</p>
              <p><strong>Email:</strong> {downloadData?.email}</p>
              <p><strong>Requested:</strong> {new Date(parseInt(downloadData?.timestamp || "0")).toLocaleDateString()}</p>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Click the download button below to access your brochure. The link will remain valid for 24 hours.
            </AlertDescription>
          </Alert>

          <Button 
            onClick={handleDownload}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Brochure
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By downloading, you agree to use this brochure for informational purposes only.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default DownloadBrochurePage;
