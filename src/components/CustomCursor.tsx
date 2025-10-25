import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchInput, setIsTouchInput] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔹 Détecter si c’est un écran tactile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const updateTouchState = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsTouchInput(event.matches);
    };

    updateTouchState(coarsePointerQuery);
    if (typeof coarsePointerQuery.addEventListener === "function") {
      coarsePointerQuery.addEventListener("change", updateTouchState);
    } else {
      coarsePointerQuery.addListener(updateTouchState);
    }

    return () => {
      if (typeof coarsePointerQuery.removeEventListener === "function") {
        coarsePointerQuery.removeEventListener("change", updateTouchState);
      } else {
        coarsePointerQuery.removeListener(updateTouchState);
      }
    };
  }, []);

  // 🔹 Suivi du curseur
  useEffect(() => {
    if (isTouchInput) return;

    const updateMousePosition = (e: PointerEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: PointerEvent) => {
      const target =
        e.type === "pointerout"
          ? (e.relatedTarget as Element | null)
          : (e.target as Element | null);
      if (!target) {
        setIsHovering(false);
        return;
      }

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]'
      );
      setIsHovering(Boolean(interactive));
    };

    window.addEventListener("pointermove", updateMousePosition, {
      passive: true,
    });
    document.addEventListener("pointerover", updateHoverState);
    document.addEventListener("pointerout", updateHoverState);

    return () => {
      window.removeEventListener("pointermove", updateMousePosition);
      document.removeEventListener("pointerover", updateHoverState);
      document.removeEventListener("pointerout", updateHoverState);
    };
  }, [isTouchInput]);

  if (isTouchInput || !mounted) return null;

  // ✅ Curseur rendu via Portal — toujours au-dessus de tout le DOM
  return createPortal(
    <>
      {/* Curseur principal */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[2147483647] h-6 w-6 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="h-full w-full rounded-full bg-orange-500 opacity-80" />
      </motion.div>

      {/* Curseur secondaire */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[2147483646] h-2 w-2"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      >
        <div className="h-full w-full rounded-full bg-red-500 opacity-60" />
      </motion.div>
    </>,
    document.body // 👈 ici la magie : monte le curseur en dehors du root
  );
};

export default CustomCursor;
