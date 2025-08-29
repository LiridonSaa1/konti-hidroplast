# Dynamic Brevo Email Configuration

This document explains the dynamic Brevo email configuration system implemented for the Konti Hidroplast application.

## Overview

The Brevo email configuration system now works dynamically with multiple fallback layers:

1. **Database Configuration** (Primary) - Configured via admin panel
2. **Environment Variables** (Fallback) - Set in `.env` file or environment
3. **Graceful Degradation** - System continues to work even if configuration is incomplete

## Features

### 🔄 Dynamic Configuration Loading
- Automatically detects available configuration sources
- Falls back to environment variables when database config is unavailable
- No restart required when switching between configurations

### 🛡️ Fallback System
- **Primary**: Database configuration via admin panel
- **Secondary**: Environment variables (`BREVO_API_KEY`, `BREVO_SENDER_EMAIL`)
- **Graceful**: System logs errors but continues operating

### 🔧 Admin Panel Integration
- Configure Brevo settings through the web interface
- Test connections and email sending
- Visual indicators for configuration status
- Environment fallback detection

## Configuration Methods

### Method 1: Database Configuration (Recommended for Production)

1. Navigate to the admin panel at `/admin`
2. Go to "Brevo Configuration" section
3. Fill in the required fields:
   - **API Key**: Your Brevo SMTP key
   - **Sender Email**: Verified sender email from Brevo
   - **Sender Name**: Display name for emails
   - **Recipient Email**: Where notifications are sent
4. Test the configuration using the built-in test buttons
5. Save the configuration

### Method 2: Environment Variables (Fallback)

Add to your `.env` file:
```env
BREVO_API_KEY=your_brevo_smtp_key_here
BREVO_SENDER_EMAIL=noreply@yourdomain.com
```

Or set as system environment variables:
```bash
export BREVO_API_KEY=your_brevo_smtp_key_here
export BREVO_SENDER_EMAIL=noreply@yourdomain.com
```

## How It Works

### Configuration Loading Process

1. **Service Layer Check**: `BrevoService.getConfig()` is called
2. **Database First**: Attempts to load from database storage
3. **Environment Fallback**: If database config is unavailable or inactive, checks environment variables
4. **Return Config**: Returns the first available valid configuration

### Code Flow

```typescript
// In BrevoService.getConfig()
async getConfig() {
  try {
    // Try database configuration first
    const config = await storage.getBrevoConfig();
    if (config && config.isActive) {
      return config;
    }
  } catch (error) {
    console.log('Database config unavailable, using environment fallback');
  }

  // Fallback to environment variables
  const envApiKey = process.env.BREVO_API_KEY;
  const envSenderEmail = process.env.BREVO_SENDER_EMAIL;
  
  if (envApiKey && envSenderEmail) {
    return {
      // Environment-based configuration object
    };
  }

  return null; // No configuration available
}
```

## Email Features Supported

### Contact Form Notifications
- Sends admin notifications when users submit contact forms
- Includes all form data and user information
- Automatic reply to user confirming submission

### Job Application Notifications
- Notifies admin of new job applications
- Includes application details and attachments
- Confirms receipt to applicant

### Brochure Download Notifications
- Tracks brochure download requests
- Sends lead information to admin
- Provides download links to users

### Custom Email Sending
- Generic email sending capability
- Supports both HTML and text content
- Template-based or custom content

## Testing the Configuration

### Built-in Tests
The admin panel provides several testing options:

1. **Connection Test**: Verifies SMTP connection to Brevo
2. **Email Test**: Sends a test email to verify full functionality
3. **Brochure Download Test**: Tests the complete brochure flow

### Manual Testing
Use the provided test script:
```bash
node test-dynamic-brevo.cjs
```

This script checks:
- Environment variable availability
- Server connectivity
- Configuration endpoint accessibility
- Fallback functionality

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `BREVO_API_KEY` | Yes* | Your Brevo SMTP key | `xkeysib-...` |
| `BREVO_SENDER_EMAIL` | Yes* | Verified sender email | `noreply@example.com` |
| `DATABASE_URL` | No | Database connection string | `postgresql://...` |

*Required only when using environment variable fallback

## Error Handling

### Configuration Errors
- Missing API key: System logs error, emails won't send
- Invalid sender email: SMTP authentication fails
- Network issues: Graceful retry with exponential backoff

### Fallback Scenarios
- Database unavailable: Automatically uses environment variables
- Invalid database config: Falls back to environment
- Partial configuration: Uses available settings, logs warnings

## Security Considerations

### API Key Protection
- Database-stored API keys are not exposed in API responses
- Environment variables are server-side only
- Admin panel shows only masked keys

### Email Validation
- Sender emails must be verified with Brevo
- Recipient emails are validated before sending
- SMTP authentication prevents spoofing

## Deployment Guide

### Development Setup
1. Copy `env.example` to `.env`
2. Set `BREVO_API_KEY` and `BREVO_SENDER_EMAIL`
3. Start development server: `npm run dev`
4. Access admin panel at `http://localhost:3001/admin`

### Production Deployment
1. Set environment variables in your hosting platform
2. Configure database connection
3. Use admin panel for primary configuration
4. Keep environment variables as fallback

### Docker Deployment
```dockerfile
ENV BREVO_API_KEY=your_key_here
ENV BREVO_SENDER_EMAIL=noreply@yourdomain.com
```

## Troubleshooting

### Common Issues

**"No Brevo configuration found"**
- Check environment variables are set
- Verify database connection
- Ensure admin panel configuration is active

**"Authentication failed"**
- Verify API key is correct (SMTP key, not API key)
- Check sender email is verified in Brevo
- Confirm SMTP credentials in Brevo dashboard

**"Connection timeout"**
- Check network connectivity
- Verify Brevo service status
- Try different SMTP settings

### Debug Mode
Enable debug logging by setting:
```env
DEBUG=true
```

### Log Analysis
Check server logs for detailed error information:
- Configuration loading attempts
- SMTP connection details
- Email sending results

## API Endpoints

### Admin Configuration
- `GET /api/admin/brevo-config` - Get current configuration
- `POST /api/admin/brevo-config` - Create new configuration
- `PATCH /api/admin/brevo-config/:id` - Update configuration
- `POST /api/admin/brevo-config/test` - Test connection
- `POST /api/admin/brevo-config/test-email` - Test email sending

### Public Endpoints
- `POST /api/contact` - Submit contact form (triggers email)
- `POST /api/job-applications` - Submit job application
- `POST /api/brochure-download` - Request brochure download

## Performance Considerations

### Configuration Caching
- Database configurations are cached in memory
- Environment variables are read once at startup
- No database queries on every email send

### Connection Pooling
- SMTP connections are reused when possible
- Automatic reconnection on connection loss
- Configurable timeouts and retries

## Future Enhancements

### Planned Features
- Multiple sender configurations
- Email template management
- Advanced analytics and tracking
- Webhook integrations

### Scalability
- Redis caching for configuration
- Queue-based email processing
- Multiple SMTP provider support
- Load balancing for high volume

## Support

For issues related to the dynamic Brevo configuration:

1. Check this documentation first
2. Review server logs for error details
3. Test with the provided test script
4. Verify Brevo account configuration
5. Check environment variable setup

## Version History

- **v1.0**: Initial dynamic configuration implementation
- **v1.1**: Added environment variable fallback
- **v1.2**: Enhanced error handling and logging
- **v1.3**: Added comprehensive testing suite
