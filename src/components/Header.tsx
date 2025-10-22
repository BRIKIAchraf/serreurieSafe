import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Clock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import IntelligentSearch from './IntelligentSearch';
import MagneticButton from './MagneticButton';
import { useSounds } from './SoundManager';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();
  const { playClickSound } = useSounds();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      path: '/', 
      label: t('nav.home'),
      hasDropdown: false
    },
    { 
      path: '/services', 
      label: t('nav.services'),
      hasDropdown: true,
      dropdownItems: [
        { path: '/services', label: t('services.title') },
        { path: '/services#ouverture', label: t('services.door_opening') },
        { path: '/services#installation', label: t('services.lock_installation') },
        { path: '/services#blindage', label: t('services.door_reinforcement') },
        { path: '/services#depannage', label: t('services.emergency') },
      ]
    },
    { 
      path: '/emergency', 
      label: t('nav.emergency'),
      hasDropdown: false
    },
    { 
      path: '/about', 
      label: t('nav.about'),
      hasDropdown: false
    },
    { 
      path: '/gallery', 
      label: t('nav.gallery'),
      hasDropdown: false
    },
    { 
      path: '/blog', 
      label: t('nav.blog'),
      hasDropdown: false
    },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 z-50">
            <img
              src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
              alt="Serrure Safe"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
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
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                  }`}
                  onClick={playClickSound}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 w-4 h-4" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2"
                  >
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.path}
                        to={dropdownItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>{t('common.available_24_7')}</span>
            </div>
            <IntelligentSearch />
            <ThemeToggle />
            <LanguageToggle />
            <Link
              to="/contact"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              onClick={playClickSound}
            >
              {t('common.contact')}
            </Link>
            <MagneticButton
              href="tel:+33123456789"
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>{t('hero.cta.call')}</span>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href="tel:+33123456789"
                  className="flex items-center justify-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-medium w-full"
                >
                  <Phone className="w-4 h-4" />
                  <span>Appeler maintenant</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;