// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have an App.css for specific App styles

// Import your reusable components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskManager from './components/TaskManager';
import ThemeToggle from './components/ThemeToggle';
import ApiDataDisplay from './components/ApiDataDisplay'; // Ensure this is imported if used

function App() {
  // State for theme management, moved here to control the root 'html' element
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  useEffect(() => {
    // Apply dark class to the html element based on theme state
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Check for system preference if no theme saved
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // MODIFIED: Removed bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100
    // These styles are now handled by the `body` in index.css via @apply directives
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Navbar component */}
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-4">
          <ThemeToggle currentTheme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* TaskManager component */}
        <div className="mb-8">
          <TaskManager />
        </div>

        {/* API Data Display component */}
        <div className="mt-8">
          <ApiDataDisplay /> {/* Ensure this component is rendered if intended */}
        </div>
      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default App;
