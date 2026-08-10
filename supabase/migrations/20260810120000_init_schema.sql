-- DIGiTHOM — schéma initial de l'administration du portfolio
-- Ce script est idempotent-safe pour une première exécution sur un projet Supabase vide.
-- À exécuter dans l'éditeur SQL du dashboard Supabase (Project > SQL Editor > New query).

create extension if not exists pgcrypto;

-- =========================================================================
-- Fonction utilitaire : maintien automatique de updated_at
-- =========================================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =========================================================================
-- SITE SETTINGS (singleton) — infos entreprise / contact / réseaux sociaux
-- Alimente ContactSection, Footer, Navbar (logo)
-- =========================================================================
create table public.site_settings (
  id smallint primary key default 1 check (id = 1),
  company_name text not null default 'DIGiTHOM',
  tagline text not null default 'Designer, c''est dessiner à dessein.',
  footer_description text not null default 'Des solutions créatives sur mesure pour transformer vos idées en expériences visuelles mémorables qui captivent votre audience.',
  logo_url text default '/lovable-uploads/1f24d38b-a1c7-4a48-86f2-df32e549aa59.png',
  email text not null default 'digithom229@gmail.com',
  phone_display text not null default '+229 01 41 51 53 03',
  phone_link text not null default '+2290141515303',
  address text not null default 'Abomey-Calavi, Bénin',
  address_map_url text default 'https://maps.google.com/?q=Abomey-Calavi,Benin',
  hours_weekdays text default '9:00 - 18:00',
  hours_saturday text default '10:00 - 15:00',
  hours_sunday text default 'Fermé',
  facebook_url text default '#',
  tiktok_url text default '#',
  instagram_url text default '#',
  linkedin_url text default '#',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1);

create trigger set_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

-- =========================================================================
-- HERO CONTENT (singleton) — alimente HeroSection
-- =========================================================================
create table public.hero_content (
  id smallint primary key default 1 check (id = 1),
  title text not null default 'Designer, c''est dessiner à dessein.',
  subtitle text not null default 'Une approche créative et stratégique pour transformer vos idées en expériences visuelles mémorables.',
  button_text text not null default 'En savoir plus',
  image_url text not null default '/lovable-uploads/hero.png',
  image_alt text not null default 'DIGiTHOM - Designer Créatif',
  label_text text not null default 'DESIGNER CRÉATIF',
  experience_text text not null default 'Expérience visuelle depuis 2020',
  badge_text text not null default 'Since 2020',
  updated_at timestamptz not null default now()
);

insert into public.hero_content (id) values (1);

create trigger set_updated_at before update on public.hero_content
  for each row execute function public.set_updated_at();

-- =========================================================================
-- ABOUT CONTENT (singleton) — texte principal de AboutSection
-- =========================================================================
create table public.about_content (
  id smallint primary key default 1 check (id = 1),
  heading text not null default 'Passionné par le Design & l''Expérience Utilisateur',
  paragraph_1 text not null default 'Chez DIGiTHOM, nous créons des designs qui racontent votre histoire. Nous transformons vos idées en expériences visuelles captivantes qui communiquent votre message de manière claire et mémorable.',
  paragraph_2 text not null default 'Notre approche allie esthétique et fonctionnalité pour des créations qui non seulement plaisent à l''œil mais qui répondent également à vos objectifs stratégiques.',
  checklist text[] not null default array[
    'Design graphique d''exception',
    'Expérience utilisateur optimisée',
    'Interface élégante et intuitive',
    'Solutions créatives sur mesure'
  ],
  updated_at timestamptz not null default now()
);

insert into public.about_content (id) values (1);

create trigger set_updated_at before update on public.about_content
  for each row execute function public.set_updated_at();

-- =========================================================================
-- ABOUT VALUES (liste) — les 4 cartes d'expertise de AboutSection
-- =========================================================================
create table public.about_values (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'Lightbulb',
  title text not null,
  description text not null,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.about_values
  for each row execute function public.set_updated_at();

insert into public.about_values (icon, title, description, display_order) values
  ('Lightbulb', 'Créativité', 'Des idées innovantes qui se démarquent de la concurrence.', 1),
  ('Palette', 'Design', 'Une esthétique soignée qui reflète votre identité unique.', 2),
  ('Compass', 'Stratégie', 'Des solutions pensées pour atteindre vos objectifs business.', 3),
  ('Target', 'Précision', 'Une attention méticuleuse aux détails pour un résultat parfait.', 4);

-- =========================================================================
-- SERVICES (liste) — ServicesSection
-- =========================================================================
create table public.services (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'PenTool',
  title text not null,
  description text not null,
  details text[] not null default '{}',
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.services
  for each row execute function public.set_updated_at();

insert into public.services (icon, title, description, details, display_order) values
  ('PenTool', 'BRANDING', 'Donnez une identité forte et unique à votre entreprise.',
    array['Identité visuelle', 'Création de logo', 'Charte graphique', 'Branding de marque'], 1),
  ('Megaphone', 'COMMUNICATION', 'Stratégies percutantes pour atteindre votre cible.',
    array['Communication d''entreprise', 'Stratégie de communication', 'Création de contenus digitaux (réseaux sociaux)'], 2),
  ('Calendar', 'EVEN''T', 'Sublimez et couvrez tous vos événements professionnels.',
    array['Couverture Event', 'Communication Event', 'Visibilité terrain'], 3),
  ('Printer', 'PRINTING', 'Impression sur tous vos supports de communication.',
    array['Flyers, brochures, bâches', 'T-shirt, casquette, tasse,...', 'Tout supports de com'], 4),
  ('Users', 'CONSULTING', 'Conseils et accompagnement sur mesure.',
    array['Audit de communication', 'Analyse stratégique', 'Stratégie de marque'], 5),
  ('GraduationCap', 'FORMATION', 'Développez vos compétences avec nos experts.',
    array['Graphisme - Sérigraphie', 'Webmaster - Audiovisuel', 'Pilotage de drones'], 6);

-- =========================================================================
-- FORMATIONS CONTENT (singleton) — carte principale "Modules de Formation"
-- =========================================================================
create table public.formations_content (
  id smallint primary key default 1 check (id = 1),
  section_title text not null default 'Formations',
  section_description text not null default 'Développez vos compétences avec nos formations spécialisées en communication, branding et marketing digital.',
  heading text not null default 'Modules de Formation',
  description text not null default 'Des formations sur mesure adaptées à vos besoins spécifiques, dispensées en interne ou directement au sein de votre entreprise.',
  bullet_1 text not null default 'Formation interne',
  bullet_2 text not null default 'Formation en entreprise',
  updated_at timestamptz not null default now()
);

insert into public.formations_content (id) values (1);

create trigger set_updated_at before update on public.formations_content
  for each row execute function public.set_updated_at();

-- =========================================================================
-- FORMATION THEMES (liste) — les 4 thématiques de FormationsSection
-- =========================================================================
create table public.formation_themes (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'Target',
  title text not null,
  description text not null,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.formation_themes
  for each row execute function public.set_updated_at();

insert into public.formation_themes (icon, title, description, display_order) values
  ('Target', 'Communication', 'Maîtrisez les techniques de communication moderne et développez votre impact.', 1),
  ('BookOpen', 'Branding', 'Apprenez à construire et gérer une identité de marque forte et cohérente.', 2),
  ('Users', 'Marketing Digital', 'Découvrez les stratégies digitales efficaces pour développer votre présence en ligne.', 3),
  ('Camera', 'Prises de vues aériennes par drone', 'Vidéos et photographies haute définition pour l''immobilier, la construction et les événements.', 4);

-- =========================================================================
-- PROJECTS (liste) — PortfolioSection
-- =========================================================================
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  image_url text not null,
  image_alt text,
  description text,
  client text,
  year text,
  project_url text,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

insert into public.projects (title, category, image_url, description, client, year, display_order) values
  ('Formation en rédaction d''actes juridiques', 'communication', '/assets/img/communication/com-1.jpg', 'Modernisation complète de l''identité visuelle d''une marque de luxe, incluant logo, charte graphique et supports de communication.', 'Legal and Business consulting', '2024', 1),
  ('Noël des Jeunes', 'print', '/assets/img/print/print-1.jpg', 'Conception d''une plateforme e-commerce haut de gamme avec une expérience utilisateur immersive et des parcours d''achat optimisés.', 'Eglise de Pentecôte', '2024', 2),
  ('Appel aux dons de kit scolaire', 'communication', '/assets/img/communication/com-2.jpg', 'Design UI/UX d''une application communication de gestion financière avec interfaces intuitives et visualisations de données avancées.', 'Association des Jeunes Pentecôtistes de HOUEDJAMEY', '2023', 3),
  ('Camp des Jeunes', 'print', '/assets/img/print/print-2.jpg', 'Création d''une brochure luxueuse présentant une collection exclusive, avec finitions dorées et mise en page sophistiquée.', 'Eglise de Pentecôte', '2024', 4),
  ('Appel aux dons de kits scolaires à l''endroit des enfants démunis & orphelins', 'communication', '/assets/img/communication/com-3.jpg', 'Développement complet de l''identité visuelle d''un restaurant étoilé, de la signalétique aux menus et cartes de visite.', 'ONG Espoir Plus Afrique', '2021', 5),
  ('Plateforme d''emprunt de livre', 'web', '/assets/img/web/web-1.png', 'Design d''une landing page interactive pour un événement exclusif, avec animations et système d''inscription personnalisé.', 'Anonyme', '2025', 6),
  ('Portfolio - FIU', 'web', '/assets/img/web/web-2.png', 'Design d''une landing page interactive pour un événement exclusif, avec animations et système d''inscription personnalisé.', 'Future Is Us', '2023', 7),
  ('Portfolio - RP', 'web', '/assets/img/web/web-3.png', 'Design d''une landing page interactive pour un événement exclusif, avec animations et système d''inscription personnalisé.', 'Ressources Plus', '2024', 8),
  ('Jeûne & Prière', 'event', '/assets/img/event/event-1.jpg', 'Design d''une landing page interactive pour un événement exclusif, avec animations et système d''inscription personnalisé.', 'Eglise de Pentecôte', '2024', 9),
  ('Prière pour la Nation', 'event', '/assets/img/event/event-2.jpg', 'Design d''une landing page interactive pour un événement exclusif, avec animations et système d''inscription personnalisé.', 'Montagne de Prière Jésus a tout accompli', '2024', 10),
  ('Jeûne & Prière Mensuel', 'event', '/assets/img/event/event-3.jpg', 'Design d''une landing page interactive pour un événement exclusif, avec animations et système d''inscription personnalisé.', 'Fanfare LAV7T', '2025', 11);

-- =========================================================================
-- VIDEOS (liste) — VideosSection
-- =========================================================================
create table public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  video_url text not null,
  duration text,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.videos
  for each row execute function public.set_updated_at();

insert into public.videos (title, description, video_url, duration, display_order) values
  ('Processus créatif', 'Découvrez notre approche unique du design et comment nous transformons vos idées en réalités visuelles captivantes.', 'https://www.youtube.com/watch?v=is-sQGCSPBY', '2:45', 1),
  ('Transformation de marque', 'Étude de cas: comment nous avons revitalisé l''identité visuelle d''une entreprise traditionnelle pour la rendre contemporaine.', 'https://www.youtube.com/watch?v=is-sQGCSPBY', '4:12', 2),
  ('Design et expérience utilisateur', 'L''importance de l''UX dans le design d''interface et comment nous créons des expériences mémorables.', 'https://www.youtube.com/watch?v=is-sQGCSPBY', '3:30', 3);

-- =========================================================================
-- TESTIMONIALS (liste) — TestimonialsSection
-- =========================================================================
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text,
  quote text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  avatar_url text default '/lovable-uploads/avatar.jpg',
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.testimonials
  for each row execute function public.set_updated_at();

insert into public.testimonials (name, position, quote, rating, display_order) values
  ('Sophie Durand', 'CEO, Luxury Fashion', 'DIGiTHOM a complètement transformé notre image de marque avec un design sophistiqué qui reflète parfaitement notre positionnement haut de gamme. Leur sens du détail et leur créativité ont dépassé toutes nos attentes.', 5, 1),
  ('Alexandre Martin', 'Directeur Marketing, Tech Innovations', 'Notre collaboration avec DIGiTHOM a été exceptionnelle. Leur équipe a su capturer l''essence de notre entreprise et la transformer en une identité visuelle impactante et mémorable qui nous démarque clairement sur le marché.', 5, 2),
  ('Marie Laurent', 'Fondatrice, Studio Créatif', 'Je recommande vivement DIGiTHOM pour leur approche unique et leur capacité à créer des designs à la fois esthétiques et fonctionnels. Leur travail sur notre site web a considérablement amélioré notre taux de conversion.', 4, 3);

-- =========================================================================
-- CONTACT MESSAGES (inbox) — soumissions du formulaire de ContactSection
-- =========================================================================
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  is_archived boolean not null default false,
  created_at timestamptz not null default now()
);

create index contact_messages_is_read_idx on public.contact_messages (is_read);
create index contact_messages_is_archived_idx on public.contact_messages (is_archived);

-- =========================================================================
-- RLS — Row Level Security
-- =========================================================================
alter table public.site_settings enable row level security;
alter table public.hero_content enable row level security;
alter table public.about_content enable row level security;
alter table public.about_values enable row level security;
alter table public.services enable row level security;
alter table public.formations_content enable row level security;
alter table public.formation_themes enable row level security;
alter table public.projects enable row level security;
alter table public.videos enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_messages enable row level security;

-- Singletons : lecture publique, écriture admin authentifié uniquement
create policy "public read site_settings" on public.site_settings for select using (true);
create policy "admin update site_settings" on public.site_settings for update to authenticated using (true) with check (true);

create policy "public read hero_content" on public.hero_content for select using (true);
create policy "admin update hero_content" on public.hero_content for update to authenticated using (true) with check (true);

create policy "public read about_content" on public.about_content for select using (true);
create policy "admin update about_content" on public.about_content for update to authenticated using (true) with check (true);

create policy "public read formations_content" on public.formations_content for select using (true);
create policy "admin update formations_content" on public.formations_content for update to authenticated using (true) with check (true);

-- Listes de contenu : lecture publique des éléments publiés, admin voit + gère tout
create policy "public read published about_values" on public.about_values for select using (is_published = true);
create policy "admin read all about_values" on public.about_values for select to authenticated using (true);
create policy "admin write about_values" on public.about_values for insert to authenticated with check (true);
create policy "admin update about_values" on public.about_values for update to authenticated using (true) with check (true);
create policy "admin delete about_values" on public.about_values for delete to authenticated using (true);

create policy "public read published services" on public.services for select using (is_published = true);
create policy "admin read all services" on public.services for select to authenticated using (true);
create policy "admin write services" on public.services for insert to authenticated with check (true);
create policy "admin update services" on public.services for update to authenticated using (true) with check (true);
create policy "admin delete services" on public.services for delete to authenticated using (true);

create policy "public read published formation_themes" on public.formation_themes for select using (is_published = true);
create policy "admin read all formation_themes" on public.formation_themes for select to authenticated using (true);
create policy "admin write formation_themes" on public.formation_themes for insert to authenticated with check (true);
create policy "admin update formation_themes" on public.formation_themes for update to authenticated using (true) with check (true);
create policy "admin delete formation_themes" on public.formation_themes for delete to authenticated using (true);

create policy "public read published projects" on public.projects for select using (is_published = true);
create policy "admin read all projects" on public.projects for select to authenticated using (true);
create policy "admin write projects" on public.projects for insert to authenticated with check (true);
create policy "admin update projects" on public.projects for update to authenticated using (true) with check (true);
create policy "admin delete projects" on public.projects for delete to authenticated using (true);

create policy "public read published videos" on public.videos for select using (is_published = true);
create policy "admin read all videos" on public.videos for select to authenticated using (true);
create policy "admin write videos" on public.videos for insert to authenticated with check (true);
create policy "admin update videos" on public.videos for update to authenticated using (true) with check (true);
create policy "admin delete videos" on public.videos for delete to authenticated using (true);

create policy "public read published testimonials" on public.testimonials for select using (is_published = true);
create policy "admin read all testimonials" on public.testimonials for select to authenticated using (true);
create policy "admin write testimonials" on public.testimonials for insert to authenticated with check (true);
create policy "admin update testimonials" on public.testimonials for update to authenticated using (true) with check (true);
create policy "admin delete testimonials" on public.testimonials for delete to authenticated using (true);

-- Messages de contact : n'importe qui peut en envoyer un, seul l'admin peut les lire/gérer
create policy "public can submit contact_messages" on public.contact_messages for insert to anon, authenticated with check (true);
create policy "admin read contact_messages" on public.contact_messages for select to authenticated using (true);
create policy "admin update contact_messages" on public.contact_messages for update to authenticated using (true) with check (true);
create policy "admin delete contact_messages" on public.contact_messages for delete to authenticated using (true);

-- =========================================================================
-- STORAGE — bucket public pour les médias uploadés depuis l'admin
-- =========================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects for select using (bucket_id = 'media');
create policy "admin upload media" on storage.objects for insert to authenticated with check (bucket_id = 'media');
create policy "admin update media" on storage.objects for update to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');
create policy "admin delete media" on storage.objects for delete to authenticated using (bucket_id = 'media');
