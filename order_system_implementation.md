# Order System Implementation Guide

This guide explains how the order placement system works and how to deploy the necessary components.

## Overview

The order placement system consists of several components:

1. **SQL Function**: A database function that handles order creation and inventory updates in one atomic transaction
2. **Frontend Service**: JavaScript service that interacts with the SQL function
3. **Checkout Component**: React component for placing orders

## Deploying the SQL Function

To deploy the SQL function, execute the SQL in the `place_order_function.sql` file in your Supabase SQL editor.

### How the Function Works

The SQL function:
1. Creates an order record
2. For each item in the order:
   - Checks if there's enough stock
   - Creates an order item record
   - Updates the product stock by subtracting the ordered quantity
3. All operations are performed in a transaction for data consistency

## Testing the Order System

For testing purposes, the current implementation simulates successful order placement, even when there might be errors. This allows you to test the flow without needing to set up the complete database schema.

### Real Implementation

In a production environment, you should:

1. Remove the simulation code and properly handle errors
2. Ensure the products table has a `stock` column
3. Add proper error handling for stock availability
4. Add proper validation before placing orders

## Database Schema Requirements

For this system to work properly in production, your database should have:

1. `orders` table with at least:
   - `id` (UUID, primary key)
   - `user_id` (UUID, can be null for guest checkouts)
   - `total` (numeric)
   - `customer` (JSONB for customer details)
   - `status` (text)
   - `created_at` (timestamp)

2. `order_items` table with at least:
   - `id` (UUID, primary key)
   - `order_id` (UUID, foreign key to orders.id)
   - `product_id` (UUID, foreign key to products.id)
   - `quantity` (integer)
   - `price` (numeric)

3. `products` table with at least:
   - `id` (UUID, primary key)
   - `stock` (integer) - critical for inventory management

## Disabling Simulation Mode

To disable simulation mode and use real order processing:

1. Modify `place_order_function.sql` to properly report errors
2. Update `orderService.js` to properly handle errors
3. Update the Checkout component to display errors to users

## Additional Improvements

For a more robust order system, consider adding:

1. Inventory reservation during checkout
2. Order confirmation emails
3. Payment processing integration
4. Admin notifications for low stock
5. Order fulfillment workflow
