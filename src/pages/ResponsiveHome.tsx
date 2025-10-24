import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Clock, Phone, Star, ArrowRight, CheckCircle, Award, Users, MapPin } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const ResponsiveHome: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      title: 'Ouverture de porte',
      description: 'Intervention rapide sans dégâts',
      icon: '🔓',
      image: 'https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Sans casse', 'Tous types', '24h/24'],
    },
    {
      title: 'Installation serrure',
      description: 'Serrures haute sécurité A2P',
      icon: '🔐',
      image: 'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Certifié A2P', 'Haute sécurité', 'Garantie 5 ans'],
    },
    {
      title: 'Blindage de porte',
      description: 'Renforcement sécurité',
      icon: '🛡️',
      image: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Sur mesure', 'Normes sécurité', 'Résistant'],
    },
    {
      title: 'Dépannage urgent',
      description: 'Service 24h/24 et 7j/7',
      icon: '🚨',
      image: 'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['< 30min', 'Devis gratuit', 'Équipe mobile'],
    },
  ];

  const stats = [
    { number: '24h/24', label: 'Disponibilité', icon: Clock },
    { number: '15+', label: "Ans d'expérience", icon: Award },
    { number: '1000+', label: 'Clients satisfaits', icon: Users },
    { number: '100%', label: 'Satisfaction', icon: Star },
  ];

  const features = [
    'Intervention en moins de 30 minutes',
    'Devis gratuit et transparent',
    'Artisan certifié A2P',
    'Garantie sur tous nos travaux',
    'Paiement sécurisé',
    'Service client réactif',
  ];

  return (
    <div className="pt-16 sm:pt-20">
      <section className="relative min-h-screen flex items-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-secondary-900/5 to-accent-900/10" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center space-x-2 bg-secondary-100 text-secondary-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Clock className="w-4 h-4" />
                <span>Service 24h/24</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight">
                Serrurier Expert
                <span className="block bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">
                  à Paris
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-primary-700 leading-relaxed max-w-2xl">
                Intervention rapide 24h/24 pour tous vos besoins de serrurerie et sécurité.
                Expert certifié A2P avec plus de 15 ans d'expérience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="tel:+33123456789"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Phone className="w-5 h-5" />
                  <span>01 23 45 67 89</span>
                </a>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-primary-300 hover:border-secondary-500 text-primary-700 hover:text-secondary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-200"
                >
                  <span>Nos Services</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    className="text-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl"
                  >
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-600 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-primary-900">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-primary-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Serrurier professionnel"
                  className="w-full h-64 sm:h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />

                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg max-w-[calc(100%-2rem)] sm:max-w-none">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-sm sm:text-base text-primary-900">Certifié A2P</div>
                      <div className="text-xs sm:text-sm text-primary-600">Sécurité garantie</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4 sm:mb-6">
              Nos Services
            </h2>
            <p className="text-base sm:text-xl text-primary-600 max-w-3xl mx-auto">
              Des solutions complètes pour tous vos besoins en serrurerie
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-primary-50 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 hover:border-secondary-300 group"
              >
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{service.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-primary-900 mb-3 sm:mb-4 group-hover:text-secondary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-primary-600 mb-4 sm:mb-6">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-primary-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8 order-2 lg:order-1"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4 sm:mb-6">
                Pourquoi nous choisir ?
              </h2>
              <p className="text-base sm:text-xl text-primary-700">
                Plus de 15 ans d'expérience au service de votre sécurité.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 bg-white/60 backdrop-blur-sm p-3 sm:p-4 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-primary-800 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <span>Demander un devis</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Équipe Serrure Safe"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-800 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Besoin d'une intervention ?
            </h2>
            <p className="text-base sm:text-xl mb-8 sm:mb-12 opacity-90">
              Notre équipe est disponible 24h/24 et 7j/7. Intervention rapide garantie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <a
                href="tel:+33123456789"
                className="inline-flex items-center justify-center space-x-2 bg-white text-primary-900 px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-xl hover:bg-primary-50 transition-all duration-200 shadow-lg"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>01 23 45 67 89</span>
              </a>
              <Link
                to="/emergency"
                className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-xl hover:bg-white hover:text-primary-900 transition-all duration-200"
              >
                <span>Urgence</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ResponsiveHome;
