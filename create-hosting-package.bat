@echo off
echo 📦 Creating Hosting Package for Apsara Livestream
echo ================================================

REM Create a clean directory for hosting
if exist "hosting-package" rmdir /s /q hosting-package
mkdir hosting-package

echo ✅ Copying essential files...

REM Copy essential files and folders
xcopy /E /I src hosting-package\src
xcopy /E /I public hosting-package\public
copy package.json hosting-package\
copy package-lock.json hosting-package\
copy standalone-server.js hosting-package\
copy next.config.ts hosting-package\
copy tsconfig.json hosting-package\
copy postcss.config.mjs hosting-package\
copy .env.local hosting-package\
copy hosting-setup.js hosting-package\
copy HOSTING-SETUP.md hosting-package\
copy README-DEPLOYMENT.md hosting-package\

REM Create a simple start script
echo node hosting-setup.js > hosting-package\setup.bat
echo npm run hosting:start > hosting-package\start.bat

echo.
echo ✅ Package created in 'hosting-package' folder
echo.
echo 📋 Next Steps:
echo 1. Compress the 'hosting-package' folder to ZIP
echo 2. Upload the ZIP file to your hosting
echo 3. Extract the ZIP file on your hosting
echo 4. Run the setup script
echo.
echo 🎯 Your hosting package is ready!

pause
