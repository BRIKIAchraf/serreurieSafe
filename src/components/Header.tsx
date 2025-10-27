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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* === Logo === */}
          <Link to="/" className="flex items-center space-x-3 z-50">
            <img
              src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
              alt="Serrure Safe"
              className="h-10 w-auto"
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
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                  }`}
                  onClick={playClickSound}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                </Link>

                {/* Dropdown */}
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

          {/* === CTA & Outils === */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="hidden xl:flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Disponible 24h/24</span>
            </div>
            <IntelligentSearch />
            <ThemeToggle />
            <LanguageToggle />
            <button
              onClick={handleShowGuide}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Guide de navigation"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <Link
              to="/contact"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
              onClick={playClickSound}
            >
              Contact
            </Link>
            <MagneticButton
              href="tel:+33123456789"
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>01 23 45 67 89</span>
            </MagneticButton>
          </div>

          {/* === Bouton Menu Mobile === */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors z-50"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* === Drawer Mobile Menu === */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay flou et sombre */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer latéral */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
              className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">
                  Menu principal
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col px-6 py-4 space-y-3 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-base font-medium rounded-lg px-4 py-3 transition-colors ${
                      location.pathname === item.path
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto border-t border-gray-100 px-6 py-6">
                <a
                  href="tel:+33123456789"
                  className="flex items-center justify-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-medium w-full hover:bg-orange-700 transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  <span>Appeler maintenant</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
