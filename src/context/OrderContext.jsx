import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState(null);

  // Set current order ID and details
  const setOrderDetails = (orderDetails) => {
    setCurrentOrder(orderDetails);
  };

  // Clear current order
  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <OrderContext.Provider 
      value={{
        currentOrder,
        setOrderDetails,
        clearCurrentOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
