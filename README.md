# 🎥 Apsara Livestream

A modern, real-time video streaming web application built with Next.js, React, and TypeScript.

![Apsara Livestream](https://img.shields.io/badge/Status-Ready%20for%20Production-green)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-blue)
![React](https://img.shields.io/badge/React-19-blue)

## ✨ Features

- 🎬 **Streamer Interface**: Start/stop streaming with video controls
- 👥 **Viewer Interface**: Browse and watch live streams
- 💬 **Real-time Chat**: Interactive chat for viewers
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎨 **Modern UI**: Beautiful gradient design with Tailwind CSS
- ⚡ **WebRTC Ready**: Built for real-time video streaming
- 🔧 **Easy Deployment**: Multiple deployment options

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/apsara-livestream.git
cd apsara-livestream

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Deployment

### Option 1: Standalone Mode (Recommended)
```bash
npm run start:standalone
```

### Option 2: Production Build
```bash
npm run build
npm run start
```

### Option 3: With Real-time Features
```bash
npm install socket.io socket.io-client simple-peer
npm run dev:server
```

## 🌐 Hosting Deployment

### Hostinger
1. Upload project files to your hosting
2. Enable Node.js 18+ in control panel
3. Run: `node hostinger-setup.js`
4. Start: `npm run hosting:start`

### VPS/Cloud Server
1. Clone repository: `git clone <your-repo-url>`
2. Install dependencies: `npm install`
3. Start application: `npm run start:standalone`

### Docker
```bash
docker build -t apsara-livestream .
docker run -p 3000:3000 apsara-livestream
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Real-time**: Socket.IO (optional)
- **Video**: WebRTC capabilities

## 📁 Project Structure

```
apsara-livestream/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   └── hooks/              # Custom hooks
├── public/                 # Static assets
├── server.js              # Socket.IO server
├── standalone-server.js   # Production server
└── deploy scripts/        # Deployment helpers
```

## 🎯 Usage

### For Streamers
1. Click "Start Streaming"
2. Allow camera/microphone access
3. Set your stream title
4. Click "Start Stream" to go live

### For Viewers
1. Click "Watch Streams"
2. Browse available live streams
3. Click on any stream to watch
4. Use chat to interact

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
```

### Custom Port
```env
PORT=8080  # Use different port if 3000 is unavailable
```

## 📚 Documentation

- [Deployment Guide](README-DEPLOYMENT.md)
- [Hosting Setup](HOSTING-SETUP.md)
- [API Documentation](docs/api.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@apsaralive.com
- 💬 Discord: [Join our community](https://discord.gg/apsaralive)
- 📖 Docs: [Documentation](https://docs.apsaralive.com)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Made with ❤️ for the streaming community**
