import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  ArrowRight,
  X,
  Clock,
  Shield,
  Star,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import MagneticButton from "./MagneticButton";

interface NavigationGuideProps {
  isVisible: boolean;
  onClose: () => void;
  currentStep?: number;
  onNextStep?: () => void;
}

const NavigationGuide: React.FC<NavigationGuideProps> = ({
  isVisible,
  onClose,
  currentStep = 0,
  onNextStep,
}) => {
  const [step, setStep] = useState(currentStep);
  const [isExpanded, setIsExpanded] = useState(false);

  const guideSteps = [
    {
      id: 0,
      title: "Bienvenue sur Serrure Safe",
      subtitle: "Votre expert en sécurité à Paris",
      content:
        "Découvrez nos services professionnels de serrurerie et dépannage 24h/24",
      icon: Shield,
      color: "bg-blue-500",
      action: "Découvrir nos services",
      actionPath: "/services",
    },
    {
      id: 1,
      title: "Services d'urgence",
      subtitle: "Intervention rapide garantie",
      content:
        "Porte claquée, serrure bloquée ? Nous intervenons en moins de 30 minutes",
      icon: Clock,
      color: "bg-red-500",
      action: "Appeler maintenant",
      actionType: "call",
    },
    {
      id: 2,
      title: "Nos spécialités",
      subtitle: "Solutions sur mesure",
      content:
        "Serrurerie, portes blindées, rideaux métalliques, vidéosurveillance...",
      icon: Star,
      color: "bg-orange-500",
      action: "Voir tous les services",
      actionPath: "/services",
    },
    {
      id: 3,
      title: "Contactez-nous",
      subtitle: "Devis gratuit et conseil",
      content: "Obtenez un devis personnalisé pour vos besoins de sécurité",
      icon: MessageCircle,
      color: "bg-green-500",
      action: "Demander un devis",
      actionPath: "/contact",
    },
  ];

  const currentGuide = guideSteps[step];

  const handleNext = () => {
    if (step < guideSteps.length - 1) {
      setStep(step + 1);
      onNextStep?.();
    } else {
      onClose();
    }
  };

  const handleAction = () => {
    if (currentGuide.actionType === "call") {
      window.location.href = "tel:+33123456789";
    } else if (currentGuide.actionPath) {
      window.location.href = currentGuide.actionPath;
    }
  };

  const progressPercentage = ((step + 1) / guideSteps.length) * 100;

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <currentGuide.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{currentGuide.title}</h3>
                  <p className="text-blue-100 text-sm">
                    {currentGuide.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="bg-white rounded-full h-2"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span>
                Étape {step + 1} sur {guideSteps.length}
              </span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <div
                className={`w-16 h-16 ${currentGuide.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <currentGuide.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-600 leading-relaxed">
                {currentGuide.content}
              </p>
            </div>

            {/* Action Button */}
            <div className="space-y-4">
              {currentGuide.actionType === "call" ? (
                <MagneticButton
                  href="tel:+33123456789"
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>{currentGuide.action}</span>
                </MagneticButton>
              ) : (
                <button
                  onClick={handleAction}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>{currentGuide.action}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              {/* Navigation */}
              <div className="flex space-x-3">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Précédent
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>
                    {step === guideSteps.length - 1 ? "Terminer" : "Suivant"}
                  </span>
                  {step < guideSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="font-medium">Actions rapides</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-2"
                  >
                    <MagneticButton
                      href="tel:+33123456789"
                      className="w-full flex items-center space-x-3 p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Urgence 24h/24</span>
                    </MagneticButton>
                    <a
                      href="/services"
                      className="w-full flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Nos Services</span>
                    </a>
                    <a
                      href="/contact"
                      className="w-full flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Contact</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NavigationGuide;
