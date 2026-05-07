# SCUM DB PRO — установка на VPS без Render

## 1. Установить пакеты

```bash
apt update && apt upgrade -y
apt install -y curl git unzip nginx postgresql postgresql-contrib
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm install -g pm2
```

## 2. Залить проект

```bash
cd /var/www
unzip scum-knowledge-pro-production-fixed.zip
cd scum-knowledge-pro
```

## 3. Создать PostgreSQL базу

```bash
sudo -u postgres psql -c "CREATE USER scumdbpro WITH PASSWORD 'ChangeMeStrongPassword_123';"
sudo -u postgres psql -c "CREATE DATABASE scumdbpro OWNER scumdbpro;"
```

## 4. Создать .env

```bash
nano .env
```

```env
DATABASE_URL="postgresql://scumdbpro:ChangeMeStrongPassword_123@127.0.0.1:5432/scumdbpro"
ADMIN_USER="Shadow"
ADMIN_PASSWORD="5623741"
ADMIN_SESSION_SECRET="change-this-long-random-secret"
NEXT_PUBLIC_SITE_URL="https://scumdbpro.duckdns.org"
```

## 5. Установить и собрать

```bash
npm install
npm run validate:data
npm run db:migrate
npm run db:seed
npm run build
pm2 start npm --name scumdbpro -- start
pm2 save
```

## 6. Nginx

```bash
nano /etc/nginx/sites-available/scumdbpro
```

```nginx
server {
    listen 80;
    server_name scumdbpro.duckdns.org;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -sf /etc/nginx/sites-available/scumdbpro /etc/nginx/sites-enabled/scumdbpro
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

## Обновление через GitHub/VPS

```bash
cd /var/www/scum-knowledge-pro
git pull
npm install
npm run validate:data
npm run db:migrate
npm run build
pm2 restart scumdbpro
```

Важно: не запускай `npm run db:seed` после того, как уже редактировал данные в админке, если не хочешь перезаписать базу данными из `src/data`.
