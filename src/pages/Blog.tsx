import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import BlogEditorialHero from "../components/BlogEditorialHero";

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const categories = [
    "Tous",
    "Sécurité",
    "Conseils",
    "Actualités",
    "Technologie",
    "Réglementation",
  ];

  const blogPosts = [
    {
      id: 1,
      slug: "reglementation-serrures-2024",
      title: "Nouvelle réglementation sur les serrures en 2024 : ce qui change",
      excerpt:
        "Les nouvelles normes de sécurité impactent désormais les serrures multipoints et connectées. Voici ce qu’il faut savoir.",
      author: "Jean Dupont",
      date: "2024-01-15",
      readTime: "5 min",
      category: "Réglementation",
      image:
        "https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop",
    },
    {
      id: 2,
      slug: "serrures-connectees-avenir",
      title: "Les serrures connectées : l’avenir de la sécurité domestique",
      excerpt:
        "Entre innovation et risques, découvrez comment les serrures intelligentes transforment la protection du domicile.",
      author: "Marie Martin",
      date: "2024-01-10",
      readTime: "6 min",
      category: "Technologie",
      image:
        "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop",
    },
    {
      id: 3,
      slug: "prevention-cambriolages",
      title: "10 conseils d’experts pour prévenir les cambriolages",
      excerpt:
        "Les bons réflexes à adopter avant qu’il ne soit trop tard. Des solutions concrètes pour chaque type d’habitat.",
      author: "Sophie Leroy",
      date: "2024-01-05",
      readTime: "7 min",
      category: "Sécurité",
      image:
        "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop",
    },
    {
      id: 4,
      slug: "entretien-serrures-guide",
      title: "Guide complet pour l’entretien de vos serrures",
      excerpt:
        "Un entretien régulier garantit longévité et performance. Découvrez nos astuces pour prolonger la durée de vie de vos serrures.",
      author: "Marc Rousseau",
      date: "2024-01-03",
      readTime: "4 min",
      category: "Conseils",
      image:
        "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop",
    },
  ];

  const filteredPosts =
    selectedCategory === "Tous"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen text-gray-900">
      {/* === HERO === */}
      <BlogEditorialHero />

      {/* === FILTRES === */}
      <section className="py-12 flex flex-wrap justify-center gap-3 px-6">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold border transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg"
                : "border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </section>

      {/* === SECTION MAGAZINE === */}
      <section className="relative max-w-6xl mx-auto px-6 py-20 space-y-24">
        {/* LIGNE VERTICALE */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 2 }}
          className="absolute left-1/2 top-0 w-[3px] bg-gradient-to-b from-orange-500 to-red-500 rounded-full hidden lg:block"
        />

        {filteredPosts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col lg:flex-row items-center gap-10 relative ${
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* IMAGE */}
            <div className="flex-1 relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-3xl shadow-xl"
              />
              <span className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>

            {/* TEXTE */}
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold leading-snug text-gray-900 hover:text-orange-500 transition-colors">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" /> {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />{" "}
                  {new Date(post.date).toLocaleDateString("fr-FR")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {post.readTime}
                </span>
              </div>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all"
              >
                Lire l’article <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.article>
        ))}
      </section>

      {/* === CTA (carte plus large) === */}
      <section className="py-32 text-center relative">
        <div
          className="relative max-w-5xl mx-auto px-8 rounded-3xl shadow-2xl overflow-hidden border border-gray-300"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* overlay sombre pour lisibilité */}
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative p-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Restez informé des{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                dernières actualités
              </span>
            </h2>
            <p className="text-gray-200 mb-8 text-lg">
              Recevez nos conseils exclusifs et les dernières innovations en
              sécurité et serrurerie.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="px-6 py-4 rounded-full flex-1 bg-white/20 border border-white/40 focus:border-orange-500 focus:outline-none text-white placeholder-gray-300"
              />
              <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all">
                S’abonner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
