import { Link } from 'react-router-dom';
import { ICON_MAP } from './PageHeader';

const colorMap = {
  'neon-green': { bg: 'bg-neon-green/10', text: 'text-neon-green', border: 'hover:border-neon-green/30', glow: 'group-hover:glow-green', btn: 'bg-neon-green/10 text-neon-green hover:bg-neon-green/20', tag: 'border-neon-green/20 text-neon-green/70' },
  'neon-blue': { bg: 'bg-neon-blue/10', text: 'text-neon-blue', border: 'hover:border-neon-blue/30', glow: 'group-hover:glow-blue', btn: 'bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20', tag: 'border-neon-blue/20 text-neon-blue/70' },
  'neon-purple': { bg: 'bg-neon-purple/10', text: 'text-neon-purple', border: 'hover:border-neon-purple/30', glow: 'group-hover:glow-purple', btn: 'bg-neon-purple/10 text-neon-purple hover:bg-neon-purple/20', tag: 'border-neon-purple/20 text-neon-purple/70' },
  'neon-red': { bg: 'bg-neon-red/10', text: 'text-neon-red', border: 'hover:border-neon-red/30', glow: 'group-hover:glow-red', btn: 'bg-neon-red/10 text-neon-red hover:bg-neon-red/20', tag: 'border-neon-red/20 text-neon-red/70' },
  'neon-yellow': { bg: 'bg-neon-yellow/10', text: 'text-neon-yellow', border: 'hover:border-neon-yellow/30', glow: 'group-hover:glow-green', btn: 'bg-neon-yellow/10 text-neon-yellow hover:bg-neon-yellow/20', tag: 'border-neon-yellow/20 text-neon-yellow/70' },
  'neon-orange': { bg: 'bg-neon-orange/10', text: 'text-neon-orange', border: 'hover:border-neon-orange/30', glow: 'group-hover:glow-green', btn: 'bg-neon-orange/10 text-neon-orange hover:bg-neon-orange/20', tag: 'border-neon-orange/20 text-neon-orange/70' },
  'neon-cyan': { bg: 'bg-neon-cyan/10', text: 'text-neon-cyan', border: 'hover:border-neon-cyan/30', glow: 'group-hover:glow-blue', btn: 'bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20', tag: 'border-neon-cyan/20 text-neon-cyan/70' },
  'neon-pink': { bg: 'bg-neon-pink/10', text: 'text-neon-pink', border: 'hover:border-neon-pink/30', glow: 'group-hover:glow-purple', btn: 'bg-neon-pink/10 text-neon-pink hover:bg-neon-pink/20', tag: 'border-neon-pink/20 text-neon-pink/70' },
};

export default function ToolCard({ icon, title, description, path, accentColor = 'neon-green', tag }) {
  const colors = colorMap[accentColor] || colorMap['neon-green'];
  const svgIcon = ICON_MAP[icon];

  return (
    <Link
      to={path}
      className={`group card-hover flex min-h-[240px] flex-col rounded-2xl border border-cyber-border bg-cyber-card p-6 transition-all duration-300 ${colors.border}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.glow} transition-all duration-300`}>
          <span className={`${colors.text}`}>{svgIcon || ICON_MAP.shield}</span>
        </div>
        {tag && (
          <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${colors.tag}`}>
            {tag}
          </span>
        )}
      </div>
      <h3 className="mb-2 font-mono text-lg font-bold text-gray-100">{title}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400">{description}</p>
      <div className={`inline-flex items-center gap-2 self-start rounded-lg px-4 py-2 font-mono text-sm font-medium transition-all duration-200 ${colors.btn}`}>
        Launch Tool
        <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </Link>
  );
}
