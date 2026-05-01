# SCUM Knowledge PRO

Готовый фан-сайт-база знаний по SCUM: оружие, бункеры, лут, карта, базы, транспорт и гайды.

## Запуск на Windows

```bash
npm install
npm run dev
```

Открой: http://localhost:3000

## Загрузка на GitHub

```bash
git init
git add .
git commit -m "Initial SCUM Knowledge PRO"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/scum-knowledge-pro.git
git push -u origin main
```

## Запуск на Render

1. Создай новый репозиторий на GitHub.
2. Загрузи туда этот проект.
3. В Render нажми **New +** → **Blueprint**.
4. Выбери репозиторий.
5. Render сам прочитает `render.yaml`.
6. Нажми **Apply**.

Альтернативно можно создать **Web Service** вручную:

- Runtime: Node
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Node Version: `22.16.0`

## Где редактировать данные

- `src/data/weapons.ts` — оружие
- `src/data/bunkers.ts` — бункеры
- `src/data/loot.ts` — лут
- `src/data/guides.ts` — гайды
- `src/data/mapMarkers.ts` — метки карты
- `src/data/vehicles.ts` — транспорт

## Важно

Это статическая PRO-версия без базы данных. Ее можно сразу залить на GitHub и запустить на Render. Следующий этап — добавить PostgreSQL, Prisma и админ-панель для редактирования через сайт.
