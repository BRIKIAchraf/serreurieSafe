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
    src: "https://images.unsplash.com/photo-1587202372775-98973ebf2357?auto=format&fit=crop&w=1080&q=80",
    title: "Ouverture sans dommage",
    caption: "Techniques fines pour portes blindees et cylindres haute securite.",
    tag: "Depannage express",
    size: "lg",
  },
  {
    src: "https://images.unsplash.com/photo-1580894906472-6f2c78679a7d?auto=format&fit=crop&w=1080&q=80",
    title: "Atelier de reproduction",
    caption: "Double de cle, badges magnetiques et programmation de telecommandes.",
    tag: "Atelier mobile",
  },
  {
    src: "https://images.unsplash.com/photo-1604072366595-e75dc92cc9db?auto=format&fit=crop&w=1080&q=80",
    title: "Renforcement de porte",
    caption: "Blindage, barre de pivot et plaques anti-percage certifiees.",
    tag: "Blindage",
  },
  {
    src: "https://images.unsplash.com/photo-1580894906501-b4a04f77bedf?auto=format&fit=crop&w=1080&q=80",
    title: "Controle d acces",
    caption: "Cylindres connects, claviers digitaux et solutions domotique.",
    tag: "Securite connectee",
  },
  {
    src: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1080&q=80",
    title: "Audit securite",
    caption: "Diagnostic complet et recommandations pour commerces et coproprietes.",
    tag: "Conseil expert",
  },
];

const LocksmithPhotoShowcase: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl space-y-6">
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
            Univers Serrurier Immersif
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Chaque intervention documentee par des images de terrain
          </h2>
          <p className="text-base text-slate-300 sm:text-lg">
            Nous illustrons chaque scenario de serrurerie avec de veritables
            operations realisees par nos equipes: ouverture fine, blindage,
            controle d acces et expertise conseil. Ces visuels rassurent vos
            clients et valorisent votre savoir-faire.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full border border-slate-700 px-4 py-1">
              Reportage photo terrain 24h/24
            </span>
            <span className="rounded-full border border-slate-700 px-4 py-1">
              Mise en scene de cas reels
            </span>
            <span className="rounded-full border border-slate-700 px-4 py-1">
              Adaptation a chaque service
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.015 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-slate-800/40 backdrop-blur-sm ${
                photo.size === "lg" ? "md:col-span-2" : ""
              }`}
            >
              <div className="relative h-72 w-full sm:h-80">
                <motion.img
                  src={photo.src}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute left-6 right-6 bottom-6 space-y-2">
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    {photo.tag}
                  </span>
                  <h3 className="text-xl font-semibold">{photo.title}</h3>
                  <p className="text-sm text-slate-200/90">{photo.caption}</p>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none border border-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocksmithPhotoShowcase;
