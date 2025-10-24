import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResponsiveHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navItems = [
    {
      path: '/',
      label: 'Accueil',
      hasDropdown: false
    },
    {
      path: '/services',
      label: 'Services',
      hasDropdown: true,
      dropdownItems: [
        { path: '/services', label: 'Tous nos services' },
        { path: '/services', label: 'Ouverture de porte', hash: '#ouverture' },
        { path: '/services', label: 'Installation serrure', hash: '#installation' },
        { path: '/services', label: 'Blindage de porte', hash: '#blindage' },
        { path: '/services', label: 'Dépannage urgent', hash: '#depannage' },
      ]
    },
    {
      path: '/emergency',
      label: 'Urgence',
      hasDropdown: false
    },
    {
      path: '/about',
      label: 'À propos',
      hasDropdown: false
    },
    {
      path: '/gallery',
      label: 'Galerie',
      hasDropdown: false
    },
    {
      path: '/blog',
      label: 'Blog',
      hasDropdown: false
    },
    {
      path: '/contact',
      label: 'Contact',
      hasDropdown: false
    },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-gradient-to-b from-primary-900/90 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 z-50">
            <img
              src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
              alt="Serrure Safe"
              className="h-10 sm:h-12 w-auto"
            />
            <span className={`text-lg sm:text-xl font-bold ${
              isScrolled ? 'text-primary-800' : 'text-white'
            }`}>
              Serrure Safe
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center px-3 xl:px-4 py-2 text-sm xl:text-base font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? isScrolled
                        ? 'text-secondary-600 bg-secondary-50'
                        : 'text-secondary-300 bg-white/10'
                      : isScrolled
                        ? 'text-primary-700 hover:text-secondary-600 hover:bg-primary-50'
                        : 'text-white/90 hover:text-secondary-300 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 w-4 h-4" />
                  )}
                </Link>

                {item.hasDropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-primary-100 py-2"
                  >
                    {item.dropdownItems?.map((dropdownItem, index) => (
                      <Link
                        key={index}
                        to={dropdownItem.path + (dropdownItem.hash || '')}
                        className="block px-4 py-2.5 text-sm text-primary-700 hover:text-secondary-600 hover:bg-primary-50 transition-colors"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <a
              href="tel:+33123456789"
              className="flex items-center space-x-2 bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600 text-white px-4 xl:px-6 py-2.5 rounded-lg font-semibold text-sm xl:text-base transition-all duration-200 hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">Appeler</span>
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-primary-700 hover:bg-primary-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-primary-100 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => !item.hasDropdown && setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'text-secondary-600 bg-secondary-50'
                        : 'text-primary-700 hover:text-secondary-600 hover:bg-primary-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </Link>

                  {item.hasDropdown && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdownItems?.map((dropdownItem, index) => (
                        <Link
                          key={index}
                          to={dropdownItem.path + (dropdownItem.hash || '')}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-primary-600 hover:text-secondary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <a
                href="tel:+33123456789"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-secondary-500 to-accent-500 text-white px-6 py-3 rounded-lg font-semibold text-base w-full mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-5 h-5" />
                <span>Appeler maintenant</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ResponsiveHeader;
