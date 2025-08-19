import nodemailer from 'nodemailer';
import { storage } from '../storage';
import type { InsertContactMessage } from '@shared/schema';

class BrevoService {
  private transporter: nodemailer.Transporter | null = null;
  
  private async getConfig() {
    return await storage.getBrevoConfig();
  }
  
  private async createTransporter() {
    const config = await this.getConfig();
    
    if (!config || !config.isActive || !config.apiKey) {
      console.log('Brevo not configured or inactive');
      return null;
    }
    
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
          user: config.senderEmail, // This should be your SMTP login email from Brevo SMTP tab
          pass: config.apiKey // This should be your SMTP key (not API key)
        },
      });
      
      this.transporter = transporter;
      return transporter;
    } catch (error) {
      console.error('Failed to create Brevo transporter:', error);
      return null;
    }
  }
  
  async testConnection(): Promise<boolean> {
    try {
      const transporter = await this.createTransporter();
      if (!transporter) return false;
      
      await transporter.verify();
      return true;
    } catch (error) {
      console.error('Brevo connection test failed:', error);
      return false;
    }
  }
  
  async sendContactNotification(contactData: InsertContactMessage): Promise<boolean> {
    try {
      const config = await this.getConfig();
      if (!config || !config.isActive) return false;
      
      const transporter = await this.createTransporter();
      if (!transporter) return false;
      
      const mailOptions = {
        from: `"${config.senderName}" <${config.senderEmail}>`,
        to: config.recipientEmail || config.senderEmail, // Send to recipient email or fallback to sender email
        subject: `New Contact Form Submission - ${contactData.fullName}`,
        html: this.generateNotificationEmailHTML(contactData),
        text: this.generateNotificationEmailText(contactData)
      };
      
      await transporter.sendMail(mailOptions);
      console.log('Contact notification email sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send contact notification:', error);
      return false;
    }
  }
  
  async sendAutoReply(contactData: InsertContactMessage): Promise<boolean> {
    try {
      const config = await this.getConfig();
      if (!config || !config.isActive) return false;
      
      const transporter = await this.createTransporter();
      if (!transporter) return false;
      
      const mailOptions = {
        from: `"${config.senderName}" <${config.senderEmail}>`,
        to: contactData.email,
        subject: 'Thank you for contacting Konti Hidroplast',
        html: this.generateAutoReplyEmailHTML(contactData),
        text: this.generateAutoReplyEmailText(contactData)
      };
      
      await transporter.sendMail(mailOptions);
      console.log('Auto-reply email sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send auto-reply email:', error);
      return false;
    }
  }
  
  private generateNotificationEmailHTML(contactData: InsertContactMessage): string {
    return `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1c2d56; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1c2d56; }
        .value { background-color: white; padding: 8px; border-radius: 4px; border: 1px solid #e1e5e9; }
        .message-box { background-color: white; padding: 15px; border-radius: 4px; border: 1px solid #e1e5e9; white-space: pre-wrap; }
        .footer { background-color: #1c2d56; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
          <p>Konti Hidroplast Website</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Full Name:</div>
            <div class="value">${contactData.fullName}</div>
          </div>
          <div class="field">
            <div class="label">Email Address:</div>
            <div class="value">${contactData.email}</div>
          </div>
          ${contactData.phone ? `
          <div class="field">
            <div class="label">Phone Number:</div>
            <div class="value">${contactData.phone}</div>
          </div>
          ` : ''}
          ${contactData.company ? `
          <div class="field">
            <div class="label">Company:</div>
            <div class="value">${contactData.company}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Message:</div>
            <div class="message-box">${contactData.message}</div>
          </div>
        </div>
        <div class="footer">
          This message was submitted through the Konti Hidroplast contact form.<br>
          Please respond promptly to maintain excellent customer service.
        </div>
      </div>
    </body>
    </html>
    `;
  }
  
  private generateNotificationEmailText(contactData: InsertContactMessage): string {
    return `
    NEW CONTACT FORM SUBMISSION - Konti Hidroplast
    
    Full Name: ${contactData.fullName}
    Email: ${contactData.email}
    ${contactData.phone ? `Phone: ${contactData.phone}` : ''}
    ${contactData.company ? `Company: ${contactData.company}` : ''}
    
    Message:
    ${contactData.message}
    
    ---
    This message was submitted through the Konti Hidroplast contact form.
    Please respond promptly to maintain excellent customer service.
    `;
  }
  
  private generateAutoReplyEmailHTML(contactData: InsertContactMessage): string {
    return `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1c2d56; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9f9f9; padding: 25px; border: 1px solid #ddd; }
        .greeting { font-size: 18px; font-weight: bold; color: #1c2d56; margin-bottom: 15px; }
        .message { margin-bottom: 20px; }
        .contact-info { background-color: white; padding: 20px; border-radius: 4px; border: 1px solid #e1e5e9; margin-top: 20px; }
        .footer { background-color: #1c2d56; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
        .logo { font-size: 24px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">KONTI HIDROPLAST</div>
          <p>Thank you for contacting us!</p>
        </div>
        <div class="content">
          <div class="greeting">Dear ${contactData.fullName},</div>
          
          <div class="message">
            Thank you for reaching out to Konti Hidroplast. We have received your message and our team will review it carefully.
          </div>
          
          <div class="message">
            We strive to respond to all inquiries within 24 hours during business days. If your matter is urgent, please don't hesitate to call us directly.
          </div>
          
          <div class="contact-info">
            <h3 style="color: #1c2d56; margin-top: 0;">Our Contact Information</h3>
            <p><strong>Phone:</strong> +389 34 215 225</p>
            <p><strong>Email:</strong> info@kontihidroplast.com</p>
            <p><strong>Address:</strong> Macedonia</p>
            <p><strong>Business Hours:</strong> Monday - Friday, 8:00 AM - 4:00 PM</p>
          </div>
          
          <div class="message">
            We appreciate your interest in our pipeline solutions and look forward to the opportunity to serve you.
          </div>
        </div>
        <div class="footer">
          Best regards,<br>
          The Konti Hidroplast Team<br>
          Leading manufacturer of PE and PP pipes in Macedonia
        </div>
      </div>
    </body>
    </html>
    `;
  }
  
  private generateAutoReplyEmailText(contactData: InsertContactMessage): string {
    return `
    Dear ${contactData.fullName},
    
    Thank you for reaching out to Konti Hidroplast. We have received your message and our team will review it carefully.
    
    We strive to respond to all inquiries within 24 hours during business days. If your matter is urgent, please don't hesitate to call us directly.
    
    OUR CONTACT INFORMATION
    Phone: +389 34 215 225
    Email: info@kontihidroplast.com
    Address: Macedonia
    Business Hours: Monday - Friday, 8:00 AM - 4:00 PM
    
    We appreciate your interest in our pipeline solutions and look forward to the opportunity to serve you.
    
    Best regards,
    The Konti Hidroplast Team
    Leading manufacturer of PE and PP pipes in Macedonia
    `;
  }
}

export const brevoService = new BrevoService();