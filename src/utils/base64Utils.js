export function base64Encode(text) {
  try {
    return btoa(
      encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  } catch {
    return null;
  }
}

export function base64Decode(encoded) {
  try {
    return decodeURIComponent(
      Array.from(atob(encoded), (c) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join('')
    );
  } catch {
    return null;
  }
}
