
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Facebook size={16} />, name: 'Facebook', link: '#' },
    { icon: <Instagram size={16} />, name: 'Instagram', link: '#' },
    { icon: <Linkedin size={16} />, name: 'LinkedIn', link: '#' },
    { icon: <Twitter size={16} />, name: 'Twitter', link: '#' }
  ];
  
  const footerLinks = [
    { title: 'À propos', href: '#about' },
    { title: 'Services', href: '#services' },
    { title: 'Portfolio', href: '#portfolio' },
    { title: 'Témoignages', href: '#testimonials' },
    { title: 'Contact', href: '#contact' },
    { title: 'Mentions Légales', href: '#' },
    { title: 'Politique de Confidentialité', href: '#' },
  ];

  return (
    <footer className="bg-black py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent"></div>
      <div className="absolute -top-60 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full filter blur-[100px]"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold gold-gradient-text mb-6">DIGiTHOM</h3>
            <p className="text-gold-100/70 mb-6 max-w-md">
              Des solutions créatives sur mesure pour transformer vos idées en expériences visuelles mémorables qui captivent votre audience.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted hover:bg-gold-500/20 w-8 h-8 rounded-full flex items-center justify-center text-gold-400 hover:text-gold-300 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gold-300 mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              {footerLinks.slice(0, 4).map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gold-100/70 hover:text-gold-300 transition-colors relative group flex items-center"
                  >
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gold-300 mb-6">Informations</h3>
            <ul className="space-y-3">
              {footerLinks.slice(4).map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gold-100/70 hover:text-gold-300 transition-colors relative group flex items-center"
                  >
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gold-900/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gold-100/50 text-sm">
            &copy; {currentYear} DIGiTHOM. Tous droits réservés.
          </p>
          <p className="text-gold-100/50 text-sm mt-2 md:mt-0">
            Designer, c'est dessiner à dessein.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
