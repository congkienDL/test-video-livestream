# 🚀 Apsara Livestream - Host Deployment Guide

## 📦 What You're Getting

A complete **real-time video streaming web application** built with:
- **Next.js 15** + **React 19** + **TypeScript**
- **Tailwind CSS** for modern, responsive design
- **WebRTC** capabilities for video streaming
- **Socket.IO** ready for real-time features
- **Lucide React** for beautiful icons

## 🎯 Features

✅ **Streamer Interface**
- Camera access and video preview
- Start/stop streaming controls
- Video/audio toggle controls
- Stream title configuration
- Real-time viewer count
- Stream key generation

✅ **Viewer Interface**
- Browse live streams
- Search functionality
- Join streams with chat
- Live viewer count updates
- Responsive design

✅ **Modern UI**
- Professional gradient backgrounds
- Smooth animations and transitions
- Mobile-responsive design
- Dark theme optimized

## 🏗️ Quick Deployment to Your Host

### Option 1: Simple Copy & Run (Recommended)

1. **Copy the entire `apsara-livestream` folder** to your host server

2. **Install Node.js 18+** on your host (if not already installed)

3. **Navigate to the project directory**:
   ```bash
   cd apsara-livestream
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the application**:
   ```bash
   npm run start:standalone
   ```

6. **Access your app**:
   - Local: http://localhost:3000
   - Network: http://your-server-ip:3000

### Option 2: Production Build (Advanced)

If you want to build for production:

1. **Follow steps 1-4 from Option 1**

2. **Build the application**:
   ```bash
   npm run build
   ```

3. **Start production server**:
   ```bash
   npm run start
   ```

### Option 3: With Real-time Features

To enable Socket.IO real-time features:

1. **Install additional dependencies**:
   ```bash
   npm install socket.io socket.io-client simple-peer
   ```

2. **Uncomment socket code** in these files:
   - `src/components/StreamerView.tsx`
   - `src/components/ViewerView.tsx`
   - `src/hooks/useSocket.ts`

3. **Start with Socket.IO server**:
   ```bash
   npm run dev:server
   ```

## 🌐 Domain Setup

### With Custom Domain

1. **Point your domain** to your server IP
2. **Configure reverse proxy** (Nginx example):

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Enable SSL** with Let's Encrypt:
```bash
sudo certbot --nginx -d yourdomain.com
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:
```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
```

### Firewall Setup

Open the required port:
```bash
# Ubuntu/Debian
sudo ufw allow 3000

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

## 🚀 Production Deployment with PM2

For production environments, use PM2:

1. **Install PM2**:
   ```bash
   npm install -g pm2
   ```

2. **Create ecosystem file** (`ecosystem.config.js`):
   ```javascript
   module.exports = {
     apps: [{
       name: 'apsara-livestream',
       script: 'standalone-server.js',
       instances: 1,
       autorestart: true,
       watch: false,
       max_memory_restart: '1G',
       env: {
         NODE_ENV: 'production',
         PORT: 3000
       }
     }]
   }
   ```

3. **Start with PM2**:
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

## 🐳 Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:standalone"]
```

Build and run:
```bash
docker build -t apsara-livestream .
docker run -p 3000:3000 apsara-livestream
```

## 📱 Testing Your Deployment

1. **Open browser** and go to your server URL
2. **Test Streamer Mode**:
   - Click "Start Streaming"
   - Allow camera access
   - Set stream title
   - Click "Start Stream"
3. **Test Viewer Mode**:
   - Click "Watch Streams"
   - Browse available streams
   - Test chat functionality

## 🔒 Security Considerations

1. **Use HTTPS** in production (required for WebRTC)
2. **Configure firewall** properly
3. **Keep dependencies updated**
4. **Use environment variables** for sensitive data
5. **Implement rate limiting** for production

## 🛠️ Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Find process using port 3000
netstat -tulpn | grep 3000
# Kill the process
kill -9 <PID>
```

**Permission denied:**
- Use ports > 1024 or run with sudo
- Check file permissions

**Camera not working:**
- Ensure HTTPS in production
- Check browser permissions

**Build fails:**
- Use `npm run start:standalone` instead
- Check Node.js version (18+ required)

## 📊 Performance Optimization

1. **Enable gzip compression**
2. **Use CDN** for static assets
3. **Implement caching**
4. **Monitor with tools** like PM2 monitoring

## 🎉 Success!

Your Apsara Livestream application is now ready for production use!

**Access URLs:**
- **Local**: http://localhost:3000
- **Network**: http://your-server-ip:3000
- **Domain**: http://yourdomain.com (with proper setup)

## 📞 Support

If you encounter any issues:
1. Check the console logs
2. Verify all dependencies are installed
3. Ensure proper file permissions
4. Check firewall settings

---

**Built with ❤️ using modern web technologies**
