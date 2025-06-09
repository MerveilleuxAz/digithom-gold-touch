
import React, { useState, useEffect } from 'react';
import { Monitor, PenTool, Layout, Smartphone, RotateCw, ChevronRight } from 'lucide-react';

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
      title: "Design Graphique",
      description: "Création d'identités visuelles uniques, logos, chartes graphiques et supports de communication qui captivent votre audience.",
      details: [
        "Identité visuelle & branding",
        "Conception de logos",
        "Chartes graphiques complètes",
        "Supports marketing imprimés",
        "Illustrations personnalisées"
      ]
    },
    {
      icon: <Monitor size={32} className="text-gold-400" />,
      title: "Web Design",
      description: "Des interfaces web élégantes et fonctionnelles qui offrent une expérience utilisateur optimale et valorisent votre présence en ligne.",
      details: [
        "Sites vitrines professionnels",
        "E-commerce performants",
        "Landing pages convertissantes",
        "Refonte de sites existants",
        "Intégration responsive"
      ]
    },
    {
      icon: <Smartphone size={32} className="text-gold-400" />,
      title: "Interface Mobile",
      description: "Applications mobiles intuitives avec des parcours utilisateurs fluides et des designs attractifs adaptés aux différents appareils.",
      details: [
        "Design d'applications iOS/Android",
        "Interfaces intuitives",
        "Prototypage interactif",
        "Optimisation UX/UI mobile",
        "Design système cohérent"
      ]
    },
    {
      icon: <Layout size={32} className="text-gold-400" />,
      title: "UX/UI Design",
      description: "Conception d'expériences utilisateurs fluides et agréables qui engagent vos utilisateurs et les convertissent en clients fidèles.",
      details: [
        "Audit d'expérience utilisateur",
        "Wireframing & prototypage",
        "Tests utilisateurs",
        "Optimisation des parcours",
        "Design Systems"
      ]
    }
  ];

  // State to track which card is flipped
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const handleCardFlip = (index: number) => {
    if (flippedCard === index) {
      setFlippedCard(null);
    } else {
      setFlippedCard(index);
    }
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden bg-black/80">
      {/* Decorative elements */}
      <div className="absolute -top-40 right-0 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 left-0 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold mb-4">
            <span className="gold-gradient-text">Nos Services & Expertises</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto mb-6"></div>
          <p className="animate-on-scroll opacity-0 max-w-2xl mx-auto text-white">
            Des solutions créatives sur mesure pour donner vie à vos projets les plus ambitieux.
            Cliquez sur un service pour découvrir les détails.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`animate-on-scroll opacity-0 h-[400px] relative perspective-1000 cursor-pointer transition-all duration-500 ${
                flippedCard === index ? 'transform-style-3d' : ''
              }  transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]`}
              style={{ animationDelay: `${index * 0.1}s` }}
              // onClick={() => handleCardFlip(index)}
            >
              <div 
                className={`absolute inset-0 glass-panel rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all duration-500 backface-visibility-hidden ${
                  flippedCard === index ? 'rotated-card flipped' : 'rotated-card'
                }`}
              >
                <div className="mb-6 bg-gold-500/10 p-4 rounded-full">{service.icon}</div>
                <h3 className="text-xl font-bold text-gold-300 mb-3">{service.title}</h3>
                <p className="text-sm text-white mb-6">{service.description}</p>
                {/* <button className="mt-auto flex items-center gap-1 text-gold-400 hover:text-gold-300 transition-colors">
                  <span>Découvrir</span>
                  <RotateCw size={14} />
                </button> */}
              </div>
              
              <div 
                className={`absolute inset-0 glass-panel rounded-xl p-6 flex flex-col backface-visibility-hidden back-content transition-all duration-500 ${
                  flippedCard === index ? 'rotated-card flipped' : 'rotated-card'
                }`}
              >
                <h3 className="text-xl font-bold text-gold-300 mb-6 text-center">{service.title}</h3>
                <ul className="space-y-3 flex-1">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-gold-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gold-100/90">{detail}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 self-center flex items-center gap-1 text-gold-400 hover:text-gold-300 transition-colors">
                  <span>Retourner</span>
                  <RotateCw size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
