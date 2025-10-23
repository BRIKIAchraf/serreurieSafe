import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Star,
  Quote,
  ThumbsUp,
  Heart,
  Award,
  Shield,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  CheckCircle,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import GlassCard from "./GlassCard";

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  verified: boolean;
  helpful: number;
  avatar?: string;
  location?: string;
}

const ClientReviews: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredReview, setHoveredReview] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

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
    {
      id: "4",
      name: "Pierre Moreau",
      rating: 5,
      date: "2024-01-08",
      service: "Renforcement porte",
      comment:
        "Excellent travail de renforcement. Équipe compétente et ponctuelle. Sécurité renforcée !",
      verified: true,
      helpful: 6,
      location: "Nanterre",
    },
    {
      id: "5",
      name: "Claire Petit",
      rating: 5,
      date: "2024-01-05",
      service: "Maintenance",
      comment:
        "Maintenance préventive très bien réalisée. Technicien à l'écoute et professionnel.",
      verified: true,
      helpful: 4,
      location: "Paris 20ème",
    },
    {
      id: "6",
      name: "Antoine Roux",
      rating: 5,
      date: "2024-01-03",
      service: "Ouverture coffre-fort",
      comment:
        "Coffre-fort ouvert sans dégâts. Expertise remarquable et tarif correct.",
      verified: true,
      helpful: 9,
      location: "Issy-les-Moulineaux",
    },
  ];

  const stats = {
    averageRating: 4.9,
    totalReviews: 247,
    fiveStars: 98,
    fourStars: 2,
    threeStars: 0,
    twoStars: 0,
    oneStar: 0,
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };

    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getServiceIcon = (service: string) => {
    switch (service.toLowerCase()) {
      case "ouverture de porte":
        return <Shield className="w-4 h-4 text-blue-500" />;
      case "installation serrure":
        return <Award className="w-4 h-4 text-green-500" />;
      case "urgence nocturne":
        return <Zap className="w-4 h-4 text-red-500" />;
      case "renforcement porte":
        return <Shield className="w-4 h-4 text-purple-500" />;
      case "maintenance":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "ouverture coffre-fort":
        return <Award className="w-4 h-4 text-indigo-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Avis clients</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ce que disent nos{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              clients
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plus de 247 clients satisfaits nous font confiance pour leur
            sécurité
          </p>
        </ScrollReveal>

        {/* Stats Overview */}
        <ScrollReveal className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stats.averageRating}/5
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(5, "lg")}
                </div>
                <p className="text-gray-600">Note moyenne</p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stats.totalReviews}+
                </div>
                <p className="text-gray-600">Avis clients</p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stats.fiveStars}%
                </div>
                <p className="text-gray-600">Clients satisfaits</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Review */}
        <ScrollReveal className="mb-16">
          <div className="relative">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {reviews[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {reviews[currentIndex].name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{reviews[currentIndex].location}</span>
                      {reviews[currentIndex].verified && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Vérifié</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    {getServiceIcon(reviews[currentIndex].service)}
                    <span className="text-sm font-medium text-gray-700">
                      {reviews[currentIndex].service}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderStars(reviews[currentIndex].rating, "md")}
                    <span className="text-sm text-gray-600">
                      {reviews[currentIndex].date}
                    </span>
                  </div>
                </div>
              </div>

              <Quote className="w-8 h-8 text-blue-500 mb-4" />
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                "{reviews[currentIndex].comment}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Utile ({reviews[currentIndex].helpful})</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>J'aime</span>
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={prevReview}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextReview}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* All Reviews Grid */}
        <ScrollReveal>
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Tous les avis clients
              </h3>
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {showAllReviews ? "Voir moins" : "Voir tous"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllReviews ? reviews : reviews.slice(0, 3)).map(
              (review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onHoverStart={() => setHoveredReview(review.id)}
                  onHoverEnd={() => setHoveredReview(null)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {review.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {review.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating, "sm")}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    {getServiceIcon(review.service)}
                    <span className="text-sm font-medium text-gray-700">
                      {review.service}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                    "{review.comment}"
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{review.date}</span>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{review.helpful}</span>
                      </button>
                      <button className="hover:text-red-600 transition-colors">
                        <Heart className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Hover Animation */}
                  <AnimatePresence>
                    {hoveredReview === review.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            )}
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Rejoignez nos clients satisfaits
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Découvrez pourquoi plus de 247 clients nous font confiance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Demander un devis
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Voir nos services
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ClientReviews;
