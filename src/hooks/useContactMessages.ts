import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ContactMessageRow } from '@/integrations/supabase/types';

export interface ContactMessageInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export function useSubmitContactMessage() {
  return useMutation({
    mutationFn: async (values: ContactMessageInput) => {
      const { error } = await supabase.from('contact_messages').insert(values);
      if (error) throw error;
    },
  });
}

export function useAdminMessages() {
  return useQuery({
    queryKey: ['contact_messages', 'admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as ContactMessageRow[];
    },
  });
}

export function useUpdateContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: Partial<Pick<ContactMessageRow, 'is_read' | 'is_archived'>>;
    }) => {
      const { error } = await supabase.from('contact_messages').update(values).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_messages'] });
    },
  });
}

export function useDeleteContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('contact_messages').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_messages'] });
    },
  });
}
