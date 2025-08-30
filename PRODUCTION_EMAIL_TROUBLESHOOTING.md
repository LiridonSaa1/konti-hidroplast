# 🚨 Production Email Troubleshooting Guide

## **Problem:**
Emails work on localhost but fail on production server.

## **Root Causes & Solutions:**

### **1. Environment Variables Missing (Most Common)**

**Check if these are set on your production server:**
```bash
BREVO_SMTP_LOGIN=your_verified_email@gmail.com
BREVO_SMTP_KEY=xsmtpsib-your-smtp-key-here
BREVO_SENDER_EMAIL=your_verified_email@gmail.com
```

**How to check:**
```bash
# On your production server, run:
echo $BREVO_SMTP_LOGIN
echo $BREVO_SMTP_KEY
echo $BREVO_SENDER_EMAIL
```

**If they're missing, set them:**
```bash
export BREVO_SMTP_LOGIN=your_email@gmail.com
export BREVO_SMTP_KEY=your_smtp_key
export BREVO_SENDER_EMAIL=your_email@gmail.com
```

### **2. Wrong Credential Type**

**❌ WRONG (API Key):**
```bash
BREVO_API_KEY=xkeysib-...
```

**✅ CORRECT (SMTP Key):**
```bash
BREVO_SMTP_KEY=xsmtpsib-...
```

**How to get SMTP Key:**
1. Go to [Brevo Dashboard](https://app.brevo.com/)
2. Navigate to **Senders & IP** → **SMTP & API**
3. Click **SMTP** tab
4. Generate new **SMTP Key**

### **3. Email Not Verified in Brevo**

**Check if your sender email is verified:**
1. Go to [Brevo Dashboard](https://app.brevo.com/)
2. Navigate to **Senders & IP** → **Senders**
3. Ensure your email is listed and verified

### **4. Server Restart Required**

**After updating environment variables:**
```bash
# Restart your production server
pm2 restart all
# or
systemctl restart your-app
# or
docker restart your-container
```

### **5. Network/Firewall Issues**

**Check if your production server can reach Brevo:**
```bash
# Test SMTP connection
telnet smtp-relay.brevo.com 587

# Or use curl
curl -v telnet://smtp-relay.brevo.com:587
```

## **Testing Steps:**

### **Step 1: Test Production Configuration**
```bash
node test-production-email.cjs https://yourdomain.com
```

### **Step 2: Check Server Logs**
Look for these error messages in your production logs:
- "Brevo SMTP configuration not found in environment variables"
- "Failed to create Brevo transporter"
- "Connection failed"

### **Step 3: Verify Environment Variables**
```bash
# On production server
node -e "console.log('BREVO_SMTP_LOGIN:', process.env.BREVO_SMTP_LOGIN)"
node -e "console.log('BREVO_SMTP_KEY:', process.env.BREVO_SMTP_KEY ? 'SET' : 'NOT SET')"
node -e "console.log('BREVO_SENDER_EMAIL:', process.env.BREVO_SENDER_EMAIL)"
```

## **Common Production Deployment Issues:**

### **Docker/Container:**
```dockerfile
# In your Dockerfile or docker-compose.yml
environment:
  - BREVO_SMTP_LOGIN=${BREVO_SMTP_LOGIN}
  - BREVO_SMTP_KEY=${BREVO_SMTP_KEY}
  - BREVO_SENDER_EMAIL=${BREVO_SENDER_EMAIL}
```

### **PM2:**
```bash
# Create ecosystem.config.js
module.exports = {
  apps: [{
    name: 'your-app',
    script: 'server/index.ts',
    env: {
      BREVO_SMTP_LOGIN: 'your_email@gmail.com',
      BREVO_SMTP_KEY: 'your_smtp_key',
      BREVO_SENDER_EMAIL: 'your_email@gmail.com'
    }
  }]
}
```

### **Systemd:**
```ini
# In your service file
[Service]
Environment="BREVO_SMTP_LOGIN=your_email@gmail.com"
Environment="BREVO_SMTP_KEY=your_smtp_key"
Environment="BREVO_SENDER_EMAIL=your_email@gmail.com"
```

## **Quick Fix Checklist:**

- [ ] Set `BREVO_SMTP_LOGIN` (not API key)
- [ ] Set `BREVO_SMTP_KEY` (SMTP key, not API key)
- [ ] Set `BREVO_SENDER_EMAIL`
- [ ] Verify email in Brevo Senders list
- [ ] Restart production server
- [ ] Test with `test-production-email.cjs`

## **Still Not Working?**

1. **Check Brevo SMTP logs** in your Brevo dashboard
2. **Verify network connectivity** from your production server
3. **Check server logs** for specific error messages
4. **Test SMTP connection manually** using telnet/curl
5. **Contact Brevo support** if SMTP credentials are correct

## **Emergency Fallback:**

If emails still don't work, you can temporarily disable email notifications:
```bash
# Set this to disable email sending
export BREVO_SMTP_LOGIN=
export BREVO_SMTP_KEY=
export BREVO_SENDER_EMAIL=
```

**Note:** This will disable email notifications but your forms will still save data to the database.
