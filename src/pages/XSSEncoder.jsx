import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';
import ResultBox from '../components/ResultBox';
import { escapeHTML, escapeForAttribute, escapeForJS, urlEncode, detectXSSPatterns } from '../utils/xssUtils';

export default function XSSEncoder() {
  const [input, setInput] = useState('');
  const [tab, setTab] = useState('encode');

  const encodings = input
    ? [
        { label: 'HTML Entity Encoding', value: escapeHTML(input) },
        { label: 'Attribute Context', value: escapeForAttribute(input) },
        { label: 'JavaScript String', value: escapeForJS(input) },
        { label: 'URL Encoding', value: urlEncode(input) },
      ]
    : [];

  const detections = input ? detectXSSPatterns(input) : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        icon="bugAnt"
        title="XSS Payload Encoder"
        subtitle="Encode payloads for safe output or detect potential XSS patterns in input."
        accentColor="neon-red"
      />

      <div className="space-y-5">
        <InfoBox title="Cross-Site Scripting (XSS)">
          XSS attacks inject malicious scripts into web pages viewed by other users.
          Proper output encoding is the primary defense: every piece of user-supplied data
          must be encoded for the context it is placed in (HTML body, attribute,
          JavaScript, URL). <span className="text-neon-red">Context-aware encoding</span> prevents
          the browser from interpreting data as executable code.
        </InfoBox>

        <div className="flex gap-2">
          {['encode', 'detect'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 font-mono text-sm font-bold capitalize transition-all ${
                tab === t ? 'bg-neon-red/15 text-neon-red' : 'bg-white/5 text-gray-500 hover:text-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
            {tab === 'encode' ? 'Raw Input' : 'Untrusted Input to Scan'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tab === 'encode' ? '<script>alert(1)</script>' : 'Paste untrusted input...'}
            rows={3}
            className="w-full rounded-xl border border-cyber-border bg-cyber-card px-4 py-3 font-mono text-sm text-gray-200 outline-none transition-all focus:border-neon-red/50 focus:ring-1 focus:ring-neon-red/30"
          />
        </div>

        {tab === 'encode' && encodings.length > 0 && (
          <div className="space-y-3 animate-fade-in-up">
            {encodings.map((enc) => (
              <ResultBox key={enc.label} title={enc.label} accent="red" copyText={enc.value}>
                <p className="break-all">{enc.value}</p>
              </ResultBox>
            ))}
          </div>
        )}

        {tab === 'detect' && input && (
          <div className="animate-fade-in-up">
            {detections.length === 0 ? (
              <ResultBox title="Scan Result" accent="green">
                <p>No obvious XSS patterns detected.</p>
              </ResultBox>
            ) : (
              <ResultBox title={`${detections.length} Pattern(s) Detected`} accent="red">
                <ul className="space-y-1.5 list-none">
                  {detections.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon-red" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </ResultBox>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
