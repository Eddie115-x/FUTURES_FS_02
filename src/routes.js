import { createBrowserRouter } from 'react-router-dom';

// Import layouts
import RootLayout from './layouts/MainLayout';

// Import pages
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';

// Import components

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Home /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'orders', element: <Orders /> },
      { 
        path: 'order/:orderId', 
        element: <OrderConfirmation />
      },
      { path: 'admin', element: <AdminDashboard /> }
    ]
  }
]);

export default router;
