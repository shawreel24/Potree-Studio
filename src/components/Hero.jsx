import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { assetUrl } from '../lib/assetUrl';

const slides = [
  {
    type: 'video',
    src: assetUrl('assets/images/hero_pottery_video.mp4'),
    title: 'Pottery Workshop Video'
  },
  {
    type: 'image',
    src: assetUrl('assets/images/hero_pottery_image.webp'),
    title: 'Handcrafted Pottery Piece'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    // Switch slides every 10 seconds to allow video playback
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToSlide = (index) => setCurrentSlide(index);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  return (
    <header 
      className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden group" 
      style={{ position: 'relative', height: '100vh', width: '100%', backgroundColor: '#2d2925' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div 
          key={index}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{ 
            position: 'absolute',
            inset: 0,
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            backgroundColor: '#2d2925',
            pointerEvents: currentSlide === index ? 'auto' : 'none'
          }}
        >
          {slide.type === 'video' ? (
            <video 
              src={slide.src}
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          ) : (
            <img 
              src={slide.src} 
              alt={slide.title} 
              className="w-full h-full"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          )}
          
          {/* Warm, earthy dark overlay matching the reference image's color palette and mood */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(55, 47, 39, 0.42)', mixBlendMode: 'multiply' }}></div>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.25)' }}></div>
        </div>
      ))}
      
      {/* Centered Text Overlay matching exact font and arrangement of reference image */}
      <div className="relative flex flex-col items-center justify-center h-full text-center px-4 mx-auto" style={{ width: '100%', zIndex: 10, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: "'Cinzel', 'Cormorant Garamond', 'Playfair Display', serif",
          fontSize: 'clamp(1.65rem, 6.5vw, 4.4rem)',
          fontWeight: '500',
          color: '#ffffff',
          letterSpacing: '0.06em',
          lineHeight: '1.25',
          textTransform: 'uppercase',
          marginBottom: '2rem',
          textAlign: 'center',
          width: '100%',
          textShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}>
          Crafting<br />Stories By Hand
        </h1>
        <Link 
          to="/ceramics" 
          style={{
            backgroundColor: '#f6f4ee',
            color: '#3d3934',
            fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
            fontSize: '0.95rem',
            fontWeight: '600',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '0.8rem 3rem',
            borderRadius: '999px',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            transition: 'transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={e => { 
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; 
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.35)';
            e.currentTarget.style.backgroundColor = '#ffffff';
          }}
          onMouseLeave={e => { 
            e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
            e.currentTarget.style.backgroundColor = '#f6f4ee';
          }}
        >
          Shop Now
        </Link>
      </div>

      {/* Side Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-8 z-20 flex items-center justify-center transition-opacity duration-300 desktop-only"
        style={{ top: '50%', left: '2rem', transform: 'translateY(-50%)', backgroundColor: 'rgba(246, 244, 238, 0.15)', backdropFilter: 'blur(6px)', borderRadius: '50%', padding: '0.6rem', color: '#fff', border: '1px solid rgba(246, 244, 238, 0.3)', cursor: 'pointer', zIndex: 20, position: 'absolute' }}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={30} strokeWidth={1.2} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-8 z-20 flex items-center justify-center transition-opacity duration-300 desktop-only"
        style={{ top: '50%', right: '2rem', transform: 'translateY(-50%)', backgroundColor: 'rgba(246, 244, 238, 0.15)', backdropFilter: 'blur(6px)', borderRadius: '50%', padding: '0.6rem', color: '#fff', border: '1px solid rgba(246, 244, 238, 0.3)', cursor: 'pointer', zIndex: 20, position: 'absolute' }}
        aria-label="Next Slide"
      >
        <ChevronRight size={30} strokeWidth={1.2} />
      </button>

      {/* Bottom Dots */}
      <div className="absolute bottom-8 left-0 w-full flex items-center justify-center z-20" style={{ position: 'absolute', bottom: '2.5rem', width: '100%', zIndex: 20, gap: '0.75rem' }}>
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => goToSlide(index)}
            style={{ 
              width: currentSlide === index ? '32px' : '10px', 
              height: '10px', 
              borderRadius: currentSlide === index ? '6px' : '50%', 
              backgroundColor: currentSlide === index ? '#f6f4ee' : 'rgba(246, 244, 238, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              padding: 0,
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </header>
  );
};

export default Hero;
