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
      <nav className="navbar fixed w-full top-0 left-0 flex items-center" style={{ backgroundColor: '#f6f4ee', borderBottom: '1px solid #e8e4db' }}>
        <div className="container w-full flex items-center justify-between" style={{ height: '100%' }}>
          
          {/* Mobile Hamburger Menu Button (Left) */}
          <button className="mobile-only" onClick={() => setIsMenuOpen(true)} aria-label="Menu" style={{ padding: '0.5rem', marginLeft: '-0.5rem', color: '#3d3934' }}>
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Desktop Left Links - ONLY Home and About as instructed */}
          <div className="nav-links flex items-center" style={{ gap: '3rem' }}>
            <Link to="/" style={{ 
              fontFamily: "'Cinzel', 'Cormorant Garamond', serif", 
              fontSize: '0.88rem', 
              fontWeight: '600', 
              letterSpacing: '0.18em', 
              textTransform: 'uppercase', 
              color: '#3d3934',
              textDecoration: 'none' 
            }}>
              Home
            </Link>
            <Link to="/about-us" style={{ 
              fontFamily: "'Cinzel', 'Cormorant Garamond', serif", 
              fontSize: '0.88rem', 
              fontWeight: '600', 
              letterSpacing: '0.18em', 
              textTransform: 'uppercase', 
              color: '#3d3934',
              textDecoration: 'none' 
            }}>
              About
            </Link>
          </div>

          {/* Center Logo - Stacked Pot Tree upper line, Studio lower line */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ transform: 'translateX(-50%)', left: '50%', textAlign: 'center', zIndex: 10 }}>
            <Link to="/" className="flex flex-col items-center justify-center" onClick={closeMenu} style={{ textDecoration: 'none' }}>
              <span style={{ 
                fontFamily: "'Cinzel', 'Cormorant Garamond', 'Playfair Display', serif", 
                fontSize: 'clamp(1.3rem, 3.2vw, 1.75rem)', 
                fontWeight: '600', 
                letterSpacing: '0.12em', 
                color: '#3d3934', 
                lineHeight: '1.15',
                textTransform: 'uppercase',
                display: 'block'
              }}>
                Pot Tree
              </span>
              <span style={{ 
                fontFamily: "'Cinzel', 'Cormorant Garamond', 'Playfair Display', serif", 
                fontSize: 'clamp(1.1rem, 2.8vw, 1.5rem)', 
                fontWeight: '500', 
                letterSpacing: '0.16em', 
                color: '#3d3934', 
                lineHeight: '1.15',
                textTransform: 'uppercase',
                display: 'block'
              }}>
                Studio
              </span>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="icons flex items-center gap-md" style={{ color: '#3d3934' }}>
            <button aria-label="Search" className="desktop-only" style={{ color: '#3d3934' }}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link to="/login" aria-label="User Login" className="desktop-only" style={{ color: '#3d3934' }}>
              <User size={20} strokeWidth={1.5} />
            </Link>
            <div className="desktop-only items-center gap-sm ml-2" style={{ 
              fontSize: '0.85rem', 
              fontWeight: '600', 
              fontFamily: "'Cinzel', 'Cormorant Garamond', serif", 
              letterSpacing: '0.1em', 
              color: '#3d3934' 
            }}>
              <span>INR</span>
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#f6f4ee',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          <button 
            onClick={closeMenu} 
            style={{ alignSelf: 'flex-end', marginBottom: '2rem', padding: '0.5rem', color: '#3d3934' }}
            aria-label="Close Menu"
          >
            <X size={32} strokeWidth={1.5} color="#3d3934" />
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.5rem', fontWeight: '500', fontFamily: "'Cinzel', 'Cormorant Garamond', serif", letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3d3934' }}>
            <Link to="/" onClick={closeMenu} style={{ color: '#3d3934' }}>Home</Link>
            <Link to="/about-us" onClick={closeMenu} style={{ color: '#3d3934' }}>About</Link>
          </div>

          <div style={{ marginTop: 'auto', borderTop: '1px solid #e7e4db', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1rem', color: '#544f49', fontFamily: "'Cinzel', 'Cormorant Garamond', serif", letterSpacing: '0.08em' }}>
            <button className="flex items-center gap-sm" style={{ justifyContent: 'flex-start', color: '#544f49' }} onClick={closeMenu}>
              <Search size={20} /> Search
            </button>
            <Link to="/login" className="flex items-center gap-sm" onClick={closeMenu} style={{ color: '#544f49' }}>
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
