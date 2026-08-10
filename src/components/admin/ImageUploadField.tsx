import React, { useRef, useState } from 'react';
import { Loader2, Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUploadMedia } from '@/hooks/useMediaUpload';

interface ImageUploadFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: string;
  required?: boolean;
}

const ImageUploadField = ({ id, label, value, onChange, folder, required }: ImageUploadFieldProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState(false);
  const { mutate: uploadMedia, isPending } = useUploadMedia();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    uploadMedia(
      { file, folder },
      {
        onSuccess: (url) => {
          setImageError(false);
          onChange(url);
          toast({ title: 'Image téléversée avec succès' });
        },
        onError: (error) => {
          toast({
            title: "Échec de l'envoi de l'image",
            description: error instanceof Error ? error.message : 'Réessayez.',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="flex gap-2">
        <Input
          id={id}
          value={value}
          onChange={(e) => {
            setImageError(false);
            onChange(e.target.value);
          }}
          placeholder="URL de l'image ou téléversez un fichier"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          aria-label="Téléverser une image"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        </Button>
        {value && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onChange('')}
            aria-label="Retirer l'image"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {value && !imageError && (
        <img
          src={value}
          alt="Aperçu"
          className="mt-2 w-full h-32 object-cover rounded border border-border"
          onError={() => setImageError(true)}
        />
      )}
      {value && imageError && (
        <p className="text-xs text-destructive">Impossible de charger l'aperçu de cette image.</p>
      )}
    </div>
  );
};

export default ImageUploadField;
