import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Eye, ArrowLeft, Share2, Tag, ChevronRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Données simulées - en production, ces données viendraient d'une API
  const blogPosts = [
    {
      id: 1,
      slug: 'nouvelle-reglementation-serrures-2024',
      title: 'Nouvelle réglementation sur les serrures en 2024 : ce qui change',
      excerpt: 'Découvrez les nouvelles normes de sécurité qui entrent en vigueur cette année et leur impact sur votre sécurité domestique.',
      content: `
        <p>La réglementation française en matière de serrurerie évolue constamment pour s'adapter aux nouvelles menaces et technologies. En 2024, plusieurs changements importants entrent en vigueur, impactant directement la sécurité de votre domicile.</p>

        <h2>Les principales évolutions réglementaires</h2>
        
        <p>La nouvelle réglementation introduit des standards plus stricts pour les serrures résidentielles, particulièrement dans les zones urbaines sensibles comme Paris. Ces changements visent à renforcer la protection des biens et des personnes face à l'évolution des techniques d'effraction.</p>

        <h3>Certification A2P renforcée</h3>
        
        <p>La certification A2P (Assurance Prévention Protection) devient plus exigeante avec de nouveaux tests de résistance. Les serrures doivent désormais résister à des tentatives d'effraction plus sophistiquées, incluant les nouvelles techniques utilisées par les cambrioleurs.</p>

        <ul>
          <li>Tests de résistance prolongés (de 5 à 15 minutes selon le niveau)</li>
          <li>Évaluation de la résistance aux outils électriques</li>
          <li>Contrôle de la qualité des matériaux utilisés</li>
          <li>Vérification de la résistance à la corrosion</li>
        </ul>

        <h3>Nouvelles normes pour les immeubles collectifs</h3>
        
        <p>Les copropriétés parisiennes sont particulièrement concernées par ces évolutions. La réglementation impose désormais :</p>

        <ul>
          <li>L'installation de serrures multipoints sur toutes les portes d'entrée</li>
          <li>La mise en place de systèmes de contrôle d'accès dans les halls d'immeuble</li>
          <li>La vérification annuelle des dispositifs de sécurité</li>
        </ul>

        <h2>Impact sur les propriétaires et locataires</h2>
        
        <p>Ces nouvelles réglementations ont des implications directes pour tous les occupants de logements :</p>

        <h3>Obligations des propriétaires</h3>
        
        <p>Les propriétaires bailleurs doivent s'assurer que leurs biens respectent les nouvelles normes de sécurité. Cela inclut :</p>

        <ul>
          <li>La mise aux normes des serrures existantes</li>
          <li>L'installation de dispositifs certifiés A2P</li>
          <li>La fourniture d'un certificat de conformité aux locataires</li>
        </ul>

        <h3>Droits des locataires</h3>
        
        <p>Les locataires bénéficient de nouvelles protections :</p>

        <ul>
          <li>Droit à un logement sécurisé selon les normes en vigueur</li>
          <li>Possibilité de demander la mise aux normes sans frais</li>
          <li>Réduction potentielle des primes d'assurance habitation</li>
        </ul>

        <h2>Conseils pour se mettre en conformité</h2>
        
        <p>Pour respecter ces nouvelles exigences, nous recommandons :</p>

        <ol>
          <li><strong>Faire un audit de sécurité</strong> : Évaluez l'état actuel de vos dispositifs de sécurité</li>
          <li><strong>Choisir des produits certifiés</strong> : Optez pour des serrures avec certification A2P récente</li>
          <li><strong>Faire appel à un professionnel</strong> : L'installation doit être réalisée par un serrurier qualifié</li>
          <li><strong>Conserver les certificats</strong> : Gardez tous les documents de conformité</li>
        </ol>

        <h2>Les avantages de la mise en conformité</h2>
        
        <p>Respecter ces nouvelles normes présente plusieurs avantages :</p>

        <ul>
          <li><strong>Sécurité renforcée</strong> : Protection optimale contre les effractions</li>
          <li><strong>Réduction des primes d'assurance</strong> : Jusqu'à 20% d'économies sur votre assurance habitation</li>
          <li><strong>Valorisation du bien</strong> : Augmentation de la valeur de votre propriété</li>
          <li><strong>Tranquillité d'esprit</strong> : Conformité légale garantie</li>
        </ul>

        <h2>Conclusion</h2>
        
        <p>La nouvelle réglementation 2024 marque une étape importante dans l'amélioration de la sécurité résidentielle en France. Bien que ces changements puissent représenter un investissement initial, ils garantissent une protection optimale et des économies à long terme.</p>

        <p>Chez Serrure Safe, nous accompagnons nos clients dans cette transition en proposant des solutions conformes aux nouvelles normes. N'hésitez pas à nous contacter pour un audit gratuit de votre installation actuelle.</p>
      `,
      category: 'Réglementation',
      author: 'Jean Dupont',
      date: '2024-01-15',
      readTime: '5 min',
      views: 1250,
      image: 'https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      tags: ['Réglementation', 'A2P', 'Sécurité', 'Normes'],
    },
    {
      id: 2,
      slug: 'choisir-serrure-appartement-paris',
      title: 'Comment choisir la bonne serrure pour votre appartement parisien',
      excerpt: 'Guide complet pour sélectionner la serrure adaptée à votre logement en fonction de vos besoins et de votre budget.',
      content: `
        <p>Le choix d'une serrure pour un appartement parisien nécessite de prendre en compte plusieurs facteurs spécifiques à la capitale française. Entre la densité urbaine, les types de logements et les exigences de sécurité, voici notre guide complet.</p>

        <h2>Comprendre les spécificités parisiennes</h2>
        
        <p>Paris présente des défis uniques en matière de sécurité résidentielle :</p>

        <ul>
          <li>Forte densité de population</li>
          <li>Immeubles anciens avec contraintes architecturales</li>
          <li>Taux de cambriolage variable selon les arrondissements</li>
          <li>Réglementations de copropriété strictes</li>
        </ul>

        <h2>Types de serrures adaptées</h2>
        
        <h3>Serrures multipoints</h3>
        
        <p>Recommandées pour tous les appartements parisiens, elles offrent :</p>

        <ul>
          <li>Sécurité renforcée avec 3 à 7 points d'ancrage</li>
          <li>Résistance aux tentatives d'effraction</li>
          <li>Conformité aux exigences des assurances</li>
        </ul>

        <h3>Serrures certifiées A2P</h3>
        
        <p>La certification A2P garantit :</p>

        <ul>
          <li>Tests de résistance normalisés</li>
          <li>Trois niveaux de sécurité (1, 2 ou 3 étoiles)</li>
          <li>Reconnaissance par les compagnies d'assurance</li>
        </ul>

        <h2>Critères de sélection</h2>
        
        <h3>Selon votre arrondissement</h3>
        
        <p>Chaque arrondissement parisien a ses spécificités :</p>

        <ul>
          <li><strong>Arrondissements centraux (1er-4ème)</strong> : Privilégier les serrures haute sécurité</li>
          <li><strong>Arrondissements résidentiels (7ème, 16ème)</strong> : Serrures multipoints standard</li>
          <li><strong>Arrondissements populaires (18ème, 19ème, 20ème)</strong> : Sécurité renforcée recommandée</li>
        </ul>

        <h3>Type de logement</h3>
        
        <ul>
          <li><strong>Studio/2 pièces</strong> : Serrure 3 points minimum</li>
          <li><strong>Appartement familial</strong> : Serrure 5 points avec blindage</li>
          <li><strong>Rez-de-chaussée</strong> : Sécurité maximale requise</li>
          <li><strong>Étages élevés</strong> : Sécurité standard acceptable</li>
        </ul>

        <h2>Budget et installation</h2>
        
        <h3>Fourchettes de prix</h3>
        
        <ul>
          <li><strong>Serrure 3 points</strong> : 200-400€ (pose incluse)</li>
          <li><strong>Serrure 5 points A2P</strong> : 400-800€ (pose incluse)</li>
          <li><strong>Serrure haute sécurité</strong> : 800-1500€ (pose incluse)</li>
        </ul>

        <h3>Installation professionnelle</h3>
        
        <p>L'installation par un professionnel garantit :</p>

        <ul>
          <li>Respect des normes de sécurité</li>
          <li>Garantie sur les travaux</li>
          <li>Conseils personnalisés</li>
          <li>Maintenance future</li>
        </ul>

        <h2>Conseils pratiques</h2>
        
        <ol>
          <li><strong>Évaluez vos besoins réels</strong> : Analysez les risques spécifiques à votre situation</li>
          <li><strong>Consultez votre assurance</strong> : Vérifiez les exigences de votre contrat</li>
          <li><strong>Respectez le règlement de copropriété</strong> : Certaines modifications nécessitent une autorisation</li>
          <li><strong>Prévoyez la maintenance</strong> : Une serrure bien entretenue dure plus longtemps</li>
        </ol>

        <h2>Conclusion</h2>
        
        <p>Le choix d'une serrure pour votre appartement parisien doit être mûrement réfléchi. Prenez en compte votre localisation, votre budget et vos besoins spécifiques. N'hésitez pas à faire appel à un professionnel pour un conseil personnalisé.</p>
      `,
      category: 'Conseils',
      author: 'Marie Martin',
      date: '2024-01-10',
      readTime: '7 min',
      views: 890,
      image: 'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      tags: ['Conseils', 'Paris', 'Appartement', 'Choix'],
    },
  ];

  const currentPost = blogPosts.find(post => post.slug === slug);
  const relatedPosts = blogPosts.filter(post => post.slug !== slug).slice(0, 3);

  if (!currentPost) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <GlassCard className="p-12 text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article non trouvé</h2>
          <p className="text-gray-600 mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link
            to="/blog"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
          >
            Retour au blog
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-orange-500 transition-colors">Accueil</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-800 font-medium">{currentPost.category}</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Article Header */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${currentPost.image}")`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <div className="mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {currentPost.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {currentPost.title}
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              {currentPost.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{currentPost.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(currentPost.date).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{currentPost.readTime} de lecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>{currentPost.views} vues</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3"
              >
                <GlassCard className="p-10">
                  {/* Back Button */}
                  <div className="mb-8">
                    <Link
                      to="/blog"
                      className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span>Retour au blog</span>
                    </Link>
                  </div>

                  {/* Article Content */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-orange-500 prose-strong:text-gray-800 prose-ul:text-gray-600 prose-ol:text-gray-600"
                    dangerouslySetInnerHTML={{ __html: currentPost.content }}
                  />

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Tag className="w-5 h-5 mr-2" />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Share */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Share2 className="w-5 h-5 mr-2" />
                      Partager cet article
                    </h4>
                    <div className="flex space-x-4">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Facebook
                      </button>
                      <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                        Twitter
                      </button>
                      <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                        LinkedIn
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-1 space-y-8"
              >
                {/* Author Info */}
                <GlassCard className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">À propos de l'auteur</h4>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      {currentPost.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{currentPost.author}</div>
                      <div className="text-sm text-gray-600">Expert en sécurité</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Spécialiste en serrurerie avec plus de 10 ans d'expérience dans la sécurisation des biens.
                  </p>
                </GlassCard>

                {/* Contact CTA */}
                <GlassCard className="p-6 text-center">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Besoin d'aide ?</h4>
                  <p className="text-sm text-gray-600 mb-6">
                    Nos experts sont disponibles 24h/24 pour répondre à vos questions.
                  </p>
                  <a
                    href="tel:+33123456789"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 inline-block"
                  >
                    01 23 45 67 89
                  </a>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 relative">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
            style={{
              backgroundImage: 'url("https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
            }}
          ></div>
          
          <div className="relative z-10 container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Articles <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">similaires</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <GlassCard className="overflow-hidden h-full group">
                      <div className="relative h-48">
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
                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
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
    </div>
  );
};

export default BlogPost;