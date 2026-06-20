/**
 * Privacy Utilities
 * Helper functions to enforce privacy-first architecture
 */

export const hashSession = (data) => {
  // Simple non-cryptographic hash for session-only IDs
  let hash = 0;
  const str = JSON.stringify(data) + Date.now();
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
};

export const sanitizeInput = (input) => {
  // Remove any tracking parameters
  const url = new URL(input, window.location.origin);
  const blocked = ['utm_', 'fbclid', 'gclid', 'msclkid'];
  blocked.forEach(b => {
    for (const key of url.searchParams.keys()) {
      if (key.startsWith(b)) url.searchParams.delete(key);
    }
  });
  return url.toString();
};

export const clearAllStorage = () => {
  // Nuclear option - wipe all local/session storage
  localStorage.clear();
  sessionStorage.clear();
  document.cookie.split(';').forEach(c => {
    document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date(0).toUTCString() + ';path=/');
  });
};