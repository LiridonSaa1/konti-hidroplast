import { useEffect } from "react";

function BrouchuresRedirectPage() {
  useEffect(() => {
    window.location.replace("/attached_assets/DE - Katallogu per WEB - PDF.pdf");
  }, []);

  return null;
}

export default BrouchuresRedirectPage;
