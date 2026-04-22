# CLAUDE.md - Simplite Home


## Investigation Rules

- When the same problem recurs and resolution is requested again, always perform a thorough source-level deep dive before responding.
- Never claim to have confirmed a fix without actually reading the relevant source code.

## Session Continuity

- After /compact completes and a new session context begins, always re-read CLAUDE.md to re-establish project context before proceeding.


## Project Overview
Simplite 제품군(Tika, MarkFlow)의 마케팅 랜딩 페이지. Next.js (App Router) + TypeScript.

## Tech Stack
- **Next.js 16** (App Router, `src/` directory)
- **TypeScript**, **CSS Modules** + global CSS Variables
- **next-intl** for i18n (ko default, en)
- **googleapis** for Google Sheets contact form API
- **Pretendard** (CDN), **Instrument Serif** + **JetBrains Mono** (next/font)

## File Structure
```
src/
  app/
    [locale]/
      layout.tsx          # Root layout with fonts, Nav, Footer
      page.tsx             # Landing page
      tika/page.tsx        # Tika product page
      markflow/page.tsx    # MarkFlow product page
      contact/page.tsx     # Contact form page
    api/contact/route.ts   # Google Sheets POST handler
  components/
    layout/   Nav.tsx, Footer.tsx
    ui/       ScrollReveal, SectionHead, WindowChrome, FeatureGrid, ScreenshotGrid
    landing/  HeroSection, LogoStrip, PhilosophySection, ProductShowcase,
              WhySection, EnterpriseSection, PricingSection, FaqSection, FinalCta
    tika/     TikaHero, KanbanDemo, HierarchyDiagram
    markflow/ MarkFlowHero, DualEditorDemo, DocumentMap, ConvertGrid
    contact/  ContactHero, ContactTabs, SalesForm, DevForm, ChipSelect, ExtraChannels
  lib/
    fonts.ts              # next/font config
    google-sheets.ts      # googleapis service account helper
  i18n/
    routing.ts, request.ts, navigation.ts
  messages/
    ko.json, en.json
  styles/
    globals.css           # Design tokens + global styles
  middleware.ts            # next-intl locale routing
_legacy/                   # Original static HTML/CSS (reference)
public/assets/             # Product screenshot images
```

## Design System
- **Colors**: Forest green (#1a3a2e) 기반, sand/cream 톤, rust 액센트
- **Typography**: Pretendard (본문), Instrument Serif (세리프), JetBrains Mono (코드)
- **Responsive**: clamp() 기반 유동 타이포, 모바일 브레이크포인트 900-1000px

## Styling Strategy
- CSS Modules (`.module.css`) per component + global CSS Variables
- Design tokens in `src/styles/globals.css`
- No Tailwind

## Language
- 한국어 기본 (ko), 영어 지원 (en)
- next-intl 기반 URL locale routing (`/ko/...`, `/en/...`)
- 번역: `src/messages/ko.json`, `en.json`

## Key Conventions
- Server Components by default, `'use client'` only for interactivity (FAQ, KanbanDemo, ContactTabs, forms)
- ScrollReveal (IntersectionObserver) for animations
- Contact form → Next.js API Route → Google Sheets (googleapis)

## Environment Variables (.env.local)
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SHEET_ID`

## Git Workflow
- Main branch: `main`
- Feature branches: `feature/*`


### TypeScript 규칙

- **Strict 모드** 활성화 (`"strict": true`)
- 공유 타입은 `src/types/index.ts`에 중앙 관리
- `as const` 단언으로 enum 대체 (예: `TICKET_STATUS`)
- Zod로 런타임 유효성 검증 (API 입력)
- 타입 추론 가능한 곳에서는 명시적 타입 생략, API 계약에는 명시적 타입 사용

### React 패턴

- 클라이언트 컴포넌트에 `'use client'` 디렉티브 명시
- 서버 컴포넌트에서 초기 데이터 fetch → 클라이언트 컴포넌트로 전달
- 상태 관리는 커스텀 훅(`useTickets`)으로 중앙화
- Optimistic UI 업데이트 + 실패 시 롤백 패턴 적용

### Tailwind CSS 규칙

- 유틸리티 퍼스트 방식, 별도 CSS 파일 사용 지양
- `prettier-plugin-tailwindcss`로 클래스 자동 정렬
- 반응형: 모바일 퍼스트 (`sm`, `lg` 브레이크포인트)

### Git 커밋 메시지

- 한국어 또는 영어 사용 가능
- 변경 목적을 간결하게 기술 (1-2문장)

---

## 5. 금지 사항과 예외 규칙

## 🚨 절대 금지 사항 (CRITICAL - 반드시 준수)

### 🔴 데이터베이스 관련 절대 금지 사항

```bash
# 데이터베이스 파괴적 명령어 - 절대 사용 금지 (사용자 명시적 요청 없이)

# SQL 파괴적 명령어 - 절대 금지
DROP TABLE                 # ❌ 절대 금지
DROP DATABASE             # ❌ 절대 금지
DELETE FROM               # ⚠️ WHERE 절 없이 사용 금지
TRUNCATE                  # ❌ 절대 금지
ALTER TABLE DROP          # ⚠️ 사용자 허가 필요
```

### 🔴 데이터베이스 작업 필수 규칙

1. **데이터 삭제/리셋 전 반드시 사용자에게 명시적 허가 요청**
2. **백업 없이 데이터 삭제 절대 금지**
3. **테스트 데이터가 있는 상태에서 리셋 금지**
4. **SQL 수정으로 해결 가능한 문제는 데이터베이스 리셋 금지**
5. **프로덕션 데이터베이스는 어떤 경우에도 자동 수정 금지**
6. **`db:generate` / `db:migrate` / `db:push`는 사용자 명시적 요청 없이 절대 실행 금지** — 스키마 변경 내용을 먼저 설명하고, 마이그레이션 실행 여부를 반드시 확인받을 것

### 🔴 Git 위험 명령어 - 절대 사용 금지

```bash
git push --force          # ❌ 절대 금지
git reset --hard          # ❌ 절대 금지
git commit --no-verify    # ❌ 절대 금지
```

### 🔴 Git 커밋/푸시 - 사용자 명시적 요청 없이 절대 금지

- **`git commit`은 사용자가 명시적으로 요청한 경우에만 실행한다**
- **`git push`는 사용자가 명시적으로 요청한 경우에만 실행한다**
- 작업 완료 후 커밋이 필요하다고 판단되면, 실행하지 말고 사용자에게 먼저 물어볼 것
- "커밋해줘", "commit해줘" 등 명시적 지시가 없으면 커밋하지 않는다

### 🔴 npm 위험 명령어

```bash
npm audit fix --force     # ❌ 절대 금지
```

### 라이브러리 버전 고정 (변경 금지)

- 합당한 이유 없이 자주 라이브러리를 변경하면 안됌. 초기 셋팅 후 문제가 있을 경우에 허가 요청 후 변경 가능

### 기본 기술 스택 이외의 라이브러리, 프레임워크, 언어 도입은 지양

- 어쩔수 없이 해야 할 경우 해야 하는 이유와 검토 의견을 낸 뒤 명시적으로 허가 요청할것


### 분석 → 구현 분리 원칙

탐색/분석 작업과 실제 코드 변경 작업은 **반드시 단계를 분리**하고, 각 단계 전환 시 사용자 승인을 받는다.

```
[분석 단계] → 보고서/플랜 제시 → [사용자 승인] → [구현 단계]
```

- 분석 결과를 제시할 때는 **우선순위(CRITICAL/HIGH/MEDIUM/LOW)와 영향 범위**를 명시한다
- 분석 결과를 제시한 뒤, "구현할까요?" 등 명시적 승인 없이 바로 코드를 수정하지 않는다
- **"정리해", "구현해"처럼 구체적인 지시가 있을 때만** 해당 범위의 코드를 변경한다


### 범위 준수 원칙

사용자가 요청한 작업의 범위를 정확히 지키고, 요청하지 않은 추가 개선은 하지 않는다.

- "A를 고쳐줘"라는 요청에 B, C도 함께 수정하지 않는다
- 작업 중 발견한 개선 사항은 현재 작업 완료 후 **별도로 보고**하고 지시를 기다린다
- 단, 발견한 문제가 현재 작업의 직접적인 원인인 경우 수정 전 사용자에게 알린다

### 구현 전 파일 읽기 원칙

코드를 수정하기 전에 반드시 해당 파일을 읽고, 현재 구현 상태를 파악한다.

- 이미 구현된 항목을 중복 구현하지 않는다
- 파일을 읽지 않고 "아마 이렇게 되어있을 것"이라고 추정하여 수정하지 않는다
- 특히 QA 체크리스트나 플랜 항목 구현 시, **먼저 현재 코드 상태를 확인**하고 실제 미구현 항목만 작업한다


## Language Policy

- Internal reasoning and planning: English
- Code and technical artifacts: English (variable names, comments, logs, error messages)
- Git commits: English, follow Conventional Commits (e.g., feat:, fix:, refactor:)
- User-facing responses: Korean (한국어)
  - Task summaries, explanations, and clarifying questions in Korean
  - When reporting errors or issues, describe the problem in Korean but keep the original error message in English

## Response Format

When completing a task, always end with a Korean summary:

- 무엇을 변경했는지
- 왜 그렇게 했는지
- 주의할 점이 있는지
