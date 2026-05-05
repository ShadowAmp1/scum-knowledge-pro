# SCUM DB PRO v4.30 — Hosting PRO

- Исправлена цепочка: админка → PostgreSQL `content_items` → публичный сайт.
- Добавлен `src/lib/content.ts`, `/api/content`, автосоздание таблиц БД и fallback на `src/data`.
- Missions PRO, Map PRO, поиск, избранное и основные публичные разделы переведены на динамические данные.
- Добавлены личный кабинет, Quest Tracker, Loot Tracker, калькуляторы и Discord webhook-интеграция.
- Добавлены PWA manifest, service worker и иконки.
- Обновлён sitemap под `NEXT_PUBLIC_SITE_URL`.
