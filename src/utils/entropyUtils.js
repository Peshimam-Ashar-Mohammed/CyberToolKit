export function calculateEntropy(password) {
  if (!password) return { entropy: 0, crackTime: 'N/A', breakdown: {} };

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  let charsetSize = 0;
  if (hasLower) charsetSize += 26;
  if (hasUpper) charsetSize += 26;
  if (hasDigit) charsetSize += 10;
  if (hasSpecial) charsetSize += 32;

  const entropy = charsetSize > 0 ? password.length * Math.log2(charsetSize) : 0;
  const roundedEntropy = Math.round(entropy * 100) / 100;

  // Crack time at different speeds
  const speeds = [
    { label: 'Online attack (1K/sec)', perSec: 1_000 },
    { label: 'Offline fast hash (10B/sec)', perSec: 10_000_000_000 },
    { label: 'Massive GPU cluster (1T/sec)', perSec: 1_000_000_000_000 },
  ];

  const totalCombinations = Math.pow(2, entropy);
  const crackTimes = speeds.map(({ label, perSec }) => ({
    label,
    time: formatTime(totalCombinations / perSec / 2),
  }));

  // Unique character ratio
  const uniqueChars = new Set(password).size;
  const uniqueRatio = Math.round((uniqueChars / password.length) * 100);

  return {
    entropy: roundedEntropy,
    charsetSize,
    length: password.length,
    crackTimes,
    uniqueChars,
    uniqueRatio,
    breakdown: { hasLower, hasUpper, hasDigit, hasSpecial },
  };
}

function formatTime(seconds) {
  if (!isFinite(seconds) || seconds > 1e30) return 'Heat death of the universe';
  if (seconds < 0.001) return 'Instant';
  if (seconds < 1) return 'Under 1 second';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 86400 * 365) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 86400 * 365 * 1_000) return `${Math.round(seconds / (86400 * 365))} years`;
  if (seconds < 86400 * 365 * 1e6) return `${(seconds / (86400 * 365 * 1000)).toFixed(1)}K years`;
  if (seconds < 86400 * 365 * 1e9) return `${(seconds / (86400 * 365 * 1e6)).toFixed(1)}M years`;
  if (seconds < 86400 * 365 * 1e12) return `${(seconds / (86400 * 365 * 1e9)).toFixed(1)}B years`;
  return 'Longer than the age of the universe';
}
