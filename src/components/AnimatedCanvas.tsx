import React, { useEffect, useRef } from "react";

interface AnimatedCanvasProps {
  className?: string;
  type?:
    | "particles"
    | "waves"
    | "geometric"
    | "dots"
    | "locksmith"
    | "blueprint";
  color?: string;
  intensity?: number;
}

const hexToRgba = (hex: string, alpha: number) => {
  let stripped = hex.replace("#", "");
  if (stripped.length === 3) {
    stripped = stripped
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const intValue = parseInt(stripped, 16);
  const r = (intValue >> 16) & 255;
  const g = (intValue >> 8) & 255;
  const b = intValue & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const AnimatedCanvas: React.FC<AnimatedCanvasProps> = ({
  className = "",
  type = "particles",
  color = "#f97316",
  intensity = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount =
        Math.floor((canvas.width * canvas.height) / 10000) * intensity;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          life: Math.random() * 100 + 50,
        });
      }
    };

    const createWaves = () => {
      particles = [];
      const waveCount = 3;

      for (let i = 0; i < waveCount; i++) {
        particles.push({
          x: 0,
          y: (canvas.height / waveCount) * (i + 1),
          amplitude: 50 + Math.random() * 100,
          frequency: 0.01 + Math.random() * 0.02,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 0.5,
        });
      }
    };

    const createGeometric = () => {
      particles = [];
      const shapeCount = 5;

      for (let i = 0; i < shapeCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 20 + Math.random() * 40,
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          sides: 3 + Math.floor(Math.random() * 5),
          opacity: 0.1 + Math.random() * 0.2,
        });
      }
    };

    const createDots = () => {
      particles = [];
      const dotCount =
        Math.floor((canvas.width * canvas.height) / 5000) * intensity;

      for (let i = 0; i < dotCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const createLocksmith = () => {
      particles = [];
      const shapeCount = Math.max(
        12,
        Math.floor((canvas.width + canvas.height) / 70)
      );

      for (let i = 0; i < shapeCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          driftX: (Math.random() - 0.5) * 0.6,
          driftY: (Math.random() - 0.5) * 0.6,
          scale: 0.5 + Math.random() * 1.4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          offset: Math.random() * Math.PI * 2,
          type: Math.random() > 0.4 ? "lock" : "key",
          opacity: 0.12 + Math.random() * 0.18,
        });
      }
    };

    const createBlueprint = () => {
      particles = [];
      const nodeCount = Math.max(
        16,
        Math.floor((canvas.width * canvas.height) / 60000)
      );

      for (let i = 0; i < nodeCount; i++) {
        particles.push({
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          radius: 3 + Math.random() * 4,
          pulse: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.02,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      if (type === "particles") {
        particles.forEach((particle, index) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life--;

          if (
            particle.life <= 0 ||
            particle.x < 0 ||
            particle.x > canvas.width ||
            particle.y < 0 ||
            particle.y > canvas.height
          ) {
            particles[index] = {
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              vx: (Math.random() - 0.5) * 0.5,
              vy: (Math.random() - 0.5) * 0.5,
              size: Math.random() * 2 + 1,
              opacity: Math.random() * 0.5 + 0.2,
              life: Math.random() * 100 + 50,
            };
          }

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0")}`;
          ctx.fill();
        });
      } else if (type === "waves") {
        particles.forEach((wave) => {
          ctx.beginPath();
          ctx.strokeStyle = `${color}${Math.floor(0.1 * 255)
            .toString(16)
            .padStart(2, "0")}`;
          ctx.lineWidth = 2;

          for (let x = 0; x < canvas.width; x += 2) {
            const y =
              wave.y +
              Math.sin(x * wave.frequency + wave.phase + time * wave.speed) *
                wave.amplitude;
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        });
      } else if (type === "geometric") {
        particles.forEach((shape) => {
          shape.rotation += shape.rotationSpeed;

          ctx.save();
          ctx.translate(shape.x, shape.y);
          ctx.rotate(shape.rotation);
          ctx.globalAlpha = shape.opacity;
          ctx.fillStyle = color;

          ctx.beginPath();
          for (let i = 0; i < shape.sides; i++) {
            const angle = (i * 2 * Math.PI) / shape.sides;
            const x = Math.cos(angle) * shape.size;
            const y = Math.sin(angle) * shape.size;
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
      } else if (type === "dots") {
        particles.forEach((dot) => {
          dot.pulse += 0.05;
          const currentOpacity = dot.opacity + Math.sin(dot.pulse) * 0.1;

          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${Math.floor(currentOpacity * 255)
            .toString(16)
            .padStart(2, "0")}`;
          ctx.fill();
        });
      } else if (type === "locksmith") {
        particles.forEach((shape) => {
          shape.rotation += shape.rotationSpeed;
          const oscillationX = Math.sin(time + shape.offset) * 20 * shape.driftX;
          const oscillationY = Math.cos(time + shape.offset) * 15 * shape.driftY;

          ctx.save();
          ctx.translate(shape.x + oscillationX, shape.y + oscillationY);
          ctx.rotate(shape.rotation);
          ctx.globalAlpha = shape.opacity;
          ctx.lineWidth = 2 * shape.scale;
          ctx.strokeStyle = hexToRgba(color, 0.6);
          ctx.fillStyle = hexToRgba(color, 0.08);

          if (shape.type === "lock") {
            const bodyWidth = 36 * shape.scale;
            const bodyHeight = 44 * shape.scale;
            const shackleRadius = bodyWidth * 0.6;
            const radius = 6 * shape.scale;

            ctx.beginPath();
            ctx.arc(0, -bodyHeight / 2, shackleRadius / 2, Math.PI, 0);
            ctx.stroke();

            ctx.beginPath();
            const rectX = -bodyWidth / 2;
            const rectY = -bodyHeight / 2;
            ctx.moveTo(rectX + radius, rectY);
            ctx.lineTo(rectX + bodyWidth - radius, rectY);
            ctx.quadraticCurveTo(
              rectX + bodyWidth,
              rectY,
              rectX + bodyWidth,
              rectY + radius
            );
            ctx.lineTo(rectX + bodyWidth, rectY + bodyHeight - radius);
            ctx.quadraticCurveTo(
              rectX + bodyWidth,
              rectY + bodyHeight,
              rectX + bodyWidth - radius,
              rectY + bodyHeight
            );
            ctx.lineTo(rectX + radius, rectY + bodyHeight);
            ctx.quadraticCurveTo(
              rectX,
              rectY + bodyHeight,
              rectX,
              rectY + bodyHeight - radius
            );
            ctx.lineTo(rectX, rectY + radius);
            ctx.quadraticCurveTo(rectX, rectY, rectX + radius, rectY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, rectY + bodyHeight * 0.65, 4 * shape.scale, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, rectY + bodyHeight * 0.65);
            ctx.lineTo(0, rectY + bodyHeight * 0.9);
            ctx.stroke();
          } else {
            const shaftLength = 60 * shape.scale;
            const toothDepth = 10 * shape.scale;
            const headRadius = 12 * shape.scale;

            ctx.beginPath();
            ctx.arc(-shaftLength / 2, 0, headRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-shaftLength / 2 + headRadius, 0);
            ctx.lineTo(shaftLength / 2, 0);
            ctx.stroke();

            const toothCount = 4;
            for (let i = 0; i < toothCount; i++) {
              const toothX =
                (-shaftLength / 2 + headRadius + 8 * shape.scale) +
                i * 12 * shape.scale;
              ctx.beginPath();
              ctx.moveTo(toothX, 0);
              ctx.lineTo(toothX + 4 * shape.scale, toothDepth);
              ctx.lineTo(toothX + 8 * shape.scale, 0);
              ctx.stroke();
            }
          }

          ctx.restore();
        });
      } else if (type === "blueprint") {
        const spacing = 70;
        const offset = (time * 20) % spacing;

        ctx.strokeStyle = hexToRgba(color, 0.12);
        ctx.lineWidth = 1;
        for (let x = -spacing; x < canvas.width + spacing; x += spacing) {
          ctx.beginPath();
          ctx.moveTo(x + offset, 0);
          ctx.lineTo(x + offset, canvas.height);
          ctx.stroke();
        }
        for (let y = -spacing; y < canvas.height + spacing; y += spacing) {
          ctx.beginPath();
          ctx.moveTo(0, y + offset);
          ctx.lineTo(canvas.width, y + offset);
          ctx.stroke();
        }

        ctx.strokeStyle = hexToRgba(color, 0.08);
        ctx.setLineDash([8, 12]);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(0, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        particles.forEach((node) => {
          node.pulse += node.speed;
          const pulseRadius =
            node.radius + Math.sin(node.pulse + time) * node.radius * 0.4;

          ctx.beginPath();
          ctx.arc(node.baseX, node.baseY, pulseRadius, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(color, 0.15);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.baseX, node.baseY, pulseRadius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = hexToRgba(color, 0.08);
          ctx.stroke();
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const init = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeCanvas();

      switch (type) {
        case "particles":
          createParticles();
          break;
        case "waves":
          createWaves();
          break;
        case "geometric":
          createGeometric();
          break;
        case "dots":
          createDots();
          break;
        case "locksmith":
          createLocksmith();
          break;
        case "blueprint":
          createBlueprint();
          break;
      }

      animate();
    };

    init();

    const handleResize = () => {
      resizeCanvas();
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [type, color, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
};

export default AnimatedCanvas;
