# 🔧 Deployment Troubleshooting Guide

## ❌ Common Issue: "composer.json not found"

**Problem**: Your hosting provider is looking for PHP files instead of Node.js files.

**Solution**: Configure your hosting for Node.js applications.

## 🚀 Step-by-Step Fix

### **Option 1: Enable Node.js in Control Panel**

#### **For Hostinger:**
1. Login to hPanel
2. Go to "Node.js" section
3. Click "Create Application"
4. Configure:
   - **Node.js Version**: 18.x or higher
   - **Application Root**: `/public_html` or your domain folder
   - **Startup File**: `standalone-server.js`
   - **Application URL**: Your domain

#### **For cPanel:**
1. Find "Node.js Selector" or "Node.js App"
2. Create New Application
3. Set:
   - **Node.js Version**: 18+
   - **Application Root**: Your domain directory
   - **Startup File**: `standalone-server.js`

### **Option 2: Manual Git Deployment**

If auto-deployment doesn't work:

```bash
# SSH into your hosting server
ssh username@your-hosting-server.com

# Navigate to your domain directory
cd public_html  # or your domain folder

# Remove any existing files
rm -rf *

# Clone your repository
git clone https://github.com/congkienDL/test-video-livestream.git .

# Install dependencies
npm install

# Start the application
npm run start:standalone
```

### **Option 3: File Manager Upload**

1. **Download your repository** as ZIP from GitHub
2. **Extract the ZIP file** locally
3. **Upload all files** via File Manager to your domain folder
4. **Use Terminal** (if available) to run:
   ```bash
   npm install
   npm run start:standalone
   ```

## 🔍 Verification Steps

After deployment, verify:

1. **Check Node.js is enabled** in your hosting control panel
2. **Verify files are uploaded** to the correct directory
3. **Test the application** by visiting your domain
4. **Check error logs** in your hosting control panel

## 📞 Contact Hosting Support

If you're still having issues:

1. **Contact your hosting provider support**
2. **Tell them**: "I need to deploy a Node.js application"
3. **Mention**: "The application uses package.json, not composer.json"
4. **Request**: "Please enable Node.js 18+ for my domain"

## 🎯 Expected Result

After successful deployment:
- ✅ Your domain shows the Apsara Livestream homepage
- ✅ "Start Streaming" and "Watch Streams" buttons work
- ✅ No PHP or composer errors

## 🆘 Still Need Help?

If deployment continues to fail:
1. Share your hosting provider name
2. Share any error messages
3. Confirm if Node.js is available on your hosting plan
