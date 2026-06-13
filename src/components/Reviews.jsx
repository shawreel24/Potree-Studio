import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    text: "Absolutely in love with my fairy door cup! It brings me so much joy every morning with my tea. The packaging was also adorable!",
    author: "- Awmpuii"
  },
  {
    id: 2,
    text: "The pink blossom mug is even more beautiful in person. The 3D flower handle is sturdy yet looks so delicate. Fast shipping too.",
    author: "- Kimkimi"
  },
  {
    id: 3,
    text: "I bought the cherry pattern cup as a gift for a friend and she cried! It's so cheerful and well-made. Definitely buying one for myself.",
    author: "- Hruaii"
  }
];

const Reviews = () => {
  return (
    <section style={{ backgroundColor: '#fcf8f2', padding: '6rem 0' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#111', marginBottom: '3rem' }}>
          Happy Customers
        </h2>
        
        <div className="product-slider">
          {reviewsData.map((review) => (
            <div key={review.id} className="product-slider-item" style={{ 
              backgroundColor: '#fff', 
              padding: '2.5rem', 
              borderRadius: '24px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              minWidth: '280px'
            }}>
              
              <div style={{ color: '#f7ced7' }}>
                <Quote size={32} fill="currentColor" stroke="none" />
              </div>
              
              <div className="flex gap-xs" style={{ color: '#fdd369' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
              
              <p style={{ color: '#666', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: '1.6', flexGrow: 1 }}>
                "{review.text}"
              </p>
              
              <div style={{ color: '#91b07c', fontFamily: 'var(--font-serif)', fontWeight: '600', fontSize: '1.1rem' }}>
                {review.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
