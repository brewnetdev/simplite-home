'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import SalesForm from './SalesForm';
import DevForm from './DevForm';
import styles from './ContactTabs.module.css';

export default function ContactTabs() {
  const t = useTranslations('contact');
  const [activeTab, setActiveTab] = useState<'sales' | 'dev'>('sales');

  return (
    <section style={{ paddingTop: 20 }}>
      <div className="container">
        <div className={styles.tabsWrap}>
          <div className={styles.tabsRow}>
            <button
              className={activeTab === 'sales' ? styles.active : ''}
              onClick={() => setActiveTab('sales')}
            >
              {t('tab_sales')}
            </button>
            <button
              className={activeTab === 'dev' ? styles.active : ''}
              onClick={() => setActiveTab('dev')}
            >
              {t('tab_dev')}
            </button>
          </div>
          {activeTab === 'sales' ? <SalesForm /> : <DevForm />}
        </div>
      </div>
    </section>
  );
}
