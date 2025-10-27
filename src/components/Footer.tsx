import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Award,
  ExternalLink,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { label: "Ouverture de porte", href: "/services" },
        { label: "Installation de serrures", href: "/services" },
        { label: "Blindage de porte", href: "/services" },
        { label: "Dépannage urgent", href: "/emergency" },
        { label: "Conseil sécurité", href: "/services" },
      ],
    },
    {
      title: "Entreprise",
      links: [
        { label: "À propos", href: "/about" },
        { label: "Nos réalisations", href: "/gallery" },
        { label: "Actualités", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Urgence 24h/24", href: "/emergency" },
        { label: "Devis gratuit", href: "/contact" },
        { label: "Zone d'intervention", href: "/contact" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden text-white">
      {/* 🔹 Dégradé de transition */}
      <div className="absolute -top-10 left-0 right-0 h-8 bg-gradient-to-b from-gray-50 via-gray-200 to-black/90 pointer-events-none" />

      {/* 🔹 Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      {/* 🔹 Overlay sombre */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />

      {/* 🔹 Lumière subtile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            x: ["0%", "40%", "-20%"],
            y: ["0%", "-30%", "40%"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* --- Contenu principal --- */}
      <div className="relative max-w-7xl mx-auto px-6 py-4">
        {/* LOGO + INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <img
            src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
            alt="Serrure Safe"
            className="h-72 mx-auto object-contain drop-shadow-lg mb-0"
          />
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 mb-0">
            Serrure Safe — Votre sécurité, notre priorité
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm leading-snug">
            Intervention rapide 24h/24 à Paris & Île-de-France. Experts en
            dépannage, installation et blindage certifiés A2P.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="space-y-2 text-gray-200 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-400" />
                <a
                  href="tel:+33123456789"
                  className="hover:text-orange-400 font-medium"
                >
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-400" />
                <a
                  href="mailto:contact@serruresafe.fr"
                  className="hover:text-orange-400"
                >
                  contact@serruresafe.fr
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>Paris & Île-de-France</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Disponible 24h/24 – 7j/7</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-orange-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Certifié A2P</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>15 ans d’expérience</span>
              </div>
            </div>
          </motion.div>

          {/* LIENS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-300 text-sm"
          >
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-white font-semibold text-base mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1.5">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.href}
                        className="hover:text-orange-400 transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-xl flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left shadow-md"
        >
          <div>
            <h3 className="text-base font-bold text-white mb-0.5">
              Urgence serrurerie ?
            </h3>
            <p className="text-orange-100 text-xs">
              Intervention rapide — Devis gratuit par téléphone
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href="tel:+33123456789"
              className="flex items-center justify-center bg-white text-orange-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm"
            >
              <Phone className="w-4 h-4 mr-2" /> 01 23 45 67 89
            </a>
            <Link
              to="/emergency"
              className="flex items-center justify-center border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition text-sm"
            >
              Demande urgente <ExternalLink className="ml-2 w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* BAS DE PAGE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-6 border-t border-white/20 pt-3 flex flex-col lg:flex-row justify-between items-center text-gray-400 text-xs space-y-2 lg:space-y-0"
        >
          <p>© {currentYear} Serrure Safe — Tous droits réservés.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#" className="hover:text-orange-400 transition">
              Mentions légales
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              Confidentialité
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              CGV
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              Plan du site
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
