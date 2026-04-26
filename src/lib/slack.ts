type Field = { label: string; value: string };

type SlackBlock =
  | { type: 'header'; text: { type: 'plain_text'; text: string } }
  | { type: 'context'; elements: Array<{ type: 'mrkdwn'; text: string }> }
  | { type: 'section'; fields?: Array<{ type: 'mrkdwn'; text: string }>; text?: { type: 'mrkdwn'; text: string } }
  | { type: 'divider' };

type SlackPayload = {
  text: string;
  blocks: SlackBlock[];
};

const PRODUCT_LABELS: Record<string, string> = {
  tika: 'Tika',
  markflow: 'MarkFlow',
  both: 'Tika + MarkFlow',
  mcp: 'MCP 연동',
  infra: '인프라 · 배포',
};

const SIZE_LABELS: Record<string, string> = {
  '1-10': '1–10명',
  '11-50': '11–50명',
  '51-200': '51–200명',
  '200+': '200명 이상',
};

const PLAN_LABELS: Record<string, string> = {
  team: 'Team (Cloud SaaS)',
  enterprise: 'Enterprise (On-Prem)',
  llm: '온프레미스 LLM 연동',
  sso: 'SSO · RBAC',
};

const TOPIC_LABELS: Record<string, string> = {
  bug: '버그 리포트',
  feature: '기능 제안',
  security: '보안 · CVE 제보',
  contrib: '컨트리뷰션',
  other: '기타',
};

function pretty(map: Record<string, string>, value: string): string {
  if (!value) return '-';
  return map[value] ?? value;
}

function fieldsToBlocks(fields: Field[]): SlackBlock[] {
  const blocks: SlackBlock[] = [];
  for (let i = 0; i < fields.length; i += 2) {
    const pair = fields.slice(i, i + 2);
    blocks.push({
      type: 'section',
      fields: pair.map((f) => ({ type: 'mrkdwn', text: `*${f.label}*\n${f.value || '-'}` })),
    });
  }
  return blocks;
}

export type SalesPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  products?: string;
  size?: string;
  plan?: string;
  message?: string;
};

export type DevPayload = {
  name?: string;
  email?: string;
  target?: string;
  topic?: string;
  issue_url?: string;
  message?: string;
};

export function buildSalesMessage(data: SalesPayload, timestamp: string): SlackPayload {
  const headerText = `Sales Inquiry · ${data.company || '(no company)'}`;
  const blocks: SlackBlock[] = [
    { type: 'header', text: { type: 'plain_text', text: '🟢 도입 문의 (Sales)' } },
    { type: 'context', elements: [{ type: 'mrkdwn', text: `*${headerText}* · ${timestamp}` }] },
    { type: 'divider' },
    ...fieldsToBlocks([
      { label: '담당자', value: data.name || '' },
      { label: '회사', value: data.company || '' },
      { label: '이메일', value: data.email ? `<mailto:${data.email}|${data.email}>` : '' },
      { label: '연락처', value: data.phone || '' },
      { label: '관심 제품', value: pretty(PRODUCT_LABELS, data.products || '') },
      { label: '팀 규모', value: pretty(SIZE_LABELS, data.size || '') },
      { label: '검토 플랜', value: pretty(PLAN_LABELS, data.plan || '') },
    ]),
  ];

  if (data.message) {
    blocks.push({ type: 'divider' });
    blocks.push({ type: 'section', text: { type: 'mrkdwn', text: `*문의 내용*\n${data.message}` } });
  }

  return { text: `[Sales] ${data.company || ''} · ${data.name || ''}`, blocks };
}

export function buildDevMessage(data: DevPayload, timestamp: string): SlackPayload {
  const headerText = `Dev Support · ${pretty(PRODUCT_LABELS, data.target || '') || '(unspecified)'}`;
  const blocks: SlackBlock[] = [
    { type: 'header', text: { type: 'plain_text', text: '🔵 기술 문의 (Dev)' } },
    { type: 'context', elements: [{ type: 'mrkdwn', text: `*${headerText}* · ${timestamp}` }] },
    { type: 'divider' },
    ...fieldsToBlocks([
      { label: '이름', value: data.name || '' },
      { label: '이메일', value: data.email ? `<mailto:${data.email}|${data.email}>` : '' },
      { label: '대상 제품', value: pretty(PRODUCT_LABELS, data.target || '') },
      { label: '주제', value: pretty(TOPIC_LABELS, data.topic || '') },
      { label: '관련 링크', value: data.issue_url ? `<${data.issue_url}|${data.issue_url}>` : '-' },
    ]),
  ];

  if (data.message) {
    blocks.push({ type: 'divider' });
    blocks.push({ type: 'section', text: { type: 'mrkdwn', text: `*상세 내용*\n${data.message}` } });
  }

  return { text: `[Dev] ${data.target || ''} · ${data.name || ''}`, blocks };
}

export async function sendToSlack(payload: SlackPayload): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    throw new Error('Missing SLACK_WEBHOOK_URL');
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Slack webhook failed: ${res.status} ${body}`);
  }
}
