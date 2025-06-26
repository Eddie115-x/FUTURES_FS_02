import { createBrowserRouter } from 'react-router-dom';

// Import layouts
import RootLayout from './layouts/RootLayout';

// Import pages
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <ProductList /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'orders', element: <Orders /> },
      { path: 'admin', element: <Admin /> }
    ]
  }
]);

export default router;
