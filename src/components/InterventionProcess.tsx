import React from "react";
import { motion } from "framer-motion";
import { Wrench, Clock, MapPin, CheckCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Wrench,
    title: "Analyse du problème",
    description:
      "Nos serruriers évaluent rapidement la situation et déterminent la meilleure solution adaptée à votre besoin.",
    image:
      "https://images.pexels.com/photos/4792491/pexels-photo-4792491.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop",
  },
  {
    id: 2,
    icon: Clock,
    title: "Intervention rapide",
    description:
      "Nous intervenons sur place en moins de 30 minutes, 24h/24 et 7j/7, pour toute urgence en serrurerie.",
    image:
      "depannage-de-serrurerie-a-Paris-3-677e87c3ad759-sizes_cutum-1000-600.webp",
  },
  {
    id: 3,
    icon: MapPin,
    title: "Déplacement sur site",
    description:
      "Nos techniciens se déplacent dans toute la région parisienne, avec un suivi en temps réel de leur arrivée.",
    image: "IMG-20251021-WA0002.jpg",
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Résolution & garantie",
    description:
      "Travail soigné, garantie A2P et satisfaction client. Votre sécurité, notre priorité.",
    image: "Engagement-qualite-1.webp",
  },
];

const InterventionProcess: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* === TITRE === */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Processus d’intervention
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4  text-lg max-w-2xl mx-auto">
            Découvrez comment notre équipe intervient étape par étape, de
            l’analyse initiale à la résolution complète de votre problème.
          </p>
        </div>

        {/* === CONTAINER TIMELINE === */}
        <div className="relative flex flex-col items-center">
          {/* === LIGNE CENTRALE === */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "calc(100% - 6rem)" }} // 👈 ne dépasse plus les cartes
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="absolute top-[3rem] left-1/2 transform -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#FF6B00] to-[#FF3C00] rounded-full"
          />

          {/* === ÉTAPES === */}
          <div className="w-full flex flex-col space-y-28 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className={`flex flex-col sm:flex-row items-center justify-between w-full relative ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* === Carte avec image de fond === */}
                  <div
                    className={`w-full sm:w-[45%] relative rounded-2xl overflow-hidden shadow-2xl ${
                      isLeft
                        ? "sm:text-right text-center"
                        : "sm:text-left text-center"
                    }`}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Overlay dégradé sombre */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-transparent dark:from-gray-950/90 dark:via-gray-800/60 dark:to-transparent" />
                    {/* Texte */}
                    <div className="relative p-6 sm:p-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-200 text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* === Icône centrale === */}
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 
                    bg-white dark:bg-gray-900 border-4 border-[#FF6B00]
                    w-16 h-16 rounded-full flex items-center justify-center shadow-xl z-20
                    sm:top-1/2 sm:-translate-y-1/2 
                    top-[-5rem]" // 👈 icône un peu plus haut sur mobile
                  >
                    <Icon className="w-8 h-8 text-[#FF6B00]" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterventionProcess;
