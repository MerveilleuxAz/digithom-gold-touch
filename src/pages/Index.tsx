
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import FormationsSection from '@/components/FormationsSection';
import PortfolioSection from '@/components/PortfolioSection';
import VideosSection from '@/components/VideosSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { HomeStructuredData } from '@/components/StructuredData';

const Index = () => {
  // Smooth scroll to section when clicking on navigation links
  useEffect(() => {
    const handleHashLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.pageYOffset - 80,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleHashLinkClick);
    
    return () => {
      document.removeEventListener('click', handleHashLinkClick);
    };
  }, []);

  // Back to top button
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    
    const handleScroll = () => {
      const backToTopButton = document.getElementById('back-to-top');
      if (backToTopButton) {
        if (window.scrollY > 500) {
          backToTopButton.classList.remove('opacity-0', 'invisible');
          backToTopButton.classList.add('opacity-100', 'visible');
        } else {
          backToTopButton.classList.remove('opacity-100', 'visible');
          backToTopButton.classList.add('opacity-0', 'invisible');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
      backToTopButton.addEventListener('click', scrollToTop);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (backToTopButton) {
        backToTopButton.removeEventListener('click', scrollToTop);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black dark:bg-black light:bg-white text-white dark:text-white light:text-gray-900 overflow-hidden">
      <SEO
        fullTitle="DIGiTHOM | Agence de Design Graphique & Branding au Bénin"
        description="DIGiTHOM est une agence de design graphique, branding et communication basée au Bénin. Création de logos, chartes graphiques, web design, impression et formations depuis 2020."
        url="https://digithom.com/"
        keywords="design graphique Bénin, branding Afrique, agence communication Cotonou, création logo Bénin, charte graphique, web design, impression, formation design"
      />
      <HomeStructuredData />
      <Navbar />

      <main id="content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <FormationsSection />
        <PortfolioSection />
        <VideosSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Back to top button */}
      <button
        id="back-to-top"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gold-500 text-black flex items-center justify-center opacity-0 invisible transition-all duration-300 hover:bg-gold-400 z-50"
        aria-label="Retour en haut de la page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>
    </div>
  );
};

export default Index;
