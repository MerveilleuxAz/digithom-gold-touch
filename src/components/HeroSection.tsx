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
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden mt-8 md:mt-0">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-black dark:bg-black light:bg-white">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 215, 0, 0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 215, 0, 0.2) 2%, transparent 0%)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-6 mt-8 md:mt-0">
        {/* Left side - Text */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="animate-on-scroll opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold" ref={textRef}>
            <span className="gold-gradient-text">Designer, c'est dessiner à dessein.</span>
          </h1>
          
          <p className="animate-on-scroll opacity-0 text-lg text-white dark:text-white light:text-gray-800 max-w-lg">
            Une approche créative et stratégique pour transformer vos idées en expériences visuelles mémorables.
          </p>
          
          <div className="animate-on-scroll opacity-0 pt-4">
            <button className="gold-button text-white group">
              En savoir plus
            </button>
          </div>
        </div>
        
        {/* Right side - Modern Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
          <div className="relative animate-on-scroll opacity-0">
            {/* Main image container with modern styling */}
            <div className="relative w-80 h-[28rem] md:w-96 md:h-[32rem] lg:w-[26rem] lg:h-[36rem]">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-gold-600/30 rounded-2xl transform rotate-6"></div>
              
              {/* Image container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gold-500/20 backdrop-blur-sm bg-black/10 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/lovable-uploads/hero.jpg" 
                  alt="DIGiTHOM - Designer Créatif" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Designer label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-panel rounded-lg p-3 text-center">
                    <span className="text-gold-400 font-semibold text-sm">DESIGNER CRÉATIF</span>
                    <p className="text-white/80 text-xs mt-1">Expérience visuelle depuis 2020</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gold-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Floating badge */}
              <div className="absolute -top-6 left-6 bg-black dark:bg-black light:bg-white rounded-full px-4 py-2 border border-gold-500/30 shadow-lg">
                <span className="text-gold-400 font-bold text-xs">2020</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce ">
        <div className="w-6 h-10 rounded-full border-2 border-gold-500 flex justify-center p-1">
          <div className="w-1 h-2 bg-gold-500 rounded-full animate-float"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
