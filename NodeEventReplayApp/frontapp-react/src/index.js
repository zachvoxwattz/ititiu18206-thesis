import React from 'react';
import ReactDOM from 'react-dom/client';
import EventReplayApplication from './entry';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <EventReplayApplication />
    </BrowserRouter>
  </React.StrictMode>
);
