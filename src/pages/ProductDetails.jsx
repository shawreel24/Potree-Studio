import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Search } from 'lucide-react';
import AdminProductForm from '../components/AdminProductForm';
import { assetUrl } from '../lib/assetUrl';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct, deleteProduct } = useProducts();
  const product = products.find(p => p.id === id);
  const { isAdmin } = useAuth();
  
  const [showEditForm, setShowEditForm] = useState(false);

  if (!product) {
    return (
      <div className="container flex flex-col items-center justify-center" style={{ minHeight: '60vh', paddingTop: 'var(--nav-height)' }}>
        <h2>Product Not Found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Return to Home</Link>
      </div>
    );
  }

  const handleEditSubmit = (updatedProduct) => {
    updateProduct(updatedProduct);
    setShowEditForm(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(product.id);
      navigate('/');
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
        
        {/* Left Side: Image */}
        <div style={{ flex: '1 1 500px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: '#fff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
            <Search size={16} />
          </div>
          <img 
            src={assetUrl(product.image)} 
            alt={product.title} 
            style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '2px', backgroundColor: '#f5f5f5' }}
          />
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
