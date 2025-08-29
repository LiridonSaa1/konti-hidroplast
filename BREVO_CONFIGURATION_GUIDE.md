# Brevo Email Configuration Guide

This guide explains how to configure Brevo (formerly SendinBlue) for sending emails when brochures are downloaded and other contact form submissions.

## Overview

The system now supports email notifications for:
- Contact form submissions (to admin + auto-reply to user)
- Job applications (to admin + auto-reply to applicant)
- Brochure downloads (to user with download link + notification to admin)

## Setup Instructions

### 1. Brevo Account Setup

1. Go to [Brevo Dashboard](https://app.brevo.com/)
2. Navigate to **SMTP & API** section
3. You have two options for authentication:

#### Option A: SMTP Key (Recommended for basic email sending)
- Go to **SMTP tab**
- Copy your **SMTP Login** email and **SMTP Key**
- Add a verified sender email to your **Senders** list

#### Option B: Brevo API Key (For advanced features)
- Go to **API Keys tab**
- Create or copy an **API Key**

### 2. Admin Panel Configuration

1. Log into the admin panel
2. Navigate to **Brevo Configuration** section
3. Fill in the configuration:

**Required Fields:**
- **SMTP Login Email**: Your Brevo SMTP login email
- **Validated Sender Email**: A verified sender email from your Brevo Senders list
- **Sender Name**: The name that will appear as the sender (e.g., "Konti Hidroplast")
- **Recipient Email**: Admin email to receive notifications

**Optional Fields:**
- **Brevo SMTP Key**: Your SMTP key (if using SMTP authentication)
- **Brevo API Key**: Your API key (if using API authentication)

### 3. Testing Configuration

After saving your configuration, test the setup using the three test buttons:

1. **Test Connection**: Verifies your credentials and connection to Brevo
2. **Test Email**: Sends a simple test email to verify email sending works
3. **Test Brochure Download**: Tests the complete brochure download email flow

## Email Functionality

### Brochure Download Emails

When a user downloads a brochure:

1. **User Email**: Sends a professional email with:
   - Download link (secure, time-limited)
   - Brochure details
   - Contact information
   - Professional branding

2. **Admin Notification**: Sends notification to admin with:
   - User details (name, email, company)
   - Brochure information
   - Download timestamp
   - Project description (if provided)

### Contact Form Emails

When someone submits a contact form:

1. **Admin Notification**: Detailed notification with all form data
2. **Auto-reply**: Professional thank you message to the user

### Job Application Emails

When someone applies for a job:

1. **Admin Notification**: Complete application details
2. **Auto-reply**: Confirmation message to the applicant

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check your SMTP key or API key
   - Verify sender email is validated in Brevo
   - Ensure configuration is active

2. **Email Not Sending**
   - Check your sender email is verified
   - Verify SMTP login email matches your Brevo account
   - Check spam folder for test emails

3. **Authentication Errors**
   - Use SMTP key from SMTP tab, not API key
   - Ensure sender email is in your verified senders list
   - Check API key permissions if using API authentication

### Testing Checklist

- [ ] Brevo account is active
- [ ] Sender email is verified
- [ ] Configuration is saved and active
- [ ] Connection test passes
- [ ] Email test sends successfully
- [ ] Brochure download test works
- [ ] Check email inbox (including spam folder)

## Security Notes

- API keys are never exposed in responses
- Download links are time-limited and secure
- All email content is sanitized
- Sender verification prevents spoofing

## Support

If you encounter issues:
1. Check the server logs for detailed error messages
2. Verify your Brevo account settings
3. Test with the provided test buttons
4. Ensure all required fields are filled

The system will continue to function even if email sending fails, ensuring brochure downloads and form submissions are always recorded in the admin panel.
