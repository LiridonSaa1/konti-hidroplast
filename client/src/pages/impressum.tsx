import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText } from "lucide-react";
import { useLocation } from "wouter";

export default function ImpressumPage() {
  const { language } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();
  const [, setLocation] = useLocation();

  useEffect(() => {
    document.title = `Impressum - ${companyInfo.companyName || "Urban Rohr GmbH"}`;
  }, [companyInfo.companyName]);

  const handleBackToHome = () => {
    setLocation("/");
  };

  const de = (
    <>
      <h1 className="sr-only">Impressum</h1>
      <p className="mb-4">
        Urban Rohr GmbH<br />
        Karlsdorfer Str. 56<br />
        88069 Tettnang
      </p>
      <p className="mb-4">
        Handelsregister: HRB 749106<br />
        Registergericht: Amtsgericht Ulm
      </p>
      <p className="mb-4">
        <strong>Vertreten durch:</strong><br />
        Xhevxhet Ajeti<br />
        Xhemail Jashari<br />
        Zekirja Bajrami
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Kontakt</h2>
      <p className="mb-4">
        Telefon: 015115793884<br />
        E-Mail: info@urban-rohr.com
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Umsatzsteuer-ID</h2>
      <p className="mb-4">
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
        DE450633526
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
      <p className="mb-4">
        Berufsbezeichnung:<br />
        Baustoffvertreiber, Baustoffhersteller
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Redaktionell verantwortlich</h2>
      <p className="mb-4">Luan Ajeti</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</h2>
      <p className="mb-4">
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Zentrale Kontaktstelle nach dem Digital Services Act - DSA (Verordnung (EU) 2022/265)
      </h2>
      <p className="mb-2">
        Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11, 12 DSA erreichen Sie wie folgt:
      </p>
      <p className="mb-4">
        E-Mail: info@urban-rohr.com<br />
        Telefon: 015115793884
      </p>
      <p>Die für den Kontakt zur Verfügung stehenden Sprachen sind: Deutsch, Englisch.</p>
    </>
  );

  const en = (
    <>
      <h1 className="sr-only">Legal Notice (Imprint)</h1>
      <p className="mb-4">
        Urban Rohr GmbH<br />
        Karlsdorfer Str. 56<br />
        88069 Tettnang
      </p>
      <p className="mb-4">
        Commercial Register: HRB 749106<br />
        Register Court: Local Court Ulm
      </p>
      <p className="mb-4">
        <strong>Represented by:</strong><br />
        Xhevxhet Ajeti<br />
        Louis de Paris<br />
        Xhemail Jashari<br />
        Zekirja Bajrami
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-4">
        Phone: 015115793884<br />
        Email: info@urban-rohr.com
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">VAT ID</h2>
      <p className="mb-4">
        VAT identification number pursuant to § 27 a German VAT Act:<br />
        DE450633526
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Professional Title and Regulations</h2>
      <p className="mb-4">
        Professional title:<br />
        Building materials distributor, building materials manufacturer
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Editorially Responsible</h2>
      <p className="mb-4">Luan Ajeti</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Consumer Dispute Resolution</h2>
      <p className="mb-4">
        We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Single Point of Contact under the Digital Services Act (DSA) — Regulation (EU) 2022/265
      </h2>
      <p className="mb-2">
        Our single point of contact for users and authorities pursuant to Arts. 11 and 12 DSA can be reached as follows:
      </p>
      <p className="mb-4">
        Email: info@urban-rohr.com<br />
        Phone: 015115793884
      </p>
      <p>The languages available for contact are: German, English.</p>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="h-full w-full bg-gradient-to-l from-white/20 to-transparent transform skew-x-12"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Back Button */}
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className="inline-flex items-center text-white hover:text-[#1c2d56]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "de" ? "Zurück zur Startseite" : "Back to Home"}
              </Button>
            </div>

            <div className="mb-6 bg-[#ef4444] text-white px-4 py-2 rounded-full inline-block">
              <span className="text-sm font-medium">
                {language === "de" ? "Rechtliche Hinweise" : "Legal Notice"}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {language === "de" ? "Impressum" : "Imprint"}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              {language === "de"
                ? "Rechtliche Pflichtangaben gemäß deutschem Recht."
                : "Mandatory legal information under German law."}
            </p>
          </div>
        </div>
      </section>

      {/* Impressum Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="h-8 w-8 text-[#1c2d56]" />
                {language === "de" ? "Impressum" : "Imprint"}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              {language === "de" ? de : en}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}


