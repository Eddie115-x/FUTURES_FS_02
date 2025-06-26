# 🛍️ Mini E-Commerce Platform

A full-stack mini e-commerce platform built with React, Tailwind CSS, and Supabase.

## 📋 Features

- **Product browsing** with search and category filtering
- **Shopping cart management** with persistent storage
- **User authentication** with Supabase
- **Checkout process** with form validation
- **Order history** for authenticated users
- **Admin panel** for product management
- **Responsive design** using Tailwind CSS

## 🛠️ Technologies

- React (Create React App)
- React Router for navigation
- Tailwind CSS for styling
- Supabase for backend (authentication, database)
- Local Storage for cart persistence

## 🚀 Getting Started

In the project directory, you can run:

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Supabase account (free tier works fine)

### Supabase Setup

1. Create a new project at [Supabase](https://app.supabase.com)
2. Create the following tables in your Supabase database:
   - `products`: id, name, description, price, image_url, stock, category
   - `orders`: id, user_id, total, created_at, customer (JSONB)
   - `order_items`: id, order_id, product_id, quantity, price
3. Set up authentication (Email/Password)
4. Get your anon public key and project URL
5. Create a `.env` file based on `.env.example` with your Supabase credentials

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

The app will be running at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ecommerce-app/
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── assets/                # Static images, logos, etc.
│   ├── components/            # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── context/               # Global state (e.g., CartContext)
│   │   └── CartContext.jsx
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useAuth.js
│   │
│   ├── layouts/               # Layout wrappers (e.g., with header/footer)
│   │   └── MainLayout.jsx
│   │
│   ├── pages/                 # Page-level components
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Orders.jsx
│   │   └── AdminDashboard.jsx
│   │
│   ├── services/              # Supabase and API logic
│   │   ├── supabaseClient.js
│   │   ├── productService.js
│   │   └── orderService.js
│   │
│   ├── styles/                # Tailwind config or global styles
│   │   └── globals.css
│   │
│   ├── App.jsx
│   ├── index.js               # App entry point
│   └── routes.jsx             # React Router setup
│
├── .env                       # Supabase keys (exclude from Git)
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 📦 Deployment

This app can be easily deployed on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).

1. Create a new project on your chosen platform
2. Connect to your GitHub repository
3. Add your environment variables in the platform's dashboard
4. Deploy your application

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
