import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MailOpen, Archive, ArchiveRestore, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import ResourceState from '@/components/admin/ResourceState';
import ConfirmDeleteDialog from '@/components/admin/ConfirmDeleteDialog';
import { useAdminMessages, useUpdateContactMessage, useDeleteContactMessage } from '@/hooks/useContactMessages';
import { cn } from '@/lib/utils';

type FilterTab = 'inbox' | 'unread' | 'archived';

const AdminMessages = () => {
  const { data: messages, isLoading, isError, refetch } = useAdminMessages();
  const { mutate: updateMessage } = useUpdateContactMessage();
  const { mutate: deleteMessage } = useDeleteContactMessage();

  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<FilterTab>('inbox');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = messages ?? [];
    if (tab === 'inbox') list = list.filter((m) => !m.is_archived);
    if (tab === 'unread') list = list.filter((m) => !m.is_read && !m.is_archived);
    if (tab === 'archived') list = list.filter((m) => m.is_archived);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.message.toLowerCase().includes(q));
    }
    return list;
  }, [messages, tab, search]);

  const unreadCount = messages?.filter((m) => !m.is_read && !m.is_archived).length ?? 0;

  const handleToggleExpand = (id: string, isRead: boolean) => {
    setExpandedId((prev) => (prev === id ? null : id));
    if (!isRead) updateMessage({ id, values: { is_read: true } });
  };

  return (
    <AdminLayout title="Messages" description="Consultez et gérez les messages reçus depuis le formulaire de contact">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="relative w-64 max-w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un message..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>
        <Tabs value={tab} onValueChange={(v) => setTab(v as FilterTab)}>
          <TabsList>
            <TabsTrigger value="inbox">Boîte de réception</TabsTrigger>
            <TabsTrigger value="unread">Non lus{unreadCount > 0 && ` (${unreadCount})`}</TabsTrigger>
            <TabsTrigger value="archived">Archivés</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ResourceState
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
        isEmpty={filtered.length === 0}
        emptyTitle={
          search
            ? 'Aucun message ne correspond à votre recherche.'
            : tab === 'archived'
            ? 'Aucun message archivé.'
            : tab === 'unread'
            ? 'Aucun message non lu. Tout est à jour !'
            : 'Aucun message reçu pour le moment.'
        }
        skeletonCount={4}
      >
        <div className="space-y-3">
          {filtered.map((message) => {
            const isExpanded = expandedId === message.id;
            return (
              <Card
                key={message.id}
                className={cn('cursor-pointer transition-colors', !message.is_read && !message.is_archived && 'border-l-4 border-l-gold-500')}
                onClick={() => handleToggleExpand(message.id, message.is_read)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      {message.is_read ? (
                        <MailOpen className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      ) : (
                        <Mail className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className={cn('font-medium', !message.is_read && 'font-bold')}>{message.name}</p>
                          <span className="text-xs text-muted-foreground">{message.email}</span>
                          {!message.is_read && !message.is_archived && <Badge className="bg-gold-500 text-black hover:bg-gold-500">Nouveau</Badge>}
                        </div>
                        {message.subject && <p className="text-sm text-muted-foreground mt-1">{message.subject}</p>}
                        <p className={cn('text-sm text-muted-foreground mt-1', !isExpanded && 'line-clamp-1')}>{message.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <span className="text-xs text-muted-foreground hidden sm:inline mr-2">
                        {formatDistanceToNow(new Date(message.created_at), { addSuffix: true, locale: fr })}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        aria-label={message.is_archived ? 'Désarchiver' : 'Archiver'}
                        onClick={() => updateMessage({ id: message.id, values: { is_archived: !message.is_archived } })}
                      >
                        {message.is_archived ? <ArchiveRestore className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                      </Button>
                      <ConfirmDeleteDialog
                        title="Supprimer ce message ?"
                        description={`Le message de « ${message.name} » sera définitivement supprimé. Cette action est irréversible.`}
                        onConfirm={() => deleteMessage(message.id)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ResourceState>
    </AdminLayout>
  );
};

export default AdminMessages;
