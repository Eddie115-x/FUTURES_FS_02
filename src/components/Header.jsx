import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Ed's E-Shop Logo" className="h-10 mr-2" />
          <span className="text-2xl font-bold">Ed's E-Shop</span>
        </Link>
        
        {/* Hamburger Menu Button - Visible on mobile only */}
        <button 
          className="lg:hidden flex flex-col justify-center items-center p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger-line block w-6 h-0.5 bg-white mb-1.5 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`hamburger-line block w-6 h-0.5 bg-white mb-1.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`hamburger-line block w-6 h-0.5 bg-white ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        
        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/cart" className="flex items-center hover:text-gray-300">
            Cart
            <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getCartItemsCount()}
            </span>
          </Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <Link to="/register" className="hover:text-gray-300">Register</Link>
        </nav>
      </div>
      
      {/* Mobile Navigation - Appears when hamburger is clicked */}
      <div className={`lg:hidden ${isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} transition-all duration-300 ease-in-out bg-gray-800 border-t border-gray-700`}>
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-0 items-center text-center mobile-nav-container">
          <Link to="/" className="mobile-nav-item hover:text-gray-300 py-2 w-full text-center" onClick={toggleMenu}>Home</Link>
          <Link to="/cart" className="mobile-nav-item flex items-center justify-center hover:text-gray-300 py-2 w-full" onClick={toggleMenu}>
            Cart
            <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cart-badge-mobile">
              {getCartItemsCount()}
            </span>
          </Link>
          <Link to="/login" className="mobile-nav-item hover:text-gray-300 py-2 w-full text-center" onClick={toggleMenu}>Login</Link>
          <Link to="/register" className="mobile-nav-item hover:text-gray-300 py-2 w-full text-center" onClick={toggleMenu}>Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
