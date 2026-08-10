import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Edit, Loader2, Search, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import ResourceState from '@/components/admin/ResourceState';
import ConfirmDeleteDialog from '@/components/admin/ConfirmDeleteDialog';
import PublishToggle from '@/components/admin/PublishToggle';
import OrderControls from '@/components/admin/OrderControls';
import { useAdminList, useCreateItem, useUpdateItem, useDeleteItem, useSwapOrder } from '@/hooks/useListResource';
import { useToast } from '@/hooks/use-toast';
import type { VideoRow } from '@/integrations/supabase/types';

type VideoDraft = Pick<VideoRow, 'title' | 'description' | 'video_url' | 'duration'> & { id?: string };
const emptyDraft: VideoDraft = { title: '', description: '', video_url: '', duration: '' };

const getThumbnailUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  } catch {
    return '/placeholder.svg';
  }
};

const AdminVideos = () => {
  const { toast } = useToast();
  const { data: videos, isLoading, isError, refetch } = useAdminList('videos');
  const { mutate: createVideo, isPending: isCreating } = useCreateItem('videos');
  const { mutate: updateVideo, isPending: isUpdating } = useUpdateItem('videos');
  const { mutate: deleteVideo } = useDeleteItem('videos');
  const { mutate: swapOrder } = useSwapOrder('videos');

  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoDraft>(emptyDraft);

  const filtered = useMemo(() => {
    const list = videos ?? [];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter((v) => v.title.toLowerCase().includes(q));
  }, [videos, search]);

  const handleEdit = (video: VideoRow) => {
    setEditingVideo({ id: video.id, title: video.title, description: video.description ?? '', video_url: video.video_url, duration: video.duration ?? '' });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingVideo(emptyDraft);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingVideo.title.trim() || !editingVideo.video_url.trim()) {
      toast({ title: 'Titre et URL YouTube sont requis', variant: 'destructive' });
      return;
    }

    const values = {
      title: editingVideo.title.trim(),
      video_url: editingVideo.video_url.trim(),
      description: editingVideo.description?.trim() || null,
      duration: editingVideo.duration?.trim() || null,
    };

    const callbacks = {
      onSuccess: () => {
        toast({ title: 'Vidéo enregistrée avec succès' });
        setIsDialogOpen(false);
      },
      onError: (error: unknown) =>
        toast({ title: "Échec de l'enregistrement", description: error instanceof Error ? error.message : 'Réessayez.', variant: 'destructive' }),
    };

    if (editingVideo.id) {
      updateVideo({ id: editingVideo.id, values }, callbacks);
    } else {
      const maxOrder = Math.max(0, ...(videos?.map((v) => v.display_order) ?? [0]));
      createVideo({ ...values, display_order: maxOrder + 1 }, callbacks);
    }
  };

  return (
    <AdminLayout title="Gestion Vidéos" description="Gérez les vidéos de présentation">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="relative w-64 max-w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher une vidéo..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Vidéo
        </Button>
      </div>

      <ResourceState
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        isEmpty={filtered.length === 0}
        emptyTitle={search ? 'Aucune vidéo ne correspond à votre recherche.' : 'Aucune vidéo pour le moment.'}
        emptyAction={!search && <Button onClick={handleAddNew}><Plus className="h-4 w-4 mr-2" />Ajouter une vidéo</Button>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video, index) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <img src={getThumbnailUrl(video.video_url)} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="text-white h-10 w-10" />
                </div>
                {video.duration && <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-gold-300">{video.duration}</div>}
              </div>
              <CardHeader className="pb-2 flex flex-row items-start justify-between gap-2">
                <CardTitle className="text-base leading-snug truncate">{video.title}</CardTitle>
                <OrderControls
                  canMoveUp={index > 0}
                  canMoveDown={index < filtered.length - 1}
                  onMoveUp={() => swapOrder({ a: video, b: filtered[index - 1] })}
                  onMoveDown={() => swapOrder({ a: video, b: filtered[index + 1] })}
                  disabled={!!search}
                />
              </CardHeader>
              <CardContent>
                {video.description && <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{video.description}</p>}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
                  <PublishToggle id={`video-publish-${video.id}`} isPublished={video.is_published} onToggle={(v) => updateVideo({ id: video.id, values: { is_published: v } })} />
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(video)} aria-label="Modifier">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <ConfirmDeleteDialog
                      title="Supprimer cette vidéo ?"
                      description={`« ${video.title} » sera définitivement supprimée. Cette action est irréversible.`}
                      onConfirm={() => deleteVideo(video.id)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ResourceState>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingVideo.id ? 'Modifier la Vidéo' : 'Nouvelle Vidéo'}</DialogTitle>
            <DialogDescription>Renseignez une URL YouTube valide (ex. https://www.youtube.com/watch?v=...).</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="video-title">Titre *</Label>
              <Input id="video-title" value={editingVideo.title} onChange={(e) => setEditingVideo((prev) => ({ ...prev, title: e.target.value }))} required />
            </div>
            <div>
              <Label htmlFor="video-url">URL YouTube *</Label>
              <Input id="video-url" value={editingVideo.video_url} onChange={(e) => setEditingVideo((prev) => ({ ...prev, video_url: e.target.value }))} placeholder="https://www.youtube.com/watch?v=..." required />
            </div>
            <div>
              <Label htmlFor="video-duration">Durée</Label>
              <Input id="video-duration" value={editingVideo.duration} onChange={(e) => setEditingVideo((prev) => ({ ...prev, duration: e.target.value }))} placeholder="ex. 2:45" />
            </div>
            <div>
              <Label htmlFor="video-description">Description</Label>
              <Textarea id="video-description" rows={3} value={editingVideo.description} onChange={(e) => setEditingVideo((prev) => ({ ...prev, description: e.target.value }))} />
            </div>
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

export default AdminVideos;
