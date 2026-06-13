import React from 'react';
import { useLocation } from 'react-router-dom';

const PlaceholderPage = () => {
  const location = useLocation();
  const pageName = location.pathname.replace('/', '').replace(/-/g, ' ').toUpperCase() || 'PAGE';

  return (
    <div className="container flex items-center justify-center" style={{ minHeight: 'calc(100vh - var(--nav-height))', paddingTop: 'var(--nav-height)' }}>
      <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#fafafa', borderRadius: '4px', width: '100%', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>{pageName}</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>This page is currently under construction. Content will be added here soon.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
