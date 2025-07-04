// src/components/ThemeToggle.jsx
import React from 'react';
import { Button } from './ui/button'; // Using shadcn/ui Button
import { Sun, Moon } from 'lucide-react'; // For sun/moon icons

function ThemeToggle({ currentTheme, toggleTheme }) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {currentTheme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" />
      )}
    </Button>
  );
}

export default ThemeToggle;
