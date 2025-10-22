import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Calendar, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: '',
    preferredTime: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceTypes = [
    'Ouverture de porte',
    'Changement de serrure',
    'Installation blindage',
    'Dépannage urgent',
    'Conseil sécurité',
    'Devis personnalisé',
    'Autre',
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      details: '01 23 45 67 89',
      subtitle: 'Disponible 24h/24 - 7j/7',
      action: 'tel:+33123456789',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'contact@serruresafe.fr',
      subtitle: 'Réponse sous 2h en moyenne',
      action: 'mailto:contact@serruresafe.fr',
    },
    {
      icon: MapPin,
      title: 'Zone d\'intervention',
      details: 'Paris et Île-de-France',
      subtitle: 'Déplacement gratuit',
      action: null,
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: '24h/24 - 7j/7',
      subtitle: 'Service d\'urgence permanent',
      action: null,
    },
  ];

  const faq = [
    {
      question: 'Combien coûte une intervention d\'urgence ?',
      answer: 'Nos tarifs sont transparents et annoncés avant intervention. Le devis est gratuit et sans engagement. Les prix varient selon le type d\'intervention et l\'heure.',
    },
    {
      question: 'Intervenez-vous vraiment 24h/24 ?',
      answer: 'Oui, notre service d\'urgence est disponible 24h/24 et 7j/7, y compris les weekends et jours fériés. Nous garantissons une intervention en moins de 30 minutes.',
    },
    {
      question: 'Puis-je avoir un devis avant l\'intervention ?',
      answer: 'Absolument ! Nous établissons toujours un devis gratuit et détaillé avant de commencer les travaux. Aucune surprise sur la facture.',
    },
    {
      question: 'Vos serrures sont-elles certifiées ?',
      answer: 'Toutes nos serrures sont certifiées A2P et répondent aux normes de sécurité les plus strictes. Nous travaillons avec les meilleures marques du marché.',
    },
    {
      question: 'Proposez-vous une garantie ?',
      answer: 'Oui, tous nos travaux sont garantis. La durée de garantie varie selon le type d\'intervention (de 6 mois à 5 ans pour les installations).',
    },
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
    console.log('Formulaire envoyé:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: '',
        preferredTime: '',
      });
    }, 3000);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with Logo Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-12"
            style={{
              backgroundImage: 'url("/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png")',
              backgroundSize: '800px 600px',
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
              Contactez-nous
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Une question ? Un devis ? Une urgence ? Notre équipe est à votre écoute 24h/24
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <GlassCard className="p-8 text-center h-full">
                  {info.action ? (
                    <a href={info.action} className="block hover:scale-105 transition-transform duration-300">
                      <info.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{info.title}</h3>
                      <div className="text-lg font-medium text-gray-700 mb-2">{info.details}</div>
                      <div className="text-sm text-gray-600">{info.subtitle}</div>
                    </a>
                  ) : (
                    <>
                      <info.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{info.title}</h3>
                      <div className="text-lg font-medium text-gray-700 mb-2">{info.details}</div>
                      <div className="text-sm text-gray-600">{info.subtitle}</div>
                    </>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                  <MessageCircle className="w-8 h-8 text-orange-500 mr-3" />
                  Demande de contact
                </h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Message envoyé !</h3>
                    <p className="text-gray-600">Nous vous recontacterons dans les plus brefs délais.</p>
                  </motion.div>
                ) : (
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
                        <label className="block text-gray-700 font-semibold mb-2">Téléphone *</label>
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
                      <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 focus:border-orange-500 focus:outline-none transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Type de service</label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 focus:border-orange-500 focus:outline-none transition-all"
                        >
                          <option value="">Sélectionnez un service</option>
                          {serviceTypes.map((service) => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Créneau préféré</label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 focus:border-orange-500 focus:outline-none transition-all"
                        >
                          <option value="">Sélectionnez un créneau</option>
                          <option value="morning">Matin (8h-12h)</option>
                          <option value="afternoon">Après-midi (12h-18h)</option>
                          <option value="evening">Soirée (18h-22h)</option>
                          <option value="urgent">Urgence immédiate</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Sujet</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Objet de votre demande"
                        className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 focus:border-orange-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Décrivez votre demande en détail..."
                        className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 focus:border-orange-500 focus:outline-none transition-all resize-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Envoyer le message</span>
                    </button>
                  </form>
                )}
              </GlassCard>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Map */}
              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 text-orange-500 mr-2" />
                  Zone d'intervention
                </h3>
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.94722687195!2d2.277020999999999!3d48.8588897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sfr!4v1635789012345!5m2!1sen!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
              </GlassCard>

              {/* Emergency Contact */}
              <GlassCard className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Urgence 24h/24</h3>
                <p className="text-gray-600 mb-6">
                  Pour toute urgence, appelez-nous directement. Intervention garantie en moins de 30 minutes.
                </p>
                <a
                  href="tel:+33123456789"
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-block"
                >
                  01 23 45 67 89
                </a>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Questions <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">fréquentes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Retrouvez les réponses aux questions les plus courantes
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <GlassCard className="p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-start">
                    <Star className="w-6 h-6 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed ml-9">
                    {item.answer}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;