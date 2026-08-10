import { useMutation } from '@tanstack/react-query';
import { supabase, MEDIA_BUCKET } from '@/integrations/supabase/client';

export const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024; // 5 Mo
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return 'Format non supporté. Utilisez JPG, PNG, WEBP, GIF ou SVG.';
  }
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return 'Image trop volumineuse (5 Mo maximum).';
  }
  return null;
}

export function useUploadMedia() {
  return useMutation({
    mutationFn: async ({ file, folder }: { file: File; folder: string }) => {
      const validationError = validateImageFile(file);
      if (validationError) throw new Error(validationError);

      const ext = file.name.split('.').pop() || 'jpg';
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) throw error;

      const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
      return data.publicUrl;
    },
  });
}
