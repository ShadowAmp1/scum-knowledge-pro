@echo off
cd /d %~dp0
echo Installing dependencies...
npm install
echo Building project...
npm run build
pause
