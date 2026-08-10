import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { LegalPageStructuredData } from '@/components/StructuredData';

const MentionsLegales = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <SEO
        title="Mentions Légales"
        description="Mentions légales de l'agence DIGiTHOM : informations sur l'éditeur du site, l'hébergeur, la propriété intellectuelle et la limitation de responsabilité."
        url="https://digithom.com/mentions-legales"
        robots="index, follow"
      />
      <LegalPageStructuredData
        name="Mentions Légales | DIGiTHOM"
        url="https://digithom.com/mentions-legales"
        description="Mentions légales de l'agence DIGiTHOM : informations sur l'éditeur, l'hébergeur et la propriété intellectuelle."
      />
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 gold-gradient-text uppercase">Mentions Légales</h1>
        
        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gold-600 dark:text-gold-400 mb-4">1. Éditeur du site</h2>
            <p className="mb-2">Le site <strong>DIGiTHOM</strong> est édité par l'agence DIGiTHOM.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Adresse :</strong> Cotonou, Bénin</li>
              <li><strong>Téléphone :</strong> +229 01 41 51 53 03</li>
              <li><strong>Email :</strong> digithom229@gmail.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-600 dark:text-gold-400 mb-4">2. Hébergement</h2>
            <p>
              Le site est hébergé par une société tierce. Pour toute demande concernant l'hébergement, 
              veuillez nous contacter directement à l'adresse fournie ci-dessus.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-600 dark:text-gold-400 mb-4">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble de ce site relève des législations béninoises et internationales sur le droit d'auteur 
              et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les 
              documents iconographiques et photographiques.
              <br /><br />
              La reproduction de tout ou partie de ce site sur un support électronique ou papier quel qu'il soit est 
              formellement interdite sauf autorisation expresse de DIGiTHOM.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-600 dark:text-gold-400 mb-4">4. Liens hypertextes</h2>
            <p>
              Le site DIGiTHOM peut contenir des liens hypertextes vers d'autres sites. Cependant, DIGiTHOM 
              n'a pas la possibilité de vérifier le contenu des sites ainsi visités, et n'assumera en conséquence 
              aucune responsabilité de ce fait.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-600 dark:text-gold-400 mb-4">5. Limitation de responsabilité</h2>
            <p>
              L'agence DIGiTHOM s'efforce de fournir sur le site des informations aussi précises que possible. 
              Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la 
              mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MentionsLegales;
