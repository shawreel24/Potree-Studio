import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { assetUrl } from '../lib/assetUrl';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  // Treat undefined/null quantity as in-stock (Supabase not set up yet)
  const isOutOfStock = product.quantity != null && product.quantity === 0;
  return (
    <div className="product-card flex flex-col gap-sm">
      <Link to={`/product/${product.id}`} className="image-wrapper" style={{ display: 'block', backgroundColor: '#f5f5f5', aspectRatio: '3/4' }}>
        <img 
          src={product.image?.startsWith('/assets/') ? assetUrl(product.image) : product.image}
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
          style={{ width: '100%', padding: '0.5rem', opacity: isOutOfStock ? 0.5 : 1 }}
          onClick={() => addToCart(product)}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
