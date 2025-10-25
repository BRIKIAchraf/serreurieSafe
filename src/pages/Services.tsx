import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Key,
  Shield,
  Building,
  CheckCircle,
  Phone,
  ArrowRight,
  Star,
  Award,
  Camera,
  Car,
  Zap,
} from "lucide-react";
import GlassCard from "../components/GlassCard";
import MagneticButton from "../components/MagneticButton";
import AnimatedCanvas from "../components/AnimatedCanvas";
import SectionDivider from "../components/SectionDivider";
import LocksmithPhotoShowcase from "../components/LocksmithPhotoShowcase";
import LocksmithServiceGallery from "../components/LocksmithServiceGallery";

const Services: React.FC = () => {
  const mainServices = [
    {
      id: "serrurerie-depannage",
      title: "Serrurerie & Dépannage",
      subtitle: "Votre sécurité est notre priorité",
      description:
        "Intervention rapide 24h/24 pour toute ouverture, installation ou réparation de serrure, porte blindée, rideau métallique et plus encore.",
      icon: Key,
      price: "À partir de 89€",
      features: [
        "Ouverture de porte claquée, verrouillée ou bloquée",
        "Réparation et remplacement de serrures toutes marques",
        "Installation de serrures multipoints",
        "Mise en sécurité après effraction",
      ],
      image:
        "https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
      isUrgent: true,
    },
    {
      id: "porte-blindee",
      title: "Dépannage de Porte Blindée",
      subtitle: "Sécurité renforcée garantie",
      description:
        "Votre porte blindée est un gage de sécurité, mais elle peut nécessiter un dépannage en urgence. Nous intervenons pour débloquer, réparer et sécuriser toutes les portes blindées sans endommager la structure.",
      icon: Shield,
      price: "À partir de 120€",
      features: [
        "Déblocage de serrures bloquées ou endommagées",
        "Remplacement de serrures haute sécurité",
        "Mise en sécurité renforcée après effraction",
        "Ajustement et maintenance de portes blindées",
      ],
      image:
        "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
      isUrgent: true,
    },
    {
      id: "rideaux-metalliques",
      title: "Rideaux Métalliques",
      subtitle: "Protection commerciale optimale",
      description:
        "Protégez vos commerces et entrepôts contre les intrusions grâce à nos rideaux métalliques. Installation, entretien et dépannage assurés par des techniciens qualifiés pour une sécurité optimale.",
      icon: Building,
      price: "Devis personnalisé",
      features: [
        "Installation sur mesure adaptée à vos besoins",
        "Réparation rapide en cas de blocage ou panne moteur",
        "Maintenance préventive pour éviter les pannes",
        "Motorisation de rideaux métalliques",
      ],
      image:
        "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
      isUrgent: true,
    },
    {
      id: "videosurveillance",
      title: "Vidéosurveillance",
      subtitle: "Sécurité connectée moderne",
      description:
        "Assurez la sécurité de vos locaux grâce à des systèmes de vidéosurveillance modernes. Nous proposons l'installation et la maintenance de caméras connectées adaptées à chaque environnement.",
      icon: Camera,
      price: "Devis gratuit",
      features: [
        "Installation de caméras intérieures et extérieures",
        "Systèmes connectés avec visualisation à distance",
        "Maintenance et support technique",
        "Conseils en positionnement stratégique",
      ],
      image:
        "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
      isUrgent: true,
    },
    {
      id: "ouverture-vehicules",
      title: "Ouverture de Véhicules",
      subtitle: "Intervention véhicule sans dégât",
      description:
        "Clés perdues, oubliées ou serrure bloquée ? Nous intervenons rapidement pour ouvrir tous types de véhicules sans causer de dommages.",
      icon: Car,
      price: "À partir de 90€",
      features: [
        "Ouverture rapide et sans dégât",
        "Intervention sur voitures, motos et utilitaires",
        "Compatible avec toutes marques et modèles",
        "Disponible 24h/24 et 7j/7",
      ],
      image:
        "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
      isUrgent: true,
    },
    {
      id: "vitrerie",
      title: "Vitrerie",
      subtitle: "Vitres et vitrines professionnelles",
      description:
        "Installation, réparation et remplacement de vitres pour particuliers et professionnels. Travail soigné, rapide et conforme aux normes de sécurité.",
      icon: Building,
      price: "Devis sur mesure",
      features: [
        "Remplacement de vitres cassées",
        "Installation de vitrines commerciales",
        "Pose de parois vitrées et fenêtres isolantes",
        "Intervention rapide après sinistre",
      ],
      image:
        "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
      isUrgent: true,
    },
  ];

  const certifications = [
    {
      name: "A2P",
      description: "Serrures certifiées haute sécurité",
      icon: Award,
    },
    {
      name: "APSAD",
      description: "Norme de sécurité incendie et intrusion",
      icon: Shield,
    },
    {
      name: "CNPP",
      description: "Centre national de prévention et protection",
      icon: Star,
    },
    {
      name: "Garantie D'clik",
      description: "Intervention assurée et garantie",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'url("/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png")',
              backgroundSize: "800px 600px",
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          <AnimatedCanvas type="particles" color="#f97316" intensity={0.3} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Services Professionnels</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Serrurerie & Dépannage à Paris
            </h1>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Votre sécurité est notre priorité. Intervention rapide 24h/24 pour
              toute ouverture, installation ou réparation de serrure, porte
              blindée, rideau métallique et plus encore.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                href="tel:+33123456789"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 hover:shadow-lg"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>01 23 45 67 89</span>
              </MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200"
              >
                <span>Demander un Devis</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="locksmith" color="#2563eb" intensity={0.9} />
      <LocksmithPhotoShowcase />
      {/* Services Grid */}
      <section className="py-20 bg-white relative">
        <AnimatedCanvas type="dots" color="#e5e7eb" intensity={0.2} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour tous vos besoins de sécurité
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group"
              >
                <GlassCard className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 sm:h-80">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {service.price}
                      </span>
                    </div>

                    {/* Urgent Badge */}
                    {service.isUrgent && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Urgence
                      </div>
                    )}

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <service.icon className="w-8 h-8 text-orange-400" />
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {service.title}
                          </h3>
                          <p className="text-orange-200 text-sm">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/services/${service.id}`}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-200 hover:scale-105"
                      >
                        Détails du Service
                      </Link>
                      <MagneticButton
                        href="tel:+33123456789"
                        className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="hidden sm:inline">Appeler</span>
                      </MagneticButton>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="blueprint" color="#1f2937" intensity={0.85} />

      <LocksmithServiceGallery />

      <SectionDivider variant="locksmith" color="#1d4ed8" intensity={0.85} />

      {/* Certifications Section */}
      <section className="py-20 bg-gray-50 relative">
        <AnimatedCanvas type="geometric" color="#f97316" intensity={0.1} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Certifications & Garanties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous travaillons avec des produits certifiés et respectons les
              normes les plus strictes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <GlassCard className="p-6 text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{cert.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider
        variant="blueprint"
        color="#111827"
        intensity={0.7}
        flip
      />

      {/* Emergency CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 relative">
        <AnimatedCanvas type="waves" color="#ffffff" intensity={0.2} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
