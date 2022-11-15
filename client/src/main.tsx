import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { ErrorBoundary } from './errorBoundary';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <CssBaseline />
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
