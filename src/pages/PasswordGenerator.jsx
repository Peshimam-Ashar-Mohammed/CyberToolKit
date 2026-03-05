import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';
import ResultBox from '../components/ResultBox';
import { generatePassword, getPasswordStrengthQuick } from '../utils/passwordGenUtils';

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);

  const toggle = (key) => setOptions((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleGenerate = () => {
    const pw = generatePassword(length, options);
    setPassword(pw);
    setStrength(getPasswordStrengthQuick(pw));
  };

  const strengthColors = { Weak: 'text-neon-red', Fair: 'text-neon-yellow', Strong: 'text-neon-blue', 'Very Strong': 'text-neon-green' };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        icon="sparkles"
        title="Password Generator"
        subtitle="Generate cryptographically secure random passwords with custom rules."
        accentColor="neon-pink"
      />

      <div className="space-y-5">
        <InfoBox title="Why use generated passwords?">
          Human-chosen passwords follow predictable patterns that attackers exploit with
          dictionary attacks. A randomly generated 20-character password with mixed
          character sets provides roughly <span className="text-neon-pink">130 bits of entropy</span>,
          making brute-force attacks infeasible even with the fastest hardware.
        </InfoBox>

        <div>
          <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
            Length: {length}
          </label>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-neon-pink"
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-gray-600">
            <span>4</span><span>64</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {Object.entries(options).map(([key, val]) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`rounded-lg px-3.5 py-2 font-mono text-xs font-bold capitalize transition-all ${
                val ? 'bg-neon-pink/15 text-neon-pink' : 'bg-white/5 text-gray-600 hover:text-gray-400'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          className="rounded-xl bg-neon-pink/15 px-6 py-2.5 font-mono text-sm font-bold text-neon-pink transition-all hover:bg-neon-pink/25"
        >
          Generate Password
        </button>

        {password && (
          <ResultBox title="Generated Password" accent="purple" copyText={password}>
            <p className="break-all text-base tracking-wide">{password}</p>
            {strength && (
              <p className={`mt-2 text-xs ${strengthColors[strength.label] || 'text-gray-400'}`}>
                Strength: {strength.label} ({strength.score}/100)
              </p>
            )}
          </ResultBox>
        )}
      </div>
    </div>
  );
}
