import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  Phone,
  Star,
  ArrowRight,
  CheckCircle,
  Award,
  Users,
} from "lucide-react";

import ImmersiveServices from "../components/ImmersiveServices";
import InterventionProcess from "../components/InterventionProcess";
import ContactModal from "../components/ContactModal";
import InteractiveMap from "../components/InteractiveMap";
import ClientReviews from "../components/ClientReviews";
import InteractivePolls from "../components/InteractivePolls";

import NavigationGuide from "../components/NavigationGuide";

const ResponsiveHome: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [userBehavior, setUserBehavior] = useState<
    "new" | "returning" | "engaged"
  >("new");

  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (visited) setUserBehavior("returning");
    else localStorage.setItem("visited", "true");

    const timer = setInterval(() => setTimeOnPage((p) => p + 1), 1000);
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollTop / docHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (timeOnPage > 30 && scrollProgress > 0.5) {
      setUserBehavior("engaged");
    }
  }, [timeOnPage, scrollProgress]);

  const stats = [
    { number: "24h/24", label: "Disponibilité", icon: Clock },
    { number: "15+", label: "Ans d'expérience", icon: Award },
    { number: "1000+", label: "Clients satisfaits", icon: Users },
    { number: "100%", label: "Satisfaction", icon: Star },
  ];

  // animation puzzle
  const cellVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: Math.random() * 10 - 5,
      y: 20,
      filter: "blur(4px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.06,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* 🏠 HERO */}
      <section className="relative flex flex-col lg:flex-row items-center justify-center min-h-[80vh] py-10 px-6 sm:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#FF6B00_0%,_transparent_70%)] opacity-10" />
        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-[#FF6B00]/10 text-[#FF6B00] px-4 py-1.5 rounded-full text-sm font-semibold">
              <Clock className="w-4 h-4" />
              <span>Service 24h/24</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Serrurier Expert{" "}
              <span className="block bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] bg-clip-text text-transparent">
                à Paris
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Intervention rapide 24h/24 pour tous vos besoins de serrurerie.
              Expert certifié A2P avec plus de 15 ans d'expérience.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="tel:+331 85 09 73 65"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] text-white px-6 py-2.5 rounded-lg font-bold text-lg shadow hover:shadow-lg transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>01 85 09 73 65</span>
              </a>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white px-6 py-2.5 rounded-lg font-bold text-lg transition-all"
              >
                <span>Nos Services</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    duration: 0.6,
                  }}
                  className="text-center p-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-sm"
                >
                  <stat.icon className="w-5 h-5 text-[#FF6B00] mx-auto mb-1" />
                  <div className="text-xl font-bold">{stat.number}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Serrurier professionnel"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-3 shadow">
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-[#FF6B00]" />
                  <div>
                    <div className="font-bold text-gray-900">Certifié A2P</div>
                    <div className="text-xs text-gray-600">
                      Sécurité garantie
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <ImmersiveServices />

      {/* SECTIONS CONDENSÉES */}
      <div className="space-y-12">
        <InteractiveMap />
        <ClientReviews />
        <InteractivePolls />
      </div>

      {/* 🌟 POURQUOI NOUS CHOISIR */}
      <section className="relative py-16 bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-center mb-8"
          >
            Pourquoi <span className="text-[#FF6B00]">nous choisir</span> ?
          </motion.h2>

          {/* tableau puzzle */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 shadow-md backdrop-blur-md">
            <table className="min-w-full text-left text-gray-800 dark:text-gray-200">
              <thead className="text-sm uppercase tracking-wide bg-gray-100 dark:bg-gray-800/60">
                <tr>
                  <th className="px-5 py-3 font-semibold">Critère</th>
                  <th className="px-5 py-3 font-semibold text-[#FF6B00]">
                    Nous
                  </th>
                  <th className="px-5 py-3 font-semibold">Standard marché</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                  {
                    crit: "Délai d’intervention",
                    us: "≤ 30 minutes",
                    others: "1–2 heures",
                  },
                  {
                    crit: "Disponibilité",
                    us: "24h/24 — 7j/7",
                    others: "Horaires limités",
                  },
                  {
                    crit: "Qualification",
                    us: "Certifiés A2P",
                    others: "Variable",
                  },
                  {
                    crit: "Devis",
                    us: "Clairs et transparents",
                    others: "Souvent flous",
                  },
                  {
                    crit: "Matériel",
                    us: "Haute sécurité",
                    others: "Entrée de gamme",
                  },
                  {
                    crit: "Garantie",
                    us: "Incluse sur travaux",
                    others: "Selon prestataire",
                  },
                ].map((row, rowIndex) => (
                  <motion.tr
                    key={rowIndex}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {[row.crit, row.us, row.others].map((cell, cellIndex) => (
                      <motion.td
                        key={cellIndex}
                        variants={cellVariants}
                        custom={rowIndex * 3 + cellIndex}
                        className={`px-5 py-3 ${
                          cellIndex === 1
                            ? "text-[#FF6B00] font-semibold"
                            : cellIndex === 2
                            ? "text-gray-500 dark:text-gray-400"
                            : "font-medium"
                        }`}
                      >
                        {cell}
                      </motion.td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <InterventionProcess />

      {/* 📞 CTA FINAL COMPACT */}
      <section className="relative flex flex-col items-center justify-center py-12 px-6 text-center bg-gradient-to-r from-[#FF6B00] to-[#FF3C00] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-2xl mx-auto bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-white">
            Besoin d’une intervention urgente ?
          </h2>
          <p className="text-sm sm:text-base mb-5 text-white/90">
            Disponible 24h/24 et 7j/7 — intervention rapide garantie.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="tel:+331 85 09 73 65"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#FF6B00] font-bold px-5 py-2.5 rounded-lg hover:scale-[1.05] transition-all shadow"
            >
              <Phone className="mr-2 w-5 h-5" />
              01 85 09 73 65
            </a>

            <Link
              to="/emergency"
              className="inline-flex items-center justify-center gap-2 border-2 border-white px-5 py-2.5 rounded-lg font-bold text-white hover:bg-white hover:text-[#FF6B00] transition-all shadow"
            >
              <span>Urgence</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* MODALS + CTA FLOATING */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <NavigationGuide
        isVisible={showGuide}
        onClose={() => setShowGuide(false)}
      />
    </div>
  );
};

export default ResponsiveHome;
