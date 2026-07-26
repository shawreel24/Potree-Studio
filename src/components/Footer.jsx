import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f5f5f5', padding: '4rem 0', color: '#333', borderTop: '1px solid #eaeaea', fontSize: '0.9rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
        
        {/* Column 1: Brand & Contact & Map */}
        <div className="flex flex-col gap-md">
          <div className="flex flex-col">
            <span style={{ fontFamily: 'var(--font-handwritten)', fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: '700', color: '#111', whiteSpace: 'nowrap' }}>Pot Tree Studio</span>
          </div>
          
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#555' }}>
            <li>F-36, Dr. Selbuanga Building, Ground Floor, Lower Chanmari</li>
            <li><a href="mailto:pottreestudio@gmail.com" style={{ textDecoration: 'underline' }}>pottreestudio@gmail.com</a></li>
            <li><a href="tel:+918414096532" style={{ textDecoration: 'none' }}>+91 84140 96532</a></li>
          </ul>

          <div style={{ marginTop: '1rem', width: '100%', height: '150px', backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
            {/* Google Maps Embed Placeholder */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754722784!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1683884145000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Shop Location Map"
            ></iframe>
          </div>
        </div>

        {/* Column 2: Help & Information */}
        <div className="flex flex-col gap-sm">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111', marginBottom: '0.5rem' }}>Help &amp; Information</h3>
          <div className="flex flex-col gap-sm" style={{ color: '#555' }}>
            <Link to="/about-us">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/developer">Developer</Link>
          </div>
        </div>


        {/* Column 4: Support */}
        <div className="flex flex-col gap-sm">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111', marginBottom: '0.5rem' }}>Support</h3>
          <div className="flex flex-col gap-sm" style={{ color: '#555' }}>
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="container" style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid #e5e5e5', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', color: '#666', fontSize: '0.85rem' }}>
        <div>
          &copy; {new Date().getFullYear()} Pot Tree Studio. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '1rem', color: '#777', fontStyle: 'italic' }}>
          <span>Handcrafted Ceramics &bull; Aizawl, Mizoram</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
