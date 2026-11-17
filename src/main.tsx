import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ignore third-party browser extension errors (e.g. MetaMask inpage.js inside preview iframes)
if (typeof window !== 'undefined') {
  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const stack =
        event.reason instanceof Error
          ? event.reason.stack || ''
          : String(event.reason || '');
      if (
        stack.includes('chrome-extension://') ||
        stack.includes('Failed to connect to MetaMask')
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => {
        reg.update().catch(() => {});
      })
      .catch(() => {
        // Service Worker registration failed silently in unsupported contexts
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
