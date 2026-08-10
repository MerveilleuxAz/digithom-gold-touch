
import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useSingleton } from '@/hooks/useSingletonResource';
import { usePublicList } from '@/hooks/useListResource';
import { DynamicIcon } from '@/lib/iconMap';
import type { AboutContentRow, AboutValueRow } from '@/integrations/supabase/types';

export const DEFAULT_ABOUT_CONTENT: AboutContentRow = {
  id: 1,
  heading: "Passionné par le Design & l'Expérience Utilisateur",
  paragraph_1: "Chez DIGiTHOM, nous créons des designs qui racontent votre histoire. Nous transformons vos idées en expériences visuelles captivantes qui communiquent votre message de manière claire et mémorable.",
  paragraph_2: "Notre approche allie esthétique et fonctionnalité pour des créations qui non seulement plaisent à l'œil mais qui répondent également à vos objectifs stratégiques.",
  checklist: [
    "Design graphique d'exception",
    'Expérience utilisateur optimisée',
    'Interface élégante et intuitive',
    'Solutions créatives sur mesure',
  ],
  updated_at: '',
};

export const DEFAULT_ABOUT_VALUES: AboutValueRow[] = [
  { id: '1', icon: 'Lightbulb', title: 'Créativité', description: 'Des idées innovantes qui se démarquent de la concurrence.', display_order: 1, is_published: true, created_at: '', updated_at: '' },
  { id: '2', icon: 'Palette', title: 'Design', description: 'Une esthétique soignée qui reflète votre identité unique.', display_order: 2, is_published: true, created_at: '', updated_at: '' },
  { id: '3', icon: 'Compass', title: 'Stratégie', description: 'Des solutions pensées pour atteindre vos objectifs business.', display_order: 3, is_published: true, created_at: '', updated_at: '' },
  { id: '4', icon: 'Target', title: 'Précision', description: 'Une attention méticuleuse aux détails pour un résultat parfait.', display_order: 4, is_published: true, created_at: '', updated_at: '' },
];

interface AboutSectionProps {
  previewContent?: AboutContentRow;
  previewValues?: AboutValueRow[];
}

const AboutSection = ({ previewContent, previewValues }: AboutSectionProps) => {
  const { data: content } = useSingleton('about_content');
  const { data: values } = usePublicList('about_values');

  const about = previewContent ?? content ?? DEFAULT_ABOUT_CONTENT;
  const expertise = previewValues ?? (values && values.length > 0 ? values : DEFAULT_ABOUT_VALUES);

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
  }, [expertise]);

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent"></div>
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
            <h3 className="animate-on-scroll opacity-0 text-2xl font-bold text-gold-500 dark:text-gold-400">
              {about.heading}
            </h3>

            <p className="animate-on-scroll opacity-0 text-foreground/90 leading-relaxed">
              {about.paragraph_1}
            </p>

            <p className="animate-on-scroll opacity-0 text-foreground/90 leading-relaxed">
              {about.paragraph_2}
            </p>

            <ul className="animate-on-scroll opacity-0 space-y-2">
              {about.checklist.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-gold-500 flex-shrink-0" />
                  <span className="text-foreground/90 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Expertise cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertise.map((item, index) => (
              <div
                key={item.id}
                className="animate-on-scroll opacity-0 glass-panel p-6 rounded-xl flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(228,126,1,0.2)]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 bg-gold-500/10 p-3 rounded-full">
                  <DynamicIcon name={item.icon} size={28} className="text-gold-400" />
                </div>
                <h4 className="text-xl font-bold text-gold-600 dark:text-gold-300 mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
