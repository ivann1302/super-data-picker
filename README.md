# Super Data Picker

## Как запустить

1. Установите зависимости:
   - npm install
2. Запуск в разработке:
   - npm run dev
   - Откройте адрес из консоли

Требования: Node.js 18+, npm 9+.

## Основные фичи

- Быстрый выбор (Quick Select) с готовыми пресетами (сегодня, вчера, последние X и т.д.).
- Выбор диапазона дат в 3 режимах: Absolute, Relative, Now.
- «Недавно использованные» диапазоны.
- Авто‑обновление (Auto refresh) с интервалом.
- Кнопка «Обновить»/«Применить».
- Возможность добавить свои панели/пресеты и переопределить рендер некоторых частей UI.

## Структура компонента

- index.html — точка входа для Vite.
- src/
  - main.tsx — вход React-приложения.
  - App.tsx — демо-страница для компонента.
  - components/
    - SuperDatePicker/
      - SuperDatePicker/ — главный компонент SuperDatePicker.tsx и стили.
      - AutoRefresh/ — блок автоперезагрузки.
      - RelativeTab/, AbsoluteTab/, NowTab/ — вкладки выбора.
      - QuickSelect/, UpdateButton/ — быстрый выбор и кнопка применения.
  - presets.ts — готовые пресеты для быстрого выбора.
- vite.config.ts, tsconfig\*.json — конфигурация сборки и TypeScript.
- eslint.config.js, prettier (скрипты) — линтинг и форматирование.

## Технологии

- React 19, React DOM
- TypeScript
- Vite 7
- Moment.js, @elastic/datemath — работа с датами и относительными интервалами
- CSS Modules
- ESLint, Prettier, Husky, lint-staged
