# ECOMM App - Frontend

A modern, responsive e-commerce web application built with React and Vite. This project features a complete shopping experience with user authentication, product browsing, shopping cart functionality, and an admin dashboard.

## 🚀 Features

- **Product Catalog**: Browse and filter products with smooth animations
- **User Authentication**: Secure login and registration system
- **Shopping Cart**: Add/remove items with real-time cart management
- **Product Details**: Detailed product pages with specifications
- **Admin Dashboard**: Manage products and inventory
- **Responsive Design**: Fully responsive UI with Tailwind CSS
- **Smooth Animations**: GSAP animations and Lenis smooth scrolling
- **Modern Tech Stack**: React 19, Vite, and latest dependencies

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/ali-chnitifa-12/ECOMMAPP.git
cd ECOMMAPP
```

2. Install dependencies:
```bash
npm install
```

## 📦 Available Scripts

- `npm run dev` - Start the development server (Vite HMR enabled)
- `npm run build` - Create an optimized production build
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Admin/          # Admin-specific components
│   ├── Cart/           # Shopping cart components
│   ├── Filters/        # Product filter components
│   ├── Footer/         # Footer component
│   ├── Hero/           # Hero section
│   ├── Navbar/         # Navigation bar
│   └── ProductCard/    # Product card component
├── pages/              # Page components
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── ProductDetails.jsx
│   ├── Products.jsx
│   ├── Register.jsx
│   └── Admin/          # Admin pages
├── context/            # React Context providers
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── services/           # API and service functions
│   ├── api.js
│   └── productService.js
├── data/               # Static data files
├── animations/         # Animation utilities
├── App.jsx
└── main.jsx
```

## 🎨 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Animations**: GSAP, Lenis
- **Routing**: React Router v7
- **Linting**: ESLint
- **CSS**: PostCSS

## 📝 Environment Setup

Create a `.env` file in the root directory with any necessary environment variables for your API endpoints.

## 🚀 Getting Started

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173`

## 📚 Main Features

### Authentication
- User registration and login functionality
- Protected routes for authenticated users
- Auth context for global state management

### Product Management
- View all products with filtering options
- Detailed product views
- Admin interface for product management
- Add/edit/delete products (admin only)

### Shopping Cart
- Add items to cart
- Update quantities
- Remove items
- Cart context for global cart state

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Ali Chnitifa**

## 🔗 Links

- [GitHub Repository](https://github.com/ali-chnitifa-12/ECOMMAPP)
- [Live Demo](#) - Add your live demo link here when deployed

---

For any questions or issues, please open an issue on the GitHub repository.
