import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ResponsiveHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navItems = [
    { path: "/", label: "Accueil", hasDropdown: false },
    { path: "/services", label: "Services", hasDropdown: false },
    { path: "/emergency", label: "Urgence", hasDropdown: false },
    { path: "/about", label: "À propos", hasDropdown: false },
    { path: "/gallery", label: "Galerie", hasDropdown: false },
    { path: "/blog", label: "Blog", hasDropdown: false },
    { path: "/contact", label: "Contact", hasDropdown: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-gradient-to-b from-primary-900/90 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* === Logo === */}
          <Link to="/" className="flex items-center space-x-3 z-50">
            <img
              src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
              alt="Serrure Safe"
              className="h-10 sm:h-12 w-auto"
            />
            <span
              className={`text-lg sm:text-xl font-bold ${
                isScrolled ? "text-primary-800" : "text-white"
              }`}
            >
              Serrure Safe
            </span>
          </Link>

          {/* === Navigation desktop === */}
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
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "text-orange-600 bg-orange-50"
                      : isScrolled
                      ? "text-gray-800 hover:text-orange-600 hover:bg-gray-50"
                      : "text-white hover:text-orange-300 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                </Link>
              </div>
            ))}
          </nav>

          {/* === CTA === */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+33123456789"
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Appeler</span>
            </a>
          </div>

          {/* === Bouton mobile === */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-gray-800 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* === Drawer mobile === */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer latéral */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
              }}
              className="fixed top-0 right-0 w-[80%] sm:w-[60%] h-full bg-gradient-to-b from-white to-orange-50 shadow-2xl z-50 flex flex-col"
            >
              {/* Header drawer */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                <img
                  src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
                  alt="Serrure Safe"
                  className="h-10 w-auto"
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Liens navigation */}
              <nav className="flex flex-col px-6 py-4 space-y-3 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-base font-medium rounded-lg px-4 py-3 transition-colors ${
                      location.pathname === item.path
                        ? "text-orange-600 bg-orange-100"
                        : "text-gray-800 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Bouton appeler */}
              <div className="mt-auto border-t border-gray-200 px-6 py-6">
                <a
                  href="tel:+33123456789"
                  className="flex items-center justify-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold w-full hover:bg-orange-700 transition-all duration-200"
                >
                  <Phone className="w-5 h-5" />
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

export default ResponsiveHeader;
