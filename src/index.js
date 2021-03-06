import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

// React без JSX!
ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(App, null)  
);

// React c JSX!
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // <React.StrictMode>
//     <App />
//   // </React.StrictMode>
// );