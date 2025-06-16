@echo off
echo 🚀 Apsara Livestream - Git Push Helper
echo =====================================

echo.
echo 📋 Before running this script:
echo 1. Create a new repository on GitHub.com
echo 2. Repository name: apsara-livestream
echo 3. Don't initialize with README or .gitignore
echo 4. Copy the repository URL from GitHub
echo.

set /p REPO_URL=Enter your GitHub repository URL (e.g., https://github.com/yourusername/apsara-livestream.git): 

if "%REPO_URL%"=="" (
    echo ❌ No URL provided. Exiting.
    pause
    exit /b 1
)

echo.
echo 🔗 Adding remote repository...
git remote add origin %REPO_URL%

if %errorlevel% neq 0 (
    echo ❌ Failed to add remote repository
    echo    This might be because a remote already exists
    echo    Try: git remote set-url origin %REPO_URL%
    pause
    exit /b 1
)

echo ✅ Remote repository added

echo.
echo 🌿 Renaming branch to main...
git branch -M main

echo.
echo 📤 Pushing to GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo ❌ Failed to push to GitHub
    echo    Common issues:
    echo    1. Check your internet connection
    echo    2. Verify the repository URL is correct
    echo    3. Make sure you have push permissions
    echo    4. You might need to authenticate with GitHub
    pause
    exit /b 1
)

echo.
echo 🎉 Successfully pushed to GitHub!
echo ================================

echo.
echo 📋 What was pushed:
echo ✅ Complete Apsara Livestream application
echo ✅ Source code (src/ folder)
echo ✅ Configuration files
echo ✅ Deployment scripts
echo ✅ Documentation
echo ✅ README with setup instructions

echo.
echo 🌐 Your repository is now available at:
echo %REPO_URL%

echo.
echo 📋 Next Steps:
echo 1. Visit your GitHub repository to verify files
echo 2. Share the repository URL with others
echo 3. Clone to deploy: git clone %REPO_URL%
echo 4. For hosting deployment, see README-DEPLOYMENT.md

echo.
echo 🎯 Your Apsara Livestream is now on GitHub!

pause
