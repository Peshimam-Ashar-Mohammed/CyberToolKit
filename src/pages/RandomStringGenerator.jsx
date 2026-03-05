import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';
import ResultBox from '../components/ResultBox';
import { generateRandomString } from '../utils/randomStringUtils';

export default function RandomStringGenerator() {
  const [length, setLength] = useState(32);
  const [options, setOptions] = useState({ hex: false, alphanumeric: true, urlSafe: false });
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    setOutput(generateRandomString(length, options));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        icon="sparkles"
        title="Secure Random String"
        subtitle="Generate cryptographically random strings for tokens, keys, and nonces."
        accentColor="neon-green"
      />

      <div className="space-y-5">
        <InfoBox title="Cryptographic randomness">
          These strings use <span className="text-neon-green">crypto.getRandomValues()</span>,
          the browser's cryptographically secure PRNG. Unlike Math.random(), this entropy
          source is suitable for session tokens, CSRF tokens, API keys, and other
          security-sensitive identifiers. Never use predictable random for authentication.
        </InfoBox>

        <div>
          <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
            Length: {length}
          </label>
          <input type="range" min={8} max={128} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-neon-green" />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-gray-600"><span>8</span><span>128</span></div>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { key: 'hex', label: 'Hex Only' },
            { key: 'alphanumeric', label: 'Alphanumeric' },
            { key: 'urlSafe', label: 'URL-Safe' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setOptions((prev) => ({ hex: false, alphanumeric: false, urlSafe: false, [key]: true }))}
              className={`rounded-lg px-3.5 py-2 font-mono text-xs font-bold transition-all ${
                options[key] ? 'bg-neon-green/15 text-neon-green' : 'bg-white/5 text-gray-600 hover:text-gray-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          className="rounded-xl bg-neon-green/15 px-6 py-2.5 font-mono text-sm font-bold text-neon-green transition-all hover:bg-neon-green/25"
        >
          Generate
        </button>

        {output && (
          <ResultBox title="Random String" accent="green" copyText={output}>
            <p className="break-all text-base tracking-wide">{output}</p>
          </ResultBox>
        )}
      </div>
    </div>
  );
}
