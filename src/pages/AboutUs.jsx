import React from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../lib/assetUrl';

const values = [
  {
    icon: '🌸',
    title: 'Made With Intention',
    description: 'Every piece leaves our hands carrying the quiet care of the person who shaped it. No two are ever exactly the same — and that is the whole point.',
  },
  {
    icon: '🌿',
    title: 'Rooted in the North-East',
    description: 'Inspired by the lush green hills of Mizoram, our designs draw from the natural world around us — wild flowers, soft fog, and morning light through bamboo.',
  },
  {
    icon: '🔥',
    title: 'Fired, Not Manufactured',
    description: 'We use high-fired stoneware and traditional wheel-throwing techniques. Every glaze is hand-applied, every pattern painted freehand.',
  },
  {
    icon: '💛',
    title: 'Joyful by Design',
    description: 'We believe your everyday cup of tea deserves to be beautiful. Life is too short for boring mugs.',
  },
];

const AboutUs = () => {
  return (
    <div style={{ backgroundColor: '#fcfcfc' }}>

      {/* ── Hero Banner ── */}
      <section style={{
        paddingTop: 'calc(var(--nav-height) + 5rem)',
        paddingBottom: '5rem',
        background: 'linear-gradient(160deg, #fff8f3 0%, #fdf3fa 50%, #f3f8ff 100%)',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c2a47e', marginBottom: '1rem', fontWeight: '600' }}>
            Our Story
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            lineHeight: '1.2',
            color: '#111',
            marginBottom: '1.5rem',
          }}>
            Handmade in Mizoram,<br />
            <span style={{ color: '#d75971' }}>Loved Everywhere.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: '1.8', maxWidth: '580px', margin: '0 auto 2rem' }}>
            Pot Tree Studio is a small, independent ceramics studio nestled in the hills of Aizawl, Mizoram. We make playful, floral-inspired pottery that turns ordinary moments into something worth savoring.
          </p>
          <Link to="/" className="btn" style={{ backgroundColor: '#d75971', color: '#fff', border: 'none', padding: '0.85rem 2.5rem', borderRadius: '50px', fontSize: '1rem', fontWeight: '500', letterSpacing: 'normal', textTransform: 'none' }}>
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section style={{ padding: '6rem 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          
          {/* Image */}
          <div style={{ flex: '1 1 400px' }}>
            <div style={{
              width: '100%',
              aspectRatio: '4/5',
              borderRadius: '2px 80px 2px 80px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            }}>
              <img
                src={assetUrl('assets/images/about_sunny_workshop.png')}
                alt="The Pot Tree Studio workshop"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Text */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c2a47e', fontWeight: '600' }}>
              How It Started
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#111', lineHeight: '1.25' }}>
              A Workshop Filled with Sunlight & Clay
            </h2>
            <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.9' }}>
              It began simply — with a potter's wheel, a small kiln, and an obsession with making cups that felt like a warm hug. Our studio in Aizawl started as a passion project, a place where the hills outside the window became the muse and the clay became the canvas.
            </p>
            <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.9' }}>
              What started as gifts for family and friends quickly became something bigger. People kept asking, <em>"Where did you get that mug?"</em> And so, Pot Tree Studio was born — a tiny studio with a big dream: to bring a little cottagecore joy into kitchens across India.
            </p>
            <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.9' }}>
              Every piece we make is shaped by hand, fired in our studio kiln, and painted with patterns inspired by the wildflowers, monsoon skies, and fairy-tale forests of the North-East.
            </p>
          </div>

        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, #fdfbf7 0%, #fff8fb 100%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c2a47e', fontWeight: '600', marginBottom: '0.75rem' }}>
              What We Stand For
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#111' }}>
              The Pot Tree Way
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {values.map((v) => (
              <div key={v.title} style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'transform 200ms ease, box-shadow 200ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.09)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'; }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111', marginBottom: '0.75rem', fontFamily: 'var(--font-sans)' }}>{v.title}</h3>
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.7' }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section style={{ padding: '6rem 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>

          {/* Text */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c2a47e', fontWeight: '600' }}>
              The Process
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#111', lineHeight: '1.25' }}>
              From Hands to Your Table
            </h2>

            {[
              { step: '01', title: 'Throwing', desc: 'Each piece starts on the wheel — pulled, shaped, and coaxed into form by hand.' },
              { step: '02', title: 'Bisque Firing', desc: 'The raw clay is fired at high temperature to harden it before any glaze is applied.' },
              { step: '03', title: 'Hand Painting', desc: 'Flowers, cherries, fairy doors — each motif is painted freehand with a tiny brush.' },
              { step: '04', title: 'Glaze Firing', desc: 'A final high-temperature firing fuses the glaze and brings out the colors in all their glory.' },
            ].map((item) => (
              <div key={item.step} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#d75971', letterSpacing: '0.05em', minWidth: '28px', paddingTop: '0.15rem' }}>{item.step}</span>
                <div>
                  <p style={{ fontWeight: '700', color: '#111', marginBottom: '0.25rem' }}>{item.title}</p>
                  <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.7' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div style={{ flex: '1 1 400px' }}>
            <div style={{
              width: '100%',
              aspectRatio: '4/5',
              borderRadius: '80px 2px 80px 2px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            }}>
              <img
                src={assetUrl('assets/images/about_pottery_hands.png')}
                alt="Pottery being shaped by hands on a wheel"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── Call to Action ── */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #d75971 0%, #c2407a 100%)',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#fff', marginBottom: '1rem' }}>
            Bring Some Magic Home
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            Each Pot Tree Studio piece is packed with care and sent out from our little studio in Aizawl. We hope it brings as much joy to your table as it did to our workshop.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn" style={{ backgroundColor: '#fff', color: '#d75971', border: 'none', padding: '0.85rem 2.5rem', borderRadius: '50px', fontWeight: '600', fontSize: '1rem', letterSpacing: 'normal', textTransform: 'none' }}>
              Shop Now
            </Link>
            <Link to="/contact" className="btn" style={{ backgroundColor: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', padding: '0.85rem 2.5rem', borderRadius: '50px', fontWeight: '500', fontSize: '1rem', letterSpacing: 'normal', textTransform: 'none' }}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
