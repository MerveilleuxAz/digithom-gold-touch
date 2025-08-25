import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const AdminServices = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      icon: 'Monitor',
      title: "Marketing et Communication Digitale",
      description: "Des stratégies digitales complètes pour développer votre présence en ligne et atteindre vos objectifs business.",
      details: [
        "Animation réseaux sociaux",
        "Référencement SEO/SEA",
        "Création site vitrine/e-commerce",
        "Webdesign (UI/UX)",
        "Audits techniques & positionnement"
      ]
    },
    {
      id: 2,
      icon: 'Users',
      title: "Branding de Marque",
      description: "Construction et développement de votre identité de marque pour une position unique sur votre marché.",
      details: [
        "Naming",
        "Positionnement",
        "Plateforme de marque",
        "Audit de marque"
      ]
    }
  ]);

  const [editingService, setEditingService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const icons = [
    'Monitor', 'Users', 'PenTool', 'Video', 'Search', 'Megaphone', 'Smartphone', 'Layout'
  ];

  const handleEdit = (service: any) => {
    setEditingService({ ...service });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (editingService.id) {
      // Mise à jour
      setServices(services.map(s => s.id === editingService.id ? editingService : s));
    } else {
      // Nouveau service
      const newId = Math.max(...services.map(s => s.id)) + 1;
      setServices([...services, { ...editingService, id: newId }]);
    }
    setIsDialogOpen(false);
    setEditingService(null);
  };

  const handleAddNew = () => {
    setEditingService({
      icon: 'Monitor',
      title: '',
      description: '',
      details: ['']
    });
    setIsDialogOpen(true);
  };

  const addDetail = () => {
    setEditingService({
      ...editingService,
      details: [...editingService.details, '']
    });
  };

  const removeDetail = (index: number) => {
    setEditingService({
      ...editingService,
      details: editingService.details.filter((_: any, i: number) => i !== index)
    });
  };

  const updateDetail = (index: number, value: string) => {
    const newDetails = [...editingService.details];
    newDetails[index] = value;
    setEditingService({
      ...editingService,
      details: newDetails
    });
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
                Gestion Services
              </h1>
              <p className="text-muted-foreground">
                Gérez vos services et expertises
              </p>
            </div>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Service
          </Button>
        </div>

        {/* Liste des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary text-sm">{service.icon}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>
                <div className="space-y-1">
                  <Label className="text-xs font-medium">Détails:</Label>
                  {service.details.slice(0, 3).map((detail: string, idx: number) => (
                    <div key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                      <span>•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                  {service.details.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{service.details.length - 3} autres...
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog d'édition */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingService?.id ? 'Modifier le Service' : 'Nouveau Service'}
              </DialogTitle>
              <DialogDescription>
                {editingService?.id ? 'Modifiez les informations du service' : 'Ajoutez un nouveau service'}
              </DialogDescription>
            </DialogHeader>
            
            {editingService && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="icon">Icône</Label>
                  <select
                    id="icon"
                    value={editingService.icon}
                    onChange={(e) => setEditingService({...editingService, icon: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    {icons.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="title">Titre du Service</Label>
                  <Input
                    id="title"
                    value={editingService.title}
                    onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                    placeholder="Nom du service"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingService.description}
                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                    placeholder="Description du service"
                    rows={3}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Détails du Service</Label>
                    <Button size="sm" variant="outline" onClick={addDetail}>
                      <Plus className="h-4 w-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {editingService.details.map((detail: string, index: number) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={detail}
                          onChange={(e) => updateDetail(index, e.target.value)}
                          placeholder="Détail du service"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeDetail(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
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

export default AdminServices;