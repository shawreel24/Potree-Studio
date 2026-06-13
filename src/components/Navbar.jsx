import React from 'react';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAdmin } = useAuth();
  return (
    <nav className="navbar fixed w-full top-0 left-0 flex items-center">
      <div className="container w-full flex items-center justify-between">
        
        {/* Left Links */}
        <div className="nav-links flex items-center gap-lg">
          <Link to="/" style={{ fontSize: '0.9rem', fontWeight: '500', letterSpacing: '0.02em' }}>Home</Link>
          <Link to="/about-us" style={{ fontSize: '0.9rem', fontWeight: '500', letterSpacing: '0.02em' }}>About Us</Link>
          {isAdmin && (
            <Link to="/admin/orders" style={{ fontSize: '0.9rem', fontWeight: '500', letterSpacing: '0.02em', color: '#c2410c' }}>Orders</Link>
          )}
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ transform: 'translateX(-50%)', left: '50%' }}>
          <Link to="/" className="flex flex-col items-center">
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: '600' }}>Pot Tree Studio</span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Pure Craftsmanship</span>
          </Link>
        </div>

        {/* Right Icons */}
        <div className="icons flex items-center gap-md">
          <button aria-label="Search">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link to="/login" aria-label="User Login">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" aria-label="Shopping Cart">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </Link>
          <div className="flex items-center gap-sm ml-2" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
            <span>🇮🇳 INR</span>
          </div>
          <button className="md-hidden" style={{ display: 'none' }} aria-label="Menu">
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
