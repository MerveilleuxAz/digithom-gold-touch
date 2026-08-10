import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Edit, Loader2, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AdminLayout from '@/components/admin/AdminLayout';
import ResourceState from '@/components/admin/ResourceState';
import ConfirmDeleteDialog from '@/components/admin/ConfirmDeleteDialog';
import PublishToggle from '@/components/admin/PublishToggle';
import OrderControls from '@/components/admin/OrderControls';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { useAdminList, useCreateItem, useUpdateItem, useDeleteItem, useSwapOrder } from '@/hooks/useListResource';
import { useToast } from '@/hooks/use-toast';
import type { TestimonialRow } from '@/integrations/supabase/types';

type TestimonialDraft = Pick<TestimonialRow, 'name' | 'position' | 'quote' | 'rating' | 'avatar_url'> & { id?: string };
const emptyDraft: TestimonialDraft = { name: '', position: '', quote: '', rating: 5, avatar_url: '' };

const AdminTestimonials = () => {
  const { toast } = useToast();
  const { data: testimonials, isLoading, isError, refetch } = useAdminList('testimonials');
  const { mutate: createTestimonial, isPending: isCreating } = useCreateItem('testimonials');
  const { mutate: updateTestimonial, isPending: isUpdating } = useUpdateItem('testimonials');
  const { mutate: deleteTestimonial } = useDeleteItem('testimonials');
  const { mutate: swapOrder } = useSwapOrder('testimonials');

  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialDraft>(emptyDraft);

  const filtered = useMemo(() => {
    const list = testimonials ?? [];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter((t) => t.name.toLowerCase().includes(q) || (t.position ?? '').toLowerCase().includes(q));
  }, [testimonials, search]);

  const handleEdit = (testimonial: TestimonialRow) => {
    setEditingTestimonial({ id: testimonial.id, name: testimonial.name, position: testimonial.position ?? '', quote: testimonial.quote, rating: testimonial.rating, avatar_url: testimonial.avatar_url ?? '' });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingTestimonial(emptyDraft);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingTestimonial.name.trim() || !editingTestimonial.quote.trim()) {
      toast({ title: 'Nom et témoignage sont requis', variant: 'destructive' });
      return;
    }

    const values = {
      name: editingTestimonial.name.trim(),
      position: editingTestimonial.position?.trim() || null,
      quote: editingTestimonial.quote.trim(),
      rating: editingTestimonial.rating,
      avatar_url: editingTestimonial.avatar_url?.trim() || null,
    };

    const callbacks = {
      onSuccess: () => {
        toast({ title: 'Témoignage enregistré avec succès' });
        setIsDialogOpen(false);
      },
      onError: (error: unknown) =>
        toast({ title: "Échec de l'enregistrement", description: error instanceof Error ? error.message : 'Réessayez.', variant: 'destructive' }),
    };

    if (editingTestimonial.id) {
      updateTestimonial({ id: editingTestimonial.id, values }, callbacks);
    } else {
      const maxOrder = Math.max(0, ...(testimonials?.map((t) => t.display_order) ?? [0]));
      createTestimonial({ ...values, display_order: maxOrder + 1 }, callbacks);
    }
  };

  return (
    <AdminLayout title="Gestion Témoignages" description="Gérez les avis clients">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="relative w-64 max-w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un témoignage..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Témoignage
        </Button>
      </div>

      <ResourceState
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        isEmpty={filtered.length === 0}
        emptyTitle={search ? 'Aucun témoignage ne correspond à votre recherche.' : 'Aucun témoignage pour le moment.'}
        emptyAction={!search && <Button onClick={handleAddNew}><Plus className="h-4 w-4 mr-2" />Ajouter un témoignage</Button>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((testimonial, index) => (
            <Card key={testimonial.id}>
              <CardHeader className="flex flex-row items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar_url ?? undefined} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base truncate">{testimonial.name}</CardTitle>
                  {testimonial.position && <p className="text-xs text-muted-foreground truncate">{testimonial.position}</p>}
                </div>
                <OrderControls
                  canMoveUp={index > 0}
                  canMoveDown={index < filtered.length - 1}
                  onMoveUp={() => swapOrder({ a: testimonial, b: filtered[index - 1] })}
                  onMoveDown={() => swapOrder({ a: testimonial, b: filtered[index + 1] })}
                  disabled={!!search}
                />
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < testimonial.rating ? 'text-gold-500' : 'text-muted-foreground/30'} fill={i < testimonial.rating ? '#E47E01' : 'none'} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{testimonial.quote}</p>
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
                  <PublishToggle id={`testimonial-publish-${testimonial.id}`} isPublished={testimonial.is_published} onToggle={(v) => updateTestimonial({ id: testimonial.id, values: { is_published: v } })} />
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(testimonial)} aria-label="Modifier">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <ConfirmDeleteDialog
                      title="Supprimer ce témoignage ?"
                      description={`Le témoignage de « ${testimonial.name} » sera définitivement supprimé. Cette action est irréversible.`}
                      onConfirm={() => deleteTestimonial(testimonial.id)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ResourceState>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTestimonial.id ? 'Modifier le Témoignage' : 'Nouveau Témoignage'}</DialogTitle>
            <DialogDescription>Avis client affiché dans le carrousel de témoignages.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="t-name">Nom *</Label>
                <Input id="t-name" value={editingTestimonial.name} onChange={(e) => setEditingTestimonial((prev) => ({ ...prev, name: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="t-position">Fonction / Entreprise</Label>
                <Input id="t-position" value={editingTestimonial.position} onChange={(e) => setEditingTestimonial((prev) => ({ ...prev, position: e.target.value }))} placeholder="CEO, Entreprise" />
              </div>
            </div>
            <div>
              <Label htmlFor="t-quote">Témoignage *</Label>
              <Textarea id="t-quote" rows={4} value={editingTestimonial.quote} onChange={(e) => setEditingTestimonial((prev) => ({ ...prev, quote: e.target.value }))} required />
            </div>
            <div>
              <Label htmlFor="t-rating">Note</Label>
              <Select value={String(editingTestimonial.rating)} onValueChange={(v) => setEditingTestimonial((prev) => ({ ...prev, rating: Number(v) }))}>
                <SelectTrigger id="t-rating">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n} étoile{n > 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ImageUploadField
              id="t-avatar"
              label="Photo (avatar)"
              value={editingTestimonial.avatar_url ?? ''}
              onChange={(url) => setEditingTestimonial((prev) => ({ ...prev, avatar_url: url }))}
              folder="testimonials"
            />
            <div className="flex justify-end gap-2 pt-2">
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

export default AdminTestimonials;
