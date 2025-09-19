import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Load dark mode preference on mount
  useEffect(() => {
    const darkPref = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkPref);
    if (darkPref) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Apply dark mode class on toggle
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1">
        <header className="p-4 bg-gray-200 dark:bg-gray-900 flex justify-between items-center">
          <button
            ref={menuButtonRef}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-gray-300 dark:bg-gray-700 p-2 rounded"
          >
            ☰
          </button>

          <label className="flex items-center space-x-2">
            <input
              id="switch-component"
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="text-sm text-gray-800 dark:text-gray-100">Dark Mode</span>
          </label>
        </header>

        <main className="p-6">Main content goes here</main>
      </div>
    </div>
  );
};

export default Layout;
