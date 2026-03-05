const COMMON_PASSWORDS = [
  'password', '123456', '123456789', 'qwerty', 'abc123', 'monkey', 'master',
  'dragon', '111111', 'baseball', 'iloveyou', 'trustno1', 'sunshine', 'letmein',
  'football', 'shadow', 'michael', 'login', 'starwars', 'passw0rd', 'admin',
  'welcome', 'hello', 'charlie', 'donald', 'password1', '1234', '12345',
];

const COMMON_PATTERNS = [
  /^(.)\1+$/, // all same char
  /^(012|123|234|345|456|567|678|789|890)+$/, // sequential numbers
  /^(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)+$/i,
  /^(qwerty|asdf|zxcv)/i,
];

export function analyzePassword(password) {
  if (!password) {
    return {
      strength: 'None',
      score: 0,
      entropy: 0,
      crackTime: 'Instant',
      issues: [],
      suggestions: [],
      charsetSize: 0,
    };
  }

  const issues = [];
  const suggestions = [];
  let score = 0;

  // Character set analysis
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  let charsetSize = 0;
  if (hasLower) charsetSize += 26;
  if (hasUpper) charsetSize += 26;
  if (hasDigit) charsetSize += 10;
  if (hasSpecial) charsetSize += 32;

  // Entropy
  const entropy = charsetSize > 0 ? password.length * Math.log2(charsetSize) : 0;

  // Length scoring
  if (password.length >= 16) score += 30;
  else if (password.length >= 12) score += 25;
  else if (password.length >= 8) score += 15;
  else if (password.length >= 6) score += 5;

  if (password.length < 8) {
    issues.push('Password is too short (less than 8 characters)');
    suggestions.push('Use at least 12 characters for strong security');
  }

  // Charset scoring
  if (hasLower) score += 10;
  if (hasUpper) score += 15;
  if (hasDigit) score += 10;
  if (hasSpecial) score += 20;

  if (!hasUpper) suggestions.push('Add uppercase letters');
  if (!hasDigit) suggestions.push('Add numbers');
  if (!hasSpecial) suggestions.push('Add special characters (!@#$%^&*)');
  if (!hasLower) suggestions.push('Add lowercase letters');

  // Common password check
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    issues.push('This is a commonly used password');
    score = Math.min(score, 10);
  }

  // Pattern detection
  if (/(.)\1{2,}/.test(password)) {
    issues.push('Contains repeated characters (e.g., "aaa")');
    score -= 10;
  }

  if (/123|234|345|456|567|678|789|890|012/.test(password)) {
    issues.push('Contains common number sequences (e.g., "123")');
    score -= 5;
  }

  if (/qwerty|asdf|zxcv/i.test(password)) {
    issues.push('Contains keyboard patterns');
    score -= 10;
  }

  for (const pattern of COMMON_PATTERNS) {
    if (pattern.test(password)) {
      score -= 15;
      break;
    }
  }

  // Bonus for length + complexity
  if (password.length >= 12 && hasLower && hasUpper && hasDigit && hasSpecial) {
    score += 15;
  }

  score = Math.max(0, Math.min(100, score));

  // Crack time estimation (based on 10 billion guesses/sec)
  const crackTime = estimateCrackTime(entropy);

  // Strength label
  let strength;
  if (score >= 75) strength = 'Strong';
  else if (score >= 45) strength = 'Medium';
  else if (score >= 20) strength = 'Weak';
  else strength = 'Very Weak';

  if (issues.length === 0 && score >= 45) {
    if (score < 75) suggestions.push('Consider making it longer for extra security');
  }

  return { strength, score, entropy: Math.round(entropy * 100) / 100, crackTime, issues, suggestions, charsetSize };
}

function estimateCrackTime(entropy) {
  // Assuming 10 billion guesses per second (modern GPU cluster)
  const guessesPerSecond = 10_000_000_000;
  const totalGuesses = Math.pow(2, entropy);
  const seconds = totalGuesses / guessesPerSecond / 2; // average case

  if (seconds < 0.001) return 'Instant';
  if (seconds < 1) return 'Less than a second';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 86400 * 365) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 86400 * 365 * 100) return `${Math.round(seconds / (86400 * 365))} years`;
  if (seconds < 86400 * 365 * 1_000_000) return `${Math.round(seconds / (86400 * 365 * 1000))}k years`;
  if (seconds < 86400 * 365 * 1e9) return `${Math.round(seconds / (86400 * 365 * 1e6))}M years`;
  return 'Centuries+';
}
