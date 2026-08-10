import React, { useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSingleton } from '@/hooks/useSingletonResource';
import { useSubmitContactMessage } from '@/hooks/useContactMessages';
import type { SiteSettingsRow } from '@/integrations/supabase/types';

export const DEFAULT_SITE_SETTINGS: SiteSettingsRow = {
  id: 1,
  company_name: 'DIGiTHOM',
  tagline: "Designer, c'est dessiner à dessein.",
  footer_description: 'Des solutions créatives sur mesure pour transformer vos idées en expériences visuelles mémorables qui captivent votre audience.',
  logo_url: '/lovable-uploads/1f24d38b-a1c7-4a48-86f2-df32e549aa59.png',
  email: 'digithom229@gmail.com',
  phone_display: '+229 01 41 51 53 03',
  phone_link: '+2290141515303',
  address: 'Abomey-Calavi, Bénin',
  address_map_url: 'https://maps.google.com/?q=Abomey-Calavi,Benin',
  hours_weekdays: '9:00 - 18:00',
  hours_saturday: '10:00 - 15:00',
  hours_sunday: 'Fermé',
  facebook_url: '#',
  tiktok_url: '#',
  instagram_url: '#',
  linkedin_url: '#',
  updated_at: '',
};

// Composant TikTokIcon personnalisé
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
      fill="currentColor"
    />
  </svg>
);

const ContactSection = () => {
  const { toast } = useToast();
  const { data } = useSingleton('site_settings');
  const settings = data ?? DEFAULT_SITE_SETTINGS;
  const { mutate: submitMessage, isPending: isSubmitting } = useSubmitContactMessage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    submitMessage(formData, {
      onSuccess: () => {
        toast({
          title: "Message envoyé!",
          description: "Nous vous répondrons dans les plus brefs délais.",
          variant: "default",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      },
      onError: () => {
        toast({
          title: "Échec de l'envoi",
          description: "Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.",
          variant: "destructive",
        });
      },
    });
  };

  const contactInfo = [
    {
      icon: <Mail size={20} className="text-gold-500" />,
      title: 'Email',
      value: settings.email,
      link: `mailto:${settings.email}`
    },
    {
      icon: <Phone size={20} className="text-gold-500" />,
      title: 'Téléphone',
      value: settings.phone_display,
      link: `tel:${settings.phone_link}`
    },
    {
      icon: <MapPin size={20} className="text-gold-500" />,
      title: 'Adresse',
      value: settings.address,
      link: settings.address_map_url || '#'
    }
  ];

  const socialLinks = [
    { icon: <Facebook size={18} />, name: 'Facebook', link: settings.facebook_url || '#' },
    { icon: <TikTokIcon size={18} />, name: 'TikTok', link: settings.tiktok_url || '#' },
    { icon: <Instagram size={18} />, name: 'Instagram', link: settings.instagram_url || '#' },
    { icon: <Linkedin size={18} />, name: 'LinkedIn', link: settings.linkedin_url || '#' }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold mb-4">
            <span className="gold-gradient-text">Contactez-Nous</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto mb-6"></div>
          <p className="animate-on-scroll opacity-0 max-w-2xl mx-auto text-foreground/90">
            Discutons de votre projet et voyons comment nous pouvons vous aider à le concrétiser.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left side - Form */}
          <div className="animate-on-scroll opacity-0">
            <div className="glass-panel p-6 md:p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gold-600 dark:text-gold-300 mb-6">Envoyez-nous un message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-gold-600 dark:text-gold-400 font-semibold text-sm">
                    Nom Complet
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-input border border-border rounded-md px-4 py-2 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors text-foreground disabled:opacity-60"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-gold-600 dark:text-gold-400 font-semibold text-sm">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-input border border-border rounded-md px-4 py-2 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors text-foreground disabled:opacity-60"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-gold-600 dark:text-gold-400 font-semibold text-sm">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="w-full bg-input border border-border rounded-md px-4 py-2 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors text-foreground resize-none disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gold-button text-black font-semibold w-full flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right side - Contact info */}
          <div className="animate-on-scroll opacity-0 flex flex-col space-y-8">
            <div className="glass-panel p-6 md:p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gold-600 dark:text-gold-300 mb-6">Informations de Contact</h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 hover:bg-gold-500/10 p-3 rounded-md transition-colors"
                  >
                    <div className="bg-gold-500/10 p-3 rounded-full">{info.icon}</div>
                    <div>
                      <h4 className="text-gold-600 dark:text-gold-400 font-semibold">{info.title}</h4>
                      <p className="text-foreground font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="text-gold-600 dark:text-gold-300 font-bold mb-4">Suivez-nous</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 w-10 h-10 rounded-full flex items-center justify-center text-gold-600 dark:text-gold-400 transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 md:p-8 rounded-xl flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gold-600 dark:text-gold-300 mb-6">Horaires d'Ouverture</h3>

              <div className="space-y-3 flex-1">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-gold-600 dark:text-gold-400 font-medium">Lundi - Vendredi</span>
                  <span className="text-foreground font-medium">{settings.hours_weekdays}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-gold-600 dark:text-gold-400 font-medium">Samedi</span>
                  <span className="text-foreground font-medium">{settings.hours_saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gold-600 dark:text-gold-400 font-medium">Dimanche</span>
                  <span className="text-muted-foreground italic">{settings.hours_sunday}</span>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <p className="text-muted-foreground text-sm italic">
                  N'hésitez pas à nous contacter pour discuter de votre projet ou pour prendre rendez-vous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
