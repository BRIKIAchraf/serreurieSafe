import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Clock, CheckCircle, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import LocksmithHeritageTimeline from '../components/LocksmithHeritageTimeline';

const About: React.FC = () => {
  const stats = [
    { number: '15+', label: 'Années d\'expérience', icon: Clock },
    { number: '1000+', label: 'Clients satisfaits', icon: Users },
    { number: '24/7', label: 'Service disponible', icon: Shield },
    { number: '100%', label: 'Satisfaction garantie', icon: Star },
  ];

  const values = [
    {
      title: 'Expertise',
      description: 'Une équipe de professionnels certifiés avec plus de 15 ans d\'expérience dans le domaine de la serrurerie.',
      icon: Award,
    },
    {
      title: 'Rapidité',
      description: 'Intervention en moins de 30 minutes sur Paris et banlieue pour tous vos besoins urgents.',
      icon: Clock,
    },
    {
      title: 'Sécurité',
      description: 'Respect des normes de sécurité les plus strictes et utilisation de matériel certifié A2P.',
      icon: Shield,
    },
    {
      title: 'Confiance',
      description: 'Plus de 1000 clients nous font confiance pour la sécurisation de leur domicile et entreprise.',
      icon: Users,
    },
  ];

  const certifications = [
    'Certification A2P (Assurance Prévention Protection)',
    'Agrément assurance pour interventions d\'urgence',
    'Formation continue aux nouvelles technologies',
    'Respect des normes européennes EN 12209',
    'Garantie décennale sur tous nos travaux',
    'Membre de la Chambre des Métiers et de l\'Artisanat',
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with Logo Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-8"
            style={{
              backgroundImage: 'url("/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png")',
              backgroundSize: '900px 675px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-orange-50/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              À propos de <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Serrure Safe</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Votre partenaire de confiance en serrurerie et sécurité depuis plus de 15 ans
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <GlassCard className="p-8 text-center">
                  <stat.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LocksmithHeritageTimeline />

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">
                  Notre <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Histoire</span>
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    Fondée en 2009, Serrure Safe est née de la passion de son fondateur pour l'artisanat 
                    de la serrurerie et de sa volonté d'offrir un service de qualité supérieure aux 
                    habitants de Paris et de la région Île-de-France.
                  </p>
                  <p>
                    Au fil des années, nous avons développé une expertise reconnue dans tous les domaines 
                    de la serrurerie : ouverture de porte, installation de serrures haute sécurité, 
                    blindage de porte, et bien plus encore.
                  </p>
                  <p>
                    Aujourd'hui, notre équipe de professionnels certifiés intervient 24h/24 et 7j/7 
                    pour répondre à tous vos besoins, qu'il s'agisse d'une urgence ou d'un projet 
                    de sécurisation planifié.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Équipe Serrure Safe"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">Notre Équipe</h3>
                  <p className="text-gray-200">Des professionnels passionnés à votre service</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Nos <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <GlassCard className="p-8 text-center h-full">
                  <value.icon className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")',
          }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">
                  Certifications & <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Garanties</span>
                </h2>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-10 text-center">
                <Award className="w-24 h-24 text-orange-500 mx-auto mb-8" />
                <h3 className="text-3xl font-semibold text-gray-800 mb-6">
                  Qualité Certifiée
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Nos certifications et agréments témoignent de notre engagement 
                  envers l'excellence et la sécurité. Nous respectons les normes 
                  les plus strictes du secteur.
                </p>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold inline-block">
                  Certifié A2P
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                Notre <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Chez Serrure Safe, notre mission est de vous offrir la tranquillité d'esprit 
                en sécurisant votre domicile ou votre entreprise avec des solutions adaptées 
                à vos besoins spécifiques.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nous nous engageons à maintenir les plus hauts standards de qualité, 
                à intervenir rapidement en cas d'urgence, et à vous conseiller avec 
                transparence pour faire les meilleurs choix en matière de sécurité.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
