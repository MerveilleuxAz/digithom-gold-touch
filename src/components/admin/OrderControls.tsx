import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderControlsProps {
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  disabled?: boolean;
}

const OrderControls = ({ onMoveUp, onMoveDown, canMoveUp, canMoveDown, disabled }: OrderControlsProps) => (
  <div className="flex flex-col gap-0.5">
    <Button
      type="button"
      size="icon"
      variant="ghost"
      className="h-6 w-6"
      onClick={onMoveUp}
      disabled={disabled || !canMoveUp}
      aria-label="Monter"
    >
      <ChevronUp className="h-4 w-4" />
    </Button>
    <Button
      type="button"
      size="icon"
      variant="ghost"
      className="h-6 w-6"
      onClick={onMoveDown}
      disabled={disabled || !canMoveDown}
      aria-label="Descendre"
    >
      <ChevronDown className="h-4 w-4" />
    </Button>
  </div>
);

export default OrderControls;
