import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Calculator, CheckCircle } from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface QuoteData {
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  urgency: string;
  description: string;
  estimatedPrice: number;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#ea580c',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
  },
});

const QuotePDF: React.FC<{ data: QuoteData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>DEVIS - SERRURE SAFE</Text>

      <View style={styles.section}>
        <Text style={styles.text}>Client: {data.name}</Text>
        <Text style={styles.text}>Email: {data.email}</Text>
        <Text style={styles.text}>Téléphone: {data.phone}</Text>
        <Text style={styles.text}>Adresse: {data.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Service demandé: {data.serviceType}</Text>
        <Text style={styles.text}>Urgence: {data.urgency}</Text>
        <Text style={styles.text}>Description: {data.description}</Text>
      </View>

      <Text style={styles.total}>
        Prix estimé: {data.estimatedPrice}€ TTC
      </Text>
    </Page>
  </Document>
);

const QuoteGenerator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    urgency: '',
    description: '',
    estimatedPrice: 0,
  });

  const serviceTypes = [
    { value: 'ouverture', label: 'Ouverture de porte', basePrice: 80 },
    { value: 'changement', label: 'Changement de serrure', basePrice: 150 },
    { value: 'blindage', label: 'Blindage de porte', basePrice: 800 },
    { value: 'depannage', label: 'Dépannage urgent', basePrice: 120 },
    { value: 'installation', label: 'Installation sécurité', basePrice: 200 },
  ];

  const urgencyLevels = [
    { value: 'normal', label: 'Normal (sous 48h)', multiplier: 1 },
    { value: 'urgent', label: 'Urgent (sous 4h)', multiplier: 1.5 },
    { value: 'immediat', label: 'Immédiat (sous 1h)', multiplier: 2 },
  ];

  const calculatePrice = () => {
    const service = serviceTypes.find(s => s.value === quoteData.serviceType);
    const urgency = urgencyLevels.find(u => u.value === quoteData.urgency);

    if (service && urgency) {
      const price = Math.round(service.basePrice * urgency.multiplier);
      setQuoteData(prev => ({ ...prev, estimatedPrice: price }));
    }
  };

  const handleInputChange = (field: keyof QuoteData, value: string) => {
    setQuoteData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      if (step === 2) calculatePrice();
    } else if (step === 3) {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    try {
      console.log("Envoi du devis:", quoteData);
      // await sendEmail('template_quote', quoteData);
      alert("Votre demande de devis a été envoyée. Vous allez recevoir une copie par email et nous vous contacterons rapidement.");
      setIsOpen(false);
      setStep(1);
    } catch (error) {
      alert("Erreur lors de l'envoi du devis. Veuillez nous contacter par téléphone.");
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Calculator className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-orange-500" />
                  Devis Express
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-8">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= num
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                      {step > num ? <CheckCircle className="w-4 h-4" /> : num}
                    </div>
                    {num < 3 && (
                      <div
                        className={`w-12 h-1 mx-2 ${step > num ? 'bg-orange-500' : 'bg-gray-200'
                          }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Personal Info */}
              {step === 1 && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
                  <input
                    type="text"
                    placeholder="Nom complet"
                    value={quoteData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={quoteData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={quoteData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Adresse d'intervention"
                    value={quoteData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                </motion.div>
              )}

              {/* Step 2: Service Details */}
              {step === 2 && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Détails du service</h3>
                  <select
                    value={quoteData.serviceType}
                    onChange={(e) => handleInputChange('serviceType', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  >
                    <option value="">Sélectionnez un service</option>
                    {serviceTypes.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label} (à partir de {service.basePrice}€)
                      </option>
                    ))}
                  </select>
                  <select
                    value={quoteData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  >
                    <option value="">Niveau d'urgence</option>
                    {urgencyLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Description détaillée de votre besoin"
                    value={quoteData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                  />
                </motion.div>
              )}

              {/* Step 3: Quote Summary */}
              {step === 3 && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Récapitulatif du devis</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="font-medium">
                        {serviceTypes.find(s => s.value === quoteData.serviceType)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Urgence:</span>
                      <span className="font-medium">
                        {urgencyLevels.find(u => u.value === quoteData.urgency)?.label}
                      </span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-xl font-bold text-orange-600">
                        <span>Prix estimé:</span>
                        <span>{quoteData.estimatedPrice}€ TTC</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <PDFDownloadLink
                      document={<QuotePDF data={quoteData} />}
                      fileName={`devis-serrure-safe-${Date.now()}.pdf`}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Télécharger le devis PDF</span>
                    </PDFDownloadLink>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Précédent
                  </button>
                )}
                {step < 3 && (
                  <button
                    onClick={nextStep}
                    disabled={
                      (step === 1 && (!quoteData.name || !quoteData.email || !quoteData.phone)) ||
                      (step === 2 && (!quoteData.serviceType || !quoteData.urgency))
                    }
                    className="ml-auto px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuoteGenerator;