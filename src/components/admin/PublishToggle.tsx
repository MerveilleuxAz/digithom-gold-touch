import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface PublishToggleProps {
  id: string;
  isPublished: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
}

const PublishToggle = ({ id, isPublished, onToggle, disabled }: PublishToggleProps) => (
  <div className="flex items-center gap-2">
    <Switch id={id} checked={isPublished} onCheckedChange={onToggle} disabled={disabled} />
    <Label htmlFor={id} className="text-sm cursor-pointer text-muted-foreground">
      {isPublished ? 'Publié' : 'Brouillon'}
    </Label>
  </div>
);

export default PublishToggle;
