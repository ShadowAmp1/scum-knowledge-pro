# SCUM DB PRO

Фан-сайт база знаний по игре SCUM. Версия v3: оружие, бункеры, лут, подготовка к рейдам, гайды, карта и PRO-фундамент под будущую админку.

## Стек

- Next.js 14
- TypeScript
- Tailwind CSS
- Lucide React
- Render-ready конфигурация

## Разделы

- Главная страница
- Оружие: поиск, фильтры, tier-list, отдельные страницы оружия
- Бункеры: поиск, фильтры, риск, маршруты, подготовка, враги, лут
- Лут: поиск, категории, редкость, приоритет, места фарма
- Подготовка: raid-kit чек-листы
- Карта: демо-метки
- Базы
- Транспорт
- Гайды
- PRO roadmap

## Запуск на ПК

```bash
npm install
npm run dev
```

Открыть:

```txt
http://localhost:3000
```

## Проверка сборки

```bash
npm run build
```

## Render

В Render выбирай **Web Service**.

Build Command:

```bash
npm install && npm run build
```

Start Command:

```bash
npm run start
```

Environment Variable:

```txt
NODE_VERSION=22
```

Если Node 22 не подойдет, можно поставить:

```txt
NODE_VERSION=20
```

## Обновление через GitHub

```bash
git add .
git commit -m "Update SCUM DB PRO"
git push
```

## Что делать дальше

Следующий крупный этап — v4: настоящая интерактивная карта с метками, фильтрами, карточками точек и маршрутами фарма.
