@echo off
echo 🚀 Apsara Livestream Deployment Script
echo ======================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm detected
npm --version

REM Install dependencies
echo.
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo.
    echo ⚙️  Creating environment configuration...
    echo NODE_ENV=production > .env.local
    echo PORT=3000 >> .env.local
    echo HOST=0.0.0.0 >> .env.local
    echo ✅ Environment configuration created
)

REM Ask user for deployment type
echo.
echo 🎯 Choose deployment type:
echo 1) Standalone (Recommended - No build required)
echo 2) Production Build (Advanced)
echo 3) With Real-time Features (Socket.IO)
echo.

set /p choice=Enter your choice (1-3): 

if "%choice%"=="1" (
    echo.
    echo 🚀 Starting Apsara Livestream (Standalone Mode)...
    echo    Access your app at: http://localhost:3000
    echo    Press Ctrl+C to stop
    echo.
    npm run start:standalone
) else if "%choice%"=="2" (
    echo.
    echo 🔨 Building application for production...
    npm run build
    
    if %errorlevel% neq 0 (
        echo ❌ Build failed. Using standalone mode instead...
        npm run start:standalone
    ) else (
        echo ✅ Build successful
        echo 🚀 Starting production server...
        echo    Access your app at: http://localhost:3000
        echo    Press Ctrl+C to stop
        echo.
        npm run start
    )
) else if "%choice%"=="3" (
    echo.
    echo 📡 Installing real-time dependencies...
    npm install socket.io socket.io-client simple-peer
    
    if %errorlevel% neq 0 (
        echo ❌ Failed to install real-time dependencies
        pause
        exit /b 1
    )
    
    echo ✅ Real-time dependencies installed
    echo ⚠️  Note: You need to uncomment socket code in components
    echo 🚀 Starting server with Socket.IO support...
    echo    Access your app at: http://localhost:3000
    echo    Press Ctrl+C to stop
    echo.
    npm run dev:server
) else (
    echo ❌ Invalid choice. Using standalone mode...
    npm run start:standalone
)

pause
