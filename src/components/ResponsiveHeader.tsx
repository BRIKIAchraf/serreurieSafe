import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import IntelligentSearch from "./IntelligentSearch";
import { useSounds } from "./SoundManager";

const ResponsiveHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { playClickSound } = useSounds();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  // Bloque le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isMenuOpen]);

  const navItems = [
    { path: "/", label: "Accueil" },
    {
      label: "Entreprise",
      hasDropdown: true,
      subItems: [
        { path: "/services", label: "Services" },
        { path: "/about", label: "À propos de nous" },
      ],
    },
    { path: "/emergency", label: "Urgence 24h/24" },
    { path: "/gallery", label: "Réalisations" },
    { path: "/blog", label: "Actualités" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-100 dark:border-gray-800"
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 lg:h-28">
            {/* === Logo === */}
            <Link
              to="/"
              className="flex items-center space-x-3 z-50"
              onClick={playClickSound}
            >
              <motion.img
                src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
                alt="Serrure Safe"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="h-24 w-auto lg:h-28 transition-all duration-300"
              />
            </Link>

            {/* === Menu Desktop === */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center space-x-1 px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        activeDropdown === item.label
                          ? "text-orange-600 bg-orange-50 dark:bg-orange-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Sous-menu déroulant */}
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700"
                        >
                          {item.subItems?.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              onClick={playClickSound}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 rounded-lg"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      location.pathname === item.path
                        ? "text-orange-600 bg-orange-50 dark:bg-orange-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={playClickSound}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* === Zone droite Desktop === */}
            <div className="hidden lg:flex items-center space-x-3">
              <IntelligentSearch />

              <a
                href="tel:+33185097365"
                className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg text-sm"
                onClick={playClickSound}
              >
                <Phone className="w-4 h-4" />
                <span>01 85 09 73 65</span>
              </a>
            </div>

            {/* === Bouton Menu Mobile === */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-[70]"
            >
              {isMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* === MENU MOBILE === */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer Mobile */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-[60] flex flex-col"
            >
              {/* Header Drawer */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <img
                  src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
                  alt="Serrure Safe"
                  className="h-24 w-auto"
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              {/* Recherche */}
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <IntelligentSearch />
              </div>

              {/* Liens avec dropdown mobile */}
              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {navItems.map((item, index) =>
                  item.hasDropdown ? (
                    <div key={index} className="space-y-1">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.label ? null : item.label
                          )
                        }
                        className="flex items-center justify-between w-full text-base font-medium text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      >
                        <span>{item.label}</span>
                        {activeDropdown === item.label ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="ml-6 space-y-1"
                          >
                            {item.subItems?.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center justify-between text-base font-medium rounded-lg px-4 py-3 transition-all duration-200 ${
                        location.pathname === item.path
                          ? "text-orange-600 bg-orange-50 dark:bg-orange-900/20 shadow-sm"
                          : "text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )
                )}
              </nav>

              {/* Pied Drawer */}
              <div className="border-t border-gray-100 dark:border-gray-800 p-6 space-y-3">
                <a
                  href="tel:+33185097365"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-3.5 rounded-lg font-semibold w-full hover:from-orange-700 hover:to-orange-600 transition-all duration-200 shadow-lg"
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
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResponsiveHeader;
