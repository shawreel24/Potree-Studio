import React from 'react';

const Story = () => {
  return (
    <section style={{ backgroundColor: '#fdfbf7', padding: '6rem 0' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem', justifyContent: 'center' }}>
        
        {/* Image Side */}
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', maxWidth: '500px' }}>
          <div style={{ 
            width: '100%', 
            aspectRatio: '1/1', 
            borderRadius: '50%', 
            overflow: 'hidden',
            border: '16px solid #fff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}>
            <img 
              src="/assets/images/about_sunny_workshop.png" 
              alt="Sunny pottery workshop" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Text Side */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '3rem', 
            color: '#f0c66c',
            fontWeight: '600',
            lineHeight: '1.2'
          }}>
            Sunlight &amp; Clay
          </h2>
          <p style={{ color: '#444', fontSize: '1.1rem', lineHeight: '1.8' }}>
            Welcome to our happy place! At Pot Tree Studio, our workshop is always filled with bright sunlight, fresh tulips, and the joyful energy of creating something beautiful. We believe ceramics shouldn't be too serious—they should be fun, colorful, and make you smile every time you take a sip of coffee. From sculpting tiny fairy doors to painting bright cherry patterns, our hands are always busy bringing a little cottagecore magic into the world.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Story;
