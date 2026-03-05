import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';
import ResultBox from '../components/ResultBox';
import { analyzeHeaders } from '../utils/headerUtils';

const SAMPLE = `Content-Type: text/html; charset=utf-8
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff`;

export default function HeaderAnalyzer() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setResult(analyzeHeaders(input));
  };

  const gradeColors = { A: 'text-neon-green', B: 'text-neon-blue', C: 'text-neon-yellow', D: 'text-neon-orange', F: 'text-neon-red' };
  const statusColors = { present: 'text-neon-green', missing: 'text-neon-red', weak: 'text-neon-yellow' };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        icon="server"
        title="HTTP Header Analyzer"
        subtitle="Paste HTTP response headers to check for security misconfigurations."
        accentColor="neon-blue"
      />

      <div className="space-y-5">
        <InfoBox title="Why security headers matter">
          HTTP security headers instruct the browser to enable protective features:
          blocking clickjacking (X-Frame-Options), preventing XSS (CSP), enforcing
          HTTPS (HSTS), and more. Missing headers are a top finding in penetration tests
          and are <span className="text-neon-blue">easy to fix</span> at the server level.
        </InfoBox>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500">Response Headers</label>
            <button onClick={() => setInput(SAMPLE)} className="font-mono text-[10px] text-gray-600 transition-colors hover:text-neon-blue">
              Load Sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Paste HTTP response headers here...\nHeader-Name: value"}
            rows={6}
            className="w-full rounded-xl border border-cyber-border bg-cyber-card px-4 py-3 font-mono text-sm text-gray-200 outline-none transition-all focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!input.trim()}
          className="rounded-xl bg-neon-blue/15 px-6 py-2.5 font-mono text-sm font-bold text-neon-blue transition-all hover:bg-neon-blue/25 disabled:opacity-40"
        >
          Analyze Headers
        </button>

        {result && (
          <div className="space-y-4 animate-fade-in-up">
            <ResultBox title="Security Grade" accent="blue">
              <div className="flex items-center gap-3">
                <span className={`text-4xl font-black ${gradeColors[result.grade] || 'text-gray-400'}`}>{result.grade}</span>
                <span className="text-sm text-gray-400">{result.score} / {result.maxScore} points</span>
              </div>
            </ResultBox>

            <div className="rounded-xl border border-cyber-border bg-cyber-card/60 p-4">
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[.15em] text-gray-500">Header Results</p>
              <div className="space-y-2">
                {result.headers.map((h) => (
                  <div key={h.name} className="flex items-start gap-3 rounded-lg bg-white/[.02] px-3 py-2">
                    <span className={`mt-0.5 font-mono text-[10px] font-bold uppercase ${statusColors[h.status]}`}>
                      {h.status === 'present' ? 'OK' : h.status === 'weak' ? 'WEAK' : 'MISS'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs font-bold text-gray-300">{h.name}</p>
                      <p className="text-[11px] text-gray-500">{h.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
