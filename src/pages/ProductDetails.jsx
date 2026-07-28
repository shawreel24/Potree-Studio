import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Search, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import AdminProductForm from '../components/AdminProductForm';
import { assetUrl } from '../lib/assetUrl';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct, deleteProduct } = useProducts();
  const product = products.find(p => p.id === id);
  const { isAdmin } = useAuth();
  
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!product) {
    return (
      <div className="container flex flex-col items-center justify-center" style={{ minHeight: '60vh', paddingTop: 'var(--nav-height)' }}>
        <h2>Product Not Found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Return to Home</Link>
      </div>
    );
  }

  const productImages = (product.images && product.images.length > 0)
    ? product.images
    : (product.image ? [product.image] : []);
    
  const activeIndex = currentImageIndex >= productImages.length ? 0 : currentImageIndex;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, productImages.length]);

  const handleEditSubmit = async (updatedProduct) => {
    const success = await updateProduct(updatedProduct);
    if (success) {
      setShowEditForm(false);
      setCurrentImageIndex(0);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const success = await deleteProduct(product.id);
      if (success) {
        navigate('/');
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem', minHeight: '100vh' }}>
      
      {isAdmin && (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'flex-end' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => setShowEditForm(true)}
            style={{ padding: '0.5rem 1rem' }}
          >
            Edit Product
          </button>
          <button 
            className="btn" 
            onClick={handleDelete}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none' }}
          >
            Delete Product
          </button>
        </div>
      )}

      <div className="flex" style={{ flexWrap: 'wrap', gap: '4rem' }}>
        
        {/* Left Side: Sliding Image Gallery */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Main Display Box */}
          <div style={{ position: 'relative', width: '100%', backgroundColor: '#f5f5f5', borderRadius: '8px', overflow: 'hidden', aspectRatio: '4/5', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            
            {/* Maximize/Zoom button */}
            <div 
              onClick={() => setIsLightboxOpen(true)}
              title="Click to pop out full picture"
              style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: '#fff', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.15)', cursor: 'pointer', zIndex: 10, transition: 'all 0.2s ease' }}
            >
              <Maximize2 size={18} color="#222" />
            </div>

            {/* Image Counter Badge */}
            {productImages.length > 1 && (
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500', zIndex: 10, backdropFilter: 'blur(4px)' }}>
                {activeIndex + 1} / {productImages.length}
              </div>
            )}

            {/* Main Image */}
            <img 
              src={assetUrl(productImages[activeIndex])} 
              alt={`${product.title} view ${activeIndex + 1}`} 
              onClick={() => setIsLightboxOpen(true)}
              title="Click to view full picture"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease', cursor: 'zoom-in' }}
            />

            {/* Left / Right Navigation Arrows */}
            {productImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#fff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 10,
                    transition: 'all 0.2s ease',
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} color="#111" />
                </button>
                <button 
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#fff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 10,
                    transition: 'all 0.2s ease',
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight size={24} color="#111" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation Bar */}
          {productImages.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  style={{
                    flex: '0 0 80px',
                    height: '80px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: idx === activeIndex ? '2px solid #111' : '2px solid transparent',
                    opacity: idx === activeIndex ? 1 : 0.6,
                    padding: 0,
                    cursor: 'pointer',
                    backgroundColor: '#f5f5f5',
                    boxShadow: idx === activeIndex ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                  aria-label={`View thumbnail ${idx + 1}`}
                >
                  <img 
                    src={assetUrl(img)} 
                    alt={`Thumbnail ${idx + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Side: Details */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '500', color: '#111', lineHeight: '1.2' }}>{product.title}</h1>
          
          <div style={{ fontSize: '1.2rem', fontWeight: '500', color: '#333' }}>
            {product.price} INR
          </div>
          
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Hand-crafted in studio. Direct inquiries welcome.
          </div>

          {product.description && (
            <div style={{ fontSize: '1rem', color: '#444', lineHeight: '1.6' }}>
              {product.description}
            </div>
          )}

          <div style={{ fontSize: '0.9rem', color: product.quantity > 0 ? '#10b981' : '#ef4444', fontWeight: '500' }}>
            {product.quantity > 0 ? `Status: Available (${product.quantity} unit${product.quantity > 1 ? 's' : ''})` : 'Status: Currently Out of Stock'}
          </div>

          <div className="flex flex-col gap-sm" style={{ marginTop: '1.5rem' }}>
            <Link 
              to={`/inquire/${product.id}`} 
              className="btn btn-primary w-full text-center" 
              style={{ padding: '1rem', fontWeight: '500', backgroundColor: '#111', color: '#fff', textDecoration: 'none', display: 'block', borderRadius: '2px' }}
            >
              Interested in this piece? Contact Us
            </Link>
          </div>

          {(product.materials && product.materials.length > 0) && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Material:</h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#555', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {product.materials.map((mat, idx) => (
                  <li key={idx}>{mat}</li>
                ))}
              </ul>
            </div>
          )}

          {(product.tags && product.tags.length > 0) && (
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Tags:</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.tags.map((tag, idx) => (
                  <span key={idx} style={{ padding: '0.25rem 0.75rem', backgroundColor: '#f1f1f1', borderRadius: '999px', fontSize: '0.875rem', color: '#555' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {showEditForm && (
        <AdminProductForm 
          product={product}
          onSubmit={handleEditSubmit} 
          onCancel={() => setShowEditForm(false)} 
        />
      )}

      {/* Fullscreen Image Pop-out (Lightbox Modal) */}
      {isLightboxOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '2rem'
          }}
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 10000
            }}
            title="Close fullscreen view"
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
          >
            <X size={26} color="#fff" />
          </button>

          {/* Image Counter Badge in Lightbox */}
          {productImages.length > 1 && (
            <div style={{
              position: 'absolute',
              top: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              padding: '0.35rem 1.2rem',
              borderRadius: '24px',
              fontSize: '0.9rem',
              fontWeight: '500',
              letterSpacing: '0.05em',
              backdropFilter: 'blur(6px)'
            }}>
              {activeIndex + 1} / {productImages.length}
            </div>
          )}

          {/* Full Uncropped Picture */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ position: 'relative', maxWidth: '85vw', maxHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img 
              src={assetUrl(productImages[activeIndex])} 
              alt={`${product.title} fullscreen ${activeIndex + 1}`} 
              style={{ maxHeight: '82vh', maxWidth: '85vw', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 10px 40px rgba(0,0,0,0.6)', userSelect: 'none' }}
            />
          </div>

          {/* Navigation arrows in Lightbox (fixed to viewport edges for easy clicking) */}
          {productImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                style={{
                  position: 'absolute',
                  left: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '50%',
                  width: '54px',
                  height: '54px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  zIndex: 10000,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.35)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
                aria-label="Previous image in lightbox"
              >
                <ChevronLeft size={32} color="#fff" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                style={{
                  position: 'absolute',
                  right: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '50%',
                  width: '54px',
                  height: '54px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  zIndex: 10000,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.35)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
                aria-label="Next image in lightbox"
              >
                <ChevronRight size={32} color="#fff" />
              </button>
            </>
          )}

          {/* Lightbox thumbnail indicator row at bottom */}
          {productImages.length > 1 && (
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                display: 'flex',
                gap: '0.75rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)'
              }}
            >
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: idx === activeIndex ? '2px solid #fff' : '2px solid transparent',
                    opacity: idx === activeIndex ? 1 : 0.45,
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img src={assetUrl(img)} alt={`Thumb ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default ProductDetails;


