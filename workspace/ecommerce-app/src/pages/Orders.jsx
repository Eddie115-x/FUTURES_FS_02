import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getOrdersByUserId } from '../services/orderService';
import { supabase } from '../services/supabaseClient';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          // Redirect to login if no user is found
          navigate('/login');
          return;
        }
        
        setUser(user);
        
        // Fetch orders for the user
        const userOrders = await getOrdersByUserId(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error checking user or fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [navigate]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return null; // Will redirect to login
  }
  
  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Link 
            to="/" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-100 px-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    ORDER PLACED: {formatDate(order.created_at)}
                  </p>
                  <p className="text-sm text-gray-500">
                    ORDER ID: {order.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    TOTAL
                  </p>
                  <p className="font-bold">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 divide-y divide-gray-200">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 flex">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src={item.product.image_url} 
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-gray-700">
                Shipped to: {order.customer.name}, {order.customer.address}, {order.customer.city}, {order.customer.zip_code}, {order.customer.country}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
