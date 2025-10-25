import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Wrench, ShieldCheck, Smile } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Contact & Devis",
    text: "Appelez-nous ou demandez un devis, un expert vous répond immédiatement.",
    icon: Phone,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Déplacement rapide",
    text: "Nos techniciens arrivent en moins de 30 minutes, prêts à intervenir.",
    icon: MapPin,
    image:
      "https://images.unsplash.com/photo-1597004891233-28a403a90ef6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Diagnostic & Action",
    text: "Devis clair et intervention immédiate sans dommage.",
    icon: Wrench,
    image:
      "https://images.unsplash.com/photo-1621905251918-962f836bf6df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Sécurisation & Garantie",
    text: "Travail soigné, matériel certifié et garantie incluse.",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1621905251933-30cf4d92c4a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Satisfaction client",
    text: "Chaque client reçoit un suivi personnalisé et un service premium.",
    icon: Smile,
    image:
      "https://images.unsplash.com/photo-1598327105562-5f95f87a5c3f?auto=format&fit=crop&w=800&q=80",
  },
];

const InterventionProcess: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D72600] to-[#FF6B00]">
            Processus d’Intervention
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Simple, rapide et transparent — de votre appel à votre satisfaction.
          </p>
        </motion.div>

        {/* Ligne centrale */}
        <div className="relative">
          {/* Ligne verticale (centrée) */}
          <div className="absolute hidden md:block left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D72600] via-[#FF6B00] to-transparent transform -translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isLeft ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Point lumineux (centre sur desktop, gauche sur mobile) */}
                  <div
                    className={`absolute ${
                      isLeft
                        ? "md:left-[calc(50%-10px)]"
                        : "md:left-[calc(50%-10px)]"
                    } left-5 top-2 w-5 h-5 rounded-full bg-gradient-to-br from-[#D72600] to-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.6)] z-10`}
                  />

                  {/* Carte */}
                  <div
                    className={`w-full md:w-1/2 ${
                      isLeft ? "md:pr-10" : "md:pl-10"
                    }`}
                  >
                    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-white/10 transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                      <div className="relative h-52 sm:h-56">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="object-cover h-full w-full"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-[#D72600] to-[#FF6B00] text-white">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Espace miroir (desktop seulement) */}
                  <div className="hidden md:block md:w-1/2" />
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
