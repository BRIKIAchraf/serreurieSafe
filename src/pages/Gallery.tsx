import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { X } from "lucide-react";
import GlassCard from "../components/GlassCard";
import LocksmithProjectMosaic from "../components/LocksmithProjectMosaic"; // ✅ ajouté ici

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Tous");

  const galleryImages = [
    {
      src: "https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      title: "Installation serrure haute sécurité",
      category: "Installation",
    },
    {
      src: "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      title: "Blindage de porte d'entrée",
      category: "Blindage",
    },
    {
      src: "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      title: "Réparation serrure multipoints",
      category: "Réparation",
    },
    {
      src: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      title: "Ouverture de porte sans dégâts",
      category: "Urgence",
    },
    {
      src: "https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      title: "Installation système de sécurité",
      category: "Sécurité",
    },
    {
      src: "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      title: "Changement de cylindre",
      category: "Installation",
    },
    {
      src: "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      title: "Blindage porte appartement",
      category: "Blindage",
    },
    {
      src: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
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

  return (
    <div className="pt-24 pb-20 bg-transparent text-white">
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
            alt="Portfolio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6 max-w-4xl"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Portfolio immersif
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Sélection photo de nos réalisations emblématiques. Chaque
            intervention reflète notre savoir-faire et l'excellence de nos
            services.
          </p>
        </motion.div>
      </section>
      {/* === FILTRES === */}
      <section className="py-10 flex flex-wrap justify-center gap-4 px-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold border transition-all ${
              activeFilter === cat
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent scale-105 shadow-lg"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>
      {/* === GALERIE DYNAMIQUE === */}
      <section className="relative py-8">
        <motion.div
          layout
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6"
        >
          <AnimatePresence>
            {filteredImages.map((img, index) => {
              const { scrollYProgress } = useScroll();
              const rotate = useTransform(
                scrollYProgress,
                [0, 1],
                [index % 2 === 0 ? -5 : 5, 0]
              );
              const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
              const opacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

              return (
                <motion.div
                  key={img.title}
                  layout
                  style={{ rotate, scale, opacity }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative rounded-2xl overflow-hidden group shadow-2xl cursor-pointer"
                  onClick={() => setSelectedImage(galleryImages.indexOf(img))}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full text-sm font-semibold text-white">
                      {img.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold">{img.title}</h3>
                  </div>
                </motion.div>
              );
            })}
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
      {/* === MOSAIC EN HAUT === */}
      <LocksmithProjectMosaic /> {/* ✅ ajouté en haut */}
      {/* === HERO IMMERSIF === */}
      {/* === CTA === */}
      <section className="pt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <GlassCard className="p-12 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Besoin d'une intervention{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                similaire
              </span>{" "}
              ?
            </h2>
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              Nos experts sont à votre disposition pour tous vos besoins en
              serrurerie et sécurité. Contactez-nous pour un devis gratuit et
              personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+33123456789"
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-10 py-4 rounded-full font-semibold text-xl hover:scale-105 hover:shadow-xl transition-all"
              >
                Appeler maintenant
              </a>
              <a
                href="/contact"
                className="border border-white/30 text-white px-10 py-4 rounded-full font-semibold text-xl hover:bg-white/20 transition-all"
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
