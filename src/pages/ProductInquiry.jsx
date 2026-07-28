import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { assetUrl } from '../lib/assetUrl';
import { ChevronLeft } from 'lucide-react';

const ProductInquiry = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container flex flex-col items-center justify-center" style={{ minHeight: '60vh', paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
        <h2>Product Not Found</h2>
        <Link to="/ceramics" className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse All Ceramics</Link>
      </div>
    );
  }

  const primaryImage = (product.images && product.images.length > 0)
    ? product.images[0]
    : product.image;

  const whatsappNumber = "918414096532";
  const whatsappText = encodeURIComponent(`Hi Pottree Studio! I am interested in inquiring about / purchasing your piece: "${product.title}" (${product.price} INR). Could you please let me know about availability and ordering details?`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  const emailAddress = "pottreestudio@gmail.com";
  const emailSubject = encodeURIComponent(`Inquiry for Pottery Piece: ${product.title}`);
  const emailBody = encodeURIComponent(`Hello Pottree Studio Team,\n\nI am interested in the following ceramic piece:\n- Item: ${product.title}\n- Price: ${product.price} INR\n\nPlease let me know how we can proceed with ordering and payment details.\n\nThank you!`);
  const mailtoUrl = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div style={{ minHeight: '85vh', backgroundColor: '#faf9f7', padding: 'calc(var(--nav-height) + 2.5rem) 1.5rem 5rem' }}>
      <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Back navigation */}
        <Link 
          to={`/product/${product.id}`} 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#6e675f', fontSize: '0.9rem', fontWeight: '500', marginBottom: '2.5rem', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#111'}
          onMouseLeave={e => e.currentTarget.style.color = '#6e675f'}
        >
          <ChevronLeft size={18} /> Back to Product Details
        </Link>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a0785a', marginBottom: '0.5rem', fontWeight: '600' }}>
            Direct Piece Inquiry
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 2.8rem)', fontWeight: '600', color: '#1a1a1a', lineHeight: 1.2, margin: 0 }}>
            Interested in this Piece?
          </h1>
          <p style={{ marginTop: '0.85rem', color: '#666', fontSize: '1rem', lineHeight: 1.6, maxWidth: '560px', margin: '0.85rem auto 0' }}>
            Reach out to us directly through WhatsApp or Email to inquire about craftsmanship details, pricing, shipping, or to complete your order.
          </p>
        </div>

        {/* Selected Product Highlight Card */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #ede8e0',
          borderRadius: '16px',
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        }}>
          <div style={{ width: '90px', height: '90px', flex: '0 0 90px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
            {primaryImage ? (
              <img src={assetUrl(primaryImage)} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '0.8rem' }}>No Photo</div>
            )}
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#111', marginBottom: '0.25rem' }}>{product.title}</h2>
            <div style={{ fontSize: '1.1rem', color: '#3d3934', fontWeight: '500' }}>{product.price} INR</div>
            <div style={{ fontSize: '0.8rem', color: '#2b8a3e', marginTop: '0.25rem', fontWeight: '500' }}>
              ✦ Ready for Direct Studio Inquiry
            </div>
          </div>
        </div>

        {/* Direct Action Contact Cards (WhatsApp & Email ONLY - No Location) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          
          {/* WhatsApp Card */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              textDecoration: 'none',
              backgroundColor: '#fff',
              border: '1.5px solid #25D366',
              borderRadius: '16px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.1)',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.1)';
            }}
          >
            <div style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>💬</div>
            <h3 style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2b8a3e', margin: '0 0 0.5rem', fontWeight: '700' }}>
              Chat on WhatsApp
            </h3>
            <div style={{ color: '#1a1a1a', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              +91 84140 96532
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666', backgroundColor: '#f0fdf4', display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: '20px', border: '1px solid #dcfce7' }}>
              Click to Open Chat Right Away ➔
            </div>
          </a>

          {/* Email Card */}
          <a
            href={mailtoUrl}
            style={{
              display: 'block',
              textDecoration: 'none',
              backgroundColor: '#fff',
              border: '1.5px solid #a0785a',
              borderRadius: '16px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(160, 120, 90, 0.1)',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(160, 120, 90, 0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(160, 120, 90, 0.1)';
            }}
          >
            <div style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>✉️</div>
            <h3 style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a0785a', margin: '0 0 0.5rem', fontWeight: '700' }}>
              Send an Email
            </h3>
            <div style={{ color: '#1a1a1a', fontSize: '1.15rem', fontWeight: '600', marginBottom: '0.5rem', wordBreak: 'break-all' }}>
              pottreestudio@gmail.com
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666', backgroundColor: '#fefaf6', display: 'inline-block', padding: '0.3rem 0.8rem', borderRadius: '20px', border: '1px solid #fdeec8' }}>
              Click to Compose Mail ➔
            </div>
          </a>

        </div>

        {/* Custom Message Form */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #ede8e0',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '600', color: '#1a1a1a', marginTop: 0, marginBottom: '0.5rem' }}>
            Or Write a Custom Message Here
          </h3>
          <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '1.5rem', marginTop: 0 }}>
            Fill this out to immediately generate a customized email regarding <strong>{product.title}</strong>.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              const name = e.target.name.value;
              const senderEmail = e.target.email.value;
              const userMsg = e.target.message.value;
              const fullSubject = encodeURIComponent(`Piece Inquiry (${product.title}) from ${name}`);
              const fullBody = encodeURIComponent(`Item: ${product.title}\nPrice: ${product.price} INR\n\nFrom: ${name} (${senderEmail})\n\nMessage:\n${userMsg}`);
              window.location.href = `mailto:${emailAddress}?subject=${fullSubject}&body=${fullBody}`;
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label htmlFor="inquiry-name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#555', marginBottom: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Your Name
                </label>
                <input
                  id="inquiry-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  onFocus={e => e.target.style.borderColor = '#a0785a'}
                  onBlur={e => e.target.style.borderColor = '#ddd'}
                />
              </div>
              <div>
                <label htmlFor="inquiry-email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#555', marginBottom: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Your Email
                </label>
                <input
                  id="inquiry-email"
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
              <label htmlFor="inquiry-message" style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#555', marginBottom: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Your Questions or Requirements
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                required
                rows={4}
                defaultValue={`Hi! I would like to know more about ordering the piece "${product.title}" (${product.price} INR).`}
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                onFocus={e => e.target.style.borderColor = '#a0785a'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>

            <button
              type="submit"
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                padding: '0.85rem 2.5rem',
                fontSize: '0.95rem',
                fontWeight: '500',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#3d3934'}
              onMouseLeave={e => e.target.style.backgroundColor = '#111'}
            >
              Prepare Email Inquiry ✉️
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProductInquiry;
