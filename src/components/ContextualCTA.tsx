import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
  CheckCircle,
  Zap,
  X,
} from "lucide-react";
import MagneticButton from "./MagneticButton";

interface ContextualCTAProps {
  serviceId?: string;
  serviceName?: string;
  price?: string;
  urgency?: boolean;
  position?: "bottom" | "sidebar" | "inline";
}

const ContextualCTA: React.FC<ContextualCTAProps> = ({
  serviceName = "Service",
  price = "Devis gratuit",
  urgency = false,
  position = "bottom",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const ctaContent = {
    title: urgency ? "🚨 Urgence ?" : `💬 Besoin de ${serviceName} ?`,
    subtitle: urgency
      ? "Intervention en moins de 30 minutes"
      : "Devis gratuit et conseil",
    description: urgency
      ? "Notre équipe d'experts est disponible 24h/24 pour tous vos besoins de serrurerie"
      : `Obtenez un devis personnalisé pour ${serviceName.toLowerCase()}`,
    action: urgency ? "Appeler maintenant" : "Demander un devis",
    actionType: urgency ? "call" : "contact",
    color: urgency
      ? "from-red-500 to-orange-500"
      : "from-blue-500 to-purple-500",
    bgColor: urgency ? "bg-red-500" : "bg-blue-500",
  };

  const handleAction = () => {
    if (ctaContent.actionType === "call") {
      window.location.href = "tel:+33123456789";
    } else {
      window.location.href = "/contact";
    }
  };

  const positionClasses = {
    bottom: "fixed bottom-6 left-6 right-6 max-w-md mx-auto",
    sidebar: "fixed right-6 top-1/2 transform -translate-y-1/2 max-w-sm",
    inline: "relative w-full",
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className={`z-50 ${positionClasses[position]}`}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div
            className={`bg-gradient-to-r ${ctaContent.color} p-4 text-white relative`}
          >
            {urgency && (
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute top-2 right-2"
              >
                <Zap className="w-4 h-4" />
              </motion.div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  {urgency ? (
                    <Phone className="w-5 h-5" />
                  ) : (
                    <MessageCircle className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{ctaContent.title}</h3>
                  <p className="text-sm opacity-90">{ctaContent.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-4">
              {ctaContent.description}
            </p>

            {/* Price Display */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tarif</span>
                <span className="font-bold text-lg text-gray-900">{price}</span>
              </div>
            </div>

            <div className="space-y-3">
              {ctaContent.actionType === "call" ? (
                <MagneticButton
                  href="tel:+33123456789"
                  className={`w-full ${ctaContent.bgColor} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  <Phone className="w-5 h-5" />
                  <span>{ctaContent.action}</span>
                </MagneticButton>
              ) : (
                <button
                  onClick={handleAction}
                  className={`w-full ${ctaContent.bgColor} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  <span>{ctaContent.action}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {/* Additional Actions */}
              <div className="grid grid-cols-2 gap-2">
                <MagneticButton
                  href="tel:+33123456789"
                  className="flex items-center space-x-2 p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Appeler</span>
                </MagneticButton>
                <a
                  href="/contact"
                  className="flex items-center space-x-2 p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact</span>
                </a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Disponible 24h/24</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Intervention rapide</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContextualCTA;
