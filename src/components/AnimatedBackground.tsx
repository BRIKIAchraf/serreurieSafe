import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? '#ea580c' : '#dc2626',
      });
    }

    // Floating elements (keys, locks)
    const floatingElements: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
      size: number;
      opacity: number;
      type: 'key' | 'lock' | 'gear';
    }> = [];

    // Create floating elements
    for (let i = 0; i < 8; i++) {
      floatingElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        size: Math.random() * 20 + 15,
        opacity: Math.random() * 0.15 + 0.05,
        type: ['key', 'lock', 'gear'][Math.floor(Math.random() * 3)] as 'key' | 'lock' | 'gear',
      });
    }

    // Draw key shape
    const drawKey = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size / 20, size / 20);
      
      ctx.beginPath();
      // Key shaft
      ctx.rect(-15, -2, 20, 4);
      // Key head (circle)
      ctx.arc(-15, 0, 6, 0, Math.PI * 2);
      // Key teeth
      ctx.rect(5, -2, 3, 6);
      ctx.rect(10, -2, 2, 4);
      
      ctx.restore();
    };

    // Draw lock shape
    const drawLock = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size / 20, size / 20);
      
      ctx.beginPath();
      // Lock body
      ctx.roundRect(-8, -2, 16, 12, 2);
      // Lock shackle
      ctx.arc(0, -2, 6, Math.PI, 0, false);
      
      ctx.restore();
    };

    // Draw gear shape
    const drawGear = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      const teeth = 8;
      const outerRadius = size / 2;
      const innerRadius = outerRadius * 0.7;
      
      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2;
        const nextAngle = ((i + 1) / teeth) * Math.PI * 2;
        
        // Outer tooth
        const x1 = Math.cos(angle) * outerRadius;
        const y1 = Math.sin(angle) * outerRadius;
        const x2 = Math.cos(nextAngle) * outerRadius;
        const y2 = Math.sin(nextAngle) * outerRadius;
        
        // Inner valley
        const midAngle = angle + (nextAngle - angle) / 2;
        const x3 = Math.cos(midAngle) * innerRadius;
        const y3 = Math.sin(midAngle) * innerRadius;
        
        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
      }
      ctx.closePath();
      
      // Center hole
      ctx.moveTo(innerRadius * 0.3, 0);
      ctx.arc(0, 0, innerRadius * 0.3, 0, Math.PI * 2, true);
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw floating elements
      floatingElements.forEach((element) => {
        element.x += element.vx;
        element.y += element.vy;
        element.rotation += element.rotationSpeed;

        // Wrap around edges
        if (element.x < -50) element.x = canvas.width + 50;
        if (element.x > canvas.width + 50) element.x = -50;
        if (element.y < -50) element.y = canvas.height + 50;
        if (element.y > canvas.height + 50) element.y = -50;

        ctx.save();
        ctx.globalAlpha = element.opacity;
        ctx.strokeStyle = '#ea580c';
        ctx.fillStyle = 'rgba(234, 88, 12, 0.1)';
        ctx.lineWidth = 1;

        if (element.type === 'key') {
          drawKey(ctx, element.x, element.y, element.size, element.rotation);
        } else if (element.type === 'lock') {
          drawLock(ctx, element.x, element.y, element.size, element.rotation);
        } else {
          drawGear(ctx, element.x, element.y, element.size, element.rotation);
        }

        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-orange-50/30"></div>
      
      {/* Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
      />
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-white/10"></div>
    </div>
  );
};

export default AnimatedBackground;