import React, { useState, useEffect, useMemo } from 'react';
import { ExternalLink, X } from 'lucide-react';
import PaginationControls from '@/components/PaginationControls';
import { usePublicList } from '@/hooks/useListResource';
import type { ProjectRow } from '@/integrations/supabase/types';

const PROJECTS_PER_PAGE = 6;

export const DEFAULT_PROJECTS: ProjectRow[] = [
  { id: '1', title: "Formation en rédaction d'actes juridiques", category: 'communication', image_url: '/assets/img/communication/com-1.jpg', image_alt: null, description: "Modernisation complète de l'identité visuelle d'une marque de luxe, incluant logo, charte graphique et supports de communication.", client: 'Legal and Business consulting', year: '2024', project_url: null, display_order: 1, is_published: true, created_at: '', updated_at: '' },
  { id: '2', title: 'Noël des Jeunes', category: 'print', image_url: '/assets/img/print/print-1.jpg', image_alt: null, description: "Conception d'une plateforme e-commerce haut de gamme avec une expérience utilisateur immersive et des parcours d'achat optimisés.", client: 'Eglise de Pentecôte', year: '2024', project_url: null, display_order: 2, is_published: true, created_at: '', updated_at: '' },
  { id: '3', title: 'Appel aux dons de kit scolaire', category: 'communication', image_url: '/assets/img/communication/com-2.jpg', image_alt: null, description: "Design UI/UX d'une application communication de gestion financière avec interfaces intuitives et visualisations de données avancées.", client: 'Association des Jeunes Pentecôtistes de HOUEDJAMEY', year: '2023', project_url: null, display_order: 3, is_published: true, created_at: '', updated_at: '' },
  { id: '4', title: 'Camp des Jeunes', category: 'print', image_url: '/assets/img/print/print-2.jpg', image_alt: null, description: "Création d'une brochure luxueuse présentant une collection exclusive, avec finitions dorées et mise en page sophistiquée.", client: 'Eglise de Pentecôte', year: '2024', project_url: null, display_order: 4, is_published: true, created_at: '', updated_at: '' },
  { id: '5', title: "Appel aux dons de kits scolaires à l'endroit des enfants démunis & orphelins", category: 'communication', image_url: '/assets/img/communication/com-3.jpg', image_alt: null, description: "Développement complet de l'identité visuelle d'un restaurant étoilé, de la signalétique aux menus et cartes de visite.", client: 'ONG Espoir Plus Afrique', year: '2021', project_url: null, display_order: 5, is_published: true, created_at: '', updated_at: '' },
  { id: '6', title: "Plateforme d'emprunt de livre", category: 'web', image_url: '/assets/img/web/web-1.png', image_alt: null, description: "Design d'une landing page interactive pour un événement exclusif, avec animations et système d'inscription personnalisé.", client: 'Anonyme', year: '2025', project_url: null, display_order: 6, is_published: true, created_at: '', updated_at: '' },
  { id: '7', title: 'Portfolio - FIU', category: 'web', image_url: '/assets/img/web/web-2.png', image_alt: null, description: "Design d'une landing page interactive pour un événement exclusif, avec animations et système d'inscription personnalisé.", client: 'Future Is Us', year: '2023', project_url: null, display_order: 7, is_published: true, created_at: '', updated_at: '' },
  { id: '8', title: 'Portfolio - RP', category: 'web', image_url: '/assets/img/web/web-3.png', image_alt: null, description: "Design d'une landing page interactive pour un événement exclusif, avec animations et système d'inscription personnalisé.", client: 'Ressources Plus', year: '2024', project_url: null, display_order: 8, is_published: true, created_at: '', updated_at: '' },
  { id: '9', title: 'Jeûne & Prière', category: 'event', image_url: '/assets/img/event/event-1.jpg', image_alt: null, description: "Design d'une landing page interactive pour un événement exclusif, avec animations et système d'inscription personnalisé.", client: 'Eglise de Pentecôte', year: '2024', project_url: null, display_order: 9, is_published: true, created_at: '', updated_at: '' },
  { id: '10', title: 'Prière pour la Nation', category: 'event', image_url: '/assets/img/event/event-2.jpg', image_alt: null, description: "Design d'une landing page interactive pour un événement exclusif, avec animations et système d'inscription personnalisé.", client: 'Montagne de Prière Jésus a tout accompli', year: '2024', project_url: null, display_order: 10, is_published: true, created_at: '', updated_at: '' },
  { id: '11', title: 'Jeûne & Prière Mensuel', category: 'event', image_url: '/assets/img/event/event-3.jpg', image_alt: null, description: "Design d'une landing page interactive pour un événement exclusif, avec animations et système d'inscription personnalisé.", client: 'Fanfare LAV7T', year: '2025', project_url: null, display_order: 11, is_published: true, created_at: '', updated_at: '' },
];

const PortfolioSection = () => {
  const { data } = usePublicList('projects');
  const projects = data && data.length > 0 ? data : DEFAULT_PROJECTS;

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
  }, [selectedCategory, currentPage, projects]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return [
      { id: 'all', name: 'Tous' },
      ...unique.map((id) => ({ id, name: id.charAt(0).toUpperCase() + id.slice(1) })),
    ];
  }, [projects]);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  const resetScrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      el.classList.remove('animate-fade-in');
      el.classList.add('opacity-0');
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    resetScrollAnimations();
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    resetScrollAnimations();
    setCurrentPage(page);
  };

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold mb-4">
            <span className="gold-gradient-text">Réalisations & Portfolio</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto mb-6"></div>
          <p className="animate-on-scroll opacity-0 max-w-2xl mx-auto text-foreground/90">
            Découvrez quelques-unes de nos créations qui transforment des idées en expériences visuelles exceptionnelles.
          </p>
        </div>

        {/* Category filters */}
        <div className="animate-on-scroll opacity-0 flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category.id
                ? 'bg-gold-500 text-black font-semibold shadow-md'
                : 'bg-muted text-foreground/80 hover:bg-gold-500/20 hover:text-gold-500 border border-border/50'
                }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProjects.map((project, index) => (
            <div
              key={project.id}
              className="animate-on-scroll opacity-0 portfolio-item rounded-xl overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedProject(project.id)}
            >
              <img
                src={project.image_url}
                alt={project.image_alt || project.title}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="portfolio-item-overlay p-6 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-gold-600 dark:text-gold-300 mb-2">{project.title}</h3>
                <p className="text-sm text-foreground/80 mb-4">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
                <button className="gold-button text-black font-semibold text-sm py-2 px-4">
                  Voir le Projet
                </button>
              </div>
            </div>
          ))}
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Lightbox */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            {/* Image de fond floue et zoomée */}
            {projects.filter(p => p.id === selectedProject).map(project => (
              <div
                key={project.id + "-bg"}
                className="absolute inset-0 bg-center bg-cover scale-110 blur-lg opacity-40"
                style={{ backgroundImage: `url(${project.image_url})` }}
              ></div>
            ))}

            {/* Contenu */}
            <div className="w-full max-w-4xl max-h-[90vh] overflow-auto glass-panel rounded-xl p-6 md:p-8 relative z-10 animate-fade-in border border-border shadow-2xl">
              <button
                className="absolute top-4 right-4 text-gold-500 hover:text-gold-400 p-2 rounded-full hover:bg-gold-500/10 transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>

              {projects.filter(p => p.id === selectedProject).map(project => (
                <div key={project.id} className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2 w-full">
                    <img
                      src={project.image_url}
                      alt={project.image_alt || project.title}
                      className="w-full h-auto rounded-lg object-cover shadow-md"
                    />
                  </div>
                  <div className="md:w-1/2 w-full space-y-4">
                    <h3 className="text-2xl font-bold text-gold-600 dark:text-gold-300">{project.title}</h3>
                    {project.description && <p className="text-foreground/90">{project.description}</p>}
                    <div className="pt-4 space-y-2">
                      {project.client && (
                        <div className="flex gap-2">
                          <span className="text-gold-500 font-semibold">Client:</span>
                          <span className="text-foreground">{project.client}</span>
                        </div>
                      )}
                      {project.year && (
                        <div className="flex gap-2">
                          <span className="text-gold-500 font-semibold">Année:</span>
                          <span className="text-foreground">{project.year}</span>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <span className="text-gold-500 font-semibold">Catégorie:</span>
                        <span className="text-foreground">
                          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                        </span>
                      </div>
                    </div>
                    {project.project_url && (
                      <div className="pt-6">
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 hover:text-gold-500 font-semibold transition-colors"
                        >
                          <span>Visiter le Projet</span>
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
