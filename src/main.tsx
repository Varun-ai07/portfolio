import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
);

// Notify loading manager that React is mounted
setTimeout(() => {
    if (window.loadingProgress) {
        window.loadingProgress.updateProgress('react');
    }
}, 100);
