import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';

import App from './App.jsx';
import { CartProvider } from './CartContext.jsx';
import { UserProvider } from './UserContext.jsx'; // 👈 import your new context

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <CartProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CartProvider>
  // </StrictMode>
);
