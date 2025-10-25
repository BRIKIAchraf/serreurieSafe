import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Lock, Key, Video, Car, Hammer } from "lucide-react";

interface Service {
  title: string;
  description: string;
  image: string;
  price: string;
  details: string[];
  icon: React.ElementType;
}

const services: Service[] = [
  {
    title: "Serrurerie & Dépannage",
    description:
      "Besoin d'un dépannage en urgence pour une serrure bloquée ou d'un remplacement de cylindre ? Notre équipe de serruriers qualifiés intervient 24h/24 avec soin et rapidité, sans dommage pour votre porte.",
    image:
      "https://images.unsplash.com/photo-1591279739602-1e05b23cb18d?auto=format&fit=crop&w=1200&q=80",
    price: "À partir de 89€",
    details: [
      "Ouverture de porte claquée, verrouillée ou bloquée",
      "Réparation et remplacement de serrures toutes marques",
      "Installation de serrures multipoints",
      "Mise en sécurité après effraction",
    ],
    icon: Lock,
  },
  {
    title: "Dépannage de Porte Blindée",
    description:
      "Votre porte blindée est un gage de sécurité, mais elle peut nécessiter un dépannage en urgence. Nous intervenons sans endommager la structure.",
    image:
      "https://images.unsplash.com/photo-1597005095835-7b4b9d7edc1e?auto=format&fit=crop&w=1200&q=80",
    price: "À partir de 120€",
    details: [
      "Déblocage de serrures bloquées ou endommagées",
      "Remplacement de serrures haute sécurité",
      "Mise en sécurité renforcée après effraction",
      "Ajustement et maintenance de portes blindées",
    ],
    icon: Shield,
  },
  {
    title: "Rideaux Métalliques",
    description:
      "Installation, entretien et dépannage de rideaux métalliques pour commerces et entrepôts. Sécurité et fiabilité garanties.",
    image:
      "https://images.unsplash.com/photo-1574634534891-6a4b3c3b5a9b?auto=format&fit=crop&w=1200&q=80",
    price: "Devis personnalisé",
    details: [
      "Installation sur mesure adaptée à vos besoins",
      "Réparation rapide en cas de blocage ou panne moteur",
      "Maintenance préventive pour éviter les pannes",
      "Motorisation de rideaux métalliques",
    ],
    icon: Hammer,
  },
  {
    title: "Vidéosurveillance",
    description:
      "Protégez vos locaux avec nos systèmes de vidéosurveillance connectés. Installation et maintenance professionnelles.",
    image:
      "https://images.unsplash.com/photo-1626178793923-44ef67f4f826?auto=format&fit=crop&w=1200&q=80",
    price: "Devis gratuit",
    details: [
      "Caméras intérieures et extérieures",
      "Systèmes connectés avec visualisation à distance",
      "Maintenance et support technique",
      "Conseils en positionnement stratégique",
    ],
    icon: Video,
  },
  {
    title: "Ouverture de Véhicules",
    description:
      "Clés perdues, oubliées ou serrure bloquée ? Nous ouvrons tous types de véhicules sans causer de dégâts.",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    price: "À partir de 90€",
    details: [
      "Ouverture rapide et sans dégât",
      "Intervention sur voitures, motos et utilitaires",
      "Compatible avec toutes marques et modèles",
      "Disponible 24h/24 et 7j/7",
    ],
    icon: Car,
  },
  {
    title: "Vitrerie",
    description:
      "Installation, réparation et remplacement de vitres pour particuliers et professionnels.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    price: "Devis sur mesure",
    details: [
      "Remplacement de vitres cassées",
      "Installation de vitrines commerciales",
      "Pose de parois vitrées et fenêtres isolantes",
      "Intervention rapide après sinistre",
    ],
    icon: Zap,
  },
];

const ServicesShowcase: React.FC = () => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Nos{" "}
            <span className="bg-gradient-to-r from-[#D72600] to-[#FF6B00] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Des interventions rapides, efficaces et garanties, réalisées par des
            experts qualifiés en serrurerie, sécurité et vitrage.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = active === index;

            return (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-lg border border-gray-200 dark:border-white/10 hover:shadow-2xl transition-all duration-500"
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700"
                    animate={{ scale: isActive ? 1.1 : 1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-[#D72600] to-[#FF6B00] text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {service.description}
                  </p>

                  <p className="font-semibold text-[#FF6B00]">
                    {service.price}
                  </p>

                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {service.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#FF6B00]" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex justify-between items-center mt-4">
                    <a
                      href="/devis"
                      className="inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-[#D72600] to-[#FF6B00] text-white text-sm font-semibold shadow hover:shadow-lg transition"
                    >
                      Demander un devis
                    </a>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#D72600]/10 text-[#D72600]">
                      Urgence
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
