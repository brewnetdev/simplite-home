'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';
import ChipSelect from './ChipSelect';
import styles from './ContactForm.module.css';

export default function DevForm() {
  const t = useTranslations('contact.dev');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'dev', ...data }),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelIntro}>
        <h3>개발자 · <em>기술</em> 문의.</h3>
        <p>{t('desc')}</p>
        <div className={styles.quick}>
          <h5>Direct Channels</h5>
          <a href="mailto:dev@simplite.net"><span>Dev Contact</span><span className={styles.mono}>dev@simplite.net</span></a>
          <a href="https://github.com/claude-code-expert/tika" target="_blank" rel="noopener noreferrer"><span>Tika Issues</span><span className={styles.mono}>github ↗</span></a>
          <a href="https://github.com/claude-code-expert/markflow" target="_blank" rel="noopener noreferrer"><span>MarkFlow Issues</span><span className={styles.mono}>github ↗</span></a>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={`${styles.field} ${styles.row}`}>
          <div><label>{t('name')}</label><input type="text" name="name" required /></div>
          <div><label>{t('email')}</label><input type="email" name="email" required /></div>
        </div>
        <div className={styles.field}>
          <label>{t('target_label')}</label>
          <ChipSelect name="target" options={[
            { label: 'Tika', value: 'tika' },
            { label: 'MarkFlow', value: 'markflow' },
            { label: 'MCP 연동', value: 'mcp' },
            { label: '인프라 · 배포', value: 'infra' },
          ]} />
        </div>
        <div className={styles.field}>
          <label>{t('topic_label')}</label>
          <ChipSelect name="topic" options={[
            { label: '버그 리포트', value: 'bug' },
            { label: '기능 제안', value: 'feature' },
            { label: '보안 · CVE 제보', value: 'security' },
            { label: '컨트리뷰션', value: 'contrib' },
            { label: '기타', value: 'other' },
          ]} />
        </div>
        <div className={styles.field}>
          <label>{t('issue_url')}</label>
          <input type="url" name="issue_url" placeholder={t('issue_placeholder')} />
        </div>
        <div className={styles.field}>
          <label>{t('message_label')}</label>
          <textarea name="message" placeholder={t('message_placeholder')} required />
        </div>
        <div className={styles.submitRow}>
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? '보내는 중...' : t('submit')}
          </button>
          <span className={styles.note}>{t('submit_note')}</span>
        </div>
        {status === 'success' && <div className={styles.okMsg}>{t('success')}</div>}
        {status === 'error' && <div className={styles.errMsg}>오류가 발생했습니다. 다시 시도해주세요.</div>}
      </form>
    </div>
  );
}
