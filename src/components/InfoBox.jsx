export default function InfoBox({ title, children }) {
  return (
    <div className="rounded-xl border border-cyber-border bg-cyber-card/60 p-4 animate-fade-in-up">
      {title && (
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[.15em] text-gray-500">
          {title}
        </p>
      )}
      <div className="text-[13px] leading-relaxed text-gray-400">{children}</div>
    </div>
  );
}
