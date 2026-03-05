export function generateWordlist({ name, nickname, birthYear, keyword, size = 'medium' }) {
  const words = [];
  const inputs = [];

  if (name) inputs.push(name.trim());
  if (nickname) inputs.push(nickname.trim());
  if (keyword) inputs.push(keyword.trim());

  if (inputs.length === 0) return [];

  const baseSuffixes = ['123', '1234', '!', '@123', '321', '1', '69'];
  const mediumSuffixes = ['12345', '#1', '007', '666', '777', '888', '999', '01', '2025', '2026'];
  const largeSuffixes = ['000', '111', '1337', '2024', '2023', '101', '420', 'xx', '!!', '@!', '#123', '$$$', '0000', '9999', 'abc', 'xyz'];
  const separators = ['', '_', '-', '.', '@'];
  const basePrefixes = ['admin', 'root', 'user'];
  const mediumPrefixes = ['super', 'the', 'my', 'x', 'mr'];
  const largePrefixes = ['king', 'dark', 'shadow', 'pro', 'real', 'new', 'old', 'big', 'lil'];

  let suffixes = [...baseSuffixes];
  let prefixes = [...basePrefixes];
  if (size === 'medium' || size === 'large') {
    suffixes.push(...mediumSuffixes);
    prefixes.push(...mediumPrefixes);
  }
  if (size === 'large') {
    suffixes.push(...largeSuffixes);
    prefixes.push(...largePrefixes);
  }

  if (birthYear) {
    suffixes.push(birthYear);
    suffixes.push(birthYear.slice(-2));
    suffixes.push(`@${birthYear}`);
    suffixes.push(`_${birthYear}`);
  }

  for (const word of inputs) {
    const lower = word.toLowerCase();
    const upper = word.toUpperCase();
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    // Base variants
    words.push(lower, upper, capitalized);

    // With suffixes
    for (const suffix of suffixes) {
      words.push(lower + suffix);
      words.push(capitalized + suffix);
      words.push(upper + suffix);
    }

    // With prefixes
    for (const prefix of prefixes) {
      for (const sep of separators) {
        words.push(prefix + sep + lower);
        words.push(lower + sep + prefix);
        words.push(prefix + sep + capitalized);
      }
    }

    // Leet speak
    words.push(leetSpeak(lower));
    words.push(leetSpeak(capitalized));

    // Reversed
    words.push(reverse(lower));
    words.push(reverse(capitalized));
  }

  // Cross-combinations from any two inputs
  for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs.length; j++) {
      if (i === j) continue;
      const a = inputs[i].toLowerCase();
      const b = inputs[j].toLowerCase();
      for (const sep of separators) {
        words.push(a + sep + b);
      }
      if (birthYear) {
        words.push(a + b + birthYear);
        words.push(a + birthYear + b);
      }
    }
  }

  // Deduplicate
  return [...new Set(words)];
}

function leetSpeak(str) {
  return str
    .replace(/a/gi, '4')
    .replace(/e/gi, '3')
    .replace(/i/gi, '1')
    .replace(/o/gi, '0')
    .replace(/s/gi, '5')
    .replace(/t/gi, '7');
}

function reverse(str) {
  return str.split('').reverse().join('');
}
