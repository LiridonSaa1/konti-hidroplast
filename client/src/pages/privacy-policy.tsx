import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Lock, Users, FileText, Mail, MapPin, Phone } from "lucide-react";
import { useLocation } from "wouter";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Set page title
    document.title = `Privacy Policy - ${companyInfo.companyName || "Konti Hidroplast"}`;
  }, [companyInfo.companyName]);

  const handleBackToHome = () => {
    setLocation("/");
  };

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
                {t('privacyPage.backToHome')}
              </Button>
            </div>

            <div className="mb-6 bg-[#ef4444] text-white px-4 py-2 rounded-full inline-block">
              <span className="text-sm font-medium">
                {t('privacyPage.privacySecurity')}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="text-red-500">{t('privacyPage.privacyPolicy')}</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {t('privacyPage.privacyPolicy')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              {t('privacyPage.heroDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Last Updated */}
            <div className="text-center">
              <p className="text-gray-600">
                {t('privacyPage.lastUpdated')}
              </p>
            </div>

            {/* General Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Shield className="h-8 w-8 text-[#1c2d56]" />
                  {t('privacyPage.generalInformation')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('privacyPage.generalInfoText1')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('privacyPage.generalInfoText2')}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('privacyPage.generalInfoText3')}
                </p>
              </CardContent>
            </Card>

            {/* Contact Information for Controller */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Users className="h-8 w-8 text-[#1c2d56]" />
                  {t('privacyPage.contactInfoController')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('privacyPage.controllerText1')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('privacyPage.controllerText2')} <a href="https://www.konti-hidroplast.com.mk/mk" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.konti-hidroplast.com.mk/mk</a>.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>{t('privacyPage.ourPostalAddress')}</strong><br />
                    {companyInfo.companyName || "Konti Hidroplast Dooel Gevgelija"}<br />
                    {companyInfo.address || "Industrial Street No. 5, 1480 Gevgelija"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection Officer */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Shield className="h-8 w-8 text-[#1c2d56]" />
                  {t('privacyPage.dataProtectionOfficer')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {t('privacyPage.dpoText')} <a href="mailto:zorical@konti-hidroplast.com.mk" className="text-blue-600 hover:underline">zorical@konti-hidroplast.com.mk</a> or via our postal address.
                </p>
              </CardContent>
            </Card>

            {/* How We Obtain Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Eye className="h-8 w-8 text-[#1c2d56]" />
                  {t('privacyPage.howWeObtainInfo')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {t('privacyPage.obtainInfoText')}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{t('privacyPage.accessProducts')}</li>
                  <li>{t('privacyPage.submitInquiry')}</li>
                  <li>{t('privacyPage.applyJob')}</li>
                  <li>{t('privacyPage.representOrganization')}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Video Surveillance */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Eye className="h-8 w-8 text-[#1c2d56]" />
                  {t('privacyPage.videoSurveillance')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('privacyPage.videoSurveillanceText1')}
                </p>
                <p className="text-gray-700 mb-4">
                  {t('privacyPage.videoSurveillanceText2')}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{t('privacyPage.firstLastName')}</li>
                  <li>{t('privacyPage.jobTitle')}</li>
                  <li>{t('privacyPage.companyName')}</li>
                  <li>{t('privacyPage.workEmail')}</li>
                  <li>{t('privacyPage.phoneNumber')}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Website Browsing Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Eye className="h-8 w-8 text-[#1c2d56]" />
                  {t('privacyPage.websiteBrowsing')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {t('privacyPage.websiteBrowsingText')}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{t('privacyPage.ipAddresses')}</li>
                  <li>{t('privacyPage.uriAddresses')}</li>
                  <li>{t('privacyPage.timeRequest')}</li>
                  <li>{t('privacyPage.browserMethod')}</li>
                  <li>{t('privacyPage.fileSize')}</li>
                  <li>{t('privacyPage.responseStatus')}</li>
                  <li>{t('privacyPage.operatingSystem')}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Use and Sharing */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Lock className="h-8 w-8 text-[#1c2d56]" />
                  {t('privacyPage.useAndSharing')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('privacyPage.useAndSharingText1')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('privacyPage.useAndSharingText2')}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('privacyPage.useAndSharingText3')}
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <FileText className="h-8 w-8 text-[#1c2d56]" />
                  {t('privacyPage.yourRights')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {t('privacyPage.rightsText')}
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('privacyPage.right1Title')}</h3>
                    <p className="text-gray-700">{t('privacyPage.right1Text')}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('privacyPage.right2Title')}</h3>
                    <p className="text-gray-700">{t('privacyPage.right2Text')}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('privacyPage.right3Title')}</h3>
                    <p className="text-gray-700">{t('privacyPage.right3Text')}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('privacyPage.right4Title')}</h3>
                    <p className="text-gray-700">{t('privacyPage.right4Text')}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('privacyPage.right5Title')}</h3>
                    <p className="text-gray-700">{t('privacyPage.right5Text')}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('privacyPage.right6Title')}</h3>
                    <p className="text-gray-700">{t('privacyPage.right6Text')}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('privacyPage.right7Title')}</h3>
                    <p className="text-gray-700">{t('privacyPage.right7Text')} <a href="mailto:info@privacy.mk" className="text-blue-600 hover:underline">info@privacy.mk</a>.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Users className="h-8 w-8 text-[#1c2d56]" />
                  {t('privacyPage.contactUs')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {t('privacyPage.contactText')}
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start">
                    <MapPin className="text-[#1c2d56] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong>{t('privacyPage.address')}</strong><br />
                      {companyInfo.address || "Industriska 5, 1480 Gevgelija, North Macedonia"}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="text-[#1c2d56] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong>{t('privacyPage.phoneNumbers')}</strong><br />
                      {companyInfo.phones && companyInfo.phones.length > 0 ? (
                        companyInfo.phones.map((phone, index) => (
                          <span key={index}>
                            {phone}
                            {index < companyInfo.phones.length - 1 && <br />}
                          </span>
                        ))
                      ) : (
                        <>
                          +389 34 215 225<br />
                          +389 34 212 064<br />
                          +389 34 212 226<br />
                          +389 34 211 964<br />
                          +389 34 211 757
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="text-[#1c2d56] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong>{t('privacyPage.email')}</strong><br />
                      <a href={`mailto:${companyInfo.email || 'zorical@konti-hidroplast.com.mk'}`} className="text-blue-600 hover:underline">
                        {companyInfo.email || 'zorical@konti-hidroplast.com.mk'}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
