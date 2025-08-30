# PowerShell script to set up Brevo SMTP environment variables
# Run this script as Administrator or in your PowerShell session

Write-Host "🔧 Setting up Brevo SMTP Environment Variables..." -ForegroundColor Green
Write-Host ""

# Check if .env file exists
if (Test-Path ".env") {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
} else {
    Write-Host "📝 Creating .env file..." -ForegroundColor Yellow
    
    # Create .env file content
    $envContent = @"
# Brevo SMTP Configuration
# Replace these values with your actual Brevo SMTP credentials

# Your Brevo SMTP login email (usually your Gmail address)
BREVO_SMTP_LOGIN=your_email@gmail.com

# Your Brevo SMTP key (get this from https://app.brevo.com/settings/keys/smtp)
BREVO_SMTP_KEY=your_smtp_key_here

# Your sender email (can be the same as SMTP login)
BREVO_SENDER_EMAIL=your_email@gmail.com

# Optional: Database configuration
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
"@

    # Write to .env file
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ .env file created successfully!" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit the .env file and replace the placeholder values with your actual credentials"
Write-Host "2. Get your SMTP key from: https://app.brevo.com/settings/keys/smtp"
Write-Host "3. Restart your server after updating the .env file"
Write-Host ""
Write-Host "🔑 Example .env file content:" -ForegroundColor Yellow
Write-Host "BREVO_SMTP_LOGIN=john.doe@gmail.com"
Write-Host "BREVO_SMTP_KEY=xkeyset-1234567890abcdef"
Write-Host "BREVO_SENDER_EMAIL=john.doe@gmail.com"
Write-Host ""
Write-Host "⚠️  IMPORTANT: Never commit your .env file to version control!" -ForegroundColor Red
Write-Host "   Make sure .env is in your .gitignore file"
