import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Loader2, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import ConfirmDeleteDialog from '@/components/admin/ConfirmDeleteDialog';
import PublishToggle from '@/components/admin/PublishToggle';
import OrderControls from '@/components/admin/OrderControls';
import FormationsSection, { DEFAULT_FORMATIONS_CONTENT } from '@/components/FormationsSection';
import { DynamicIcon, ICON_NAMES } from '@/lib/iconMap';
import { useSingleton, useUpdateSingleton } from '@/hooks/useSingletonResource';
import { useAdminList, useCreateItem, useUpdateItem, useDeleteItem, useSwapOrder } from '@/hooks/useListResource';
import { useToast } from '@/hooks/use-toast';
import type { FormationsContentRow, FormationThemeRow } from '@/integrations/supabase/types';

type ThemeDraft = Pick<FormationThemeRow, 'icon' | 'title' | 'description'> & { id?: string };
const emptyThemeDraft: ThemeDraft = { icon: 'Target', title: '', description: '' };

const AdminFormations = () => {
  const { toast } = useToast();

  const contentQuery = useSingleton('formations_content');
  const { mutate: updateContent, isPending: isSavingContent } = useUpdateSingleton('formations_content');

  const themesQuery = useAdminList('formation_themes');
  const { mutate: createTheme, isPending: isCreating } = useCreateItem('formation_themes');
  const { mutate: updateTheme, isPending: isUpdating } = useUpdateItem('formation_themes');
  const { mutate: deleteTheme } = useDeleteItem('formation_themes');
  const { mutate: swapOrder } = useSwapOrder('formation_themes');

  const [formData, setFormData] = useState<FormationsContentRow>(DEFAULT_FORMATIONS_CONTENT);
  const [showPreview, setShowPreview] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<ThemeDraft>(emptyThemeDraft);

  useEffect(() => {
    if (contentQuery.data) setFormData(contentQuery.data);
  }, [contentQuery.data]);

  const handleFieldChange = (field: keyof Omit<FormationsContentRow, 'id' | 'updated_at'>, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveContent = () => {
    const { id, updated_at, ...values } = formData;
    updateContent(values, {
      onSuccess: () => toast({ title: 'Contenu "Formations" enregistré avec succès' }),
      onError: (error) =>
        toast({ title: "Échec de l'enregistrement", description: error instanceof Error ? error.message : 'Réessayez.', variant: 'destructive' }),
    });
  };

  const openNewThemeDialog = () => {
    setEditingTheme(emptyThemeDraft);
    setIsDialogOpen(true);
  };

  const openEditThemeDialog = (theme: FormationThemeRow) => {
    setEditingTheme({ id: theme.id, icon: theme.icon, title: theme.title, description: theme.description });
    setIsDialogOpen(true);
  };

  const handleSaveTheme = () => {
    if (!editingTheme.title.trim() || !editingTheme.description.trim()) {
      toast({ title: 'Titre et description sont requis', variant: 'destructive' });
      return;
    }

    const callbacks = {
      onSuccess: () => {
        toast({ title: 'Thématique enregistrée avec succès' });
        setIsDialogOpen(false);
      },
      onError: (error: unknown) =>
        toast({ title: "Échec de l'enregistrement", description: error instanceof Error ? error.message : 'Réessayez.', variant: 'destructive' }),
    };

    if (editingTheme.id) {
      updateTheme({ id: editingTheme.id, values: { icon: editingTheme.icon, title: editingTheme.title, description: editingTheme.description } }, callbacks);
    } else {
      const maxOrder = Math.max(0, ...(themesQuery.data?.map((t) => t.display_order) ?? [0]));
      createTheme({ icon: editingTheme.icon, title: editingTheme.title, description: editingTheme.description, display_order: maxOrder + 1 }, callbacks);
    }
  };

  const themes = themesQuery.data ?? [];

  return (
    <AdminLayout title="Gestion Formations" description="Gérez le contenu et les thématiques de formation">
      <div className="flex items-center justify-between mb-6 gap-4">
        <Link to="/admin" className="text-muted-foreground hover:text-foreground shrink-0">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <Button variant="outline" className="ml-auto" onClick={() => setShowPreview(!showPreview)}>
          <Eye className="h-4 w-4 mr-2" />
          {showPreview ? 'Masquer' : 'Aperçu'}
        </Button>
      </div>

      {contentQuery.isError && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Impossible de charger le contenu "Formations".</span>
            <Button variant="outline" size="sm" onClick={() => contentQuery.refetch()}>Réessayer</Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {contentQuery.isLoading ? (
            <Skeleton className="h-72 w-full" />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Contenu principal</CardTitle>
                <CardDescription>En-tête de section et carte "Modules de Formation"</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="section_title">Titre de la section *</Label>
                  <Input id="section_title" value={formData.section_title} onChange={(e) => handleFieldChange('section_title', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="section_description">Description de la section *</Label>
                  <Textarea id="section_description" rows={2} value={formData.section_description} onChange={(e) => handleFieldChange('section_description', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="heading">Titre de la carte *</Label>
                  <Input id="heading" value={formData.heading} onChange={(e) => handleFieldChange('heading', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="description">Description de la carte *</Label>
                  <Textarea id="description" rows={3} value={formData.description} onChange={(e) => handleFieldChange('description', e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bullet_1">Point 1</Label>
                    <Input id="bullet_1" value={formData.bullet_1} onChange={(e) => handleFieldChange('bullet_1', e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="bullet_2">Point 2</Label>
                    <Input id="bullet_2" value={formData.bullet_2} onChange={(e) => handleFieldChange('bullet_2', e.target.value)} />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={handleSaveContent} disabled={isSavingContent}>
                    {isSavingContent ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Sauvegarder
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Thématiques</CardTitle>
                <CardDescription>Les cartes affichées à droite de la section</CardDescription>
              </div>
              <Button size="sm" onClick={openNewThemeDialog}>
                <Plus className="h-4 w-4 mr-2" /> Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              {themesQuery.isLoading ? (
                <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
              ) : themes.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">Aucune thématique pour le moment.</p>
              ) : (
                <div className="space-y-3">
                  {themes.map((theme, index) => (
                    <div key={theme.id} className="flex items-center gap-3 border border-border rounded-lg p-3">
                      <OrderControls
                        canMoveUp={index > 0}
                        canMoveDown={index < themes.length - 1}
                        onMoveUp={() => swapOrder({ a: theme, b: themes[index - 1] })}
                        onMoveDown={() => swapOrder({ a: theme, b: themes[index + 1] })}
                      />
                      <div className="bg-gold-500/10 p-2 rounded-full">
                        <DynamicIcon name={theme.icon} size={20} className="text-gold-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{theme.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{theme.description}</p>
                      </div>
                      <PublishToggle id={`theme-publish-${theme.id}`} isPublished={theme.is_published} onToggle={(v) => updateTheme({ id: theme.id, values: { is_published: v } })} />
                      <Button size="sm" variant="ghost" onClick={() => openEditThemeDialog(theme)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <ConfirmDeleteDialog
                        title="Supprimer cette thématique ?"
                        description={`« ${theme.title} » sera définitivement supprimée. Cette action est irréversible.`}
                        onConfirm={() => deleteTheme(theme.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {showPreview && (
          <Card>
            <CardHeader>
              <CardTitle>Aperçu en Temps Réel</CardTitle>
              <CardDescription>Rendu exact de la section publique</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-[700px] overflow-hidden rounded-b-lg border-t border-border">
                <div className="absolute inset-0 scale-[0.55] origin-top-left w-[182%] h-[182%]">
                  <FormationsSection previewContent={formData} previewThemes={themes.length > 0 ? themes : undefined} />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTheme.id ? 'Modifier la thématique' : 'Nouvelle thématique'}</DialogTitle>
            <DialogDescription>Une carte affichée dans la liste des thématiques de formation.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="theme-icon">Icône</Label>
              <Select value={editingTheme.icon} onValueChange={(icon) => setEditingTheme((prev) => ({ ...prev, icon }))}>
                <SelectTrigger id="theme-icon">
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
              <Label htmlFor="theme-title">Titre *</Label>
              <Input id="theme-title" value={editingTheme.title} onChange={(e) => setEditingTheme((prev) => ({ ...prev, title: e.target.value }))} required />
            </div>
            <div>
              <Label htmlFor="theme-description">Description *</Label>
              <Textarea id="theme-description" rows={3} value={editingTheme.description} onChange={(e) => setEditingTheme((prev) => ({ ...prev, description: e.target.value }))} required />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleSaveTheme} disabled={isCreating || isUpdating}>
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

export default AdminFormations;
