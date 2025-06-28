import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();
const ORDER_STORAGE_KEY = 'futures_fs_current_order';

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  // Initialize from localStorage if available
  const [currentOrder, setCurrentOrder] = useState(() => {
    try {
      const storedOrder = localStorage.getItem(ORDER_STORAGE_KEY);
      return storedOrder ? JSON.parse(storedOrder) : null;
    } catch (error) {
      console.error('Error reading order from localStorage:', error);
      return null;
    }
  });

  // Set current order ID and details
  const setOrderDetails = (orderDetails) => {
    try {
      // Save to state
      setCurrentOrder(orderDetails);
      // Also save to localStorage
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orderDetails));
    } catch (error) {
      console.error('Error saving order to localStorage:', error);
    }
  };

  // Clear current order
  const clearCurrentOrder = () => {
    console.log("Clearing order context");
    setCurrentOrder(null);
    localStorage.removeItem(ORDER_STORAGE_KEY);
  };
  
  // Get persistent order by ID (even if not in state)
  const getOrderById = (orderId) => {
    console.log("Looking for order:", orderId);
    
    // First check if it's in the current React state
    if (currentOrder && currentOrder.id === orderId) {
      console.log("Found order in React state");
      return currentOrder;
    }
    
    // Try to get from localStorage directly
    try {
      const storedOrder = localStorage.getItem(ORDER_STORAGE_KEY);
      console.log("localStorage order data:", storedOrder ? "found" : "not found");
      
      if (storedOrder) {
        const parsedOrder = JSON.parse(storedOrder);
        if (parsedOrder.id === orderId) {
          console.log("Found matching order in localStorage");
          return parsedOrder;
        } else {
          console.log("Found order in localStorage but ID doesn't match", parsedOrder.id, "vs", orderId);
        }
      }
    } catch (error) {
      console.error('Error checking localStorage for order:', error);
    }
    
    console.log("Order not found in any storage");
    return null;
  };

  return (
    <OrderContext.Provider 
      value={{
        currentOrder,
        setOrderDetails,
        clearCurrentOrder,
        getOrderById
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
