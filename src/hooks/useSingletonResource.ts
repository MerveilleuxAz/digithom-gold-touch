import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Tables = Database['public']['Tables'];

export type SingletonTableName = 'site_settings' | 'hero_content' | 'about_content' | 'formations_content';

export function useSingleton<K extends SingletonTableName>(table: K) {
  return useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await (supabase.from(table as never) as any)
        .select('*')
        .eq('id', 1)
        .single();
      if (error) throw error;
      return data as Tables[K]['Row'];
    },
  });
}

export function useUpdateSingleton<K extends SingletonTableName>(table: K) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: Tables[K]['Update']) => {
      const { data, error } = await (supabase.from(table as never) as any)
        .update(values)
        .eq('id', 1)
        .select()
        .single();
      if (error) throw error;
      return data as Tables[K]['Row'];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });
}
