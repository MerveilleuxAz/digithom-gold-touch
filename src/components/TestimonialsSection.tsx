
import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { usePublicList } from '@/hooks/useListResource';
import type { TestimonialRow } from '@/integrations/supabase/types';

export const DEFAULT_TESTIMONIALS: TestimonialRow[] = [
  { id: '1', name: 'Sophie Durand', position: 'CEO, Luxury Fashion', quote: 'DIGiTHOM a complètement transformé notre image de marque avec un design sophistiqué qui reflète parfaitement notre positionnement haut de gamme. Leur sens du détail et leur créativité ont dépassé toutes nos attentes.', rating: 5, avatar_url: '/lovable-uploads/avatar.jpg', display_order: 1, is_published: true, created_at: '', updated_at: '' },
  { id: '2', name: 'Alexandre Martin', position: 'Directeur Marketing, Tech Innovations', quote: "Notre collaboration avec DIGiTHOM a été exceptionnelle. Leur équipe a su capturer l'essence de notre entreprise et la transformer en une identité visuelle impactante et mémorable qui nous démarque clairement sur le marché.", rating: 5, avatar_url: '/lovable-uploads/avatar.jpg', display_order: 2, is_published: true, created_at: '', updated_at: '' },
  { id: '3', name: 'Marie Laurent', position: 'Fondatrice, Studio Créatif', quote: 'Je recommande vivement DIGiTHOM pour leur approche unique et leur capacité à créer des designs à la fois esthétiques et fonctionnels. Leur travail sur notre site web a considérablement amélioré notre taux de conversion.', rating: 4, avatar_url: '/lovable-uploads/avatar.jpg', display_order: 3, is_published: true, created_at: '', updated_at: '' },
];

const TestimonialsSection = () => {
  const { data } = usePublicList('testimonials');
  const testimonials = data && data.length > 0 ? data : DEFAULT_TESTIMONIALS;

  const [currentSlide, setCurrentSlide] = useState(0);

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
  }, [testimonials]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, [testimonials.length]);

  useEffect(() => {
    if (currentSlide >= testimonials.length) setCurrentSlide(0);
  }, [testimonials.length, currentSlide]);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute -top-40 right-0 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 left-0 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold mb-4">
            <span className="gold-gradient-text">Témoignages Clients</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto mb-6"></div>
          <p className="animate-on-scroll opacity-0 max-w-2xl mx-auto text-foreground/90">
            Découvrez ce que nos clients disent de notre travail et de notre collaboration.
          </p>
        </div>

        <div className="animate-on-scroll opacity-0 relative max-w-4xl mx-auto">
          {/* Testimonial Slider */}
          <div className="overflow-hidden testimonial-card rounded-xl p-8 md:p-12">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="flex w-full">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 flex flex-col md:flex-row gap-8 items-center"
                  >
                    <div className="md:w-1/4 flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold-500/30 mb-4">
                        <img
                          src={testimonial.avatar_url || '/lovable-uploads/avatar.jpg'}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-gold-600 dark:text-gold-300 font-bold text-center">{testimonial.name}</h4>
                      {testimonial.position && <p className="text-muted-foreground text-sm text-center">{testimonial.position}</p>}
                      <div className="flex mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < testimonial.rating ? "text-gold-500" : "text-muted-foreground/30"}
                            fill={i < testimonial.rating ? "#E47E01" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="md:w-3/4 relative">
                      <Quote className="absolute -top-6 -left-6 text-gold-500/20" size={60} />
                      <p className="text-foreground/90 italic text-lg relative z-10 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted/80 backdrop-blur-sm border border-border flex items-center justify-center text-gold-500 hover:text-gold-600 hover:bg-gold-500/10 transition-colors shadow-md"
              onClick={prevSlide}
              aria-label="Témoignage précédent"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted/80 backdrop-blur-sm border border-border flex items-center justify-center text-gold-500 hover:text-gold-600 hover:bg-gold-500/10 transition-colors shadow-md"
              onClick={nextSlide}
              aria-label="Témoignage suivant"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots navigation */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-gold-500 w-6' : 'bg-muted-foreground/30 w-2'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
