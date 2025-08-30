# 🔧 Brevo SMTP Configuration Guide

## ❌ **Current Issue:**
Your contact form and job application form are **working** (data is being saved to the database), but **emails are not being sent** because of incorrect SMTP credentials.

## 🔑 **What You Need:**

### **Current Configuration (Wrong):**
```env
BREVO_API_KEY=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
BREVO_SENDER_EMAIL=liridon.salihi123@gmail.com
```

### **What You Need (Correct):**
```env
# Brevo SMTP Configuration
BREVO_SMTP_LOGIN=liridon.salihi123@gmail.com
BREVO_SMTP_KEY=your_smtp_key_here
BREVO_SENDER_EMAIL=liridon.salihi123@gmail.com
```

## 📋 **Step-by-Step Setup:**

### 1. **Go to Brevo Dashboard**
- Login to [Brevo](https://app.brevo.com/)
- Navigate to **Senders & IP** → **SMTP & API**

### 2. **Get SMTP Credentials**
- Click on **SMTP** tab
- Note down:
  - **SMTP Server**: `smtp-relay.brevo.com`
  - **SMTP Port**: `587`
  - **SMTP Login**: Your verified email (e.g., `liridon.salihi123@gmail.com`)
  - **SMTP Key**: Generate a new SMTP key

### 3. **Generate SMTP Key**
- In the SMTP tab, click **Generate new key**
- Copy the generated key (it looks like: `xsmtpsib-...`)

### 4. **Update Your .env File**
Replace your current `.env` file with:
```env
# Brevo SMTP Configuration
BREVO_SMTP_LOGIN=liridon.salihi123@gmail.com
BREVO_SMTP_KEY=xsmtpsib-your-actual-smtp-key-here
BREVO_SENDER_EMAIL=liridon.salihi123@gmail.com
```

## 🔍 **Test the Configuration:**

After updating the `.env` file, run:
```bash
npx tsx test-brevo-email.cjs
```

You should see:
- ✅ Brevo configuration loaded successfully
- ✅ Connection successful
- ✅ Test email sent successfully
- ✅ Contact form emails working
- ✅ Job application emails working

## 📧 **What Will Work After Fix:**

1. **Contact Form**: 
   - ✅ Saves message to database
   - ✅ Sends notification email to admin
   - ✅ Sends auto-reply to user

2. **Job Application Form**:
   - ✅ Saves application to database
   - ✅ Sends notification email to admin
   - ✅ Sends auto-reply to applicant

## 🚨 **Important Notes:**

- **API Key ≠ SMTP Key**: These are different credentials
- **SMTP Login**: Usually your verified sender email
- **SMTP Key**: Generated specifically for SMTP access
- **Port 587**: Standard SMTP port (not 465)

## 🆘 **Need Help?**

If you still have issues after following this guide:
1. Check Brevo SMTP logs
2. Verify email is verified in Brevo
3. Ensure SMTP key is correct
4. Check firewall/network settings
