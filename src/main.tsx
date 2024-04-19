import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/routes';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);