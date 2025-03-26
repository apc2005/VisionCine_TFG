import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Crear una instancia de QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}> {/* Asegúrate que este esté envolviendo tu Router y App */}
    <Router>
      <App />
    </Router>
  </QueryClientProvider>
);
