import { createRoot } from 'react-dom/client';
import './global.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientBoundary } from './utils/QueryClientProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <QueryClientBoundary>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
      <ReactQueryDevtools />
    </BrowserRouter>
  </QueryClientBoundary>
);
