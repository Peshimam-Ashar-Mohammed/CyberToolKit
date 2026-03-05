import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';
import ResultBox from '../components/ResultBox';
import { generateHashes } from '../utils/hashUtils';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await generateHashes(input);
    setHashes(result);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        icon="hash"
        title="Hash Generator"
        subtitle="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any input string."
        accentColor="neon-orange"
      />

      <div className="space-y-5">
        <InfoBox title="How it works">
          Cryptographic hash functions produce a fixed-size digest from arbitrary input.
          Even a single character change creates a completely different output -- this is
          called the <span className="text-neon-orange">avalanche effect</span>. Hashes
          are one-way: you can't reverse them to recover the original input.
          They're used for password storage, data integrity, and digital signatures.
        </InfoBox>

        <div>
          <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
            Input Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            rows={3}
            className="w-full rounded-xl border border-cyber-border bg-cyber-card px-4 py-3 font-mono text-sm text-gray-200 outline-none transition-all focus:border-neon-orange/50 focus:ring-1 focus:ring-neon-orange/30"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !input.trim()}
          className="rounded-xl bg-neon-orange/15 px-6 py-2.5 font-mono text-sm font-bold text-neon-orange transition-all hover:bg-neon-orange/25 disabled:opacity-40"
        >
          {loading ? 'Hashing...' : 'Generate Hashes'}
        </button>

        {hashes && (
          <div className="space-y-3 animate-fade-in-up">
            {Object.entries(hashes).map(([algo, value]) => (
              <ResultBox key={algo} title={algo} accent="yellow" copyText={value}>
                <p className="break-all">{value}</p>
              </ResultBox>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
