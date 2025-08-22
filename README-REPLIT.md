# Konti Hidroplast - Replit Setup Guide

This guide will help you set up and run the Konti Hidroplast project on Replit.

## 🚀 Quick Start

1. **Fork this Repl** to your account
2. **Set up environment variables** (see below)
3. **Click the Run button** or use the setup script

## 🔧 Environment Variables Setup

Go to your Replit project settings and add these secrets:

### Required Variables

- `DATABASE_URL` - Your Neon PostgreSQL connection string
  ```
  postgresql://username:password@ep-xxx.us-east-1.postgres.neon.tech/dbname?sslmode=require
  ```

### Optional Variables

- `BREVO_API_KEY` - For email functionality (contact forms)
- `SESSION_SECRET` - Custom session secret (uses default if not set)
- `BREVO_SENDER_EMAIL` - Email address for sending emails

## 🗄️ Database Setup

1. **Create a Neon Database**:
   - Go to [Neon Console](https://console.neon.tech/)
   - Create a new project
   - Copy the connection string

2. **Add DATABASE_URL**:
   - In Replit, go to Secrets (lock icon)
   - Add `DATABASE_URL` with your connection string

3. **Push Schema**:
   - The schema will be automatically pushed when you run the app
   - Or manually run: `npm run db:push`

## 📂 Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and schemas
├── migrations/      # Database migrations
├── uploads/         # File uploads directory
├── attached_assets/ # Static assets
└── .replit          # Replit configuration
```

## 🔄 Development Workflow

### Starting the App
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Database Operations
```bash
# Push schema changes
npm run db:push

# Generate migrations
npx drizzle-kit generate
```

## 🌐 Features

- **Corporate Website**: Product showcases, company info, news
- **Admin Panel**: Content management system
- **Multilingual**: English, Macedonian, German
- **Gallery Management**: Dynamic image galleries
- **Document Management**: PDF and image uploads
- **News System**: Rich article management
- **Certificate Management**: Categorized certificates
- **Team Management**: Staff and position management

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI, shadcn/ui
- **Hosting**: Optimized for Replit deployment

## 📝 Admin Access

After setup, you can access the admin panel at `/admin` (authentication required).

## 🔐 Security Notes

- Environment variables are stored securely in Replit Secrets
- Session management is configured for production
- File uploads are validated and restricted
- CORS is configured for Replit domains

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Verify `DATABASE_URL` is correctly set in Secrets
   - Check Neon database is running

2. **Build Errors**:
   - Run `npm install` to ensure all dependencies are installed
   - Check Node.js version compatibility

3. **File Upload Issues**:
   - Ensure `uploads/` directory exists and has proper permissions
   - Check file size limits in configuration

### Getting Help

- Check the main `replit.md` for detailed system architecture
- Review error logs in the Replit console
- Ensure all required environment variables are set

## 📧 Contact

For support with this Replit setup, refer to the project documentation or check the console logs for detailed error messages.


