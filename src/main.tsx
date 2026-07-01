import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import posthog from 'posthog-js';
import App from './App.tsx';
import './index.css';

if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || '/ph',
    ui_host: 'https://eu.posthog.com',
    defaults: '2025-05-24',
    person_profiles: 'identified_only',
    cookieless_mode: 'always',
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
