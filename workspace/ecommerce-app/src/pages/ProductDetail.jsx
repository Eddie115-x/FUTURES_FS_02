import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert('Product added to cart!');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-xl">Product not found.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Quantity</h3>
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 bg-gray-200 rounded-l"
              >
                -
              </button>
              <input 
                type="number" 
                min="1"
                max={product.stock}
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center py-1 border-t border-b border-gray-200"
              />
              <button 
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                className="px-3 py-1 bg-gray-200 rounded-r"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600">
              {product.stock > 0 
                ? `In stock: ${product.stock} items available` 
                : 'Out of stock'}
            </p>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 px-4 rounded text-white font-bold ${
              product.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
