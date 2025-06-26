
import React, { useEffect } from 'react';
import { GraduationCap, Users, BookOpen, Target } from 'lucide-react';

const FormationsSection = () => {
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

  const formations = [
    {
      icon: <GraduationCap size={32} className="text-gold-400" />,
      title: "Formations",
      description: "Des modules de formation adaptés à vos besoins, dispensés en interne ou au sein de votre entreprise.",
      details: [
        "Modules de formation (interne/entreprises)",
        "Thématiques : communication, branding, marketing digital"
      ]
    }
  ];

  const thematiques = [
    {
      icon: <Target size={28} className="text-gold-400" />,
      title: "Communication",
      description: "Maîtrisez les techniques de communication moderne et développez votre impact."
    },
    {
      icon: <BookOpen size={28} className="text-gold-400" />,
      title: "Branding",
      description: "Apprenez à construire et gérer une identité de marque forte et cohérente."
    },
    {
      icon: <Users size={28} className="text-gold-400" />,
      title: "Marketing Digital",
      description: "Découvrez les stratégies digitales efficaces pour développer votre présence en ligne."
    }
  ];

  return (
    <section id="formations" className="py-20 relative overflow-hidden bg-black dark:bg-black light:bg-white">
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold mb-4">
            <span className="gold-gradient-text">Formations</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto mb-6"></div>
          <p className="animate-on-scroll opacity-0 max-w-2xl mx-auto text-white dark:text-white light:text-gray-800">
            Développez vos compétences avec nos formations spécialisées en communication, branding et marketing digital.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Formation principale */}
          <div className="animate-on-scroll opacity-0">
            <div className="glass-panel rounded-xl p-8 text-center dark:bg-white/5 light:bg-white light:border light:border-gold-200 light:shadow-lg">
              <div className="mb-6 bg-gold-500/10 p-4 rounded-full inline-block">
                <GraduationCap size={48} className="text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold text-gold-300 dark:text-gold-300 light:text-gold-700 mb-4">Modules de Formation</h3>
              <p className="text-gold-100/70 dark:text-gold-100/70 light:text-gray-600 mb-6">
                Des formations sur mesure adaptées à vos besoins spécifiques, dispensées en interne ou directement au sein de votre entreprise.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
                  <span className="text-gold-100/80 dark:text-gold-100/80 light:text-gray-700">Formation interne</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
                  <span className="text-gold-100/80 dark:text-gold-100/80 light:text-gray-700">Formation en entreprise</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Thématiques */}
          <div className="space-y-6">
            <h3 className="animate-on-scroll opacity-0 text-2xl font-bold text-gold-400 dark:text-gold-400 light:text-gold-600 text-center md:text-left">
              Nos Thématiques
            </h3>
            <div className="grid gap-6">
              {thematiques.map((thematique, index) => (
                <div 
                  key={index}
                  className="animate-on-scroll opacity-0 glass-panel p-6 rounded-xl flex items-start gap-4 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] dark:bg-white/5 light:bg-white light:border light:border-gold-200 light:shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gold-500/10 p-3 rounded-full flex-shrink-0">
                    {thematique.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gold-300 dark:text-gold-300 light:text-gold-700 mb-2">{thematique.title}</h4>
                    <p className="text-sm text-gold-100/70 dark:text-gold-100/70 light:text-gray-600">{thematique.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormationsSection;
