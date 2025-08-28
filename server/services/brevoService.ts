import * as nodemailer from 'nodemailer';
import { storage } from '../storage.js';

export class BrevoService {
  private transporter: nodemailer.Transporter | null = null;

  async getConfig() {
    return await storage.getBrevoConfig();
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
      });
      
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
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactData.fullName}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${contactData.company || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${contactData.message.replace(/\n/g, '<br>')}</p>
        `
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
        html: `
          <h2>Thank you for your message</h2>
          <p>Dear ${contactData.fullName},</p>
          <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>The Konti Hidroplast Team</p>
        `
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
        html: `
          <h2>New Job Application</h2>
          <p><strong>Name:</strong> ${jobData.fullName}</p>
          <p><strong>Email:</strong> ${jobData.email}</p>
          <p><strong>Phone:</strong> ${jobData.phone || 'Not provided'}</p>
          <p><strong>Position:</strong> ${jobData.position}</p>
          <p><strong>Message:</strong></p>
          <p>${jobData.message.replace(/\n/g, '<br>')}</p>
        `
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
        html: `
          <h2>Thank you for your job application</h2>
          <p>Dear ${jobData.fullName},</p>
          <p>Thank you for your interest in the <strong>${jobData.position}</strong> position. We have received your application and will review it carefully.</p>
          <p>We will contact you if your qualifications match our requirements.</p>
          <p>Best regards,<br>The Konti Hidroplast Team</p>
        `
      };
      
      const result = await transporter.sendMail(emailContent);
      console.log('Job application auto-reply email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send job application auto-reply email:', error);
      return false;
    }
  }
}

export const brevoService = new BrevoService();