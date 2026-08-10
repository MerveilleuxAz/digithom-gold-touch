
import React, { useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import { useSingleton } from '@/hooks/useSingletonResource';
import { usePublicList } from '@/hooks/useListResource';
import { DynamicIcon } from '@/lib/iconMap';
import type { FormationsContentRow, FormationThemeRow } from '@/integrations/supabase/types';

export const DEFAULT_FORMATIONS_CONTENT: FormationsContentRow = {
  id: 1,
  section_title: 'Formations',
  section_description: 'Développez vos compétences avec nos formations spécialisées en communication, branding et marketing digital.',
  heading: 'Modules de Formation',
  description: 'Des formations sur mesure adaptées à vos besoins spécifiques, dispensées en interne ou directement au sein de votre entreprise.',
  bullet_1: 'Formation interne',
  bullet_2: 'Formation en entreprise',
  updated_at: '',
};

export const DEFAULT_FORMATION_THEMES: FormationThemeRow[] = [
  { id: '1', icon: 'Target', title: 'Communication', description: 'Maîtrisez les techniques de communication moderne et développez votre impact.', display_order: 1, is_published: true, created_at: '', updated_at: '' },
  { id: '2', icon: 'BookOpen', title: 'Branding', description: 'Apprenez à construire et gérer une identité de marque forte et cohérente.', display_order: 2, is_published: true, created_at: '', updated_at: '' },
  { id: '3', icon: 'Users', title: 'Marketing Digital', description: 'Découvrez les stratégies digitales efficaces pour développer votre présence en ligne.', display_order: 3, is_published: true, created_at: '', updated_at: '' },
  { id: '4', icon: 'Camera', title: 'Prises de vues aériennes par drone', description: "Vidéos et photographies haute définition pour l'immobilier, la construction et les événements.", display_order: 4, is_published: true, created_at: '', updated_at: '' },
];

interface FormationsSectionProps {
  previewContent?: FormationsContentRow;
  previewThemes?: FormationThemeRow[];
}

const FormationsSection = ({ previewContent, previewThemes }: FormationsSectionProps) => {
  const { data: content } = useSingleton('formations_content');
  const { data: themes } = usePublicList('formation_themes');

  const formations = previewContent ?? content ?? DEFAULT_FORMATIONS_CONTENT;
  const thematiques = previewThemes ?? (themes && themes.length > 0 ? themes : DEFAULT_FORMATION_THEMES);

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
  }, [thematiques]);

  return (
    <section id="formations" className="py-20 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold mb-4">
            <span className="gold-gradient-text">{formations.section_title}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto mb-6"></div>
          <p className="animate-on-scroll opacity-0 max-w-2xl mx-auto text-foreground/90">
            {formations.section_description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Formation principale */}
          <div className="animate-on-scroll opacity-0">
            <div className="glass-panel rounded-xl p-8 text-center">
              <div className="mb-6 bg-gold-500/10 p-4 rounded-full inline-block">
                <GraduationCap size={48} className="text-gold-500 dark:text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold text-gold-600 dark:text-gold-300 mb-4">{formations.heading}</h3>
              <p className="text-muted-foreground mb-6">{formations.description}</p>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
                  <span className="text-foreground/90 font-medium">{formations.bullet_1}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-gold-500 rounded-full"></span>
                  <span className="text-foreground/90 font-medium">{formations.bullet_2}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Thématiques */}
          <div className="space-y-6">
            <h3 className="animate-on-scroll opacity-0 text-2xl font-bold text-gold-500 dark:text-gold-400 text-center md:text-left">
              Nos Thématiques
            </h3>
            <div className="grid gap-6">
              {thematiques.map((thematique, index) => (
                <div
                  key={thematique.id}
                  className="animate-on-scroll opacity-0 glass-panel p-6 rounded-xl flex items-start gap-4 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(228,126,1,0.2)]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gold-500/10 p-3 rounded-full flex-shrink-0">
                    <DynamicIcon name={thematique.icon} size={28} className="text-gold-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gold-600 dark:text-gold-300 mb-2">{thematique.title}</h4>
                    <p className="text-sm text-muted-foreground">{thematique.description}</p>
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
