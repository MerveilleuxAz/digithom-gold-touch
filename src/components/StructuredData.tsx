import { Helmet } from 'react-helmet-async';

/**
 * Composant de données structurées JSON-LD pour la homepage DIGiTHOM.
 * Inclut : Organization, LocalBusiness (ProfessionalService), WebSite.
 * Ces types sont validés par Google Rich Results et correspondent exactement
 * au contenu réel de la plateforme.
 */
export const HomeStructuredData = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': 'https://digithom.com/#organization',
    name: 'DIGiTHOM',
    alternateName: 'Digithom',
    url: 'https://digithom.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://digithom.com/lovable-uploads/1f24d38b-a1c7-4a48-86f2-df32e549aa59.png',
      width: 512,
      height: 512,
    },
    image: 'https://digithom.com/lovable-uploads/1f24d38b-a1c7-4a48-86f2-df32e549aa59.png',
    description:
      'DIGiTHOM est une agence de design graphique, branding et communication basée à Abomey-Calavi, Bénin. Spécialiste en création de logos, chartes graphiques, web design, impression et formation.',
    slogan: "Designer, c'est dessiner à dessein.",
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abomey-Calavi',
      addressCountry: 'BJ',
      addressRegion: 'Atlantique',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+229-01-41-51-53-03',
        contactType: 'customer service',
        email: 'digithom229@gmail.com',
        availableLanguage: ['French'],
        areaServed: 'BJ',
      },
    ],
    email: 'digithom229@gmail.com',
    telephone: '+22901415303',
    areaServed: {
      '@type': 'Country',
      name: 'Bénin',
    },
    sameAs: [
      // Placeholder — à remplacer par les URLs réelles des profils sociaux
      // 'https://www.facebook.com/digithom',
      // 'https://www.instagram.com/digithom',
      // 'https://www.linkedin.com/company/digithom',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services DIGiTHOM',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Branding & Identité Visuelle',
            description:
              'Création de logo, charte graphique et identité de marque complète pour entreprises et organisations.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Communication Digitale',
            description:
              'Stratégie de communication, création de contenus digitaux et gestion des réseaux sociaux.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Impression & Printing',
            description:
              'Impression de flyers, brochures, bâches, t-shirts et tous supports de communication.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Couverture Événementielle',
            description:
              'Couverture photo/vidéo et communication visuelle pour vos événements professionnels.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Formation en Design & Communication',
            description:
              'Formations en graphisme, webmaster, audiovisuel et pilotage de drones dispensées en interne ou en entreprise.',
          },
        },
      ],
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '15:00',
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://digithom.com/#website',
    url: 'https://digithom.com',
    name: 'DIGiTHOM',
    description:
      "Agence de design graphique, branding et communication basée au Bénin. Designer, c'est dessiner à dessein.",
    publisher: {
      '@id': 'https://digithom.com/#organization',
    },
    inLanguage: 'fr-FR',
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://digithom.com/#webpage',
    url: 'https://digithom.com/',
    name: "DIGiTHOM | Agence de Design Graphique & Branding au Bénin",
    description:
      "DIGiTHOM est une agence de design graphique, branding et communication basée au Bénin. Nous transformons vos idées en expériences visuelles mémorables.",
    isPartOf: {
      '@id': 'https://digithom.com/#website',
    },
    about: {
      '@id': 'https://digithom.com/#organization',
    },
    inLanguage: 'fr-FR',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: 'https://digithom.com/',
        },
      ],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
    </Helmet>
  );
};

/**
 * Données structurées pour les pages légales (WebPage simple)
 */
interface LegalPageStructuredDataProps {
  name: string;
  url: string;
  description: string;
}

export const LegalPageStructuredData = ({
  name,
  url,
  description,
}: LegalPageStructuredDataProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: {
      '@id': 'https://digithom.com/#website',
    },
    publisher: {
      '@id': 'https://digithom.com/#organization',
    },
    inLanguage: 'fr-FR',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: 'https://digithom.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name,
          item: url,
        },
      ],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
