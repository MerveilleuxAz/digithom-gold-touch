import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Edit, Loader2, Search, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import ResourceState from '@/components/admin/ResourceState';
import ConfirmDeleteDialog from '@/components/admin/ConfirmDeleteDialog';
import PublishToggle from '@/components/admin/PublishToggle';
import OrderControls from '@/components/admin/OrderControls';
import ImageUploadField from '@/components/admin/ImageUploadField';
import PaginationControls from '@/components/PaginationControls';
import { useAdminList, useCreateItem, useUpdateItem, useDeleteItem, useSwapOrder } from '@/hooks/useListResource';
import { useToast } from '@/hooks/use-toast';
import type { ProjectRow } from '@/integrations/supabase/types';

const ITEMS_PER_PAGE = 9;

type ProjectDraft = Pick<ProjectRow, 'title' | 'category' | 'image_url' | 'image_alt' | 'description' | 'client' | 'year' | 'project_url'> & { id?: string };

const emptyDraft: ProjectDraft = { title: '', category: '', image_url: '', image_alt: '', description: '', client: '', year: new Date().getFullYear().toString(), project_url: '' };

const AdminPortfolio = () => {
  const { toast } = useToast();
  const { data: projects, isLoading, isError, refetch } = useAdminList('projects');
  const { mutate: createProject, isPending: isCreating } = useCreateItem('projects');
  const { mutate: updateProject, isPending: isUpdating } = useUpdateItem('projects');
  const { mutate: deleteProject } = useDeleteItem('projects');
  const { mutate: swapOrder } = useSwapOrder('projects');

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectDraft>(emptyDraft);

  const categories = useMemo(
    () => Array.from(new Set((projects ?? []).map((p) => p.category))).sort(),
    [projects]
  );

  const filtered = useMemo(() => {
    let list = projects ?? [];
    if (categoryFilter !== 'all') list = list.filter((p) => p.category === categoryFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || (p.client ?? '').toLowerCase().includes(q));
    }
    return list;
  }, [projects, search, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const isFiltering = !!search.trim() || categoryFilter !== 'all';

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };
  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleEdit = (project: ProjectRow) => {
    setEditingProject({
      id: project.id,
      title: project.title,
      category: project.category,
      image_url: project.image_url,
      image_alt: project.image_alt ?? '',
      description: project.description ?? '',
      client: project.client ?? '',
      year: project.year ?? '',
      project_url: project.project_url ?? '',
    });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(emptyDraft);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingProject.title.trim() || !editingProject.category.trim() || !editingProject.image_url.trim()) {
      toast({ title: 'Titre, catégorie et image sont requis', variant: 'destructive' });
      return;
    }

    const values = {
      title: editingProject.title.trim(),
      category: editingProject.category.trim().toLowerCase(),
      image_url: editingProject.image_url.trim(),
      image_alt: editingProject.image_alt?.trim() || null,
      description: editingProject.description?.trim() || null,
      client: editingProject.client?.trim() || null,
      year: editingProject.year?.trim() || null,
      project_url: editingProject.project_url?.trim() || null,
    };

    const callbacks = {
      onSuccess: () => {
        toast({ title: 'Projet enregistré avec succès' });
        setIsDialogOpen(false);
      },
      onError: (error: unknown) =>
        toast({ title: "Échec de l'enregistrement", description: error instanceof Error ? error.message : 'Réessayez.', variant: 'destructive' }),
    };

    if (editingProject.id) {
      updateProject({ id: editingProject.id, values }, callbacks);
    } else {
      const maxOrder = Math.max(0, ...(projects?.map((p) => p.display_order) ?? [0]));
      createProject({ ...values, display_order: maxOrder + 1 }, callbacks);
    }
  };

  return (
    <AdminLayout title="Gestion Portfolio" description="Gérez vos projets et réalisations">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <Link to="/admin" className="text-muted-foreground hover:text-foreground shrink-0">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="relative w-56 max-w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un projet..." value={search} onChange={(e) => handleSearchChange(e.target.value)} className="pl-9" />
          </div>
          <Select value={categoryFilter} onValueChange={handleCategoryFilterChange}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Projet
        </Button>
      </div>

      <ResourceState
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        isEmpty={filtered.length === 0}
        emptyTitle={isFiltering ? 'Aucun projet ne correspond à votre recherche.' : 'Aucun projet pour le moment.'}
        emptyAction={!isFiltering && <Button onClick={handleAddNew}><Plus className="h-4 w-4 mr-2" />Ajouter un projet</Button>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((project) => {
            const fullIndex = (projects ?? []).findIndex((p) => p.id === project.id);
            const canReorder = !isFiltering;
            return (
              <Card key={project.id} className="overflow-hidden flex flex-col">
                <div className="relative h-44">
                  <img src={project.image_url} alt={project.image_alt || project.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                  {!project.is_published && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-background/90">Brouillon</Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">{project.title}</CardTitle>
                    {canReorder && (
                      <OrderControls
                        canMoveUp={fullIndex > 0}
                        canMoveDown={fullIndex < (projects?.length ?? 1) - 1}
                        onMoveUp={() => swapOrder({ a: project, b: projects![fullIndex - 1] })}
                        onMoveDown={() => swapOrder({ a: project, b: projects![fullIndex + 1] })}
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between gap-3">
                  <div className="text-sm text-muted-foreground space-y-1">
                    {project.client && <p>Client : {project.client}</p>}
                    {project.year && <p>Année : {project.year}</p>}
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
                    <PublishToggle
                      id={`project-publish-${project.id}`}
                      isPublished={project.is_published}
                      onToggle={(v) => updateProject({ id: project.id, values: { is_published: v } })}
                    />
                    <div className="flex items-center gap-1">
                      {project.project_url && (
                        <Button size="sm" variant="ghost" asChild aria-label="Ouvrir le lien du projet">
                          <a href={project.project_url} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a>
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(project)} aria-label="Modifier">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <ConfirmDeleteDialog
                        title="Supprimer ce projet ?"
                        description={`« ${project.title} » sera définitivement supprimé du portfolio. Cette action est irréversible.`}
                        onConfirm={() => deleteProject(project.id)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </ResourceState>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject.id ? 'Modifier le Projet' : 'Nouveau Projet'}</DialogTitle>
            <DialogDescription>
              {editingProject.id ? 'Modifiez les informations du projet' : 'Ajoutez un nouveau projet à votre portfolio'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre du Projet *</Label>
              <Input id="title" value={editingProject.title} onChange={(e) => setEditingProject((prev) => ({ ...prev, title: e.target.value }))} placeholder="Nom du projet" required />
            </div>

            <div>
              <Label htmlFor="category">Catégorie *</Label>
              <Input
                id="category"
                value={editingProject.category}
                onChange={(e) => setEditingProject((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="ex. branding, communication, web, print, event"
                list="existing-categories"
                required
              />
              <datalist id="existing-categories">
                {categories.map((cat) => <option key={cat} value={cat} />)}
              </datalist>
            </div>

            <ImageUploadField
              id="image"
              label="Image du Projet"
              value={editingProject.image_url}
              onChange={(url) => setEditingProject((prev) => ({ ...prev, image_url: url }))}
              folder="projects"
              required
            />

            <div>
              <Label htmlFor="imageAlt">Texte alternatif de l'image (SEO / accessibilité)</Label>
              <Input id="imageAlt" value={editingProject.image_alt} onChange={(e) => setEditingProject((prev) => ({ ...prev, image_alt: e.target.value }))} placeholder="Description de l'image" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={editingProject.description} onChange={(e) => setEditingProject((prev) => ({ ...prev, description: e.target.value }))} placeholder="Description détaillée du projet" rows={4} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client">Client</Label>
                <Input id="client" value={editingProject.client} onChange={(e) => setEditingProject((prev) => ({ ...prev, client: e.target.value }))} placeholder="Nom du client" />
              </div>
              <div>
                <Label htmlFor="year">Année</Label>
                <Input id="year" value={editingProject.year} onChange={(e) => setEditingProject((prev) => ({ ...prev, year: e.target.value }))} placeholder="2024" />
              </div>
            </div>

            <div>
              <Label htmlFor="projectUrl">Lien du projet (optionnel)</Label>
              <Input id="projectUrl" type="url" value={editingProject.project_url} onChange={(e) => setEditingProject((prev) => ({ ...prev, project_url: e.target.value }))} placeholder="https://..." />
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

export default AdminPortfolio;
