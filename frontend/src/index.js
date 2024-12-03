import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // Ваш компонент App
import { BrowserRouter } from 'react-router-dom'; // Импортируем BrowserRouter

ReactDOM.render(
  <BrowserRouter>
    <App />  {/* Оборачиваем App в BrowserRouter */}
  </BrowserRouter>,
  document.getElementById('root')
);
