
import React, { useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message envoyé!",
        description: "Nous vous répondrons dans les plus brefs délais.",
        variant: "default",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };
  
  const contactInfo = [
    {
      icon: <Mail size={20} className="text-gold-500" />,
      title: 'Email',
      value: 'contact@digithom.com',
      link: 'mailto:contact@digithom.com'
    },
    {
      icon: <Phone size={20} className="text-gold-500" />,
      title: 'Téléphone',
      value: '+33 6 12 34 56 78',
      link: 'tel:+33612345678'
    },
    {
      icon: <MapPin size={20} className="text-gold-500" />,
      title: 'Adresse',
      value: 'Paris, France',
      link: 'https://maps.google.com/?q=Paris,France'
    }
  ];
  
  const socialLinks = [
    { icon: <Facebook size={18} />, name: 'Facebook', link: '#' },
    { icon: <Instagram size={18} />, name: 'Instagram', link: '#' },
    { icon: <Linkedin size={18} />, name: 'LinkedIn', link: '#' },
    { icon: <Twitter size={18} />, name: 'Twitter', link: '#' }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="animate-on-scroll opacity-0 text-3xl md:text-4xl font-bold mb-4">
            <span className="gold-gradient-text">Contactez-Nous</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 to-gold-600 mx-auto mb-6"></div>
          <p className="animate-on-scroll opacity-0 max-w-2xl mx-auto text-gold-100/80">
            Discutons de votre projet et voyons comment nous pouvons vous aider à le concrétiser.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left side - Form */}
          <div className="animate-on-scroll opacity-0">
            <div className="glass-panel p-6 md:p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gold-300 mb-6">Envoyez-nous un message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-gold-400 text-sm">
                    Nom Complet
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-muted border border-gold-800 rounded-md px-4 py-2 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors text-gold-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-gold-400 text-sm">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-muted border border-gold-800 rounded-md px-4 py-2 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors text-gold-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-gold-400 text-sm">
                    Sujet
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-muted border border-gold-800 rounded-md px-4 py-2 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors text-gold-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-gold-400 text-sm">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-muted border border-gold-800 rounded-md px-4 py-2 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors text-gold-100 resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gold-button w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      <span>Envoyer le Message</span>
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
              <h3 className="text-xl font-bold text-gold-300 mb-6">Informations de Contact</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 hover:bg-gold-500/5 p-3 rounded-md transition-colors"
                  >
                    <div className="bg-muted p-3 rounded-full">{info.icon}</div>
                    <div>
                      <h4 className="text-gold-400 font-medium">{info.title}</h4>
                      <p className="text-gold-100">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="text-gold-300 font-medium mb-4">Suivez-nous</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-muted hover:bg-gold-500/20 w-10 h-10 rounded-full flex items-center justify-center text-gold-400 hover:text-gold-300 transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-6 md:p-8 rounded-xl flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gold-300 mb-6">Horaires d'Ouverture</h3>
              
              <div className="space-y-3 flex-1">
                <div className="flex justify-between">
                  <span className="text-gold-400">Lundi - Vendredi</span>
                  <span className="text-gold-100">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gold-400">Samedi</span>
                  <span className="text-gold-100">10:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gold-400">Dimanche</span>
                  <span className="text-gold-100">Fermé</span>
                </div>
              </div>
              
              <div className="mt-auto pt-6">
                <p className="text-gold-100/70 text-sm italic">
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
