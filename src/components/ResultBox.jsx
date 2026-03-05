import { useState } from 'react';

export default function ResultBox({ title, children, accent = 'green', copyText }) {
  const [copied, setCopied] = useState(false);

  const accentStyles = {
    green: 'border-neon-green/20 bg-neon-green/5',
    blue: 'border-neon-blue/20 bg-neon-blue/5',
    red: 'border-neon-red/20 bg-neon-red/5',
    purple: 'border-neon-purple/20 bg-neon-purple/5',
    yellow: 'border-neon-yellow/20 bg-neon-yellow/5',
  };

  const titleStyles = {
    green: 'text-neon-green',
    blue: 'text-neon-blue',
    red: 'text-neon-red',
    purple: 'text-neon-purple',
    yellow: 'text-neon-yellow',
  };

  const handleCopy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may not be available
    }
  };

  return (
    <div className={`rounded-xl border ${accentStyles[accent] || accentStyles.green} p-4 animate-fade-in-up`}>
      <div className="mb-3 flex items-center justify-between">
        <h4 className={`font-mono text-xs font-bold uppercase tracking-widest ${titleStyles[accent] || titleStyles.green}`}>
          {title}
        </h4>
        {copyText && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-gray-400 transition-all hover:bg-white/10 hover:text-white"
          >
            {copied ? (
              <>
                <svg className="h-3.5 w-3.5 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        )}
      </div>
      <div className="font-mono text-sm leading-relaxed text-gray-300">{children}</div>
    </div>
  );
}
