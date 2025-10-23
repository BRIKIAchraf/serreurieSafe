import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Cog,
  Settings,
  Zap,
  Star,
  Sparkles,
  Heart,
  Award,
  Trophy,
  Gift,
  X,
  RotateCcw,
  Play,
  Pause,
} from "lucide-react";
import { useSounds } from "./SoundManager";

interface Gear {
  id: string;
  size: number;
  position: { x: number; y: number };
  rotation: number;
  speed: number;
  color: string;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const EasterEgg: React.FC = () => {
<<<<<<< HEAD
  const [isTriggered, setIsTriggered] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [cornerClicks, setCornerClicks] = useState(0);
=======
  const { t } = useTranslation();
  const { playUnlockSound, playKeySound } = useSounds();
  const [isActive, setIsActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gears, setGears] = useState<Gear[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
>>>>>>> f45891d (add new feature)

  const messages = [
    "🎉 Félicitations ! Vous avez trouvé l'easter egg !",
    "🔧 Les engrenages tournent pour votre sécurité !",
    "⭐ Merci d'être un client fidèle !",
    "🎁 Vous avez débloqué un bonus spécial !",
    "🏆 Champion de la découverte !",
    "💫 La magie opère dans les détails !",
  ];

  const gearColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
  ];

  const particleColors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#feca57",
    "#ff9ff3",
    "#54a0ff",
    "#5f27cd",
  ];

  useEffect(() => {
<<<<<<< HEAD
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      setKeySequence(prev => {
        const newSequence = [...prev, key].slice(-secretSequence.length);

        // Vérifier si la séquence correspond
        if (newSequence.length === secretSequence.length) {
          const matches = newSequence.every((k, i) => k === secretSequence[i]);
          if (matches && !isTriggered) {
            triggerEasterEgg();
          }
        }

        return newSequence;
      });
    };

    const handleClick = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Détecter les clics dans les coins (50px de marge)
      const isCorner = (x < 50 && y < 50) || // Coin supérieur gauche
                      (x > w - 50 && y < 50) || // Coin supérieur droit
                      (x < 50 && y > h - 50) || // Coin inférieur gauche
                      (x > w - 50 && y > h - 50); // Coin inférieur droit

      if (isCorner && !isTriggered) {
        setCornerClicks(prev => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            triggerEasterEgg();
            return 0;
          }
          return newCount;
        });
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
    };
  }, [isTriggered]);

  const triggerEasterEgg = () => {
    setIsTriggered(true);
    setShowReward(true);

    // Créer des particules dorées
    createGoldenParticles();

    // Jouer un son de réussite
    playSuccessSound();

    // Masquer après 5 secondes
    setTimeout(() => setShowReward(false), 5000);
  };

  const createGoldenParticles = () => {
    const particles = document.createElement('div');
    particles.className = 'fixed inset-0 pointer-events-none z-50';
    document.body.appendChild(particles);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 2 + 1) + 's';
      particles.appendChild(particle);
=======
    if (isActive) {
      initializeGears();
      startAnimation();
    }
  }, [isActive]);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
        setIsActive(false);
        setGears([]);
        setParticles([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const initializeGears = () => {
    const newGears: Gear[] = [];
    const gearCount = 8;

    for (let i = 0; i < gearCount; i++) {
      newGears.push({
        id: `gear-${i}`,
        size: Math.random() * 40 + 20,
        position: {
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        },
        rotation: Math.random() * 360,
        speed: (Math.random() - 0.5) * 4,
        color: gearColors[Math.floor(Math.random() * gearColors.length)],
      });
>>>>>>> f45891d (add new feature)
    }

    setGears(newGears);
  };

  const startAnimation = () => {
    setIsPlaying(true);
    setShowMessage(true);
    setMessage(messages[Math.floor(Math.random() * messages.length)]);

    // Create particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: `particle-${i}`,
        x: 50,
        y: 50,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1,
        color:
          particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }
    setParticles(newParticles);

    // Update gears rotation
    const interval = setInterval(() => {
      setGears((prev) =>
        prev.map((gear) => ({
          ...gear,
          rotation: gear.rotation + gear.speed,
        }))
      );

      // Update particles
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 0.02,
          }))
          .filter((particle) => particle.life > 0)
      );
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setIsPlaying(false);
    }, 3000);
  };

  const handleCornerClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickCount >= 4) {
      setIsActive(true);
      setShowAnimation(true);
      setClickCount(0);
      playUnlockSound();
    }
  };

  const resetEasterEgg = () => {
    setIsActive(false);
    setShowAnimation(false);
    setClickCount(0);
    setGears([]);
    setParticles([]);
    setShowMessage(false);
    setIsPlaying(false);
  };

  return (
    <>
      {/* Corner Click Areas */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {/* Top Left Corner */}
        <div
          className="absolute top-0 left-0 w-20 h-20 pointer-events-auto cursor-pointer"
          onClick={handleCornerClick}
        />

        {/* Top Right Corner */}
        <div
          className="absolute top-0 right-0 w-20 h-20 pointer-events-auto cursor-pointer"
          onClick={handleCornerClick}
        />

        {/* Bottom Left Corner */}
        <div
          className="absolute bottom-0 left-0 w-20 h-20 pointer-events-auto cursor-pointer"
          onClick={handleCornerClick}
        />

        {/* Bottom Right Corner */}
        <div
          className="absolute bottom-0 right-0 w-20 h-20 pointer-events-auto cursor-pointer"
          onClick={handleCornerClick}
        />
      </div>

      {/* Easter Egg Animation */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={resetEasterEgg}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={resetEasterEgg}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Cog className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Easter Egg Découvert !
                </h2>
                <p className="text-gray-600">
                  Vous avez trouvé notre animation secrète !
                </p>
              </div>

              {/* Animation Area */}
              <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mb-6 overflow-hidden">
                {/* Gears */}
                {gears.map((gear) => (
                  <motion.div
                    key={gear.id}
                    className="absolute"
                    style={{
                      left: `${gear.position.x}%`,
                      top: `${gear.position.y}%`,
                      width: gear.size,
                      height: gear.size,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{ rotate: gear.rotation }}
                    transition={{
                      duration: 0.1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Cog
                      className="w-full h-full"
                      style={{ color: gear.color }}
                    />
                  </motion.div>
                ))}

                {/* Particles */}
                {particles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: `${particle.x}%`,
                      top: `${particle.y}%`,
                      backgroundColor: particle.color,
                      opacity: particle.life,
                    }}
                    animate={{
                      scale: [1, 1.5, 0],
                      opacity: [1, 0.5, 0],
                    }}
                    transition={{ duration: 1 }}
                  />
                ))}

                {/* Center Logo */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              </div>

              {/* Message */}
              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-6"
                >
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    {message}
                  </p>
                  <div className="flex justify-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          delay: i * 0.1,
                          duration: 0.5,
                          repeat: Infinity,
                        }}
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                <motion.button
                  onClick={startAnimation}
                  disabled={isPlaying}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>{isPlaying ? "En cours..." : "Relancer"}</span>
                </motion.button>

                <motion.button
                  onClick={resetEasterEgg}
                  className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Fermer</span>
                </motion.button>
              </div>

              {/* Fun Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {gears.length}
                  </div>
                  <div className="text-sm text-gray-600">Engrenages</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {particles.length}
                  </div>
                  <div className="text-sm text-gray-600">Particules</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Magie</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Logo Animation */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed top-4 right-4 z-30"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <Cog className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default EasterEgg;
