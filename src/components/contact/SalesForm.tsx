'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';
import ChipSelect from './ChipSelect';
import styles from './ContactForm.module.css';

export default function SalesForm() {
  const t = useTranslations('contact.sales');
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
        body: JSON.stringify({ type: 'sales', ...data }),
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
        <h3>Team · <em>Enterprise</em><br />도입 상담.</h3>
        <p>{t('desc')}</p>
        <div className={styles.quick}>
          <h5>Direct Channels</h5>
          <a href="mailto:brewnet.dev@gmail.com"><span>Sales</span><span className={styles.mono}>brewnet.dev@gmail.com</span></a>
          <a href="#"><span>Slack Community</span><span className={styles.mono}>join →</span></a>
          <a href="#"><span>전화 상담 예약</span><span className={styles.mono}>book →</span></a>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={`${styles.field} ${styles.row}`}>
          <div><label>{t('name')}</label><input type="text" name="name" required /></div>
          <div><label>{t('company')}</label><input type="text" name="company" required /></div>
        </div>
        <div className={`${styles.field} ${styles.row}`}>
          <div><label>{t('email')}</label><input type="email" name="email" required /></div>
          <div><label>{t('phone')}</label><input type="tel" name="phone" /></div>
        </div>
        <div className={styles.field}>
          <label>{t('products_label')}</label>
          <ChipSelect name="products" options={[
            { label: 'Tika', value: 'tika' },
            { label: 'MarkFlow', value: 'markflow' },
            { label: 'Tika + MarkFlow', value: 'both' },
          ]} />
        </div>
        <div className={styles.field}>
          <label>{t('size_label')}</label>
          <ChipSelect name="size" options={[
            { label: '1–10명', value: '1-10' },
            { label: '11–50명', value: '11-50' },
            { label: '51–200명', value: '51-200' },
            { label: '200명 이상', value: '200+' },
          ]} />
        </div>
        <div className={styles.field}>
          <label>{t('plan_label')}</label>
          <ChipSelect name="plan" options={[
            { label: 'Team (Cloud SaaS)', value: 'team' },
            { label: 'Enterprise (On-Prem)', value: 'enterprise' },
            { label: '온프레미스 LLM 연동', value: 'llm' },
            { label: 'SSO · RBAC', value: 'sso' },
          ]} />
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
