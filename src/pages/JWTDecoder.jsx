import { useState } from 'react';
import { decodeJWT, formatJSON } from '../utils/jwtUtils';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';
import ResultBox from '../components/ResultBox';

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export default function JWTDecoder() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState(null);

  const handleDecode = () => {
    if (!token.trim()) return;
    setResult(decodeJWT(token));
  };

  const loadSample = () => {
    setToken(SAMPLE_JWT);
    setResult(decodeJWT(SAMPLE_JWT));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <PageHeader
        icon="key"
        title="JWT Token Decoder"
        subtitle="Decode and inspect JSON Web Tokens without sending them to a server."
        accentColor="neon-blue"
      />

      <div className="space-y-5">
        <InfoBox title="What is a JWT?">
          A JSON Web Token has three Base64-encoded parts: header, payload, and signature.
          The header declares the algorithm. The payload contains claims like user ID and
          expiry. The signature ensures integrity. JWTs are <span className="text-neon-blue">not
          encrypted</span> by default &mdash; anyone can read the payload. Never store
          secrets in the payload without JWE encryption.
        </InfoBox>
        <div className="mb-2 flex items-center justify-between">
          <label className="font-mono text-xs font-medium uppercase tracking-widest text-gray-500">
            Paste JWT Token
          </label>
          <button
            onClick={loadSample}
            className="font-mono text-xs text-neon-blue/70 transition-colors hover:text-neon-blue"
          >
            Load sample token
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          rows={4}
          className="cyber-input w-full resize-none rounded-xl px-4 py-3.5 font-mono text-sm"
          spellCheck={false}
        />
        <button
          onClick={handleDecode}
          disabled={!token.trim()}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-neon-blue/10 px-6 py-2.5 font-mono text-sm font-medium text-neon-blue transition-all hover:bg-neon-blue/20 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          Decode Token
        </button>

      {/* Results */}
      {result && !result.error && (
        <div className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {/* Expiration warning */}
          {result.isExpired && (
            <div className="flex items-center gap-3 rounded-xl border border-neon-red/20 bg-neon-red/5 p-4">
              <svg className="h-5 w-5 flex-shrink-0 text-neon-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="font-mono text-sm font-bold text-neon-red">Token Expired</p>
                <p className="text-xs text-red-300">
                  Expired on {result.expirationDate?.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {result.expirationDate && !result.isExpired && (
            <div className="flex items-center gap-3 rounded-xl border border-neon-green/20 bg-neon-green/5 p-4">
              <svg className="h-5 w-5 flex-shrink-0 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-mono text-sm font-bold text-neon-green">Token Valid</p>
                <p className="text-xs text-green-300">
                  Expires on {result.expirationDate?.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {/* Token meta */}
          {result.issuedAt && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-cyber-border bg-cyber-card p-4">
                <p className="mb-1 font-mono text-xs text-gray-500">Algorithm</p>
                <p className="font-mono text-lg font-bold text-neon-blue">{result.header.alg || 'N/A'}</p>
              </div>
              <div className="rounded-xl border border-cyber-border bg-cyber-card p-4">
                <p className="mb-1 font-mono text-xs text-gray-500">Type</p>
                <p className="font-mono text-lg font-bold text-neon-purple">{result.header.typ || 'N/A'}</p>
              </div>
            </div>
          )}

          {/* Header */}
          <ResultBox title="Header" accent="blue" copyText={formatJSON(result.header)}>
            <pre className="overflow-x-auto whitespace-pre text-neon-blue/80">{formatJSON(result.header)}</pre>
          </ResultBox>

          {/* Payload */}
          <ResultBox title="Payload" accent="green" copyText={formatJSON(result.payload)}>
            <pre className="overflow-x-auto whitespace-pre text-neon-green/80">{formatJSON(result.payload)}</pre>
          </ResultBox>

          {/* Signature */}
          <ResultBox title="Signature" accent="purple" copyText={result.signature}>
            <p className="break-all text-neon-purple/80">{result.signature}</p>
          </ResultBox>
        </div>
      )}

      {/* Error */}
      {result?.error && (
        <div className="flex items-center gap-3 rounded-xl border border-neon-red/20 bg-neon-red/5 p-4 animate-fade-in-up">
          <svg className="h-5 w-5 flex-shrink-0 text-neon-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="font-mono text-sm text-red-300">{result.error}</p>
        </div>
      )}

      {/* Empty state */}
      {!result && (
        <div className="mt-12 text-center animate-fade-in-up">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyber-card">
            <svg className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          </div>
          <p className="font-mono text-sm text-gray-600">Paste a JWT token and click decode to inspect it</p>
        </div>
      )}
      </div>
    </div>
  );
}
