import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PolitiqueConfidentialite = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black dark:bg-black light:bg-gray-50 text-white dark:text-white light:text-gray-900">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 gold-gradient-text uppercase">Politique de Confidentialité</h1>
        
        <div className="space-y-8 text-white/80 dark:text-white/80 light:text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gold-400 mb-4">1. Collecte des informations</h2>
            <p>
              Nous recueillons des informations lorsque vous utilisez notre formulaire de contact ou demandez un devis. 
              Les informations recueillies incluent votre nom, votre adresse e-mail, votre numéro de téléphone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-400 mb-4">2. Utilisation des informations</h2>
            <p className="mb-2">Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
              <li>Fournir un contenu publicitaire personnalisé</li>
              <li>Améliorer notre site Web</li>
              <li>Améliorer le service client et vos besoins de prise en charge</li>
              <li>Vous contacter par e-mail ou par téléphone</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-400 mb-4">3. Confidentialité du commerce en ligne</h2>
            <p>
              Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations 
              personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour 
              n'importe quelle raison, sans votre consentement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-400 mb-4">4. Divulgation à des tiers</h2>
            <p>
              Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à 
              des tiers. Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre 
              site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-400 mb-4">5. Protection des informations</h2>
            <p>
              Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations 
              personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations 
              sensibles transmises en ligne. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gold-400 mb-4">6. Consentement</h2>
            <p>
              En utilisant notre site, vous consentez à notre politique de confidentialité.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
