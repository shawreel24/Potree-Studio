import React from 'react';

const Contact = () => {
  return (
    <div style={{ minHeight: '70vh', backgroundColor: '#faf9f7', padding: '5rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a0785a', marginBottom: '0.75rem' }}>
            Get in Touch
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '600', color: '#1a1a1a', lineHeight: 1.2, margin: 0 }}>
            Contact Us
          </h1>
          <p style={{ marginTop: '1rem', color: '#666', fontSize: '1rem', lineHeight: 1.7 }}>
            We'd love to hear from you. Reach out for custom orders, queries, or just to say hello.
          </p>
        </div>

        {/* Contact Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>

          {/* Email */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #ede8e0',
            borderRadius: '12px',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            transition: 'box-shadow 0.2s',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✉️</div>
            <h3 style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a0785a', margin: '0 0 0.5rem' }}>Email</h3>
            <a
              href="mailto:pottreestudio@gmail.com"
              style={{ color: '#1a1a1a', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500', wordBreak: 'break-all' }}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
            >
              pottreestudio@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #ede8e0',
            borderRadius: '12px',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📞</div>
            <h3 style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a0785a', margin: '0 0 0.5rem' }}>Phone</h3>
            <a
              href="tel:+918414096532"
              style={{ color: '#1a1a1a', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
            >
              +91 84140 96532
            </a>
          </div>

          {/* Location */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #ede8e0',
            borderRadius: '12px',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📍</div>
            <h3 style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a0785a', margin: '0 0 0.5rem' }}>Location</h3>
            <p style={{ color: '#1a1a1a', fontSize: '0.95rem', fontWeight: '500', margin: 0 }}>
              F-36, Dr. Selbuanga Building,<br />
              Ground Floor, Lower Chanmari,<br />
              Aizawl, Mizoram, India
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;

