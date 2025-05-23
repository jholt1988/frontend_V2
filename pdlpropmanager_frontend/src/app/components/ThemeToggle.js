'use client';

import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  // On mount: apply saved or system theme
  useEffect(() => {
    themeChange(false); // Initial theme setup
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = stored || ( 'business' ? 'dark' : prefersDark ? 'dark' : 'business');
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Apply to <html>
  const applyTheme = (theme) => {

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'business' ? '#000000' : '#ffffff');
    }
  };

  // Toggle logic
  const toggleTheme = () => {
    const newTheme = theme === 'business' ? 'dark' : 'business';
    setTheme(newTheme);
    applyTheme(newTheme);
    // Call themeChange to update the theme in the theme-change library
   themeChange(true)
  }

  if (!theme) return null;

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-secondary text-sm"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
