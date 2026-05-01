# SCUM Knowledge PRO v2

Готовый фан-сайт-база знаний по SCUM: оружие, бункеры, лут, карта, базы, транспорт и гайды.

## Что нового в v2

- Новый раздел **Оружие**.
- Поиск по названию, типу, патронам и описанию.
- Фильтры по типу оружия, редкости, режиму и Tier.
- Сортировка по Tier, урону, PvP, бункерам и экономности.
- Расширенные карточки оружия.
- Отдельная страница каждого оружия.
- Рейтинги: урон, контроль, дистанция, экономность, бункеры, PvP.
- Блоки: лучший билд, модули, патроны, где найти, плюсы, минусы и советы.

## Запуск на Windows

```bash
npm install
npm run dev
```

Открой: http://localhost:3000

## Проверка сборки

```bash
npm run build
npm run start
```

## Загрузка на GitHub

```bash
git init
git add .
git commit -m "SCUM DB PRO v2"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/scum-knowledge-pro.git
git push -u origin main
```

## Запуск на Render

### Вариант 1: через Web Service

- New + → Web Service
- Repository: твой GitHub-репозиторий
- Runtime: Node
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Environment Variable: `NODE_VERSION=22.16.0`

### Вариант 2: через Blueprint

В проекте уже есть `render.yaml`, поэтому можно выбрать **Blueprint** и дать Render самому прочитать настройки.

## Где редактировать данные

- `src/data/weapons.ts` — оружие и вся логика карточек
- `src/data/bunkers.ts` — бункеры
- `src/data/loot.ts` — лут
- `src/data/guides.ts` — гайды
- `src/data/mapMarkers.ts` — метки карты
- `src/data/vehicles.ts` — транспорт

## Главные файлы v2

- `src/app/weapons/page.tsx` — страница оружия
- `src/app/weapons/[slug]/page.tsx` — страница конкретного оружия
- `src/components/WeaponFilters.tsx` — поиск, фильтры и сортировка
- `src/components/StatBar.tsx` — полосы рейтинга
- `src/components/WeaponBadge.tsx` — бейджи Tier и редкости
- `src/data/weapons.ts` — база оружия

## Важно

Это статическая PRO-версия без базы данных. Ее можно сразу залить на GitHub и запустить на Render. Следующий этап — добавить PostgreSQL, Prisma и админ-панель для редактирования через сайт.
