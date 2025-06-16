const { createServer } = require('http');
const next = require('next');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

// Create Next.js app
const app = next({ 
  dev: false, // Force production mode
  hostname, 
  port,
  dir: __dirname
});

const handler = app.getRequestHandler();

console.log('🚀 Starting Apsara Livestream Server...');

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    // Add CORS headers for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    
    handler(req, res);
  });

  httpServer
    .once('error', (err) => {
      console.error('❌ Server error:', err);
      process.exit(1);
    })
    .listen(port, hostname, () => {
      console.log(`✅ Apsara Livestream ready!`);
      console.log(`🌐 Local:    http://${hostname}:${port}`);
      console.log(`🌐 Network:  http://localhost:${port}`);
      console.log('');
      console.log('📱 Features available:');
      console.log('   • Start/Stop streaming');
      console.log('   • Video preview and controls');
      console.log('   • Stream viewer interface');
      console.log('   • Mock real-time chat');
      console.log('   • Responsive design');
      console.log('');
      console.log('🔧 To enable real-time features:');
      console.log('   1. Install: npm install socket.io socket.io-client');
      console.log('   2. Uncomment socket code in components');
      console.log('   3. Use server.js instead of this file');
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});
