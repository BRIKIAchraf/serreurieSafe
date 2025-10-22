import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MorphingSVG: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);

  // Formes SVG pour le morphing
  const keyPath = "M50,20 L50,80 M30,20 Q20,20 20,30 Q20,40 30,40 L70,40 Q80,40 80,30 Q80,20 70,20 Z M50,60 L60,60 L60,65 L50,65 Z M50,70 L55,70 L55,75 L50,75 Z";
  const lockPath = "M30,40 L70,40 L70,80 L30,80 Z M40,30 Q40,20 50,20 Q60,20 60,30 L60,40 M45,55 L55,55 L55,65 L45,65 Z";

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    let isKey = true;
    const interval = setInterval(() => {
      path.style.transition = 'all 2s ease-in-out';
      path.setAttribute('d', isKey ? lockPath : keyPath);
      isKey = !isKey;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <path
          ref={pathRef}
          d={keyPath}
          fill="none"
          stroke="url(#morphGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default MorphingSVG;