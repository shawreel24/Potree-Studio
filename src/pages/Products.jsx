import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import AdminProductForm from '../components/AdminProductForm';

const Products = () => {
  const { products, addProduct } = useProducts();
  const { isAdmin } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSubmit = (newProduct) => {
    addProduct(newProduct);
    setShowAddForm(false);
  };

  return (
    <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Ceramics</h1>
      
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showAddForm && (
        <AdminProductForm 
          onSubmit={handleAddSubmit} 
          onCancel={() => setShowAddForm(false)} 
        />
      )}
    </div>
  );
};

export default Products;
