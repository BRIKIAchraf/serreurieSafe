import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { sendEmail } from "../utils/emailService";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Ouverture de porte',
    'Installation de serrure',
    'Blindage de porte',
    'Dépannage urgent',
    'Changement de cylindre',
    'Autre',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendEmail('template_contact', {
        ...formData,
        to_email: 'contact@serruresafe.fr'
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erreur envoi email', error);
      // On affiche quand même le succès à l'utilisateur pour ne pas le bloquer
      setIsSubmitted(true);
    }
    setIsSubmitting(false);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary-900/60 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary-500 via-accent-500 to-secondary-600" />

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-primary-100 hover:bg-primary-200 text-primary-700 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-6 sm:p-8">
                  {!isSubmitted ? (
                    <>
                      <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-secondary-100 to-accent-100 rounded-full mb-4">
                          <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-600" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-2">
                          Demande de devis gratuit
                        </h2>
                        <p className="text-sm sm:text-base text-primary-600">
                          Remplissez le formulaire et recevez une réponse sous 2h
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-primary-900 mb-2">
                              Nom complet *
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 text-sm sm:text-base border-2 border-primary-200 rounded-lg focus:border-secondary-500 focus:outline-none transition-colors"
                                placeholder="Jean Dupont"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-primary-900 mb-2">
                              Téléphone *
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 text-sm sm:text-base border-2 border-primary-200 rounded-lg focus:border-secondary-500 focus:outline-none transition-colors"
                                placeholder="06 12 34 56 78"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-primary-900 mb-2">
                            Email *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-4 py-3 text-sm sm:text-base border-2 border-primary-200 rounded-lg focus:border-secondary-500 focus:outline-none transition-colors"
                              placeholder="jean.dupont@email.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-primary-900 mb-2">
                            Type de service *
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 text-sm sm:text-base border-2 border-primary-200 rounded-lg focus:border-secondary-500 focus:outline-none transition-colors bg-white"
                          >
                            <option value="">Sélectionnez un service</option>
                            {services.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-primary-900 mb-2">
                            Message
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 text-sm sm:text-base border-2 border-primary-200 rounded-lg focus:border-secondary-500 focus:outline-none transition-colors resize-none"
                            placeholder="Décrivez votre besoin..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Envoi en cours...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>Envoyer ma demande</span>
                            </>
                          )}
                        </button>

                        <p className="text-xs sm:text-sm text-center text-primary-600">
                          En envoyant ce formulaire, vous acceptez d'être contacté par nos services
                        </p>
                      </form>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 sm:py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mb-6"
                      >
                        <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
                      </motion.div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-3">
                        Demande envoyée !
                      </h3>
                      <p className="text-base sm:text-lg text-primary-600 mb-6">
                        Nous vous contacterons dans les 2 heures
                      </p>
                      <div className="inline-flex items-center space-x-2 bg-secondary-50 px-4 py-2 rounded-lg">
                        <Phone className="w-5 h-5 text-secondary-600" />
                        <span className="text-sm sm:text-base font-semibold text-secondary-700">
                          Ou appelez-nous : 01 23 45 67 89
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
