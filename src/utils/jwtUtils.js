export function decodeJWT(token) {
  if (!token || typeof token !== 'string') {
    return { error: 'Please provide a valid JWT token' };
  }

  const parts = token.trim().split('.');

  if (parts.length !== 3) {
    return { error: 'Invalid JWT format. A JWT must have exactly 3 parts separated by dots.' };
  }

  try {
    const header = safeBase64Decode(parts[0]);
    const payload = safeBase64Decode(parts[1]);
    const signature = parts[2];

    const headerObj = JSON.parse(header);
    const payloadObj = JSON.parse(payload);

    // Expiration check
    let isExpired = false;
    let expirationDate = null;
    if (payloadObj.exp) {
      expirationDate = new Date(payloadObj.exp * 1000);
      isExpired = expirationDate < new Date();
    }

    // Issued at
    let issuedAt = null;
    if (payloadObj.iat) {
      issuedAt = new Date(payloadObj.iat * 1000);
    }

    return {
      header: headerObj,
      payload: payloadObj,
      signature,
      isExpired,
      expirationDate,
      issuedAt,
      raw: { header: parts[0], payload: parts[1], signature: parts[2] },
    };
  } catch {
    return { error: 'Failed to decode JWT. The token may be malformed or corrupted.' };
  }
}

function safeBase64Decode(str) {
  // Handle URL-safe base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  // Pad if necessary
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  return decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}

export function formatJSON(obj) {
  return JSON.stringify(obj, null, 2);
}
