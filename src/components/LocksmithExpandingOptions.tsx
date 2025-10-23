import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Lock, Key } from "lucide-react";

interface ExpandingOption {
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  highlights: string[];
  metric: string;
}

const options: ExpandingOption[] = [
  {
    title: "Ouverture experte sans dommage",
    description:
      "Nos techniciens utilisent des kits d'impression, clés de frappe et caméras endoscopiques pour préserver votre porte et votre serrure.",
    image:
      "https://images.unsplash.com/photo-1580894897392-6e3c6c86ec38?auto=format&fit=crop&w=1200&q=80",
    icon: Zap,
    highlights: [
      "Intervention moyenne : 22 minutes",
      "Compatible portes blindées A2P",
      "Assistance 24h/24 et 7j/7",
    ],
    metric: "1200+ ouvertures réussies",
  },
  {
    title: "Blindage & renforcement premium",
    description:
      "Plaques manganèse, barres de pivot, serrures multipoints certifiées : nous transformons vos accès en véritables remparts.",
    image:
      "https://images.unsplash.com/photo-1604072366199-bab2aba65891?auto=format&fit=crop&w=1200&q=80",
    icon: Shield,
    highlights: [
      "Blindage sur mesure d'origine française",
      "Travail propre sans poussière",
      "Garantie décennale incluse",
    ],
    metric: "98% clients rassurés",
  },
  {
    title: "Contrôle d'accès connecté",
    description:
      "Badges, claviers, cylindres électroniques et suivi d'activité : sécurisez votre immeuble ou showroom à distance.",
    image:
      "https://images.unsplash.com/photo-1580894906501-b4a04f77bedf?auto=format&fit=crop&w=1200&q=80",
    icon: Lock,
    highlights: [
      "Audit et plan de câblage inclus",
      "Application mobile dédiée",
      "Support pro pendant 12 mois",
    ],
    metric: "37% coûts d'accès en moins",
  },
  {
    title: "Reproduction et programmation clés",
    description:
      "Duplication de clés protégées, badges RFID, télécommandes ou clés auto à puce avec garantie de fonctionnement.",
    image:
      "https://images.unsplash.com/photo-1580894906472-6f2c78679a7d?auto=format&fit=crop&w=1200&q=80",
    icon: Key,
    highlights: [
      "Laboratoire mobile dernière génération",
      "Respect des chartes fabricant",
      "Cryptage et traçabilité",
    ],
    metric: "4 500 programmations/an",
  },
];

const LocksmithExpandingOptions: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#334155,transparent)] opacity-70" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
            Solutions photo-immersives
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Les options Serrurier Safe en images et en temps réel
          </h2>
          <p className="text-base text-slate-300 sm:text-lg">
            Survolez ou touchez chaque scénario pour dévoiler nos méthodes, nos
            outils et les résultats obtenus. Chaque visuel est issu d'une
            intervention réelle, garantissant transparence et confiance.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          {options.map((option, index) => {
            const Icon = option.icon;
            const isActive = activeIndex === index;

            return (
              <motion.button
                key={option.title}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`group relative flex-1 overflow-hidden rounded-3xl text-left transition-all duration-500 focus:outline-none md:flex ${
                  isActive ? "md:flex-[1.9]" : "md:flex-[1]"
                }`}
                aria-pressed={isActive}
              >
                <div className="absolute inset-0">
                  <motion.img
                    src={option.image}
                    alt={option.title}
                    className="h-full w-full object-cover"
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90 transition-opacity duration-500 group-hover:via-black/70" />
                </div>

                <div className="relative flex h-full w-full flex-col justify-end space-y-6 p-6 sm:p-8">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm uppercase tracking-wide text-white/70">
                      {option.metric}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold">{option.title}</h3>
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          key="description"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 text-sm text-slate-200 sm:text-base"
                        >
                          {option.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.ul
                        key="highlights"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-2 text-sm text-slate-200/90"
                      >
                        {option.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LocksmithExpandingOptions;
