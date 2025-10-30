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
    image: "IMG-20251021-WA0003.jpg",
    stats: "Pose en 6h | Garantie 10 ans",
  },
  {
    title: "Rideaux métalliques express",
    subtitle: "Commerces & boutiques",
    description:
      "Dépannage motorisé de nuit, remplacement des lames et sécurisation par boîtier connecté.",
    image: "OIP (7).jpeg",
    stats: "Réouverture en 90 min",
  },
  {
    title: "Contrôle d'accès connecté",
    subtitle: "Immeubles & sièges",
    description:
      "Installation badges NFC, claviers biométriques et tableau de supervision en temps réel.",
    image:
      "serrure-connectee-la-revolution-securitaire-a-domicile-1721214951-1536x878.jpg",
    stats: "Jusqu'à 250 utilisateurs",
  },
];

const LocksmithServiceGallery: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 text-gray-900">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-14 items-start">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              Portfolio photo services
            </span>
            <h2 className="text-4xl font-extrabold leading-tight text-gray-900">
              Chaque service illustré par des missions réelles
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Découvrez nos interventions en images : blindage sur mesure,
              rideaux métalliques express, contrôle d’accès intelligent. Ces
              visuels reflètent notre savoir-faire et la qualité de nos
              finitions.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm text-gray-700 shadow-sm">
                Reportages photos disponibles dès la validation du devis.
              </div>
              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm text-gray-700 shadow-sm">
                Visuels réutilisables pour vos réseaux sociaux et devis.
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="relative rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-orange-700">
              Mise en scène professionnelle
            </h3>
            <p className="mt-3 text-sm text-gray-700">
              Nous capturons chaque étape pour démontrer l’excellence de Serrure
              Safe : repérage, préparation, intervention et contrôle qualité.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-4xl font-extrabold text-gray-900">4K</p>
                <p className="text-sm text-gray-600">
                  Photos haute définition pour vos présentations
                </p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-gray-900">+65</p>
                <p className="text-sm text-gray-600">
                  Interventions documentées en 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid gap-8 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="group relative overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-orange-600 shadow">
                    {item.subtitle}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-white drop-shadow">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 p-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.description}
                </p>
                <div className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-2 text-sm text-orange-700 font-medium inline-block">
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
