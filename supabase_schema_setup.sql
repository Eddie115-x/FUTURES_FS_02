-- Create profiles table (if it doesn't exist already)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'customer' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS (Row Level Security) for profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own profile
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Create policy to allow system to create new profiles
CREATE POLICY "System can create profiles"
  ON profiles
  FOR INSERT
  WITH CHECK (true); -- Will be limited to authenticated requests via your API

-- Create policy to allow admins to view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS (Row Level Security) for products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read products
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  USING (true);

-- Create policy to allow admins to manage products
CREATE POLICY "Admins can manage products"
  ON products
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Insert sample products data
-- Electronics category
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Bluetooth Headphones #1', 'Wireless over-ear headphones with noise cancellation', 149.99, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', 89, 'electronics');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Bluetooth Headphones #2', 'Wireless over-ear headphones with noise cancellation', 149.99, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', 29, 'electronics');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Smart Watch #3', 'Fitness tracker with heart rate monitor', 199.99, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg', 84, 'electronics');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Smartphone XL #4', 'The latest smartphone with 6.5" screen and 128GB storage', 799.99, 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg', 97, 'electronics');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Laptop Pro #5', '15" laptop with 16GB RAM and 512GB SSD', 1299.99, 'https://images.pexels.com/photos/18105/pexels-photo.jpg', 24, 'electronics');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Smartphone XL #6', 'The latest smartphone with 6.5" screen and 128GB storage', 799.99, 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg', 78, 'electronics');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Smart Watch #7', 'Fitness tracker with heart rate monitor', 199.99, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg', 98, 'electronics');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Laptop Pro #8', '15" laptop with 16GB RAM and 512GB SSD', 1299.99, 'https://images.pexels.com/photos/18105/pexels-photo.jpg', 30, 'electronics');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Bluetooth Headphones #9', 'Wireless over-ear headphones with noise cancellation', 149.99, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', 27, 'electronics');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Bluetooth Headphones #10', 'Wireless over-ear headphones with noise cancellation', 149.99, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', 27, 'electronics');

-- Footwear category
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Running Shoes #1', 'Lightweight running shoes with extra cushioning', 89.99, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 59, 'footwear');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Running Shoes #2', 'Lightweight running shoes with extra cushioning', 89.99, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 68, 'footwear');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Running Shoes #3', 'Lightweight running shoes with extra cushioning', 89.99, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 83, 'footwear');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Running Shoes #4', 'Lightweight running shoes with extra cushioning', 89.99, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 28, 'footwear');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Running Shoes #5', 'Lightweight running shoes with extra cushioning', 89.99, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 40, 'footwear');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Running Shoes #6', 'Lightweight running shoes with extra cushioning', 89.99, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 90, 'footwear');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Running Shoes #7', 'Lightweight running shoes with extra cushioning', 89.99, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 99, 'footwear');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Running Shoes #8', 'Lightweight running shoes with extra cushioning', 89.99, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 62, 'footwear');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Running Shoes #9', 'Lightweight running shoes with extra cushioning', 89.99, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 71, 'footwear');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Running Shoes #10', 'Lightweight running shoes with extra cushioning', 89.99, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 71, 'footwear');

-- Home category
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Coffee Maker #1', 'Programmable coffee maker with thermal carafe', 79.99, 'https://images.pexels.com/photos/90915/pexels-photo-90915.jpeg', 44, 'home');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Coffee Maker #2', 'Programmable coffee maker with thermal carafe', 79.99, 'https://images.pexels.com/photos/90915/pexels-photo-90915.jpeg', 65, 'home');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Desk Lamp #3', 'Adjustable desk lamp with wireless charging', 49.99, 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg', 92, 'home');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Coffee Maker #4', 'Programmable coffee maker with thermal carafe', 79.99, 'https://images.pexels.com/photos/90915/pexels-photo-90915.jpeg', 37, 'home');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Desk Lamp #5', 'Adjustable desk lamp with wireless charging', 49.99, 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg', 67, 'home');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Coffee Maker #6', 'Programmable coffee maker with thermal carafe', 79.99, 'https://images.pexels.com/photos/90915/pexels-photo-90915.jpeg', 59, 'home');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Coffee Maker #7', 'Programmable coffee maker with thermal carafe', 79.99, 'https://images.pexels.com/photos/90915/pexels-photo-90915.jpeg', 40, 'home');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Desk Lamp #8', 'Adjustable desk lamp with wireless charging', 49.99, 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg', 31, 'home');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Desk Lamp #9', 'Adjustable desk lamp with wireless charging', 49.99, 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg', 91, 'home');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Coffee Maker #10', 'Programmable coffee maker with thermal carafe', 79.99, 'https://images.pexels.com/photos/90915/pexels-photo-90915.jpeg', 28, 'home');

-- Accessories category
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Backpack #1', 'Water-resistant backpack with laptop compartment', 59.99, 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', 24, 'accessories');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Backpack #2', 'Water-resistant backpack with laptop compartment', 59.99, 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', 41, 'accessories');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Backpack #3', 'Water-resistant backpack with laptop compartment', 59.99, 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', 52, 'accessories');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Backpack #4', 'Water-resistant backpack with laptop compartment', 59.99, 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', 69, 'accessories');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Backpack #5', 'Water-resistant backpack with laptop compartment', 59.99, 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', 86, 'accessories');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Backpack #6', 'Water-resistant backpack with laptop compartment', 59.99, 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', 90, 'accessories');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Backpack #7', 'Water-resistant backpack with laptop compartment', 59.99, 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', 95, 'accessories');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Backpack #8', 'Water-resistant backpack with laptop compartment', 59.99, 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', 33, 'accessories');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Backpack #9', 'Water-resistant backpack with laptop compartment', 59.99, 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', 74, 'accessories');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Backpack #10', 'Water-resistant backpack with laptop compartment', 59.99, 'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg', 72, 'accessories');

-- Fitness category
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Yoga Mat #1', 'Non-slip yoga mat with carrying strap', 24.99, 'https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg', 51, 'fitness');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Yoga Mat #2', 'Non-slip yoga mat with carrying strap', 24.99, 'https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg', 58, 'fitness');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Yoga Mat #3', 'Non-slip yoga mat with carrying strap', 24.99, 'https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg', 49, 'fitness');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Yoga Mat #4', 'Non-slip yoga mat with carrying strap', 24.99, 'https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg', 57, 'fitness');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Yoga Mat #5', 'Non-slip yoga mat with carrying strap', 24.99, 'https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg', 98, 'fitness');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Yoga Mat #6', 'Non-slip yoga mat with carrying strap', 24.99, 'https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg', 35, 'fitness');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Yoga Mat #7', 'Non-slip yoga mat with carrying strap', 24.99, 'https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg', 42, 'fitness');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Yoga Mat #8', 'Non-slip yoga mat with carrying strap', 24.99, 'https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg', 56, 'fitness');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Yoga Mat #9', 'Non-slip yoga mat with carrying strap', 24.99, 'https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg', 75, 'fitness');
INSERT INTO products (name, description, price, image_url, stock, category) VALUES ('Yoga Mat #10', 'Non-slip yoga mat with carrying strap', 24.99, 'https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg', 96, 'fitness');

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    'customer'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
