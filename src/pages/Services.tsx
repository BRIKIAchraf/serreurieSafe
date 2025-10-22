import React from 'react';
import { motion } from 'framer-motion';
import { Key, Shield, Lock, Wrench, Home, Building, Clock, CheckCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const Services: React.FC = () => {
  const mainServices = [
    {
      title: 'Ouverture de porte',
      description: 'Intervention rapide et sans dégâts pour tous types de serrures',
      icon: Key,
      features: ['Sans casse', 'Tous types de serrures', 'Intervention 24h/24', 'Devis gratuit'],
      image: 'https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    },
    {
      title: 'Installation de serrures',
      description: 'Pose de serrures haute sécurité certifiées A2P',
      icon: Lock,
      features: ['Serrures certifiées A2P', 'Conseil personnalisé', 'Garantie 5 ans', 'Installation professionnelle'],
      image: 'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    },
    {
      title: 'Blindage de porte',
      description: 'Renforcement de votre sécurité avec des solutions sur mesure',
      icon: Shield,
      features: ['Blindage sur mesure', 'Normes de sécurité', 'Esthétique préservée', 'Résistance maximale'],
      image: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    },
    {
      title: 'Dépannage urgent',
      description: 'Service d\'urgence 24h/24 et 7j/7 sur Paris et banlieue',
      icon: Wrench,
      features: ['Intervention rapide', 'Service 24h/24', 'Équipe mobile', 'Tarif transparent'],
      image: 'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    },
  ];

  const additionalServices = [
    {
      title: 'Sécurisation domicile',
      description: 'Solutions complètes pour votre habitation',
      icon: Home,
      services: [
        'Audit sécurité gratuit',
        'Installation de serrures multipoints',
        'Pose de verrous de sécurité',
        'Blindage de porte d\'entrée',
        'Installation de judas et entrebâilleurs',
        'Conseil en sécurité domestique',
      ],
    },
    {
      title: 'Sécurisation entreprise',
      description: 'Protection professionnelle adaptée à vos besoins',
      icon: Building,
      services: [
        'Contrôle d\'accès électronique',
        'Serrures à code et badges',
        'Coffres-forts professionnels',
        'Blindage de locaux sensibles',
        'Maintenance préventive',
        'Formation du personnel',
      ],
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Appel d\'urgence',
      description: 'Contactez-nous 24h/24 pour une intervention rapide',
    },
    {
      step: '02',
      title: 'Diagnostic',
      description: 'Évaluation de la situation et devis transparent',
    },
    {
      step: '03',
      title: 'Intervention',
      description: 'Réalisation des travaux par nos experts certifiés',
    },
    {
      step: '04',
      title: 'Garantie',
      description: 'Suivi et garantie sur tous nos travaux',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with Logo Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-6"
            style={{
              backgroundImage: 'url("/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png")',
              backgroundSize: '800px 600px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-orange-50/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Nos <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes en serrurerie et sécurité pour particuliers et professionnels
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <GlassCard className="overflow-hidden h-full">
                  <div className="relative h-64">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <service.icon className="w-12 h-12 text-orange-400 mb-2" />
                      <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
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
              Services <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Spécialisés</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions sur mesure pour tous vos besoins de sécurité
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <GlassCard className="p-10 h-full">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {service.services.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Notre <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Processus</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une méthode éprouvée pour garantir votre satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <GlassCard className="p-8 text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-12 text-center max-w-4xl mx-auto">
              <Clock className="w-16 h-16 text-orange-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Urgence <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">24h/24</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Porte claquée, serrure cassée, cambriolage ? Notre équipe intervient 
                en moins de 30 minutes sur Paris et banlieue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+33123456789"
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-10 py-4 rounded-full font-semibold text-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Appeler maintenant</span>
                </a>
                <a
                  href="/emergency"
                  className="backdrop-blur-md bg-white/20 border border-white/30 text-gray-800 px-10 py-4 rounded-full font-semibold text-xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>En savoir plus</span>
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;