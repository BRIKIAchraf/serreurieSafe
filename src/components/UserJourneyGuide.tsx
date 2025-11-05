import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Shield,
  Clock,
  HelpCircle,
  Pause,
  Play,
  Layers3,
  MapPin,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import MagneticButton from "./MagneticButton";
import Lock3DViewer from "./Lock3DViewer";
import VirtualBusinessCard from "./VirtualBusinessCard";

interface UserJourneyGuideProps {
  autoStart?: boolean;
  delay?: number;
}

type StepIcon = React.ComponentType<{ className?: string }>;

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  icon: StepIcon;
  color: string;
  actionLabel: string;
  actionHref?: string;
  actionType?: "call" | "component";
  component?: React.ReactNode;
  position: CSSProperties;
}

const GUIDE_STORAGE_KEY = "serrure-safe-virtual-guide-completed";

const journeySteps: JourneyStep[] = [
  {
    id: 0,
    title: "Services Serrurerie",
    description:
      "Découvrez nos interventions : ouverture, blindage, dépannage rapide et plus.",
    icon: Shield,
    color: "bg-orange-500",
    actionLabel: "Voir les Services",
    actionHref: "/services",
    position: { top: "20%", left: "12%" },
  },
  {
    id: 1,
    title: "Urgence 24h/24",
    description:
      "Accédez à notre service d’urgence en 15 minutes, 24h/24 et 7j/7.",
    icon: Clock,
    color: "bg-red-500",
    actionLabel: "Voir Urgence",
    actionHref: "/emergency",
    position: { top: "20%", right: "12%" },
  },
  {
    id: 2,
    title: "Vue 3D Serrurerie",
    description:
      "Explorez une démonstration interactive 3D de nos techniques de pose et sécurité.",
    icon: Layers3,
    color: "bg-blue-500",
    actionLabel: "Ouvrir la vue 3D",
    actionType: "component",
    component: <Lock3DViewer />,
    position: { bottom: "26%", left: "16%" },
  },
  {
    id: 3,
    title: "Carte de visite virtuelle",
    description:
      "Consultez notre carte digitale pour partager facilement nos coordonnées.",
    icon: MapPin,
    color: "bg-purple-500",
    actionLabel: "Voir la carte virtuelle",
    actionType: "component",
    component: <VirtualBusinessCard />,
    position: { bottom: "26%", right: "16%" },
  },
  {
    id: 4,
    title: "Contact & Appel direct",
    description:
      "Contactez un serrurier certifié A2P directement ou laissez un message.",
    icon: Phone,
    color: "bg-green-500",
    actionLabel: "Appeler le 01 85 09 73 65",
    actionHref: "tel:+33185097365",
    actionType: "call",
    position: { bottom: "18%", right: "14%" },
  },
];

const UserJourneyGuide: React.FC<UserJourneyGuideProps> = ({
  autoStart = true,
  delay = 2000,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showLauncher, setShowLauncher] = useState(!autoStart);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [showPopup, setShowPopup] = useState<React.ReactNode | null>(null);

  const progress = useMemo(
    () => ((currentStep + 1) / journeySteps.length) * 100,
    [currentStep]
  );

  const markGuideAsSeen = useCallback(() => {
    localStorage.setItem(GUIDE_STORAGE_KEY, "true");
    setHasCompleted(true);
  }, []);

  const openGuide = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
    setShowLauncher(false);
  }, []);

  const handleComplete = useCallback(() => {
    setIsActive(false);
    setShowLauncher(true);
    markGuideAsSeen();
  }, [markGuideAsSeen]);

  const handleSkip = useCallback(() => {
    handleComplete();
  }, [handleComplete]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  useEffect(() => {
    const completed = localStorage.getItem(GUIDE_STORAGE_KEY) === "true";
    setHasCompleted(completed);

    if (autoStart && !completed) {
      setShowLauncher(false);
      const timer = setTimeout(openGuide, delay);
      return () => clearTimeout(timer);
    }
  }, [autoStart, delay, openGuide]);

  useEffect(() => {
    if (!isActive || isPaused) return;
    const timer = setTimeout(() => {
      if (currentStep < journeySteps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleComplete();
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [isActive, currentStep, isPaused, handleComplete]);

  const currentStepData = journeySteps[currentStep];

  return (
    <>
      {/* === Bouton flottant du guide === */}
      {showLauncher && !isActive && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={openGuide}
          className="fixed bottom-32 right-6 z-40 flex items-center space-x-2 rounded-full border border-blue-100 bg-white/90 px-4 py-3 font-semibold text-blue-700 shadow-lg backdrop-blur-md transition-colors hover:bg-white"
        >
          <HelpCircle className="h-5 w-5" />
          <span>Guide virtuel</span>
          {!hasCompleted && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-500">
              Nouveau
            </span>
          )}
        </motion.button>
      )}

      {/* === Interface principale du guide === */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center"
            onClick={handleSkip}
          >
            <button
              onClick={handleSkip}
              className="absolute right-6 top-6 z-50 rounded-full bg-white/90 p-2 shadow-lg hover:bg-white"
              aria-label="Fermer le guide"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90%] max-w-lg md:max-w-xl max-w-[95vw] inset-x-4 rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Étape {currentStep + 1} / {journeySteps.length}
                </h3>
                <button
                  onClick={togglePause}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                  title={isPaused ? "Reprendre" : "Mettre en pause"}
                >
                  {isPaused ? (
                    <Play className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Pause className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>

              {/* === Contenu étape === */}
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${currentStepData.color}`}
                >
                  <currentStepData.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {currentStepData.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {currentStepData.description}
                  </p>
                </div>
              </div>

              {/* Barre de progression */}
              <div className="w-full h-1 bg-gray-200 rounded-full mb-4">
                <motion.div
                  className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* === Bouton d'action === */}
              {currentStepData.actionType === "component" ? (
                <button
                  onClick={() => setShowPopup(currentStepData.component!)}
                  className={`flex w-full items-center justify-center space-x-2 rounded-xl px-6 py-3 font-semibold text-white ${currentStepData.color}`}
                >
                  <currentStepData.icon className="h-5 w-5" />
                  <span>{currentStepData.actionLabel}</span>
                </button>
              ) : currentStepData.actionType === "call" ? (
                <MagneticButton
                  href={currentStepData.actionHref!}
                  className={`flex w-full items-center justify-center space-x-2 rounded-xl px-6 py-3 font-semibold text-white ${currentStepData.color}`}
                >
                  <currentStepData.icon className="h-5 w-5" />
                  <span>{currentStepData.actionLabel}</span>
                </MagneticButton>
              ) : (
                <button
                  onClick={() =>
                    (window.location.href = currentStepData.actionHref!)
                  }
                  className={`flex w-full items-center justify-center space-x-2 rounded-xl px-6 py-3 font-semibold text-white ${currentStepData.color}`}
                >
                  <currentStepData.icon className="h-5 w-5" />
                  <span>{currentStepData.actionLabel}</span>
                </button>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() =>
                    setCurrentStep((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={currentStep === 0}
                  className="flex items-center space-x-1 text-gray-600 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Précédent</span>
                </button>
                <button
                  onClick={() => {
                    if (currentStep === journeySteps.length - 1) {
                      handleComplete();
                    } else {
                      setCurrentStep((prev) => prev + 1);
                    }
                  }}
                  className="flex items-center space-x-1 text-blue-600 font-semibold"
                >
                  <span>
                    {currentStep === journeySteps.length - 1
                      ? "Terminer"
                      : "Suivant"}
                  </span>
                  {currentStep !== journeySteps.length - 1 && (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === POPUP pour Lock3DViewer ou CarteVisite === */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(null)}
          >
            <div
              className="relative w-[90vw] md:w-[70vw] lg:w-[60vw] max-h-[85vh] bg-white dark:bg-[#111] rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPopup(null)}
                className="absolute top-3 right-3 bg-[#E83E00] hover:bg-[#F45C23] text-white rounded-full p-2 shadow-md z-50"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="overflow-y-auto max-h-[85vh]">{showPopup}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserJourneyGuide;
