import React from 'react';
import {
  Lightbulb,
  Palette,
  Compass,
  Target,
  PenTool,
  Megaphone,
  Calendar,
  Printer,
  Users,
  GraduationCap,
  BookOpen,
  Camera,
  HelpCircle,
  type LucideProps,
} from 'lucide-react';

export const ICON_MAP = {
  Lightbulb,
  Palette,
  Compass,
  Target,
  PenTool,
  Megaphone,
  Calendar,
  Printer,
  Users,
  GraduationCap,
  BookOpen,
  Camera,
} as const;

export type IconName = keyof typeof ICON_MAP;

export const ICON_NAMES = Object.keys(ICON_MAP) as IconName[];

export const DynamicIcon = ({ name, ...props }: { name: string } & LucideProps) => {
  const Icon = ICON_MAP[name as IconName] ?? HelpCircle;
  return <Icon {...props} />;
};
