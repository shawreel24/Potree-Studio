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
              India
            </p>
          </div>
        </div>

        {/* Simple Contact Form */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #ede8e0',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: '600', color: '#1a1a1a', marginTop: 0, marginBottom: '1.5rem' }}>
            Send a Message
          </h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              const name = e.target.name.value;
              const email = e.target.email.value;
              const message = e.target.message.value;
              window.location.href = `mailto:pottreestudio@gmail.com?subject=Enquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: '#555', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  onFocus={e => e.target.style.borderColor = '#a0785a'}
                  onBlur={e => e.target.style.borderColor = '#ddd'}
                />
              </div>
              <div>
                <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: '#555', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  onFocus={e => e.target.style.borderColor = '#a0785a'}
                  onBlur={e => e.target.style.borderColor = '#ddd'}
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '500', color: '#555', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Tell us how we can help..."
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                onFocus={e => e.target.style.borderColor = '#a0785a'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>
            <button
              type="submit"
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#1a1a1a',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                padding: '0.85rem 2.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'background-color 0.2s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#a0785a'}
              onMouseLeave={e => e.target.style.backgroundColor = '#1a1a1a'}
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
