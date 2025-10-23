import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Clock,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
} from "lucide-react";
import MagneticButton from "./MagneticButton";

interface SmartCTAProps {
  userBehavior?: "new" | "returning" | "engaged";
  currentPage?: string;
  timeOnPage?: number;
  scrollProgress?: number;
}

const SmartCTA: React.FC<SmartCTAProps> = ({
  userBehavior = "new",
  currentPage = "/",
  timeOnPage = 0,
  scrollProgress = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ctaType, setCtaType] = useState<
    "emergency" | "service" | "contact" | "guide"
  >("guide");

  useEffect(() => {
    // Determine CTA type based on user behavior and page
    let delay = 3000;
    let type: typeof ctaType = "guide";

    if (userBehavior === "new") {
      delay = 2000;
      type = "guide";
    } else if (userBehavior === "returning") {
      delay = 1500;
      type = "service";
    } else if (userBehavior === "engaged") {
      delay = 1000;
      type = "contact";
    }

    // Adjust based on current page
    if (currentPage === "/services") {
      type = "emergency";
      delay = 1000;
    } else if (currentPage === "/contact") {
      type = "emergency";
      delay = 2000;
    }

    // Adjust based on time on page
    if (timeOnPage > 30000) {
      // 30 seconds
      type = "emergency";
      delay = 0;
    }

    // Adjust based on scroll progress
    if (scrollProgress > 0.7) {
      type = "contact";
      delay = 0;
    }

    setCtaType(type);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [userBehavior, currentPage, timeOnPage, scrollProgress]);

  const ctaConfigs = {
    emergency: {
      title: "🚨 Urgence ?",
      subtitle: "Intervention en moins de 30 minutes",
      description:
        "Notre équipe d'experts est disponible 24h/24 pour tous vos besoins de serrurerie",
      icon: Phone,
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500",
      textColor: "text-white",
      action: "Appeler maintenant",
      actionType: "call",
      urgency: true,
    },
    service: {
      title: "🔧 Besoin d'un service ?",
      subtitle: "Découvrez nos solutions professionnelles",
      description:
        "Serrurerie, portes blindées, rideaux métalliques, vidéosurveillance...",
      icon: Shield,
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-500",
      textColor: "text-white",
      action: "Voir nos services",
      actionType: "link",
      actionPath: "/services",
    },
    contact: {
      title: "💬 Un devis gratuit ?",
      subtitle: "Conseil personnalisé et devis transparent",
      description: "Obtenez un devis gratuit pour vos besoins de sécurité",
      icon: MessageCircle,
      color: "from-green-500 to-teal-500",
      bgColor: "bg-green-500",
      textColor: "text-white",
      action: "Demander un devis",
      actionType: "link",
      actionPath: "/contact",
    },
    guide: {
      title: "👋 Bienvenue !",
      subtitle: "Découvrez nos services de sécurité",
      description:
        "Laissez-nous vous guider pour trouver la solution adaptée à vos besoins",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500",
      textColor: "text-white",
      action: "Commencer",
      actionType: "guide",
    },
  };

  const config = ctaConfigs[ctaType];

  const handleAction = () => {
    if (config.actionType === "call") {
      window.location.href = "tel:+33123456789";
    } else if (config.actionPath) {
      window.location.href = config.actionPath;
    } else if (config.actionType === "guide") {
      // Trigger user journey guide
      const event = new CustomEvent("showUserGuide");
      window.dispatchEvent(event);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 left-6 right-6 z-50 max-w-md mx-auto"
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div
            className={`bg-gradient-to-r ${config.color} p-4 text-white relative`}
          >
            {config.urgency && (
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute top-2 right-2"
              >
                <Zap className="w-4 h-4" />
              </motion.div>
            )}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <config.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{config.title}</h3>
                <p className="text-sm opacity-90">{config.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-4">{config.description}</p>

            <div className="space-y-3">
              {config.actionType === "call" ? (
                <MagneticButton
                  href="tel:+33123456789"
                  className={`w-full ${config.bgColor} ${config.textColor} px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  <Phone className="w-5 h-5" />
                  <span>{config.action}</span>
                </MagneticButton>
              ) : (
                <button
                  onClick={handleAction}
                  className={`w-full ${config.bgColor} ${config.textColor} px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  <span>{config.action}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {/* Additional Info */}
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

export default SmartCTA;
