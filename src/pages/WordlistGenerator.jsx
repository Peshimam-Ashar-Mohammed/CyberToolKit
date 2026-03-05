import { useState } from 'react';
import { generateWordlist } from '../utils/wordlistUtils';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';

export default function WordlistGenerator() {
  const [inputs, setInputs] = useState({ name: '', nickname: '', birthYear: '', keyword: '' });
  const [size, setSize] = useState('medium');
  const [wordlist, setWordlist] = useState([]);

  const handleChange = (field) => (e) => {
    setInputs((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleGenerate = () => {
    const list = generateWordlist({ ...inputs, size });
    setWordlist(list);
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(wordlist.join('\n')); } catch { /* */ }
  };

  const handleDownload = () => {
    const blob = new Blob([wordlist.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wordlist.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasInput = Object.values(inputs).some((v) => v.trim());

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        icon="list"
        title="Password Wordlist Generator"
        subtitle="Demonstrate targeted password guessing techniques based on personal information."
        accentColor="neon-red"
      />

      <div className="space-y-5">
        <InfoBox title="How targeted attacks work">
          Attackers gather personal details from social media &mdash; names, birthdays,
          pets, hobbies &mdash; and combine them into candidate passwords. Tools like
          <span className="text-neon-red"> CUPP</span> and Mentalist automate this process.
          Understanding how these wordlists are built teaches you which personal details
          to keep off your passwords.
        </InfoBox>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 rounded-xl border border-neon-yellow/20 bg-neon-yellow/5 p-4">
          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-neon-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="font-mono text-sm font-bold text-neon-yellow">Educational Purpose Only</p>
            <p className="text-xs text-yellow-300/70">This tool demonstrates how attackers create targeted wordlists. Use this knowledge to create stronger passwords.</p>
          </div>
        </div>

        {/* Size picker */}
        <div>
          <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
            Wordlist Size
          </label>
          <div className="flex gap-2">
            {[
              { key: 'small', desc: 'Quick, ~50-150' },
              { key: 'medium', desc: 'Balanced, ~200-400' },
              { key: 'large', desc: 'Thorough, ~500+' },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => setSize(s.key)}
                className={`flex-1 rounded-lg px-3 py-2.5 text-center font-mono transition-all ${
                  size === s.key
                    ? 'bg-neon-red/15 text-neon-red'
                    : 'bg-white/5 text-gray-500 hover:text-gray-300'
                }`}
              >
                <span className="block text-xs font-bold capitalize">{s.key}</span>
                <span className="block text-[10px] text-gray-600">{s.desc}</span>
              </button>
            ))}
          </div>
        </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { field: 'name', label: 'Name', placeholder: 'e.g., ashar' },
          { field: 'nickname', label: 'Nickname', placeholder: 'e.g., ash' },
          { field: 'birthYear', label: 'Birth Year', placeholder: 'e.g., 2006' },
          { field: 'keyword', label: 'Keyword', placeholder: 'e.g., hacker' },
        ].map(({ field, label, placeholder }) => (
          <div key={field}>
            <label className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-widest text-gray-500">
              {label}
            </label>
            <input
              type="text"
              value={inputs[field]}
              onChange={handleChange(field)}
              placeholder={placeholder}
              className="w-full rounded-xl border border-cyber-border bg-cyber-card px-4 py-3 font-mono text-sm text-gray-200 outline-none transition-all focus:border-neon-red/50 focus:ring-1 focus:ring-neon-red/30"
              autoComplete="off"
            />
          </div>
        ))}
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!hasInput}
        className="inline-flex items-center gap-2 rounded-xl bg-neon-red/15 px-6 py-2.5 font-mono text-sm font-bold text-neon-red transition-all hover:bg-neon-red/25 disabled:opacity-40"
      >
        Generate Wordlist
      </button>

      {/* Results */}
      {wordlist.length > 0 && (
        <div className="animate-fade-in-up">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-xs text-gray-500">
              Generated <span className="font-bold text-neon-red">{wordlist.length}</span> passwords
            </p>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="rounded-lg bg-white/5 px-3 py-1.5 font-mono text-xs text-gray-400 transition-all hover:bg-white/10 hover:text-white">Copy All</button>
              <button onClick={handleDownload} className="rounded-lg bg-white/5 px-3 py-1.5 font-mono text-xs text-gray-400 transition-all hover:bg-white/10 hover:text-white">Download .txt</button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto rounded-xl border border-neon-red/20 bg-cyber-card p-4 no-scrollbar">
            <pre className="font-mono text-sm leading-relaxed text-gray-300">{wordlist.join('\n')}</pre>
          </div>
        </div>
      )}

      {/* Empty state */}
      {wordlist.length === 0 && (
        <div className="mt-12 text-center animate-fade-in-up">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyber-card">
            <svg className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
          </div>
          <p className="font-mono text-sm text-gray-600">Enter personal details and generate a wordlist</p>
        </div>
      )}
      </div>
    </div>
  );
}
