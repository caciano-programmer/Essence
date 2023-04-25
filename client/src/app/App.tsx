import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '../router/router';
import { ErrorBoundary } from '../errorBoundary';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <CssBaseline />
        <RouterProvider router={router} />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
