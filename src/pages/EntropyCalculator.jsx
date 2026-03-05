import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';
import ResultBox from '../components/ResultBox';
import { calculateEntropy } from '../utils/entropyUtils';

export default function EntropyCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleCalc = () => {
    if (!input) return;
    setResult(calculateEntropy(input));
  };

  const strengthColors = { 'Very Weak': 'text-neon-red', Weak: 'text-neon-orange', Fair: 'text-neon-yellow', Strong: 'text-neon-blue', 'Very Strong': 'text-neon-green' };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        icon="calculator"
        title="Entropy Calculator"
        subtitle="Measure the information entropy and theoretical crack time of any string."
        accentColor="neon-yellow"
      />

      <div className="space-y-5">
        <InfoBox title="Understanding entropy">
          Shannon entropy measures unpredictability in bits. A password with 80+ bits of
          entropy is considered strong against offline attacks. Entropy depends on both
          charset size and length: <span className="text-neon-yellow">E = L * log2(N)</span> where
          L is length and N is the size of the character pool used.
        </InfoBox>

        <div>
          <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
            Input String
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a password or string..."
            className="w-full rounded-xl border border-cyber-border bg-cyber-card px-4 py-3 font-mono text-sm text-gray-200 outline-none transition-all focus:border-neon-yellow/50 focus:ring-1 focus:ring-neon-yellow/30"
          />
        </div>

        <button
          onClick={handleCalc}
          disabled={!input}
          className="rounded-xl bg-neon-yellow/15 px-6 py-2.5 font-mono text-sm font-bold text-neon-yellow transition-all hover:bg-neon-yellow/25 disabled:opacity-40"
        >
          Calculate Entropy
        </button>

        {result && (
          <div className="space-y-3 animate-fade-in-up">
            <ResultBox title="Entropy" accent="yellow">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-neon-yellow">{result.entropy.toFixed(2)}</span>
                <span className="text-sm text-gray-500">bits</span>
                <span className={`ml-auto text-sm font-bold ${strengthColors[result.strength] || 'text-gray-400'}`}>{result.strength}</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-neon-yellow transition-all duration-500"
                  style={{ width: `${Math.min(100, (result.entropy / 128) * 100)}%` }}
                />
              </div>
            </ResultBox>

            <ResultBox title="Details" accent="yellow">
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <span className="text-gray-500">Length</span>
                <span className="text-right text-gray-300">{result.length}</span>
                <span className="text-gray-500">Charset Size</span>
                <span className="text-right text-gray-300">{result.charsetSize}</span>
                <span className="text-gray-500">Unique Characters</span>
                <span className="text-right text-gray-300">{result.uniqueChars}</span>
              </div>
            </ResultBox>

            <ResultBox title="Crack Time Estimates" accent="yellow">
              <div className="space-y-2 text-xs">
                {result.crackTimes.map((ct) => (
                  <div key={ct.scenario} className="flex items-center justify-between">
                    <span className="text-gray-500">{ct.scenario}</span>
                    <span className="font-bold text-gray-300">{ct.time}</span>
                  </div>
                ))}
              </div>
            </ResultBox>
          </div>
        )}
      </div>
    </div>
  );
}
