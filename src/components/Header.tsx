import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Clock, ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import IntelligentSearch from "./IntelligentSearch";
import MagneticButton from "./MagneticButton";
import { useSounds } from "./SoundManager";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();
  const { playClickSound } = useSounds();

  const handleShowGuide = () => {
    const event = new CustomEvent("showUserGuide");
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Désactiver le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    // Cleanup au démontage
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isMenuOpen]);

  const navItems = [
    { path: "/", label: "Accueil", hasDropdown: false },
    {
      path: "/services",
      label: "Services",
      hasDropdown: true,
      dropdownItems: [
        { path: "/services", label: "Tous nos Services" },
        {
          path: "/services/serrurerie-depannage",
          label: "Serrurerie & Dépannage",
        },
        { path: "/services/porte-blindee", label: "Porte Blindée" },
        { path: "/services/rideaux-metalliques", label: "Rideaux Métalliques" },
        { path: "/services/videosurveillance", label: "Vidéosurveillance" },
        { path: "/services/ouverture-vehicules", label: "Ouverture Véhicules" },
        { path: "/services/vitrerie", label: "Vitrerie" },
      ],
    },
    { path: "/emergency", label: "Urgence 24h/24", hasDropdown: false },
    { path: "/about", label: "À propos", hasDropdown: false },
    { path: "/gallery", label: "Réalisations", hasDropdown: false },
    { path: "/blog", label: "Actualités", hasDropdown: false },
    { path: "/client-area", label: "Espace Client", hasDropdown: false },
  ];

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-100 dark:border-gray-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* === Logo === */}
            <Link
              to="/"
              className="flex items-center space-x-3 z-50 relative"
              onClick={playClickSound}
            >
              <img
                src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
                alt="Serrure Safe"
                className="h-14 w-auto sm:h-16 md:h-20 lg:h-24 transition-all duration-200 drop-shadow-lg"
              />
            </Link>

            {/* === Navigation Desktop === */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      location.pathname === item.path
                        ? "text-orange-600 bg-orange-50 dark:bg-orange-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={playClickSound}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 w-4 h-4" />
                    )}
                  </Link>

                  {/* === Dropdown === */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-[100]"
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            to={dropdownItem.path}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                            onClick={playClickSound}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* === CTA & Outils (Desktop) === */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="hidden xl:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Disponible 24h/24</span>
              </div>
              <IntelligentSearch />
              <ThemeToggle />
              <LanguageToggle />
              <button
                onClick={handleShowGuide}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Guide de navigation"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <Link
                to="/contact"
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors"
                onClick={playClickSound}
              >
                Contact
              </Link>
              <MagneticButton
                href="tel:+33185097365"
                className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>01 85 09 73 65</span>
              </MagneticButton>
            </div>

            {/* === Bouton Menu Mobile === */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-[70] relative"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* === Overlay === */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
            onClick={handleMenuClose}
          />
        )}
      </AnimatePresence>

      {/* === Drawer Mobile Menu === */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm h-screen bg-white dark:bg-gray-900 shadow-2xl z-[60] flex flex-col lg:hidden overflow-hidden"
          >
            {/* Header du Drawer */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-orange-50 to-white dark:from-gray-800 dark:to-gray-900">
              <div className="flex items-center space-x-3">
                <img
                  src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
                  alt="Serrure Safe"
                  className="h-10 w-auto"
                />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Menu
                </h2>
              </div>
              <button
                onClick={handleMenuClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleMenuClose}
                  className={`flex items-center justify-between text-base font-medium rounded-lg px-4 py-3 transition-all duration-200 ${
                    location.pathname === item.path
                      ? "text-orange-600 bg-orange-50 dark:bg-orange-900/20 shadow-sm"
                      : "text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Footer du Drawer avec CTA */}
            <div className="border-t border-gray-100 dark:border-gray-800 p-6 space-y-3">
              <a
                href="tel:+33185097365"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-3.5 rounded-lg font-semibold w-full hover:from-orange-700 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={handleMenuClose}
              >
                <Phone className="w-5 h-5" />
                <span>Appeler maintenant</span>
              </a>

              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span>Service disponible 24h/24, 7j/7</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
