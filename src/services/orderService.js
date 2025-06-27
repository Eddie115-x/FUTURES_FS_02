import { supabase } from './supabaseClient';

// Create a new order
export const createOrder = async (orderData) => {
  try {
    // First create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: orderData.user_id,
        total: orderData.total,
        customer: orderData.customer
      }])
      .select()
      .single();
    
    if (orderError) {
      throw orderError;
    }
    
    // Then create order items linked to the order
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) {
      throw itemsError;
    }
    
    return order.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get orders by user ID
export const getOrdersByUserId = async (userId) => {
  try {
    // Get all orders for the user
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (ordersError) {
      throw ordersError;
    }
    
    if (!orders || orders.length === 0) {
      return [];
    }
    
    // For each order, get its items and product details
    const ordersWithItems = await Promise.all(orders.map(async (order) => {
      const { data: items, error: itemsError } = await supabase
        .from('order_items')
        .select(`
          id,
          quantity,
          price,
          product:product_id (
            id,
            name,
            image_url
          )
        `)
        .eq('order_id', order.id);
      
      if (itemsError) {
        throw itemsError;
      }
      
      return {
        ...order,
        items: items || []
      };
    }));
    
    return ordersWithItems;
  } catch (error) {
    console.error(`Error fetching orders for user ${userId}:`, error);
    return [];
  }
};

// Get a single order by ID
export const getOrderById = async (orderId) => {
  try {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    
    if (orderError) {
      throw orderError;
    }
    
    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select(`
        id,
        quantity,
        price,
        product:product_id (
          id,
          name,
          image_url,
          description
        )
      `)
      .eq('order_id', orderId);
    
    if (itemsError) {
      throw itemsError;
    }
    
    return {
      ...order,
      items: items || []
    };
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    return null;
  }
};

// Admin function to get all orders
export const getAllOrders = async () => {
  try {
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (ordersError) {
      throw ordersError;
    }
    
    return orders || [];
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};
