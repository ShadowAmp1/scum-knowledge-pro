@echo off
echo 🚨 EMERGENCY DEPLOY - SCUM 0.96 Update
echo =====================================

echo.
echo 📝 Step 1: Fix TypeScript errors...
& "c:\Program Files\nodejs\node.exe" fix-weapons-difficulty.js
if %errorlevel% neq 0 (
    echo ❌ Failed to fix TypeScript errors
    pause
    exit /b 1
)

echo.
echo 📦 Step 2: Install dependencies...
& "c:\Program Files\nodejs\npm.cmd" install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 📝 Step 3: Force add all files...
& "c:\Program Files\Git\bin\git.exe" add -A
if %errorlevel% neq 0 (
    echo ❌ Failed to add files
    pause
    exit /b 1
)

echo.
echo 📝 Step 4: Commit with force...
& "c:\Program Files\Git\bin\git.exe" commit -m "🚨 EMERGENCY: SCUM 0.96 Features - FIX DEPLOY

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

🚀 READY FOR PRODUCTION DEPLOYMENT"
if %errorlevel% neq 0 (
    echo ❌ Failed to commit changes
    pause
    exit /b 1
)

echo.
echo 🚀 Step 5: Force push...
& "c:\Program Files\Git\bin\git.exe" push origin main --force
if %errorlevel% neq 0 (
    echo ❌ Failed to push to GitHub
    pause
    exit /b 1
)

echo.
echo ✅ Emergency deploy completed successfully!
echo.
echo 📋 Next steps:
echo 1. Check Vercel/Railway for automatic deployment
echo 2. Test new features at https://scumdbpro.duckdns.org/crafting
echo 3. Monitor deployment logs for errors
echo.
echo 🌐 Your site will be updated shortly!
echo.
pause
