import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, User, Wrench, Image, GraduationCap, Video, MessageSquare, Mail, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import AdminLayout from '@/components/admin/AdminLayout';
import { SEO } from '@/components/SEO';
import { useAdminList } from '@/hooks/useListResource';
import { useAdminMessages } from '@/hooks/useContactMessages';

const AdminDashboard = () => {
  const projects = useAdminList('projects');
  const services = useAdminList('services');
  const testimonials = useAdminList('testimonials');
  const formationThemes = useAdminList('formation_themes');
  const videos = useAdminList('videos');
  const aboutValues = useAdminList('about_values');
  const messages = useAdminMessages();

  const publishedCount = (rows?: { is_published: boolean }[]) => rows?.filter((r) => r.is_published).length ?? 0;
  const draftCount = (rows?: { is_published: boolean }[]) => rows?.filter((r) => !r.is_published).length ?? 0;
  const unreadMessages = messages.data?.filter((m) => !m.is_read && !m.is_archived).length ?? 0;

  const countLabel = (query: { isLoading: boolean; data?: unknown[] }, suffix: string) =>
    query.isLoading ? 'Chargement...' : `${query.data?.length ?? 0} ${suffix}`;

  const adminSections = [
    { title: 'Section Hero', description: 'Titre, sous-titre et image principale', icon: <Monitor className="h-8 w-8" />, link: '/admin/hero', color: 'from-blue-500 to-blue-600' },
    { title: 'À Propos', description: 'Texte de présentation et valeurs', icon: <User className="h-8 w-8" />, link: '/admin/about', color: 'from-green-500 to-green-600' },
    { title: 'Services', description: countLabel(services, 'service(s) enregistré(s)'), icon: <Wrench className="h-8 w-8" />, link: '/admin/services', color: 'from-purple-500 to-purple-600' },
    { title: 'Formations', description: countLabel(formationThemes, 'thématique(s)'), icon: <GraduationCap className="h-8 w-8" />, link: '/admin/formations', color: 'from-indigo-500 to-indigo-600' },
    { title: 'Portfolio', description: countLabel(projects, 'projet(s) enregistré(s)'), icon: <Image className="h-8 w-8" />, link: '/admin/portfolio', color: 'from-orange-500 to-orange-600' },
    { title: 'Vidéos', description: countLabel(videos, 'vidéo(s) enregistrée(s)'), icon: <Video className="h-8 w-8" />, link: '/admin/videos', color: 'from-red-500 to-red-600' },
    { title: 'Témoignages', description: countLabel(testimonials, 'avis client(s)'), icon: <MessageSquare className="h-8 w-8" />, link: '/admin/testimonials', color: 'from-pink-500 to-pink-600' },
    { title: 'Messages', description: messages.isLoading ? 'Chargement...' : unreadMessages > 0 ? `${unreadMessages} non lu(s)` : 'Boîte de réception à jour', icon: <Mail className="h-8 w-8" />, link: '/admin/messages', color: 'from-teal-500 to-teal-600' },
    { title: 'Paramètres', description: 'Coordonnées et réseaux sociaux', icon: <SlidersHorizontal className="h-8 w-8" />, link: '/admin/settings', color: 'from-slate-500 to-slate-600' },
  ];

  const isLoadingStats = projects.isLoading || services.isLoading || testimonials.isLoading || formationThemes.isLoading || videos.isLoading || messages.isLoading;

  const stats = [
    { label: 'Projets publiés', value: publishedCount(projects.data) },
    { label: 'Services', value: services.data?.length ?? 0 },
    { label: 'Témoignages', value: testimonials.data?.length ?? 0 },
    { label: 'Vidéos', value: videos.data?.length ?? 0 },
    { label: 'Brouillons (projets)', value: draftCount(projects.data) },
    { label: 'Messages non lus', value: unreadMessages },
  ];

  return (
    <AdminLayout title="Tableau de Bord Admin" description="Gérez le contenu de votre site web">
      <SEO title="Administration" robots="noindex, nofollow" url="https://digithom.com/admin" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {adminSections.map((section) => (
          <Link key={section.link} to={section.link} className="group transition-transform hover:scale-105">
            <Card className="h-full border hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center text-white mb-3`}>
                  {section.icon}
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingStats ? (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;
