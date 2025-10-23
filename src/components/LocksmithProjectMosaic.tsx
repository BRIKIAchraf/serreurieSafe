import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Aperture, Layers } from "lucide-react";

interface MosaicItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  size: "square" | "tall" | "wide";
}

const items: MosaicItem[] = [
  {
    id: 1,
    title: "Ouverture premium",
    subtitle: "Intervention express",
    description:
      "Maîtrise des picks, bump keys et caméras fibre optique pour ouvrir sans trace.",
    image:
      "https://images.unsplash.com/photo-1580894906472-6f2c78679a7d?auto=format&fit=crop&w=1200&q=80",
    size: "tall",
  },
  {
    id: 2,
    title: "Blindage design",
    subtitle: "Résidentiel luxe",
    description:
      "Plaques laquées, renforts invisibles et finitions sur-mesure pour loft parisien.",
    image:
      "https://images.unsplash.com/photo-1600585154518-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    size: "wide",
  },
  {
    id: 3,
    title: "Contrôle biométrique",
    subtitle: "Siège social",
    description:
      "Pose d'accès multi-facteurs avec suivi des entrées en temps réel.",
    image:
      "https://images.unsplash.com/photo-1604079628040-94301bb21b07?auto=format&fit=crop&w=1200&q=80",
    size: "square",
  },
  {
    id: 4,
    title: "Rideau motorisé",
    subtitle: "Boutique flagship",
    description:
      "Remplacement complet du tablier + liaison alarme après tentative d'effraction.",
    image:
      "https://images.unsplash.com/photo-1571533493348-0cbcbcb0678a?auto=format&fit=crop&w=1200&q=80",
    size: "square",
  },
  {
    id: 5,
    title: "Audit sécurité",
    subtitle: "Hôtel particulier",
    description:
      "Cartographie des accès, serrurerie connectée et recommandations architectes.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    size: "wide",
  },
];

const LocksmithProjectMosaic: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(items[0].id);
  const activeItem = items.find((item) => item.id === activeId)!;

  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#0f172a,transparent)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <Camera className="h-4 w-4" />
              Portfolio immersif
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Sélection photo de nos réalisations emblématiques
            </h2>
            <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
              Survolez chaque visuel pour découvrir le contexte, les techniques
              utilisées et l'impact obtenu. Notre équipe photographie chaque
              projet pour partager son savoir-faire.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-200/80">
            <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
              <Aperture className="h-4 w-4 text-orange-300" />
              4K HDR
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
              <Layers className="h-4 w-4 text-orange-300" />
              Mise en scène étape par étape
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="grid gap-6 lg:col-span-3 lg:grid-cols-2">
            {items.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 ${
                  item.size === "tall" ? "row-span-2 lg:h-[32rem]" : ""
                } ${item.size === "wide" ? "lg:col-span-2" : ""} ${
                  item.size === "square" ? "aspect-square" : ""
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                aria-pressed={activeId === item.id}
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
                    {item.subtitle}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                </div>
                <div
                  className={`absolute inset-0 border-4 border-orange-400/70 opacity-0 transition-opacity duration-300 ${
                    activeId === item.id ? "opacity-100" : "group-hover:opacity-60"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          <div className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <span className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                  {activeItem.subtitle}
                </span>
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                  {activeItem.title}
                </h3>
                <p className="text-sm text-slate-200 sm:text-base">
                  {activeItem.description}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex flex-wrap gap-2 text-xs text-white/70">
              {items.map((item) => (
                <button
                  key={`indicator-${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  className={`rounded-full px-3 py-1 transition ${
                    activeId === item.id
                      ? "bg-orange-500 text-white"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {item.subtitle}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocksmithProjectMosaic;
