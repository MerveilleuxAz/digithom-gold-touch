
import React, { useEffect } from 'react';
import { Monitor, PenTool, Layout, Smartphone, ChevronRight } from 'lucide-react';

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
          <p className="animate-on-scroll opacity-0 max-w-2xl mx-auto text-gold-100/80">
            Des solutions créatives sur mesure pour donner vie à vos projets les plus ambitieux.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="animate-on-scroll opacity-0 glass-panel rounded-xl p-6 flex flex-col items-center justify-center text-center h-[400px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 bg-gold-500/10 p-4 rounded-full">{service.icon}</div>
              <h3 className="text-xl font-bold text-gold-300 mb-3">{service.title}</h3>
              <p className="text-sm text-gold-100/70 mb-4">{service.description}</p>
              
              <div className="mt-4">
                <ul className="space-y-2">
                  {service.details.slice(0, 3).map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight size={14} className="text-gold-500 mt-1 flex-shrink-0" />
                      <span className="text-xs text-gold-100/80 text-left">{detail}</span>
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
