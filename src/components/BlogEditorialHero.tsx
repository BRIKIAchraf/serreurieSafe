import React from "react";
import { motion } from "framer-motion";
import { PenTool, Newspaper } from "lucide-react";

const featuredStories = [
  {
    title: "Serrures connectées : que disent les experts 2025 ?",
    category: "Technologie",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Chronique terrain : blindage d'urgence à 2h du matin",
    category: "Urgence",
    image:
      "https://images.unsplash.com/photo-1580894906472-6f2c78679a7d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Guide copropriété : sécuriser hall + cave sans tout remplacer",
    category: "Conseils",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1400&q=80",
  },
];

const BlogEditorialHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 text-primary-900">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E83E00]/15 to-[#F45C23]/15 px-4 py-2 text-sm font-semibold text-[#E83E00]">
              <PenTool className="h-4 w-4 text-[#F45C23]" />
              Journal Serrurier Safe
            </span>
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-primary-900">
              Actualité, innovations et retours d'expérience en images
            </h1>
            <p className="text-base text-primary-700 sm:text-lg leading-relaxed">
              Chaque article majeur est livré avec son reportage photo : avant /
              après, détails techniques et coulisses d'intervention.
            </p>
          </div>

          <div className="rounded-2xl border border-[#F45C23]/20 bg-white/40 backdrop-blur-sm px-5 py-4 text-sm text-primary-800 shadow-md">
            <span className="flex items-center gap-2 font-semibold text-[#E83E00]">
              <Newspaper className="h-4 w-4" />
              Publication hebdomadaire
            </span>
            <p className="mt-2 text-primary-700">
              Suivez l'équipe Serrurier Safe sur le terrain, 52 missions photo
              documentées par an.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredStories.map((story, index) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-[#E83E00]/10 bg-white/60 shadow-lg hover:shadow-[0_0_25px_rgba(232,62,0,0.2)] transition-all duration-500"
            >
              <div className="relative h-64">
                <motion.img
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 space-y-3">
                  <span className="inline-block rounded-full bg-gradient-to-r from-[#E83E00] to-[#F45C23] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
                    {story.category}
                  </span>
                  <h2 className="text-2xl font-semibold text-white drop-shadow-md">
                    {story.title}
                  </h2>
                </div>
              </div>
              <div className="p-6 text-sm text-primary-800 leading-relaxed">
                <p>
                  Reportage complet disponible dans la rubrique correspondante,
                  avec conseils pratiques et checklists téléchargeables.
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogEditorialHero;
