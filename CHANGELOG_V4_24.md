# SCUM Knowledge PRO v4.24 — Render PostgreSQL DB

- Добавлена поддержка PostgreSQL на Render через `DATABASE_URL`.
- Добавлены скрипты `db:migrate` и `db:seed`.
- Админ-панель теперь читает и сохраняет данные в PostgreSQL, если база подключена.
- Локально без `DATABASE_URL` остаётся fallback на `src/data`.
- Добавлены API `/api/admin/data` и `/api/admin/seed`.
- `render.yaml` теперь создаёт Render PostgreSQL и прокидывает `DATABASE_URL` в web-service.
