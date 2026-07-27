import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
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
            
            {/* Search icon badge */}
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: '#fff', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer', zIndex: 10 }}>
              <Search size={18} color="#333" />
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
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
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
              to="/contact" 
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

    </div>
  );
};

export default ProductDetails;

