const HTML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#96;',
};

export function escapeHTML(input) {
  if (!input) return '';
  return input.replace(/[&<>"'`/]/g, (char) => HTML_ENTITIES[char] || char);
}

export function escapeForAttribute(input) {
  if (!input) return '';
  return input.replace(/[&<>"'`/\\]/g, (char) => HTML_ENTITIES[char] || '\\' + char);
}

export function escapeForJS(input) {
  if (!input) return '';
  return input
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/</g, '\\x3C')
    .replace(/>/g, '\\x3E')
    .replace(/&/g, '\\x26');
}

export function urlEncode(input) {
  if (!input) return '';
  return encodeURIComponent(input);
}

export function detectXSSPatterns(input) {
  if (!input) return [];
  const patterns = [
    { pattern: /<script[\s>]/i, label: 'Script tag injection' },
    { pattern: /on\w+\s*=/i, label: 'Event handler injection (e.g. onerror, onload)' },
    { pattern: /javascript:/i, label: 'JavaScript protocol in URL' },
    { pattern: /data:\s*text\/html/i, label: 'Data URI with HTML content' },
    { pattern: /<iframe/i, label: 'Iframe injection' },
    { pattern: /<img[^>]+onerror/i, label: 'Image tag with error handler' },
    { pattern: /eval\s*\(/i, label: 'eval() function call' },
    { pattern: /document\.(cookie|write|location)/i, label: 'DOM manipulation attempt' },
    { pattern: /expression\s*\(/i, label: 'CSS expression injection' },
    { pattern: /<svg[^>]*onload/i, label: 'SVG with onload handler' },
  ];

  return patterns
    .filter(({ pattern }) => pattern.test(input))
    .map(({ label }) => label);
}
