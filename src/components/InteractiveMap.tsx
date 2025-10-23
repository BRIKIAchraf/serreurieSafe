import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  User,
  Building,
  Star,
  Zap,
  Shield,
  Award,
} from "lucide-react";

interface ServiceZone {
  id: string;
  name: string;
  areas: string[];
  responseTime: string;
  color: string;
  coordinates: { x: number; y: number };
}

interface Client {
  id: string;
  name: string;
  type: "individual" | "business";
  rating: number;
  lastService: string;
  coordinates: { x: number; y: number };
  status: "active" | "inactive";
}

interface Partner {
  id: string;
  name: string;
  type: "supplier" | "contractor" | "service";
  rating: number;
  coordinates: { x: number; y: number };
  status: "active" | "inactive";
}

const InteractiveMap: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"zones" | "clients" | "partners">(
    "zones"
  );
  const [showStats, setShowStats] = useState(false);

  const serviceZones: ServiceZone[] = [
    {
      id: "center",
      name: "Paris Centre",
      areas: ["1er", "2ème", "3ème", "4ème"],
      responseTime: "15-20 min",
      color: "#dc2626",
      coordinates: { x: 50, y: 45 },
    },
    {
      id: "west",
      name: "Paris Ouest",
      areas: ["7ème", "8ème", "16ème", "17ème"],
      responseTime: "20-25 min",
      color: "#ea580c",
      coordinates: { x: 35, y: 40 },
    },
    {
      id: "east",
      name: "Paris Est",
      areas: ["11ème", "12ème", "19ème", "20ème"],
      responseTime: "20-30 min",
      color: "#f97316",
      coordinates: { x: 65, y: 50 },
    },
    {
      id: "north",
      name: "Paris Nord",
      areas: ["9ème", "10ème", "18ème"],
      responseTime: "25-30 min",
      color: "#fb923c",
      coordinates: { x: 50, y: 25 },
    },
    {
      id: "south",
      name: "Paris Sud",
      areas: ["13ème", "14ème", "15ème"],
      responseTime: "25-30 min",
      color: "#fdba74",
      coordinates: { x: 45, y: 70 },
    },
    {
      id: "suburbs",
      name: "Banlieue",
      areas: ["92", "93", "94", "95"],
      responseTime: "30-45 min",
      color: "#fed7aa",
      coordinates: { x: 75, y: 30 },
    },
  ];

  const clients: Client[] = [
    {
      id: "client1",
      name: "Marie Dubois",
      type: "individual",
      rating: 5,
      lastService: "Ouverture de porte",
      coordinates: { x: 45, y: 40 },
      status: "active",
    },
    {
      id: "client2",
      name: "Hôtel Plaza",
      type: "business",
      rating: 5,
      lastService: "Installation serrures",
      coordinates: { x: 35, y: 35 },
      status: "active",
    },
    {
      id: "client3",
      name: "Jean Martin",
      type: "individual",
      rating: 5,
      lastService: "Urgence nocturne",
      coordinates: { x: 60, y: 50 },
      status: "active",
    },
    {
      id: "client4",
      name: "Restaurant Le Bistrot",
      type: "business",
      rating: 4,
      lastService: "Maintenance",
      coordinates: { x: 55, y: 30 },
      status: "active",
    },
  ];

  const partners: Partner[] = [
    {
      id: "partner1",
      name: "Fournisseur Serrures Pro",
      type: "supplier",
      rating: 5,
      coordinates: { x: 25, y: 20 },
      status: "active",
    },
    {
      id: "partner2",
      name: "Sécurité Plus",
      type: "contractor",
      rating: 4,
      coordinates: { x: 75, y: 25 },
      status: "active",
    },
    {
      id: "partner3",
      name: "Assurance Habitation",
      type: "service",
      rating: 5,
      coordinates: { x: 30, y: 70 },
      status: "active",
    },
  ];

  const getClientIcon = (type: string) => {
    return type === "individual" ? (
      <User className="w-4 h-4" />
    ) : (
      <Building className="w-4 h-4" />
    );
  };

  const getPartnerIcon = (type: string) => {
    switch (type) {
      case "supplier":
        return <Shield className="w-4 h-4" />;
      case "contractor":
        return <Award className="w-4 h-4" />;
      case "service":
        return <Zap className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <motion.div
        className="relative bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0">
            Carte interactive - Paris & Île-de-France
          </h3>

          {/* Mode Selector */}
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            {[
              {
                id: "zones",
                label: "Zones",
                icon: <MapPin className="w-4 h-4" />,
              },
              {
                id: "clients",
                label: "Clients",
                icon: <User className="w-4 h-4" />,
              },
              {
                id: "partners",
                label: "Partenaires",
                icon: <Building className="w-4 h-4" />,
              },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === mode.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {mode.icon}
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Carte interactive */}
        <div className="relative w-full h-96 bg-white rounded-xl shadow-inner overflow-hidden">
          {/* Fond de carte stylisé */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{
              background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
            }}
          >
            {/* Rivière Seine stylisée */}
            <path
              d="M20,60 Q30,50 40,55 Q50,60 60,50 Q70,40 80,45"
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />

            {/* Zones de service */}
            {viewMode === "zones" &&
              serviceZones.map((zone) => (
                <motion.circle
                  key={zone.id}
                  cx={zone.coordinates.x}
                  cy={zone.coordinates.y}
                  r={hoveredZone === zone.id ? "12" : "8"}
                  fill={zone.color}
                  opacity={selectedZone === zone.id ? 0.9 : 0.6}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredZone(zone.id)}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() =>
                    setSelectedZone(selectedZone === zone.id ? null : zone.id)
                  }
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: selectedZone === zone.id ? 1.3 : 1,
                    opacity: selectedZone === zone.id ? 1 : 0.7,
                  }}
                />
              ))}

            {/* Clients */}
            {viewMode === "clients" &&
              clients.map((client) => (
                <motion.circle
                  key={client.id}
                  cx={client.coordinates.x}
                  cy={client.coordinates.y}
                  r="6"
                  fill={client.status === "active" ? "#10b981" : "#6b7280"}
                  opacity={selectedClient === client.id ? 1 : 0.8}
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedClient(
                      selectedClient === client.id ? null : client.id
                    )
                  }
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: selectedClient === client.id ? 1.4 : 1,
                    opacity: selectedClient === client.id ? 1 : 0.8,
                  }}
                />
              ))}

            {/* Partners */}
            {viewMode === "partners" &&
              partners.map((partner) => (
                <motion.circle
                  key={partner.id}
                  cx={partner.coordinates.x}
                  cy={partner.coordinates.y}
                  r="6"
                  fill={partner.status === "active" ? "#3b82f6" : "#6b7280"}
                  opacity={selectedPartner === partner.id ? 1 : 0.8}
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedPartner(
                      selectedPartner === partner.id ? null : partner.id
                    )
                  }
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: selectedPartner === partner.id ? 1.4 : 1,
                    opacity: selectedPartner === partner.id ? 1 : 0.8,
                  }}
                />
              ))}

            {/* Lignes de connexion animées */}
            {serviceZones.map((zone, index) => (
              <motion.line
                key={`line-${zone.id}`}
                x1="50"
                y1="45"
                x2={zone.coordinates.x}
                y2={zone.coordinates.y}
                stroke={zone.color}
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="2,2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: index * 0.2, duration: 1 }}
              />
            ))}

            {/* Centre principal */}
            <motion.circle
              cx="50"
              cy="45"
              r="6"
              fill="#dc2626"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>

          {/* Marqueurs avec labels */}
          {viewMode === "zones" &&
            serviceZones.map((zone) => (
              <motion.div
                key={`label-${zone.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${zone.coordinates.x}%`,
                  top: `${zone.coordinates.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  scale: hoveredZone === zone.id ? 1.1 : 1,
                  y: hoveredZone === zone.id ? -5 : 0,
                }}
              >
                <div className="bg-white px-2 py-1 rounded-lg shadow-lg text-xs font-semibold whitespace-nowrap">
                  {zone.name}
                </div>
              </motion.div>
            ))}

          {/* Client Labels */}
          {viewMode === "clients" &&
            clients.map((client) => (
              <motion.div
                key={`client-label-${client.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${client.coordinates.x}%`,
                  top: `${client.coordinates.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  scale: selectedClient === client.id ? 1.1 : 1,
                  y: selectedClient === client.id ? -5 : 0,
                }}
              >
                <div className="bg-white px-2 py-1 rounded-lg shadow-lg text-xs font-semibold whitespace-nowrap flex items-center space-x-1">
                  {getClientIcon(client.type)}
                  <span>{client.name}</span>
                  <div className="flex">
                    {[...Array(client.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-2 h-2 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

          {/* Partner Labels */}
          {viewMode === "partners" &&
            partners.map((partner) => (
              <motion.div
                key={`partner-label-${partner.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${partner.coordinates.x}%`,
                  top: `${partner.coordinates.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  scale: selectedPartner === partner.id ? 1.1 : 1,
                  y: selectedPartner === partner.id ? -5 : 0,
                }}
              >
                <div className="bg-white px-2 py-1 rounded-lg shadow-lg text-xs font-semibold whitespace-nowrap flex items-center space-x-1">
                  {getPartnerIcon(partner.type)}
                  <span>{partner.name}</span>
                  <div className="flex">
                    {[...Array(partner.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-2 h-2 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Informations détaillées */}
        <AnimatePresence>
          {selectedZone && viewMode === "zones" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-6 bg-white rounded-xl shadow-lg"
            >
              {(() => {
                const zone = serviceZones.find((z) => z.id === selectedZone);
                return zone ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-gray-800 flex items-center">
                        <MapPin
                          className="w-5 h-5 mr-2"
                          style={{ color: zone.color }}
                        />
                        {zone.name}
                      </h4>
                      <div className="flex items-center text-green-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="font-semibold">
                          {zone.responseTime}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-2">
                          Arrondissements couverts :
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {zone.areas.map((area) => (
                            <span
                              key={area}
                              className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <motion.button
                          className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Phone className="w-4 h-4" />
                          <span>Intervention immédiate</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </motion.div>
          )}

          {/* Client Details */}
          {selectedClient && viewMode === "clients" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-6 bg-white rounded-xl shadow-lg"
            >
              {(() => {
                const client = clients.find((c) => c.id === selectedClient);
                return client ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getClientIcon(client.type)}
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">
                            {client.name}
                          </h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {client.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(client.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-2">
                          Dernier service :
                        </h5>
                        <p className="text-gray-600">{client.lastService}</p>
                      </div>

                      <div className="flex items-center justify-center">
                        <motion.button
                          className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Phone className="w-4 h-4" />
                          <span>Contacter</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </motion.div>
          )}

          {/* Partner Details */}
          {selectedPartner && viewMode === "partners" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-6 bg-white rounded-xl shadow-lg"
            >
              {(() => {
                const partner = partners.find((p) => p.id === selectedPartner);
                return partner ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getPartnerIcon(partner.type)}
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">
                            {partner.name}
                          </h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {partner.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(partner.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-2">
                          Type de partenariat :
                        </h5>
                        <p className="text-gray-600 capitalize">
                          {partner.type}
                        </p>
                      </div>

                      <div className="flex items-center justify-center">
                        <motion.button
                          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Phone className="w-4 h-4" />
                          <span>Contacter</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Légende */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {viewMode === "zones" &&
            serviceZones.map((zone) => (
              <motion.button
                key={`legend-${zone.id}`}
                onClick={() =>
                  setSelectedZone(selectedZone === zone.id ? null : zone.id)
                }
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  selectedZone === zone.id
                    ? "bg-white shadow-lg"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: zone.color }}
                />
                <span className="text-sm font-medium">{zone.name}</span>
                <span className="text-xs text-gray-600">
                  ({zone.responseTime})
                </span>
              </motion.button>
            ))}

          {viewMode === "clients" && (
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Clients actifs</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-500" />
                <span>Clients inactifs</span>
              </div>
            </div>
          )}

          {viewMode === "partners" && (
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Partenaires actifs</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-500" />
                <span>Partenaires inactifs</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveMap;
