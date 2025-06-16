# 🚀 Apsara Livestream - Hosting Setup Guide

## 📦 Files to Upload to Your Hosting

### **Essential Files (Must Upload):**
```
apsara-livestream/
├── src/                          # Application source code
├── public/                       # Static assets
├── package.json                  # Dependencies
├── package-lock.json            # Dependency lock file
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── standalone-server.js         # Production server
├── server.js                    # Socket.IO server (optional)
└── .env.local                   # Environment variables
```

### **Optional Files:**
```
├── README-DEPLOYMENT.md         # Deployment guide
├── deploy.sh                    # Linux deployment script
├── deploy.bat                   # Windows deployment script
├── ecosystem.config.js          # PM2 configuration
└── Dockerfile                   # Docker configuration
```

## 🌐 **Hosting Type Detection**

### **Check Your Hosting Type:**

1. **Shared Hosting (cPanel/Plesk)**
   - Has cPanel or Plesk control panel
   - Limited terminal access
   - May have Node.js selector

2. **VPS/Cloud Server**
   - Full root/sudo access
   - SSH terminal access
   - Can install software

3. **Managed Node.js Hosting**
   - Specialized for Node.js apps
   - Examples: Heroku, Vercel, Netlify

## 📋 **Pre-Upload Checklist**

- [ ] Hosting supports Node.js 18+
- [ ] You have FTP/SSH access
- [ ] Port 3000 is available (or you can configure custom port)
- [ ] At least 1GB RAM available
- [ ] 500MB+ storage space

## 🔧 **Environment Configuration**

Create `.env.local` file:
```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
```

For custom port (if 3000 is not available):
```env
NODE_ENV=production
PORT=8080
HOST=0.0.0.0
```

## 🚀 **Quick Start Commands**

After uploading files to your hosting:

```bash
# Install dependencies
npm install

# Start application (choose one)
npm run start:standalone    # Recommended for most hosting
npm run start              # Standard Next.js production
npm run dev               # Development mode
```

## 📱 **Access Your Application**

- **With Domain**: http://yourdomain.com:3000
- **With IP**: http://your-server-ip:3000
- **Custom Port**: http://yourdomain.com:8080

## 🛠️ **Troubleshooting**

### **Common Issues:**

1. **Port Access**: If port 3000 is blocked, change PORT in .env.local
2. **Permissions**: Ensure files have correct permissions (755 for directories, 644 for files)
3. **Node.js Version**: Ensure hosting supports Node.js 18+
4. **Memory**: Application needs at least 512MB RAM

## 📞 **Support**

If you encounter issues:
1. Check hosting control panel for Node.js settings
2. Verify all files uploaded correctly
3. Check error logs in hosting control panel
4. Ensure dependencies installed successfully
