
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [isDark, setIsDark] = React.useState(true); // Par défaut en mode sombre

  React.useEffect(() => {
    // Appliquer le thème au chargement
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0 border border-gold-500/30 hover:bg-gold-500/10"
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-gold-400" />
      ) : (
        <Moon className="h-4 w-4 text-gold-600" />
      )}
    </Button>
  );
};

export default ThemeToggle;
