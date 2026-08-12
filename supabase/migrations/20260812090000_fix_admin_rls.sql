-- SECURITY FIX — les policies "admin" utilisaient `to authenticated using (true)`,
-- ce qui autorise N'IMPORTE QUEL utilisateur authentifié (y compris via une
-- inscription publique sur l'API Supabase, sans passer par l'UI du site) à lire
-- tous les messages de contact et à écrire/supprimer tout le contenu du site et
-- les fichiers du bucket "media".
--
-- Correctif : table profiles + fonction is_admin(), et remplacement de chaque
-- policy "admin" (using(true) / with check(true)) par une vraie vérification
-- de rôle.
--
-- ⚠️ Avant d'exécuter ce script, remplacez l'email ci-dessous (ligne "backfill
-- admin existant") par l'email de votre compte admin réel.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "users read own profile" on public.profiles
  for select to authenticated using (id = auth.uid());

-- Aucune policy insert/update/delete pour "authenticated" : un utilisateur ne
-- peut jamais s'auto-promouvoir admin depuis le client. Seul le trigger
-- ci-dessous (ou une requête SQL manuelle) peut écrire dans cette table.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

grant execute on function public.is_admin() to authenticated, anon;

-- Crée automatiquement un profil (non-admin par défaut) pour tout nouvel
-- utilisateur qui s'inscrit.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, is_admin) values (new.id, false)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill : donne les droits admin au compte admin déjà existant.
-- ⚠️ Ce repo est public : NE COMMITTEZ PAS votre email admin en clair ici.
-- Remplacez la ligne ci-dessous par votre email UNIQUEMENT dans l'éditeur SQL
-- de Supabase au moment de l'exécution, sans la sauvegarder dans ce fichier.
insert into public.profiles (id, is_admin)
select id, true from auth.users where email = 'REPLACE_WITH_YOUR_ADMIN_EMAIL'
on conflict (id) do update set is_admin = true;

-- =========================================================================
-- Remplacement de toutes les policies "admin" par une vérification is_admin()
-- =========================================================================

-- site_settings / hero_content / about_content / formations_content (singletons)
drop policy if exists "admin update site_settings" on public.site_settings;
create policy "admin update site_settings" on public.site_settings for update to authenticated using (is_admin()) with check (is_admin());

drop policy if exists "admin update hero_content" on public.hero_content;
create policy "admin update hero_content" on public.hero_content for update to authenticated using (is_admin()) with check (is_admin());

drop policy if exists "admin update about_content" on public.about_content;
create policy "admin update about_content" on public.about_content for update to authenticated using (is_admin()) with check (is_admin());

drop policy if exists "admin update formations_content" on public.formations_content;
create policy "admin update formations_content" on public.formations_content for update to authenticated using (is_admin()) with check (is_admin());

-- about_values
drop policy if exists "admin read all about_values" on public.about_values;
drop policy if exists "admin write about_values" on public.about_values;
drop policy if exists "admin update about_values" on public.about_values;
drop policy if exists "admin delete about_values" on public.about_values;
create policy "admin read all about_values" on public.about_values for select to authenticated using (is_admin());
create policy "admin write about_values" on public.about_values for insert to authenticated with check (is_admin());
create policy "admin update about_values" on public.about_values for update to authenticated using (is_admin()) with check (is_admin());
create policy "admin delete about_values" on public.about_values for delete to authenticated using (is_admin());

-- services
drop policy if exists "admin read all services" on public.services;
drop policy if exists "admin write services" on public.services;
drop policy if exists "admin update services" on public.services;
drop policy if exists "admin delete services" on public.services;
create policy "admin read all services" on public.services for select to authenticated using (is_admin());
create policy "admin write services" on public.services for insert to authenticated with check (is_admin());
create policy "admin update services" on public.services for update to authenticated using (is_admin()) with check (is_admin());
create policy "admin delete services" on public.services for delete to authenticated using (is_admin());

-- formation_themes
drop policy if exists "admin read all formation_themes" on public.formation_themes;
drop policy if exists "admin write formation_themes" on public.formation_themes;
drop policy if exists "admin update formation_themes" on public.formation_themes;
drop policy if exists "admin delete formation_themes" on public.formation_themes;
create policy "admin read all formation_themes" on public.formation_themes for select to authenticated using (is_admin());
create policy "admin write formation_themes" on public.formation_themes for insert to authenticated with check (is_admin());
create policy "admin update formation_themes" on public.formation_themes for update to authenticated using (is_admin()) with check (is_admin());
create policy "admin delete formation_themes" on public.formation_themes for delete to authenticated using (is_admin());

-- projects
drop policy if exists "admin read all projects" on public.projects;
drop policy if exists "admin write projects" on public.projects;
drop policy if exists "admin update projects" on public.projects;
drop policy if exists "admin delete projects" on public.projects;
create policy "admin read all projects" on public.projects for select to authenticated using (is_admin());
create policy "admin write projects" on public.projects for insert to authenticated with check (is_admin());
create policy "admin update projects" on public.projects for update to authenticated using (is_admin()) with check (is_admin());
create policy "admin delete projects" on public.projects for delete to authenticated using (is_admin());

-- videos
drop policy if exists "admin read all videos" on public.videos;
drop policy if exists "admin write videos" on public.videos;
drop policy if exists "admin update videos" on public.videos;
drop policy if exists "admin delete videos" on public.videos;
create policy "admin read all videos" on public.videos for select to authenticated using (is_admin());
create policy "admin write videos" on public.videos for insert to authenticated with check (is_admin());
create policy "admin update videos" on public.videos for update to authenticated using (is_admin()) with check (is_admin());
create policy "admin delete videos" on public.videos for delete to authenticated using (is_admin());

-- testimonials
drop policy if exists "admin read all testimonials" on public.testimonials;
drop policy if exists "admin write testimonials" on public.testimonials;
drop policy if exists "admin update testimonials" on public.testimonials;
drop policy if exists "admin delete testimonials" on public.testimonials;
create policy "admin read all testimonials" on public.testimonials for select to authenticated using (is_admin());
create policy "admin write testimonials" on public.testimonials for insert to authenticated with check (is_admin());
create policy "admin update testimonials" on public.testimonials for update to authenticated using (is_admin()) with check (is_admin());
create policy "admin delete testimonials" on public.testimonials for delete to authenticated using (is_admin());

-- contact_messages — c'est ici que fuitaient les données personnelles des visiteurs
drop policy if exists "admin read contact_messages" on public.contact_messages;
drop policy if exists "admin update contact_messages" on public.contact_messages;
drop policy if exists "admin delete contact_messages" on public.contact_messages;
create policy "admin read contact_messages" on public.contact_messages for select to authenticated using (is_admin());
create policy "admin update contact_messages" on public.contact_messages for update to authenticated using (is_admin()) with check (is_admin());
create policy "admin delete contact_messages" on public.contact_messages for delete to authenticated using (is_admin());

-- storage.objects (bucket "media") — c'est ici que se trouvait la capacité de défacement
drop policy if exists "admin upload media" on storage.objects;
drop policy if exists "admin update media" on storage.objects;
drop policy if exists "admin delete media" on storage.objects;
create policy "admin upload media" on storage.objects for insert to authenticated with check (bucket_id = 'media' and is_admin());
create policy "admin update media" on storage.objects for update to authenticated using (bucket_id = 'media' and is_admin()) with check (bucket_id = 'media' and is_admin());
create policy "admin delete media" on storage.objects for delete to authenticated using (bucket_id = 'media' and is_admin());
