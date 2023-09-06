import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@/style/tailwind.css';
import Review from './pages/review.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Review/>
  </React.StrictMode>
);
