import './App.css';
import { CartProvider } from './context/CartContext';
import { RouterProvider } from 'react-router-dom';
import router from './routes.js';

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
