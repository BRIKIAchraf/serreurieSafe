import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* -----------------------------------------------------
   1️⃣ Particules métalliques flottantes
----------------------------------------------------- */
function MetallicParticles() {
  const ref = useRef<THREE.Points>(null);
  const { size } = useThree();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ea580c"
        size={0.5}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

/* -----------------------------------------------------
   2️⃣ Clé animée
----------------------------------------------------- */
function AnimatedKey({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Corps */}
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
        <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Tête */}
      <mesh position={[0, 1.8, 0]}>
        <torusGeometry args={[0.8, 0.2, 8, 16]} />
        <meshStandardMaterial color="#ea580c" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Dents */}
      <mesh position={[0, -1.2, 0.15]}>
        <boxGeometry args={[0.3, 0.4, 0.1]} />
        <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.6, 0.15]}>
        <boxGeometry args={[0.2, 0.3, 0.1]} />
        <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* -----------------------------------------------------
   3️⃣ Engrenage animé
----------------------------------------------------- */
function AnimatedGear({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01 * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[1.5, 1.5, 0.3, 12]} />
      <meshStandardMaterial color="#f97316" metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

/* -----------------------------------------------------
   4️⃣ Cadenas animé
----------------------------------------------------- */
function AnimatedLock({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Corps */}
      <mesh>
        <boxGeometry args={[1.5, 2, 0.8]} />
        <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Anse */}
      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[0.8, 0.15, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#ea580c" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

/* -----------------------------------------------------
   5️⃣ Scène 3D complète
----------------------------------------------------- */
function ThreeScene() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 30);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ea580c" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#dc2626" />
      <directionalLight position={[0, 10, 5]} intensity={0.8} />

      <MetallicParticles />

      {/* Éléments 3D */}
      <AnimatedKey position={[-15, 5, -10]} />
      <AnimatedKey position={[12, -8, -15]} />
      <AnimatedKey position={[-8, -12, -8]} />

      <AnimatedGear position={[18, 8, -12]} speed={0.5} />
      <AnimatedGear position={[-20, -5, -18]} speed={-0.3} />
      <AnimatedGear position={[5, 15, -20]} speed={0.8} />

      <AnimatedLock position={[10, -15, -8]} />
      <AnimatedLock position={[-18, 10, -12]} />
      <AnimatedLock position={[0, 0, -25]} />
    </>
  );
}

/* -----------------------------------------------------
   6️⃣ Composant principal exporté
----------------------------------------------------- */
const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ThreeScene />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
