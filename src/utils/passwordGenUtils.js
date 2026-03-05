export function generatePassword(length = 16, options = {}) {
  const { uppercase = true, numbers = true, symbols = true } = options;

  let charset = 'abcdefghijklmnopqrstuvwxyz';
  if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (numbers) charset += '0123456789';
  if (symbols) charset += '!@#$%^&*()-_=+[]{}|;:,.<>?';

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }
  return password;
}

export function getPasswordStrengthQuick(password) {
  if (!password) return { label: 'None', percent: 0 };
  let score = 0;
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 15;
  if (password.length >= 16) score += 10;
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^a-zA-Z0-9]/.test(password)) score += 20;
  score = Math.min(100, score);

  if (score >= 75) return { label: 'Strong', percent: score };
  if (score >= 45) return { label: 'Medium', percent: score };
  if (score >= 20) return { label: 'Weak', percent: score };
  return { label: 'Very Weak', percent: score };
}
