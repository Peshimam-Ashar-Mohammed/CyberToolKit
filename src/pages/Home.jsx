import ToolCard from '../components/ToolCard';
import CodeRain from '../components/CodeRain';
import TerminalText from '../components/TerminalText';

const categories = [
  {
    label: 'Analysis & Detection',
    tag: 'Analysis',
    description: 'Tools that inspect and analyze security risks in passwords, URLs, headers, and data.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    tools: [
      { icon: 'shield', title: 'Password Analyzer', description: 'Real-time password security scoring with entropy, crack time, and pattern detection.', path: '/password-analyzer', accentColor: 'neon-green', tag: 'Analysis' },
      { icon: 'globe', title: 'URL Analyzer', description: 'Detect phishing indicators, domain spoofing, and protocol risks in any URL.', path: '/url-analyzer', accentColor: 'neon-purple', tag: 'Analysis' },
      { icon: 'server', title: 'Header Analyzer', description: 'Check HTTP response headers against security best practices and get a grade.', path: '/header-analyzer', accentColor: 'neon-blue', tag: 'Analysis' },
      { icon: 'calculator', title: 'Entropy Calculator', description: 'Measure Shannon entropy and estimate brute-force crack times for any string.', path: '/entropy-calculator', accentColor: 'neon-yellow', tag: 'Analysis' },
    ],
  },
  {
    label: 'Encoding & Decoding',
    tag: 'Encoding',
    description: 'Tools for encoding, hashing, and token inspection -- work with Base64, JWTs, hashes, and more.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    tools: [
      { icon: 'key', title: 'JWT Decoder', description: 'Decode and inspect JSON Web Tokens -- header, payload, signature, and expiry.', path: '/jwt-decoder', accentColor: 'neon-blue', tag: 'Encoding' },
      { icon: 'code', title: 'Base64 Tool', description: 'Encode text to Base64 or decode Base64 back to plaintext with UTF-8 support.', path: '/base64-tool', accentColor: 'neon-cyan', tag: 'Encoding' },
      { icon: 'hash', title: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any input text.', path: '/hash-generator', accentColor: 'neon-orange', tag: 'Encoding' },
      { icon: 'bugAnt', title: 'XSS Encoder', description: 'Encode payloads for safe HTML/JS output and detect XSS patterns in input.', path: '/xss-encoder', accentColor: 'neon-red', tag: 'Encoding' },
    ],
  },
  {
    label: 'Generators',
    tag: 'Generator',
    description: 'Tools that generate passwords, strings, or wordlists using cryptographically secure randomness.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    tools: [
      { icon: 'sparkles', title: 'Password Generator', description: 'Create cryptographically secure passwords with customizable length and rules.', path: '/password-generator', accentColor: 'neon-pink', tag: 'Generator' },
      { icon: 'list', title: 'Wordlist Generator', description: 'Build targeted password guessing lists from personal info -- for education.', path: '/wordlist-generator', accentColor: 'neon-red', tag: 'Generator' },
      { icon: 'network', title: 'Subdomain Generator', description: 'Generate subdomain enumeration wordlists for reconnaissance and bug bounty.', path: '/subdomain-generator', accentColor: 'neon-purple', tag: 'Generator' },
      { icon: 'sparkles', title: 'Random Strings', description: 'Generate cryptographically random strings for tokens, keys, and nonces.', path: '/random-string', accentColor: 'neon-green', tag: 'Generator' },
    ],
  },
];

const TERMINAL_LINES = [
  '$ initializing CyberToolkit v1.0.0 ...',
  '> 12 security modules loaded',
  '> crypto.subtle API ... available',
  '> all processing runs in-browser',
  '> no data leaves your machine',
  '$ ready _',
];

const FEATURES = [
  { label: 'Privacy First', detail: 'Every tool runs entirely in your browser. Nothing is sent to a server.', dot: 'bg-neon-green' },
  { label: 'Open & Inspectable', detail: 'All logic lives in client-side JavaScript you can read and audit.', dot: 'bg-neon-blue' },
  { label: 'Crypto-Grade RNG', detail: 'Generators use crypto.getRandomValues() for real randomness.', dot: 'bg-neon-purple' },
];

const STATUS_LINES = [
  { key: 'crypto.subtle', value: 'available', ok: true },
  { key: 'Security modules', value: '12 loaded', ok: true },
  { key: 'Processing', value: 'in-browser only', ok: true },
  { key: 'Data exfiltration', value: 'none', ok: true },
  { key: 'Server dependency', value: 'none', ok: true },
];

const CYBER_FACTS = [
  'Over 80% of data breaches involve compromised passwords.',
  'The average cost of a data breach in 2024 was $4.88 million.',
  'A 12-character password with mixed characters takes centuries to brute force.',
  'Base64 is encoding, not encryption -- it provides zero confidentiality.',
  'JWTs are signed, not encrypted. Anyone can read the payload.',
  'HTTP headers like Content-Security-Policy block whole classes of XSS attacks.',
  'Shannon entropy measures true randomness in bits per character.',
];

export default function Home() {
  const randomFact = CYBER_FACTS[Math.floor(Math.random() * CYBER_FACTS.length)];

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      <CodeRain columnCount={14} />

      {/* ===== HERO ===== */}
      <div className="relative z-10 mb-20 text-center animate-fade-in-up">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon-green/20 bg-neon-green/5 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-neon-green animate-pulse-glow" />
          <span className="font-mono text-xs font-medium text-neon-green">SYSTEM ONLINE</span>
        </div>
        <h1 className="mb-5 font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Cyber<span className="text-neon-green text-glow-green">Toolkit</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
          A browser-based security workbench for developers and researchers.
          Analyze, encode, and generate&nbsp;&mdash;&nbsp;all client-side, zero server dependencies.
        </p>

        {/* Feature pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex items-start gap-3 rounded-xl border border-cyber-border bg-cyber-card/60 px-5 py-3.5 text-left backdrop-blur max-w-xs">
              <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${f.dot}`} />
              <div>
                <p className="font-mono text-sm font-semibold text-gray-200">{f.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{f.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal + Status side-by-side on desktop */}
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {/* Terminal animation */}
          <div className="rounded-xl border border-cyber-border bg-cyber-darker/80 p-4 text-left backdrop-blur">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-neon-red/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-neon-yellow/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-neon-green/60" />
              <span className="ml-auto font-mono text-[10px] text-gray-600">terminal</span>
            </div>
            <TerminalText lines={TERMINAL_LINES} speed={25} />
          </div>

          {/* System status panel */}
          <div className="rounded-xl border border-cyber-border bg-cyber-darker/80 p-4 text-left backdrop-blur">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-neon-green/60" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500">System Status</span>
            </div>
            <div className="space-y-1.5">
              {STATUS_LINES.map((s) => (
                <div key={s.key} className="flex items-center justify-between font-mono text-xs">
                  <span className="text-gray-500">{s.key}</span>
                  <span className={s.ok ? 'text-neon-green' : 'text-neon-red'}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== QUICK STATS BAR ===== */}
      <div className="relative z-10 mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { n: '12', label: 'Security Tools', color: 'text-neon-green' },
          { n: '0', label: 'Server Calls', color: 'text-neon-blue' },
          { n: '100%', label: 'Client-Side', color: 'text-neon-purple' },
          { n: '0 B', label: 'Data Sent', color: 'text-neon-cyan' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-cyber-border bg-cyber-card/50 px-4 py-4 text-center backdrop-blur">
            <p className={`font-mono text-2xl font-bold ${s.color}`}>{s.n}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ===== TOOL CATEGORIES ===== */}
      <div className="relative z-10 space-y-20">
        {categories.map((cat, catIdx) => (
          <section key={cat.label} className="animate-fade-in-up" style={{ animationDelay: `${catIdx * 0.1}s` }}>
            {/* Category header */}
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyber-border bg-cyber-card text-gray-400">
                {cat.icon}
              </div>
              <div>
                <h2 className="font-mono text-lg font-bold text-gray-100">{cat.label}</h2>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">{cat.description}</p>
              </div>
            </div>
            {/* Tool grid */}
            <div className="grid gap-5 stagger-children sm:grid-cols-2 xl:grid-cols-4">
              {cat.tools.map((tool) => (
                <ToolCard key={tool.path} {...tool} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ===== DID YOU KNOW? ===== */}
      <div className="relative z-10 mx-auto mt-20 max-w-2xl rounded-xl border border-neon-blue/15 bg-neon-blue/5 px-6 py-5">
        <div className="flex items-start gap-3">
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-neon-blue">Did you know?</p>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{randomFact}</p>
          </div>
        </div>
      </div>

      {/* ===== ABOUT / WHY CLIENT-SIDE ===== */}
      <div className="relative z-10 mx-auto mt-12 max-w-3xl">
        <h3 className="mb-5 text-center font-mono text-xs font-bold uppercase tracking-[.2em] text-gray-500">Why Client-Side Security Tools?</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: 'Zero Trust Required', body: 'Your data never leaves the browser tab. There is no server to trust, compromise, or subpoena.' },
            { title: 'Instant & Offline', body: 'Every tool works offline after the initial load. No network latency, no API rate limits.' },
            { title: 'Fully Auditable', body: 'Open the DevTools and read every line. No minified backend, no hidden telemetry.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-cyber-border bg-cyber-card/40 p-5">
              <p className="mb-2 font-mono text-sm font-semibold text-gray-200">{item.title}</p>
              <p className="text-xs leading-relaxed text-gray-500">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 mt-24 border-t border-cyber-border pt-8 pb-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="font-mono text-sm font-bold text-gray-300">CyberToolkit</span>
          </div>
          <p className="font-mono text-[11px] text-gray-600 text-center sm:text-right">
            100% client-side &middot; No cookies &middot; No tracking &middot; No data stored
          </p>
        </div>
        <p className="mt-4 text-center font-mono text-[10px] text-gray-700">
          Built for developers who take security seriously.
        </p>
      </footer>
    </div>
  );
}
