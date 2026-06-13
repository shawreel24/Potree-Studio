import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Story from '../components/Story';
import Reviews from '../components/Reviews';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import AdminProductForm from '../components/AdminProductForm';

const Home = () => {
  const { products, addProduct } = useProducts();
  const { isAdmin } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSubmit = (newProduct) => {
    addProduct(newProduct);
    setShowAddForm(false);
  };

  return (
    <div className="home-page">
      <Hero />
      
      <section className="py-24" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="text-center mb-12" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Floral Collection</h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>Playful pieces crafted to brighten your everyday moments. Hand-thrown and painted with love.</p>
          </div>
          
          {isAdmin && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowAddForm(true)}
                style={{ padding: '0.75rem 1.5rem', backgroundColor: '#111', color: '#fff' }}
              >
                + Add New Product
              </button>
            </div>
          )}

          <div className="product-slider">
            {products.map(product => (
              <div key={product.id} className="product-slider-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <Link 
              to="/ceramics" 
              className="btn btn-outline"
              style={{ padding: '0.85rem 3rem', fontSize: '1rem', letterSpacing: '0.05em' }}
            >
              View all
            </Link>
          </div>
        </div>
      </section>
      
      <Story />
      <Reviews />

      {showAddForm && (
        <AdminProductForm 
          onSubmit={handleAddSubmit} 
          onCancel={() => setShowAddForm(false)} 
        />
      )}
    </div>
  );
};

export default Home;
