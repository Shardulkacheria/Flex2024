import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './context/AuthContext';
import './index.css'

import App from './App';
ReactDOM.render(
  <AuthProvider>
      <App />
  </AuthProvider>,
  document.getElementById('root')
);