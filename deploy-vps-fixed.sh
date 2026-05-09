#!/bin/bash

echo "🚀 Starting VPS deployment with fixed static files..."

# Navigate to project directory
cd /var/www/scum-knowledge-pro

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Build the application
echo "🔨 Building application..."
npm run build

# Copy static files to standalone (CRITICAL FIX)
echo "📂 Copying static files to standalone..."
node copy-static.js

# Ensure public files are copied to standalone
echo "📂 Copying public files to standalone..."
cp -r public .next/standalone/

# Restart PM2
echo "🔄 Restarting PM2..."
pm2 restart scum-pro

echo "✅ Deployment completed successfully!"
echo "🌐 Site should be available at: https://scumdbpro.duckdns.org"
