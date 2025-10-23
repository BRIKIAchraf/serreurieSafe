import React from "react";
import AnimatedCanvas from "./AnimatedCanvas";

interface SectionDividerProps {
  variant?: "locksmith" | "blueprint";
  flip?: boolean;
  height?: number;
  color?: string;
  intensity?: number;
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = "locksmith",
  flip = false,
  height = 160,
  color = variant === "locksmith" ? "#2563eb" : "#1e293b",
  intensity = 0.8,
  className = "",
}) => {
  const gradientClass = flip
    ? "bg-gradient-to-t from-white via-white/60 to-transparent dark:from-slate-900 dark:via-slate-900/60"
    : "bg-gradient-to-b from-white via-white/60 to-transparent dark:from-slate-900 dark:via-slate-900/60";

  const canvasType = variant === "locksmith" ? "locksmith" : "blueprint";

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <AnimatedCanvas
        type={canvasType}
        color={color}
        intensity={intensity}
        className={flip ? "scale-y-[-1]" : ""}
      />
      <div className={`absolute inset-0 pointer-events-none ${gradientClass}`} />
    </div>
  );
};

export default SectionDivider;
