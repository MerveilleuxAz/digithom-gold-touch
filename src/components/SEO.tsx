import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'DIGiTHOM';
const SITE_URL = 'https://digithom.com';
const DEFAULT_TITLE = "DIGiTHOM | Agence de Design Graphique & Branding au Bénin";
const DEFAULT_DESCRIPTION =
  "DIGiTHOM est une agence de design graphique, branding et communication basée au Bénin. Nous transformons vos idées en expériences visuelles mémorables : logo, charte graphique, web design, impression et formation.";
const DEFAULT_IMAGE = `${SITE_URL}/lovable-uploads/1f24d38b-a1c7-4a48-86f2-df32e549aa59.png`;

interface SEOProps {
  /** Titre unique de la page. Sera affiché comme : "Titre | DIGiTHOM" */
  title?: string;
  /** Description unique de la page (150–160 caractères idéalement) */
  description?: string;
  /** Type Open Graph : 'website' | 'article' | 'profile' */
  type?: 'website' | 'article' | 'profile';
  /** URL absolue de l'image Open Graph (1200x630px recommandé) */
  image?: string;
  /** URL canonique absolue de la page */
  url?: string;
  /** Directive robots. Par défaut : "index, follow" */
  robots?: string;
  /** Mots-clés pertinents (optionnel, à utiliser avec parcimonie) */
  keywords?: string;
  /** Titre complet override (sans suffixe " | DIGiTHOM") */
  fullTitle?: string;
}

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  type = 'website',
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  robots = 'index, follow',
  keywords,
  fullTitle,
}: SEOProps) => {
  // Construire le titre final
  const finalTitle = fullTitle
    ? fullTitle
    : title
    ? `${title} | ${SITE_NAME}`
    : DEFAULT_TITLE;

  // S'assurer que l'image OG est une URL absolue
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  // URL canonique propre (sans trailing slash sauf pour la racine)
  const canonicalUrl = url === SITE_URL ? `${SITE_URL}/` : url.replace(/\/$/, '');

  return (
    <Helmet>
      {/* ======= Balises Standard ======= */}
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ======= Open Graph (Facebook, LinkedIn, WhatsApp…) ======= */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${title ?? 'Agence de Design Graphique'}`} />
      <meta property="og:url" content={canonicalUrl} />

      {/* ======= Twitter / X Cards ======= */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@digithom" />
      <meta name="twitter:creator" content="@digithom" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} — ${title ?? 'Agence de Design Graphique'}`} />
    </Helmet>
  );
};
