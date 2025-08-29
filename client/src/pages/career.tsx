import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Award,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Building,
  Loader2,
  Globe,
} from "lucide-react";

const jobApplicationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  position: z.string().default("General Application"),
  experience: z.string().optional(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().optional(),
});

type JobApplicationForm = z.infer<typeof jobApplicationSchema>;

function CareerPage() {
  const { t, language } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const form = useForm<JobApplicationForm>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      position: "General Application",
      experience: "",
      coverLetter: "",
      resumeUrl: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx"))
    ) {
      setResumeFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const onSubmit = async (data: JobApplicationForm) => {
    setIsSubmitting(true);

    try {
      let resumeUrl = "";
      
      // Upload resume file first if provided
      if (resumeFile) {
        const formData = new FormData();
        formData.append('file', resumeFile);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload resume file');
        }

        const uploadResult = await uploadResponse.json();
        resumeUrl = uploadResult.url;
      }

      const applicationData = {
        ...data,
        resumeUrl: resumeUrl || undefined,
      };

      const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description:
            "Thank you for your interest. We'll review your application and get back to you soon.",
          duration: 5000,
        });

        // Reset form
        form.reset();
        setResumeFile(null);

        // Reset file input
        const fileInput = document.getElementById("resume") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit application");
      }
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description:
          error.message ||
          "There was an error submitting your application. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Set page title
    document.title = `Career Opportunities - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Join Konti Hidroplast team! Explore career opportunities in pipe manufacturing, engineering, quality control, and production. Build your career with a leading industrial company in North Macedonia.",
      );
    }
  }, []);

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
            <div className="text-center mb-4">
              <span className="text-sm font-medium">{t("careerPage.joinOurTeam")}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="text-red-500">{t("careerPage.alwaysOnLookout")}</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {t("careerPage.lookoutFor")}
              </span>
              <br />
              <span className="text-white">{t("careerPage.topTalent")}</span>
            </h1>
            <p className="text-xl text-white-600 max-w-3xl mx-auto mb-8">
              {t("careerPage.heroDescription")}
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                {t("careerPage.dynamicTeam")}
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />
                {t("careerPage.professionalGrowth")}
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                {t("careerPage.careerDevelopment")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {language === 'en' ? 'About Konti Hidroplast' :
                 language === 'mk' ? 'За Конти Хидропласт' :
                 language === 'de' ? 'Über Konti Hidroplast' : 'About Konti Hidroplast'}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {language === 'en' ? 'Join a leading industrial company with over 25 years of experience in pipe manufacturing and infrastructure solutions.' :
               language === 'mk' ? 'Приклучете се на водечка индустриска компанија со над 25 години искуство во производство на цевки и инфраструктурни решенија.' :
               language === 'de' ? 'Werden Sie Teil eines führenden Industrieunternehmens mit über 25 Jahren Erfahrung in der Rohrherstellung und Infrastrukturlösungen.' : 'Join a leading industrial company with over 25 years of experience in pipe manufacturing and infrastructure solutions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Company Description */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 h-full">
                <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">
                  {language === 'en' ? 'Our Company' :
                   language === 'mk' ? 'Нашата компанија' :
                   language === 'de' ? 'Unser Unternehmen' : 'Our Company'}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {companyInfo.description || 
                   (language === 'en' ? 'Konti Hidroplast is a leading manufacturer of high-quality HDPE pipes and fittings, serving the infrastructure and construction industries across Europe. We specialize in innovative solutions for gas pipelines, drainage systems, and industrial applications.' :
                    language === 'mk' ? 'Конти Хидропласт е водечки производител на висококвалитетни HDPE цевки и фитинзи, кои ги опслужуваат инфраструктурните и градежните индустрии низ Европа. Специјализирани сме за иновативни решенија за гасни цевководи, дренажни системи и индустриски апликации.' :
                    language === 'de' ? 'Konti Hidroplast ist ein führender Hersteller von hochwertigen HDPE-Rohren und -Fittings, der die Infrastruktur- und Bauindustrie in ganz Europa bedient. Wir sind auf innovative Lösungen für Gasleitungen, Entwässerungssysteme und industrielle Anwendungen spezialisiert.' : 'Konti Hidroplast is a leading manufacturer of high-quality HDPE pipes and fittings, serving the infrastructure and construction industries across Europe. We specialize in innovative solutions for gas pipelines, drainage systems, and industrial applications.')}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">
                      {language === 'en' ? '25+ Years Experience' :
                       language === 'mk' ? '25+ години искуство' :
                       language === 'de' ? '25+ Jahre Erfahrung' : '25+ Years Experience'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">
                      {language === 'en' ? 'European Market' :
                       language === 'mk' ? 'Европски пазар' :
                       language === 'de' ? 'Europäischer Markt' : 'European Market'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">
                      {language === 'en' ? 'Quality Certified' :
                       language === 'mk' ? 'Квалитетно сертифицирани' :
                       language === 'de' ? 'Qualitätszertifiziert' : 'Quality Certified'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">
                      {language === 'en' ? 'Innovation Focus' :
                       language === 'mk' ? 'Фокус на иновации' :
                       language === 'de' ? 'Innovationsfokus' : 'Innovation Focus'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Stats */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#1c2d56] to-blue-800 rounded-xl p-6 text-white text-center">
                <h3 className="text-lg font-semibold mb-4">
                  {language === 'en' ? 'Company Facts' :
                   language === 'mk' ? 'Факти за компанијата' :
                   language === 'de' ? 'Unternehmensfakten' : 'Company Facts'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-red-400">25+</div>
                    <div className="text-sm text-gray-300">
                      {language === 'en' ? 'Years in Business' :
                       language === 'mk' ? 'Години во бизнисот' :
                       language === 'de' ? 'Jahre im Geschäft' : 'Years in Business'}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400">500+</div>
                    <div className="text-sm text-gray-300">
                      {language === 'en' ? 'Employees' :
                       language === 'mk' ? 'Вработени' :
                       language === 'de' ? 'Mitarbeiter' : 'Employees'}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400">50+</div>
                    <div className="text-sm text-gray-300">
                      {language === 'en' ? 'Countries Served' :
                       language === 'mk' ? 'Земји кои ги опслужуваме' :
                       language === 'de' ? 'Bediente Länder' : 'Countries Served'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Values */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-[#1c2d56] mb-12">
              {language === 'en' ? 'Our Values & Culture' :
               language === 'mk' ? 'Нашите вредности и култура' :
               language === 'de' ? 'Unsere Werte & Kultur' : 'Our Values & Culture'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="text-xl font-semibold text-[#1c2d56] mb-2">
                  {language === 'en' ? 'Excellence' :
                   language === 'mk' ? 'Извонредност' :
                   language === 'de' ? 'Exzellenz' : 'Excellence'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {language === 'en' ? 'We strive for the highest quality in everything we do' :
                   language === 'mk' ? 'Тежниме кон највисок квалитет во сè што правиме' :
                   language === 'de' ? 'Wir streben nach höchster Qualität in allem, was wir tun' : 'We strive for the highest quality in everything we do'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-[#1c2d56] mb-2">
                  {language === 'en' ? 'Teamwork' :
                   language === 'mk' ? 'Тимска работа' :
                   language === 'de' ? 'Teamarbeit' : 'Teamwork'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {language === 'en' ? 'Collaboration and mutual support drive our success' :
                   language === 'mk' ? 'Соработката и меѓусебната поддршка го водат нашиот успех' :
                   language === 'de' ? 'Zusammenarbeit und gegenseitige Unterstützung treiben unseren Erfolg an' : 'Collaboration and mutual support drive our success'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-[#1c2d56] mb-2">
                  {language === 'en' ? 'Innovation' :
                   language === 'mk' ? 'Иновација' :
                   language === 'de' ? 'Innovation' : 'Innovation'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {language === 'en' ? 'Continuous improvement and creative solutions' :
                   language === 'mk' ? 'Континуирано подобрување и креативни решенија' :
                   language === 'de' ? 'Kontinuierliche Verbesserung und kreative Lösungen' : 'Continuous improvement and creative solutions'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="text-xl font-semibold text-[#1c2d56] mb-2">
                  {language === 'en' ? 'Integrity' :
                   language === 'mk' ? 'Интегритет' :
                   language === 'de' ? 'Integrität' : 'Integrity'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {language === 'en' ? 'Honest, ethical business practices' :
                   language === 'mk' ? 'Чесни, етички деловни практики' :
                   language === 'de' ? 'Ehrliche, ethische Geschäftspraktiken' : 'Honest, ethical business practices'}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-center text-[#1c2d56] mb-8">
              {language === 'en' ? 'Get in Touch' :
               language === 'mk' ? 'Сторете контакт' :
               language === 'de' ? 'Kontakt aufnehmen' : 'Get in Touch'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#1c2d56] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-[#1c2d56] mb-2">
                  {language === 'en' ? 'Address' :
                   language === 'mk' ? 'Адреса' :
                   language === 'de' ? 'Adresse' : 'Address'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {companyInfo.address || "Industriska 5, 1480 Gevgelija, North Macedonia"}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#1c2d56] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-[#1c2d56] mb-2">
                  {language === 'en' ? 'Phone' :
                   language === 'mk' ? 'Телефон' :
                   language === 'de' ? 'Telefon' : 'Phone'}
                </h4>
                <div className="text-gray-600 text-sm space-y-1">
                  {companyInfo.phones && companyInfo.phones.length > 0 ? 
                    companyInfo.phones.map((phone, index) => (
                      <div key={index}>{phone}</div>
                    )) : 
                    <div>+389 34 215 225</div>
                  }
                </div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#1c2d56] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-[#1c2d56] mb-2">
                  {language === 'en' ? 'Email' :
                   language === 'mk' ? 'Е-пошта' :
                   language === 'de' ? 'E-Mail' : 'Email'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {companyInfo.email || "hr@konti-hidroplast.com.mk"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Work Environment Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {language === 'en' ? 'Why Work With Us?' :
                 language === 'mk' ? 'Зошто да работите со нас?' :
                 language === 'de' ? 'Warum mit uns arbeiten?' : 'Why Work With Us?'}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {language === 'en' ? 'Discover the advantages of being part of our dynamic team and growing company.' :
               language === 'mk' ? 'Откријте ги предностите на тоа да бидете дел од нашиот динамичен тим и компанија во раст.' :
               language === 'de' ? 'Entdecken Sie die Vorteile, Teil unseres dynamischen Teams und wachsenden Unternehmens zu sein.' : 'Discover the advantages of being part of our dynamic team and growing company.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Professional Development */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-[#1c2d56] mb-4 text-center">
                {language === 'en' ? 'Professional Growth' :
                 language === 'mk' ? 'Професионален раст' :
                 language === 'de' ? 'Berufliches Wachstum' : 'Professional Growth'}
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'en' ? 'Continuous training and skill development' :
                     language === 'mk' ? 'Континуирана обука и развој на вештини' :
                     language === 'de' ? 'Kontinuierliche Schulung und Kompetenzentwicklung' : 'Continuous training and skill development'}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'en' ? 'Career advancement opportunities' :
                     language === 'mk' ? 'Можности за напредување во кариерата' :
                     language === 'de' ? 'Karriereentwicklungsmöglichkeiten' : 'Career advancement opportunities'}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'en' ? 'International project exposure' :
                     language === 'mk' ? 'Меѓународно изложување на проекти' :
                     language === 'de' ? 'Internationale Projekterfahrung' : 'International project exposure'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Work Environment */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-[#1c2d56] mb-4 text-center">
                {language === 'en' ? 'Great Work Environment' :
                 language === 'mk' ? 'Одлична работна средина' :
                 language === 'de' ? 'Großartige Arbeitsumgebung' : 'Great Work Environment'}
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'en' ? 'Collaborative and supportive team culture' :
                     language === 'mk' ? 'Колаборативна и поддржувачка тимска култура' :
                     language === 'de' ? 'Kollaborative und unterstützende Teamkultur' : 'Collaborative and supportive team culture'}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'en' ? 'Modern facilities and equipment' :
                     language === 'mk' ? 'Модерни објекти и опрема' :
                     language === 'de' ? 'Moderne Einrichtungen und Ausrüstung' : 'Modern facilities and equipment'}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'en' ? 'Work-life balance focus' :
                     language === 'mk' ? 'Фокус на рамнотежа работа-живот' :
                     language === 'de' ? 'Fokus auf Work-Life-Balance' : 'Work-life balance focus'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Benefits & Compensation */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-[#1c2d56] mb-4 text-center">
                {language === 'en' ? 'Competitive Benefits' :
                 language === 'mk' ? 'Конкурентни придобивки' :
                 language === 'de' ? 'Wettbewerbsfähige Vorteile' : 'Competitive Benefits'}
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'en' ? 'Competitive salary packages' :
                     language === 'mk' ? 'Конкурентни платни пакети' :
                     language === 'de' ? 'Wettbewerbsfähige Gehaltspakete' : 'Competitive salary packages'}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'en' ? 'Health insurance coverage' :
                     language === 'mk' ? 'Покритие на здравствено осигурување' :
                     language === 'de' ? 'Krankenversicherungsschutz' : 'Health insurance coverage'}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    {language === 'en' ? 'Performance-based bonuses' :
                     language === 'mk' ? 'Бонуси врз основа на перформанси' :
                     language === 'de' ? 'Leistungsbasierte Boni' : 'Performance-based bonuses'}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-center text-[#1c2d56] mb-8">
              {language === 'en' ? 'Additional Perks' :
               language === 'mk' ? 'Дополнителни придобивки' :
               language === 'de' ? 'Zusätzliche Vorteile' : 'Additional Perks'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-[#1c2d56] mb-2">
                  {language === 'en' ? 'Stable Company' :
                   language === 'mk' ? 'Стабилна компанија' :
                   language === 'de' ? 'Stabiles Unternehmen' : 'Stable Company'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {language === 'en' ? '25+ years of sustainable growth' :
                   language === 'mk' ? '25+ години одржлив раст' :
                   language === 'de' ? '25+ Jahre nachhaltiges Wachstum' : '25+ years of sustainable growth'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-[#1c2d56] mb-2">
                  {language === 'en' ? 'Global Reach' :
                   language === 'mk' ? 'Глобален опсег' :
                   language === 'de' ? 'Globale Reichweite' : 'Global Reach'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {language === 'en' ? 'Work on international projects' :
                   language === 'mk' ? 'Работи на меѓународни проекти' :
                   language === 'de' ? 'An internationalen Projekten arbeiten' : 'Work on international projects'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-[#1c2d56] mb-2">
                  {language === 'en' ? 'Innovation' :
                   language === 'mk' ? 'Иновација' :
                   language === 'de' ? 'Innovation' : 'Innovation'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {language === 'en' ? 'Cutting-edge technology focus' :
                   language === 'mk' ? 'Фокус на најнова технологија' :
                   language === 'de' ? 'Fokus auf neueste Technologie' : 'Cutting-edge technology focus'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-[#1c2d56] mb-2">
                  {language === 'en' ? 'Team Events' :
                   language === 'mk' ? 'Тимски настани' :
                   language === 'de' ? 'Teamevents' : 'Team Events'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {language === 'en' ? 'Regular team building activities' :
                   language === 'mk' ? 'Редовни тимски активности' :
                   language === 'de' ? 'Regelmäßige Teambuilding-Aktivitäten' : 'Regular team building activities'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">{t("careerPage.apply")}</h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {t("careerPage.applyDescription")}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <input
                      type="text"
                      id="fullName"
                      {...form.register("fullName")}
                      placeholder={t("careerPage.fullName")}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#1c2d56] focus:border-[#1c2d56]"
                      data-testid="input-full-name"
                    />
                    {form.formState.errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      id="email"
                      {...form.register("email")}
                      placeholder={t("careerPage.email")}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#1c2d56] focus:border-[#1c2d56]"
                      data-testid="input-email"
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      {...form.register("phoneNumber")}
                      placeholder={t("careerPage.phoneNumber")}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#1c2d56] focus:border-[#1c2d56]"
                      data-testid="input-phone"
                    />
                    {form.formState.errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div
                    className={`relative border-2 border-dashed rounded-md h-48 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                      isDragOver
                        ? "border-[#1c2d56] bg-blue-50"
                        : resumeFile
                          ? "border-green-400 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById("resume")?.click()}
                  >
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      data-testid="input-resume"
                    />

                    {resumeFile ? (
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-green-100 rounded-full">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-green-600">
                          {resumeFile.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-gray-100 rounded-full">
                          <svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">
                          Click or drag a file to this area to upload *
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PDF, DOC, DOCX (Max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <textarea
                  id="coverLetter"
                  {...form.register("coverLetter")}
                  rows={4}
                  placeholder={t("careerPage.message")}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-md focus:ring-[#1c2d56] focus:ring-[#1c2d56] focus:border-[#1c2d56] resize-none"
                  data-testid="textarea-message"
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-12 py-3 bg-[#1c2d56] hover:bg-[#1c2d56] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md transition-colors font-semibold"
                  data-testid="submit-button"
                >
                  {isSubmitting && (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  )}
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {t("careerPage.contactInformation")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[#1c2d56]" />
                  {companyInfo.address || "Industriska 5, 1480 Gevgelija, North Macedonia"}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#1c2d56]" />
                  {companyInfo.phones && companyInfo.phones.length > 0 ? companyInfo.phones[0] : "+389 34 215 225"}
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#1c2d56]" />
                  {companyInfo.email || "hr@konti-hidroplast.com.mk"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CareerPage;
