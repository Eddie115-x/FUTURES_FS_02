import './App.css';
import { CartProvider } from './context/CartContext';
import Routes from './routes.js';

function App() {
  return (
    <CartProvider>
      <Routes />
    </CartProvider>
  );
}

export default App;
