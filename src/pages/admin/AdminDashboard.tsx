import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, User, Settings, Image, FileText, Video, Users, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const adminSections = [
    {
      title: 'Section Hero',
      description: 'Gérer le titre, sous-titre et image principale',
      icon: <Monitor className="h-8 w-8" />,
      link: '/admin/hero',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'À Propos',
      description: 'Modifier le contenu de la section À propos',
      icon: <User className="h-8 w-8" />,
      link: '/admin/about',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Services',
      description: 'Gérer les services et expertises',
      icon: <Settings className="h-8 w-8" />,
      link: '/admin/services',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Portfolio',
      description: 'Gérer les projets et réalisations',
      icon: <Image className="h-8 w-8" />,
      link: '/admin/portfolio',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Témoignages',
      description: 'Gérer les avis clients',
      icon: <MessageSquare className="h-8 w-8" />,
      link: '/admin/testimonials',
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Formations',
      description: 'Gérer les formations disponibles',
      icon: <FileText className="h-8 w-8" />,
      link: '/admin/formations',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Vidéos',
      description: 'Gérer les vidéos de présentation',
      icon: <Video className="h-8 w-8" />,
      link: '/admin/videos',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Contact',
      description: 'Gérer les informations de contact',
      icon: <Users className="h-8 w-8" />,
      link: '/admin/contact',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tableau de Bord Admin
          </h1>
          <p className="text-muted-foreground">
            Gérez le contenu de votre site web
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminSections.map((section, index) => (
            <Link
              key={index}
              to={section.link}
              className="group transition-transform hover:scale-105"
            >
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
                  <CardDescription>
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques Rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Projets Portfolio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4</div>
                  <div className="text-sm text-muted-foreground">Services</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">Témoignages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Formations</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;