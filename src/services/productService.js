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
  // Electronics
  {
    id: 1,
    name: 'Bluetooth Headphones #1',
    description: 'Wireless over-ear headphones with noise cancellation',
    price: 149.99,
    image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    category: 'electronics',
    stock: 89
  },
  {
    id: 2,
    name: 'Smartphone XL #4',
    description: 'The latest smartphone with 6.5" screen and 128GB storage',
    price: 799.99,
    image_url: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
    category: 'electronics',
    stock: 35
  },
  {
    id: 3,
    name: 'Backpack #5',
    description: 'Water-resistant backpack with laptop compartment',
    price: 59.99,
    image_url: 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg',
    category: 'accessories',
    stock: 86
  },
  {
    id: 4,
    name: 'Running Shoes #3',
    description: 'Lightweight running shoes with extra cushioning',
    price: 89.99,
    image_url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    category: 'footwear',
    stock: 83
  },
  {
    id: 5,
    name: 'Coffee Maker #1',
    description: 'Programmable coffee maker with thermal carafe',
    price: 79.99,
    image_url: 'https://images.pexels.com/photos/90915/pexels-photo-90915.jpeg',
    category: 'home',
    stock: 44
  },
  {
    id: 6,
    name: 'Yoga Mat #5',
    description: 'Non-slip yoga mat with carrying strap',
    price: 24.99,
    image_url: 'https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg',
    category: 'fitness',
    stock: 98
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
