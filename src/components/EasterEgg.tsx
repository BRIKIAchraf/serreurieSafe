import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Sparkles, Gift } from 'lucide-react';

const EasterEgg: React.FC = () => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [showReward, setShowReward] = useState(false);

  // Séquence secrète : "SERRURE"
  const secretSequence = ['s', 'e', 'r', 'r', 'u', 'r', 'e'];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      
      setKeySequence(prev => {
        const newSequence = [...prev, key].slice(-secretSequence.length);
        
        // Vérifier si la séquence correspond
        if (newSequence.length === secretSequence.length) {
          const matches = newSequence.every((k, i) => k === secretSequence[i]);
          if (matches && !isTriggered) {
            setIsTriggered(true);
            setShowReward(true);
            
            // Créer des particules dorées
            createGoldenParticles();
            
            // Jouer un son de réussite
            playSuccessSound();
            
            // Masquer après 5 secondes
            setTimeout(() => setShowReward(false), 5000);
          }
        }
        
        return newSequence;
      });
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isTriggered]);

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
    }

    setTimeout(() => {
      document.body.removeChild(particles);
    }, 3000);
  };

  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Mélodie de succès
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Do, Mi, Sol, Do
      
      notes.forEach((frequency, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        }, index * 150);
      });
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  return (
    <AnimatePresence>
      {showReward && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -100 }}
          className="fixed bottom-20 right-6 z-50"
        >
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6 rounded-2xl shadow-2xl text-white max-w-sm">
            <div className="flex items-center space-x-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Key className="w-8 h-8" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Easter Egg Trouvé !
                </h3>
                <p className="text-sm opacity-90">Vous avez découvert le secret !</p>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Gift className="w-5 h-5" />
                <span className="font-semibold">Récompense débloquée :</span>
              </div>
              <p className="text-sm">
                🎉 <strong>Réduction de 10%</strong> sur votre prochaine intervention !
              </p>
              <p className="text-xs mt-2 opacity-80">
                Code promo : <strong>SERRURE2024</strong>
              </p>
            </div>
            
            <div className="text-center">
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full text-sm"
                animate={{ 
                  boxShadow: [
                    '0 0 0 0 rgba(255, 255, 255, 0.4)',
                    '0 0 0 10px rgba(255, 255, 255, 0)',
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span>Félicitations ! 🔑✨</span>
              </motion.div>
            </div>
          </div>
          
          {/* Particules flottantes */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [-20, -60, -20],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;