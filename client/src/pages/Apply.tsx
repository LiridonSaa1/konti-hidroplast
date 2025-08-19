import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Send, 
  CheckCircle,
  User,
  Mail,
  Phone,
  Briefcase,
  Upload
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const applyFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  position: z.string().min(2, "Position is required"),
  experience: z.string().optional(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type ApplyForm = z.infer<typeof applyFormSchema>;

export default function Apply() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ApplyForm>({
    resolver: zodResolver(applyFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      position: "",
      experience: "",
      coverLetter: "",
      resumeUrl: "",
    },
  });

  const submitApplicationMutation = useMutation({
    mutationFn: async (data: ApplyForm): Promise<{ message: string; id: number }> => {
      const response = await apiRequest("/api/job-applications", "POST", data);
      return await response.json();
    },
    onSuccess: (data) => {
      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: data.message,
        duration: 5000,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit your application. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const onSubmit = (data: ApplyForm) => {
    // Clean up the data before submitting
    const cleanData = {
      ...data,
      phoneNumber: data.phoneNumber || undefined,
      experience: data.experience || undefined,
      coverLetter: data.coverLetter || undefined,
      resumeUrl: data.resumeUrl || undefined,
    };
    
    submitApplicationMutation.mutate(cleanData);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card className="border-green-200 shadow-lg">
            <CardContent className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                Application Submitted!
              </h2>
              <p className="text-green-700 mb-6">
                Thank you for your interest in joining Konti Hidroplast. We have received your application and will review it carefully.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Our HR team will contact you if your profile matches our requirements.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                Submit Another Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Be part of Konti Hidroplast's mission to provide high-quality PE and PP pipes. 
            Submit your application and let's build the future together.
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Briefcase className="h-6 w-6" />
              Job Application Form
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      {...form.register("fullName")}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your full name"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm font-medium">
                      Phone Number (Optional)
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phoneNumber"
                        {...form.register("phoneNumber")}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="+389 XX XXX XXX"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm font-medium">
                      Position Applied For *
                    </Label>
                    <Input
                      id="position"
                      {...form.register("position")}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g. Production Manager, Sales Representative"
                    />
                    {form.formState.errors.position && (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.position.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium">
                    Relevant Experience (Optional)
                  </Label>
                  <Textarea
                    id="experience"
                    {...form.register("experience")}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
                    placeholder="Brief description of your relevant experience (e.g., 5 years in manufacturing, 3 years in sales)"
                  />
                </div>
              </div>

              {/* Application Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Application Details
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="coverLetter" className="text-sm font-medium">
                    Cover Letter / Motivation (Optional)
                  </Label>
                  <Textarea
                    id="coverLetter"
                    {...form.register("coverLetter")}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                    placeholder="Tell us why you want to work at Konti Hidroplast and what makes you a great fit for this position..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resumeUrl" className="text-sm font-medium">
                    Resume/CV URL (Optional)
                  </Label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="resumeUrl"
                      type="url"
                      {...form.register("resumeUrl")}
                      className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://drive.google.com/your-resume-link"
                    />
                  </div>
                  {form.formState.errors.resumeUrl && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.resumeUrl.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Upload your resume to Google Drive, Dropbox, or similar service and share the public link here.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={submitApplicationMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 text-lg font-medium"
                >
                  {submitApplicationMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to allow Konti Hidroplast to process your personal data for recruitment purposes.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}