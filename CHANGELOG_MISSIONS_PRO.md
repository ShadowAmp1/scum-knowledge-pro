# SCUM DB PRO — Missions PRO

Добавлен полноценный раздел **Квесты / Missions PRO**.

## Что добавлено

- Новая вкладка `/missions` в верхнем меню.
- База квестов в `src/data/missions.ts` с полной структурой полей:
  - trader/source/tier/category/difficulty/risk/status;
  - requirements/objectives/rewards/progression;
  - recommended gear, best locations, route plan, tips, mistakes;
  - tags, related loot, related sections, admin notes.
- Категории миссий и описание каждой категории.
- Tier progression system: Tier 1 / Tier 2 / Tier 3 с рекомендациями и focus-блоками.
- Фильтры по поиску, trader, tier, категории, риску и сложности.
- Карточки квестов с наградами, риском, тиром, маршрутом и статусом данных.
- Детальные страницы квестов `/missions/[slug]`.
- Quest tracker на LocalStorage:
  - добавить квест в трекер;
  - отметить как активный;
  - завершить;
  - сбросить;
  - трекер отдельных objectives на странице квеста.
- Интеграция с избранным.
- Интеграция с глобальным поиском.
- Интеграция с sitemap.
- Интеграция с админ-панелью и API admin/data, admin/save, admin/seed.
- Поддержка `missions` в seed для PostgreSQL.
- Валидация данных обновлена и проходит успешно.

## Важно

Система готова как production-модуль для сайта. Стартовые карточки квестов включают проверенные типы и шаблоны для заполнения. Точные значения наград, количества целей и предметов могут отличаться по версии игры и настройкам сервера, поэтому для 100% точности их лучше сверять на живом сервере и обновлять через админку.

## Проверка

Выполнено:

```bash
npm run validate:data
```

Результат:

```text
Проверка данных пройдена успешно.
```
