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
  const { t } = useLanguage();
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
            <div className="mb-6 text-white px-4 py-2 rounded-full inline-block bg-[#ef4444]">
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
            <p
              className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
              data-testid="hero-description"
            >
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
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[#1c2d56]" />
                  Industriska 5, 1480 Gevgelija, North Macedonia
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#1c2d56]" />
                  +389 34 215 225
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#1c2d56]" />
                  hr@konti-hidroplast.com.mk
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
