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
  Wrench,
  Lock,
  Key,
  CheckCircle,
  Facebook,
  Instagram,
  Music2,
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
    <footer className="relative text-[#333333] font-[Poppins] bg-gradient-to-t from-white via-gray-50 to-white overflow-hidden">
      {/* ✅ Image de fond très claire */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{
          backgroundImage:
            "url('ba2cd3_943ee80cfb6d4c40a3f1a9e1ee42a712~mv2.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />

      {/* --- Contenu principal --- */}
      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* LOGO + INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <img
            src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
            alt="Serrure Safe"
            className="h-56 mx-auto object-contain"
          />

          {/* 🔹 Icônes réseaux sociaux — visibles et colorées */}
          <div className="flex justify-center gap-4 mt-4 mb-6">
            <a
              href="https://www.facebook.com/share/16W65pB35U/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[#FF5B2E] text-white rounded-full shadow-md hover:bg-[#FF784D] transition-transform transform hover:scale-110"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/serruresaf?igsh=MXJudTl0bnZlcm14ZQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-[#FF5B2E] to-[#FF8A65] text-white rounded-full shadow-md hover:scale-110 transition-transform"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.tiktok.com/@serrure.safe?_r=1&_t=ZN-917m0hbyuD0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full shadow-md hover:bg-[#FF5B2E] hover:text-white transition-transform hover:scale-110"
            >
              <Music2 className="w-5 h-5" />
            </a>
          </div>

          <div className="mt max-w-3xl mx-auto bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <h2 className="text-[#FF5B2E] font-semibold text-lg mb-2">
              Serrure Safe – Votre serrurier de confiance, 24h/24 et 7j/7
            </h2>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-3">
              Intervention rapide à domicile ou en entreprise pour tous vos
              besoins en <strong>ouverture de porte</strong>,{" "}
              <strong>dépannage d’urgence</strong>,{" "}
              <strong>installation de serrures</strong> et{" "}
              <strong>renforcement de sécurité</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-sm">
              <div className="flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-[#FF5B2E]" />
                <span>Dépannage express — portes claquées ou verrouillées</span>
              </div>
              <div className="flex items-center space-x-2">
                <Key className="w-4 h-4 text-[#FF5B2E]" />
                <span>Installation & remplacement de serrures</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-[#FF5B2E]" />
                <span>
                  Sécurisation avancée — portes blindées & multipoints
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#FF5B2E]" />
                <span>Devis clair & intervention rapide</span>
              </div>
            </div>

            <p className="mt-4 text-gray-800 text-[14px] font-medium">
              Avec{" "}
              <span className="text-[#FF5B2E] font-semibold">Serrure Safe</span>
              , votre sécurité est entre de bonnes mains.
            </p>
          </div>
        </motion.div>

        {/* GRILLE CONTACT / LIENS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3 text-[14px]"
          >
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#FF5B2E]" />
                <a
                  href="tel:+33185097365"
                  className="hover:text-[#FF5B2E] font-medium"
                >
                  01 85 09 73 65
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#FF5B2E]" />
                <a
                  href="tel:+33783867650"
                  className="hover:text-[#FF5B2E] font-medium"
                >
                  07 83 86 76 50
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#FF5B2E]" />
                <a
                  href="mailto:contact@serruresafe.fr"
                  className="hover:text-[#FF5B2E]"
                >
                  contact@serruresafe.fr
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-[#FF5B2E]" />
                <span>Paris & Île-de-France</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-[#FF5B2E]" />
                <span>Disponible 24h/24 – 7j/7</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-[#FF5B2E] text-sm font-medium">
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
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700 text-[14px]"
          >
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-[#FF5B2E] font-semibold mb-2 text-base">
                  {section.title}
                </h3>
                <ul className="space-y-1.5">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.href}
                        className="hover:text-[#FF5B2E] transition"
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
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#FF5B2E] to-[#FF7B47] p-3 rounded-lg flex flex-col lg:flex-row items-center justify-between gap-3 text-white text-sm shadow-md"
        >
          <div>
            <h3 className="text-base font-bold mb-0.5">Urgence serrurerie ?</h3>
            <p className="text-orange-100 text-xs">
              Intervention rapide — Devis gratuit par téléphone
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href="tel:+33185097365"
              className="flex items-center justify-center bg-white text-[#FF5B2E] font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Phone className="w-4 h-4 mr-2" /> 01 85 09 73 65
            </a>
            <Link
              to="/emergency"
              className="flex items-center justify-center border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#FF5B2E] transition"
            >
              Demande urgente <ExternalLink className="ml-2 w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* BAS DE PAGE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-4 border-t border-gray-200 pt-3 flex flex-col lg:flex-row justify-between items-center text-gray-600 text-xs space-y-2 lg:space-y-0"
        >
          <p>© {currentYear} Serrure Safe — Tous droits réservés.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#" className="hover:text-[#FF5B2E] transition">
              Mentions légales
            </a>
            <a href="#" className="hover:text-[#FF5B2E] transition">
              Confidentialité
            </a>
            <a href="#" className="hover:text-[#FF5B2E] transition">
              CGV
            </a>
            <a href="#" className="hover:text-[#FF5B2E] transition">
              Plan du site
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
