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
      {/* 🔹 Dégradé de transition depuis la couleur du site */}
      <div className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 via-gray-200 to-black/90 pointer-events-none" />

      {/* 🔹 Image de fond serrurerie */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      {/* 🔹 Overlay sombre dégradé */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />

      {/* 🔹 Lumière flottante subtile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            x: ["0%", "40%", "-20%"],
            y: ["0%", "-30%", "40%"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* --- Contenu principal --- */}
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* LOGO + INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <img
            src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
            alt="Serrure Safe"
            className="h-14 mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 mb-2">
            Serrure Safe — Votre sécurité, notre priorité
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base">
            Intervention rapide 24h/24 à Paris & Île-de-France. Experts en
            dépannage, installation et blindage certifiés A2P.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact + Certif */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* CONTACT INFO */}
            <div className="space-y-4 text-gray-200">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400" />
                <a
                  href="tel:+33123456789"
                  className="hover:text-orange-400 font-medium"
                >
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <a
                  href="mailto:contact@serruresafe.fr"
                  className="hover:text-orange-400"
                >
                  contact@serruresafe.fr
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>Paris & Île-de-France</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-400" />
                <span>Disponible 24h/24 – 7j/7</span>
              </div>
            </div>

            {/* CERTIFICATIONS */}
            <div className="flex flex-wrap gap-6 text-sm text-orange-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Certifié A2P</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
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
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-300"
          >
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-white font-semibold text-lg mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.href}
                        className="hover:text-orange-400 text-sm transition"
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left shadow-lg"
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Urgence serrurerie ?
            </h3>
            <p className="text-orange-100 text-sm">
              Intervention rapide — Devis gratuit par téléphone
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+33123456789"
              className="flex items-center justify-center bg-white text-orange-600 font-semibold px-5 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <Phone className="w-5 h-5 mr-2" /> 01 23 45 67 89
            </a>
            <Link
              to="/emergency"
              className="flex items-center justify-center border-2 border-white text-white px-5 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition"
            >
              Demande urgente <ExternalLink className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* BOTTOM BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="mt-12 border-t border-white/20 pt-6 flex flex-col lg:flex-row justify-between items-center text-gray-400 text-sm space-y-3 lg:space-y-0"
        >
          <p>© {currentYear} Serrure Safe — Tous droits réservés.</p>
          <div className="flex flex-wrap justify-center gap-6">
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
