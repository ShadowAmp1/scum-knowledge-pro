@echo off
echo 🔄 SCUM Knowledge PRO - Auto Deployment Script
echo =====================================

echo.
echo 📝 Step 1: Fixing TypeScript errors...
& "c:\Program Files\nodejs\node.exe" fix-weapons-difficulty.js
if %errorlevel% neq 0 (
    echo ❌ Failed to fix TypeScript errors
    pause
    exit /b 1
)

echo.
echo 📦 Step 2: Installing dependencies...
& "c:\Program Files\nodejs\npm.cmd" install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 📝 Step 3: Committing changes...
& "c:\Program Files\Git\bin\git.exe" add .
& "c:\Program Files\Git\bin\git.exe" commit -m "🚀 Major Update: SCUM 0.96 Features

✨ New Sections:
- /crafting - Complete crafting system with filters
- /damage-calculator - Interactive damage calculator  
- /build-builder - Weapon build creator
- /mission-tracker - Mission progress tracker
- /global-search - Unified search system

📊 New Data:
- 3 new weapons (SCAR-L, MAC-10, SCAR-DMR)
- 4 new equipment items
- 4 new missions  
- 7 crafting recipes
- Updated filters for 0.96 content

🔧 Technical Updates:
- Updated package.json with Next.js 15.1.6
- Fixed TypeScript errors
- Enhanced search and filtering
- Added deployment guides

🚀 Ready for production deployment"
if %errorlevel% neq 0 (
    echo ❌ Failed to commit changes
    pause
    exit /b 1
)

echo.
echo 🚀 Step 4: Pushing to GitHub...
& "c:\Program Files\Git\bin\git.exe" push origin main
if %errorlevel% neq 0 (
    echo ❌ Failed to push to GitHub
    pause
    exit /b 1
)

echo.
echo ✅ Deployment completed successfully!
echo.
echo 📋 Next steps:
echo 1. Check Vercel/Railway for automatic deployment
echo 2. Test new features at your-domain.com
echo 3. Monitor deployment logs for errors
echo.
echo 🌐 Your site will be available shortly!
echo.
pause
