import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import router from './routes.js';

function App() {
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    // Add global error handler
    const errorHandler = (event) => {
      console.error('Global error:', event.error);
      setErrorInfo({
        message: event.error?.message || 'Unknown error occurred',
        stack: event.error?.stack || ''
      });
      event.preventDefault();
    };

    window.addEventListener('error', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (errorInfo) {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: 'red' }}>Something went wrong</h1>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          <summary>Error details</summary>
          {errorInfo.message}
          <br />
          {errorInfo.stack}
        </details>
        <button 
          style={{ marginTop: '20px', padding: '10px' }}
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    );
  }

  return (
    <CartProvider>
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </CartProvider>
  );
}

export default App;
