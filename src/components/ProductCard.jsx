import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../lib/assetUrl';

const ProductCard = ({ product }) => {
  const [isHovering, setIsHovering] = useState(false);

  // Treat undefined/null quantity as in-stock (Supabase not set up yet)
  const isOutOfStock = product.quantity != null && product.quantity === 0;

  const productImages = (product.images && product.images.length > 0) 
    ? product.images 
    : (product.image ? [product.image] : []);
  
  const primaryImage = productImages[0];
  const hoverImage = productImages.length > 1 ? productImages[1] : null;

  return (
    <div 
      className="product-card flex flex-col gap-sm"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link 
        to={`/product/${product.id}`} 
        className="image-wrapper" 
        style={{ display: 'block', backgroundColor: '#f5f5f5', aspectRatio: '3/4', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}
      >
        <img 
          src={assetUrl(primaryImage)}
          alt={product.title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            transition: 'all 0.4s ease',
            transform: isHovering ? 'scale(1.03)' : 'scale(1)'
          }}
          loading="lazy"
        />
        {hoverImage && (
          <img 
            src={assetUrl(hoverImage)}
            alt={`${product.title} preview`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.4s ease',
              opacity: isHovering ? 1 : 0,
              transform: isHovering ? 'scale(1.03)' : 'scale(1)'
            }}
            loading="lazy"
          />
        )}
        {productImages.length > 1 && (
          <span style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '12px', fontWeight: '500', backdropFilter: 'blur(4px)' }}>
            📷 {productImages.length}
          </span>
        )}
      </Link>
      <div className="product-info flex flex-col items-center text-center mt-2 gap-sm" style={{ paddingBottom: '1rem' }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', fontWeight: '500' }}>{product.title}</h3>
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

