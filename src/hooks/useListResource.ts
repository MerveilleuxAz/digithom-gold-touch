import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Tables = Database['public']['Tables'];

export type ListTableName =
  | 'about_values'
  | 'services'
  | 'formation_themes'
  | 'projects'
  | 'videos'
  | 'testimonials';

export function usePublicList<K extends ListTableName>(table: K) {
  return useQuery({
    queryKey: [table, 'public'],
    queryFn: async () => {
      const { data, error } = await (supabase.from(table as never) as any)
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Tables[K]['Row'][];
    },
  });
}

export function useAdminList<K extends ListTableName>(table: K) {
  return useQuery({
    queryKey: [table, 'admin'],
    queryFn: async () => {
      const { data, error } = await (supabase.from(table as never) as any)
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Tables[K]['Row'][];
    },
  });
}

export function useCreateItem<K extends ListTableName>(table: K) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: Tables[K]['Insert']) => {
      const { data, error } = await (supabase.from(table as never) as any)
        .insert(values)
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

export function useUpdateItem<K extends ListTableName>(table: K) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, values }: { id: string; values: Tables[K]['Update'] }) => {
      const { data, error } = await (supabase.from(table as never) as any)
        .update(values)
        .eq('id', id)
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

export function useDeleteItem<K extends ListTableName>(table: K) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase.from(table as never) as any).delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });
}

/** Échange le display_order de deux éléments (montée/descente simple et fiable). */
export function useSwapOrder<K extends ListTableName>(table: K) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      a,
      b,
    }: {
      a: { id: string; display_order: number };
      b: { id: string; display_order: number };
    }) => {
      const client = supabase.from(table as never) as any;
      const [{ error: errorA }, { error: errorB }] = await Promise.all([
        client.update({ display_order: b.display_order }).eq('id', a.id),
        client.update({ display_order: a.display_order }).eq('id', b.id),
      ]);
      if (errorA) throw errorA;
      if (errorB) throw errorB;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });
}
