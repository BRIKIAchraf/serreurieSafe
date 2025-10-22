import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoAssembly: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [isAssembling, setIsAssembling] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAssembling(false);
      onComplete?.();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const pieces = [
    { id: 'shield', delay: 0, x: -100, y: -50 },
    { id: 'letter-s', delay: 0.5, x: 100, y: -50 },
    { id: 'text', delay: 1, x: 0, y: 100 },
    { id: 'tagline', delay: 1.5, x: 0, y: 150 },
  ];

  return (
    <AnimatePresence>
      {isAssembling && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            {/* Particules d'assemblage */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-400 rounded-full"
                style={{
                  left: `${Math.random() * 400}px`,
                  top: `${Math.random() * 300}px`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, (Math.random() - 0.5) * 100],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Pièces du logo qui s'assemblent */}
            <div className="relative w-96 h-64">
              {pieces.map((piece) => (
                <motion.div
                  key={piece.id}
                  className="absolute"
                  initial={{ x: piece.x, y: piece.y, opacity: 0, rotate: 180 }}
                  animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    delay: piece.delay,
                    duration: 1.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  {piece.id === 'shield' && (
                    <div className="w-16 h-20 bg-gradient-to-b from-orange-500 to-red-600 rounded-t-full rounded-b-lg flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">S</span>
                    </div>
                  )}
                  {piece.id === 'letter-s' && (
                    <div className="ml-20 mt-2">
                      <span className="text-4xl font-bold text-white">ERRURE</span>
                    </div>
                  )}
                  {piece.id === 'text' && (
                    <div className="ml-20 mt-8">
                      <span className="text-4xl font-bold text-orange-500">SAFE</span>
                    </div>
                  )}
                  {piece.id === 'tagline' && (
                    <div className="ml-20 mt-12">
                      <span className="text-sm text-gray-400 tracking-wider">LE RÉFLEXE SÉCURITÉ</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Effet de soudure */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-50 blur-sm"></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoAssembly;