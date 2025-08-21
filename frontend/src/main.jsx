import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './components/Cart/CartProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
      <App />
  </CartProvider>
);
