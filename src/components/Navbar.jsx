import React, { useState } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="navbar fixed w-full top-0 left-0 flex items-center">
        <div className="container w-full flex items-center justify-between">
          
          {/* Mobile Hamburger Menu Button (Left) */}
          <button className="mobile-only" onClick={() => setIsMenuOpen(true)} aria-label="Menu" style={{ padding: '0.5rem', marginLeft: '-0.5rem' }}>
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Desktop Left Links */}
          <div className="nav-links flex items-center gap-lg">
            <Link to="/" style={{ fontSize: '0.9rem', fontWeight: '500', letterSpacing: '0.02em' }}>Home</Link>
            <Link to="/about-us" style={{ fontSize: '0.9rem', fontWeight: '500', letterSpacing: '0.02em' }}>About Us</Link>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ transform: 'translateX(-50%)', left: '50%', maxWidth: '75%', textAlign: 'center' }}>
            <Link to="/" className="flex flex-col items-center" onClick={closeMenu}>
              <span style={{ fontFamily: 'var(--font-handwritten)', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: '700', letterSpacing: '0.02em', paddingBottom: '0.2rem', whiteSpace: 'nowrap' }}>Pot Tree Studio</span>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="icons flex items-center gap-md">
            <button aria-label="Search" className="desktop-only">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link to="/login" aria-label="User Login" className="desktop-only">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <div className="desktop-only items-center gap-sm ml-2" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
              <span>🇮🇳 INR</span>
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#fff',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          <button 
            onClick={closeMenu} 
            style={{ alignSelf: 'flex-end', marginBottom: '2rem', padding: '0.5rem' }}
            aria-label="Close Menu"
          >
            <X size={32} strokeWidth={1.5} color="#111" />
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.75rem', fontWeight: '400', fontFamily: 'var(--font-serif)' }}>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/about-us" onClick={closeMenu}>About Us</Link>
          </div>

          <div style={{ marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1.1rem', color: '#555' }}>
            <button className="flex items-center gap-sm" style={{ justifyContent: 'flex-start' }} onClick={closeMenu}>
              <Search size={20} /> Search
            </button>
            <Link to="/login" className="flex items-center gap-sm" onClick={closeMenu}>
              <User size={20} /> Account / Login
            </Link>
            <div className="flex items-center gap-sm">
              <span>🇮🇳</span> INR (Indian Rupee)
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
