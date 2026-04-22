'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, DragEvent } from 'react';
import SectionHead from '@/components/ui/SectionHead';
import styles from './KanbanDemo.module.css';

interface Ticket {
  id: string;
  type: 'goal' | 'story' | 'feat' | 'task';
  titleKey: number;
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
}

const INITIAL_COLUMNS: Record<string, Ticket[]> = {
  backlog: [
    { id: '1', type: 'goal', titleKey: 0, priority: 'High', assignee: 'E' },
    { id: '2', type: 'story', titleKey: 1, priority: 'Medium', assignee: 'D' },
    { id: '3', type: 'task', titleKey: 2, priority: 'High', assignee: 'E' },
  ],
  todo: [
    { id: '4', type: 'feat', titleKey: 3, priority: 'High', assignee: 'E' },
    { id: '5', type: 'task', titleKey: 4, priority: 'Medium', assignee: 'D' },
  ],
  progress: [
    { id: '6', type: 'feat', titleKey: 5, priority: 'High', assignee: 'E' },
    { id: '7', type: 'task', titleKey: 6, priority: 'Medium', assignee: 'D' },
  ],
  done: [
    { id: '8', type: 'task', titleKey: 7, priority: 'Low', assignee: 'E' },
    { id: '9', type: 'task', titleKey: 8, priority: 'Low', assignee: 'D' },
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
  const ticketTitles = t.raw('kanban_tickets') as string[];
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
          title={t.rich('demo_title', { accent: (chunks) => <span style={{ color: 'var(--green)' }}>{chunks}</span> })}
          aside={t('demo_aside')}
        />
        <div className={styles.demoBoard}>
          <div className={styles.demoInner}>
            <div className={styles.demoTop}>
              <span className={styles.dtitle}>{t('demo_workspace')}</span>
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
                      <div className={styles.ttitle}>{ticketTitles[ticket.titleKey]}</div>
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
