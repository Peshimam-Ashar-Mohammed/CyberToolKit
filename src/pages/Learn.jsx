import { useState } from 'react';
import CodeRain from '../components/CodeRain';

/* ── Section 1: YouTube Videos ── */
const VIDEOS = [
  {
    id: 'lnKDhR4O9Lc',
    title: 'How Hackers Actually Hack',
    description: 'An overview of common techniques hackers use to compromise systems.',
  },
  {
    id: 'hqKafI7Amd8',
    title: 'Web Security Basics',
    description: 'A beginner-friendly guide to securing web applications.',
  },
  {
    id: 'EoaDgUgS6QA',
    title: 'What is XSS?',
    description: 'Cross-site scripting explained with real-world examples.',
  },
  {
    id: 'ciNHn38EyRc',
    title: 'SQL Injection Explained',
    description: 'How SQL injection works and how to prevent it.',
  },
];

/* ── Section 2: Practice Labs ── */
const LABS = [
  {
    name: 'PortSwigger Web Security Academy',
    description: 'Hands-on labs for learning web vulnerabilities like XSS, SQL injection, CSRF, and authentication flaws.',
    url: 'https://portswigger.net/web-security',
    color: 'neon-orange',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    name: 'OverTheWire',
    description: 'Beginner-friendly wargames teaching Linux and security basics through terminal challenges.',
    url: 'https://overthewire.org/wargames/',
    color: 'neon-green',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    name: 'TryHackMe',
    description: 'Interactive cybersecurity training platform with guided labs and attack simulations.',
    url: 'https://tryhackme.com/',
    color: 'neon-red',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    name: 'Hack The Box',
    description: 'Advanced hacking labs and penetration testing challenges for aspiring security professionals.',
    url: 'https://www.hackthebox.com/',
    color: 'neon-cyan',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
];

/* ── Section 3: Security Concepts ── */
const CONCEPTS = [
  {
    title: 'Cross-Site Scripting (XSS)',
    description: 'A vulnerability where attackers inject malicious scripts into websites viewed by other users.',
    url: 'https://owasp.org/www-community/attacks/xss/',
    color: 'neon-red',
  },
  {
    title: 'SQL Injection',
    description: 'A vulnerability allowing attackers to manipulate database queries through unsanitized user input.',
    url: 'https://owasp.org/www-community/attacks/SQL_Injection',
    color: 'neon-orange',
  },
  {
    title: 'JWT Authentication',
    description: 'A token-based authentication method used in modern web applications for stateless sessions.',
    url: 'https://jwt.io/introduction',
    color: 'neon-blue',
  },
  {
    title: 'Password Hashing',
    description: 'A cryptographic technique used to securely store passwords as irreversible digests.',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
    color: 'neon-green',
  },
];

/* ── Section 4: Recommended Websites ── */
const WEBSITES = [
  {
    name: 'OWASP',
    description: 'The Open Web Application Security Project provides guides, tools, and cheat sheets for web security.',
    url: 'https://owasp.org/',
    color: 'neon-purple',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    name: 'Kali Linux Tools',
    description: 'Collection of penetration testing tools used by security professionals worldwide.',
    url: 'https://www.kali.org/tools/',
    color: 'neon-blue',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.386a.75.75 0 010-1.264l5.1-3.386a.75.75 0 011.1.663v1.31a6 6 0 014.58 4.244.75.75 0 01-1.08.75 4.5 4.5 0 00-3.5-.344v1.413a.75.75 0 01-1.1.663z" />
      </svg>
    ),
  },
  {
    name: 'Bugcrowd University',
    description: 'Free training materials for bug bounty hunters covering recon, web hacking, and reporting.',
    url: 'https://www.bugcrowd.com/hackers/bugcrowd-university/',
    color: 'neon-yellow',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

/* ── Color helpers ── */
const colorClasses = {
  'neon-green':  { bg: 'bg-neon-green/10', text: 'text-neon-green', border: 'border-neon-green/20', hoverBorder: 'hover:border-neon-green/40', btn: 'bg-neon-green/10 text-neon-green hover:bg-neon-green/20' },
  'neon-blue':   { bg: 'bg-neon-blue/10', text: 'text-neon-blue', border: 'border-neon-blue/20', hoverBorder: 'hover:border-neon-blue/40', btn: 'bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20' },
  'neon-purple': { bg: 'bg-neon-purple/10', text: 'text-neon-purple', border: 'border-neon-purple/20', hoverBorder: 'hover:border-neon-purple/40', btn: 'bg-neon-purple/10 text-neon-purple hover:bg-neon-purple/20' },
  'neon-red':    { bg: 'bg-neon-red/10', text: 'text-neon-red', border: 'border-neon-red/20', hoverBorder: 'hover:border-neon-red/40', btn: 'bg-neon-red/10 text-neon-red hover:bg-neon-red/20' },
  'neon-yellow': { bg: 'bg-neon-yellow/10', text: 'text-neon-yellow', border: 'border-neon-yellow/20', hoverBorder: 'hover:border-neon-yellow/40', btn: 'bg-neon-yellow/10 text-neon-yellow hover:bg-neon-yellow/20' },
  'neon-orange': { bg: 'bg-neon-orange/10', text: 'text-neon-orange', border: 'border-neon-orange/20', hoverBorder: 'hover:border-neon-orange/40', btn: 'bg-neon-orange/10 text-neon-orange hover:bg-neon-orange/20' },
  'neon-cyan':   { bg: 'bg-neon-cyan/10', text: 'text-neon-cyan', border: 'border-neon-cyan/20', hoverBorder: 'hover:border-neon-cyan/40', btn: 'bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20' },
};

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="mb-8 flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyber-border bg-cyber-card text-gray-400">
        {icon}
      </div>
      <div>
        <h2 className="font-mono text-lg font-bold text-gray-100">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

function VideoCard({ id, title, description }) {
  const [playing, setPlaying] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${encodeURIComponent(id)}/mqdefault.jpg`;

  return (
    <div className="card-hover group overflow-hidden rounded-2xl border border-cyber-border bg-cyber-card transition-all duration-300 hover:border-neon-red/30">
      {/* Thumbnail / Embed */}
      <div className="relative aspect-video w-full bg-cyber-darker">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="no-referrer"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img src={thumbUrl} alt={title} className="h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
            <div className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-neon-red/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>
      <div className="p-5">
        <h3 className="mb-1.5 font-mono text-sm font-bold text-gray-100">{title}</h3>
        <p className="text-xs leading-relaxed text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function LabCard({ name, description, url, color, icon }) {
  const c = colorClasses[color] || colorClasses['neon-green'];
  return (
    <div className={`card-hover group flex flex-col rounded-2xl border border-cyber-border bg-cyber-card p-6 transition-all duration-300 ${c.hoverBorder}`}>
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${c.bg} ${c.text} transition-all duration-300`}>
        {icon}
      </div>
      <h3 className="mb-2 font-mono text-base font-bold text-gray-100">{name}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 self-start rounded-lg px-4 py-2 font-mono text-sm font-medium transition-all duration-200 ${c.btn}`}
      >
        Visit Platform
        <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </a>
    </div>
  );
}

function ConceptCard({ title, description, url, color }) {
  const c = colorClasses[color] || colorClasses['neon-green'];
  return (
    <div className={`card-hover group flex flex-col rounded-2xl border border-cyber-border bg-cyber-card p-6 transition-all duration-300 ${c.hoverBorder}`}>
      <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${c.bg}`}>
        <svg className={`h-4 w-4 ${c.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      </div>
      <h3 className="mb-2 font-mono text-base font-bold text-gray-100">{title}</h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-400">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-gray-500 transition-colors duration-200 hover:text-gray-300"
      >
        Learn more
        <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </div>
  );
}

function WebsiteCard({ name, description, url, color, icon }) {
  const c = colorClasses[color] || colorClasses['neon-green'];
  return (
    <div className={`card-hover group flex flex-col rounded-2xl border border-cyber-border bg-cyber-card p-6 transition-all duration-300 ${c.hoverBorder}`}>
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${c.bg} ${c.text} transition-all duration-300`}>
        {icon}
      </div>
      <h3 className="mb-2 font-mono text-base font-bold text-gray-100">{name}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 self-start rounded-lg px-4 py-2 font-mono text-sm font-medium transition-all duration-200 ${c.btn}`}
      >
        Visit Site
        <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </a>
    </div>
  );
}

/* ── Page ── */
export default function Learn() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      <CodeRain columnCount={10} />

      {/* Banner */}
      <div className="relative z-10 mb-10 rounded-xl border border-neon-purple/15 bg-neon-purple/5 px-6 py-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <svg className="h-5 w-5 shrink-0 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          <p className="font-mono text-sm text-gray-400">
            Learning cybersecurity is easier when you combine <span className="text-neon-purple">theory</span> with <span className="text-neon-green">practice</span>.
          </p>
        </div>
      </div>

      {/* Page title */}
      <div className="relative z-10 mb-16 animate-fade-in-up">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-1.5">
          <svg className="h-3.5 w-3.5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>
          <span className="font-mono text-xs font-medium text-neon-cyan">LEARN SECURITY</span>
        </div>
        <h1 className="mb-4 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Learn <span className="text-neon-cyan">Cybersecurity</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
          Curated learning resources to help you understand web security, cryptography, and ethical hacking.
        </p>
      </div>

      <div className="relative z-10 space-y-20">
        {/* ── Section 1: Videos ── */}
        <section className="animate-fade-in-up">
          <SectionHeader
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
              </svg>
            }
            title="Beginner Security Videos"
            subtitle="Watch these cybersecurity fundamentals to build your foundation."
          />
          <div className="grid gap-5 stagger-children sm:grid-cols-2 xl:grid-cols-4">
            {VIDEOS.map((v) => (
              <VideoCard key={v.id} {...v} />
            ))}
          </div>
        </section>

        {/* ── Section 2: Practice Labs ── */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <SectionHeader
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
            }
            title="Practice Labs"
            subtitle="Hands-on platforms where you can legally practice offensive and defensive security."
          />
          <div className="grid gap-5 stagger-children sm:grid-cols-2 xl:grid-cols-4">
            {LABS.map((lab) => (
              <LabCard key={lab.name} {...lab} />
            ))}
          </div>
        </section>

        {/* ── Section 3: Security Concepts ── */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <SectionHeader
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            }
            title="Security Concept Guides"
            subtitle="Quick explanations of common vulnerabilities and security topics."
          />
          <div className="grid gap-5 stagger-children sm:grid-cols-2 xl:grid-cols-4">
            {CONCEPTS.map((c) => (
              <ConceptCard key={c.title} {...c} />
            ))}
          </div>
        </section>

        {/* ── Section 4: Recommended Websites ── */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <SectionHeader
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            }
            title="Recommended Cybersecurity Websites"
            subtitle="Trusted resources to deepen your security knowledge."
          />
          <div className="grid gap-5 stagger-children sm:grid-cols-2 xl:grid-cols-3">
            {WEBSITES.map((w) => (
              <WebsiteCard key={w.name} {...w} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-24 border-t border-cyber-border pt-8 pb-4 text-center">
        <p className="font-mono text-[11px] text-gray-600">
          All external links open in a new tab. CyberToolkit is not affiliated with the platforms listed above.
        </p>
      </footer>
    </div>
  );
}
