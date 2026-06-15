import React from 'react';

const sectionStyle = {
  marginBottom: '2.5rem',
};

const topicTitleStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.35rem',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '0.5rem',
  marginTop: 0,
};

const subtopicTitleStyle = {
  fontSize: '0.85rem',
  fontWeight: '600',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#a0785a',
  marginBottom: '0.4rem',
  marginTop: '1.25rem',
};

const paraStyle = {
  color: '#555',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  margin: 0,
};

const dividerStyle = {
  border: 'none',
  borderTop: '1px solid #ede8e0',
  margin: '2rem 0',
};

const TermsAndConditions = () => {
  return (
    <div style={{ minHeight: '70vh', backgroundColor: '#faf9f7', padding: '5rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>

        {/* Page Header */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#a0785a', marginBottom: '0.6rem' }}>
            Legal
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '600', color: '#1a1a1a', lineHeight: 1.2, margin: 0 }}>
            Terms &amp; Conditions
          </h1>
          <p style={{ marginTop: '1rem', color: '#777', fontSize: '0.9rem' }}>
            Last updated: June 2025
          </p>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #ede8e0', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 3rem)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>

          {/* SECTION: Handmade Nature */}
          <div style={sectionStyle}>
            <h2 style={topicTitleStyle}>Shipping &amp; Returns</h2>
            <p style={{ ...paraStyle, color: '#777', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Please read the following carefully before placing an order with Pot Tree Studio.
            </p>
          </div>

          <hr style={dividerStyle} />

          {/* Subtopic 1 */}
          <div style={sectionStyle}>
            <p style={subtopicTitleStyle}>Handmade Variations</p>
            <p style={paraStyle}>
              All items are handmade and may have slight variations in color, shape, size, or finish. These are part of the unique nature of handmade ceramics and are not considered defects. Each piece is one-of-a-kind and reflects the craft of the maker.
            </p>
          </div>

          {/* Subtopic 2 */}
          <div style={sectionStyle}>
            <p style={subtopicTitleStyle}>Processing &amp; Dispatch</p>
            <p style={paraStyle}>
              Orders are usually shipped within 1–3 business days after payment is received. We carefully package all ceramics to ensure they arrive safely. However, once an order is handed over to the courier, delivery times are outside our control.
            </p>
          </div>

          {/* Subtopic 3 */}
          <div style={sectionStyle}>
            <p style={subtopicTitleStyle}>Shipping Address</p>
            <p style={paraStyle}>
              Please make sure your shipping address is correct at the time of placing your order. We cannot be responsible for orders sent to an incorrect address provided by the customer. Additional shipping charges may apply for re-shipment of returned packages.
            </p>
          </div>

          {/* Subtopic 4 */}
          <div style={sectionStyle}>
            <p style={subtopicTitleStyle}>Damaged Items</p>
            <p style={paraStyle}>
              If your item arrives damaged, please contact us within 24 hours of delivery and include photos of the item, the packaging, and the shipping box. We will review the claim and arrange a replacement or refund where appropriate.
            </p>
          </div>

          {/* Subtopic 5 */}
          <div style={sectionStyle}>
            <p style={subtopicTitleStyle}>Carrier Delays</p>
            <p style={paraStyle}>
              We are not responsible for delays caused by shipping carriers or other circumstances beyond our control. Once your order has been dispatched and a tracking number has been provided, the shipment is in the hands of the courier.
            </p>
          </div>

          {/* Subtopic 6 */}
          <div style={sectionStyle}>
            <p style={subtopicTitleStyle}>Returns Policy</p>
            <p style={{ ...paraStyle, fontWeight: '600', color: '#1a1a1a' }}>
              Returns are not accepted.
            </p>
            <p style={{ ...paraStyle, marginTop: '0.5rem' }}>
              Due to the handmade and fragile nature of our products, all sales are final. We encourage you to review your order carefully before completing your purchase. In the rare event of a manufacturing defect or shipping damage, please refer to our Damaged Items policy above.
            </p>
          </div>

          <hr style={dividerStyle} />

          {/* Agreement */}
          <p style={{ ...paraStyle, color: '#888', fontSize: '0.88rem', fontStyle: 'italic' }}>
            By placing an order, you agree to these shipping and returns terms.
          </p>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
