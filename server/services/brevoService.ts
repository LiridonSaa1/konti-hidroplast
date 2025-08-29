import * as nodemailer from 'nodemailer';

export class BrevoService {
  private transporter: nodemailer.Transporter | null = null;

  private async getConfig() {
    // Only use environment variables for Brevo configuration
    const envApiKey = process.env.BREVO_API_KEY;
    const envSenderEmail = process.env.BREVO_SENDER_EMAIL;
    
    if (envApiKey && envSenderEmail) {
      console.log('Using Brevo configuration from environment variables');
      return {
        id: 0,
        apiKey: envApiKey,
        brevoApiKey: null,
        senderEmail: envSenderEmail,
        validatedSenderEmail: null,
        senderName: 'Konti Hidroplast',
        recipientEmail: envSenderEmail, // Use sender email as default recipient
        templateId: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    
    console.log('Brevo configuration not found in environment variables');
    return null;
  }

  // Enhanced email template with company logo and professional styling
  private createEmailTemplate(options: {
    title: string;
    content: string;
    footerText?: string;
    includeLogo?: boolean;
  }) {
    const logoBase64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjMWMyZDU2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPktvbnRpIEhpZHJvcGxhc3Q8L3RleHQ+Cjwvc3ZnPgo=';
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${options.title}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f4f4f4; 
          }
          .email-container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff; 
            border-radius: 8px; 
            overflow: hidden; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
          }
          .header { 
            background: linear-gradient(135deg, #1c2d56 0%, #2d4a8a 100%); 
            padding: 30px 20px; 
            text-align: center; 
          }
          .logo { 
            max-width: 200px; 
            height: auto; 
            margin-bottom: 15px; 
          }
          .header h1 { 
            color: #ffffff; 
            margin: 0; 
            font-size: 24px; 
            font-weight: 600; 
          }
          .content { 
            padding: 40px 30px; 
            background-color: #ffffff; 
          }
          .content h2 { 
            color: #1c2d56; 
            margin-top: 0; 
            margin-bottom: 20px; 
            font-size: 20px; 
          }
          .content p { 
            margin-bottom: 15px; 
            color: #555; 
          }
          .footer { 
            background-color: #f8f9fa; 
            padding: 20px 30px; 
            text-align: center; 
            border-top: 1px solid #e9ecef; 
          }
          .footer p { 
            margin: 0; 
            color: #6c757d; 
            font-size: 14px; 
          }
          .highlight { 
            background-color: #e3f2fd; 
            padding: 15px; 
            border-left: 4px solid #2196f3; 
            margin: 20px 0; 
          }
          .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background-color: #1c2d56; 
            color: #ffffff; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 20px 0; 
            font-weight: 600; 
          }
          .button:hover { 
            background-color: #2d4a8a; 
          }
          @media only screen and (max-width: 600px) {
            .email-container { 
              margin: 10px; 
              border-radius: 4px; 
            }
            .content { 
              padding: 20px 15px; 
            }
            .header { 
              padding: 20px 15px; 
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            ${options.includeLogo ? `<img src="${logoBase64}" alt="Konti Hidroplast Logo" class="logo">` : ''}
            <h1>${options.title}</h1>
          </div>
          <div class="content">
            ${options.content}
          </div>
          <div class="footer">
            <p>${options.footerText || '© 2024 Konti Hidroplast. All rights reserved.'}</p>
            <p>This email was sent from our secure system. Please do not reply directly to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async isBrevoConfigured(): Promise<boolean> {
    try {
      const config = await this.getConfig();
      return !!(config && config.isActive && (config.apiKey || config.brevoApiKey) && config.senderEmail);
    } catch (error) {
      console.error('Error checking Brevo configuration:', error);
      return false;
    }
  }

  private async createTransporter() {
    const config = await this.getConfig();
    
    if (!config || !config.isActive || (!config.apiKey && !config.brevoApiKey)) {
      console.log('Brevo not configured or inactive');
      return null;
    }
    
    try {
      // Use apiKey (SMTP key) if available, otherwise use brevoApiKey
      const smtpKey = config.apiKey || config.brevoApiKey;
      
      console.log('Creating Brevo transporter with config:', {
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
          user: config.senderEmail,
          pass: smtpKey
        }
      });

      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
          user: config.senderEmail, // This should be your SMTP login email from Brevo SMTP tab
          pass: smtpKey // This should be your SMTP key (not API key)
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,   // 10 seconds
        socketTimeout: 10000      // 10 seconds
      } as any);
      
      this.transporter = transporter;
      return transporter;
    } catch (error) {
      console.error('Failed to create Brevo transporter:', error);
      return null;
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('=== Testing Brevo Connection ===');
      
      // Check if configuration exists
      const config = await this.getConfig();
      if (!config) {
        console.log('No Brevo configuration found');
        return { success: false, message: 'No Brevo configuration found' };
      }
      
      if (!config.isActive) {
        console.log('Brevo configuration is inactive');
        return { success: false, message: 'Brevo configuration is inactive' };
      }
      
      if (!config.apiKey && !config.brevoApiKey) {
        console.log('No API key configured');
        return { success: false, message: 'No API key configured' };
      }
      
      if (!config.senderEmail) {
        console.log('No sender email configured');
        return { success: false, message: 'No sender email configured' };
      }
      
      console.log('Configuration check passed, creating transporter...');
      
      // Create transporter
      const transporter = await this.createTransporter();
      if (!transporter) {
        console.log('Failed to create transporter');
        return { success: false, message: 'Failed to create email transporter' };
      }
      
      console.log('Transporter created, testing connection...');
      
      // Test connection
      await transporter.verify();
      console.log('Connection verified successfully');
      
      return { success: true, message: 'Connection successful' };
    } catch (error: any) {
      console.error('Connection test failed:', error);
      
      let message = 'Connection failed';
      if (error.code === 'EAUTH') {
        message = 'Invalid SMTP credentials - check your SMTP login email and key';
      } else if (error.code === 'ECONNECTION') {
        message = 'Connection refused - check your network and SMTP settings';
      } else if (error.code === 'ETIMEDOUT') {
        message = 'Connection timeout - check your network connection';
      } else if (error.message) {
        message = `Connection failed: ${error.message}`;
      }
      
      return { success: false, message };
    }
  }

  async testEmailSending(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('=== Testing Brevo Email Sending ===');
      
      const config = await this.getConfig();
      if (!config || !config.isActive || (!config.apiKey && !config.brevoApiKey) || !config.senderEmail) {
        return { success: false, message: 'Brevo not properly configured' };
      }
      
      const transporter = await this.createTransporter();
      if (!transporter) {
        return { success: false, message: 'Failed to create email transporter' };
      }
      
      console.log('Sending test email...');
      
      const testEmail = {
        from: `"${config.senderName || 'Test'}" <${config.senderEmail}>`,
        to: config.senderEmail, // Send to self for testing
        subject: 'Brevo Connection Test',
        text: 'This is a test email to verify Brevo SMTP configuration is working correctly.',
        html: '<p>This is a test email to verify Brevo SMTP configuration is working correctly.</p>'
      };
      
      const result = await transporter.sendMail(testEmail);
      console.log('Test email sent successfully:', result.messageId);
      
      return { success: true, message: 'Test email sent successfully' };
    } catch (error: any) {
      console.error('Test email failed:', error);
      
      let message = 'Test email failed';
      if (error.code === 'EAUTH') {
        message = 'Authentication failed - check SMTP credentials';
      } else if (error.code === 'ECONNECTION') {
        message = 'Connection failed - check network and SMTP settings';
      } else if (error.message) {
        message = `Test email failed: ${error.message}`;
      }
      
      return { success: false, message };
    }
  }

  async sendContactNotification(contactData: any): Promise<boolean> {
    try {
      console.log('=== Sending Contact Notification Email ===');
      
      const config = await this.getConfig();
      if (!config || !config.isActive || (!config.apiKey && !config.brevoApiKey) || !config.senderEmail) {
        console.log('Brevo not configured - skipping contact notification');
        return false;
      }
      
      console.log('Brevo config found:', {
        isActive: config.isActive,
        hasApiKey: !!config.apiKey,
        hasBrevoApiKey: !!config.brevoApiKey,
        senderEmail: config.senderEmail,
        senderName: config.senderName
      });
      
      const transporter = await this.createTransporter();
      if (!transporter) {
        console.log('Failed to create transporter for contact notification');
        return false;
      }
      
      console.log('Transporter created, sending contact notification...');
      
      const emailContent = {
        from: `"${config.senderName || 'Website Contact'}" <${config.senderEmail}>`,
        to: config.senderEmail,
        subject: 'New Contact Form Submission',
        text: `
          New contact form submission:
          
          Name: ${contactData.fullName}
          Email: ${contactData.email}
          Phone: ${contactData.phone || 'Not provided'}
          Company: ${contactData.company || 'Not provided'}
          
          Message:
          ${contactData.message}
        `,
        html: this.createEmailTemplate({
          title: 'New Contact Form Submission',
          content: `
            <h2>New Contact Form Submission</h2>
            <div class="highlight">
              <p><strong>Name:</strong> ${contactData.fullName}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
              <p><strong>Company:</strong> ${contactData.company || 'Not provided'}</p>
            </div>
            <p><strong>Message:</strong></p>
            <p>${contactData.message.replace(/\n/g, '<br>')}</p>
          `,
          includeLogo: true
        })
      };
      
      const result = await transporter.sendMail(emailContent);
      console.log('Contact notification email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send contact notification email:', error);
      return false;
    }
  }

  async sendAutoReply(contactData: any): Promise<boolean> {
    try {
      console.log('=== Sending Auto-Reply Email ===');
      
      const config = await this.getConfig();
      if (!config || !config.isActive || (!config.apiKey && !config.brevoApiKey) || !config.senderEmail) {
        console.log('Brevo not configured - skipping auto-reply');
        return false;
      }
      
      console.log('Brevo config found for auto-reply:', {
        isActive: config.isActive,
        hasApiKey: !!config.apiKey,
        hasBrevoApiKey: !!config.brevoApiKey,
        senderEmail: config.senderEmail,
        senderName: config.senderName
      });
      
      const transporter = await this.createTransporter();
      if (!transporter) {
        console.log('Failed to create transporter for auto-reply');
        return false;
      }
      
      console.log('Transporter created, sending auto-reply...');
      
      const emailContent = {
        from: `"${config.senderName || 'Konti Hidroplast'}" <${config.senderEmail}>`,
        to: contactData.email,
        subject: 'Thank you for your message',
        text: `
          Dear ${contactData.fullName},
          
          Thank you for contacting us. We have received your message and will get back to you as soon as possible.
          
          Best regards,
          The Konti Hidroplast Team
        `,
        html: this.createEmailTemplate({
          title: 'Thank you for your message',
          content: `
            <h2>Thank you for your message</h2>
            <p>Dear <strong>${contactData.fullName}</strong>,</p>
            <div class="highlight">
              <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
            </div>
            <p>Best regards,<br><strong>The Konti Hidroplast Team</strong></p>
          `,
          includeLogo: true,
          footerText: 'We appreciate your interest in our products and services.'
        })
      };
      
      const result = await transporter.sendMail(emailContent);
      console.log('Auto-reply email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send auto-reply email:', error);
      return false;
    }
  }

  async sendJobApplicationNotification(jobData: any): Promise<boolean> {
    try {
      console.log('=== Sending Job Application Notification Email ===');
      
      const config = await this.getConfig();
      if (!config || !config.isActive || (!config.apiKey && !config.brevoApiKey) || !config.senderEmail) {
        console.log('Brevo not configured - skipping job application notification');
        return false;
      }
      
      console.log('Brevo config found for job notification:', {
        isActive: config.isActive,
        hasApiKey: !!config.apiKey,
        hasBrevoApiKey: !!config.brevoApiKey,
        senderEmail: config.senderEmail,
        senderName: config.senderName
      });
      
      const transporter = await this.createTransporter();
      if (!transporter) {
        console.log('Failed to create transporter for job application notification');
        return false;
      }
      
      console.log('Transporter created, sending job application notification...');
      
      const emailContent = {
        from: `"${config.senderName || 'Website Contact'}" <${config.senderEmail}>`,
        to: config.senderEmail,
        subject: 'New Job Application',
        text: `
          New job application received:
          
          Name: ${jobData.fullName}
          Email: ${jobData.email}
          Phone: ${jobData.phone || 'Not provided'}
          Position: ${jobData.position}
          
          Message:
          ${jobData.message}
        `,
        html: this.createEmailTemplate({
          title: 'New Job Application',
          content: `
            <h2>New Job Application</h2>
            <div class="highlight">
              <p><strong>Name:</strong> ${jobData.fullName}</p>
              <p><strong>Email:</strong> ${jobData.email}</p>
              <p><strong>Phone:</strong> ${jobData.phone || 'Not provided'}</p>
              <p><strong>Position:</strong> ${jobData.position}</p>
            </div>
            <p><strong>Message:</strong></p>
            <p>${jobData.message.replace(/\n/g, '<br>')}</p>
          `,
          includeLogo: true
        })
      };
      
      const result = await transporter.sendMail(emailContent);
      console.log('Job application notification email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send job application notification email:', error);
      return false;
    }
  }

  async sendJobApplicationAutoReply(jobData: any): Promise<boolean> {
    try {
      console.log('=== Sending Job Application Auto-Reply Email ===');
      
      const config = await this.getConfig();
      if (!config || !config.isActive || (!config.apiKey && !config.brevoApiKey) || !config.senderEmail) {
        console.log('Brevo not configured - skipping job application auto-reply');
        return false;
      }
      
      console.log('Brevo config found for job auto-reply:', {
        isActive: config.isActive,
        hasApiKey: !!config.apiKey,
        hasBrevoApiKey: !!config.brevoApiKey,
        senderEmail: config.senderEmail,
        senderName: config.senderName
      });
      
      const transporter = await this.createTransporter();
      if (!transporter) {
        console.log('Failed to create transporter for job application auto-reply');
        return false;
      }
      
      console.log('Transporter created, sending job application auto-reply...');
      
      const emailContent = {
        from: `"${config.senderName || 'Konti Hidroplast'}" <${config.senderEmail}>`,
        to: jobData.email,
        subject: 'Thank you for your job application',
        text: `
          Dear ${jobData.fullName},
          
          Thank you for your interest in the ${jobData.position} position. We have received your application and will review it carefully.
          
          We will contact you if your qualifications match our requirements.
          
          Best regards,
          The Konti Hidroplast Team
        `,
        html: this.createEmailTemplate({
          title: 'Thank you for your job application',
          content: `
            <h2>Thank you for your job application</h2>
            <p>Dear <strong>${jobData.fullName}</strong>,</p>
            <div class="highlight">
              <p>Thank you for your interest in the <strong>${jobData.position}</strong> position. We have received your application and will review it carefully.</p>
              <p>We will contact you if your qualifications match our requirements.</p>
            </div>
            <p>Best regards,<br><strong>The Konti Hidroplast Team</strong></p>
          `,
          includeLogo: true,
          footerText: 'We appreciate your interest in joining our team.'
        })
      };
      
      const result = await transporter.sendMail(emailContent);
      console.log('Job application auto-reply email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send job application auto-reply email:', error);
      return false;
    }
  }

  // Generic email sending method
  async sendEmail(emailData: {
    to: string;
    subject: string;
    htmlContent?: string;
    textContent?: string;
  }): Promise<boolean> {
    try {
      console.log('=== Sending Generic Email ===');
      
      const config = await this.getConfig();
      if (!config || !config.isActive || (!config.apiKey && !config.brevoApiKey) || !config.senderEmail) {
        console.log('Brevo not configured - skipping email sending');
        return false;
      }
      
      console.log('Brevo config found for generic email:', {
        isActive: config.isActive,
        hasApiKey: !!config.apiKey,
        hasBrevoApiKey: !!config.brevoApiKey,
        senderEmail: config.senderEmail,
        senderName: config.senderName
      });
      
      const transporter = await this.createTransporter();
      if (!transporter) {
        console.log('Failed to create transporter for generic email');
        return false;
      }
      
      console.log('Transporter created, sending generic email...');
      
      const emailContent = {
        from: `"${config.senderName || 'Konti Hidroplast'}" <${config.senderEmail}>`,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.textContent || '',
        html: emailData.htmlContent || ''
      };
      
      const result = await transporter.sendMail(emailContent);
      console.log('Generic email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send generic email:', error);
      return false;
    }
  }

  // Send brochure download notification to admin
  async sendBrochureDownloadNotification(downloadData: any): Promise<boolean> {
    try {
      console.log('=== Sending Brochure Download Notification Email ===');
      
      const config = await this.getConfig();
      if (!config || !config.isActive || (!config.apiKey && !config.brevoApiKey) || !config.senderEmail) {
        console.log('Brevo not configured - skipping brochure download notification');
        return false;
      }
      
      console.log('Brevo config found for brochure download notification:', {
        isActive: config.isActive,
        hasApiKey: !!config.apiKey,
        hasBrevoApiKey: !!config.brevoApiKey,
        senderEmail: config.senderEmail,
        senderName: config.senderName
      });
      
      const transporter = await this.createTransporter();
      if (!transporter) {
        console.log('Failed to create transporter for brochure download notification');
        return false;
      }
      
      console.log('Transporter created, sending brochure download notification...');
      
      const emailContent = {
        from: `"${config.senderName || 'Website Contact'}" <${config.senderEmail}>`,
        to: config.recipientEmail || config.senderEmail,
        subject: 'New Brochure Download Request',
        text: `
          New brochure download request:
          
          Name: ${downloadData.fullName}
          Email: ${downloadData.email}
          Company: ${downloadData.companyName}
          Brochure: ${downloadData.brochureName}
          Category: ${downloadData.brochureCategory}
          Description: ${downloadData.description || 'Not provided'}
          Download Date: ${downloadData.downloadDate}
        `,
        html: this.createEmailTemplate({
          title: 'New Brochure Download Request',
          content: `
            <h2>New Brochure Download Request</h2>
            <div class="highlight">
              <p><strong>Name:</strong> ${downloadData.fullName}</p>
              <p><strong>Email:</strong> ${downloadData.email}</p>
              <p><strong>Company:</strong> ${downloadData.companyName}</p>
              <p><strong>Brochure:</strong> ${downloadData.brochureName}</p>
              <p><strong>Category:</strong> ${downloadData.brochureCategory}</p>
              <p><strong>Description:</strong> ${downloadData.description || 'Not provided'}</p>
              <p><strong>Download Date:</strong> ${downloadData.downloadDate}</p>
            </div>
          `,
          includeLogo: true
        })
      };
      
      const result = await transporter.sendMail(emailContent);
      console.log('Brochure download notification email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send brochure download notification email:', error);
      return false;
    }
  }
}

export const brevoService = new BrevoService();