
import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeToggle from '@/components/ThemeToggle';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isMobile = useIsMobile();

  // Optimisation de la fonction handleScroll avec useCallback
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50);

    // Utilisation de requestAnimationFrame pour optimiser les performances
    requestAnimationFrame(() => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      let minDistance = Infinity;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionId = section.getAttribute('id');
        
        // Calcul de la distance entre le haut de la section et le haut de la fenêtre
        const distance = Math.abs(rect.top);
        
        // Si la section est visible dans la fenêtre et plus proche que la précédente
        if (rect.top <= 100 && distance < minDistance && sectionId) {
          minDistance = distance;
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Fermeture du menu mobile lors du défilement
  useEffect(() => {
    if (isOpen) {
      const handleScrollClose = () => setIsOpen(false);
      window.addEventListener('scroll', handleScrollClose);
      return () => window.removeEventListener('scroll', handleScrollClose);
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À Propos', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Formations', href: '#formations' },
    { name: 'Réalisations', href: '#portfolio' },
    { name: 'Vidéos', href: '#videos' },
    { name: 'Témoignages', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-black/80 dark:bg-black/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      )}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#home" className="flex items-center" aria-label="Retour à l'accueil">
              <img 
                src="/lovable-uploads/1f24d38b-a1c7-4a48-86f2-df32e549aa59.png" 
                alt="DIGiTHOM Logo" 
                className="h-12 w-auto mr-2"
                width="48"
                height="48"
              />
              <span className="text-2xl font-bold gold-gradient-text hidden md:block">DIGiTHOM</span>
            </a>
          </div>
          
          {!isMobile ? (
            <div className="hidden md:flex items-center space-x-1">
              <NavigationMenu>
                <NavigationMenuList>
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <NavigationMenuItem key={link.name}>
                        <NavigationMenuLink 
                          href={link.href}
                          className={cn(
                            "px-3 py-2 transition-colors duration-200 relative group",
                            "after:content-[''] after:absolute after:h-0.5 after:bg-gold-500 after:bottom-0 after:left-0",
                            "after:transition-all after:duration-300 hover:after:w-full",
                            isActive 
                              ? "text-white dark:text-white after:w-full" 
                              : "text-gold-300 dark:text-gold-300 hover:text-gold-500 dark:hover:text-gold-500 after:w-0"
                          )}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {link.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
              
              <div className="flex items-center gap-2 ml-4">
                <ThemeToggle />
                <Button 
                  variant="ghost" 
                  className="bg-gold-500/10 text-gold-400 font-semibold hover:text-gold-400 border border-gold-500/30 dark:bg-gold-500/10 dark:text-gold-400 dark:hover:text-gold-400"
                  aria-label="Demander un devis"
                >
                  Demander un devis
                </Button>
              </div>
            </div>
          ) : (
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gold-500 hover:text-gold-400 transition-colors p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && isMobile && (
        <div 
          id="mobile-menu"
          className="md:hidden animate-fade-in glass-panel"
          role="menu"
          aria-label="Menu mobile"
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "block px-3 py-3 text-base font-medium border-b border-gold-900/30 transition-all duration-200",
                    isActive 
                      ? "text-white dark:text-white border-l-4 border-l-gold-500 pl-4" 
                      : "text-gold-300 dark:text-gold-300 hover:text-gold-500 dark:hover:text-gold-500"
                  )}
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full mt-2 border-gold-500/50 text-gold hover:bg-gold-500/10"
                aria-label="Demander un devis"
              >
                Demander un devis
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
