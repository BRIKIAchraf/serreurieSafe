import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import {
  Shield,
  X,
  Lock,
  DoorClosed,
  Building2,
  Camera,
  Car,
  GlassWater,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import * as THREE from "three";

// === PALETTE Serrure Safe ===
const COLOR_PRIMARY = "#E83E00";
const COLOR_SECONDARY = "#F45C23";
const COLOR_DARK = "#2B2B2B";
const COLOR_METAL = "#BDBDBD";

// === PETITS MODÈLES 3D SIMPLIFIÉS ===

// Serrurerie types : Cylindre, Multipoints, Connectée, Biométrique
const LockModel = ({ type }: { type: string }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });
  switch (type) {
    case "Multipoints":
      return (
        <group ref={ref} position={[0, -0.5, 0]}>
          <mesh>
            <boxGeometry args={[2, 3, 0.5]} />
            <meshStandardMaterial
              color={COLOR_DARK}
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
          {[...Array(3)].map((_, i) => (
            <mesh key={i} position={[0, i - 1, 0.26]}>
              <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
              <meshStandardMaterial color={COLOR_METAL} />
            </mesh>
          ))}
        </group>
      );
    case "Connectée":
      return (
        <group ref={ref}>
          <mesh>
            <boxGeometry args={[1.8, 3, 0.6]} />
            <meshStandardMaterial
              color={COLOR_PRIMARY}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0, 0.31]}>
            <circleGeometry args={[0.6, 32]} />
            <meshStandardMaterial
              color="#00ffcc"
              emissive="#00ffcc"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      );
    case "Biométrique":
      return (
        <group ref={ref}>
          <mesh>
            <boxGeometry args={[1.8, 3, 0.6]} />
            <meshStandardMaterial color={COLOR_DARK} />
          </mesh>
          <mesh position={[0, 0.5, 0.31]}>
            <circleGeometry args={[0.4, 32]} />
            <meshStandardMaterial
              color="#00c3ff"
              emissive="#00c3ff"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      );
    default:
      return (
        <group ref={ref}>
          <mesh>
            <boxGeometry args={[2, 3, 0.5]} />
            <meshStandardMaterial
              color={COLOR_METAL}
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>
          <mesh position={[0, 1.4, 0.26]}>
            <cylinderGeometry args={[0.3, 0.3, 0.8, 32]} />
            <meshStandardMaterial color="#E0B422" />
          </mesh>
        </group>
      );
  }
};

// Caméras : Dôme, Bullet, PTZ
const CameraModel = ({ type }: { type: string }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });
  switch (type) {
    case "Dôme":
      return (
        <group ref={ref}>
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={COLOR_DARK}
              metalness={1}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial
              color={COLOR_PRIMARY}
              emissive={COLOR_PRIMARY}
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      );
    case "Bullet":
      return (
        <group ref={ref}>
          <mesh>
            <cylinderGeometry args={[0.4, 0.4, 2, 32]} />
            <meshStandardMaterial
              color={COLOR_METAL}
              metalness={1}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial
              color={COLOR_PRIMARY}
              emissive={COLOR_PRIMARY}
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      );
    case "PTZ":
      return (
        <group ref={ref}>
          <mesh>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color={COLOR_SECONDARY} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.7, 0]}>
            <boxGeometry args={[1.2, 0.4, 1.2]} />
            <meshStandardMaterial color={COLOR_DARK} />
          </mesh>
        </group>
      );
    default:
      return null;
  }
};

// Rideaux métalliques : Plein / Grille / Perforé
const CurtainModel = ({ type }: { type: string }) => {
  const color =
    type === "Grille"
      ? COLOR_PRIMARY
      : type === "Perforé"
      ? COLOR_SECONDARY
      : COLOR_DARK;
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current)
      ref.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
  });
  return (
    <group ref={ref}>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.3, 0]}>
          <boxGeometry args={[2.5, 0.25, 0.1]} />
          <meshStandardMaterial color={color} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
};

// === INFOS DES PRODUITS ===
const productData: Record<
  string,
  { types: string[]; advantages: Record<string, string[]> }
> = {
  Serrurerie: {
    types: ["Cylindre", "Multipoints", "Connectée", "Biométrique"],
    advantages: {
      Cylindre: ["Système standard", "Installation rapide", "Prix abordable"],
      Multipoints: ["Sécurité renforcée", "Norme A2P", "Résiste au crochetage"],
      Connectée: [
        "Contrôle via smartphone",
        "Historique d'accès",
        "Alarme intégrée",
      ],
      Biométrique: ["Empreinte digitale", "Ultra-sécurisée", "Accès sans clé"],
    },
  },
  Caméra: {
    types: ["Dôme", "Bullet", "PTZ"],
    advantages: {
      Dôme: ["Discrète et robuste", "Anti-vandalisme", "Angle large"],
      Bullet: [
        "Vision longue distance",
        "Infra-rouge puissant",
        "Facile à installer",
      ],
      PTZ: ["Rotation motorisée", "Zoom optique", "Suivi automatique"],
    },
  },
  Rideau: {
    types: ["Plein", "Grille", "Perforé"],
    advantages: {
      Plein: ["Protection totale", "Isolation renforcée", "Sécurité maximale"],
      Grille: ["Visibilité du magasin", "Design aéré", "Légèreté"],
      Perforé: ["Équilibre sécurité / visibilité", "Esthétique moderne"],
    },
  },
};

// === PRINCIPAL COMPONENT ===
export default function SerrureSafeSimulator3D() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<"Serrurerie" | "Caméra" | "Rideau">(
    "Serrurerie"
  );
  const [type, setType] = useState("Cylindre");

  const render3D = useMemo(() => {
    switch (service) {
      case "Serrurerie":
        return <LockModel type={type} />;
      case "Caméra":
        return <CameraModel type={type} />;
      case "Rideau":
        return <CurtainModel type={type} />;
      default:
        return null;
    }
  }, [service, type]);

  const advantages = productData[service].advantages[type];

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#E83E00] to-[#F45C23] text-white p-4 rounded-full shadow-lg hover:shadow-2xl z-50"
      >
        <Shield className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#E83E00] to-[#F45C23] text-white p-4 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-xl font-bold">
                  Serrure Safe – Simulateur 3D
                </h2>
                <button onClick={() => setOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 grid md:grid-cols-2 overflow-hidden">
                {/* 3D Viewer */}
                <div className="relative">
                  <Canvas shadows camera={{ position: [4, 3, 4], fov: 45 }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight
                      position={[5, 5, 5]}
                      castShadow
                      intensity={1.2}
                    />
                    {render3D}
                    <ContactShadows
                      position={[0, -1.5, 0]}
                      opacity={0.4}
                      scale={10}
                      blur={1.5}
                    />
                    <Environment preset="city" />
                    <OrbitControls enableZoom enableRotate />
                  </Canvas>
                </div>

                {/* Controls */}
                <div className="p-4 overflow-y-auto bg-gray-50 space-y-4">
                  <div>
                    <h3 className="font-bold text-[#E83E00] text-lg mb-2">
                      Service
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {["Serrurerie", "Caméra", "Rideau"].map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setService(s as any);
                            setType(productData[s].types[0]);
                          }}
                          className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition ${
                            service === s
                              ? "border-[#E83E00] bg-[#FFF5F0] text-[#E83E00]"
                              : "border-gray-200 hover:border-[#F45C23]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#E83E00] text-lg mb-2">
                      Type de produit
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {productData[service].types.map((t) => (
                        <button
                          key={t}
                          onClick={() => setType(t)}
                          className={`px-3 py-2 rounded-lg border-2 text-sm transition ${
                            type === t
                              ? "border-[#E83E00] bg-[#FFF5F0] text-[#E83E00]"
                              : "border-gray-200 hover:border-[#F45C23]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#E83E00] text-lg mb-2">
                      Avantages
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {advantages.map((adv) => (
                        <li key={adv}>{adv}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <button
                      onClick={() =>
                        alert(`Demande envoyée pour ${type} (${service})`)
                      }
                      className="w-full bg-gradient-to-r from-[#E83E00] to-[#F45C23] text-white py-2 rounded-lg text-sm font-semibold hover:opacity-90"
                    >
                      Demander un devis
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
