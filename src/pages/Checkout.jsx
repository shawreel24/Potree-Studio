import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getDeliveryZone } from '../data/deliveryZones';
import { supabase } from '../lib/supabaseClient';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  border: '1px solid #e0e0e0',
  borderRadius: '6px',
  fontSize: '0.95rem',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 200ms',
  backgroundColor: '#fff',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: '600',
  color: '#555',
  marginBottom: '0.4rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const fieldGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
};

const sectionTitleStyle = {
  fontSize: '1rem',
  fontWeight: '600',
  color: '#111',
  marginBottom: '1rem',
  paddingBottom: '0.5rem',
  borderBottom: '1px solid #f0f0f0',
  letterSpacing: '0.03em',
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: 'Mizoram',
    pincode: '',
  });

  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const zone = useMemo(() => getDeliveryZone(form.pincode), [form.pincode]);
  const deliveryCost = zone ? zone.cost : 0;
  const grandTotal = cartTotal + deliveryCost;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pincode' && !/^\d*$/.test(value)) return; // only digits
    if (name === 'phone' && !/^\d*$/.test(value)) return;   // only digits
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Enter a valid 10-digit phone number.';
    if (!form.address1.trim()) newErrors.address1 = 'Address line 1 is required.';
    if (!form.city.trim()) newErrors.city = 'City is required.';
    if (!form.state) newErrors.state = 'State is required.';
    if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setPlacing(true);
    setOrderError('');

    const orderPayload = {
      customer_name: form.name,
      customer_phone: form.phone,
      address1: form.address1,
      address2: form.address2,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      delivery_zone: zone?.name || '',
      delivery_cost: deliveryCost,
      subtotal: parseFloat(cartTotal.toFixed(2)),
      grand_total: parseFloat(grandTotal.toFixed(2)),
      items: cart.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
      status: 'pending',
    };

    const { error } = await supabase.from('orders').insert([orderPayload]);

    if (error) {
      console.error('Order save failed:', error);
      setOrderError('Failed to place your order. Please try again.');
      setPlacing(false);
      return;
    }

    clearCart?.();
    setSubmitted(true);
    setPlacing(false);
  };

  if (cart.length === 0 && !submitted) {
    return (
      <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Order Placed!</h2>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>
            Thank you, <strong>{form.name}</strong>! Your order will be dispatched from Aizawl, Mizoram.
          </p>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Shipping to {form.city}, {form.state} — {zone?.name} ({zone?.description}).
          </p>
          <div style={{ background: '#f9f9f9', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#666' }}>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#666' }}>Shipping</span>
              <span>₹{deliveryCost}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.1rem', paddingTop: '0.75rem', borderTop: '1px solid #eee', marginTop: '0.5rem' }}>
              <span>Total Paid</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => { clearCart?.(); navigate('/'); }}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <button onClick={() => navigate('/cart')} style={{ fontSize: '0.875rem', color: '#888', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', cursor: 'pointer' }}>
            ← Back to Cart
          </button>
          <h1 style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif' }}>Delivery Details</h1>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Dispatched from Aizawl, Mizoram · Shipping calculated by pincode
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* ─── Left: Address Form ─── */}
          <form onSubmit={handleSubmit} style={{ flex: '1 1 480px', backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            {/* Section 1: Personal Info */}
            <p style={sectionTitleStyle}>1 · Contact Information</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Full Name *</label>
                <input
                  style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : focusedField === 'name' ? '#111' : '#e0e0e0' }}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Lalmuanpuii Sailo"
                />
                {errors.name && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.name}</span>}
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  style={{ ...inputStyle, borderColor: errors.phone ? '#ef4444' : focusedField === 'phone' ? '#111' : '#e0e0e0' }}
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="9876543210"
                  maxLength={10}
                />
                {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.phone}</span>}
              </div>
            </div>

            {/* Section 2: Address */}
            <p style={sectionTitleStyle}>2 · Delivery Address</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Address Line 1 *</label>
                <input
                  style={{ ...inputStyle, borderColor: errors.address1 ? '#ef4444' : focusedField === 'address1' ? '#111' : '#e0e0e0' }}
                  name="address1"
                  value={form.address1}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('address1')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="House / Flat / Plot No., Building Name"
                />
                {errors.address1 && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.address1}</span>}
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Address Line 2</label>
                <input
                  style={{ ...inputStyle, borderColor: focusedField === 'address2' ? '#111' : '#e0e0e0' }}
                  name="address2"
                  value={form.address2}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('address2')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Street, Area, Landmark (optional)"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>City / Town *</label>
                  <input
                    style={{ ...inputStyle, borderColor: errors.city ? '#ef4444' : focusedField === 'city' ? '#111' : '#e0e0e0' }}
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('city')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Aizawl"
                  />
                  {errors.city && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.city}</span>}
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>State *</label>
                  <select
                    style={{ ...inputStyle, borderColor: errors.state ? '#ef4444' : focusedField === 'state' ? '#111' : '#e0e0e0', cursor: 'pointer' }}
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('state')}
                    onBlur={() => setFocusedField(null)}
                  >
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.state}</span>}
                </div>
              </div>
            </div>

            {/* Section 3: Pincode */}
            <p style={sectionTitleStyle}>3 · Pincode</p>
            <div style={{ marginBottom: '2rem' }}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Pincode *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    style={{ ...inputStyle, borderColor: errors.pincode ? '#ef4444' : zone ? '#10b981' : focusedField === 'pincode' ? '#111' : '#e0e0e0', paddingRight: '10rem' }}
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('pincode')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="796001"
                    maxLength={6}
                  />
                  {zone && (
                    <span style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#10b981',
                      whiteSpace: 'nowrap',
                    }}>
                      {zone.emoji} {zone.name}
                    </span>
                  )}
                </div>
                {errors.pincode && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.pincode}</span>}
                {zone && !errors.pincode && (
                  <span style={{ color: '#10b981', fontSize: '0.8rem' }}>
                    {zone.description} · Shipping: ₹{zone.cost}
                  </span>
                )}
                {form.pincode.length > 0 && form.pincode.length < 6 && (
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>Enter all 6 digits to calculate shipping.</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              style={{ padding: '1rem', fontSize: '1rem', opacity: placing ? 0.7 : 1 }}
              disabled={placing}
            >
              {placing ? 'Placing Order...' : `Place Order — ₹${grandTotal > 0 ? grandTotal.toFixed(2) : '...'}`}
            </button>
            {orderError && (
              <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.75rem', textAlign: 'center' }}>{orderError}</p>
            )}
          </form>

          {/* ─── Right: Order Summary ─── */}
          <div style={{ flex: '0 1 340px', position: 'sticky', top: 'calc(var(--nav-height) + 2rem)' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontFamily: 'Playfair Display, serif' }}>Order Summary</h2>
              {/* Cart Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <img src={item.image} alt={item.title} style={{ width: '56px', height: '68px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>{item.title}</p>
                      <p style={{ fontSize: '0.8rem', color: '#888' }}>Qty: {item.quantity}</p>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
                  <span style={{ color: '#666' }}>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
                  <span style={{ color: '#666' }}>Shipping</span>
                  <span style={{ color: zone ? '#111' : '#aaa' }}>
                    {zone ? `₹${deliveryCost}` : 'Enter pincode'}
                  </span>
                </div>
                {zone && (
                  <div style={{ backgroundColor: '#f0fdf4', borderRadius: '6px', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', fontSize: '0.8rem', color: '#10b981' }}>
                    {zone.emoji} {zone.name} · {zone.description}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.1rem', paddingTop: '0.75rem', borderTop: '1px solid #f0f0f0', marginTop: '0.25rem' }}>
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Dispatch Info Box */}
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', fontSize: '0.85rem', color: '#666', lineHeight: '1.6' }}>
              <p style={{ fontWeight: '600', color: '#111', marginBottom: '0.4rem' }}>📦 Dispatched From</p>
              <p>Aizawl, Mizoram, India</p>
              <p>All pieces are hand-crafted and packed with care.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
