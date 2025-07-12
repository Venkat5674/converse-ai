import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="https://i.ibb.co/0px2rjSX/image.png" 
                  alt="Converse AI Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Converse AI
              </span>
            </NavLink>
          </div>

          <div className="flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
                )
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
                )
              }
            >
              About
            </NavLink>
            <NavLink
              to="/use"
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
                )
              }
            >
              Use
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
                )
              }
            >
              Contact
            </NavLink>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-gray-200" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}