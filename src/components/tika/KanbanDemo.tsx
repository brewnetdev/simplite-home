'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, DragEvent } from 'react';
import SectionHead from '@/components/ui/SectionHead';
import styles from './KanbanDemo.module.css';

interface Ticket {
  id: string;
  type: 'goal' | 'story' | 'feat' | 'task';
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
}

const INITIAL_COLUMNS: Record<string, Ticket[]> = {
  backlog: [
    { id: '1', type: 'goal', title: 'MVP 출시 계획', priority: 'High', assignee: 'E' },
    { id: '2', type: 'story', title: '인증 시스템 설계', priority: 'Medium', assignee: 'D' },
    { id: '3', type: 'task', title: '오버듀 2건 확인 필요', priority: 'High', assignee: 'E' },
  ],
  todo: [
    { id: '4', type: 'feat', title: '드래그앤드롭 구현', priority: 'High', assignee: 'E' },
    { id: '5', type: 'task', title: 'API 엔드포인트 초안', priority: 'Medium', assignee: 'D' },
  ],
  progress: [
    { id: '6', type: 'feat', title: '칸반 보드 UI 작업', priority: 'High', assignee: 'E' },
    { id: '7', type: 'task', title: 'Google OAuth 연동', priority: 'Medium', assignee: 'D' },
  ],
  done: [
    { id: '8', type: 'task', title: 'DB 스키마 설계 ✓', priority: 'Low', assignee: 'E' },
    { id: '9', type: 'task', title: 'ERD 확정 ✓', priority: 'Low', assignee: 'D' },
  ],
};

const COL_NAMES: Record<string, string> = {
  backlog: 'BACKLOG',
  todo: 'TODO',
  progress: 'IN PROGRESS',
  done: 'DONE',
};

export default function KanbanDemo() {
  const t = useTranslations('tika');
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const dragItem = useRef<{ id: string; from: string } | null>(null);

  const handleDragStart = (ticketId: string, colKey: string) => {
    dragItem.current = { id: ticketId, from: colKey };
  };

  const handleDrop = (e: DragEvent, toCol: string) => {
    e.preventDefault();
    if (!dragItem.current) return;
    const { id, from } = dragItem.current;
    if (from === toCol) return;

    setColumns((prev) => {
      const ticket = prev[from].find((t) => t.id === id);
      if (!ticket) return prev;
      return {
        ...prev,
        [from]: prev[from].filter((t) => t.id !== id),
        [toCol]: [...prev[toCol], ticket],
      };
    });
    dragItem.current = null;
  };

  return (
    <section>
      <div className="container">
        <SectionHead
          eyebrow={t('demo_eyebrow')}
          title={<>실제 <span style={{ color: 'var(--green)' }}>드래그 앤 드롭</span>으로 움직여보세요.</>}
          aside={t('demo_aside')}
        />
        <div className={styles.demoBoard}>
          <div className={styles.demoInner}>
            <div className={styles.demoTop}>
              <span className={styles.dtitle}>Tika · MVP 출시 워크스페이스</span>
              <span className={styles.dbadge}>DRAG TO REORDER · 4 COLUMNS</span>
            </div>
            <div className={styles.demoCols}>
              {Object.entries(columns).map(([key, tickets]) => (
                <div
                  key={key}
                  className={styles.demoCol}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, key)}
                >
                  <div className={styles.ch}>
                    <span>{COL_NAMES[key]}</span>
                    <span className={styles.cnt}>{tickets.length}</span>
                  </div>
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={styles.ticket}
                      draggable
                      onDragStart={() => handleDragStart(ticket.id, key)}
                    >
                      <span className={`${styles.ttype} ${styles[ticket.type]}`}>
                        {ticket.type.toUpperCase()}
                      </span>
                      <div className={styles.ttitle}>{ticket.title}</div>
                      <div className={styles.tmeta}>
                        <span className={`${styles.pri} ${ticket.priority === 'Medium' ? styles.med : ''} ${ticket.priority === 'Low' ? styles.low : ''}`}>
                          {ticket.priority}
                        </span>
                        <span>{ticket.assignee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.demoNote}>{t('demo_note')}</div>
      </div>
    </section>
  );
}
