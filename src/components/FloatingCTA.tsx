import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X, Clock, Shield } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface FloatingCTAProps {
  delay?: number;
  triggerScroll?: number;
  variant?: "emergency" | "service" | "contact";
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({
  delay = 3000,
  triggerScroll = 200,
  variant = "emergency",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    const handleScroll = () => {
      if (window.scrollY > triggerScroll && !hasInteracted) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [delay, triggerScroll, hasInteracted]);

  const ctaVariants = {
    emergency: {
      title: "Urgence ?",
      subtitle: "Appelez maintenant",
      description: "Intervention en moins de 30 minutes",
      icon: Phone,
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500",
      textColor: "text-white",
      action: "01 23 45 67 89",
      actionType: "call",
    },
    service: {
      title: "Besoin d'un service ?",
      subtitle: "Découvrez nos solutions",
      description: "Serrurerie, sécurité, dépannage",
      icon: Shield,
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-500",
      textColor: "text-white",
      action: "Voir nos services",
      actionType: "link",
      actionPath: "/services",
    },
    contact: {
      title: "Un devis ?",
      subtitle: "Contactez-nous",
      description: "Devis gratuit et conseil",
      icon: MessageCircle,
      color: "from-green-500 to-teal-500",
      bgColor: "bg-green-500",
      textColor: "text-white",
      action: "Demander un devis",
      actionType: "link",
      actionPath: "/contact",
    },
  };

  const cta = ctaVariants[variant];

  const handleAction = () => {
    setHasInteracted(true);
    if (cta.actionType === "call") {
      window.location.href = "tel:+33123456789";
    } else if (cta.actionPath) {
      window.location.href = cta.actionPath;
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setHasInteracted(true);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {!isMinimized ? (
          <motion.div
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-sm w-80 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${cta.color} p-4 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <cta.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{cta.title}</h3>
                    <p className="text-sm opacity-90">{cta.subtitle}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleMinimize}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4">{cta.description}</p>

              <div className="space-y-3">
                {cta.actionType === "call" ? (
                  <MagneticButton
                    href="tel:+33123456789"
                    className={`w-full ${cta.bgColor} ${cta.textColor} px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>{cta.action}</span>
                  </MagneticButton>
                ) : (
                  <button
                    onClick={handleAction}
                    className={`w-full ${cta.bgColor} ${cta.textColor} px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <span>{cta.action}</span>
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
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Disponible 24h/24</span>
                <span>•</span>
                <span>Intervention rapide</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            onClick={handleMinimize}
            className={`${cta.bgColor} ${cta.textColor} p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-200 hover:scale-110`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <cta.icon className="w-6 h-6" />
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingCTA;
