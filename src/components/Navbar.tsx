
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
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
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À Propos', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Réalisations', href: '#portfolio' },
    { name: 'Vidéos', href: '#videos' },
    { name: 'Témoignages', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      'fixed top-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#home" className="flex items-center">
              <img 
                src="/lovable-uploads/1f24d38b-a1c7-4a48-86f2-df32e549aa59.png" 
                alt="DIGiTHOM Logo" 
                className="h-12 w-auto mr-2"
              />
              <span className="text-2xl font-bold gold-gradient-text hidden md:block">DIGiTHOM</span>
            </a>
          </div>
          
          {!isMobile ? (
            <div className="hidden md:flex items-center space-x-1">
              <NavigationMenu>
                <NavigationMenuList>
                  {navLinks.map((link) => (
                    <NavigationMenuItem key={link.name}>
                      <NavigationMenuLink 
                        href={link.href}
                        className={cn(
                          "px-3 py-2 text-gold-300 hover:text-gold-500 transition-colors duration-200 relative group",
                          "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-gold-500 after:bottom-0 after:left-0",
                          "after:transition-all after:duration-300 hover:after:w-full"
                        )}
                      >
                        {link.name}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              
              <Button 
                variant="ghost" 
                className="ml-4 bg-gold-500/10 text-gold-400 hover:bg-gold-500/20 hover:text-gold-300 border border-gold-500/30"
              >
                Demander un devis
              </Button>
            </div>
          ) : (
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gold-500 hover:text-gold-300 transition-colors p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && isMobile && (
        <div className="md:hidden animate-fade-in glass-panel">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gold-300 hover:text-gold-500 block px-3 py-3 text-base font-medium border-b border-gold-900/30 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full mt-2 border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
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
