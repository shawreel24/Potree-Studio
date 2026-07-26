import React from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../lib/assetUrl';

const ProductCard = ({ product }) => {
  // Treat undefined/null quantity as in-stock (Supabase not set up yet)
  const isOutOfStock = product.quantity != null && product.quantity === 0;
  return (
    <div className="product-card flex flex-col gap-sm">
      <Link to={`/product/${product.id}`} className="image-wrapper" style={{ display: 'block', backgroundColor: '#f5f5f5', aspectRatio: '3/4' }}>
        <img 
          src={assetUrl(product.image)}
          alt={product.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </Link>
      <div className="product-info flex flex-col items-center text-center mt-2 gap-sm" style={{ paddingBottom: '1rem' }}>
        <Link to={`/product/${product.id}`}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{product.title}</h3>
        </Link>
        <Link 
          to={`/product/${product.id}`}
          className="btn btn-outline" 
          style={{ width: '100%', padding: '0.5rem', opacity: isOutOfStock ? 0.6 : 1, textDecoration: 'none', display: 'block' }}
        >
          {isOutOfStock ? 'Out of Stock' : 'View Details'}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
