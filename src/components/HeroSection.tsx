
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 215, 0, 0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 215, 0, 0.2) 2%, transparent 0%)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left side - Text */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="animate-on-scroll opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold" ref={textRef}>
            <span className="gold-gradient-text">Designer, c'est dessiner à dessein.</span>
          </h1>
          
          <p className="animate-on-scroll opacity-0 text-lg text-gold-100/80 max-w-lg">
            Une approche créative et stratégique pour transformer vos idées en expériences visuelles mémorables.
          </p>
          
          <div className="animate-on-scroll opacity-0 pt-4">
            <button className="gold-button group">
              En Savoir Plus
              <ArrowRight className="ml-2 inline-block transition-transform group-hover:translate-x-1" size={18} />
            </button>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative animate-on-scroll opacity-0">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gold-500/50 animate-pulse-gold">
              <img 
                src="/placeholder.svg" 
                alt="DIGiTHOM Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-black rounded-full flex items-center justify-center border border-gold-500/30">
              <span className="text-xs text-gold-400 font-semibold">DEPUIS<br/>2015</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-gold-500 flex justify-center p-1">
          <div className="w-1 h-2 bg-gold-500 rounded-full animate-float"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
