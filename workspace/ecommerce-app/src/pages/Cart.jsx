import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal 
  } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img 
                          src={item.image_url} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-4">
                          <Link to={`/product/${item.id}`} className="font-medium hover:text-blue-600">
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">${item.price.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 bg-gray-200 rounded-l"
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          min="1"
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(
                            item.id, 
                            Math.max(1, parseInt(e.target.value) || 1)
                          )}
                          className="w-12 text-center py-1 border-t border-b border-gray-200"
                        />
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-200 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">$0.00</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout"
              className="block w-full py-3 px-4 bg-blue-600 text-white text-center rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>
            
            <Link 
              to="/"
              className="block w-full text-center mt-4 text-blue-600 hover:text-blue-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
