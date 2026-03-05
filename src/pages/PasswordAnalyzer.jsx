import { useState } from 'react';
import { analyzePassword } from '../utils/passwordUtils';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';
import ResultBox from '../components/ResultBox';

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const result = analyzePassword(password);

  const strengthColors = {
    'Very Weak': { bar: 'bg-red-500', text: 'text-red-400', width: '15%' },
    Weak: { bar: 'bg-orange-500', text: 'text-orange-400', width: '35%' },
    Medium: { bar: 'bg-yellow-500', text: 'text-yellow-400', width: '60%' },
    Strong: { bar: 'bg-neon-green', text: 'text-neon-green', width: '100%' },
    None: { bar: 'bg-gray-700', text: 'text-gray-500', width: '0%' },
  };

  const sc = strengthColors[result.strength] || strengthColors.None;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        icon="shield"
        title="Password Strength Analyzer"
        subtitle="Real-time password security analysis with entropy, crack time, and pattern detection."
        accentColor="neon-green"
      />

      <div className="space-y-6">
        <InfoBox title="Why password strength matters">
          An attacker with a fast GPU can try billions of hashes per second. A 6-character
          lowercase password falls in under a second, while a 16-character mixed-case
          passphrase with symbols can take <span className="text-neon-green">centuries</span>.
          Entropy &mdash; measured in bits &mdash; is the mathematical foundation behind
          password unpredictability.
        </InfoBox>
        <label className="mb-2 block font-mono text-xs font-medium uppercase tracking-widest text-gray-500">
          Enter Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type a password to analyze..."
            className="cyber-input w-full rounded-xl px-4 py-3.5 pr-12 font-mono text-sm"
            autoComplete="off"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>

      {/* Strength Meter */}
      {password && (
        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {/* Score bar */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className={`font-mono text-sm font-bold ${sc.text}`}>{result.strength}</span>
              <span className="font-mono text-sm text-gray-500">{result.score}/100</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-gray-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${sc.bar}`}
                style={{ width: sc.width }}
              />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-cyber-border bg-cyber-card p-4">
              <p className="mb-1 font-mono text-xs text-gray-500">Entropy</p>
              <p className="font-mono text-lg font-bold text-neon-blue">{result.entropy} <span className="text-xs text-gray-500">bits</span></p>
            </div>
            <div className="rounded-xl border border-cyber-border bg-cyber-card p-4">
              <p className="mb-1 font-mono text-xs text-gray-500">Crack Time</p>
              <p className="font-mono text-lg font-bold text-neon-purple">{result.crackTime}</p>
            </div>
            <div className="rounded-xl border border-cyber-border bg-cyber-card p-4 sm:col-span-1 col-span-2">
              <p className="mb-1 font-mono text-xs text-gray-500">Charset Size</p>
              <p className="font-mono text-lg font-bold text-neon-green">{result.charsetSize}</p>
            </div>
          </div>

          {/* Issues */}
          {result.issues.length > 0 && (
            <ResultBox title="Issues Detected" accent="red">
              <ul className="space-y-2">
                {result.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <span className="text-red-300">{issue}</span>
                  </li>
                ))}
              </ul>
            </ResultBox>
          )}

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <ResultBox title="Suggestions" accent="blue">
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                    <span className="text-blue-300">{s}</span>
                  </li>
                ))}
              </ul>
            </ResultBox>
          )}

          {/* Character analysis */}
          <ResultBox title="Character Analysis" accent="green">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { label: 'Lowercase', has: /[a-z]/.test(password) },
                { label: 'Uppercase', has: /[A-Z]/.test(password) },
                { label: 'Numbers', has: /[0-9]/.test(password) },
                { label: 'Special', has: /[^a-zA-Z0-9]/.test(password) },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${item.has ? 'bg-neon-green' : 'bg-gray-600'}`} />
                  <span className={item.has ? 'text-gray-200' : 'text-gray-600'}>{item.label}</span>
                </div>
              ))}
            </div>
          </ResultBox>
        </div>
      )}

      {/* Empty state */}
      {!password && (
        <div className="mt-12 text-center animate-fade-in-up">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyber-card">
            <svg className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <p className="font-mono text-sm text-gray-600">Start typing a password to see its analysis</p>
        </div>
      )}
      </div>
    </div>
  );
}
