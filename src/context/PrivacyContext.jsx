import React, { createContext, useContext, useState, useEffect } from 'react';

const PrivacyContext = createContext(null);

/**
 * Privacy-First Context
 * Manages session state without ANY external tracking or telemetry.
 * All data stays in browser memory (sessionStorage optional for UX).
 */
export const PrivacyProvider = ({ children }) => {
  const [telemetryBlocked] = useState(true); // Permanently blocked
  const [consent, setConsent] = useState('minimal');

  useEffect(() => {
    // Block any third-party tracking scripts
    const originalSendBeacon = navigator.sendBeacon;
    navigator.sendBeacon = () => {
      console.warn('[Pak Map] Tracking beacon blocked - Privacy Mode Active');
      return false;
    };

    // Block common analytics patterns
    const blocklist = ['google-analytics', 'gtag', 'analytics', 'fbevents', 'mixpanel', 'segment'];
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'SCRIPT' && node.src) {
            const isBlocked = blocklist.some(b => node.src.toLowerCase().includes(b));
            if (isBlocked) {
              node.remove();
              console.warn(`[Pak Map] Blocked tracking script: ${node.src}`);
            }
          }
        });
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      navigator.sendBeacon = originalSendBeacon;
      observer.disconnect();
    };
  }, []);

  // Block fingerprinting attempts
  useEffect(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, ...args) {
      if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') {
        // Return null for WebGL fingerprinting
        console.warn('[Pak Map] WebGL fingerprinting blocked');
        return null;
      }
      return originalGetContext.call(this, type, ...args);
    };
    return () => {
      HTMLCanvasElement.prototype.getContext = originalGetContext;
    };
  }, []);

  return (
    <PrivacyContext.Provider value={{ telemetryBlocked, consent, setConsent }}>
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacy = () => useContext(PrivacyContext);