// Standalone Slack webhook integration test.
// Run: node --env-file=.env.local scripts/test-slack.mjs
//
// Replicates src/lib/slack.ts payload builders in plain JS so this script
// runs without a TS toolchain. If you change builders in src/lib/slack.ts,
// keep these in sync (or migrate to a shared module via a build step).

const PRODUCT_LABELS = {
  tika: 'Tika',
  markflow: 'MarkFlow',
  both: 'Tika + MarkFlow',
  mcp: 'MCP 연동',
  infra: '인프라 · 배포',
};
const SIZE_LABELS = {
  '1-10': '1–10명',
  '11-50': '11–50명',
  '51-200': '51–200명',
  '200+': '200명 이상',
};
const PLAN_LABELS = {
  team: 'Team (Cloud SaaS)',
  enterprise: 'Enterprise (On-Prem)',
  llm: '온프레미스 LLM 연동',
  sso: 'SSO · RBAC',
};
const TOPIC_LABELS = {
  bug: '버그 리포트',
  feature: '기능 제안',
  security: '보안 · CVE 제보',
  contrib: '컨트리뷰션',
  other: '기타',
};

const pretty = (map, v) => (!v ? '-' : map[v] ?? v);

function fieldsToBlocks(fields) {
  const blocks = [];
  for (let i = 0; i < fields.length; i += 2) {
    const pair = fields.slice(i, i + 2);
    blocks.push({
      type: 'section',
      fields: pair.map((f) => ({ type: 'mrkdwn', text: `*${f.label}*\n${f.value || '-'}` })),
    });
  }
  return blocks;
}

function buildSales(data, ts) {
  const blocks = [
    { type: 'header', text: { type: 'plain_text', text: '🟢 도입 문의 (Sales) · TEST' } },
    { type: 'context', elements: [{ type: 'mrkdwn', text: `*Sales Inquiry · ${data.company}* · ${ts}` }] },
    { type: 'divider' },
    ...fieldsToBlocks([
      { label: '담당자', value: data.name },
      { label: '회사', value: data.company },
      { label: '이메일', value: `<mailto:${data.email}|${data.email}>` },
      { label: '연락처', value: data.phone },
      { label: '관심 제품', value: pretty(PRODUCT_LABELS, data.products) },
      { label: '팀 규모', value: pretty(SIZE_LABELS, data.size) },
      { label: '검토 플랜', value: pretty(PLAN_LABELS, data.plan) },
    ]),
    { type: 'divider' },
    { type: 'section', text: { type: 'mrkdwn', text: `*문의 내용*\n${data.message}` } },
  ];
  return { text: `[Sales · TEST] ${data.company} · ${data.name}`, blocks };
}

function buildDev(data, ts) {
  const blocks = [
    { type: 'header', text: { type: 'plain_text', text: '🔵 기술 문의 (Dev) · TEST' } },
    { type: 'context', elements: [{ type: 'mrkdwn', text: `*Dev Support · ${pretty(PRODUCT_LABELS, data.target)}* · ${ts}` }] },
    { type: 'divider' },
    ...fieldsToBlocks([
      { label: '이름', value: data.name },
      { label: '이메일', value: `<mailto:${data.email}|${data.email}>` },
      { label: '대상 제품', value: pretty(PRODUCT_LABELS, data.target) },
      { label: '주제', value: pretty(TOPIC_LABELS, data.topic) },
      { label: '관련 링크', value: data.issue_url ? `<${data.issue_url}|${data.issue_url}>` : '-' },
    ]),
    { type: 'divider' },
    { type: 'section', text: { type: 'mrkdwn', text: `*상세 내용*\n${data.message}` } },
  ];
  return { text: `[Dev · TEST] ${data.target} · ${data.name}`, blocks };
}

async function postSlack(label, payload, url) {
  process.stdout.write(`→ ${label} ... `);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await res.text().catch(() => '');
  if (!res.ok) {
    console.log(`FAIL (${res.status}) ${body}`);
    return false;
  }
  console.log(`OK (${res.status} ${body || 'ok'})`);
  return true;
}

async function main() {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    console.error('SLACK_WEBHOOK_URL is not set. Run with: node --env-file=.env.local scripts/test-slack.mjs');
    process.exit(1);
  }

  const ts = new Date().toISOString();

  const salesSample = {
    name: '홍길동',
    company: 'Brewnet (TEST)',
    email: 'tester@example.com',
    phone: '010-1234-5678',
    products: 'both',
    size: '11-50',
    plan: 'enterprise',
    message: '테스트 메시지입니다. 슬랙 웹훅 연동 검증용.',
  };

  const devSample = {
    name: 'Dev Tester',
    email: 'dev-tester@example.com',
    target: 'markflow',
    topic: 'bug',
    issue_url: 'https://github.com/claude-code-expert/markflow/issues/1',
    message: '테스트 메시지: 듀얼 에디터에서 LaTeX 렌더 이슈 (가상의 케이스).',
  };

  const results = [];
  results.push(await postSlack('Sales sample', buildSales(salesSample, ts), url));
  results.push(await postSlack('Dev sample', buildDev(devSample, ts), url));

  const passed = results.filter(Boolean).length;
  const total = results.length;
  console.log(`\n${passed}/${total} passed`);
  process.exit(passed === total ? 0 : 1);
}

main().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
