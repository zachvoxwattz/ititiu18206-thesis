import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './scripts/app';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
