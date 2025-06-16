#!/usr/bin/env node

/**
 * Apsara Livestream - Hosting Setup Script
 * This script helps configure the application for different hosting environments
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Apsara Livestream - Hosting Setup');
console.log('=====================================\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
    console.log('❌ Node.js 18+ is required. Current version:', nodeVersion);
    console.log('   Please upgrade Node.js: https://nodejs.org/');
    process.exit(1);
}

console.log('✅ Node.js version:', nodeVersion);

// Check if package.json exists
if (!fs.existsSync('package.json')) {
    console.log('❌ package.json not found. Please run this script from the project root.');
    process.exit(1);
}

console.log('✅ Project files detected');

// Create .env.local if it doesn't exist
if (!fs.existsSync('.env.local')) {
    const envContent = `NODE_ENV=production
PORT=3000
HOST=0.0.0.0`;
    
    fs.writeFileSync('.env.local', envContent);
    console.log('✅ Environment configuration created');
} else {
    console.log('✅ Environment configuration exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
    execSync('npm install --production', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
} catch (error) {
    console.log('❌ Failed to install dependencies');
    console.log('   Try running: npm install --production');
    process.exit(1);
}

// Check if standalone server exists
if (!fs.existsSync('standalone-server.js')) {
    console.log('❌ standalone-server.js not found');
    process.exit(1);
}

console.log('✅ Server files ready');

// Display success message
console.log('\n🎉 Setup Complete!');
console.log('==================');
console.log('\n📋 Next Steps:');
console.log('1. Start your application:');
console.log('   npm run hosting:start');
console.log('\n2. Access your app:');
console.log('   http://your-domain.com:3000');
console.log('   http://your-server-ip:3000');
console.log('\n3. For custom port, edit .env.local file');
console.log('\n🎯 Your Apsara Livestream is ready!');

// Check available ports
console.log('\n🔍 Checking system...');
try {
    const os = require('os');
    const networkInterfaces = os.networkInterfaces();
    
    console.log('📡 Available network interfaces:');
    Object.keys(networkInterfaces).forEach(name => {
        const interfaces = networkInterfaces[name];
        interfaces.forEach(interface => {
            if (interface.family === 'IPv4' && !interface.internal) {
                console.log(`   ${name}: ${interface.address}`);
            }
        });
    });
} catch (error) {
    // Ignore network interface errors
}

console.log('\n🚀 Ready to launch!');
console.log('Run: npm run hosting:start');
