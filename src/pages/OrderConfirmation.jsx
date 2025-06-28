import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import useAuth from '../hooks/useAuth';
import { supabase } from '../services/supabaseClient';
import '../styles/globals.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { currentOrder, getOrderById, clearCurrentOrder } = useOrder();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        // Check if we have the order anywhere (in state, context, or localStorage)
        const orderData = getOrderById(orderId) || currentOrder;
        
        if (orderData && orderData.id === orderId) {
          console.log("Using order from context/storage:", orderData);
          
          // Format the order data if it came from context to match database structure
          const formattedOrder = {
            id: orderData.id,
            total: orderData.total,
            created_at: orderData.created_at || new Date().toISOString(),
            status: orderData.status || 'Processing',
            subtotal: orderData.subtotal || (orderData.total * 0.9), // Rough estimate
            shipping_cost: orderData.shipping_cost || 10,
            tax: orderData.tax || (orderData.total * 0.1), // Rough estimate
            shipping_address: orderData.shipping_address || (orderData.customer ? {
              name: orderData.customer.name,
              address: orderData.customer.address,
              city: orderData.customer.city,
              state: '',
              zip: orderData.customer.zip_code,
              country: orderData.customer.country
            } : null),
            order_items: orderData.items ? orderData.items.map(item => ({
              id: `item-${item.id}`,
              product_id: item.id,
              price: item.price,
              quantity: item.quantity,
              product: {
                name: item.name,
                image_url: item.image_url
              }
            })) : []
          };
          
          setOrder(formattedOrder);
          setLoading(false);
          
          // After the order loads successfully, set a flag to track that we've displayed it
          setTimeout(() => {
            console.log("Order successfully displayed");
          }, 500);
          
          return;
        }
        
        // If user is logged in, try to fetch from database
        if (user) {
          console.log("Fetching order from database for user:", user.id);
          const { data, error } = await supabase
            .from('orders')
            .select('*, order_items(*, product:products(name, image_url))')
            .eq('id', orderId)
            .eq('user_id', user.id)
            .single();

          if (!error && data) {
            console.log("Found order in database:", data);
            setOrder(data);
            setLoading(false);
            return;
          }
        }
        
        // If we get here, either the user is not authenticated or the order wasn't found
        // No order found anywhere
        console.error("Order not found in context, localStorage, or database:", orderId);
        setError('Order not found or you may not have permission to view it.');
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
    
    // Don't clear the order context until the user navigates away
    // This allows refreshing the page or using back/forward navigation
    return () => {
      // We're intentionally not clearing the order context here
      // The order will remain in localStorage until explicitly cleared
      // or replaced by a new order
    };
  }, [orderId, user, currentOrder, getOrderById]);

  // No longer redirect if user is not authenticated
  // We'll display the order from context even for non-authenticated users

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error || "Order not found"}</p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-6 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const orderDate = new Date(order.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const orderTime = new Date(order.created_at).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold">Order Confirmation</h1>
          <div className="text-right">
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              {order.status || 'Processing'}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Order Information</h2>
            <p className="text-gray-600"><span className="font-medium">Order ID:</span> {order.id}</p>
            <p className="text-gray-600">
              <span className="font-medium">Date:</span> {orderDate} at {orderTime}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Status:</span> {order.status || 'Processing'}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
            {order.shipping_address ? (
              <>
                <p className="text-gray-600">{order.shipping_address.name}</p>
                <p className="text-gray-600">{order.shipping_address.address}</p>
                <p className="text-gray-600">{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}</p>
                <p className="text-gray-600">{order.shipping_address.country}</p>
              </>
            ) : (
              <p className="text-gray-600">Shipping information not available</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-center py-3 px-4">Quantity</th>
                  <th className="text-right py-3 px-4">Price</th>
                  <th className="text-right py-3 px-4">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.order_items && order.order_items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {item.product && item.product.image_url && (
                          <img 
                            src={item.product.image_url} 
                            alt={item.product.name} 
                            className="h-10 w-10 object-cover mr-3"
                          />
                        )}
                        <span>{item.product ? item.product.name : 'Product Unavailable'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">{item.quantity}</td>
                    <td className="py-3 px-4 text-right">
                      ${parseFloat(item.price).toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t">
                  <td colSpan="3" className="py-3 px-4 text-right font-medium">Subtotal</td>
                  <td className="py-3 px-4 text-right">
                    ${parseFloat(order.subtotal || 0).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="py-3 px-4 text-right font-medium">Shipping</td>
                  <td className="py-3 px-4 text-right">
                    ${parseFloat(order.shipping_cost || 0).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="py-3 px-4 text-right font-medium">Tax</td>
                  <td className="py-3 px-4 text-right">
                    ${parseFloat(order.tax || 0).toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan="3" className="py-3 px-4 text-right font-bold text-lg">Total</td>
                  <td className="py-3 px-4 text-right font-bold text-lg">
                    ${parseFloat(order.total).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
            <p className="font-medium">Thank you for your order! We've received your order and will process it shortly.</p>
            <p className="text-sm mt-1">A confirmation email will be sent to {order.customer?.email || 'your email address'}.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <button
              onClick={() => {
                // Clear the order context and go to home page
                clearCurrentOrder();
                window.location.href = '/';
              }}
              className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 mb-3 sm:mb-0 w-full sm:w-auto"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => {
                clearCurrentOrder();
                window.location.href = '/orders';
              }}
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark w-full sm:w-auto"
            >
              View All Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
