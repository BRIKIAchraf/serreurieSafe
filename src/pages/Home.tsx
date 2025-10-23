import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Shield,
  Clock,
  Phone,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Award,
  Users,
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import MagneticButton from "../components/MagneticButton";
import InteractiveMap from "../components/InteractiveMap";
import ClientReviews from "../components/ClientReviews";
import InteractivePolls from "../components/InteractivePolls";
import InteractiveCatalog from "../components/InteractiveCatalog";
import { useSounds } from "../components/SoundManager";
import NavigationGuide from "../components/NavigationGuide";
import FloatingCTA from "../components/FloatingCTA";
import SmartCTA from "../components/SmartCTA";
import SectionDivider from "../components/SectionDivider";
import LocksmithExpandingOptions from "../components/LocksmithExpandingOptions";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { playUnlockSound, playKeySound } = useSounds();
  const [showNavigationGuide, setShowNavigationGuide] = useState(false);
  const [userBehavior, setUserBehavior] = useState<
    "new" | "returning" | "engaged"
  >("new");
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Detect user behavior
  useEffect(() => {
    const isReturning = localStorage.getItem("visited") === "true";
    if (isReturning) {
      setUserBehavior("returning");
    } else {
      localStorage.setItem("visited", "true");
    }

    // Track time on page
    const timer = setInterval(() => {
      setTimeOnPage((prev) => prev + 1);
    }, 1000);

    // Track scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update user behavior based on engagement
  useEffect(() => {
    if (timeOnPage > 30 && scrollProgress > 0.5) {
      setUserBehavior("engaged");
    }
  }, [timeOnPage, scrollProgress]);

  const services = [
    {
      title: t("services.door_opening"),
      description:
        "Intervention rapide sans dégâts pour tous types de serrures",
      icon: "🔓",
      features: ["Sans casse", "Tous types", "24h/24"],
    },
    {
      title: t("services.lock_installation"),
      description: "Pose de serrures haute sécurité certifiées A2P",
      icon: "🔐",
      features: ["Certifié A2P", "Haute sécurité", "Garantie 5 ans"],
    },
    {
      title: t("services.door_reinforcement"),
      description:
        "Renforcement de votre sécurité avec des solutions sur mesure",
      icon: "🛡️",
      features: ["Sur mesure", "Normes sécurité", "Résistant"],
    },
    {
      title: t("services.emergency"),
      description: "Service d'urgence disponible 24h/24 et 7j/7",
      icon: "🚨",
      features: ["Intervention < 30min", "Devis gratuit", "Équipe mobile"],
    },
  ];

  const stats = [
    { number: "24h/24", label: t("common.emergency"), icon: Clock },
    { number: "15+", label: `15+ ${t("common.experience")}`, icon: Award },
    { number: "1000+", label: t("common.satisfied_clients"), icon: Users },
    { number: "100%", label: t("common.guarantee"), icon: Star },
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
    <div className="pt-16">
      {/* Hero Section - Neo4j Style */}
      <section className="relative min-h-screen flex items-center">
        {/* Background with Logo Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'url("/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png")',
              backgroundSize: "800px 600px",
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  <span>Urgence 24h/24</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {t("hero.title")}
                  <span className="block text-blue-600">
                    {t("hero.subtitle")}
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  {t("hero.description")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton
                  href="tel:+33123456789"
                  className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 hover:shadow-lg"
                  onClick={playUnlockSound}
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>01 23 45 67 89</span>
                </MagneticButton>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200"
                  onClick={playKeySound}
                >
                  <span>Nos Services</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    className="text-center"
                  >
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg sm:text-2xl font-bold text-gray-900">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Serrurier professionnel à Paris"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Floating Badge */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Certifié A2P
                      </div>
                      <div className="text-sm text-gray-600">
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

      <SectionDivider variant="locksmith" color="#2563eb" intensity={1} />

      <LocksmithExpandingOptions />

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("services.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("services.description")}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ScrollReveal
                key={index}
                delay={index * 0.1}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
              >
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="blueprint" color="#0f172a" intensity={0.8} />

      {/* Interactive Map Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Zone d'
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                intervention
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos temps d'intervention selon votre localisation
            </p>
          </ScrollReveal>
          <InteractiveMap />
        </div>
      </section>

      {/* Client Reviews Section */}
      <ClientReviews />

      {/* Interactive Polls Section */}
      <InteractivePolls />

      {/* Interactive Catalog Section */}
      <InteractiveCatalog />

      <SectionDivider
        variant="locksmith"
        color="#f97316"
        intensity={0.7}
        flip
      />

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Pourquoi choisir Serrure Safe ?
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Plus de 15 ans d'expérience au service de votre sécurité.
                    Nous intervenons rapidement avec du matériel professionnel
                    et certifié.
                  </p>
                </div>

                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <span>En savoir plus sur nous</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Équipe Serrure Safe"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Expertise reconnue
                    </h3>
                    <p className="text-gray-600">
                      Certifiés A2P, nous respectons les normes de sécurité les
                      plus strictes
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider variant="blueprint" color="#1e293b" intensity={0.75} />

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-gray-800 to-gray-900">
        {/* Background with Logo Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'url("/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png")',
              backgroundSize: "700px 525px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 to-gray-900/90"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="relative z-10 text-center text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Besoin d'une intervention urgente ?
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Notre équipe d'experts est disponible 24h/24 et 7j/7 pour répondre
              à tous vos besoins de serrurerie. Intervention rapide garantie sur
              Paris et banlieue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <MagneticButton
                href="tel:+33123456789"
                className="inline-flex items-center space-x-2 bg-white text-gray-900 px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-lg sm:text-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-lg"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>01 23 45 67 89</span>
              </MagneticButton>
              <Link
                to="/emergency"
                className="inline-flex items-center space-x-2 border-2 border-white text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-lg sm:text-xl hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                <span>Demande urgente</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-300 text-lg">
                ⚡ Intervention en moins de 30 minutes • 🛡️ Devis gratuit • ✅
                Satisfaction garantie
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Navigation Guides */}
      <NavigationGuide
        isVisible={showNavigationGuide}
        onClose={() => setShowNavigationGuide(false)}
      />

      <FloatingCTA variant="emergency" delay={5000} triggerScroll={300} />

      <SmartCTA
        userBehavior={userBehavior}
        currentPage="/"
        timeOnPage={timeOnPage}
        scrollProgress={scrollProgress}
      />
    </div>
  );
};

export default Home;
