import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Settings,
  Shield,
  Lock,
  Key,
  Wrench,
  Info,
  X,
  Play,
  Pause,
  RotateCw,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Simple 3D Lock Component
const Lock3D: React.FC<{
  rotation: [number, number, number];
  scale: number;
  showCrossSection: boolean;
  animationSpeed: number;
}> = ({ rotation, scale, showCrossSection, animationSpeed }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += animationSpeed * 0.01;
    }
  });

  return (
    <group rotation={rotation} scale={scale}>
      {/* Lock Body */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2, 3, 1]} />
        <meshStandardMaterial
          color={hovered ? "#3b82f6" : "#1f2937"}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Lock Cylinder */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 16]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Keyhole */}
      <mesh position={[0, 1.5, 0.6]}>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Cross Section */}
      {showCrossSection && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.1, 3.1, 0.1]} />
          <meshStandardMaterial color="#ef4444" transparent opacity={0.3} />
        </mesh>
      )}

      {/* Internal Mechanism */}
      {showCrossSection && (
        <group>
          {/* Pins */}
          {[...Array(5)].map((_, i) => (
            <mesh key={i} position={[0.2 * (i - 2), 1.5, 0.3]}>
              <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
              <meshStandardMaterial color="#6b7280" />
            </mesh>
          ))}

          {/* Springs */}
          {[...Array(5)].map((_, i) => (
            <mesh key={`spring-${i}`} position={[0.2 * (i - 2), 1.2, 0.3]}>
              <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
              <meshStandardMaterial color="#f59e0b" />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};

const Lock3DViewer: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [scale, setScale] = useState(1);
  const [showCrossSection, setShowCrossSection] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewMode, setViewMode] = useState<
    "exterior" | "interior" | "exploded"
  >("exterior");
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const lockParts = [
    { id: "body", name: "Corps de serrure", color: "#1f2937" },
    { id: "cylinder", name: "Cylindre", color: "#fbbf24" },
    { id: "pins", name: "Goupilles", color: "#6b7280" },
    { id: "springs", name: "Ressorts", color: "#f59e0b" },
    { id: "keyhole", name: "Entrée de clé", color: "#000000" },
  ];

  const resetView = () => {
    setRotation([0, 0, 0]);
    setScale(1);
    setShowCrossSection(false);
    setAnimationSpeed(0);
    setIsAnimating(false);
    setViewMode("exterior");
    setSelectedPart(null);
  };

  const toggleAnimation = () => {
    if (isAnimating) {
      setAnimationSpeed(0);
    } else {
      setAnimationSpeed(1);
    }
    setIsAnimating(!isAnimating);
  };

  const handleViewModeChange = (mode: "exterior" | "interior" | "exploded") => {
    setViewMode(mode);
    if (mode === "interior") {
      setShowCrossSection(true);
    } else {
      setShowCrossSection(false);
    }
  };

  return (
    <>
      {/* Floating 3D Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Shield className="w-6 h-6" />
      </motion.button>

      {/* 3D Viewer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Visualisation 3D - Serrure
                    </h2>
                    <p className="text-purple-100">
                      Explorez les mécanismes internes
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="flex-1 flex">
                {/* 3D Canvas */}
                <div className="flex-1 relative">
                  <Canvas
                    camera={{ position: [5, 5, 5], fov: 50 }}
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <Lock3D
                      rotation={rotation}
                      scale={scale}
                      showCrossSection={showCrossSection}
                      animationSpeed={animationSpeed}
                    />

                    <OrbitControls
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                      minDistance={3}
                      maxDistance={20}
                    />

                    <Environment preset="studio" />
                  </Canvas>

                  {/* 3D Controls Overlay */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Contrôles 3D
                      </h4>
                      <div className="space-y-2">
                        <button
                          onClick={resetView}
                          className="flex items-center space-x-2 w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Réinitialiser</span>
                        </button>

                        <button
                          onClick={toggleAnimation}
                          className="flex items-center space-x-2 w-full px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-sm transition-colors"
                        >
                          {isAnimating ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                          <span>{isAnimating ? "Pause" : "Animation"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Control Panel */}
                <div className="w-80 bg-gray-50 p-6 space-y-6 overflow-y-auto">
                  {/* View Modes */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Modes de vue
                    </h3>
                    <div className="space-y-2">
                      {[
                        {
                          id: "exterior",
                          label: "Extérieur",
                          icon: <Eye className="w-4 h-4" />,
                        },
                        {
                          id: "interior",
                          label: "Intérieur",
                          icon: <EyeOff className="w-4 h-4" />,
                        },
                        {
                          id: "exploded",
                          label: "Éclaté",
                          icon: <Settings className="w-4 h-4" />,
                        },
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => handleViewModeChange(mode.id as any)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                            viewMode === mode.id
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {mode.icon}
                          <span>{mode.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scale Control */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Zoom
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <ZoomOut className="w-4 h-4 text-gray-500" />
                        <input
                          type="range"
                          min="0.5"
                          max="3"
                          step="0.1"
                          value={scale}
                          onChange={(e) => setScale(parseFloat(e.target.value))}
                          className="flex-1"
                        />
                        <ZoomIn className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="text-center text-sm text-gray-600">
                        {Math.round(scale * 100)}%
                      </div>
                    </div>
                  </div>

                  {/* Rotation Controls */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Rotation
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          axis: "X",
                          value: rotation[0],
                          onChange: (val: number) =>
                            setRotation([val, rotation[1], rotation[2]]),
                        },
                        {
                          axis: "Y",
                          value: rotation[1],
                          onChange: (val: number) =>
                            setRotation([rotation[0], val, rotation[2]]),
                        },
                        {
                          axis: "Z",
                          value: rotation[2],
                          onChange: (val: number) =>
                            setRotation([rotation[0], rotation[1], val]),
                        },
                      ].map((axis) => (
                        <div key={axis.axis} className="text-center">
                          <label className="text-sm font-medium text-gray-700">
                            {axis.axis}
                          </label>
                          <input
                            type="range"
                            min="-180"
                            max="180"
                            value={axis.value}
                            onChange={(e) =>
                              axis.onChange(parseFloat(e.target.value))
                            }
                            className="w-full mt-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lock Parts */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Composants
                    </h3>
                    <div className="space-y-2">
                      {lockParts.map((part) => (
                        <button
                          key={part.id}
                          onClick={() =>
                            setSelectedPart(
                              selectedPart === part.id ? null : part.id
                            )
                          }
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                            selectedPart === part.id
                              ? "bg-blue-100 border-2 border-blue-600"
                              : "bg-white border-2 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: part.color }}
                          />
                          <span className="text-sm font-medium">
                            {part.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Information Panel */}
                  {selectedPart && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        {lockParts.find((p) => p.id === selectedPart)?.name}
                      </h4>
                      <p className="text-sm text-blue-800">
                        {selectedPart === "body" &&
                          "Le corps principal de la serrure qui contient tous les mécanismes."}
                        {selectedPart === "cylinder" &&
                          "Le cylindre qui tourne pour actionner le mécanisme de verrouillage."}
                        {selectedPart === "pins" &&
                          "Les goupilles qui s'alignent avec la clé pour permettre l'ouverture."}
                        {selectedPart === "springs" &&
                          "Les ressorts qui maintiennent les goupilles en position."}
                        {selectedPart === "keyhole" &&
                          "L'entrée de la clé dans le cylindre."}
                      </p>
                    </div>
                  )}

                  {/* Technical Info */}
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Informations techniques
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span>Serrure à goupilles</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Matériau:</span>
                        <span>Acier inoxydable</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Certification:</span>
                        <span>A2P</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Résistance:</span>
                        <span>Haute sécurité</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Lock3DViewer;
