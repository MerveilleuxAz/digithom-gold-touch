import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminHero = () => {
  const [heroData, setHeroData] = useState({
    title: "Designer, c'est dessiner à dessein.",
    subtitle: "Une approche créative et stratégique pour transformer vos idées en expériences visuelles mémorables.",
    buttonText: "En savoir plus",
    image: "/lovable-uploads/hero.jpg",
    badgeText: "2020",
    labelText: "DESIGNER CRÉATIF",
    experienceText: "Expérience visuelle depuis 2020"
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setHeroData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Ici sera l'appel API pour sauvegarder
    console.log('Sauvegarde des données:', heroData);
    alert('Modifications sauvegardées ! (Demo)');
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
                Gestion Section Hero
              </h1>
              <p className="text-muted-foreground">
                Modifiez le contenu de la section d'accueil
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? 'Masquer' : 'Aperçu'}
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire d'édition */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contenu Textuel</CardTitle>
                <CardDescription>
                  Modifiez les textes de la section hero
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre Principal</Label>
                  <Input
                    id="title"
                    value={heroData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Titre principal"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subtitle">Sous-titre</Label>
                  <Textarea
                    id="subtitle"
                    value={heroData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="Description sous le titre"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="buttonText">Texte du Bouton</Label>
                  <Input
                    id="buttonText"
                    value={heroData.buttonText}
                    onChange={(e) => handleInputChange('buttonText', e.target.value)}
                    placeholder="Texte du bouton"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Éléments Visuels</CardTitle>
                <CardDescription>
                  Gérez l'image et les badges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="image">Image Principale</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={heroData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="URL de l'image"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="labelText">Label Designer</Label>
                  <Input
                    id="labelText"
                    value={heroData.labelText}
                    onChange={(e) => handleInputChange('labelText', e.target.value)}
                    placeholder="DESIGNER CRÉATIF"
                  />
                </div>
                
                <div>
                  <Label htmlFor="experienceText">Texte d'Expérience</Label>
                  <Input
                    id="experienceText"
                    value={heroData.experienceText}
                    onChange={(e) => handleInputChange('experienceText', e.target.value)}
                    placeholder="Expérience visuelle depuis 2020"
                  />
                </div>
                
                <div>
                  <Label htmlFor="badgeText">Badge Année</Label>
                  <Input
                    id="badgeText"
                    value={heroData.badgeText}
                    onChange={(e) => handleInputChange('badgeText', e.target.value)}
                    placeholder="2020"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Aperçu */}
          {showPreview && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Aperçu en Temps Réel</CardTitle>
                  <CardDescription>
                    Visualisez vos modifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-lg p-6 text-white relative overflow-hidden">
                    {/* Version simplifiée de la section hero */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="md:w-1/2 space-y-4">
                        <h1 className="text-2xl font-bold text-yellow-400">
                          {heroData.title}
                        </h1>
                        <p className="text-sm text-gray-300">
                          {heroData.subtitle}
                        </p>
                        <button className="bg-yellow-500 text-black px-4 py-2 rounded text-sm">
                          {heroData.buttonText}
                        </button>
                      </div>
                      <div className="md:w-1/2">
                        <div className="relative w-48 h-32 bg-gray-800 rounded-lg overflow-hidden">
                          {heroData.image && (
                            <img 
                              src={heroData.image} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute bottom-2 left-2 right-2">
                            <div className="bg-black/60 rounded p-2 text-center">
                              <span className="text-yellow-400 text-xs font-semibold">
                                {heroData.labelText}
                              </span>
                              <p className="text-white/80 text-xs">
                                {heroData.experienceText}
                              </p>
                            </div>
                          </div>
                          <div className="absolute -top-2 left-4 bg-black border border-yellow-500/30 rounded-full px-2 py-1">
                            <span className="text-yellow-400 text-xs font-bold">
                              {heroData.badgeText}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <AlertDescription>
                  Cet aperçu est une version simplifiée. Sauvegardez pour voir les changements sur le site principal.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHero;