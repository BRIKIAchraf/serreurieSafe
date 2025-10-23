import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  CheckCircle,
  Clock,
  Shield,
  MapPin,
  Zap,
  MessageCircle,
  X,
} from "lucide-react";
import MagneticButton from "./MagneticButton";

interface UserJourneyGuideProps {
  onComplete?: () => void;
  autoStart?: boolean;
  delay?: number;
}

const UserJourneyGuide: React.FC<UserJourneyGuideProps> = ({
  onComplete,
  autoStart = true,
  delay = 2000,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const journeySteps = [
    {
      id: 0,
      title: "Découvrez nos services",
      description: "Explorez nos solutions de serrurerie et sécurité",
      icon: Shield,
      color: "bg-blue-500",
      action: "Voir les services",
      actionPath: "/services",
      position: { top: "20%", left: "10%" },
    },
    {
      id: 1,
      title: "Urgence ? Appelez-nous",
      description: "Intervention rapide 24h/24",
      icon: Phone,
      color: "bg-red-500",
      action: "01 23 45 67 89",
      actionType: "call",
      position: { top: "30%", right: "15%" },
    },
    {
      id: 2,
      title: "Obtenez un devis",
      description: "Devis gratuit et conseil personnalisé",
      icon: MessageCircle,
      color: "bg-green-500",
      action: "Demander un devis",
      actionPath: "/contact",
      position: { bottom: "25%", left: "20%" },
    },
    {
      id: 3,
      title: "Zone d'intervention",
      description: "Paris et Île-de-France",
      icon: MapPin,
      color: "bg-purple-500",
      action: "Voir la zone",
      actionPath: "/contact",
      position: { bottom: "15%", right: "20%" },
    },
  ];

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        setIsActive(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [autoStart, delay]);

  const handleStepAction = (step: (typeof journeySteps)[0]) => {
    setCompletedSteps((prev) => [...prev, step.id]);

    if (step.actionType === "call") {
      window.location.href = "tel:+33123456789";
    } else if (step.actionPath) {
      window.location.href = step.actionPath;
    }

    // Auto-advance to next step
    setTimeout(() => {
      if (currentStep < journeySteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleComplete();
      }
    }, 1000);
  };

  const handleComplete = () => {
    setIsActive(false);
    onComplete?.();
  };

  const handleSkip = () => {
    setIsActive(false);
    onComplete?.();
  };

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={handleSkip}
      >
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Journey Steps */}
        {journeySteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: index <= currentStep ? 1 : 0.3,
              scale: index === currentStep ? 1.1 : 1,
            }}
            transition={{ delay: index * 0.2 }}
            className="absolute z-50"
            style={step.position}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-4 max-w-xs border-2 border-gray-100"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step Indicator */}
              <div className="flex items-center space-x-3 mb-3">
                <div
                  className={`w-8 h-8 ${step.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                >
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step.id + 1
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </div>
              </div>

              {/* Action Button */}
              {step.actionType === "call" ? (
                <MagneticButton
                  href="tel:+33123456789"
                  className={`w-full ${step.color} text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  <step.icon className="w-4 h-4" />
                  <span>{step.action}</span>
                </MagneticButton>
              ) : (
                <button
                  onClick={() => handleStepAction(step)}
                  className={`w-full ${step.color} text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  <step.icon className="w-4 h-4" />
                  <span>{step.action}</span>
                </button>
              )}

              {/* Progress Indicator */}
              {index === currentStep && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                  className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"
                />
              )}
            </motion.div>
          </motion.div>
        ))}

        {/* Central Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-100 text-center max-w-md">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Guide de navigation
            </h2>
            <p className="text-gray-600 mb-4">
              Suivez les étapes pour découvrir nos services et obtenir l'aide
              dont vous avez besoin
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>
                Étape {currentStep + 1} sur {journeySteps.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center space-x-2">
              {journeySteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index <= currentStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserJourneyGuide;
