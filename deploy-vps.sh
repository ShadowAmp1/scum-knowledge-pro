#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/scum-knowledge-pro}"
APP_NAME="${APP_NAME:-scumdbpro}"
DB_NAME="${DB_NAME:-scumdbpro}"
DB_USER="${DB_USER:-scumdbpro}"
DB_PASS="${DB_PASS:-ChangeMeStrongPassword_123}"
DOMAIN="${DOMAIN:-scumdbpro.duckdns.org}"

apt update
apt install -y nginx postgresql postgresql-contrib

sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname='${DB_USER}'" | grep -q 1 || sudo -u postgres psql -c "CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}';"
sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" | grep -q 1 || sudo -u postgres psql -c "CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};"

cd "$APP_DIR"
cat > .env <<ENV
DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@127.0.0.1:5432/${DB_NAME}"
ADMIN_USER="Shadow"
ADMIN_PASSWORD="5623741"
ADMIN_SESSION_SECRET="$(openssl rand -hex 32)"
NEXT_PUBLIC_SITE_URL="https://${DOMAIN}"
ENV

npm install
npm run validate:data
npm run db:migrate
npm run db:seed || true
npm run build

if ! command -v pm2 >/dev/null 2>&1; then npm install -g pm2; fi
pm2 delete "$APP_NAME" 2>/dev/null || true
pm2 start npm --name "$APP_NAME" -- start
pm2 save

cat > /etc/nginx/sites-available/${APP_NAME} <<NGINX
server {
    listen 80;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX
ln -sf /etc/nginx/sites-available/${APP_NAME} /etc/nginx/sites-enabled/${APP_NAME}
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

echo "Deploy finished: http://${DOMAIN}"
