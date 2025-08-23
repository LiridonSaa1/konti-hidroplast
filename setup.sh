#!/bin/bash

# Konti Hidroplast Project Setup Script for Replit

echo "🚀 Setting up Konti Hidroplast project..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create uploads directory if it doesn't exist
if [ ! -d "uploads" ]; then
    echo "📁 Creating uploads directory..."
    mkdir -p uploads
fi

# Set proper permissions for uploads directory (Unix/Linux only)
if [ "$(uname)" != "MINGW64_NT"* ] && [ "$(uname)" != "MSYS_NT"* ]; then
    chmod 755 uploads
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  WARNING: DATABASE_URL environment variable is not set!"
    echo "   Please set up your Neon PostgreSQL database and add the DATABASE_URL to your Replit secrets."
    echo "   Go to: https://console.neon.tech/"
fi

# Check if BREVO_API_KEY is set (optional)
if [ -z "$BREVO_API_KEY" ]; then
    echo "ℹ️  INFO: BREVO_API_KEY is not set. Email functionality will be disabled."
fi

# Push database schema (only if DATABASE_URL is set)
if [ ! -z "$DATABASE_URL" ]; then
    echo "🗄️  Pushing database schema..."
    npm run db:push
else
    echo "⚠️  Skipping database setup - DATABASE_URL not configured"
fi

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your environment variables in Replit Secrets:"
echo "   - DATABASE_URL (required)"
echo "   - BREVO_API_KEY (optional, for email)"
echo "   - SESSION_SECRET (optional, will use default)"
echo ""
echo "2. Click the 'Run' button to start the development server"
echo ""
echo "🌐 Your app will be available at the Replit preview URL"

