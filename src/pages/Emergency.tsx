import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Phone, MapPin, Shield, AlertTriangle, CheckCircle, Star, Zap } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import EmergencyResponseShowcase from '../components/EmergencyResponseShowcase';

const Emergency: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    urgencyType: '',
    description: '',
  });

  const urgencyTypes = [
    { value: 'locked-out', label: 'Porte claqu├®e / Cl├®s perdues', icon: '­ƒöÉ' },
    { value: 'broken-lock', label: 'Serrure cass├®e', icon: '­ƒöº' },
    { value: 'burglary', label: 'Tentative d\'effraction', icon: '­ƒÜ¿' },
    { value: 'key-stuck', label: 'Cl├® cass├®e dans serrure', icon: '­ƒùØ´©Å' },
    { value: 'other', label: 'Autre urgence', icon: 'ÔÜí' },
  ];

  const interventionZones = [
    { zone: 'Paris 1er - 4├¿me', time: '15-20 min', areas: ['Ch├ótelet', 'Louvre', 'Marais', '├Äle Saint-Louis'] },
    { zone: 'Paris 5├¿me - 8├¿me', time: '20-25 min', areas: ['Quartier Latin', 'Saint-Germain', 'Champs-├ëlys├®es', 'Op├®ra'] },
    { zone: 'Paris 9├¿me - 12├¿me', time: '20-30 min', areas: ['Pigalle', 'R├®publique', 'Bastille', 'Nation'] },
    { zone: 'Paris 13├¿me - 16├¿me', time: '25-30 min', areas: ['Montparnasse', 'Trocad├®ro', 'Auteuil', 'Passy'] },
    { zone: 'Paris 17├¿me - 20├¿me', time: '25-35 min', areas: ['Batignolles', 'Montmartre', 'Belleville', 'M├®nilmontant'] },
    { zone: 'Banlieue proche', time: '30-45 min', areas: ['Boulogne', 'Neuilly', 'Vincennes', 'Saint-Denis'] },
  ];

  const guarantees = [
    { title: 'Intervention rapide', description: 'Arriv├®e sur site en moins de 30 minutes', icon: Zap },
    { title: 'Devis transparent', description: 'Prix annonc├® avant intervention', icon: CheckCircle },
    { title: 'Sans casse', description: 'Ouverture sans d├®g├óts dans 95% des cas', icon: Shield },
    { title: 'Disponible 24h/24', description: 'Service d\'urgence tous les jours', icon: Clock },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire
    console.log('Demande d\'urgence:', formData);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with Logo Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'url("/WhatsApp_Image_2025-10-17_├á_15.12.18_29f18722-removebg-preview.png")',
              backgroundSize: '700px 525px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/85 to-orange-600/75"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="flex items-center justify-center mb-6">
              <AlertTriangle className="w-16 h-16 text-yellow-300 mr-4" />
              <h1 className="text-5xl md:text-7xl font-bold">
                Urgence 24h/24
              </h1>
            </div>
            <p className="text-2xl md:text-3xl mb-8 font-light">
              Intervention rapide sur Paris et banlieue
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="tel:+33123456789"
                className="bg-white text-red-600 px-12 py-6 rounded-full font-bold text-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-3"
              >
                <Phone className="w-8 h-8" />
                <span>01 23 45 67 89</span>
              </a>
              <div className="text-center">
                <div className="text-yellow-300 font-semibold text-lg">Temps d'intervention moyen</div>
                <div className="text-3xl font-bold"> &lt; 30 minutes</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <EmergencyResponseShowcase />

      {/* Emergency Form */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                  <Clock className="w-8 h-8 text-red-500 mr-3" />
                  Demande d'intervention urgente
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Nom complet *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 focus:border-orange-500 focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">T├®l├®phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 focus:border-orange-500 focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Adresse d'intervention *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Adresse compl├¿te avec arrondissement"
                      className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 focus:border-orange-500 focus:outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Type d'urgence *</label>
                    <select
                      name="urgencyType"
                      value={formData.urgencyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 focus:border-orange-500 focus:outline-none transition-all"
                      required
                    >
                      <option value="">S├®lectionnez le type d'urgence</option>
                      {urgencyTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description de la situation</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="D├®crivez bri├¿vement votre situation..."
                      className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 focus:border-orange-500 focus:outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Demander une intervention imm├®diate
                  </button>
                </form>
              </GlassCard>
            </motion.div>

            {/* Guarantees */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Nos garanties d'intervention</h2>
              
              {guarantees.map((guarantee, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <GlassCard className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                        <guarantee.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{guarantee.title}</h3>
                        <p className="text-gray-600">{guarantee.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intervention Zones */}
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
              Zones d'<span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">intervention</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Temps d'intervention estim├®s selon votre localisation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interventionZones.map((zone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <GlassCard className="p-8 text-center h-full">
                  <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{zone.zone}</h3>
                  <div className="text-3xl font-bold text-red-500 mb-4">{zone.time}</div>
                  <div className="space-y-2">
                    {zone.areas.map((area, areaIndex) => (
                      <div key={areaIndex} className="text-gray-600 text-sm">
                        {area}
                      </div>
                    ))}
                  </div>
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
              <div className="flex items-center justify-center mb-8">
                <Star className="w-16 h-16 text-yellow-500" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Une urgence ? <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Nous sommes l├á !</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Notre ├®quipe d'experts est disponible 24h/24 et 7j/7 pour toutes vos urgences de serrurerie. 
                Intervention rapide garantie sur Paris et banlieue.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="tel:+33123456789"
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-12 py-6 rounded-full font-bold text-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3"
                >
                  <Phone className="w-6 h-6" />
                  <span>Appeler maintenant</span>
                </a>
                <a
                  href="mailto:urgence@serruresafe.fr"
                  className="backdrop-blur-md bg-white/20 border border-white/30 text-gray-800 px-12 py-6 rounded-full font-bold text-xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span>Email d'urgence</span>
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Emergency;
