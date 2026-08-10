import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Edit, X, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import ResourceState from '@/components/admin/ResourceState';
import ConfirmDeleteDialog from '@/components/admin/ConfirmDeleteDialog';
import PublishToggle from '@/components/admin/PublishToggle';
import OrderControls from '@/components/admin/OrderControls';
import { DynamicIcon, ICON_NAMES } from '@/lib/iconMap';
import { useAdminList, useCreateItem, useUpdateItem, useDeleteItem, useSwapOrder } from '@/hooks/useListResource';
import { useToast } from '@/hooks/use-toast';
import type { ServiceRow } from '@/integrations/supabase/types';

type ServiceDraft = Pick<ServiceRow, 'icon' | 'title' | 'description' | 'details'> & { id?: string };

const emptyDraft: ServiceDraft = { icon: 'PenTool', title: '', description: '', details: [''] };

const AdminServices = () => {
  const { toast } = useToast();
  const { data: services, isLoading, isError, refetch } = useAdminList('services');
  const { mutate: createService, isPending: isCreating } = useCreateItem('services');
  const { mutate: updateService, isPending: isUpdating } = useUpdateItem('services');
  const { mutate: deleteService } = useDeleteItem('services');
  const { mutate: swapOrder } = useSwapOrder('services');

  const [search, setSearch] = useState('');
  const [editingService, setEditingService] = useState<ServiceDraft>(emptyDraft);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    const list = services ?? [];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  }, [services, search]);

  const handleEdit = (service: ServiceRow) => {
    setEditingService({ id: service.id, icon: service.icon, title: service.title, description: service.description, details: [...service.details] });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingService(emptyDraft);
    setIsDialogOpen(true);
  };

  const addDetail = () => setEditingService((prev) => ({ ...prev, details: [...prev.details, ''] }));
  const removeDetail = (index: number) => setEditingService((prev) => ({ ...prev, details: prev.details.filter((_, i) => i !== index) }));
  const updateDetail = (index: number, value: string) =>
    setEditingService((prev) => ({ ...prev, details: prev.details.map((d, i) => (i === index ? value : d)) }));

  const handleSave = () => {
    if (!editingService.title.trim() || !editingService.description.trim()) {
      toast({ title: 'Titre et description sont requis', variant: 'destructive' });
      return;
    }

    const details = editingService.details.map((d) => d.trim()).filter(Boolean);
    const callbacks = {
      onSuccess: () => {
        toast({ title: 'Service enregistré avec succès' });
        setIsDialogOpen(false);
      },
      onError: (error: unknown) =>
        toast({
          title: "Échec de l'enregistrement",
          description: error instanceof Error ? error.message : 'Réessayez.',
          variant: 'destructive',
        }),
    };

    if (editingService.id) {
      updateService({ id: editingService.id, values: { icon: editingService.icon, title: editingService.title, description: editingService.description, details } }, callbacks);
    } else {
      const maxOrder = Math.max(0, ...(services?.map((s) => s.display_order) ?? [0]));
      createService({ icon: editingService.icon, title: editingService.title, description: editingService.description, details, display_order: maxOrder + 1 }, callbacks);
    }
  };

  return (
    <AdminLayout title="Gestion Services" description="Gérez vos services et expertises">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="relative w-64 max-w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un service..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Service
        </Button>
      </div>

      <ResourceState
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        isEmpty={filtered.length === 0}
        emptyTitle={search ? 'Aucun service ne correspond à votre recherche.' : 'Aucun service pour le moment.'}
        emptyAction={!search && <Button onClick={handleAddNew}><Plus className="h-4 w-4 mr-2" />Ajouter un service</Button>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((service, index) => (
            <Card key={service.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <OrderControls
                      canMoveUp={index > 0}
                      canMoveDown={index < filtered.length - 1}
                      onMoveUp={() => swapOrder({ a: service, b: filtered[index - 1] })}
                      onMoveDown={() => swapOrder({ a: service, b: filtered[index + 1] })}
                      disabled={!!search}
                    />
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <DynamicIcon name={service.icon} size={20} className="text-primary" />
                    </div>
                    <CardTitle className="text-lg truncate">{service.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(service)} aria-label="Modifier">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <ConfirmDeleteDialog
                      title="Supprimer ce service ?"
                      description={`« ${service.title} » sera définitivement supprimé du portfolio. Cette action est irréversible.`}
                      onConfirm={() => deleteService(service.id)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <div className="space-y-1 mb-4">
                  <Label className="text-xs font-medium">Détails :</Label>
                  {service.details.slice(0, 3).map((detail, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                      <span>•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                  {service.details.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{service.details.length - 3} autres...</span>
                  )}
                </div>
                <PublishToggle
                  id={`service-publish-${service.id}`}
                  isPublished={service.is_published}
                  onToggle={(v) => updateService({ id: service.id, values: { is_published: v } })}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </ResourceState>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingService.id ? 'Modifier le Service' : 'Nouveau Service'}</DialogTitle>
            <DialogDescription>
              {editingService.id ? 'Modifiez les informations du service' : 'Ajoutez un nouveau service à votre offre'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="icon">Icône</Label>
              <Select value={editingService.icon} onValueChange={(icon) => setEditingService((prev) => ({ ...prev, icon }))}>
                <SelectTrigger id="icon">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ICON_NAMES.map((name) => (
                    <SelectItem key={name} value={name}>
                      <span className="flex items-center gap-2">
                        <DynamicIcon name={name} size={14} /> {name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Titre du Service *</Label>
              <Input id="title" value={editingService.title} onChange={(e) => setEditingService((prev) => ({ ...prev, title: e.target.value }))} placeholder="Nom du service" required />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" value={editingService.description} onChange={(e) => setEditingService((prev) => ({ ...prev, description: e.target.value }))} placeholder="Description du service" rows={3} required />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Détails du Service</Label>
                <Button size="sm" variant="outline" onClick={addDetail} type="button">
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter
                </Button>
              </div>
              <div className="space-y-2">
                {editingService.details.map((detail, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={detail} onChange={(e) => updateDetail(index, e.target.value)} placeholder="Détail du service" />
                    <Button size="sm" variant="outline" type="button" onClick={() => removeDetail(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleSave} disabled={isCreating || isUpdating}>
                {(isCreating || isUpdating) ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Sauvegarder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminServices;
