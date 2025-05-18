import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter , Routes, Route } from 'react-router-dom';
import App from './App';
import ViewPage from './ViewPage'; // Create this file
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter >
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/view/:rowIndex" element={<ViewPage />} />
    </Routes>
  </HashRouter >
);
