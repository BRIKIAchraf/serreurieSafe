import React, { useEffect, useRef } from "react";

interface AnimatedCanvasProps {
  className?: string;
  type?: "particles" | "waves" | "geometric" | "dots";
  color?: string;
  intensity?: number;
}

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
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const init = () => {
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
