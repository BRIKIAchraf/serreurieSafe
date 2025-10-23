import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchInput, setIsTouchInput] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    };

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

  useEffect(() => {
    if (typeof window === "undefined" || isTouchInput) {
      return;
    }

    const updateMousePosition = (event: PointerEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const updateHoverState = (event: PointerEvent) => {
      const baseTarget =
        event.type === "pointerout"
          ? ((event.relatedTarget as Element | null) ?? null)
          : ((event.target as Element | null) ?? null);

      const target = baseTarget;
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

  if (isTouchInput) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-6 w-6 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="h-full w-full rounded-full bg-orange-500 opacity-80" />
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-2 w-2"
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
    </>
  );
};

export default CustomCursor;
