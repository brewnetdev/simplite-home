# Simplite Home

Simplite 제품군(Tika, MarkFlow)의 마케팅 랜딩 페이지입니다.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **CSS Modules** + CSS Variables
- **next-intl** (한국어 / English)
- **googleapis** (Contact form → Google Sheets)

## Getting Started

```bash
npm install
npm run dev
```

개발 서버가 `http://localhost:4444`에서 실행됩니다.

## Environment Variables

`.env.local` 파일에 다음 변수를 설정하세요:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
```

## Project Structure

```
src/
├── app/[locale]/       # Pages (landing, tika, markflow, contact)
├── components/         # UI components
│   ├── layout/         # Nav, Footer
│   ├── ui/             # Shared UI (ScrollReveal, SectionHead, etc.)
│   ├── landing/        # Landing page sections
│   ├── tika/           # Tika product page
│   ├── markflow/       # MarkFlow product page
│   └── contact/        # Contact form
├── messages/           # i18n (ko.json, en.json)
├── styles/             # Global CSS, design tokens
└── lib/                # Fonts, Google Sheets helper
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 개발 서버 실행 (port 4444) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 실행 |
