import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import GlassCard from "../components/GlassCard";

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Tous");

  const galleryImages = [
    {
      src: "11607-securite-2.jpg",
      title: "Installation serrure haute sécurité",
      category: "Installation",
    },
    {
      src: "Securite-Serrurerie-Portes-Blindage.jpg",
      title: "Blindage de porte d'entrée",
      category: "Blindage",
    },
    {
      src: "serrure-3-points-applique.jpg",
      title: "Réparation serrure multipoints",
      category: "Réparation",
    },
    {
      src: "IMG-20251021-WA0006.jpg",
      title: "Ouverture de porte sans dégâts",
      category: "Urgence",
    },
    {
      src: "videosurveillance-maison-1024x683.webp",
      title: "Installation système de sécurité",
      category: "Sécurité",
    },
    {
      src: "CYLINDRE+FICHET-1920w.webp",
      title: "Changement de cylindre",
      category: "Installation",
    },
    {
      src: "porteblindeappartementmarseilleJPGJPG_59f8ee10c71a5.jpeg",
      title: "Blindage porte appartement",
      category: "Blindage",
    },
    {
      src: "Changement_serrure_Marseille_Aubagne_1.jpeg",
      title: "Dépannage serrure cassée",
      category: "Réparation",
    },
  ];

  const categories = [
    "Tous",
    "Installation",
    "Blindage",
    "Réparation",
    "Urgence",
    "Sécurité",
  ];

  const filteredImages =
    activeFilter === "Tous"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  // 🎨 Animation pour chaque carte selon son index
  const imageVariants = (index: number) => ({
    hidden: {
      opacity: 0,
      y: 60,
      rotate: index % 2 === 0 ? -5 : 5,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.6, delay: index * 0.05, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      rotate: 0,
      transition: { duration: 0.4 },
    },
  });

  return (
    <div className="pt-24 pb-20 bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800">
      {/* === HERO === */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
            alt="Portfolio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-transparent"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6 max-w-4xl"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Portfolio immersif
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Découvrez nos réalisations emblématiques en serrurerie, blindage et
            sécurité. Chaque intervention reflète l’expertise et le savoir-faire
            de Serrure Safe.
          </p>
        </motion.div>
      </section>

      {/* === FILTRES === */}
      <section className="py-12 flex flex-wrap justify-center gap-4 px-6">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.08 }}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold border transition-all duration-300 ${
              activeFilter === cat
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-md"
                : "border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </section>

      {/* === GALERIE === */}
      <section className="relative py-8">
        <motion.div
          layout
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6"
        >
          <AnimatePresence>
            {filteredImages.map((img, index) => (
              <motion.div
                key={img.title}
                variants={imageVariants(index)}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.2 }}
                className="relative rounded-2xl overflow-hidden group shadow-2xl cursor-pointer bg-white transform-gpu transition-all"
                onClick={() => setSelectedImage(galleryImages.indexOf(img))}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full text-sm font-semibold text-white shadow-md">
                    {img.category}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-white drop-shadow-lg">
                    {img.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* === MODAL === */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                className="w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {galleryImages[selectedImage].category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === CTA === */}
      <section className="pt-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 opacity-90 -z-10"></div>

        <div className="max-w-4xl mx-auto px-6 text-center">
          <GlassCard className="p-12 backdrop-blur-md bg-white/25 border border-white/30 rounded-3xl shadow-xl">
            <h2 className="text-4xl font-extrabold mb-6 text-gray-900 drop-shadow-sm">
              Besoin d'une intervention{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                similaire
              </span>{" "}
              ?
            </h2>
            <p className="text-gray-800 mb-10 text-lg leading-relaxed">
              Nos experts sont disponibles pour tous vos besoins en serrurerie
              et sécurité. Contactez-nous dès aujourd’hui pour un devis gratuit
              et personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+331 85 09 73 65"
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-10 py-4 rounded-full font-semibold text-xl hover:scale-105 hover:shadow-xl transition-all"
              >
                Appeler maintenant
              </a>
              <a
                href="/contact"
                className="border border-gray-300 text-gray-900 px-10 py-4 rounded-full font-semibold text-xl hover:bg-white/60 transition-all"
              >
                Demander un devis
              </a>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
