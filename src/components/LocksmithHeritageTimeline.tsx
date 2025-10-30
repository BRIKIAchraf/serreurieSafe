import React from "react";
import { motion } from "framer-motion";

interface LocksmithPhoto {
  src: string;
  title: string;
  caption: string;
  tag: string;
  size?: "sm" | "lg";
}

const photos: LocksmithPhoto[] = [
  {
    src: "Changement_serrure_Marseille_Aubagne_1 (1).jpeg",
    title: "Ouverture sans dommage",
    caption:
      "Techniques précises pour portes blindées et serrures haute sécurité.",
    tag: "Dépannage express",
    size: "lg",
  },
  {
    src: "cle-06.jpg",
    title: "Atelier de reproduction",
    caption: "Clés, badges magnétiques et télécommandes programmées sur place.",
    tag: "Atelier mobile",
  },
  {
    src: "IMG-20251021-WA0008.jpg",
    title: "Renforcement de porte",
    caption:
      "Blindage, barres de pivot et plaques anti-perçage certifiées A2P.",
    tag: "Blindage sécurisé",
  },
  {
    src: "20221010-tomdoms_0563002.webp",
    title: "Contrôle d’accès intelligent",
    caption:
      "Systèmes biométriques, claviers digitaux et intégration domotique.",
    tag: "Sécurité connectée",
  },
  {
    src: "Audit-securite-incendie-2000x1000.jpg",
    title: "Audit sécurité sur mesure",
    caption:
      "Diagnostic complet et recommandations personnalisées pour entreprises et copropriétés.",
    tag: "Conseil expert",
  },
];

const LocksmithPhotoShowcase: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 text-gray-900">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        {/* ===== Header ===== */}
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#E83E00]/10 to-[#F45C23]/10 px-4 py-2 text-sm font-semibold text-[#E83E00]">
            Univers Serrurier Safe
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#E83E00] to-[#F45C23]">
            Chaque intervention documentée en images authentiques
          </h2>
          <p className="text-base text-gray-700 sm:text-lg">
            Découvrez nos reportages photo réalisés sur le terrain : ouverture
            fine, blindage sur mesure, contrôle d’accès et expertise technique.
            Ces images témoignent de notre savoir-faire et de la précision de
            nos interventions.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-700">
            <span className="rounded-full border border-[#F45C23]/30 px-4 py-1">
              Reportage photo terrain 24h/24
            </span>
            <span className="rounded-full border border-[#F45C23]/30 px-4 py-1">
              Mise en scène de cas réels
            </span>
            <span className="rounded-full border border-[#F45C23]/30 px-4 py-1">
              Adapté à chaque service
            </span>
          </div>
        </div>

        {/* ===== Photo grid ===== */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-500 ${
                photo.size === "lg" ? "md:col-span-2" : ""
              }`}
            >
              <div className="relative h-72 w-full sm:h-80 overflow-hidden">
                <motion.img
                  src={photo.src}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute left-6 right-6 bottom-6 space-y-2">
                  <span className="inline-block rounded-full bg-gradient-to-r from-[#E83E00] to-[#F45C23] px-3 py-1 text-xs font-semibold text-white shadow-md">
                    {photo.tag}
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-gray-200">{photo.caption}</p>
                </div>
              </div>

              {/* Hover outline */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#F45C23]/60 transition-all duration-300 rounded-3xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocksmithPhotoShowcase;
