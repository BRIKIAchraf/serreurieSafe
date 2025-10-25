import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  Heart,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  verified: boolean;
  helpful: number;
  location?: string;
}

const ClientReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredReview, setHoveredReview] = useState<string | null>(null);

  const reviews: Review[] = [
    {
      id: "1",
      name: "Marie Dubois",
      rating: 5,
      date: "2024-01-15",
      service: "Ouverture de porte",
      comment:
        "Service exceptionnel ! Intervention en 20 minutes, technicien très professionnel. Je recommande vivement.",
      verified: true,
      helpful: 12,
      location: "Paris 15ème",
    },
    {
      id: "2",
      name: "Jean Martin",
      rating: 5,
      date: "2024-01-12",
      service: "Installation serrure",
      comment:
        "Installation parfaite d'une serrure haute sécurité. Travail soigné et conseils précieux. Merci !",
      verified: true,
      helpful: 8,
      location: "Boulogne-Billancourt",
    },
    {
      id: "3",
      name: "Sophie Laurent",
      rating: 5,
      date: "2024-01-10",
      service: "Urgence nocturne",
      comment:
        "Bloquée dehors à 23h, ils sont arrivés en 15 minutes ! Service client au top, prix raisonnable.",
      verified: true,
      helpful: 15,
      location: "Paris 11ème",
    },
  ];

  const renderStars = (rating: number) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(255,255,0,0.6)]"
              : "text-gray-400"
          }`}
        />
      ))}
    </div>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 text-center relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Ce que disent nos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D72600] to-[#FF6B00]">
              clients
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Plus de 200 clients satisfaits nous recommandent 🔐
          </p>
        </ScrollReveal>

        {/* Avis principal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/60 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-2xl p-8 mb-16 shadow-lg"
          >
            <Quote className="w-10 h-10 text-[#FF6B00] mb-6 mx-auto opacity-80" />
            <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100 italic mb-6">
              “{reviews[currentIndex].comment}”
            </p>

            <div className="flex flex-col items-center space-y-3">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {reviews[currentIndex].name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {reviews[currentIndex].service} •{" "}
                {reviews[currentIndex].location}
              </div>
              <div className="flex items-center space-x-2">
                {renderStars(reviews[currentIndex].rating)}
                {reviews[currentIndex].verified && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-6 -translate-y-1/2">
              <button
                onClick={() =>
                  setCurrentIndex(
                    (prev) => (prev - 1 + reviews.length) % reviews.length
                  )
                }
                className="p-3 text-gray-600 dark:text-gray-300 hover:text-[#D72600] transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % reviews.length)
                }
                className="p-3 text-gray-600 dark:text-gray-300 hover:text-[#D72600] transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Petits avis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              whileHover={{ y: -5 }}
              className="relative bg-white/70 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-md transition"
              onMouseEnter={() => setHoveredReview(review.id)}
              onMouseLeave={() => setHoveredReview(null)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D72600] to-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {review.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {review.location}
                    </p>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>

              <p className="text-gray-700 dark:text-gray-200 text-sm italic mb-4">
                “{review.comment.slice(0, 100)}...”
              </p>

              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{review.date}</span>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-1 hover:text-[#D72600] transition">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{review.helpful}</span>
                  </button>
                  <button className="hover:text-[#FF6B00] transition">
                    <Heart className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {hoveredReview === review.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/50 to-[#D72600]/40 rounded-2xl"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
