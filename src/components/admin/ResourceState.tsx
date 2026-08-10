import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface ResourceStateProps {
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  isEmpty: boolean;
  emptyTitle: string;
  emptyAction?: React.ReactNode;
  children: React.ReactNode;
  skeletonCount?: number;
}

const ResourceState = ({
  isLoading,
  isError,
  onRetry,
  isEmpty,
  emptyTitle,
  emptyAction,
  children,
  skeletonCount = 6,
}: ResourceStateProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Impossible de charger les données</AlertTitle>
        <AlertDescription className="flex items-center justify-between gap-4">
          <span>Une erreur est survenue. Vérifiez votre connexion et réessayez.</span>
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Réessayer
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 border border-dashed border-border rounded-xl">
        <p className="text-muted-foreground mb-4">{emptyTitle}</p>
        {emptyAction}
      </div>
    );
  }

  return <>{children}</>;
};

export default ResourceState;
