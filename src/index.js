import React from 'react';
import ReactDOM from 'react-dom';  // Change this line
import App from './App';
import './index.css'; // Optional: if you have styles

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
