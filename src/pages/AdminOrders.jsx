import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

const STATUS_COLORS = {
  pending:    { bg: '#fff7ed', color: '#c2410c', label: 'Pending' },
  processing: { bg: '#eff6ff', color: '#1d4ed8', label: 'Processing' },
  shipped:    { bg: '#f0fdf4', color: '#15803d', label: 'Shipped' },
  delivered:  { bg: '#d1fae5', color: '#065f46', label: 'Delivered' },
  cancelled:  { bg: '#fef2f2', color: '#dc2626', label: 'Cancelled' },
};

const Badge = ({ status }) => {
  const s = STATUS_COLORS[status] || STATUS_COLORS.pending;
  return (
    <span style={{
      backgroundColor: s.bg,
      color: s.color,
      padding: '0.25rem 0.75rem',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    }}>
      {s.label}
    </span>
  );
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [user, isAdmin]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch orders:', error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (!error) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
    setUpdatingId(null);
  };

  const filtered = orders.filter(o =>
    o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_phone?.includes(search) ||
    o.city?.toLowerCase().includes(search.toLowerCase()) ||
    o.pincode?.includes(search)
  );

  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.grand_total || 0), 0);
  const pendingCount = orders.filter(o => o.status === 'pending').length;

  if (loading) {
    return (
      <div style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', textAlign: 'center', minHeight: '60vh' }}>
        <p style={{ color: '#888' }}>Loading orders...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif', marginBottom: '0.25rem' }}>Orders</h1>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>All customer orders from the store</p>
          </div>
          <button
            onClick={fetchOrders}
            style={{ padding: '0.6rem 1.2rem', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.85rem', backgroundColor: '#fff', cursor: 'pointer' }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Orders', value: orders.length, icon: '📦' },
            { label: 'Pending', value: pendingCount, icon: '🕐' },
            { label: 'Total Revenue', value: `₹${totalRevenue.toFixed(2)}`, icon: '💰' },
          ].map(stat => (
            <div key={stat.label} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '1.25rem 1.5rem', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{stat.icon}</span>
              <div>
                <p style={{ fontSize: '1.4rem', fontWeight: '700', color: '#111' }}>{stat.value}</p>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Search by name, phone, city, or pincode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', maxWidth: '400px', padding: '0.75rem 1rem', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', backgroundColor: '#fff' }}
          />
        </div>

        {/* Orders List */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#fff', borderRadius: '12px' }}>
            <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</p>
            <p style={{ color: '#888' }}>{search ? 'No orders match your search.' : 'No orders yet.'}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map((order) => {
              const isExpanded = expandedId === order.id;
              const date = new Date(order.created_at).toLocaleString('en-IN', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
              });

              return (
                <div key={order.id} style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                  
                  {/* Order Header Row */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    style={{ padding: '1.25rem 1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}
                  >
                    <div style={{ flex: '1 1 200px' }}>
                      <p style={{ fontWeight: '700', fontSize: '1rem', color: '#111' }}>{order.customer_name}</p>
                      <p style={{ fontSize: '0.82rem', color: '#888', marginTop: '0.15rem' }}>
                        📞 {order.customer_phone} &nbsp;·&nbsp; 🕐 {date}
                      </p>
                    </div>
                    <div style={{ flex: '1 1 160px' }}>
                      <p style={{ fontSize: '0.85rem', color: '#555' }}>
                        📍 {order.city}, {order.state}
                      </p>
                      <p style={{ fontSize: '0.82rem', color: '#888' }}>Pincode: {order.pincode}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: '700', color: '#111' }}>₹{parseFloat(order.grand_total).toFixed(2)}</p>
                        <p style={{ fontSize: '0.78rem', color: '#aaa' }}>{order.items?.length} item(s)</p>
                      </div>
                      <Badge status={order.status} />
                      <span style={{ color: '#bbb', fontSize: '1.2rem' }}>{isExpanded ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div style={{ borderTop: '1px solid #f0f0f0', padding: '1.5rem', backgroundColor: '#fafafa' }}>
                      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

                        {/* Left: Customer + Address */}
                        <div style={{ flex: '1 1 260px' }}>
                          <p style={{ fontWeight: '600', fontSize: '0.85rem', color: '#333', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer Details</p>
                          <table style={{ width: '100%', fontSize: '0.88rem', borderCollapse: 'collapse' }}>
                            <tbody>
                              {[
                                ['Name', order.customer_name],
                                ['Phone', order.customer_phone],
                                ['Address 1', order.address1],
                                ['Address 2', order.address2 || '—'],
                                ['City', order.city],
                                ['State', order.state],
                                ['Pincode', order.pincode],
                                ['Delivery Zone', order.delivery_zone || '—'],
                              ].map(([label, val]) => (
                                <tr key={label}>
                                  <td style={{ color: '#888', paddingBottom: '0.4rem', paddingRight: '1rem', whiteSpace: 'nowrap' }}>{label}</td>
                                  <td style={{ color: '#111', paddingBottom: '0.4rem', fontWeight: '500' }}>{val}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Middle: Items Ordered */}
                        <div style={{ flex: '1 1 260px' }}>
                          <p style={{ fontWeight: '600', fontSize: '0.85rem', color: '#333', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Items Ordered</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {(order.items || []).map((item, idx) => (
                              <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', backgroundColor: '#fff', borderRadius: '8px', padding: '0.5rem 0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                {item.image && (
                                  <img src={item.image} alt={item.title} style={{ width: '44px', height: '54px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                                )}
                                <div style={{ flex: 1 }}>
                                  <p style={{ fontSize: '0.88rem', fontWeight: '600' }}>{item.title}</p>
                                  <p style={{ fontSize: '0.8rem', color: '#888' }}>{item.price} × {item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '0.75rem', fontSize: '0.88rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: '#666' }}>
                              <span>Subtotal</span><span>₹{parseFloat(order.subtotal).toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: '#666' }}>
                              <span>Shipping</span><span>₹{order.delivery_cost}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#111', paddingTop: '0.4rem', borderTop: '1px solid #eee' }}>
                              <span>Total</span><span>₹{parseFloat(order.grand_total).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Update Status */}
                        <div style={{ flex: '0 1 200px' }}>
                          <p style={{ fontWeight: '600', fontSize: '0.85rem', color: '#333', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Update Status</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {Object.entries(STATUS_COLORS).map(([key, val]) => (
                              <button
                                key={key}
                                onClick={() => updateStatus(order.id, key)}
                                disabled={order.status === key || updatingId === order.id}
                                style={{
                                  padding: '0.5rem 1rem',
                                  borderRadius: '6px',
                                  border: `1px solid ${val.color}30`,
                                  backgroundColor: order.status === key ? val.bg : '#fff',
                                  color: val.color,
                                  fontSize: '0.82rem',
                                  fontWeight: '600',
                                  cursor: order.status === key ? 'default' : 'pointer',
                                  opacity: updatingId === order.id ? 0.6 : 1,
                                  textAlign: 'left',
                                }}
                              >
                                {order.status === key ? '✓ ' : ''}{val.label}
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
