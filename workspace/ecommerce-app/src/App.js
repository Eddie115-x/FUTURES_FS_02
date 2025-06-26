import './App.css';
import { CartProvider } from './context/CartContext';
import Routes from './routes.jsx';

function App() {
  return (
    <CartProvider>
      <Routes />
    </CartProvider>
  );
}

export default App;
