import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/assets/images/hero_image.png',
    title: 'Signature Ceramics',
    link: '/ceramics'
  },
  {
    image: '/assets/images/hero_floral.png',
    title: 'Summer Floral Collection',
    link: '/ceramics'
  },
  {
    image: '/assets/images/about_pottery_hands.png',
    title: 'Pottery Classes',
    link: '/classes'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <header className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden group" style={{ position: 'relative' }}>
      {slides.map((slide, index) => (
        <div 
          key={index}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{ 
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }}
        >
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      ))}
      
      <div className="relative flex flex-col items-center justify-center h-full text-center px-4" style={{ width: '100%', zIndex: 10, maxWidth: '800px' }}>
        <h1 style={{ color: '#d75971', fontSize: '4.5rem', fontWeight: '600', fontFamily: 'var(--font-serif)', marginBottom: '1rem', lineHeight: '1.1' }}>
          Blooming with<br />Joyful Colors.
        </h1>
        <p style={{ color: '#333', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px', fontWeight: '400' }}>
          Discover whimsical, handcrafted pottery that brings the bright magic of a summer garden right into your home.
        </p>
        <Link to="/ceramics" className="btn" style={{ backgroundColor: '#d75971', color: '#fff', padding: '0.75rem 2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: '500', letterSpacing: 'normal', textTransform: 'none', border: 'none' }}>
          Explore the Garden
        </Link>
      </div>

      {/* Side Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-8 z-20 flex items-center justify-center transition-opacity duration-300"
        style={{ top: '50%', left: '2rem', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', borderRadius: '50%', padding: '0.5rem', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', zIndex: 20, position: 'absolute' }}
      >
        <ChevronLeft size={32} strokeWidth={1} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-8 z-20 flex items-center justify-center transition-opacity duration-300"
        style={{ top: '50%', right: '2rem', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', borderRadius: '50%', padding: '0.5rem', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', zIndex: 20, position: 'absolute' }}
      >
        <ChevronRight size={32} strokeWidth={1} />
      </button>

      {/* Bottom Dots */}
      <div className="absolute bottom-8 left-0 w-full flex items-center justify-center gap-sm z-20" style={{ position: 'absolute', bottom: '2rem', width: '100%', zIndex: 20 }}>
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => goToSlide(index)}
            style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: currentSlide === index ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s ease',
              padding: 0,
              border: 'none',
              cursor: 'pointer',
              margin: '0 4px'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </header>
  );
};

export default Hero;
