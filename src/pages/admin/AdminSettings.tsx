import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { DEFAULT_SITE_SETTINGS } from '@/components/ContactSection';
import { useSingleton, useUpdateSingleton } from '@/hooks/useSingletonResource';
import { useToast } from '@/hooks/use-toast';
import type { SiteSettingsRow } from '@/integrations/supabase/types';

const AdminSettings = () => {
  const { toast } = useToast();
  const { data, isLoading, isError, refetch } = useSingleton('site_settings');
  const { mutate: updateSettings, isPending: isSaving } = useUpdateSingleton('site_settings');

  const [settings, setSettings] = useState<SiteSettingsRow>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    if (data) setSettings(data);
  }, [data]);

  const handleChange = (field: keyof SiteSettingsRow, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const { id, updated_at, ...values } = settings;
    updateSettings(values, {
      onSuccess: () => toast({ title: 'Paramètres enregistrés avec succès' }),
      onError: (error) =>
        toast({ title: "Échec de l'enregistrement", description: error instanceof Error ? error.message : 'Réessayez.', variant: 'destructive' }),
    });
  };

  if (isLoading) {
    return (
      <AdminLayout title="Paramètres" description="Coordonnées, réseaux sociaux et informations de l'entreprise">
        <Skeleton className="h-96 w-full" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Paramètres" description="Coordonnées, réseaux sociaux et informations de l'entreprise">
      <div className="flex items-center justify-between mb-6 gap-4">
        <Link to="/admin" className="text-muted-foreground hover:text-foreground shrink-0">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <Button onClick={handleSave} disabled={isSaving} className="ml-auto">
          {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Sauvegarder
        </Button>
      </div>

      {isError && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>Impossible de charger les paramètres.</span>
            <Button variant="outline" size="sm" onClick={() => refetch()}>Réessayer</Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Identité</CardTitle>
            <CardDescription>Nom, slogan et logo de l'entreprise</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="company_name">Nom de l'entreprise *</Label>
              <Input id="company_name" value={settings.company_name} onChange={(e) => handleChange('company_name', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="tagline">Slogan</Label>
              <Input id="tagline" value={settings.tagline} onChange={(e) => handleChange('tagline', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="footer_description">Description (pied de page)</Label>
              <Textarea id="footer_description" rows={3} value={settings.footer_description} onChange={(e) => handleChange('footer_description', e.target.value)} />
            </div>
            <ImageUploadField id="logo_url" label="Logo" value={settings.logo_url ?? ''} onChange={(url) => handleChange('logo_url', url)} folder="branding" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coordonnées</CardTitle>
            <CardDescription>Utilisées dans la section Contact et le pied de page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={settings.email} onChange={(e) => handleChange('email', e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone_display">Téléphone (affiché)</Label>
                <Input id="phone_display" value={settings.phone_display} onChange={(e) => handleChange('phone_display', e.target.value)} placeholder="+229 01 41 51 53 03" />
              </div>
              <div>
                <Label htmlFor="phone_link">Téléphone (lien tel:)</Label>
                <Input id="phone_link" value={settings.phone_link} onChange={(e) => handleChange('phone_link', e.target.value)} placeholder="+2290141515303" />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input id="address" value={settings.address} onChange={(e) => handleChange('address', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="address_map_url">Lien Google Maps</Label>
              <Input id="address_map_url" value={settings.address_map_url ?? ''} onChange={(e) => handleChange('address_map_url', e.target.value)} placeholder="https://maps.google.com/?q=..." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Horaires d'ouverture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="hours_weekdays">Lundi - Vendredi</Label>
              <Input id="hours_weekdays" value={settings.hours_weekdays ?? ''} onChange={(e) => handleChange('hours_weekdays', e.target.value)} placeholder="9:00 - 18:00" />
            </div>
            <div>
              <Label htmlFor="hours_saturday">Samedi</Label>
              <Input id="hours_saturday" value={settings.hours_saturday ?? ''} onChange={(e) => handleChange('hours_saturday', e.target.value)} placeholder="10:00 - 15:00" />
            </div>
            <div>
              <Label htmlFor="hours_sunday">Dimanche</Label>
              <Input id="hours_sunday" value={settings.hours_sunday ?? ''} onChange={(e) => handleChange('hours_sunday', e.target.value)} placeholder="Fermé" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Réseaux sociaux</CardTitle>
            <CardDescription>Laissez vide ou "#" pour masquer un lien</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="facebook_url">Facebook</Label>
              <Input id="facebook_url" value={settings.facebook_url ?? ''} onChange={(e) => handleChange('facebook_url', e.target.value)} placeholder="https://facebook.com/..." />
            </div>
            <div>
              <Label htmlFor="tiktok_url">TikTok</Label>
              <Input id="tiktok_url" value={settings.tiktok_url ?? ''} onChange={(e) => handleChange('tiktok_url', e.target.value)} placeholder="https://tiktok.com/@..." />
            </div>
            <div>
              <Label htmlFor="instagram_url">Instagram</Label>
              <Input id="instagram_url" value={settings.instagram_url ?? ''} onChange={(e) => handleChange('instagram_url', e.target.value)} placeholder="https://instagram.com/..." />
            </div>
            <div>
              <Label htmlFor="linkedin_url">LinkedIn</Label>
              <Input id="linkedin_url" value={settings.linkedin_url ?? ''} onChange={(e) => handleChange('linkedin_url', e.target.value)} placeholder="https://linkedin.com/company/..." />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
