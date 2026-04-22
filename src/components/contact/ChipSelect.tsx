'use client';

import { useState } from 'react';
import styles from './ChipSelect.module.css';

export default function ChipSelect({
  options,
  name,
}: {
  options: { label: string; value: string }[];
  name: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  return (
    <div className={styles.chips}>
      <input type="hidden" name={name} value={selected.join(',')} />
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`${styles.chip} ${selected.includes(opt.value) ? styles.on : ''}`}
          onClick={() => toggle(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
