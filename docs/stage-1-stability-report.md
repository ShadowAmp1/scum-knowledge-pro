# SCUM DB PRO — Stage 1 Stability Report

Дата этапа: 2026-05-08

## Цель

Закрыть базовую стабильность проекта перед переходом к PRO-карте и следующим большим функциям.

Главная цепочка:

```txt
Админка -> PostgreSQL -> публичный сайт -> admin_audit_log
```

## Проверено

### 1. PostgreSQL

В проекте используется таблица content_items для живого контента и admin_audit_log для истории действий.

Проверено:

- content_items хранит entity, key и JSON-данные;
- admin_audit_log хранит действия админки;
- есть индексы для entity и created_at;
- миграция создаёт таблицы автоматически.

### 2. Админка

Админка загружает данные через API и сохраняет изменения через PostgreSQL, если DATABASE_URL задан.

Проверено:

- /api/admin/data читает content_items;
- /api/admin/save сохраняет все разделы;
- /api/admin/save пишет лог действия;
- /api/admin/seed наполняет базу стартовыми данными;
- /api/admin/session работает через httpOnly cookie.

### 3. Публичный сайт

Публичные страницы читают данные через общий слой content.ts.

Проверено:

- /map использует getMapMarkers;
- /weapons использует getContent;
- content.ts сначала читает PostgreSQL;
- fallback на src/data используется только если DATABASE_URL не задан, база пуста или база временно недоступна.

### 4. Кеширование

Для динамических страниц и API используется force-dynamic и no-store там, где это нужно для админки.

## Что добавлено

### /admin/status

Добавлена страница контроля системы.

Она показывает:

- состояние PostgreSQL;
- наличие DATABASE_URL;
- общее количество записей content_items;
- количество записей по разделам;
- последние действия из admin_audit_log.

### db:backup

Добавлена команда:

```bash
npm run db:backup
```

Она создаёт backup PostgreSQL в папке backups.

### .gitignore

Добавлены правила, чтобы backup-файлы не попадали в GitHub:

```txt
backups/
*.sql
*.dump
```

### docs/hosting-checklist.md

Добавлен чек-лист для обычного хостинга.

### Безопасность env

.env.example больше не содержит реальные логины или пароли.

render.yaml больше не хранит ADMIN_USER и ADMIN_PASSWORD в коде.

### Админ-сессия

adminSession.ts больше не использует встроенный fallback-пароль. Для входа в production нужно обязательно задать переменные окружения админки.

/api/admin/session теперь возвращает понятную ошибку, если админ-доступ не настроен.

## Что проверить на хостинге

1. Задать переменные окружения:
   - DATABASE_URL
   - ADMIN_USER
   - ADMIN_PASSWORD
   - ADMIN_SESSION_SECRET
   - NODE_ENV
   - NEXT_TELEMETRY_DISABLED
   - NEXT_PUBLIC_SITE_URL

2. Выполнить:

```bash
npm install
npm run db:migrate
npm run validate:data
npm run build
npm run start
```

3. Открыть:

```txt
/admin/status
```

4. Проверить:

- PostgreSQL подключен;
- content_items не пустая;
- admin_audit_log показывает действия;
- публичные страницы отображают изменения из админки.

## Итог

Stage 1 можно считать закрытым после успешной проверки /admin/status на production-хостинге.
