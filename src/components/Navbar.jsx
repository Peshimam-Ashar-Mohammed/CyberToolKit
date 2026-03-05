import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const toolGroups = [
  {
    label: 'Analysis',
    items: [
      { path: '/password-analyzer', label: 'Password Analyzer' },
      { path: '/url-analyzer', label: 'URL Analyzer' },
      { path: '/header-analyzer', label: 'Header Analyzer' },
      { path: '/entropy-calculator', label: 'Entropy Calculator' },
    ],
  },
  {
    label: 'Encoding',
    items: [
      { path: '/jwt-decoder', label: 'JWT Decoder' },
      { path: '/base64-tool', label: 'Base64 Tool' },
      { path: '/hash-generator', label: 'Hash Generator' },
      { path: '/xss-encoder', label: 'XSS Encoder' },
    ],
  },
  {
    label: 'Generators',
    items: [
      { path: '/password-generator', label: 'Password Generator' },
      { path: '/wordlist-generator', label: 'Wordlist Generator' },
      { path: '/subdomain-generator', label: 'Subdomain Generator' },
      { path: '/random-string', label: 'Random String' },
    ],
  },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setToolsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isToolActive = toolGroups.some((g) => g.items.some((i) => i.path === location.pathname));

  return (
    <nav className="sticky top-0 z-50 border-b border-cyber-border bg-cyber-darker/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon-green/10 transition-all duration-300 group-hover:bg-neon-green/20 group-hover:glow-green">
            <svg className="h-5 w-5 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="font-mono text-lg font-bold tracking-wider text-neon-green text-glow-green">
            CyberToolkit
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className={`rounded-lg px-3.5 py-2 font-mono text-sm transition-all duration-200 ${
              location.pathname === '/' ? 'bg-neon-green/10 text-neon-green text-glow-green' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/learn"
            className={`rounded-lg px-3.5 py-2 font-mono text-sm transition-all duration-200 ${
              location.pathname === '/learn' ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            Learn
          </Link>

          {/* Tools dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setToolsOpen((o) => !o)}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 font-mono text-sm transition-all duration-200 ${
                isToolActive ? 'bg-neon-green/10 text-neon-green text-glow-green' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              Tools
              <svg className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {toolsOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 origin-top-right animate-scale-in rounded-xl border border-cyber-border bg-cyber-darker/95 p-3 shadow-2xl backdrop-blur-xl">
                {toolGroups.map((group) => (
                  <div key={group.label} className="mb-2 last:mb-0">
                    <p className="mb-1 px-2 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-gray-600">{group.label}</p>
                    {group.items.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setToolsOpen(false)}
                          className={`block rounded-lg px-2.5 py-1.5 font-mono text-xs transition-all ${
                            isActive ? 'bg-neon-green/10 text-neon-green' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="max-h-[75vh] overflow-y-auto border-t border-cyber-border px-4 pb-4 md:hidden">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`block rounded-lg px-3 py-2.5 font-mono text-sm transition-all ${
              location.pathname === '/' ? 'bg-neon-green/10 text-neon-green' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/learn"
            onClick={() => setMobileOpen(false)}
            className={`block rounded-lg px-3 py-2.5 font-mono text-sm transition-all ${
              location.pathname === '/learn' ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            Learn
          </Link>
          {toolGroups.map((group) => (
            <div key={group.label} className="mt-3">
              <p className="px-3 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-gray-600">{group.label}</p>
              {group.items.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-3 py-2 font-mono text-sm transition-all ${
                      isActive ? 'bg-neon-green/10 text-neon-green' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
