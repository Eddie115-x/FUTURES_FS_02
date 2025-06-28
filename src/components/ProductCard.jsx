import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <img 
        src={product.image_url} 
        alt={product.name}
        className="w-full h-40 sm:h-48 object-cover"
      />
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{product.name}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2 flex-grow">{product.description}</p>
        <div className="mt-3">
          <span className="text-base sm:text-lg font-bold block mb-3">${product.price.toFixed(2)}</span>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Link 
              to={`/product/${product.id}`}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-center text-sm"
            >
              View
            </Link>
            <button 
              onClick={() => addToCart(product)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
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
