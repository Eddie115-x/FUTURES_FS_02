
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-3">
              <img src="/logo.png" alt="Ed's E-Shop Logo" className="h-8 mr-2" />
              <h3 className="text-lg font-semibold">Ed's E-Shop</h3>
            </div>
            <p className="text-gray-400">Your one-stop shop for all your needs.</p>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="text-gray-400 flex flex-col sm:block items-center sm:items-start">
              <li className="mb-2"><a href="/" className="hover:text-white">Home</a></li>
              <li className="mb-2"><a href="/cart" className="hover:text-white">Cart</a></li>
              <li className="mb-2"><a href="/login" className="hover:text-white">Login</a></li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="text-gray-400">
              <li className="mb-2">Email: contact@eds-eshop.com</li>
              <li className="mb-2">Phone: (123) 456-7890</li>
              <li className="mb-2">Address: 123 Burerua Street, Suva, Fiji</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
          <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Ed's E-Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
