const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = true; // Force development mode to avoid build requirement
const hostname = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

console.log('🚀 Starting Apsara Livestream Server (Standalone Mode)...');

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true);
      
      // Handle the request
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
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
    console.log('   • ✅ Start/Stop streaming interface');
    console.log('   • ✅ Video preview and controls');
    console.log('   • ✅ Stream viewer interface');
    console.log('   • ✅ Mock real-time chat');
    console.log('   • ✅ Responsive design');
    console.log('   • ✅ Modern UI with Tailwind CSS');
    console.log('');
    console.log('🎯 Ready for deployment to your host!');
    console.log('');
    console.log('📋 Deployment options:');
    console.log('   1. Copy entire folder to your host');
    console.log('   2. Run: npm install');
    console.log('   3. Run: node standalone-server.js');
    console.log('');
    console.log('🔧 To enable real-time features later:');
    console.log('   1. Install: npm install socket.io socket.io-client');
    console.log('   2. Uncomment socket code in components');
    console.log('   3. Use server.js instead');
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
