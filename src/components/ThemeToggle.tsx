
import React from 'react';
import { Moon, Sun, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative w-9 h-9 border border-gold-500/30 bg-gold-500/10 hover:bg-gold-500/20 text-gold-500 dark:text-gold-400 focus-visible:ring-gold-500 transition-colors"
          aria-label="Changer de thème"
        >
          <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gold-600 dark:text-gold-400" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gold-400" />
          <span className="sr-only">Changer de thème</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border border-border shadow-lg min-w-[140px]">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={`flex items-center gap-2 cursor-pointer focus:bg-gold-500/10 focus:text-gold-600 ${theme === 'light' ? 'font-bold text-gold-600' : ''}`}
        >
          <Sun className="h-4 w-4 text-gold-500" />
          <span>Clair</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-2 cursor-pointer focus:bg-gold-500/10 focus:text-gold-500 ${theme === 'dark' ? 'font-bold text-gold-400' : ''}`}
        >
          <Moon className="h-4 w-4 text-gold-400" />
          <span>Sombre</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={`flex items-center gap-2 cursor-pointer focus:bg-gold-500/10 focus:text-gold-500 ${theme === 'system' ? 'font-bold text-gold-500' : ''}`}
        >
          <Laptop className="h-4 w-4 text-gold-400" />
          <span>Système</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
