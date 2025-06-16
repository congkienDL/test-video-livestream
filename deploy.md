# Apsara Livestream - Deployment Guide

## 🚀 Deploying to Your Host

### Prerequisites
- Node.js 18+ installed on your host
- npm or yarn package manager
- Git (optional, for version control)

### Option 1: Direct File Transfer

1. **Copy the entire project folder** to your host server:
   ```
   apsara-livestream/
   ├── src/
   ├── public/
   ├── package.json
   ├── server.js
   ├── next.config.ts
   ├── tsconfig.json
   ├── tailwind.config.ts
   └── postcss.config.mjs
   ```

2. **Install dependencies** on your host:
   ```bash
   cd apsara-livestream
   npm install
   ```

3. **Build the application**:
   ```bash
   npm run build
   ```

4. **Start the production server**:
   ```bash
   npm run start
   ```

### Option 2: Using Git (Recommended)

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to your repository**:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Clone on your host**:
   ```bash
   git clone <your-repo-url>
   cd apsara-livestream
   ```

4. **Install and build**:
   ```bash
   npm install
   npm run build
   npm run start
   ```

### Option 3: Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```

Build and run:
```bash
docker build -t apsara-livestream .
docker run -p 3000:3000 apsara-livestream
```

### Environment Configuration

Create a `.env.local` file for production:
```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
```

### Production Considerations

1. **SSL/HTTPS**: For WebRTC to work properly, you'll need HTTPS in production
2. **Reverse Proxy**: Use Nginx or Apache as a reverse proxy
3. **Process Manager**: Use PM2 for process management
4. **Firewall**: Open port 3000 (or your chosen port)

### PM2 Setup (Recommended for Production)

1. **Install PM2**:
   ```bash
   npm install -g pm2
   ```

2. **Create ecosystem file** (`ecosystem.config.js`):
   ```javascript
   module.exports = {
     apps: [{
       name: 'apsara-livestream',
       script: 'server.js',
       instances: 'max',
       exec_mode: 'cluster',
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

### Nginx Configuration

Create `/etc/nginx/sites-available/apsara-livestream`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Troubleshooting

1. **Port already in use**: Change PORT in environment variables
2. **Permission denied**: Run with sudo or change port to > 1024
3. **Build fails**: Ensure all dependencies are installed
4. **WebRTC not working**: Ensure HTTPS is configured

### Performance Optimization

1. **Enable gzip compression**
2. **Use CDN for static assets**
3. **Implement caching strategies**
4. **Monitor with tools like New Relic or DataDog**

### Security

1. **Use HTTPS in production**
2. **Implement rate limiting**
3. **Sanitize user inputs**
4. **Use environment variables for secrets**
5. **Keep dependencies updated**

---

## 📱 Access Your Application

Once deployed, your livestream application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://your-server-ip:3000
- **Domain**: http://your-domain.com (with proper DNS setup)

## 🎯 Features Available

- ✅ Start/Stop streaming interface
- ✅ Video preview and controls
- ✅ Stream viewer interface
- ✅ Real-time chat (when Socket.IO is re-enabled)
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

## 🔧 Re-enabling Real-time Features

To re-enable Socket.IO functionality after deployment:

1. Add back the dependencies:
   ```bash
   npm install socket.io socket.io-client simple-peer
   ```

2. Uncomment the socket code in:
   - `src/components/StreamerView.tsx`
   - `src/components/ViewerView.tsx`
   - `src/hooks/useSocket.ts`

3. Rebuild and restart:
   ```bash
   npm run build
   npm run start:server
   ```
