import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.image_url} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <div className="space-x-2">
            <Link 
              to={`/product/${product.id}`}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              View
            </Link>
            <button 
              onClick={() => addToCart(product)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
