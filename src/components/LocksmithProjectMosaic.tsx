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
    <section className="relative overflow-hidden py-24 text-gray-900">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        {/* ===== HEADER ===== */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E83E00]/10 to-[#F45C23]/10 px-4 py-2 text-sm font-semibold text-[#E83E00]">
              <Camera className="h-4 w-4 text-[#E83E00]" />
              Portfolio immersif
            </span>

            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#E83E00] to-[#F45C23]">
              Sélection photo de nos réalisations emblématiques
            </h2>

            <p className="max-w-2xl text-base text-gray-700 sm:text-lg">
              Survolez chaque visuel pour découvrir le contexte, les techniques
              utilisées et l'impact obtenu. Chaque projet illustre notre
              savoir-faire.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="flex items-center gap-2 rounded-full border border-[#F45C23]/40 px-3 py-2">
              <Aperture className="h-4 w-4 text-[#E83E00]" />
              4K HDR
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#F45C23]/40 px-3 py-2">
              <Layers className="h-4 w-4 text-[#E83E00]" />
              Mise en scène étape par étape
            </div>
          </div>
        </header>

        {/* ===== MOSAIC ===== */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* MINIATURES */}
          <div className="grid gap-6 lg:col-span-3 lg:grid-cols-2">
            {items.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm 
                  ${item.size === "tall" ? "row-span-2 lg:h-[32rem]" : ""} 
                  ${item.size === "wide" ? "lg:col-span-2" : ""} 
                  ${item.size === "square" ? "aspect-square" : ""}`}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#E83E00]">
                    {item.subtitle}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-white group-hover:text-[#F45C23] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <div
                  className={`absolute inset-0 border-4 border-[#F45C23]/70 opacity-0 transition-opacity duration-300 ${
                    activeId === item.id
                      ? "opacity-100"
                      : "group-hover:opacity-60"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* DESCRIPTION ACTIVE */}
          <div className="relative flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-8 shadow-lg lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <span className="text-sm font-semibold uppercase tracking-wider text-[#E83E00]">
                  {activeItem.subtitle}
                </span>
                <h3 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  {activeItem.title}
                </h3>
                <p className="text-sm text-gray-700 sm:text-base">
                  {activeItem.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap gap-2 text-xs text-gray-700">
              {items.map((item) => (
                <button
                  key={`indicator-${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  className={`rounded-full px-3 py-1 transition ${
                    activeId === item.id
                      ? "bg-gradient-to-r from-[#E83E00] to-[#F45C23] text-white"
                      : "bg-gray-100 hover:bg-gray-200"
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
