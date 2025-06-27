import { supabase } from './supabaseClient';

// Get all products
export const getProducts = async () => {
  try {
    console.log('Making Supabase request to products table...');
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Supabase returned an error:', error);
      throw error;
    }
    
    console.log('Products data from Supabase:', data);
    
    // If no products exist, return sample data
    if (!data || data.length === 0) {
      console.log('No products found, returning sample data');
      return sampleProducts;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    console.log('Returning sample products due to error');
    return sampleProducts;
  }
};

// Sample products to display if database is empty or there's an error
const sampleProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones with long battery life and exceptional sound quality.',
    price: 129.99,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'electronics',
    stock: 50
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Feature-packed smartwatch with health monitoring, notifications, and workout tracking.',
    price: 199.99,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'electronics',
    stock: 35
  },
  {
    id: 3,
    name: 'Leather Backpack',
    description: 'Stylish and durable leather backpack perfect for everyday use or travel.',
    price: 79.99,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'accessories',
    stock: 40
  },
  {
    id: 4,
    name: 'Fitness Tracker',
    description: 'Waterproof fitness band with heart rate monitoring and sleep tracking.',
    price: 59.99,
    image_url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'fitness',
    stock: 65
  }
];

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('name');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
};

// Search products by name or description
export const searchProducts = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('name');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error searching products for "${searchTerm}":`, error);
    return [];
  }
};

// Admin Functions

// Create a new product
export const createProduct = async (productData) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};

// Get all products (admin version with more details)
export const getAllProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};
