#!/bin/bash

# Apsara Livestream Deployment Script
# This script helps deploy the livestream application to your host

echo "🚀 Apsara Livestream Deployment Script"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    echo "   Please update Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo ""
    echo "⚙️  Creating environment configuration..."
    cat > .env.local << EOF
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
EOF
    echo "✅ Environment configuration created"
fi

# Ask user for deployment type
echo ""
echo "🎯 Choose deployment type:"
echo "1) Standalone (Recommended - No build required)"
echo "2) Production Build (Advanced)"
echo "3) With Real-time Features (Socket.IO)"

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting Apsara Livestream (Standalone Mode)..."
        echo "   Access your app at: http://localhost:3000"
        echo "   Press Ctrl+C to stop"
        echo ""
        npm run start:standalone
        ;;
    2)
        echo ""
        echo "🔨 Building application for production..."
        npm run build
        
        if [ $? -ne 0 ]; then
            echo "❌ Build failed. Using standalone mode instead..."
            npm run start:standalone
        else
            echo "✅ Build successful"
            echo "🚀 Starting production server..."
            echo "   Access your app at: http://localhost:3000"
            echo "   Press Ctrl+C to stop"
            echo ""
            npm run start
        fi
        ;;
    3)
        echo ""
        echo "📡 Installing real-time dependencies..."
        npm install socket.io socket.io-client simple-peer
        
        if [ $? -ne 0 ]; then
            echo "❌ Failed to install real-time dependencies"
            exit 1
        fi
        
        echo "✅ Real-time dependencies installed"
        echo "⚠️  Note: You need to uncomment socket code in components"
        echo "🚀 Starting server with Socket.IO support..."
        echo "   Access your app at: http://localhost:3000"
        echo "   Press Ctrl+C to stop"
        echo ""
        npm run dev:server
        ;;
    *)
        echo "❌ Invalid choice. Using standalone mode..."
        npm run start:standalone
        ;;
esac
