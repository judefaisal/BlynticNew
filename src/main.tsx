import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign Vite HMR / WebSocket connection errors from popping up in development overlays
if (typeof window !== 'undefined') {
  const isWebsocketError = (msg: string): boolean => {
    if (!msg) return false;
    const lower = msg.toLowerCase();
    return (
      lower.includes('websocket') ||
      lower.includes('vite') ||
      lower.includes('hmr') ||
      lower.includes('closed without opened')
    );
  };

  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    const reasonStr = event.reason ? String(event.reason.message || event.reason) : '';
    if (isWebsocketError(reasonStr)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener('error', (event: ErrorEvent) => {
    if (isWebsocketError(event.message)) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

