import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Edit, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const AdminPortfolio = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Refonte Identité Marque',
      category: 'branding',
      image: '/assets/img/branding/branding-1.jpg',
      description: "Modernisation complète de l'identité visuelle d'une marque de luxe, incluant logo, charte graphique et supports de communication.",
      client: 'Luxury Brand Inc.',
      year: '2023'
    },
    {
      id: 2,
      title: 'Site E-commerce Premium',
      category: 'print',
      image: '/assets/img/print/print-1.jpg',
      description: "Conception d'une plateforme e-commerce haut de gamme avec une expérience utilisateur immersive et des parcours d'achat optimisés.",
      client: 'Premium Shop',
      year: '2022'
    }
  ]);

  const [editingProject, setEditingProject] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categories = [
    { value: 'branding', label: 'Branding' },
    { value: 'web', label: 'Web Design' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'print', label: 'Print' }
  ];

  const handleEdit = (project: any) => {
    setEditingProject({ ...project });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (editingProject.id) {
      // Mise à jour
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
    } else {
      // Nouveau projet
      const newId = Math.max(...projects.map(p => p.id)) + 1;
      setProjects([...projects, { ...editingProject, id: newId }]);
    }
    setIsDialogOpen(false);
    setEditingProject(null);
  };

  const handleAddNew = () => {
    setEditingProject({
      title: '',
      category: '',
      image: '',
      description: '',
      client: '',
      year: new Date().getFullYear().toString()
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Gestion Portfolio
              </h1>
              <p className="text-muted-foreground">
                Gérez vos projets et réalisations
              </p>
            </div>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Projet
          </Button>
        </div>

        {/* Liste des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription>
                  {project.category} • {project.year}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
                <p className="text-sm font-medium mt-2">
                  Client: {project.client}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog d'édition */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject?.id ? 'Modifier le Projet' : 'Nouveau Projet'}
              </DialogTitle>
              <DialogDescription>
                {editingProject?.id ? 'Modifiez les informations du projet' : 'Ajoutez un nouveau projet à votre portfolio'}
              </DialogDescription>
            </DialogHeader>
            
            {editingProject && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre du Projet</Label>
                  <Input
                    id="title"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                    placeholder="Nom du projet"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Select 
                    value={editingProject.category} 
                    onValueChange={(value) => setEditingProject({...editingProject, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="image">Image du Projet</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={editingProject.image}
                      onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                      placeholder="URL de l'image"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  {editingProject.image && (
                    <div className="mt-2">
                      <img 
                        src={editingProject.image} 
                        alt="Aperçu" 
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                    placeholder="Description détaillée du projet"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      value={editingProject.client}
                      onChange={(e) => setEditingProject({...editingProject, client: e.target.value})}
                      placeholder="Nom du client"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Année</Label>
                    <Input
                      id="year"
                      value={editingProject.year}
                      onChange={(e) => setEditingProject({...editingProject, year: e.target.value})}
                      placeholder="2023"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPortfolio;