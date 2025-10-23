import React from "react";
import { motion } from "framer-motion";

interface GalleryItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: string;
}

const galleryItems: GalleryItem[] = [
  {
    title: "Portes blindées signature",
    subtitle: "Résidentiel premium",
    description:
      "Prises de vue avant/après de blindages sur mesure, finitions laquées et intégration domotique.",
    image:
      "https://images.unsplash.com/photo-1580894808081-8df73c0c228b?auto=format&fit=crop&w=1200&q=80",
    stats: "Pose en 6h | Garantie 10 ans",
  },
  {
    title: "Rideaux métalliques express",
    subtitle: "Commerces & boutiques",
    description:
      "Dépannage motorisé de nuit, remplacement des lames et sécurisation par boîtier connecté.",
    image:
      "https://images.unsplash.com/photo-1580894869731-6a8e836edec2?auto=format&fit=crop&w=1200&q=80",
    stats: "Réouverture en 90 min",
  },
  {
    title: "Contrôle d'accès connecté",
    subtitle: "Immeubles & sièges",
    description:
      "Installation badges NFC, claviers biométriques et tableau de supervision en temps réel.",
    image:
      "https://images.unsplash.com/photo-1604079626693-3be927fe6df0?auto=format&fit=crop&w=1200&q=80",
    stats: "Jusqu'à 250 utilisateurs",
  },
];

const LocksmithServiceGallery: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e293b,transparent)] opacity-80" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
              Portfolio photo services
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Chaque service illustré par des missions réelles
            </h2>
            <p className="text-slate-300">
              Vous présentez vos offres avec des visuels concrets qui montrent
              nos techniciens en action : blindage, rideaux métalliques,
              serrures connectées. Ces images renforcent la confiance et
              expliquent nos process en un coup d’œil.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <p>Reportages photos disponibles dès la validation du devis.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <p>Visuels réutilisables pour vos réseaux sociaux et devis.</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <h3 className="text-lg font-semibold text-orange-200">
              Mise en scène professionnelle
            </h3>
            <p className="mt-3 text-sm text-slate-100">
              Nous capturons chaque étape pour démontrer l’excellence de Serrure
              Safe : repérage, préparation, intervention, contrôle qualité.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-3xl font-bold text-white">4K</p>
                <p className="text-xs text-slate-300">
                  Photos de haute définition pour vos présentations
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">+65</p>
                <p className="text-xs text-slate-300">
                  Interventions documentées en 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/30"
            >
              <div className="relative h-64">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    {item.subtitle}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <p className="text-sm text-slate-200">{item.description}</p>
                <div className="rounded-xl border border-white/5 bg-white/5 p-3 text-xs text-orange-200">
                  {item.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocksmithServiceGallery;
