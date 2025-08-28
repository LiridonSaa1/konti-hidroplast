import crypto from 'crypto';
import { BrevoService } from './brevoService';

export class EmailService {
  private brevoService: BrevoService;

  constructor() {
    this.brevoService = new BrevoService();
  }

  // Generate a secure hash for download links
  private generateDownloadHash(brochureId: string, email: string, timestamp: number): string {
    const data = `${brochureId}-${email}-${timestamp}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // Send brochure download email
  async sendBrochureDownloadEmail(
    fullName: string,
    email: string,
    companyName: string,
    brochureName: string,
    brochureCategory: string,
    pdfUrl: string
  ): Promise<boolean> {
    try {
      const timestamp = Date.now();
      const downloadHash = this.generateDownloadHash(brochureName, email, timestamp);
      
      // Create download link with hash
      const downloadLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/download-brochure?hash=${downloadHash}&email=${encodeURIComponent(email)}&brochure=${encodeURIComponent(brochureName)}&timestamp=${timestamp}`;
      
      // Create professional email content
      const emailContent = this.createBrochureDownloadEmail(
        fullName,
        companyName,
        brochureName,
        brochureCategory,
        downloadLink
      );

      // Send email using Brevo service
      const result = await this.brevoService.sendEmail({
        to: email,
        subject: `Your ${brochureName} Brochure Download Link - Konti Hidroplast`,
        htmlContent: emailContent.html,
        textContent: emailContent.text
      });

      return result;
    } catch (error) {
      console.error('Error sending brochure download email:', error);
      return false;
    }
  }

  private createBrochureDownloadEmail(
    fullName: string,
    companyName: string,
    brochureName: string,
    brochureCategory: string,
    downloadLink: string
  ) {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Brochure Download Link</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1c2d56 0%, #2d5aa0 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .download-btn { display: inline-block; background: #1c2d56; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .info-box { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #1c2d56; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📄 Your Brochure is Ready!</h1>
            <p>Thank you for your interest in Konti Hidroplast solutions</p>
          </div>
          
          <div class="content">
            <p>Dear <strong>${fullName}</strong>,</p>
            
            <p>Thank you for requesting the <strong>${brochureName}</strong> brochure from our ${brochureCategory} product line.</p>
            
            <div class="info-box">
              <h3>📋 Request Details:</h3>
              <ul>
                <li><strong>Company:</strong> ${companyName}</li>
                <li><strong>Brochure:</strong> ${brochureName}</li>
                <li><strong>Category:</strong> ${brochureCategory}</li>
                <li><strong>Request Date:</strong> ${new Date().toLocaleDateString()}</li>
              </ul>
            </div>
            
            <p>Your brochure is ready for download. Click the button below to access your PDF:</p>
            
            <div style="text-align: center;">
              <a href="${downloadLink}" class="download-btn">📥 Download Brochure</a>
            </div>
            
            <p><strong>Important:</strong> This download link is unique to you and will expire for security reasons. If you have any issues accessing the file, please don't hesitate to contact us.</p>
            
            <p>If you have any questions about our products or need technical support, our team is here to help:</p>
            
            <div class="info-box">
              <h3>📞 Contact Information:</h3>
              <p><strong>Email:</strong> info@kontihidroplast.com.mk</p>
              <p><strong>Phone:</strong> +389 2 3120 100</p>
              <p><strong>Website:</strong> <a href="https://konti-hidroplast.com.mk">konti-hidroplast.com.mk</a></p>
            </div>
            
            <p>We appreciate your interest in Konti Hidroplast and look forward to potentially working together on your projects.</p>
            
            <p>Best regards,<br>
            <strong>The Konti Hidroplast Team</strong></p>
          </div>
          
          <div class="footer">
            <p>This email was sent to ${email} because you requested a brochure download.</p>
            <p>© ${new Date().getFullYear()} Konti Hidroplast. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
Your Brochure is Ready!

Dear ${fullName},

Thank you for requesting the ${brochureName} brochure from our ${brochureCategory} product line.

Request Details:
- Company: ${companyName}
- Brochure: ${brochureName}
- Category: ${brochureCategory}
- Request Date: ${new Date().toLocaleDateString()}

Your brochure is ready for download. Use this link to access your PDF:

${downloadLink}

Important: This download link is unique to you and will expire for security reasons. If you have any issues accessing the file, please don't hesitate to contact us.

If you have any questions about our products or need technical support, our team is here to help:

Contact Information:
- Email: info@kontihidroplast.com.mk
- Phone: +389 2 3120 100
- Website: https://konti-hidroplast.com.mk

We appreciate your interest in Konti Hidroplast and look forward to potentially working together on your projects.

Best regards,
The Konti Hidroplast Team

This email was sent to ${email} because you requested a brochure download.
© ${new Date().getFullYear()} Konti Hidroplast. All rights reserved.
    `;

    return { html: htmlContent, text: textContent };
  }
}
