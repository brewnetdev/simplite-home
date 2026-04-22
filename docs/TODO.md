# Contact Form 연동 설정 가이드

문의 폼 제출 시 Google Sheets에 데이터 저장 + Slack 알림 발송을 위한 설정 가이드.

---

## 1. Google Sheets 연동

### Step 1: Google Cloud 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 상단 프로젝트 선택 > **새 프로젝트** 클릭
3. 프로젝트 이름: `simplite-home` (자유롭게 지정)
4. **만들기** 클릭

### Step 2: Google Sheets API 활성화

1. 좌측 메뉴 > **API 및 서비스** > **라이브러리**
2. `Google Sheets API` 검색 > 클릭 > **사용** 버튼 클릭

### Step 3: 서비스 계정 생성

1. 좌측 메뉴 > **API 및 서비스** > **사용자 인증 정보**
2. 상단 **+ 사용자 인증 정보 만들기** > **서비스 계정** 선택
3. 서비스 계정 이름: `simplite-sheets` (자유롭게 지정)
4. **만들기 및 계속** 클릭
5. 역할은 건너뛰기(선택사항) > **완료**

### Step 4: 서비스 계정 키 다운로드

1. 생성된 서비스 계정 클릭 (이메일 형태: `simplite-sheets@프로젝트ID.iam.gserviceaccount.com`)
2. **키** 탭 > **키 추가** > **새 키 만들기**
3. 유형: **JSON** 선택 > **만들기**
4. JSON 파일이 자동 다운로드됨 — 이 파일에서 아래 두 값을 사용:

```
client_email  →  GOOGLE_SERVICE_ACCOUNT_EMAIL 에 입력
private_key   →  GOOGLE_PRIVATE_KEY 에 입력
```

> **주의**: JSON 키 파일은 절대 git에 커밋하지 마세요. 다운로드 후 안전한 곳에 보관.

### Step 5: Google 스프레드시트 생성

1. [Google Sheets](https://sheets.google.com/) 접속
2. **빈 스프레드시트** 생성
3. 시트 이름을 확인하고 아래 두 탭을 만듦:

#### Sales 탭 (시트 하단 탭 이름을 정확히 `Sales`로)

첫 행(헤더):

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| timestamp | name | company | email | phone | products | size | plan | message |

#### Dev 탭 (시트 하단 탭 이름을 정확히 `Dev`로)

첫 행(헤더):

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| timestamp | name | email | target | topic | issue_url | message |

### Step 6: 서비스 계정에 시트 접근 권한 부여

1. 스프레드시트 우측 상단 **공유** 클릭
2. Step 4에서 확인한 서비스 계정 이메일(`simplite-sheets@프로젝트ID.iam.gserviceaccount.com`) 입력
3. 권한: **편집자** 선택
4. **보내기** 클릭

### Step 7: 스프레드시트 ID 확인

스프레드시트 URL에서 ID 추출:

```
https://docs.google.com/spreadsheets/d/여기가_SHEET_ID/edit
                                       ^^^^^^^^^^^^^^^^
```

`/d/` 와 `/edit` 사이의 문자열이 `GOOGLE_SHEET_ID`.

### Step 8: .env.local 설정

프로젝트 루트의 `.env.local` 파일을 실제 값으로 수정:

```bash
# Google Sheets API - Contact Form
GOOGLE_SERVICE_ACCOUNT_EMAIL=simplite-sheets@your-project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...(실제 키 전체)...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
```

> **GOOGLE_PRIVATE_KEY 입력 시 주의사항:**
> - JSON 파일의 `private_key` 값을 **그대로** 복사
> - 큰따옴표(`"`)로 감싸기
> - `\n`은 실제 줄바꿈이 아닌 문자열 그대로 유지 (코드에서 자동 변환함)

### Step 9: 동작 테스트

```bash
npm run dev
```

1. `http://localhost:4444/ko/contact` 접속
2. Sales 또는 Dev 폼 작성 후 제출
3. Google Sheets에서 해당 탭에 데이터가 추가되었는지 확인

---

## 2. Slack 알림 연동

### Step 1: Slack App 생성

1. [Slack API](https://api.slack.com/apps) 접속
2. **Create New App** > **From scratch**
3. App Name: `Simplite Contact` (자유롭게 지정)
4. Workspace: 알림 받을 Slack 워크스페이스 선택
5. **Create App**

### Step 2: Incoming Webhook 활성화

1. 좌측 메뉴 > **Incoming Webhooks**
2. 우측 상단 토글 **On** 으로 활성화
3. 하단 **Add New Webhook to Workspace** 클릭
4. 알림 받을 채널 선택 (예: `#contact-alerts`)
5. **허용** 클릭
6. 생성된 Webhook URL 복사:

```
https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### Step 3: .env.local에 Webhook URL 추가

```bash
# Slack Webhook - Contact Notification
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### Step 4: Slack 알림 코드 구현

현재 `src/app/api/contact/route.ts`에 Slack 알림 코드를 추가해야 합니다.

`src/lib/slack.ts` 파일 생성 필요:

```typescript
// src/lib/slack.ts
export async function sendSlackNotification(message: {
  type: 'sales' | 'dev';
  name: string;
  email: string;
  company?: string;
  message: string;
}) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return; // Webhook 미설정 시 조용히 스킵

  const emoji = message.type === 'sales' ? ':briefcase:' : ':wrench:';
  const label = message.type === 'sales' ? '구매·도입 문의' : '개발자·기술 문의';

  const payload = {
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: `${emoji} 새 문의 접수: ${label}` },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*이름:*\n${message.name}` },
          { type: 'mrkdwn', text: `*이메일:*\n${message.email}` },
          ...(message.company
            ? [{ type: 'mrkdwn', text: `*회사:*\n${message.company}` }]
            : []),
        ],
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*내용:*\n>${message.message}` },
      },
    ],
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
```

`src/app/api/contact/route.ts` 수정 필요:

```typescript
// route.ts 상단에 import 추가
import { sendSlackNotification } from '@/lib/slack';

// Google Sheets append 이후에 Slack 알림 호출 추가:
// Sales 케이스 내부:
await sendSlackNotification({
  type: 'sales',
  name: data.name,
  email: data.email,
  company: data.company,
  message: data.message,
});

// Dev 케이스 내부:
await sendSlackNotification({
  type: 'dev',
  name: data.name,
  email: data.email,
  message: data.message,
});
```

### Step 5: 동작 테스트

1. `npm run dev` 재시작
2. Contact 폼 제출
3. 확인 사항:
   - Google Sheets에 데이터 추가됨
   - Slack 채널에 알림 메시지 수신됨

---

## 3. 전체 .env.local 최종 형태

```bash
# Google Sheets API - Contact Form
GOOGLE_SERVICE_ACCOUNT_EMAIL=simplite-sheets@your-project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n실제키내용\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=실제_스프레드시트_ID

# Slack Webhook - Contact Notification
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T.../B.../xxx
```

---

## 4. 체크리스트

- [ ] Google Cloud 프로젝트 생성
- [ ] Google Sheets API 활성화
- [ ] 서비스 계정 생성 + JSON 키 다운로드
- [ ] 스프레드시트 생성 (Sales / Dev 탭 + 헤더)
- [ ] 서비스 계정에 스프레드시트 편집 권한 부여
- [ ] `.env.local`에 Google 관련 3개 값 입력
- [ ] Google Sheets 연동 테스트 (폼 제출 → 시트 확인)
- [ ] Slack App 생성 + Incoming Webhook 활성화
- [ ] `.env.local`에 `SLACK_WEBHOOK_URL` 입력
- [ ] `src/lib/slack.ts` 생성
- [ ] `src/app/api/contact/route.ts`에 Slack 알림 호출 추가
- [ ] Slack 알림 테스트 (폼 제출 → Slack 채널 확인)

---

## 5. 프로덕션 배포 시 참고

- Vercel 배포 시: **Settings > Environment Variables**에 동일한 값 입력
- `GOOGLE_PRIVATE_KEY`는 Vercel에서 큰따옴표 없이 값만 입력 (Vercel이 자동 처리)
- Slack Webhook URL이 없으면 알림은 조용히 스킵되므로 선택 사항으로 운영 가능
