
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Composant TikTokIcon personnalisé
  const TikTokIcon = ({ size = 24, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
        fill="currentColor"
      />
    </svg>
  );

  const socialLinks = [
    { icon: <Facebook size={18} />, name: 'Facebook', link: '#' },
    { icon: <TikTokIcon size={18} />, name: 'TikTok', link: '#' },
    { icon: <Instagram size={18} />, name: 'Instagram', link: '#' },
    { icon: <Linkedin size={18} />, name: 'LinkedIn', link: '#' }
  ];

  const footerLinks = [
    { title: 'À propos', href: '#about' },
    { title: 'Services', href: '#services' },
    { title: 'Portfolio', href: '#portfolio' },
    { title: 'Vidéos', href: '#video' },
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
            <p className="text-white/70 mb-6 max-w-md">
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
                    className="text-white/70 hover:text-gold-300 transition-colors relative group flex items-center"
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
                    className="text-white/70 hover:text-gold-300 transition-colors relative group flex items-center"
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
          <p className="text-white/50 text-sm">
            &copy; {currentYear} DIGiTHOM. Tous droits réservés.
          </p>
          <p className="text-white/50 text-sm mt-2 md:mt-0">
            Designer, c'est dessiner à dessein.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
