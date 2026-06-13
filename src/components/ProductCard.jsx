import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="product-card flex flex-col gap-sm">
      <Link to={`/product/${product.id}`} className="image-wrapper" style={{ display: 'block', backgroundColor: '#f5f5f5', aspectRatio: '3/4' }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </Link>
      <div className="product-info flex flex-col items-center text-center mt-2 gap-sm" style={{ paddingBottom: '1rem' }}>
        <Link to={`/product/${product.id}`}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{product.title}</h3>
        </Link>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{product.price}</p>
        <button 
          className="btn btn-outline" 
          style={{ width: '100%', padding: '0.5rem', opacity: product.quantity === 0 ? 0.5 : 1 }}
          onClick={() => addToCart(product)}
          disabled={product.quantity === 0}
        >
          {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
