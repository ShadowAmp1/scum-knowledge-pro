# v4.24.2 — Render build fix: admin save to PostgreSQL

- Исправлена ошибка Render/Next build: `Cannot find name 'saveToDatabase'` в `src/app/api/admin/save/route.ts`.
- Добавлена серверная функция сохранения данных админ-панели в PostgreSQL `content_items`.
- При сохранении вкладки админ-панели теперь выполняется upsert записей, удаление старых записей этой вкладки, которых больше нет в массиве, и запись действия в `admin_audit_log`.
- Сессия админа читается один раз в начале `PUT`, username корректно передаётся в audit log.
