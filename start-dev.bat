@echo off
cd /d %~dp0
echo Installing dependencies...
npm install
echo Starting SCUM Knowledge PRO...
npm run dev
pause
