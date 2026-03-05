import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';
import ResultBox from '../components/ResultBox';
import { generateSubdomains } from '../utils/subdomainUtils';

export default function SubdomainGenerator() {
  const [domain, setDomain] = useState('');
  const [size, setSize] = useState('medium');
  const [results, setResults] = useState(null);

  const handleGenerate = () => {
    if (!domain.trim()) return;
    setResults(generateSubdomains(domain.trim(), size));
  };

  const handleDownload = () => {
    if (!results) return;
    const blob = new Blob([results.list.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subdomains-${domain.replace(/[^a-z0-9]/gi, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <PageHeader
        icon="network"
        title="Subdomain Wordlist Generator"
        subtitle="Generate targeted subdomain enumeration lists for reconnaissance."
        accentColor="neon-purple"
      />

      <div className="space-y-5">
        <InfoBox title="Subdomain enumeration">
          Discovering subdomains reveals an organization's attack surface. Bug bounty hunters
          and penetration testers use wordlists with tools like <span className="text-neon-purple">ffuf</span>,
          Gobuster, or Amass. Common patterns include api, dev, staging, admin, and
          service-specific prefixes. Always ensure you have authorization before scanning.
        </InfoBox>

        <div>
          <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
            Target Domain
          </label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="w-full rounded-xl border border-cyber-border bg-cyber-card px-4 py-3 font-mono text-sm text-gray-200 outline-none transition-all focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
            Wordlist Size
          </label>
          <div className="flex gap-2">
            {['small', 'medium', 'large'].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-lg px-4 py-2 font-mono text-xs font-bold capitalize transition-all ${
                  size === s ? 'bg-neon-purple/15 text-neon-purple' : 'bg-white/5 text-gray-500 hover:text-gray-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!domain.trim()}
          className="rounded-xl bg-neon-purple/15 px-6 py-2.5 font-mono text-sm font-bold text-neon-purple transition-all hover:bg-neon-purple/25 disabled:opacity-40"
        >
          Generate Wordlist
        </button>

        {results && (
          <div className="animate-fade-in-up">
            <ResultBox title={`${results.count} subdomains generated`} accent="purple" copyText={results.list.join('\n')}>
              <div className="mb-3 flex gap-2">
                <button
                  onClick={handleDownload}
                  className="rounded-md bg-white/5 px-3 py-1.5 font-mono text-xs text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                >
                  Download .txt
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto no-scrollbar">
                <pre className="whitespace-pre-wrap text-xs">{results.list.slice(0, 80).join('\n')}{results.list.length > 80 ? `\n... and ${results.list.length - 80} more` : ''}</pre>
              </div>
            </ResultBox>
          </div>
        )}
      </div>
    </div>
  );
}
