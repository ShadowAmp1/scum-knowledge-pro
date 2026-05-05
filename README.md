# SCUM Knowledge PRO

## v4.30 Hosting PRO

Добавлены: единый контент-слой PostgreSQL для публичного сайта, `/api/content`, личный кабинет, Quest/Loot trackers, калькуляторы, Discord webhook, PWA manifest/service worker и динамический sitemap.

Главная цепочка данных теперь такая:

```text
Админка Save → PostgreSQL content_items → getContentData() → публичные страницы
```

Если `DATABASE_URL` не задан или БД пустая, сайт использует `src/data/*.ts` как fallback/seed.

 v4.21 v4.20

Готовый фан-сайт-база знаний по SCUM: оружие, обвесы, лут, обычные и заброшенные бункеры, карты уровней, интерактивная карта, базы, транспорт, подготовка и гайды.

## Что есть в проекте

- Главная страница с быстрыми переходами по разделам.
- **Оружие**: поиск, фильтры, tier-list, отдельные страницы оружия, рейтинги, билды и ссылки на подходящие обвесы.
- **Обвесы**: магазины, прицелы, фонарики, планки, глушители и обвесы для лука, отдельные страницы и связи с оружием.
- **Лут**: карточки предметов, категории, редкость, приоритет, лучшие места фарма, советы по применению и предупреждения про настройки сервера.
- **Бункеры**: обычные и заброшенные бункеры, подготовка, маршруты, угрозы, лут, схемы обычных бункеров и карты уровней заброшенных объектов.
- **Интерактивная карта**: бункеры, торговцы / safe zone и базовые POI для лута, транспорта, мест под базу, опасных зон, городов и военных зон.
- **Гайды**: практические материалы по выживанию, рейдам, фарму и прогрессу.
- Базовые SEO-файлы: metadata, sitemap, robots и страница 404.
- Скрипт проверки данных `npm run validate:data`.
- GitHub Actions CI для проверки данных и сборки.

## Текущий состав данных

Проект честно показывает только те точки и материалы, которые есть в файлах данных:

- оружие: `src/data/weapons.ts`;
- обвесы: `src/data/attachments.ts`;
- лут: `src/data/loot.ts`;
- бункеры: `src/data/bunkers.ts`;
- карта и POI: `src/data/mapMarkers.ts`;
- гайды: `src/data/guides.ts`.

Важно: координаты POI на интерактивной карте являются практическими ориентирами. Для некоторых категорий добавлены примерные зоны, потому что точный спавн и плотность лута зависят от настроек сервера.

## Стек

- Next.js 14
- TypeScript
- Tailwind CSS
- Lucide React
- Render-ready конфигурация

## Запуск на ПК

```bash
npm install
npm run dev
```

Открыть:

```txt
http://localhost:3000
```

## Проверка проекта

```bash
npm run validate:data
npm run build
```

`validate:data` проверяет дубли slug, пустые названия/описания, отсутствующие изображения из `public/images`, некорректные рейтинги оружия и битые внутренние ссылки в данных.

## Деплой на Render

Для Render уже есть файл `render.yaml`.

Основные команды:

```txt
Build Command: if [ -f package-lock.json ]; then npm ci; else npm install; fi && npm run validate:data && npm run build
Start Command: npm run start
```

Environment Variable:

```txt
NODE_VERSION=22.16.0
NEXT_TELEMETRY_DISABLED=1
```

Если `package-lock.json` отсутствует, локально выполни `npm install` и закоммить созданный lock-файл.

## Как обновить GitHub

Скопируй файлы из архива в свой репозиторий, затем выполни:

```bash
git add .
git commit -m "Fix SCUM Knowledge PRO v4.20"
git push
```

После push Render должен пересобрать сайт автоматически. Если не пересобрал — нажми в Render:

```txt
Manual Deploy → Deploy latest commit
```

## Где менять точки карты

Файл:

```txt
src/data/mapMarkers.ts
```

Поля координат:

```ts
x: 50,
y: 40,
```

`x` и `y` — проценты от размера карты, от 0 до 100.

## Где менять контент

- Оружие: `src/data/weapons.ts`
- Обвесы: `src/data/attachments.ts`
- Лут: `src/data/loot.ts`
- Бункеры: `src/data/bunkers.ts`
- Гайды: `src/data/guides.ts`
- Разделы главной страницы: `src/data/sections.ts`

## Следующий крупный этап

Следующий этап — v5: админ-панель, PostgreSQL, Prisma и возможность добавлять материалы через сайт без редактирования кода.


## v4.21 final polish

Версия v4.21 расширяет контент по луту, оружию, обвесам, карте, бункерам и гайдам. Для Render используется `npm ci && npm run validate:data && npm run build`, архив должен поставляться без `node_modules` и `.next`.

## v4.22-lite

- Глобальный поиск: `/search`
- Сравнение оружия: `/weapons/compare`
- Admin Lite: `/admin` — локальные JSON-черновики для оружия, лута, карты и гайдов без базы данных.

Admin Panel v4.23 умеет сохранять изменения через API прямо в `src/data/*.ts`. Для постоянного production-релиза после правок закоммитьте изменённые data-файлы и выполните новый build/deploy.


## Admin Panel v4.23

- `/admin` — полноценная файловая админ-панель с логином.
- Логин по умолчанию: `Shadow`, пароль по умолчанию: `5623741`.
- Для production лучше задать переменные окружения `ADMIN_USER`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`.
- Можно добавлять, удалять, копировать и редактировать оружие, обвесы, лут, гайды и маркеры карты.
- Вкладка карты поддерживает выбор маркера, перетаскивание мышью, подпись названия, категорию, сектор, риск и описание.
- Сохранение идёт через API `/api/admin/save` прямо в `src/data/*.ts`. На Render такие правки могут быть временными до следующего redeploy, поэтому для постоянной версии закоммитьте изменённые data-файлы и пересоберите проект.


## Render PostgreSQL / полноценная база данных

В версии v4.24 проект поддерживает PostgreSQL на Render. В `render.yaml` добавлен блок `databases`, а web-service получает `DATABASE_URL` через `fromDatabase`.

Как это работает:

1. Render создаёт PostgreSQL-базу `scum-knowledge-pro-db`.
2. `DATABASE_URL` автоматически попадает в web-service.
3. Перед деплоем запускаются:

```bash
npm run db:migrate
npm run db:seed
```

4. Админ-панель `/admin` читает данные из PostgreSQL и сохраняет изменения в таблицу `content_items`.
5. Если `DATABASE_URL` не задан локально, админка работает в fallback-режиме с `src/data`.

Локальная проверка:

```bash
npm ci
npm run db:migrate
npm run db:seed
npm run validate:data
npm run build
```

Переменные окружения:

```env
ADMIN_USER=Shadow
ADMIN_PASSWORD=5623741
ADMIN_SESSION_SECRET=replace-with-long-random-secret
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/scum_knowledge_pro
```

Важно: на Render файловая система web-service не подходит для постоянного хранения изменений. Поэтому при наличии `DATABASE_URL` админ-панель сохраняет изменения именно в PostgreSQL.
