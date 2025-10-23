import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSVGIconProps {
  type: 'lock' | 'key' | 'shield' | 'gear' | 'security';
  className?: string;
}

const AnimatedSVGIcon: React.FC<AnimatedSVGIconProps> = ({ type, className = '' }) => {
  const icons = {
    lock: (
      <svg viewBox="0 0 100 100" className={className}>
        <motion.rect
          x="25"
          y="45"
          width="50"
          height="40"
          rx="5"
          fill="currentColor"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M 35 45 V 35 Q 35 20 50 20 Q 65 20 65 35 V 45"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.circle
          cx="50"
          cy="65"
          r="5"
          fill="#fff"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        />
        <motion.rect
          x="48"
          y="65"
          width="4"
          height="10"
          fill="#fff"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
        />
      </svg>
    ),
    key: (
      <svg viewBox="0 0 100 100" className={className}>
        <motion.circle
          cx="75"
          cy="50"
          r="15"
          fill="currentColor"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        />
        <motion.rect
          x="20"
          y="47"
          width="45"
          height="6"
          fill="currentColor"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        <motion.rect
          x="35"
          y="40"
          width="4"
          height="7"
          fill="currentColor"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        />
        <motion.rect
          x="45"
          y="40"
          width="4"
          height="7"
          fill="currentColor"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
        />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 100 100" className={className}>
        <motion.path
          d="M 50 10 L 80 25 L 80 55 Q 80 75 50 90 Q 20 75 20 55 L 20 25 Z"
          fill="currentColor"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.path
          d="M 40 50 L 47 57 L 60 40"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
      </svg>
    ),
    gear: (
      <svg viewBox="0 0 100 100" className={className}>
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 50px" }}
        >
          <path
            d="M 50 20 L 55 35 L 70 30 L 65 45 L 80 50 L 65 55 L 70 70 L 55 65 L 50 80 L 45 65 L 30 70 L 35 55 L 20 50 L 35 45 L 30 30 L 45 35 Z"
            fill="currentColor"
          />
          <circle cx="50" cy="50" r="12" fill="#fff" />
        </motion.g>
      </svg>
    ),
    security: (
      <svg viewBox="0 0 100 100" className={className}>
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.path
          d="M 50 25 L 50 50 L 65 50"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.line
            key={i}
            x1="50"
            y1="15"
            x2="50"
            y2="20"
            stroke="currentColor"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            style={{ transformOrigin: "50px 50px" }}
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </svg>
    ),
  };

  return icons[type];
};

export default AnimatedSVGIcon;
