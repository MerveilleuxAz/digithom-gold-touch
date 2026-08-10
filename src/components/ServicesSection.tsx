
import React, { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { usePublicList } from '@/hooks/useListResource';
import { DynamicIcon } from '@/lib/iconMap';
import type { ServiceRow } from '@/integrations/supabase/types';

export const DEFAULT_SERVICES: ServiceRow[] = [
  { id: '1', icon: 'PenTool', title: 'BRANDING', description: 'Donnez une identité forte et unique à votre entreprise.', details: ['Identité visuelle', 'Création de logo', 'Charte graphique', 'Branding de marque'], display_order: 1, is_published: true, created_at: '', updated_at: '' },
  { id: '2', icon: 'Megaphone', title: 'COMMUNICATION', description: 'Stratégies percutantes pour atteindre votre cible.', details: ["Communication d'entreprise", 'Stratégie de communication', 'Création de contenus digitaux (réseaux sociaux)'], display_order: 2, is_published: true, created_at: '', updated_at: '' },
  { id: '3', icon: 'Calendar', title: "EVEN'T", description: 'Sublimez et couvrez tous vos événements professionnels.', details: ['Couverture Event', 'Communication Event', 'Visibilité terrain'], display_order: 3, is_published: true, created_at: '', updated_at: '' },
  { id: '4', icon: 'Printer', title: 'PRINTING', description: 'Impression sur tous vos supports de communication.', details: ['Flyers, brochures, bâches', 'T-shirt, casquette, tasse,...', 'Tout supports de com'], display_order: 4, is_published: true, created_at: '', updated_at: '' },
  { id: '5', icon: 'Users', title: 'CONSULTING', description: 'Conseils et accompagnement sur mesure.', details: ['Audit de communication', 'Analyse stratégique', 'Stratégie de marque'], display_order: 5, is_published: true, created_at: '', updated_at: '' },
  { id: '6', icon: 'GraduationCap', title: 'FORMATION', description: 'Développez vos compétences avec nos experts.', details: ['Graphisme - Sérigraphie', 'Webmaster - Audiovisuel', 'Pilotage de drones'], display_order: 6, is_published: true, created_at: '', updated_at: '' },
];

interface ServicesSectionProps {
  previewServices?: ServiceRow[];
}

const ServicesSection = ({ previewServices }: ServicesSectionProps) => {
  const { data } = usePublicList('services');
  const services = previewServices ?? (data && data.length > 0 ? data : DEFAULT_SERVICES);

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
  }, [services]);

  return (
    <section id="services" className="py-20 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute -top-40 right-0 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 left-0 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold mb-4 uppercase">
            <span className="gold-gradient-text">Nous changeons l'aperçu de votre marque</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto mb-6"></div>
          <p className="animate-on-scroll opacity-0 max-w-3xl mx-auto text-foreground/90 text-lg">
            Spécialiste en Branding, communication & printing, DIGITHOM vous accompagne pour donner vie à vos idées et renforcer votre image de marque.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="animate-on-scroll opacity-0 glass-panel rounded-xl p-6 flex flex-col items-center justify-center text-center h-[400px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 bg-gold-500/10 p-4 rounded-full">
                <DynamicIcon name={service.icon} size={32} className="text-gold-400" />
              </div>
              <h3 className="text-xl font-bold text-gold-600 dark:text-gold-300 mb-3 uppercase">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{service.description}</p>

              <div className="mt-4 w-full">
                <ul className="space-y-2 w-full text-left">
                  {service.details.slice(0, 5).map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight size={14} className="text-gold-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-foreground/80 font-medium">{detail}</span>
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
