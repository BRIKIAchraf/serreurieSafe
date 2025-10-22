import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const IsometricBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Isometric elements
    const elements: Array<{
      x: number;
      y: number;
      z: number;
      type: 'key' | 'gear' | 'lock' | 'cylinder';
      rotation: number;
      rotationSpeed: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create isometric elements
    for (let i = 0; i < 15; i++) {
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100,
        type: ['key', 'gear', 'lock', 'cylinder'][Math.floor(Math.random() * 4)] as any,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        size: Math.random() * 30 + 20,
        opacity: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? '#ea580c' : '#dc2626',
      });
    }

    // Isometric projection
    const toIsometric = (x: number, y: number, z: number) => {
      const isoX = (x - y) * Math.cos(Math.PI / 6);
      const isoY = (x + y) * Math.sin(Math.PI / 6) - z;
      return { x: isoX, y: isoY };
    };

    // Draw isometric key
    const drawKey = (element: any) => {
      const iso = toIsometric(element.x, element.y, element.z);
      ctx.save();
      ctx.translate(iso.x, iso.y);
      ctx.rotate(element.rotation);
      ctx.globalAlpha = element.opacity;
      ctx.strokeStyle = element.color;
      ctx.fillStyle = element.color + '20';
      ctx.lineWidth = 2;

      // Key shape in isometric view
      ctx.beginPath();
      ctx.rect(-element.size/2, -element.size/8, element.size * 0.7, element.size/4);
      ctx.arc(-element.size/2, 0, element.size/6, 0, Math.PI * 2);
      ctx.rect(element.size * 0.2, -element.size/8, element.size/8, element.size/3);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    // Draw isometric gear
    const drawGear = (element: any) => {
      const iso = toIsometric(element.x, element.y, element.z);
      ctx.save();
      ctx.translate(iso.x, iso.y);
      ctx.rotate(element.rotation);
      ctx.globalAlpha = element.opacity;
      ctx.strokeStyle = element.color;
      ctx.fillStyle = element.color + '20';
      ctx.lineWidth = 2;

      const teeth = 8;
      const outerRadius = element.size / 2;
      const innerRadius = outerRadius * 0.7;

      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2;
        const x1 = Math.cos(angle) * outerRadius;
        const y1 = Math.sin(angle) * outerRadius * 0.5; // Isometric compression
        const x2 = Math.cos(angle) * innerRadius;
        const y2 = Math.sin(angle) * innerRadius * 0.5;
        
        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    // Draw isometric lock
    const drawLock = (element: any) => {
      const iso = toIsometric(element.x, element.y, element.z);
      ctx.save();
      ctx.translate(iso.x, iso.y);
      ctx.rotate(element.rotation);
      ctx.globalAlpha = element.opacity;
      ctx.strokeStyle = element.color;
      ctx.fillStyle = element.color + '20';
      ctx.lineWidth = 2;

      // Lock body (isometric cube)
      const size = element.size / 2;
      ctx.beginPath();
      ctx.moveTo(-size, -size * 0.5);
      ctx.lineTo(size, -size * 0.5);
      ctx.lineTo(size, size * 0.5);
      ctx.lineTo(-size, size * 0.5);
      ctx.closePath();
      
      // Top face
      ctx.moveTo(-size, -size * 0.5);
      ctx.lineTo(-size * 0.5, -size * 0.8);
      ctx.lineTo(size * 0.5, -size * 0.8);
      ctx.lineTo(size, -size * 0.5);
      
      // Right face
      ctx.moveTo(size, -size * 0.5);
      ctx.lineTo(size * 0.5, -size * 0.8);
      ctx.lineTo(size * 0.5, size * 0.2);
      ctx.lineTo(size, size * 0.5);
      
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    // Draw isometric cylinder
    const drawCylinder = (element: any) => {
      const iso = toIsometric(element.x, element.y, element.z);
      ctx.save();
      ctx.translate(iso.x, iso.y);
      ctx.rotate(element.rotation);
      ctx.globalAlpha = element.opacity;
      ctx.strokeStyle = element.color;
      ctx.fillStyle = element.color + '20';
      ctx.lineWidth = 2;

      const radius = element.size / 3;
      const height = element.size / 2;

      // Cylinder in isometric view
      ctx.beginPath();
      ctx.ellipse(0, 0, radius, radius * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Cylinder sides
      ctx.beginPath();
      ctx.moveTo(-radius, 0);
      ctx.lineTo(-radius, height);
      ctx.moveTo(radius, 0);
      ctx.lineTo(radius, height);
      ctx.stroke();

      // Top ellipse
      ctx.beginPath();
      ctx.ellipse(0, height, radius, radius * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    // Handle scroll for parallax
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      elements.forEach((element) => {
        // Apply parallax effect
        element.y += scrollY.current * 0.001;
        element.rotation += element.rotationSpeed;

        // Wrap around edges
        if (element.x < -100) element.x = canvas.width + 100;
        if (element.x > canvas.width + 100) element.x = -100;
        if (element.y < -100) element.y = canvas.height + 100;
        if (element.y > canvas.height + 100) element.y = -100;

        // Draw based on type
        switch (element.type) {
          case 'key':
            drawKey(element);
            break;
          case 'gear':
            drawGear(element);
            break;
          case 'lock':
            drawLock(element);
            break;
          case 'cylinder':
            drawCylinder(element);
            break;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
      />
    </div>
  );
};

export default IsometricBackground;