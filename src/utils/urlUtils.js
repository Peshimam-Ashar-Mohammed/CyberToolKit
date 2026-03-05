const SUSPICIOUS_KEYWORDS = [
  'login', 'verify', 'bank', 'secure', 'account', 'update', 'confirm',
  'password', 'credential', 'signin', 'billing', 'paypal', 'wallet',
  'suspend', 'unusual', 'alert', 'locked', 'expired', 'restore',
];

const KNOWN_TLDS = ['.com', '.org', '.net', '.edu', '.gov', '.io', '.dev', '.app'];

export function analyzeURL(urlString) {
  if (!urlString || typeof urlString !== 'string') {
    return { error: 'Please enter a valid URL' };
  }

  // Normalize
  let normalized = urlString.trim();
  if (!normalized.match(/^https?:\/\//i)) {
    normalized = 'http://' + normalized;
  }

  let parsed;
  try {
    parsed = new URL(normalized);
  } catch {
    return { error: 'Invalid URL format. Please enter a properly formatted URL.' };
  }

  const issues = [];
  let riskScore = 0;

  // 1. Protocol check
  if (parsed.protocol === 'http:') {
    issues.push({ severity: 'high', message: 'Uses HTTP instead of HTTPS — data is not encrypted' });
    riskScore += 25;
  }

  // 2. Suspicious keywords in URL
  const fullUrl = normalized.toLowerCase();
  const foundKeywords = SUSPICIOUS_KEYWORDS.filter((kw) => fullUrl.includes(kw));
  if (foundKeywords.length > 0) {
    issues.push({
      severity: 'medium',
      message: `Suspicious keywords detected: ${foundKeywords.join(', ')}`,
    });
    riskScore += Math.min(foundKeywords.length * 10, 30);
  }

  // 3. IP address instead of domain
  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipPattern.test(parsed.hostname)) {
    issues.push({ severity: 'high', message: 'Uses raw IP address instead of a domain name' });
    riskScore += 30;
  }

  // 4. Long URL
  if (normalized.length > 100) {
    issues.push({ severity: 'low', message: `URL is unusually long (${normalized.length} characters)` });
    riskScore += 10;
  }

  // 5. Excessive subdomains (potential domain spoofing)
  const subdomainParts = parsed.hostname.split('.');
  if (subdomainParts.length > 4) {
    issues.push({ severity: 'high', message: 'Excessive subdomains — possible domain spoofing' });
    riskScore += 25;
  }

  // 6. Domain spoofing patterns (e.g., paypal.com-secure.xyz)
  const hostname = parsed.hostname.toLowerCase();
  const spoofPatterns = ['paypal', 'google', 'apple', 'microsoft', 'amazon', 'facebook', 'netflix', 'instagram'];
  for (const brand of spoofPatterns) {
    if (hostname.includes(brand) && !hostname.endsWith(`${brand}.com`) && !hostname.endsWith(`${brand}.org`)) {
      issues.push({ severity: 'high', message: `Possible ${brand} domain spoofing detected` });
      riskScore += 30;
      break;
    }
  }

  // 7. Unusual characters
  if (parsed.hostname.includes('@') || parsed.href.includes('%40')) {
    issues.push({ severity: 'high', message: 'URL contains @ symbol — possible credential phishing' });
    riskScore += 30;
  }

  // 8. No common TLD
  const hasCommonTLD = KNOWN_TLDS.some((tld) => parsed.hostname.endsWith(tld));
  if (!hasCommonTLD && !ipPattern.test(parsed.hostname)) {
    issues.push({ severity: 'low', message: 'Uses an uncommon top-level domain' });
    riskScore += 5;
  }

  // 9. Port in URL
  if (parsed.port && parsed.port !== '80' && parsed.port !== '443') {
    issues.push({ severity: 'medium', message: `Non-standard port detected: ${parsed.port}` });
    riskScore += 10;
  }

  riskScore = Math.min(100, riskScore);

  let riskLevel;
  if (riskScore >= 60) riskLevel = 'High';
  else if (riskScore >= 30) riskLevel = 'Medium';
  else if (riskScore > 0) riskLevel = 'Low';
  else riskLevel = 'Safe';

  return {
    url: normalized,
    hostname: parsed.hostname,
    protocol: parsed.protocol.replace(':', ''),
    path: parsed.pathname,
    riskScore,
    riskLevel,
    issues,
    isHTTPS: parsed.protocol === 'https:',
  };
}
