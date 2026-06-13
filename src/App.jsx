import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import PlaceholderPage from './pages/PlaceholderPage';
import Checkout from './pages/Checkout';
import AdminOrders from './pages/AdminOrders';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/ceramics" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<PlaceholderPage />} />
                </Routes>
              </main>
          
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
