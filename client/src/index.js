import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApplyContexProvider } from './context/applyContext';
import { AuthContexProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContexProvider>
      <ApplyContexProvider>
        <App />
      </ApplyContexProvider>
    </AuthContexProvider>
  </React.StrictMode>
);
