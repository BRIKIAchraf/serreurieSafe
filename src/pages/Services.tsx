import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Key,
  Shield,
  Building,
  Camera,
  Car,
  CheckCircle,
  Phone,
  ArrowRight,
  Zap,
} from "lucide-react";
import AnimatedCanvas from "../components/AnimatedCanvas";
import LocksmithServiceGallery from "../components/LocksmithServiceGallery";

const Services: React.FC = () => {
  const services = [
    {
      id: "serrurerie",
      title: "Serrurerie & Dépannage",
      icon: Key,
      image:
        "https://images.pexels.com/photos/8090790/pexels-photo-8090790.jpeg?auto=compress&cs=tinysrgb&w=1600",
      description:
        "Ouverture rapide, remplacement et sécurisation de serrures toutes marques. Intervention professionnelle en moins de 30 minutes, 24h/24 à Paris et alentours.",
      points: [
        "Ouverture sans dégât",
        "Serrures multipoints",
        "Mise en sécurité immédiate",
        "Service d’urgence 24h/24",
      ],
    },
    {
      id: "porte-blindee",
      title: "Portes Blindées & Sécurité",
      icon: Shield,
      image:
        "https://images.pexels.com/photos/4792511/pexels-photo-4792511.jpeg?auto=compress&cs=tinysrgb&w=1600",
      description:
        "Installation de portes blindées esthétiques et performantes. Nos produits certifiés A2P assurent protection, isolation et design moderne.",
      points: [
        "Portes haute sécurité A2P",
        "Installation sur mesure",
        "Isolation phonique et thermique",
        "Garantie 10 ans",
      ],
    },
    {
      id: "rideaux-metalliques",
      title: "Rideaux Métalliques & Volets",
      icon: Building,
      image:
        "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=1600",
      description:
        "Sécurisez votre commerce ou garage avec un rideau métallique motorisé. Dépannage et maintenance express, 7j/7.",
      points: [
        "Installation rapide et solide",
        "Motorisation et automatisme",
        "Réparation toutes marques",
        "Maintenance préventive",
      ],
    },
    {
      id: "videosurveillance",
      title: "Vidéosurveillance & Alarmes",
      icon: Camera,
      image:
        "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=1600",
      description:
        "Installez un système connecté et intelligent. Visualisez vos caméras en temps réel, recevez des alertes et protégez vos biens à distance.",
      points: [
        "Caméras HD connectées",
        "Accès smartphone sécurisé",
        "Installation discrète",
        "Support technique 24/7",
      ],
    },
    {
      id: "vehicules",
      title: "Ouverture de Véhicules",
      icon: Car,
      image:
        "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=1600",
      description:
        "Clés oubliées, perdues ou bloquées ? Nous ouvrons votre voiture sans dégât, sur place, à toute heure.",
      points: [
        "Ouverture sans casse",
        "Intervention sur place",
        "Toutes marques et modèles",
        "Disponible 24h/24",
      ],
    },
  ];

  return (
    <div className="pt-20 bg-gradient-to-b from-white via-orange-50/20 to-white">
      {/* HERO */}
      <section className="relative h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <AnimatedCanvas type="particles" color="#f97316" intensity={0.2} />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 px-6 max-w-5xl"
        >
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Zap className="w-4 h-4" />
            <span>Experts Serruriers à Paris</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent leading-tight">
            Serrurerie & Sécurité 24h/24
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
            Des solutions fiables, rapides et esthétiques pour protéger votre
            domicile ou commerce à Paris et en Île-de-France.
          </p>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="relative py-20 space-y-20">
        {services.map((s, i) => (
          <motion.section
            key={s.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col md:flex-row items-center justify-between overflow-hidden rounded-3xl shadow-md bg-gradient-to-br from-white via-white/80 to-orange-50 border border-orange-100 mx-4 sm:mx-10"
          >
            {/* Background image intégrée */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="w-full h-full object-cover brightness-[0.9] saturate-[1.05] scale-105 transition-transform duration-[3000ms] hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/75 to-white/60" />
            </div>

            {/* Contenu */}
            <div
              className={`relative z-10 w-full md:w-1/2 px-6 sm:px-10 py-10 ${
                i % 2 === 0 ? "md:ml-auto text-right" : "md:mr-auto text-left"
              }`}
            >
              <s.icon className="w-10 h-10 text-orange-500 mb-4 mx-auto md:mx-0" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">
                {s.title}
              </h2>
              <p className="text-gray-700 mb-5 text-base sm:text-lg leading-relaxed">
                {s.description}
              </p>

              <ul className="space-y-2 mb-6">
                {s.points.map((p, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-800 justify-start"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{p}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={`/services/${s.id}`}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:scale-105 transition-transform shadow-sm"
              >
                <span>Découvrir</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.section>
        ))}
      </section>

      {/* Galerie ou CTA */}
      <LocksmithServiceGallery />
    </div>
  );
};

export default Services;
