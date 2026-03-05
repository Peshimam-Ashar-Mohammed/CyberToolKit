import { useEffect, useRef } from 'react';

const CHARS = '01アイウエオカキクケコサシスセソタチツテト10';

export default function CodeRain({ columnCount = 12 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cols = [];
    for (let i = 0; i < columnCount; i++) {
      const delay = Math.random() * 8;
      const duration = 6 + Math.random() * 10;
      const left = (i / columnCount) * 100 + Math.random() * (100 / columnCount);
      const charCount = 6 + Math.floor(Math.random() * 12);

      const col = document.createElement('div');
      col.className = 'code-rain-char';
      col.style.left = `${left}%`;
      col.style.animationDuration = `${duration}s`;
      col.style.animationDelay = `${delay}s`;

      let text = '';
      for (let j = 0; j < charCount; j++) {
        text += CHARS[Math.floor(Math.random() * CHARS.length)] + '\n';
      }
      col.textContent = text;
      container.appendChild(col);
      cols.push(col);
    }

    return () => { cols.forEach((c) => c.remove()); };
  }, [columnCount]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-40"
      aria-hidden="true"
    />
  );
}
