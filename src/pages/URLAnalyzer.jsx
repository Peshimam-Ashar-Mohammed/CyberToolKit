import { useState } from 'react';
import { analyzeURL } from '../utils/urlUtils';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';
import ResultBox from '../components/ResultBox';

export default function URLAnalyzer() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!url.trim()) return;
    setResult(analyzeURL(url));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAnalyze();
  };

  const riskColors = {
    Safe: { bg: 'bg-neon-green/10', border: 'border-neon-green/20', text: 'text-neon-green', bar: 'bg-neon-green' },
    Low: { bg: 'bg-neon-blue/10', border: 'border-neon-blue/20', text: 'text-neon-blue', bar: 'bg-neon-blue' },
    Medium: { bg: 'bg-neon-yellow/10', border: 'border-neon-yellow/20', text: 'text-neon-yellow', bar: 'bg-neon-yellow' },
    High: { bg: 'bg-neon-red/10', border: 'border-neon-red/20', text: 'text-neon-red', bar: 'bg-neon-red' },
  };

  const severityIcons = {
    high: (
      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    medium: (
      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    low: (
      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
  };

  const rc = result && !result.error ? riskColors[result.riskLevel] : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        icon="globe"
        title="URL Security Analyzer"
        subtitle="Detect phishing indicators, suspicious patterns, and security risks in URLs."
        accentColor="neon-purple"
      />

      <div className="space-y-5">
        <InfoBox title="How URLs get exploited">
          Phishing URLs mimic legitimate domains using typosquatting (g00gle.com),
          subdomain tricks (login.google.com.evil.net), and excessive path depth.
          An HTTP URL means credentials travel in <span className="text-neon-purple">cleartext</span>.
          Suspicious keywords like &quot;login&quot;, &quot;verify&quot;, or &quot;secure&quot; in
          unexpected places raise red flags. IP-based hostnames bypass DNS entirely,
          hiding the real destination.
        </InfoBox>
        <label className="mb-2 block font-mono text-xs font-medium uppercase tracking-widest text-gray-500">
          Enter URL
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com/login..."
            className="cyber-input flex-1 rounded-xl px-4 py-3.5 font-mono text-sm"
            autoComplete="off"
          />
          <button
            onClick={handleAnalyze}
            disabled={!url.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-neon-purple/10 px-6 py-3.5 font-mono text-sm font-medium text-neon-purple transition-all hover:bg-neon-purple/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            Scan
          </button>
        </div>

      {/* Results */}
      {result && !result.error && rc && (
        <div className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {/* Risk level banner */}
          <div className={`flex items-center justify-between rounded-xl border ${rc.border} ${rc.bg} p-5`}>
            <div>
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-gray-400">Risk Level</p>
              <p className={`font-mono text-3xl font-bold ${rc.text}`}>{result.riskLevel}</p>
            </div>
            <div className="text-right">
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-gray-400">Score</p>
              <p className={`font-mono text-3xl font-bold ${rc.text}`}>{result.riskScore}<span className="text-sm text-gray-500">/100</span></p>
            </div>
          </div>

          {/* URL breakdown */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-cyber-border bg-cyber-card p-4">
              <p className="mb-1 font-mono text-xs text-gray-500">Protocol</p>
              <p className={`font-mono text-lg font-bold ${result.isHTTPS ? 'text-neon-green' : 'text-neon-red'}`}>
                {result.protocol.toUpperCase()}
                {result.isHTTPS ? ' ✓' : ' ✗'}
              </p>
            </div>
            <div className="rounded-xl border border-cyber-border bg-cyber-card p-4 sm:col-span-2">
              <p className="mb-1 font-mono text-xs text-gray-500">Hostname</p>
              <p className="truncate font-mono text-lg font-bold text-white">{result.hostname}</p>
            </div>
          </div>

          {/* Issues list */}
          {result.issues.length > 0 ? (
            <ResultBox title="Detected Issues" accent={result.riskLevel === 'High' ? 'red' : result.riskLevel === 'Medium' ? 'yellow' : 'blue'}>
              <ul className="space-y-3">
                {result.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    {severityIcons[issue.severity]}
                    <div>
                      <span className={`text-sm ${issue.severity === 'high' ? 'text-red-300' : issue.severity === 'medium' ? 'text-yellow-300' : 'text-blue-300'}`}>
                        {issue.message}
                      </span>
                      <span className={`ml-2 rounded px-1.5 py-0.5 font-mono text-[10px] uppercase ${
                        issue.severity === 'high' ? 'bg-neon-red/10 text-neon-red' :
                        issue.severity === 'medium' ? 'bg-neon-yellow/10 text-neon-yellow' :
                        'bg-neon-blue/10 text-neon-blue'
                      }`}>
                        {issue.severity}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </ResultBox>
          ) : (
            <ResultBox title="Result" accent="green">
              <p className="text-neon-green">No security issues detected. This URL appears safe.</p>
            </ResultBox>
          )}

          {/* Hackability explanation */}
          <div className="rounded-xl border border-cyber-border bg-cyber-card/60 p-4">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[.15em] text-gray-500">Hackability Breakdown</p>
            <div className="space-y-2 text-[13px] leading-relaxed text-gray-400">
              <p>
                <span className="font-bold text-gray-300">Protocol:</span>{' '}
                {result.isHTTPS
                  ? 'HTTPS encrypts data in transit, protecting against man-in-the-middle attacks.'
                  : 'HTTP sends data in cleartext. An attacker on the same network can intercept credentials, cookies, and session tokens using tools like Wireshark.'}
              </p>
              <p>
                <span className="font-bold text-gray-300">Domain reputation:</span>{' '}
                {result.issues.length === 0
                  ? 'No suspicious indicators found in the domain structure.'
                  : 'Found indicators that suggest this domain may impersonate a legitimate service or use obfuscation techniques common in phishing campaigns.'}
              </p>
              <p>
                <span className="font-bold text-gray-300">Risk score {result.riskScore}/100:</span>{' '}
                {result.riskScore <= 20
                  ? 'Low attack surface. URL structure follows safe conventions.'
                  : result.riskScore <= 50
                  ? 'Moderate risk. Some patterns match known social engineering techniques. Verify the domain carefully before entering credentials.'
                  : 'High risk. Multiple red flags detected. This URL exhibits patterns heavily associated with phishing, credential harvesting, or drive-by downloads.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {result?.error && (
        <div className="flex items-center gap-3 rounded-xl border border-neon-red/20 bg-neon-red/5 p-4 animate-fade-in-up">
          <svg className="h-5 w-5 flex-shrink-0 text-neon-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="font-mono text-sm text-red-300">{result.error}</p>
        </div>
      )}

      {/* Empty state */}
      {!result && (
        <div className="mt-12 text-center animate-fade-in-up">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyber-card">
            <svg className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <p className="font-mono text-sm text-gray-600">Enter a URL and click Scan to analyze its security</p>
        </div>
      )}
      </div>
    </div>
  );
}
