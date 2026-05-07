# SCUM DB PRO — чек-лист обычного хостинга

Этот файл нужен для проверки этапа 1: админка -> PostgreSQL -> публичный сайт.

## 1. Переменные окружения

На хостинге должны быть заданы переменные:

- DATABASE_URL
- ADMIN_USER
- ADMIN_PASSWORD
- ADMIN_SESSION_SECRET
- NODE_ENV
- NEXT_TELEMETRY_DISABLED
- NEXT_PUBLIC_SITE_URL

Важно: реальные пароли, токены и ключи не должны храниться в GitHub.

## 2. Команды установки и сборки

```bash
npm install
npm run db:migrate
npm run validate:data
npm run build
npm run start
```

Если хостинг использует PM2:

```bash
pm2 start npm --name scumdbpro -- run start
pm2 save
```

## 3. Быстрая проверка сайта

Открой:

```txt
/api/health
```

Нормальный результат:

```txt
ok: true
database: ok
```

Если database показывает not-configured, значит DATABASE_URL не задан.

Если database показывает error, значит сайт запущен, но PostgreSQL не отвечает или строка подключения неверная.

## 4. Проверка базы данных в админке

Открой страницу:

```txt
/admin/status
```

Должно быть видно:

- PostgreSQL подключен;
- DATABASE_URL задан;
- есть записи в content_items;
- есть разделы weapons, attachments, loot, guides, mapMarkers, missions;
- отображаются последние действия из admin_audit_log.

## 5. Проверка живой связи

1. Открой /admin.
2. Измени описание одной метки карты.
3. Нажми сохранить.
4. Открой /map в обычном режиме сайта.
5. Проверь, что изменение появилось.
6. Вернись в /admin/status и проверь, что появился новый лог.

Цепочка считается рабочей, если работает путь:

```txt
Админка -> PostgreSQL -> публичный сайт -> admin_audit_log
```

## 6. Backup PostgreSQL

Для создания резервной копии:

```bash
npm run db:backup
```

Файлы будут созданы в папке backups.

Эта папка добавлена в .gitignore, чтобы случайно не отправить backup в GitHub.

Если на сервере нет pg_dump, установи PostgreSQL client tools через панель хостинга или SSH.

## 7. После перезапуска хостинга

После рестарта сервера проверь:

1. Главная страница открывается.
2. /api/health показывает ok.
3. /admin открывается и принимает актуальный логин/пароль из переменных окружения.
4. /admin/status показывает PostgreSQL подключенным.
5. /map, /weapons, /loot, /guides, /missions показывают данные из базы.

## 8. Что нельзя делать

- Не хранить реальные пароли в .env.example.
- Не коммитить .env, .env.local, .env.save.
- Не коммитить backup-файлы .sql и .dump.
- Не редактировать production-данные напрямую в src/data, если сайт уже работает через PostgreSQL.
