import React from 'react';
import { createRoot } from 'react-dom/client';
import 'vazirmatn/Vazirmatn-font-face.css'; // فونت لوکال (بدون CDN خارجی)
import './styles/site.css';
import App from './App.jsx';

// فقط وقتی JS فعاله، حالت مخفی انیمیشن اسکرول اعمال می‌شه (کاربر بدون JS محتوا رو می‌بینه)
document.documentElement.classList.add('js');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
