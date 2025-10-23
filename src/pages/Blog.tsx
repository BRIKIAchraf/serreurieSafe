import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Tag, Clock, Eye } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import BlogEditorialHero from '../components/BlogEditorialHero';
import AnimatedSVGIcon from '../components/AnimatedSVGIcon';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', 'S├®curit├®', 'Conseils', 'Actualit├®s', 'Technologie', 'R├®glementation'];

  const blogPosts = [
    {
      id: 1,
      slug: 'nouvelle-reglementation-serrures-2024',
      title: 'Nouvelle r├®glementation sur les serrures en 2024 : ce qui change',
      excerpt: 'D├®couvrez les nouvelles normes de s├®curit├® qui entrent en vigueur cette ann├®e et leur impact sur votre s├®curit├® domestique.',
      content: 'La r├®glementation fran├ºaise en mati├¿re de serrurerie ├®volue constamment pour s\'adapter aux nouvelles menaces et technologies...',
      category: 'R├®glementation',
      author: 'Jean Dupont',
      date: '2024-01-15',
      readTime: '5 min',
      views: 1250,
      image: 'https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      featured: true,
    },
    {
      id: 2,
      slug: 'choisir-serrure-appartement-paris',
      title: 'Comment choisir la bonne serrure pour votre appartement parisien',
      excerpt: 'Guide complet pour s├®lectionner la serrure adapt├®e ├á votre logement en fonction de vos besoins et de votre budget.',
      content: 'Le choix d\'une serrure pour un appartement parisien n├®cessite de prendre en compte plusieurs facteurs sp├®cifiques...',
      category: 'Conseils',
      author: 'Marie Martin',
      date: '2024-01-10',
      readTime: '7 min',
      views: 890,
      image: 'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      featured: false,
    },
    {
      id: 3,
      slug: 'serrures-connectees-avenir-securite',
      title: 'Les serrures connect├®es : l\'avenir de la s├®curit├® domestique ?',
      excerpt: 'Analyse des avantages et inconv├®nients des serrures intelligentes et de leur place dans l\'├®cosyst├¿me s├®curitaire moderne.',
      content: 'Les serrures connect├®es repr├®sentent une r├®volution dans le domaine de la s├®curit├® domestique...',
      category: 'Technologie',
      author: 'Pierre Durand',
      date: '2024-01-08',
      readTime: '6 min',
      views: 1450,
      image: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      featured: true,
    },
    {
      id: 4,
      slug: 'prevention-cambriolage-conseils-experts',
      title: '10 conseils d\'experts pour pr├®venir les cambriolages',
      excerpt: 'Nos sp├®cialistes partagent leurs meilleures strat├®gies pour s├®curiser votre domicile et dissuader les intrus.',
      content: 'La pr├®vention reste le meilleur moyen de se prot├®ger contre les cambriolages...',
      category: 'S├®curit├®',
      author: 'Sophie Leroy',
      date: '2024-01-05',
      readTime: '8 min',
      views: 2100,
      image: 'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      featured: false,
    },
    {
      id: 5,
      slug: 'entretien-serrures-guide-complet',
      title: 'Guide complet pour l\'entretien de vos serrures',
      excerpt: 'Apprenez ├á maintenir vos serrures en parfait ├®tat de fonctionnement avec nos conseils pratiques et professionnels.',
      content: 'Un entretien r├®gulier de vos serrures est essentiel pour garantir leur long├®vit├® et leur efficacit├®...',
      category: 'Conseils',
      author: 'Marc Rousseau',
      date: '2024-01-03',
      readTime: '4 min',
      views: 750,
      image: 'https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      featured: false,
    },
    {
      id: 6,
      slug: 'statistiques-cambriolages-paris-2024',
      title: 'Statistiques des cambriolages ├á Paris en 2024 : analyse et tendances',
      excerpt: 'D├®couvrez les derni├¿res donn├®es sur la criminalit├® ├á Paris et les quartiers les plus touch├®s par les cambriolages.',
      content: 'Les statistiques officielles r├®v├¿lent des tendances int├®ressantes concernant les cambriolages ├á Paris...',
      category: 'Actualit├®s',
      author: 'Julie Bernard',
      date: '2024-01-01',
      readTime: '6 min',
      views: 1680,
      image: 'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      featured: false,
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      <BlogEditorialHero />
      <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with Logo Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url("/WhatsApp_Image_2025-10-17_├á_15.12.18_29f18722-removebg-preview.png")',
              backgroundSize: '850px 637px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-orange-600/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Actualit├®s & Conseils
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Restez inform├® des derni├¿res tendances en s├®curit├® et d├®couvrez nos conseils d'experts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher un article..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 focus:border-orange-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                          : 'backdrop-blur-sm bg-white/20 border border-white/30 text-gray-700 hover:bg-white/30'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <Tag className="w-8 h-8 text-orange-500 mr-3" />
                Articles ├á la une
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <GlassCard className="overflow-hidden h-full group relative">
                      <div className="absolute top-8 right-8 w-20 h-20 text-blue-400 opacity-20 z-0">
                        <AnimatedSVGIcon type="shield" />
                      </div>
                      <div className="relative h-64 z-10">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            ├Ç la une
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-orange-500 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Tous les articles
              {filteredPosts.length > 0 && (
                <span className="text-lg font-normal text-gray-600 ml-4">
                  ({filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''})
                </span>
              )}
            </h2>
          </motion.div>

          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <GlassCard className="p-12 max-w-md mx-auto">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun article trouv├®</h3>
                <p className="text-gray-600">
                  Essayez de modifier vos crit├¿res de recherche ou de s├®lectionner une autre cat├®gorie.
                </p>
              </GlassCard>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => {
                const iconTypes: Array<'lock' | 'key' | 'shield' | 'gear' | 'security'> = ['lock', 'key', 'shield', 'gear', 'security'];
                const iconType = iconTypes[index % iconTypes.length];
                return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <GlassCard className="overflow-hidden h-full group relative">
                      <div className="absolute top-4 right-4 w-16 h-16 text-orange-400 opacity-20 z-0">
                        <AnimatedSVGIcon type={iconType} />
                      </div>
                      <div className="relative h-48 z-10">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Restez <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">inform├®</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Recevez nos derniers conseils et actualit├®s directement dans votre bo├«te mail
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-4 rounded-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-orange-500 focus:outline-none transition-all"
                />
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
                  S'abonner
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Blog;
