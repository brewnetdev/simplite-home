'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import SectionHead from '@/components/ui/SectionHead';
import styles from './FaqSection.module.css';

export default function FaqSection() {
  const t = useTranslations('faq');
  const items: Array<{q: string; a: string}> = t.raw('items');
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="tight">
      <div className="container">
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} center />
        <div className={styles.faqList}>
          {items.map((item, i) => (
            <div
              key={i}
              className={`${styles.faqItem} ${openIndex === i ? styles.open : ''}`}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            >
              <div className={styles.faqQ}>
                {item.q}
                <span className={styles.plus}>+</span>
              </div>
              <div className={styles.faqA}>{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
