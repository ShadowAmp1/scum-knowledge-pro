# PowerShell Deployment Script for SCUM Knowledge PRO
Write-Host "🔄 SCUM Knowledge PRO - Auto Deployment Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "📝 Step 1: Fixing TypeScript errors..." -ForegroundColor Yellow
try {
    & "c:\Program Files\nodejs\node.exe" fix-weapons-difficulty.js
    Write-Host "✅ TypeScript errors fixed" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to fix TypeScript errors: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Press Enter to exit..."
    exit 1
}

Write-Host ""
Write-Host "📦 Step 2: Installing dependencies..." -ForegroundColor Yellow
try {
    & "c:\Program Files\nodejs\npm.cmd" install
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install dependencies: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Press Enter to exit..."
    exit 1
}

Write-Host ""
Write-Host "📝 Step 3: Committing changes..." -ForegroundColor Yellow
try {
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
    Write-Host "✅ Changes committed" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to commit changes: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Press Enter to exit..."
    exit 1
}

Write-Host ""
Write-Host "🚀 Step 4: Pushing to GitHub..." -ForegroundColor Yellow
try {
    & "c:\Program Files\Git\bin\git.exe" push origin main
    Write-Host "✅ Pushed to GitHub successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to push to GitHub: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Press Enter to exit..."
    exit 1
}

Write-Host ""
Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Check Vercel/Railway for automatic deployment" -ForegroundColor White
Write-Host "2. Test new features at your-domain.com" -ForegroundColor White
Write-Host "3. Monitor deployment logs for errors" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Your site will be available shortly!" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit..." -ForegroundColor Gray
