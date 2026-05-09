#!/bin/bash

echo "🚀 Final deployment with UI fix..."

# Navigate to project directory
cd /var/www/scum-knowledge-pro

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Build application
echo "🔨 Building application..."
npm run build

# Copy static files to standalone (CRITICAL)
echo "📂 Copying static files to standalone..."
cp -r .next/static .next/standalone/.next/

# Copy public files to standalone
echo "📂 Copying public files to standalone..."
cp -r public .next/standalone/

# Create a symlink for static files in standalone
echo "🔗 Creating symlink for static files..."
cd .next/standalone
ln -sf .next/static static
cd ..

# Update package.json in standalone to use the correct server
echo "📝 Updating standalone package.json..."
cat > .next/standalone/package.json << 'EOF'
{
  "name": "scum-knowledge-pro",
  "version": "4.24.2",
  "private": true,
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "@next/env": "14.2.23",
    "lucide-react": "^0.468.0",
    "next": "14.2.23",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "pg": "^8.13.1",
    "@prisma/client": "6.19.3"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
EOF

# Restart PM2
echo "🔄 Restarting PM2..."
pm2 restart scum-pro

echo "✅ Deployment completed successfully!"
echo "🌐 Site should be available at: https://scumdbpro.duckdns.org"

# Wait a moment and check if the site is accessible
echo "⏳ Checking if site is accessible..."
sleep 5

if curl -f -s http://localhost:3000 > /dev/null; then
    echo "✅ Site is accessible locally"
else
    echo "❌ Site is not accessible locally"
fi
