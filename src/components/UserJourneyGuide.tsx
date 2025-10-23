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
  CheckCircle,
  Clock,
  Shield,
  Users,
  Zap,
  MessageCircle,
  X,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import MagneticButton from "./MagneticButton";

interface UserJourneyGuideProps {
  onComplete?: () => void;
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
  actionHref: string;
  actionType?: "call";
  position: CSSProperties;
}

const GUIDE_STORAGE_KEY = "serrure-safe-virtual-guide-completed";
const TRIGGER_EVENT_NAME = "showUserGuide";

const journeySteps: JourneyStep[] = [
  {
    id: 0,
    title: "Services essentiels",
    description:
      "Decouvrez nos interventions les plus demandees et choisissez la bonne solution.",
    icon: Shield,
    color: "bg-orange-500",
    actionLabel: "Voir les services",
    actionHref: "/services",
    position: { top: "18%", left: "12%" },
  },
  {
    id: 1,
    title: "Avis et garanties",
    description:
      "Rassurez-vous avec les retours clients et nos engagements qualite.",
    icon: Users,
    color: "bg-blue-500",
    actionLabel: "Espace clients",
    actionHref: "/client-area",
    position: { top: "20%", right: "12%" },
  },
  {
    id: 2,
    title: "Devis express",
    description:
      "Obtenez une estimation personnalisee en moins de deux minutes.",
    icon: MessageCircle,
    color: "bg-green-500",
    actionLabel: "Demander un devis",
    actionHref: "/contact",
    position: { bottom: "26%", left: "16%" },
  },
  {
    id: 3,
    title: "Appel immediat",
    description:
      "Parlez directement a un serrurier disponible 24h/24 pour lancer l'intervention.",
    icon: Phone,
    color: "bg-red-500",
    actionLabel: "Appeler le 01 23 45 67 89",
    actionHref: "tel:+33123456789",
    actionType: "call",
    position: { bottom: "18%", right: "14%" },
  },
];

const UserJourneyGuide: React.FC<UserJourneyGuideProps> = ({
  onComplete,
  autoStart = true,
  delay = 2000,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showLauncher, setShowLauncher] = useState(() => !autoStart);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const progress = useMemo(
    () => ((currentStep + 1) / journeySteps.length) * 100,
    [currentStep]
  );

  const markGuideAsSeen = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(GUIDE_STORAGE_KEY, "true");
    }
    setHasCompleted(true);
  }, []);

  const openGuide = useCallback(() => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsActive(true);
    setShowLauncher(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(max-width: 768px)");
    const handleChange = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    handleChange(media);
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleChange);
    } else {
      media.addListener(handleChange as any);
    }

    return () => {
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", handleChange);
      } else {
        media.removeListener(handleChange as any);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const completed =
      window.localStorage.getItem(GUIDE_STORAGE_KEY) === "true";
    setHasCompleted(completed);

    if (autoStart && !completed) {
      setShowLauncher(false);
      const timer = window.setTimeout(() => {
        openGuide();
      }, delay);
      return () => window.clearTimeout(timer);
    }

    setShowLauncher(true);
  }, [autoStart, delay, openGuide]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleShowGuide = () => {
      openGuide();
    };

    (window as any).addEventListener(TRIGGER_EVENT_NAME, handleShowGuide);
    return () => {
      (window as any).removeEventListener(TRIGGER_EVENT_NAME, handleShowGuide);
    };
  }, [openGuide]);

  const handleComplete = useCallback(() => {
    setIsActive(false);
    setShowLauncher(true);
    setCurrentStep(0);
    setCompletedSteps([]);
    markGuideAsSeen();
    onComplete?.();
  }, [markGuideAsSeen, onComplete]);

  const handleSkip = useCallback(() => {
    setIsActive(false);
    setShowLauncher(true);
    setCurrentStep(0);
    setCompletedSteps([]);
    markGuideAsSeen();
    onComplete?.();
  }, [markGuideAsSeen, onComplete]);

  const handleStepAction = useCallback(
    (step: JourneyStep, options: { skipNavigation?: boolean } = {}) => {
      setCompletedSteps((prev) =>
        prev.includes(step.id) ? prev : [...prev, step.id]
      );

      if (!options.skipNavigation && step.actionHref) {
        window.location.href = step.actionHref;
      }

      window.setTimeout(() => {
        setCurrentStep((prev) => {
          if (prev < journeySteps.length - 1) {
            return prev + 1;
          }
          handleComplete();
          return prev;
        });
      }, 700);
    },
    [handleComplete]
  );

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const renderStepCard = (step: JourneyStep, index: number) => (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: index <= currentStep ? 1 : 0.3,
        scale: index === currentStep ? 1.05 : 1,
      }}
      transition={{ delay: index * 0.15 }}
      className="absolute z-50"
      style={step.position}
    >
      <motion.div
        className="max-w-xs rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center space-x-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${step.color}`}
          >
            {completedSteps.includes(step.id) ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              step.id + 1
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">
              {step.title}
            </h3>
            <p className="text-xs text-gray-600">{step.description}</p>
          </div>
        </div>

        {step.actionType === "call" ? (
          <MagneticButton
            href={step.actionHref}
            onClick={() => handleStepAction(step, { skipNavigation: true })}
            className={`flex w-full items-center justify-center space-x-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg ${step.color}`}
          >
            <step.icon className="h-4 w-4" />
            <span>{step.actionLabel}</span>
          </MagneticButton>
        ) : (
          <button
            onClick={() => handleStepAction(step)}
            className={`flex w-full items-center justify-center space-x-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg ${step.color}`}
          >
            <step.icon className="h-4 w-4" />
            <span>{step.actionLabel}</span>
          </button>
        )}

        {index === currentStep && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
            className="mt-2 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          />
        )}
      </motion.div>
    </motion.div>
  );

  const currentStepData = journeySteps[currentStep];

  return (
    <>
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

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={handleSkip}
          >
            <button
              onClick={handleSkip}
              className="absolute right-6 top-6 z-50 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white"
              aria-label="Fermer le guide"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>

            {isMobile ? (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="absolute inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white p-6 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gray-200" />
                <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Etape {currentStep + 1} sur {journeySteps.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="mb-6 h-1 w-full rounded-full bg-gray-200">
                  <motion.div
                    className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <div className="mb-6 flex items-center space-x-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${currentStepData.color}`}
                  >
                    <currentStepData.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {currentStepData.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {currentStepData.description}
                    </p>
                  </div>
                </div>

                {currentStepData.actionType === "call" ? (
                  <MagneticButton
                    href={currentStepData.actionHref}
                    onClick={() =>
                      handleStepAction(currentStepData, { skipNavigation: true })
                    }
                    className={`flex w-full items-center justify-center space-x-2 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg ${currentStepData.color}`}
                  >
                    <currentStepData.icon className="h-5 w-5" />
                    <span>{currentStepData.actionLabel}</span>
                  </MagneticButton>
                ) : (
                  <button
                    onClick={() => handleStepAction(currentStepData)}
                    className={`flex w-full items-center justify-center space-x-2 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg ${currentStepData.color}`}
                  >
                    <currentStepData.icon className="h-5 w-5" />
                    <span>{currentStepData.actionLabel}</span>
                  </button>
                )}

                <div className="mt-6 flex items-center justify-between text-sm">
                  <button
                    onClick={goToPreviousStep}
                    disabled={currentStep === 0}
                    className="flex items-center space-x-1 rounded-lg px-3 py-2 text-gray-600 transition-colors disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Precedent</span>
                  </button>
                  <button
                    onClick={() => {
                      if (currentStep === journeySteps.length - 1) {
                        handleComplete();
                      } else {
                        setCurrentStep((prev) =>
                          Math.min(prev + 1, journeySteps.length - 1)
                        );
                      }
                    }}
                    className="flex items-center space-x-1 rounded-lg px-3 py-2 text-blue-600"
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
            ) : (
              <>
                {journeySteps.map((step, index) => renderStepCard(step, index))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="max-w-md rounded-2xl border border-gray-100 bg-white/95 p-6 text-center shadow-2xl backdrop-blur-sm">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <Zap className="h-8 w-8" />
                    </div>
                    <h2 className="mb-2 text-xl font-bold text-gray-900">
                      Guide virtuel Serrure Safe
                    </h2>
                    <p className="mb-4 text-gray-600">
                      Suivez ces 4 etapes pour parcourir les sections cles,
                      rassurer vos clients et terminer par un appel immediat
                      avec un expert.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>
                        Etape {currentStep + 1} sur {journeySteps.length}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute left-1/2 top-6 z-50 -translate-x-1/2">
                  <div className="rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      {journeySteps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-3 w-3 rounded-full transition-colors ${
                            index <= currentStep
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserJourneyGuide;
