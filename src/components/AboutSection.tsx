
import React, { useEffect } from 'react';
import { Lightbulb, Palette, Compass, Target, CheckCircle } from 'lucide-react';

const AboutSection = () => {
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

  const expertise = [
    { 
      icon: <Lightbulb size={28} className="text-gold-400" />, 
      title: 'Créativité', 
      description: 'Des idées innovantes qui se démarquent de la concurrence.'
    },
    { 
      icon: <Palette size={28} className="text-gold-400" />, 
      title: 'Design', 
      description: 'Une esthétique soignée qui reflète votre identité unique.'
    },
    { 
      icon: <Compass size={28} className="text-gold-400" />, 
      title: 'Stratégie', 
      description: 'Des solutions pensées pour atteindre vos objectifs business.'
    },
    { 
      icon: <Target size={28} className="text-gold-400" />, 
      title: 'Précision', 
      description: 'Une attention méticuleuse aux détails pour un résultat parfait.'
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold mb-4">
            <span className="gold-gradient-text">À Propos</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="space-y-6">
            <h3 className="animate-on-scroll opacity-0 text-2xl font-bold text-gold-400">
              Passionné par le Design & l'Expérience Utilisateur
            </h3>
            
            <p className="animate-on-scroll opacity-0 text-white">
              Chez DIGiTHOM, nous créons des designs qui racontent votre histoire. Nous transformons vos idées en expériences visuelles captivantes qui communiquent votre message de manière claire et mémorable.
            </p>
            
            <p className="animate-on-scroll opacity-0 text-white">
              Notre approche allie esthétique et fonctionnalité pour des créations qui non seulement plaisent à l'œil mais qui répondent également à vos objectifs stratégiques.
            </p>
            
            <ul className="animate-on-scroll opacity-0 space-y-2">
              {[
                "Design graphique d'exception",
                "Expérience utilisateur optimisée",
                "Interface élégante et intuitive",
                "Solutions créatives sur mesure"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-gold-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right side - Expertise cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertise.map((item, index) => (
              <div 
                key={index}
                className="animate-on-scroll opacity-0 glass-panel p-6 rounded-xl flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 bg-gold-500/10 p-3 rounded-full">{item.icon}</div>
                <h4 className="text-xl font-bold text-gold-300 mb-2">{item.title}</h4>
                <p className="text-sm text-white">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
