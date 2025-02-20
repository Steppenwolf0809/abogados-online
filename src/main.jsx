import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';
import CalculadorasPage from './pages/calculadoras';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calculadoras" element={<CalculadorasPage />} />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  </React.StrictMode>
);
