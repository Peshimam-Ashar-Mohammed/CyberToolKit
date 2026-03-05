import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';
import ResultBox from '../components/ResultBox';
import { base64Encode, base64Decode } from '../utils/base64Utils';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [error, setError] = useState('');

  const handleConvert = () => {
    setError('');
    if (!input.trim()) return;
    try {
      const result = mode === 'encode' ? base64Encode(input) : base64Decode(input);
      setOutput(result);
    } catch {
      setError('Invalid input for the selected operation.');
      setOutput('');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        icon="code"
        title="Base64 Encoder / Decoder"
        subtitle="Encode text to Base64 or decode Base64 back to plaintext."
        accentColor="neon-cyan"
      />

      <div className="space-y-5">
        <InfoBox title="What is Base64?">
          Base64 is a binary-to-text encoding scheme that represents binary data as
          printable ASCII characters. It's widely used in email (MIME), data URIs, and
          embedding binary data in JSON or XML. It is <span className="text-neon-cyan">not encryption</span> --
          anyone can decode it. Never use it to hide sensitive data.
        </InfoBox>

        <div className="flex gap-2">
          {['encode', 'decode'].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setOutput(''); setError(''); }}
              className={`rounded-lg px-4 py-2 font-mono text-sm font-bold capitalize transition-all ${
                mode === m ? 'bg-neon-cyan/15 text-neon-cyan' : 'bg-white/5 text-gray-500 hover:text-gray-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
            {mode === 'encode' ? 'Plaintext Input' : 'Base64 Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
            rows={4}
            className="w-full rounded-xl border border-cyber-border bg-cyber-card px-4 py-3 font-mono text-sm text-gray-200 outline-none transition-all focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30"
          />
        </div>

        <button
          onClick={handleConvert}
          disabled={!input.trim()}
          className="rounded-xl bg-neon-cyan/15 px-6 py-2.5 font-mono text-sm font-bold text-neon-cyan transition-all hover:bg-neon-cyan/25 disabled:opacity-40"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>

        {error && <p className="font-mono text-sm text-neon-red">{error}</p>}

        {output && (
          <ResultBox title={mode === 'encode' ? 'Base64 Output' : 'Decoded Text'} accent="blue" copyText={output}>
            <p className="break-all whitespace-pre-wrap">{output}</p>
          </ResultBox>
        )}
      </div>
    </div>
  );
}
