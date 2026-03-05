const SECURITY_HEADERS = [
  {
    name: 'Content-Security-Policy',
    description: 'Controls which resources the browser is allowed to load. Prevents XSS and data injection attacks.',
    importance: 'critical',
  },
  {
    name: 'X-Frame-Options',
    description: 'Prevents the page from being embedded in iframes. Stops clickjacking attacks.',
    importance: 'high',
  },
  {
    name: 'X-Content-Type-Options',
    description: 'Prevents MIME-type sniffing. Should be set to "nosniff".',
    importance: 'high',
  },
  {
    name: 'Strict-Transport-Security',
    description: 'Forces browsers to use HTTPS. Prevents protocol downgrade attacks.',
    importance: 'critical',
  },
  {
    name: 'Referrer-Policy',
    description: 'Controls how much referrer information is sent with requests.',
    importance: 'medium',
  },
  {
    name: 'Permissions-Policy',
    description: 'Controls which browser features and APIs can be used (camera, mic, geolocation, etc).',
    importance: 'medium',
  },
  {
    name: 'X-XSS-Protection',
    description: 'Legacy XSS filter. Modern browsers rely on CSP instead, but still useful as a fallback.',
    importance: 'low',
  },
  {
    name: 'Cross-Origin-Opener-Policy',
    description: 'Isolates the browsing context. Prevents cross-origin attacks like Spectre.',
    importance: 'medium',
  },
  {
    name: 'Cross-Origin-Resource-Policy',
    description: 'Blocks cross-origin reads of resources. Helps prevent data leaks.',
    importance: 'medium',
  },
  {
    name: 'Cross-Origin-Embedder-Policy',
    description: 'Requires resources to explicitly grant permission to be loaded. Enables SharedArrayBuffer.',
    importance: 'low',
  },
];

export function analyzeHeaders(rawHeaders) {
  if (!rawHeaders || !rawHeaders.trim()) {
    return { error: 'Paste HTTP response headers to analyze.' };
  }

  const lines = rawHeaders.split('\n').map((l) => l.trim()).filter(Boolean);
  const parsedHeaders = {};

  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.substring(0, colonIdx).trim();
    const value = line.substring(colonIdx + 1).trim();
    parsedHeaders[key.toLowerCase()] = { original: key, value };
  }

  const results = SECURITY_HEADERS.map((header) => {
    const found = parsedHeaders[header.name.toLowerCase()];
    return {
      name: header.name,
      description: header.description,
      importance: header.importance,
      present: !!found,
      value: found?.value || null,
    };
  });

  const presentCount = results.filter((r) => r.present).length;
  const totalCount = results.length;
  const score = Math.round((presentCount / totalCount) * 100);

  let grade;
  if (score >= 80) grade = 'A';
  else if (score >= 60) grade = 'B';
  else if (score >= 40) grade = 'C';
  else if (score >= 20) grade = 'D';
  else grade = 'F';

  return { results, presentCount, totalCount, score, grade };
}
