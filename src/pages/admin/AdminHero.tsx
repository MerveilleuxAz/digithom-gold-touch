import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploadField from '@/components/admin/ImageUploadField';
import HeroSection, { DEFAULT_HERO_CONTENT } from '@/components/HeroSection';
import { useSingleton, useUpdateSingleton } from '@/hooks/useSingletonResource';
import { useToast } from '@/hooks/use-toast';
import type { HeroContentRow } from '@/integrations/supabase/types';

const AdminHero = () => {
  const { toast } = useToast();
  const { data, isLoading, isError, refetch } = useSingleton('hero_content');
  const { mutate: updateHero, isPending: isSaving } = useUpdateSingleton('hero_content');

  const [heroData, setHeroData] = useState<HeroContentRow>(DEFAULT_HERO_CONTENT);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (data) setHeroData(data);
  }, [data]);

  const handleInputChange = (field: keyof HeroContentRow, value: string) => {
    setHeroData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const { id, updated_at, ...values } = heroData;
    updateHero(values, {
      onSuccess: () => toast({ title: 'Section Hero enregistrée avec succès' }),
      onError: (error) =>
        toast({
          title: "Échec de l'enregistrement",
          description: error instanceof Error ? error.message : 'Réessayez.',
          variant: 'destructive',
        }),
    });
  };

  return (
    <AdminLayout title="Gestion Section Hero" description="Modifiez le contenu de la section d'accueil">
      <div className="flex items-center justify-between mb-6 gap-4">
        <Link to="/admin" className="text-muted-foreground hover:text-foreground shrink-0">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Masquer' : 'Aperçu'}
          </Button>
          <Button onClick={handleSave} disabled={isSaving || isLoading}>
            {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Sauvegarder
          </Button>
        </div>
      </div>

      {isError && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Impossible de charger le contenu Hero.</span>
            <Button variant="outline" size="sm" onClick={() => refetch()}>Réessayer</Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {isLoading ? (
            <Skeleton className="h-96 w-full" />
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Contenu Textuel</CardTitle>
                  <CardDescription>Modifiez les textes de la section hero</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titre Principal *</Label>
                    <Input
                      id="title"
                      value={heroData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Titre principal"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subtitle">Sous-titre *</Label>
                    <Textarea
                      id="subtitle"
                      value={heroData.subtitle}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                      placeholder="Description sous le titre"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="buttonText">Texte du Bouton *</Label>
                    <Input
                      id="buttonText"
                      value={heroData.button_text}
                      onChange={(e) => handleInputChange('button_text', e.target.value)}
                      placeholder="Texte du bouton"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Éléments Visuels</CardTitle>
                  <CardDescription>Gérez l'image et les badges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ImageUploadField
                    id="image"
                    label="Image Principale"
                    value={heroData.image_url}
                    onChange={(url) => handleInputChange('image_url', url)}
                    folder="hero"
                    required
                  />

                  <div>
                    <Label htmlFor="imageAlt">Texte alternatif de l'image (SEO / accessibilité)</Label>
                    <Input
                      id="imageAlt"
                      value={heroData.image_alt}
                      onChange={(e) => handleInputChange('image_alt', e.target.value)}
                      placeholder="Description de l'image"
                    />
                  </div>

                  <div>
                    <Label htmlFor="labelText">Label Designer</Label>
                    <Input
                      id="labelText"
                      value={heroData.label_text}
                      onChange={(e) => handleInputChange('label_text', e.target.value)}
                      placeholder="DESIGNER CRÉATIF"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experienceText">Texte d'Expérience</Label>
                    <Input
                      id="experienceText"
                      value={heroData.experience_text}
                      onChange={(e) => handleInputChange('experience_text', e.target.value)}
                      placeholder="Expérience visuelle depuis 2020"
                    />
                  </div>

                  <div>
                    <Label htmlFor="badgeText">Badge</Label>
                    <Input
                      id="badgeText"
                      value={heroData.badge_text}
                      onChange={(e) => handleInputChange('badge_text', e.target.value)}
                      placeholder="Since 2020"
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Aperçu en direct — réutilise exactement le composant public */}
        {showPreview && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Aperçu en Temps Réel</CardTitle>
                <CardDescription>Rendu exact de la section publique avec vos modifications non enregistrées</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-[600px] overflow-hidden rounded-b-lg border-t border-border">
                  <div className="absolute inset-0 scale-[0.6] origin-top-left w-[166%] h-[166%]">
                    <HeroSection previewData={heroData} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Alert>
              <AlertDescription>
                Cliquez sur « Sauvegarder » pour publier ces changements sur le site public.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminHero;
