import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Shield, Key, Home, Building, Lock } from "lucide-react";

interface ConfigOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

const LockConfigurator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    usage: "",
    security: "",
    type: "",
    features: [] as string[],
  });

  // === Options ===
  const usageOptions: ConfigOption[] = [
    {
      id: "home",
      name: "Domicile",
      price: 0,
      description: "Appartement ou maison individuelle",
    },
    {
      id: "business",
      name: "Entreprise",
      price: 50,
      description: "Bureau, commerce, local professionnel",
    },
    {
      id: "building",
      name: "Immeuble",
      price: 30,
      description: "Parties communes, hall d'entrée",
    },
  ];

  const securityOptions: ConfigOption[] = [
    {
      id: "basic",
      name: "Standard",
      price: 0,
      description: "Protection de base, usage quotidien",
    },
    {
      id: "high",
      name: "Haute sécurité",
      price: 200,
      description: "Certification A2P, résistance renforcée",
    },
    {
      id: "premium",
      name: "Premium",
      price: 400,
      description: "Sécurité maximale, zones sensibles",
    },
  ];

  const typeOptions: ConfigOption[] = [
    {
      id: "cylinder",
      name: "Cylindre européen",
      price: 80,
      description: "Standard, facile à remplacer",
    },
    {
      id: "multipoint",
      name: "Multipoints",
      price: 250,
      description: "3 à 7 points d'ancrage",
    },
    {
      id: "smart",
      name: "Connectée Bluetooth",
      price: 350,
      description: "Contrôle smartphone et badges",
    },
    {
      id: "wifi",
      name: "Connectée Wi-Fi",
      price: 420,
      description: "Gestion à distance via application",
    },
    {
      id: "code",
      name: "Serrure à code",
      price: 300,
      description: "Ouverture sans clé, par code numérique",
    },
    {
      id: "invisible",
      name: "Serrure invisible",
      price: 550,
      description: "Aucun cylindre apparent, sécurité renforcée",
    },
    {
      id: "biometric",
      name: "Biométrique",
      price: 500,
      description: "Empreinte digitale ou reconnaissance",
    },
  ];

  const featureOptions: ConfigOption[] = [
    {
      id: "emergency",
      name: "Ouverture d'urgence",
      price: 50,
      description: "Système de déblocage d'urgence",
    },
    {
      id: "alarm",
      name: "Alarme intégrée",
      price: 100,
      description: "Alerte en cas de tentative d'effraction",
    },
    {
      id: "remote",
      name: "Contrôle à distance",
      price: 80,
      description: "Ouverture/fermeture à distance",
    },
    {
      id: "backup",
      name: "Alimentation de secours",
      price: 60,
      description: "Batterie intégrée de secours",
    },
  ];

  // === Fonctions ===
  const calculateTotal = () => {
    let total = 150; // installation de base
    const usage = usageOptions.find((o) => o.id === config.usage);
    const security = securityOptions.find((o) => o.id === config.security);
    const type = typeOptions.find((o) => o.id === config.type);

    if (usage) total += usage.price;
    if (security) total += security.price;
    if (type) total += type.price;

    config.features.forEach((featureId) => {
      const f = featureOptions.find((opt) => opt.id === featureId);
      if (f) total += f.price;
    });

    return total;
  };

  const toggleFeature = (featureId: string) => {
    setConfig((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((f) => f !== featureId)
        : [...prev.features, featureId],
    }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const getStepIcon = (n: number) => {
    switch (n) {
      case 1:
        return <Home className="w-5 h-5" />;
      case 2:
        return <Shield className="w-5 h-5" />;
      case 3:
        return <Key className="w-5 h-5" />;
      case 4:
        return <Settings className="w-5 h-5" />;
      default:
        return null;
    }
  };

  // === Interface ===
  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#E83E00] to-[#F45C23] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Fenêtre du configurateur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-5xl w-full max-h-[95vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-3xl font-bold flex items-center text-[#2B2B2B]">
                  <Settings className="w-6 sm:w-8 h-6 sm:h-8 mr-3 text-[#F45C23]" />
                  Configurateur Serrure Safe
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-[#E83E00]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Étapes */}
              <div className="flex items-center justify-center mb-6 sm:mb-8 flex-wrap">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center mb-2 sm:mb-0">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                        step >= num
                          ? "bg-gradient-to-r from-[#E83E00] to-[#F45C23] text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {getStepIcon(num)}
                    </div>
                    {num < 4 && (
                      <div
                        className={`w-10 sm:w-16 h-1 mx-2 ${
                          step > num
                            ? "bg-gradient-to-r from-[#E83E00] to-[#F45C23]"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Étapes de configuration */}
              <div className="min-h-[24rem]">
                {/* Étape 1 */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#2B2B2B]">
                      Type d’usage
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {usageOptions.map((o) => (
                        <motion.button
                          key={o.id}
                          onClick={() =>
                            setConfig((prev) => ({ ...prev, usage: o.id }))
                          }
                          className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left ${
                            config.usage === o.id
                              ? "border-[#E83E00] bg-[#FFF5F0]"
                              : "border-gray-200 hover:border-[#F45C23]"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-2xl mb-2">
                            {o.id === "home"
                              ? "🏠"
                              : o.id === "business"
                              ? "🏢"
                              : "🏬"}
                          </div>
                          <h4 className="font-semibold text-lg mb-1">
                            {o.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {o.description}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Étape 2 */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#2B2B2B]">
                      Niveau de sécurité
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {securityOptions.map((o) => (
                        <motion.button
                          key={o.id}
                          onClick={() =>
                            setConfig((prev) => ({ ...prev, security: o.id }))
                          }
                          className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left ${
                            config.security === o.id
                              ? "border-[#E83E00] bg-[#FFF5F0]"
                              : "border-gray-200 hover:border-[#F45C23]"
                          }`}
                        >
                          <div className="text-2xl mb-2">
                            {o.id === "basic"
                              ? "🔒"
                              : o.id === "high"
                              ? "🛡️"
                              : "🏰"}
                          </div>
                          <h4 className="font-semibold text-lg mb-1">
                            {o.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {o.description}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Étape 3 */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#2B2B2B]">
                      Type de serrure
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {typeOptions.map((o) => (
                        <motion.button
                          key={o.id}
                          onClick={() =>
                            setConfig((prev) => ({ ...prev, type: o.id }))
                          }
                          className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left ${
                            config.type === o.id
                              ? "border-[#E83E00] bg-[#FFF5F0]"
                              : "border-gray-200 hover:border-[#F45C23]"
                          }`}
                        >
                          <div className="text-2xl mb-2">
                            {o.id === "smart"
                              ? "📱"
                              : o.id === "biometric"
                              ? "👆"
                              : o.id === "wifi"
                              ? "📶"
                              : "🔑"}
                          </div>
                          <h4 className="font-semibold text-lg mb-1">
                            {o.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {o.description}
                          </p>
                          <p className="text-[#E83E00] font-semibold mt-2">
                            +{o.price} €
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Étape 4 */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#2B2B2B]">
                      Options supplémentaires
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {featureOptions.map((o) => (
                        <motion.button
                          key={o.id}
                          onClick={() => toggleFeature(o.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            config.features.includes(o.id)
                              ? "border-[#E83E00] bg-[#FFF5F0]"
                              : "border-gray-200 hover:border-[#F45C23]"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold">{o.name}</h4>
                            <span className="text-[#E83E00] font-semibold">
                              +{o.price} €
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {o.description}
                          </p>
                        </motion.button>
                      ))}
                    </div>

                    {/* Résumé */}
                    <div className="bg-[#F9F9F9] p-4 sm:p-6 rounded-xl">
                      <h4 className="text-lg sm:text-xl font-semibold mb-3">
                        Récapitulatif
                      </h4>
                      <div className="space-y-2 text-sm sm:text-base">
                        <div className="flex justify-between">
                          <span>Installation de base</span>
                          <span>150 €</span>
                        </div>
                        {config.usage && (
                          <div className="flex justify-between">
                            <span>
                              Usage :{" "}
                              {
                                usageOptions.find((o) => o.id === config.usage)
                                  ?.name
                              }
                            </span>
                            <span>
                              +
                              {
                                usageOptions.find((o) => o.id === config.usage)
                                  ?.price
                              }{" "}
                              €
                            </span>
                          </div>
                        )}
                        {config.security && (
                          <div className="flex justify-between">
                            <span>
                              Sécurité :{" "}
                              {
                                securityOptions.find(
                                  (o) => o.id === config.security
                                )?.name
                              }
                            </span>
                            <span>
                              +
                              {
                                securityOptions.find(
                                  (o) => o.id === config.security
                                )?.price
                              }{" "}
                              €
                            </span>
                          </div>
                        )}
                        {config.type && (
                          <div className="flex justify-between">
                            <span>
                              Type :{" "}
                              {
                                typeOptions.find((o) => o.id === config.type)
                                  ?.name
                              }
                            </span>
                            <span>
                              +
                              {
                                typeOptions.find((o) => o.id === config.type)
                                  ?.price
                              }{" "}
                              €
                            </span>
                          </div>
                        )}
                        {config.features.map((fId) => {
                          const f = featureOptions.find(
                            (opt) => opt.id === fId
                          );
                          return (
                            <div key={fId} className="flex justify-between">
                              <span>Option : {f?.name}</span>
                              <span>+{f?.price} €</span>
                            </div>
                          );
                        })}
                        <div className="border-t border-gray-300 pt-3 mt-3">
                          <div className="flex justify-between text-lg sm:text-xl font-bold text-[#E83E00]">
                            <span>Total estimé :</span>
                            <span>{calculateTotal()} € TTC</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6 sm:mt-8">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    ◀ Précédent
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
                    className="ml-auto px-5 py-2 bg-gradient-to-r from-[#E83E00] to-[#F45C23] text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
                  >
                    Suivant ▶
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      alert(
                        `Configuration enregistrée ! Total : ${calculateTotal()} €`
                      );
                      setIsOpen(false);
                    }}
                    className="ml-auto px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Demander un devis 📩
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
