import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { assetUrl } from '../lib/assetUrl';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Your Cart</h1>
      
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>Your cart is currently empty.</p>
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="flex gap-xl" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 60%' }}>
            {cart.map((item) => (
              <div key={item.id} className="flex gap-md items-center" style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                <img 
                  src={item.image?.startsWith('/assets/') ? assetUrl(item.image) : item.image} 
                  alt={item.title} 
                  style={{ width: '100px', height: '120px', objectFit: 'cover', borderRadius: '2px' }} 
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{item.price}</p>
                </div>
                <div className="flex items-center gap-sm" style={{ border: '1px solid var(--color-border)', borderRadius: '2px', padding: '0.25rem 0.5rem' }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.25rem' }}>-</button>
                  <span style={{ minWidth: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.25rem' }}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--color-error)', marginLeft: '1rem' }}>
                  <Trash2 size={20} strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
          
          <div style={{ flex: '1 1 30%', backgroundColor: '#fafafa', padding: '2rem', borderRadius: '4px', height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h2>
            <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', fontWeight: '600', fontSize: '1.1rem' }}>
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            
            <button className="btn btn-primary w-full" style={{ marginTop: '2rem' }} onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
