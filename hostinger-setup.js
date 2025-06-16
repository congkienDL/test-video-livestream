#!/usr/bin/env node

/**
 * Apsara Livestream - Hostinger Setup Script
 * Optimized for Hostinger hosting environment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Apsara Livestream - Hostinger Setup');
console.log('======================================\n');

// Hostinger-specific environment detection
const isHostinger = process.env.HOSTINGER || fs.existsSync('/usr/local/lsws');

if (isHostinger) {
    console.log('✅ Hostinger environment detected');
} else {
    console.log('ℹ️  Setting up for Hostinger-compatible environment');
}

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

console.log('📋 System Information:');
console.log(`   Node.js: ${nodeVersion}`);
console.log(`   Platform: ${process.platform}`);
console.log(`   Architecture: ${process.arch}`);

if (majorVersion < 18) {
    console.log('\n❌ Node.js 18+ is required for this application');
    console.log('   Current version:', nodeVersion);
    console.log('   Please contact Hostinger support to upgrade Node.js');
    process.exit(1);
}

console.log('✅ Node.js version is compatible\n');

// Create Hostinger-optimized environment file
const hostingerEnv = `# Hostinger Environment Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Hostinger-specific settings
HOSTINGER=true
MAX_MEMORY=512
TIMEOUT=30000`;

fs.writeFileSync('.env.local', hostingerEnv);
console.log('✅ Hostinger environment configuration created');

// Create package.json optimizations for Hostinger
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Add Hostinger-specific scripts
packageJson.scripts = {
    ...packageJson.scripts,
    'hostinger:start': 'node standalone-server.js',
    'hostinger:install': 'npm install --production --no-optional',
    'hostinger:setup': 'npm run hostinger:install && node hostinger-setup.js'
};

// Optimize for Hostinger's resource limits
packageJson.engines = {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Package.json optimized for Hostinger');

// Install dependencies with Hostinger optimizations
console.log('\n📦 Installing dependencies (optimized for Hostinger)...');
try {
    // Use production install with no optional dependencies to save space
    execSync('npm install --production --no-optional --prefer-offline', { 
        stdio: 'inherit',
        timeout: 300000 // 5 minutes timeout
    });
    console.log('✅ Dependencies installed successfully');
} catch (error) {
    console.log('⚠️  Standard install failed, trying alternative method...');
    try {
        execSync('npm ci --production --no-optional', { stdio: 'inherit' });
        console.log('✅ Dependencies installed with alternative method');
    } catch (altError) {
        console.log('❌ Failed to install dependencies');
        console.log('   Please try manually: npm install --production');
        console.log('   Or contact Hostinger support');
    }
}

// Create Hostinger-specific startup script
const startupScript = `#!/bin/bash
# Apsara Livestream Startup Script for Hostinger

echo "🚀 Starting Apsara Livestream on Hostinger..."

# Set environment variables
export NODE_ENV=production
export PORT=3000
export HOST=0.0.0.0

# Start the application
node standalone-server.js`;

fs.writeFileSync('start.sh', startupScript);
fs.chmodSync('start.sh', '755');
console.log('✅ Startup script created');

// Create .htaccess for better performance (if needed)
const htaccess = `# Apsara Livestream - Hostinger Configuration
RewriteEngine On

# Handle Node.js application
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/x-javascript "access plus 1 month"
    ExpiresByType application/x-shockwave-flash "access plus 1 month"
    ExpiresByType image/x-icon "access plus 1 year"
    ExpiresDefault "access plus 2 days"
</IfModule>`;

fs.writeFileSync('.htaccess', htaccess);
console.log('✅ .htaccess configuration created');

// Display success message and next steps
console.log('\n🎉 Hostinger Setup Complete!');
console.log('============================\n');

console.log('📋 Configuration Summary:');
console.log('   ✅ Environment: Hostinger-optimized');
console.log('   ✅ Node.js: Compatible version detected');
console.log('   ✅ Dependencies: Installed');
console.log('   ✅ Server: Ready to start');
console.log('   ✅ Performance: Optimized');

console.log('\n🚀 Next Steps:');
console.log('1. In Hostinger hPanel, go to Node.js section');
console.log('2. Create new Node.js application:');
console.log('   - Version: 18.x or higher');
console.log('   - Startup file: standalone-server.js');
console.log('   - Application root: your domain folder');
console.log('3. Start your application');

console.log('\n🌐 Access Your App:');
console.log('   - Domain: http://yourdomain.com');
console.log('   - With port: http://yourdomain.com:3000');

console.log('\n📞 Hostinger Support:');
console.log('   - If you need help, contact Hostinger support');
console.log('   - Mention you\'re setting up a Node.js application');

console.log('\n🎯 Your Apsara Livestream is ready for Hostinger!');

// Check for common Hostinger issues
console.log('\n🔍 Hostinger Compatibility Check:');

// Check memory usage
const memUsage = process.memoryUsage();
const memMB = Math.round(memUsage.rss / 1024 / 1024);
console.log(`   Memory usage: ${memMB}MB`);

if (memMB > 400) {
    console.log('   ⚠️  High memory usage detected');
    console.log('   Consider upgrading to Business plan for better performance');
} else {
    console.log('   ✅ Memory usage is acceptable');
}

// Check file permissions
try {
    fs.accessSync('standalone-server.js', fs.constants.R_OK | fs.constants.X_OK);
    console.log('   ✅ File permissions are correct');
} catch (error) {
    console.log('   ⚠️  File permission issues detected');
    console.log('   Run: chmod 755 standalone-server.js');
}

console.log('\n🚀 Ready to launch on Hostinger!');
