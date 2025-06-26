import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';

// Layouts
import MainLayout from './layouts/MainLayout';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/orders', element: <Orders /> },
      { path: '/admin', element: <AdminDashboard /> },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
