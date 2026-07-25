import React from 'react';

const Developer = () => {
  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#faf9f7', padding: '5rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
        
        {/* Premium Badge */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase', 
            color: '#a0785a', 
            fontWeight: '600',
            backgroundColor: '#f5efe6',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            border: '1px solid #ebd9c3',
            display: 'inline-block',
            marginBottom: '1rem'
          }}>
            Engineering &amp; Architecture
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: '600', color: '#1a1a1a', lineHeight: 1.2, margin: 0 }}>
            Meet the Developer
          </h1>
          <p style={{ marginTop: '1rem', color: '#666', fontSize: '1.05rem', maxWidth: '540px', margin: '1rem auto 0', lineHeight: 1.6 }}>
            The technical craftsmanship and digital architecture powering Pot Tree Studio’s digital showroom.
          </p>
        </div>

        {/* Developer Profile Card */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #ede8e0',
          borderRadius: '24px',
          padding: 'clamp(2rem, 5vw, 4rem)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle top decoration */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #1a1a1a 0%, #a0785a 50%, #1a1a1a 100%)' }}></div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', justifyContent: 'space-between' }}>
            
            {/* Left Column: Details & Bio */}
            <div style={{ flex: '1 1 360px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#1a1a1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: '600', fontFamily: 'var(--font-serif)', boxShadow: '0 4px 12px rgba(26,26,26,0.2)' }}>
                  IR
                </div>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
                    Isak Roluahpuia
                  </h2>
                  <span style={{ fontSize: '0.9rem', color: '#a0785a', fontWeight: '500', display: 'block', marginTop: '0.2rem' }}>
                    Lead Software Engineer &amp; Digital Creator
                  </span>
                </div>
              </div>

              <p style={{ color: '#555', fontSize: '0.98rem', lineHeight: 1.8, margin: '0 0 2rem' }}>
                Behind every elegant online showcase lies precision code and seamless user design. Isak architected and engineered the Pot Tree Studio platform, transforming handcrafted artistry into an interactive digital gallery with zero visual clutter and lightning-fast cloud performance.
              </p>

              {/* Skills Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {['UI/UX Architecture', 'Full-Stack Development', 'Supabase Cloud', 'React Studio'].map((skill, idx) => (
                  <span key={idx} style={{ fontSize: '0.82rem', color: '#444', backgroundColor: '#f5f5f5', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }}>
                    ⚡ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Contact Box */}
            <div style={{ 
              flex: '1 1 280px', 
              backgroundColor: '#faf9f7', 
              border: '1px solid #ede8e0', 
              borderRadius: '18px', 
              padding: '2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}>
              <div>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>💬</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', margin: '0 0 0.25rem' }}>
                  Direct Inquiry
                </h3>
                <p style={{ color: '#666', fontSize: '0.88rem', margin: 0 }}>
                  Have a project in mind or need technical collaboration? Connect instantly.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#888', letterSpacing: '0.1em', display: 'block', marginBottom: '0.3rem' }}>
                  Phone / WhatsApp
                </span>
                <span style={{ fontSize: '1.15rem', fontWeight: '600', color: '#1a1a1a', letterSpacing: '0.05em' }}>
                  +91 81199 47383
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href="https://wa.me/918119947383"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#16a34a',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '0.85rem 1.5rem',
                    borderRadius: '50px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 14px rgba(22, 163, 74, 0.25)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#15803d';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#16a34a';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>💬</span> Message on WhatsApp
                </a>

                <a
                  href="tel:+918119947383"
                  style={{
                    display: 'block',
                    backgroundColor: 'transparent',
                    color: '#1a1a1a',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1.5px solid #dcd5cc',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = '#1a1a1a';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#1a1a1a';
                    e.currentTarget.style.borderColor = '#dcd5cc';
                  }}
                >
                  📞 Call Direct
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Developer;
