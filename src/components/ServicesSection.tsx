
import React, { useEffect } from 'react';
import { PenTool, ChevronRight, Megaphone, Users, Calendar, Printer, GraduationCap } from 'lucide-react';

const ServicesSection = () => {
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

  const services = [
    {
      icon: <PenTool size={32} className="text-gold-400" />,
      title: "BRANDING",
      description: "Donnez une identité forte et unique à votre entreprise.",
      details: [
        "Identité visuelle",
        "Création de logo",
        "Charte graphique",
        "Branding de marque"
      ]
    },
    {
      icon: <Megaphone size={32} className="text-gold-400" />,
      title: "COMMUNICATION",
      description: "Stratégies percutantes pour atteindre votre cible.",
      details: [
        "Communication d'entreprise",
        "Stratégie de communication",
        "Création de contenus digitaux (réseaux sociaux)"
      ]
    },
    {
      icon: <Calendar size={32} className="text-gold-400" />,
      title: "EVEN'T",
      description: "Sublimez et couvrez tous vos événements professionnels.",
      details: [
        "Couverture Event",
        "Communication Event",
        "Visibilité terrain"
      ]
    },
    {
      icon: <Printer size={32} className="text-gold-400" />,
      title: "PRINTING",
      description: "Impression sur tous vos supports de communication.",
      details: [
        "Flyers, brochures, bâches",
        "T-shirt, casquette, tasse,...",
        "Tout supports de com"
      ]
    },
    {
      icon: <Users size={32} className="text-gold-400" />,
      title: "CONSULTING",
      description: "Conseils et accompagnement sur mesure.",
      details: [
        "Audit de communication",
        "Analyse stratégique",
        "Stratégie de marque"
      ]
    },
    {
      icon: <GraduationCap size={32} className="text-gold-400" />,
      title: "FORMATION",
      description: "Développez vos compétences avec nos experts.",
      details: [
        "Graphisme - Sérigraphie",
        "Webmaster - Audiovisuel",
        "Pilotage de drones"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden bg-black/80 dark:bg-black/80 light:bg-gray-50">
      {/* Decorative elements */}
      <div className="absolute -top-40 right-0 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 left-0 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold mb-4 uppercase">
            <span className="gold-gradient-text">Nous changeons l'aperçu de votre marque</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto mb-6"></div>
          <p className="animate-on-scroll opacity-0 max-w-3xl mx-auto text-white dark:text-white light:text-gray-800 text-lg">
            Spécialiste en Branding, communication & printing, DIGITHOM vous accompagne pour donner vie à vos idées et renforcer votre image de marque.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="animate-on-scroll opacity-0 glass-panel rounded-xl p-6 flex flex-col items-center justify-center text-center h-[400px] dark:bg-white/5 light:bg-white light:border light:border-gold-200 light:shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 bg-gold-500/10 p-4 rounded-full">{service.icon}</div>
              <h3 className="text-xl font-bold text-gold-300 dark:text-gold-300 light:text-gold-700 mb-3 uppercase">{service.title}</h3>
              <p className="text-sm text-gold-100/70 dark:text-gold-100/70 light:text-gray-600 mb-4">{service.description}</p>
              
              <div className="mt-4 w-full">
                <ul className="space-y-2 w-full text-left">
                  {service.details.slice(0, 5).map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight size={14} className="text-gold-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gold-100/90 dark:text-gold-100/90 light:text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
