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
import InterventionProcess from "../components/InterventionProcess";

import ContactModal from "../components/ContactModal";
import InteractiveMap from "../components/InteractiveMap";
import ClientReviews from "../components/ClientReviews";
import InteractivePolls from "../components/InteractivePolls";
import InteractiveCatalog from "../components/InteractiveCatalog";
import LocksmithExpandingOptions from "../components/LocksmithExpandingOptions";
import FloatingCTA from "../components/FloatingCTA";
import SmartCTA from "../components/SmartCTA";
import NavigationGuide from "../components/NavigationGuide";

const ResponsiveHome: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [userBehavior, setUserBehavior] = useState<
    "new" | "returning" | "engaged"
  >("new");

  // Track user engagement
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

  // SERVICES

  const stats = [
    { number: "24h/24", label: "Disponibilité", icon: Clock },
    { number: "15+", label: "Ans d'expérience", icon: Award },
    { number: "1000+", label: "Clients satisfaits", icon: Users },
    { number: "100%", label: "Satisfaction", icon: Star },
  ];

  const features = [
    "Intervention en moins de 30 minutes",
    "Devis gratuit et transparent",
    "Artisan certifié A2P",
    "Garantie sur tous nos travaux",
    "Paiement sécurisé",
    "Service client réactif",
  ];

  return (
    <div className="pt-16 sm:pt-20">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-secondary-900/5 to-accent-900/10" />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center space-x-2 bg-secondary-100 text-secondary-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Clock className="w-4 h-4" />
                <span>Service 24h/24</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-primary-900 leading-tight">
                Serrurier Expert{" "}
                <span className="block bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">
                  à Paris
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-primary-700 leading-relaxed max-w-2xl">
                Intervention rapide 24h/24 pour tous vos besoins de serrurerie.
                Expert certifié A2P avec plus de 15 ans d'expérience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="tel:+33123456789"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>01 23 45 67 89</span>
                </a>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-primary-300 hover:border-secondary-500 text-primary-700 hover:text-secondary-600 px-8 py-3 rounded-lg font-bold text-lg transition-all"
                >
                  <span>Nos Services</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 0.6,
                    }}
                    className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm"
                  >
                    <stat.icon className="w-6 h-6 text-secondary-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary-900">
                      {stat.number}
                    </div>
                    <div className="text-sm text-primary-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Serrurier professionnel"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
                <div className="absolute top-6 left-6 bg-white/90 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-secondary-600" />
                    <div>
                      <div className="font-bold text-primary-900">
                        Certifié A2P
                      </div>
                      <div className="text-sm text-primary-600">
                        Sécurité garantie
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔧 SERVICES + OPTIONS */}
      <LocksmithExpandingOptions />

      {/* 🌍 MAP + CLIENT REVIEWS */}
      <InteractiveMap />
      <ClientReviews />

      {/* 📊 POLLS + CATALOG */}
      <InteractivePolls />
      <InteractiveCatalog />

      {/* ⭐ WHY CHOOSE US */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-primary-900">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-lg text-primary-700">
              Plus de 15 ans d'expérience au service de votre sécurité.
            </p>

            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-xl"
              >
                <CheckCircle className="text-secondary-600" />
                <span className="text-primary-800">{f}</span>
              </motion.div>
            ))}

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 inline-flex items-center space-x-2 bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <span>Demander un devis</span>
              <ArrowRight />
            </button>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Équipe Serrure Safe"
              className="rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* 📞 FINAL CTA */}
      <section className="py-24 bg-gradient-to-r from-primary-800 to-primary-900 relative text-white text-center">
        <div className="absolute inset-0 opacity-10 bg-[url('/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png')] bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold mb-6">
            Besoin d'une intervention urgente ?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Disponible 24h/24 et 7j/7 — intervention rapide garantie.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+33123456789"
              className="inline-flex items-center bg-white text-primary-900 font-bold px-8 py-4 rounded-lg hover:bg-primary-50 transition-all"
            >
              <Phone className="mr-2" /> 01 23 45 67 89
            </a>
            <Link
              to="/emergency"
              className="inline-flex items-center border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-primary-900 transition-all"
            >
              <span>Urgence</span>
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 🔔 MODAL + CTA + GUIDE */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <FloatingCTA variant="emergency" delay={4000} triggerScroll={300} />
      <SmartCTA
        userBehavior={userBehavior}
        currentPage="/"
        timeOnPage={timeOnPage}
        scrollProgress={scrollProgress}
      />
      {/* 🔧 PROCESSUS D’INTERVENTION */}
      <InterventionProcess />

      <NavigationGuide
        isVisible={showGuide}
        onClose={() => setShowGuide(false)}
      />
    </div>
  );
};

export default ResponsiveHome;
