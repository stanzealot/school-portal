import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'nprogress/nprogress.css';
import '@/styles/nprogress.css';
import '@/styles/index.css';
import App from './App';
import { QueryProvider } from '@/providers/QueryProvider';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <QueryProvider>
        <App />
      </QueryProvider>
    </StrictMode>,
  );
}
