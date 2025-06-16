// Apsara Livestream - Main Application Entry Point
// This file helps hosting providers recognize this as a Node.js application

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Apsara Livestream Application...');

// Start the standalone server
const serverPath = path.join(__dirname, 'standalone-server.js');
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  cwd: __dirname
});

server.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`🛑 Server process exited with code ${code}`);
  if (code !== 0) {
    process.exit(code);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully');
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully');
  server.kill('SIGINT');
});
