import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Shield, Key, Home, Building } from 'lucide-react';

interface ConfigOption {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

const LockConfigurator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    usage: '',
    security: '',
    type: '',
    features: [] as string[],
  });

  const usageOptions: ConfigOption[] = [
    { id: 'home', name: 'Domicile', price: 0, description: 'Appartement ou maison individuelle' },
    { id: 'business', name: 'Entreprise', price: 50, description: 'Bureau, commerce, local professionnel' },
    { id: 'building', name: 'Immeuble', price: 30, description: 'Parties communes, hall d\'entrée' },
  ];

  const securityOptions: ConfigOption[] = [
    { id: 'basic', name: 'Standard', price: 0, description: 'Protection de base, usage quotidien' },
    { id: 'high', name: 'Haute sécurité', price: 200, description: 'Certification A2P, résistance renforcée' },
    { id: 'premium', name: 'Premium', price: 400, description: 'Sécurité maximale, zones sensibles' },
  ];

  const typeOptions: ConfigOption[] = [
    { id: 'cylinder', name: 'Cylindre européen', price: 80, description: 'Standard, facile à remplacer' },
    { id: 'multipoint', name: 'Multipoints', price: 250, description: '3 à 7 points d\'ancrage' },
    { id: 'smart', name: 'Connectée', price: 350, description: 'Contrôle smartphone, codes' },
    { id: 'biometric', name: 'Biométrique', price: 500, description: 'Empreinte digitale, reconnaissance' },
  ];

  const featureOptions: ConfigOption[] = [
    { id: 'emergency', name: 'Ouverture d\'urgence', price: 50, description: 'Système de déblocage d\'urgence' },
    { id: 'alarm', name: 'Alarme intégrée', price: 100, description: 'Alerte en cas de tentative d\'effraction' },
    { id: 'remote', name: 'Contrôle à distance', price: 80, description: 'Ouverture/fermeture à distance' },
    { id: 'backup', name: 'Alimentation de secours', price: 60, description: 'Batterie de secours intégrée' },
  ];

  const calculateTotal = () => {
    let total = 0;
    
    const usage = usageOptions.find(o => o.id === config.usage);
    const security = securityOptions.find(o => o.id === config.security);
    const type = typeOptions.find(o => o.id === config.type);
    
    if (usage) total += usage.price;
    if (security) total += security.price;
    if (type) total += type.price;
    
    config.features.forEach(featureId => {
      const feature = featureOptions.find(f => f.id === featureId);
      if (feature) total += feature.price;
    });
    
    return total + 150; // Prix de base installation
  };

  const toggleFeature = (featureId: string) => {
    setConfig(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const getStepIcon = (stepNum: number) => {
    switch (stepNum) {
      case 1: return <Home className="w-5 h-5" />;
      case 2: return <Shield className="w-5 h-5" />;
      case 3: return <Key className="w-5 h-5" />;
      case 4: return <Settings className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <>
      {/* Bouton configurateur */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Interface du configurateur */}
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
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                  <Settings className="w-8 h-8 mr-3 text-blue-500" />
                  Configurateur de Serrure
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Indicateur d'étapes */}
              <div className="flex items-center justify-center mb-8">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step >= num
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {getStepIcon(num)}
                    </div>
                    {num < 4 && (
                      <div
                        className={`w-16 h-1 mx-2 ${
                          step > num ? 'bg-blue-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Contenu des étapes */}
              <div className="min-h-96">
                {/* Étape 1: Usage */}
                {step === 1 && (
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-semibold mb-6">Type d'usage</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {usageOptions.map((option) => (
                        <motion.button
                          key={option.id}
                          onClick={() => setConfig(prev => ({ ...prev, usage: option.id }))}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            config.usage === option.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-2xl mb-3">
                            {option.id === 'home' && '🏠'}
                            {option.id === 'business' && '🏢'}
                            {option.id === 'building' && '🏬'}
                          </div>
                          <h4 className="font-semibold text-lg mb-2">{option.name}</h4>
                          <p className="text-gray-600 text-sm">{option.description}</p>
                          {option.price > 0 && (
                            <p className="text-blue-500 font-semibold mt-2">+{option.price}€</p>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Étape 2: Niveau de sécurité */}
                {step === 2 && (
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-semibold mb-6">Niveau de sécurité</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {securityOptions.map((option) => (
                        <motion.button
                          key={option.id}
                          onClick={() => setConfig(prev => ({ ...prev, security: option.id }))}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            config.security === option.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-2xl mb-3">
                            {option.id === 'basic' && '🔒'}
                            {option.id === 'high' && '🛡️'}
                            {option.id === 'premium' && '🔐'}
                          </div>
                          <h4 className="font-semibold text-lg mb-2">{option.name}</h4>
                          <p className="text-gray-600 text-sm">{option.description}</p>
                          {option.price > 0 && (
                            <p className="text-blue-500 font-semibold mt-2">+{option.price}€</p>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Étape 3: Type de serrure */}
                {step === 3 && (
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-semibold mb-6">Type de serrure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {typeOptions.map((option) => (
                        <motion.button
                          key={option.id}
                          onClick={() => setConfig(prev => ({ ...prev, type: option.id }))}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            config.type === option.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-2xl mb-3">
                            {option.id === 'cylinder' && '🔑'}
                            {option.id === 'multipoint' && '🔐'}
                            {option.id === 'smart' && '📱'}
                            {option.id === 'biometric' && '👆'}
                          </div>
                          <h4 className="font-semibold text-lg mb-2">{option.name}</h4>
                          <p className="text-gray-600 text-sm">{option.description}</p>
                          <p className="text-blue-500 font-semibold mt-2">+{option.price}€</p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Étape 4: Options et récapitulatif */}
                {step === 4 && (
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-semibold mb-6">Options supplémentaires</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {featureOptions.map((option) => (
                        <motion.button
                          key={option.id}
                          onClick={() => toggleFeature(option.id)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            config.features.includes(option.id)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{option.name}</h4>
                            <span className="text-blue-500 font-semibold">+{option.price}€</span>
                          </div>
                          <p className="text-gray-600 text-sm">{option.description}</p>
                        </motion.button>
                      ))}
                    </div>

                    {/* Récapitulatif */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="text-xl font-semibold mb-4">Récapitulatif de votre configuration</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Installation de base:</span>
                          <span>150€</span>
                        </div>
                        {config.usage && (
                          <div className="flex justify-between">
                            <span>Usage {usageOptions.find(o => o.id === config.usage)?.name}:</span>
                            <span>+{usageOptions.find(o => o.id === config.usage)?.price}€</span>
                          </div>
                        )}
                        {config.security && (
                          <div className="flex justify-between">
                            <span>Sécurité {securityOptions.find(o => o.id === config.security)?.name}:</span>
                            <span>+{securityOptions.find(o => o.id === config.security)?.price}€</span>
                          </div>
                        )}
                        {config.type && (
                          <div className="flex justify-between">
                            <span>Type {typeOptions.find(o => o.id === config.type)?.name}:</span>
                            <span>+{typeOptions.find(o => o.id === config.type)?.price}€</span>
                          </div>
                        )}
                        {config.features.map(featureId => {
                          const feature = featureOptions.find(f => f.id === featureId);
                          return feature ? (
                            <div key={featureId} className="flex justify-between">
                              <span>Option {feature.name}:</span>
                              <span>+{feature.price}€</span>
                            </div>
                          ) : null;
                        })}
                        <div className="border-t pt-2 mt-4">
                          <div className="flex justify-between text-xl font-bold text-blue-600">
                            <span>Total estimé:</span>
                            <span>{calculateTotal()}€ TTC</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Précédent
                  </button>
                )}
                {step < 4 ? (
                  <button
                    onClick={nextStep}
                    disabled={
                      (step === 1 && !config.usage) ||
                      (step === 2 && !config.security) ||
                      (step === 3 && !config.type)
                    }
                    className="ml-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      // Ici on pourrait envoyer la configuration ou rediriger vers le contact
                      alert(`Configuration sauvegardée ! Total: ${calculateTotal()}€`);
                      setIsOpen(false);
                    }}
                    className="ml-auto px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Demander un devis
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

export default LockConfigurator;