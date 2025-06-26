
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">E-Shop</h3>
            <p className="text-gray-400">Your one-stop shop for all your needs.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="text-gray-400">
              <li className="mb-2"><a href="/" className="hover:text-white">Home</a></li>
              <li className="mb-2"><a href="/cart" className="hover:text-white">Cart</a></li>
              <li className="mb-2"><a href="/login" className="hover:text-white">Login</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="text-gray-400">
              <li className="mb-2">Email: contact@eshop.com</li>
              <li className="mb-2">Phone: (123) 456-7890</li>
              <li className="mb-2">Address: 123 E-Shop St, City, Country</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
