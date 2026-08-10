import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Loader2, Plus, X, Edit } from 'lucide-react';
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
import AboutSection, { DEFAULT_ABOUT_CONTENT } from '@/components/AboutSection';
import { DynamicIcon, ICON_NAMES } from '@/lib/iconMap';
import { useSingleton, useUpdateSingleton } from '@/hooks/useSingletonResource';
import { useAdminList, useCreateItem, useUpdateItem, useDeleteItem, useSwapOrder } from '@/hooks/useListResource';
import { useToast } from '@/hooks/use-toast';
import type { AboutContentRow, AboutValueRow } from '@/integrations/supabase/types';

type ValueDraft = Pick<AboutValueRow, 'icon' | 'title' | 'description'> & { id?: string };

const emptyValueDraft: ValueDraft = { icon: 'Lightbulb', title: '', description: '' };

const AdminAbout = () => {
  const { toast } = useToast();

  const contentQuery = useSingleton('about_content');
  const { mutate: updateContent, isPending: isSavingContent } = useUpdateSingleton('about_content');

  const valuesQuery = useAdminList('about_values');
  const { mutate: createValue, isPending: isCreating } = useCreateItem('about_values');
  const { mutate: updateValue, isPending: isUpdating } = useUpdateItem('about_values');
  const { mutate: deleteValue } = useDeleteItem('about_values');
  const { mutate: swapOrder } = useSwapOrder('about_values');

  const [aboutData, setAboutData] = useState<AboutContentRow>(DEFAULT_ABOUT_CONTENT);
  const [showPreview, setShowPreview] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingValue, setEditingValue] = useState<ValueDraft>(emptyValueDraft);

  useEffect(() => {
    if (contentQuery.data) setAboutData(contentQuery.data);
  }, [contentQuery.data]);

  const handleFieldChange = (field: 'heading' | 'paragraph_1' | 'paragraph_2', value: string) => {
    setAboutData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChecklistChange = (index: number, value: string) => {
    setAboutData((prev) => {
      const checklist = [...prev.checklist];
      checklist[index] = value;
      return { ...prev, checklist };
    });
  };

  const addChecklistItem = () => setAboutData((prev) => ({ ...prev, checklist: [...prev.checklist, ''] }));
  const removeChecklistItem = (index: number) =>
    setAboutData((prev) => ({ ...prev, checklist: prev.checklist.filter((_, i) => i !== index) }));

  const handleSaveContent = () => {
    const { id, updated_at, ...values } = aboutData;
    updateContent(
      { ...values, checklist: values.checklist.filter((item) => item.trim() !== '') },
      {
        onSuccess: () => toast({ title: 'Contenu "À propos" enregistré avec succès' }),
        onError: (error) =>
          toast({
            title: "Échec de l'enregistrement",
            description: error instanceof Error ? error.message : 'Réessayez.',
            variant: 'destructive',
          }),
      }
    );
  };

  const openNewValueDialog = () => {
    setEditingValue(emptyValueDraft);
    setIsDialogOpen(true);
  };

  const openEditValueDialog = (value: AboutValueRow) => {
    setEditingValue({ id: value.id, icon: value.icon, title: value.title, description: value.description });
    setIsDialogOpen(true);
  };

  const handleSaveValue = () => {
    if (!editingValue.title.trim() || !editingValue.description.trim()) {
      toast({ title: 'Titre et description sont requis', variant: 'destructive' });
      return;
    }

    const onSettled = {
      onSuccess: () => {
        toast({ title: 'Valeur enregistrée avec succès' });
        setIsDialogOpen(false);
      },
      onError: (error: unknown) =>
        toast({
          title: "Échec de l'enregistrement",
          description: error instanceof Error ? error.message : 'Réessayez.',
          variant: 'destructive',
        }),
    };

    if (editingValue.id) {
      updateValue({ id: editingValue.id, values: { icon: editingValue.icon, title: editingValue.title, description: editingValue.description } }, onSettled);
    } else {
      const maxOrder = Math.max(0, ...(valuesQuery.data?.map((v) => v.display_order) ?? [0]));
      createValue({ icon: editingValue.icon, title: editingValue.title, description: editingValue.description, display_order: maxOrder + 1 }, onSettled);
    }
  };

  const values = valuesQuery.data ?? [];

  return (
    <AdminLayout title="Gestion À Propos" description="Modifiez le texte de présentation et les valeurs mises en avant">
      <div className="flex items-center justify-between mb-6 gap-4">
        <Link to="/admin" className="text-muted-foreground hover:text-foreground shrink-0">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Masquer' : 'Aperçu'}
          </Button>
        </div>
      </div>

      {contentQuery.isError && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Impossible de charger le contenu "À propos".</span>
            <Button variant="outline" size="sm" onClick={() => contentQuery.refetch()}>Réessayer</Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {contentQuery.isLoading ? (
            <Skeleton className="h-96 w-full" />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Contenu principal</CardTitle>
                <CardDescription>Titre, description et liste de points forts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="heading">Titre *</Label>
                  <Input id="heading" value={aboutData.heading} onChange={(e) => handleFieldChange('heading', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="paragraph1">Premier paragraphe *</Label>
                  <Textarea id="paragraph1" rows={3} value={aboutData.paragraph_1} onChange={(e) => handleFieldChange('paragraph_1', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="paragraph2">Second paragraphe *</Label>
                  <Textarea id="paragraph2" rows={3} value={aboutData.paragraph_2} onChange={(e) => handleFieldChange('paragraph_2', e.target.value)} required />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Points forts</Label>
                    <Button size="sm" variant="outline" onClick={addChecklistItem} type="button">
                      <Plus className="h-4 w-4 mr-1" /> Ajouter
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {aboutData.checklist.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input value={item} onChange={(e) => handleChecklistChange(index, e.target.value)} placeholder="Point fort" />
                        <Button size="sm" variant="outline" type="button" onClick={() => removeChecklistItem(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
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
                <CardTitle>Valeurs / Expertises</CardTitle>
                <CardDescription>Les 4 cartes affichées à côté du texte</CardDescription>
              </div>
              <Button size="sm" onClick={openNewValueDialog}>
                <Plus className="h-4 w-4 mr-2" /> Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              {valuesQuery.isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
              ) : values.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">Aucune valeur pour le moment.</p>
              ) : (
                <div className="space-y-3">
                  {values.map((value, index) => (
                    <div key={value.id} className="flex items-center gap-3 border border-border rounded-lg p-3">
                      <OrderControls
                        canMoveUp={index > 0}
                        canMoveDown={index < values.length - 1}
                        onMoveUp={() => swapOrder({ a: value, b: values[index - 1] })}
                        onMoveDown={() => swapOrder({ a: value, b: values[index + 1] })}
                      />
                      <div className="bg-gold-500/10 p-2 rounded-full">
                        <DynamicIcon name={value.icon} size={20} className="text-gold-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{value.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{value.description}</p>
                      </div>
                      <PublishToggle
                        id={`value-publish-${value.id}`}
                        isPublished={value.is_published}
                        onToggle={(v) => updateValue({ id: value.id, values: { is_published: v } })}
                      />
                      <Button size="sm" variant="ghost" onClick={() => openEditValueDialog(value)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <ConfirmDeleteDialog
                        title="Supprimer cette valeur ?"
                        description={`« ${value.title} » sera définitivement supprimée. Cette action est irréversible.`}
                        onConfirm={() => deleteValue(value.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {showPreview && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Aperçu en Temps Réel</CardTitle>
                <CardDescription>Rendu exact de la section publique</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-[700px] overflow-hidden rounded-b-lg border-t border-border">
                  <div className="absolute inset-0 scale-[0.55] origin-top-left w-[182%] h-[182%]">
                    <AboutSection previewContent={aboutData} previewValues={values.length > 0 ? values : undefined} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingValue.id ? 'Modifier la valeur' : 'Nouvelle valeur'}</DialogTitle>
            <DialogDescription>Une carte d'expertise affichée dans la section À propos.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="value-icon">Icône</Label>
              <Select value={editingValue.icon} onValueChange={(icon) => setEditingValue((prev) => ({ ...prev, icon }))}>
                <SelectTrigger id="value-icon">
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
              <Label htmlFor="value-title">Titre *</Label>
              <Input id="value-title" value={editingValue.title} onChange={(e) => setEditingValue((prev) => ({ ...prev, title: e.target.value }))} required />
            </div>
            <div>
              <Label htmlFor="value-description">Description *</Label>
              <Textarea id="value-description" rows={3} value={editingValue.description} onChange={(e) => setEditingValue((prev) => ({ ...prev, description: e.target.value }))} required />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleSaveValue} disabled={isCreating || isUpdating}>
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

export default AdminAbout;
