import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Mail, Settings, CheckCircle, XCircle, AlertCircle, TestTube, Save } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { BrevoConfig } from "@shared/schema";

const brevoConfigSchema = z.object({
  apiKey: z.string().optional(),
  brevoApiKey: z.string().optional(),
  senderEmail: z.string().email("Invalid email address"),
  validatedSenderEmail: z.string().email("Invalid validated sender email address").optional(),
  senderName: z.string().min(1, "Sender name is required"),
  recipientEmail: z.string().email("Invalid recipient email address"),
  templateId: z.number().optional(),
  isActive: z.boolean(),
}).refine((data) => {
  // Either apiKey (SMTP key) or brevoApiKey must be provided
  if (!data.apiKey && !data.brevoApiKey) {
    return false;
  }
  return true;
}, {
  message: "Either SMTP key or Brevo API key must be provided",
  path: ["apiKey"]
});

type BrevoConfigForm = z.infer<typeof brevoConfigSchema>;

interface BrevoConfigWithStatus extends Omit<BrevoConfig, 'apiKey' | 'brevoApiKey'> {
  hasApiKey: boolean;
  hasBrevoApiKey: boolean;
  connectionTest?: boolean;
}

export function BrevoConfigManager() {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [emailTestResult, setEmailTestResult] = useState<string | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: config, isLoading } = useQuery({
    queryKey: ["/api/admin/brevo-config"],
    queryFn: async (): Promise<BrevoConfigWithStatus | null> => {
      const response = await apiRequest("/api/admin/brevo-config", "GET");
      return await response.json();
    },
  });

  const form = useForm<BrevoConfigForm>({
    resolver: zodResolver(brevoConfigSchema),
    defaultValues: {
      apiKey: "",
      brevoApiKey: "",
      senderEmail: "",
      validatedSenderEmail: "",
      senderName: "Konti Hidroplast",
      recipientEmail: "",
      templateId: undefined,
      isActive: true,
    },
  });

  // Update form when config is loaded
  useEffect(() => {
    if (config) {
      form.reset({
        apiKey: "", // Never populate the API key for security
        brevoApiKey: "", // Never populate the Brevo API key for security
        senderEmail: config.senderEmail,
        validatedSenderEmail: config.validatedSenderEmail || "",
        senderName: config.senderName,
        recipientEmail: config.recipientEmail || "",
        templateId: config.templateId || undefined,
        isActive: config.isActive ?? true,
      });
      setConnectionStatus(config.connectionTest ?? null);
    }
  }, [config, form]);

  // Watch for changes in brevoApiKey to update the apiKey field
  useEffect(() => {
    if (form.watch("brevoApiKey")) {
      form.setValue("apiKey", "");
    }
  }, [form.watch("brevoApiKey")]);

  // Watch for changes in brevoApiKey to update validation
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'brevoApiKey') {
        // Trigger validation when brevoApiKey changes
        form.trigger('apiKey');
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const createConfigMutation = useMutation({
    mutationFn: async (data: BrevoConfigForm): Promise<BrevoConfigWithStatus> => {
      const response = await apiRequest("/api/admin/brevo-config", "POST", data);
      return await response.json();
    },
    onSuccess: (data: BrevoConfigWithStatus) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/brevo-config"] });
      setConnectionStatus(data.connectionTest ?? false);
      toast({ 
        title: "Success", 
        description: "Brevo configuration created successfully.",
        duration: 5000,
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create Brevo configuration.", 
        variant: "destructive" 
      });
    },
  });

  const updateConfigMutation = useMutation({
    mutationFn: async (data: BrevoConfigForm): Promise<BrevoConfigWithStatus> => {
      const response = await apiRequest(`/api/admin/brevo-config/${config!.id}`, "PATCH", data);
      return await response.json();
    },
    onSuccess: (data: BrevoConfigWithStatus) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/brevo-config"] });
      setConnectionStatus(data.connectionTest ?? false);
      toast({ 
        title: "Success", 
        description: "Brevo configuration updated successfully.",
        duration: 5000,
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update Brevo configuration.", 
        variant: "destructive" 
      });
    },
  });

  const testConnectionMutation = useMutation({
    mutationFn: async (): Promise<{ success: boolean }> => {
      const response = await apiRequest("/api/admin/brevo-config/test", "POST");
      return await response.json();
    },
    onSuccess: (data: { success: boolean }) => {
      setConnectionStatus(data.success);
      toast({ 
        title: data.success ? "Success" : "Failed", 
        description: data.success 
          ? "Brevo connection test successful!" 
          : "Brevo connection test failed. Please check your configuration.",
        variant: data.success ? "default" : "destructive",
        duration: 5000,
      });
    },
    onError: () => {
      setConnectionStatus(false);
      toast({ 
        title: "Error", 
        description: "Failed to test Brevo connection.", 
        variant: "destructive" 
      });
    },
  });

  const testEmailMutation = useMutation({
    mutationFn: async (): Promise<{ success: boolean; recipientEmail: string; message: string }> => {
      const response = await apiRequest("/api/admin/brevo-config/test-email", "POST");
      return await response.json();
    },
    onSuccess: (data: { success: boolean; recipientEmail: string; message: string }) => {
      setEmailTestResult(data.message);
      toast({
        title: data.success ? "Email Sent" : "Email Failed",
        description: `${data.message} Recipient: ${data.recipientEmail}`,
        duration: 8000,
      });
    },
    onError: (error: any) => {
      setEmailTestResult("Email test failed. Please check your configuration.");
      toast({
        title: "Error",
        description: "Email test failed. Please check your configuration.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const onSubmit = (data: BrevoConfigForm) => {
    // Filter out empty apiKey when updating existing config
    const submitData = { ...data };
    if (config && !submitData.apiKey && !submitData.brevoApiKey) {
      // Keep existing apiKey if no new keys provided
      delete submitData.apiKey;
    }
    
    if (config) {
      updateConfigMutation.mutate(submitData);
    } else {
      createConfigMutation.mutate(submitData);
    }
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    try {
      await testConnectionMutation.mutateAsync();
    } finally {
      setIsTestingConnection(false);
    }
  };

  const testEmail = async () => {
    setIsTestingEmail(true);
    try {
      await testEmailMutation.mutateAsync();
    } finally {
      setIsTestingEmail(false);
    }
  };

  const getConnectionStatusBadge = () => {
    if (connectionStatus === null) {
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
          <AlertCircle className="h-3 w-3 mr-1" />
          Not Tested
        </Badge>
      );
    }
    
    return connectionStatus ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
        <CheckCircle className="h-3 w-3 mr-1" />
        Connected
      </Badge>
    ) : (
      <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200">
        <XCircle className="h-3 w-3 mr-1" />
        Failed
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading Brevo configuration...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-blue-900 flex items-center">
              <Mail className="h-6 w-6 mr-3 text-blue-600" />
              Brevo Email Configuration
            </CardTitle>
            <CardDescription className="text-blue-700">
              Configure Brevo (formerly SendinBlue) for sending contact form notifications and auto-replies
            </CardDescription>
          </div>
          {config && (
            <div className="flex items-center space-x-3">
              {getConnectionStatusBadge()}
              <Badge className={config.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {config.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Information Section */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Settings className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Setup Instructions</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• You can configure either <strong>SMTP Key</strong> OR <strong>Brevo API Key</strong> (or both)</li>
                  <li>• For SMTP: Go to Brevo dashboard → <strong>SMTP & API</strong> → <strong>SMTP tab</strong></li>
                  <li>• For API: Go to Brevo dashboard → <strong>SMTP & API</strong> → <strong>API Keys tab</strong></li>
                  <li>• Copy your <strong>SMTP Login</strong> email and put it in "SMTP Login Email" field below</li>
                  <li>• <strong>Important:</strong> Add a verified sender email from your Brevo Senders list in the "Validated Sender Email" field</li>
                  <li>• The SMTP login is for authentication, the validated sender email is what recipients will see as the sender</li>
                  <li>• Test the connection and email sending after saving your configuration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-sm font-semibold text-gray-700">
              Brevo SMTP Key (Optional)
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Brevo SMTP key (optional)"
              {...form.register("apiKey")}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              data-testid="input-api-key"
            />
            {form.formState.errors.apiKey && (
              <p className="text-sm text-red-600">{form.formState.errors.apiKey.message}</p>
            )}
            {config?.hasApiKey && (
              <p className="text-sm text-gray-500">
                Leave empty to keep the current SMTP key
              </p>
            )}
            <p className="text-sm text-blue-600">
              Optional: Use SMTP Key from SMTP tab, not API Key from API Keys tab. Leave empty if using Brevo API key instead.
            </p>
          </div>

          {/* Brevo API Key (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="brevoApiKey" className="text-sm font-semibold text-gray-700">
              Brevo API Key (Optional)
            </Label>
            <Input
              id="brevoApiKey"
              type="password"
              placeholder={config?.hasBrevoApiKey ? "••••••••••••••••" : "Enter your Brevo API key for advanced features"}
              {...form.register("brevoApiKey")}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              data-testid="input-brevo-api-key"
            />
            {form.formState.errors.brevoApiKey && (
              <p className="text-sm text-red-600">{form.formState.errors.brevoApiKey.message}</p>
            )}
            {config?.hasBrevoApiKey && (
              <p className="text-sm text-gray-500">
                Leave empty to keep the current Brevo API key
              </p>
            )}
            <p className="text-sm text-green-600">
              This is the API Key from API Keys tab (different from SMTP key above)
            </p>
          </div>

          <Separator />

          {/* Email Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="senderEmail" className="text-sm font-semibold text-gray-700">
                SMTP Login Email *
              </Label>
              <Input
                id="senderEmail"
                type="email"
                placeholder="your-smtp-login@email.com"
                {...form.register("senderEmail")}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                data-testid="input-sender-email"
              />
              {form.formState.errors.senderEmail && (
                <p className="text-sm text-red-600">{form.formState.errors.senderEmail.message}</p>
              )}
              <p className="text-xs text-gray-500">
                Use your SMTP login email from Brevo SMTP tab
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senderName" className="text-sm font-semibold text-gray-700">
                Sender Name *
              </Label>
              <Input
                id="senderName"
                placeholder="Konti Hidroplast"
                {...form.register("senderName")}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                data-testid="input-sender-name"
              />
              {form.formState.errors.senderName && (
                <p className="text-sm text-red-600">{form.formState.errors.senderName.message}</p>
              )}
            </div>
          </div>

          {/* Validated Sender Email */}
          <div className="space-y-2">
            <Label htmlFor="validatedSenderEmail" className="text-sm font-semibold text-gray-700">
              Validated Sender Email (Optional)
            </Label>
            <Input
              id="validatedSenderEmail"
              type="email"
              placeholder="info@kontihidroplast.com"
              {...form.register("validatedSenderEmail")}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              data-testid="input-validated-sender-email"
            />
            {form.formState.errors.validatedSenderEmail && (
              <p className="text-sm text-red-600">{form.formState.errors.validatedSenderEmail.message}</p>
            )}
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> This email address must be verified in your Brevo account as a sender. 
                If left empty, the SMTP login email above will be used. To fix sending issues, add a verified 
                email address from your Brevo Senders list here.
              </p>
            </div>
          </div>

          <Separator />

          {/* Notification Configuration */}
          <div className="space-y-2">
            <Label htmlFor="recipientEmail" className="text-sm font-semibold text-gray-700">
              Notification Recipient Email *
            </Label>
            <Input
              id="recipientEmail"
              type="email"
              placeholder="admin@kontihidroplast.com"
              {...form.register("recipientEmail")}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              data-testid="input-recipient-email"
            />
            {form.formState.errors.recipientEmail && (
              <p className="text-sm text-red-600">{form.formState.errors.recipientEmail.message}</p>
            )}
            <p className="text-xs text-gray-500">
              Contact form notifications will be sent to this email address
            </p>
          </div>

          <Separator />

          {/* Optional Configuration */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="templateId" className="text-sm font-semibold text-gray-700">
                Template ID (Optional)
              </Label>
              <Input
                id="templateId"
                type="number"
                placeholder="Enter Brevo template ID"
                {...form.register("templateId", { valueAsNumber: true })}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                data-testid="input-template-id"
              />
              <p className="text-sm text-gray-500">
                Leave empty to use default HTML templates
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <Label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                  Enable Brevo Integration
                </Label>
                <p className="text-sm text-gray-500">
                  When enabled, contact form submissions will send emails via Brevo
                </p>
              </div>
              <Switch
                id="isActive"
                checked={form.watch("isActive")}
                onCheckedChange={(checked) => form.setValue("isActive", checked)}
                data-testid="switch-active"
              />
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              disabled={createConfigMutation.isPending || updateConfigMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-save-config"
            >
              <Save className="h-4 w-4 mr-2" />
              {createConfigMutation.isPending || updateConfigMutation.isPending 
                ? "Saving..." 
                : config ? "Update Configuration" : "Create Configuration"
              }
            </Button>

            {config && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={testConnection}
                  disabled={isTestingConnection || testConnectionMutation.isPending}
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  data-testid="button-test-connection"
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  {isTestingConnection || testConnectionMutation.isPending ? "Testing..." : "Test Connection"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={testEmail}
                  disabled={isTestingEmail || testEmailMutation.isPending}
                  className="border-green-300 text-green-700 hover:bg-green-50"
                  data-testid="button-test-email"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {isTestingEmail || testEmailMutation.isPending ? "Sending..." : "Test Email"}
                </Button>
              </>
            )}
          </div>
        </form>

        {/* Status Messages */}
        {connectionStatus === false && (
          <Card className="mt-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-900">Connection Failed</h4>
                  <p className="text-sm text-red-800 mt-1">
                    Please check your API key configuration (either Brevo SMTP Key or Brevo API Key) and sender email. Make sure the sender email is verified in your Brevo account.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {connectionStatus === true && (
          <Card className="mt-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Connection Successful</h4>
                  <p className="text-sm text-green-800 mt-1">
                    Brevo is properly configured and ready to send emails. Contact form submissions will now trigger automatic notifications and replies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}