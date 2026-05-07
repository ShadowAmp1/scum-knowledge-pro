#!/bin/bash

set -e

PROJECT_DIR="/var/www/scum-knowledge-pro"
PM2_NAME="scumdbpro"

cd "$PROJECT_DIR" || exit 1

echo "=== SCUM Knowledge PRO update started ==="

git fetch origin main

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "No updates found."
    exit 0
fi

echo "Updates found. Deploying..."

git reset --hard origin/main

echo "Installing dependencies..."
npm install

echo "Cleaning old Next.js build..."
rm -rf .next

echo "Building project..."
npm run build

echo "Reloading PM2..."
pm2 reload "$PM2_NAME" || pm2 restart "$PM2_NAME"

pm2 save

echo "=== Update completed successfully ==="
