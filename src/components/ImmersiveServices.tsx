import React from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Lock,
  Shield,
  Video,
  Car,
  KeyRound,
  GlassWater,
} from "lucide-react";

const services = [
  {
    title: "Serrurerie & Dépannage",
    desc: "Dépannage rapide 24h/24 — ouverture, réparation ou remplacement de serrure sans dégât.",
    price: "À partir de 89€",
    icon: KeyRound,
    image: "IMG-20251021-WA0009.jpg",
  },
  {
    title: "Dépannage de Porte Blindée",
    desc: "Intervention d’urgence sur portes blindées sans abîmer la structure, renforcement et ajustement.",
    price: "À partir de 120€",
    icon: Shield,
    image:
      "ouverture-porte-blindee--debouchage-curage-canalisation72694-d531c72e99189b19b709e2dde79804e6_1624289898.jpg",
  },
  {
    title: "Rideaux Métalliques",
    desc: "Installation et dépannage rapide pour commerces — motorisation et entretien inclus.",
    price: "Devis personnalisé",
    icon: Wrench,
    image: "rideau-metallique-galvanise-motorise.jpg",
  },
  {
    title: "Vidéosurveillance",
    desc: "Systèmes connectés avec visualisation à distance — sécurité et maintenance garantie.",
    price: "Devis gratuit",
    icon: Video,
    image:
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Ouverture de Véhicules",
    desc: "Ouverture sans dégât de tout type de véhicule, 24h/24 — voitures, motos, utilitaires.",
    price: "À partir de 90€",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Vitrerie",
    desc: "Remplacement de vitres cassées, vitrines ou fenêtres isolantes — intervention rapide.",
    price: "Devis sur mesure",
    icon: GlassWater,
    image: "6ee99d832127.jpeg",
  },
];

const ImmersiveServicesCompact: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Nos <span className="text-[#FF6B00]">services</span> essentiels
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Un aperçu rapide, fluide et immersif de notre savoir-faire.
          </p>
        </motion.div>

        <div className="space-y-10">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row items-center overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="lg:w-1/3 w-full h-56 relative overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="lg:w-2/3 w-full p-8 flex flex-col justify-center text-center lg:text-left">
                  <div className="flex justify-center lg:justify-start items-center gap-3 mb-3">
                    <Icon className="w-6 h-6 text-[#FF6B00]" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {s.desc}
                  </p>
                  <p className="text-[#FF6B00] font-semibold mb-4">{s.price}</p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    <motion.a
                      href="tel:+33123456789"
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center bg-[#FF6B00] text-white px-5 py-2 rounded-lg font-semibold shadow hover:shadow-lg"
                    >
                      Devis
                    </motion.a>
                    <motion.a
                      href="tel:+33123456789"
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center border border-[#FF6B00] text-[#FF6B00] px-5 py-2 rounded-lg font-semibold hover:bg-[#FF6B00] hover:text-white transition-all"
                    >
                      Urgence
                    </motion.a>
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

export default ImmersiveServicesCompact;
