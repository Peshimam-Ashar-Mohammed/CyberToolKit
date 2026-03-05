import { useState, useEffect, useRef } from 'react';

export default function TerminalText({ lines, speed = 30, className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef(null);
  const lastTime = useRef(0);

  useEffect(() => {
    if (lineIdx >= lines.length) { setDone(true); return; }

    const currentLine = lines[lineIdx];

    const tick = (timestamp) => {
      if (timestamp - lastTime.current >= speed) {
        lastTime.current = timestamp;
        if (charIdx < currentLine.length) {
          setDisplayed((prev) => prev + currentLine[charIdx]);
          setCharIdx((c) => c + 1);
        } else {
          setDisplayed((prev) => prev + '\n');
          setLineIdx((l) => l + 1);
          setCharIdx(0);
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [lineIdx, charIdx, lines, speed]);

  return (
    <div className={`font-mono text-xs leading-relaxed ${className}`}>
      <pre className="whitespace-pre-wrap text-neon-green/60">{displayed}</pre>
      {!done && <span className="terminal-cursor" />}
    </div>
  );
}
