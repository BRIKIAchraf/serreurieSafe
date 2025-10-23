import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  Star,
  Download,
  Eye,
  Lock,
  User,
  Settings,
  LogOut,
  History,
  FileText,
  Shield,
} from "lucide-react";
import GlassCard from "../components/GlassCard";

interface Intervention {
  id: string;
  date: string;
  time: string;
  address: string;
  type: string;
  status: "completed" | "in_progress" | "scheduled";
  technician: string;
  phone: string;
  description: string;
  rating?: number;
  invoice?: string;
  photos?: string[];
}

const ClientArea: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientInfo] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    address: "123 Rue de la Paix, 75001 Paris",
  });
  const [interventions] = useState<Intervention[]>([
    {
      id: "INT-2024-001",
      date: "2024-01-15",
      time: "14:30",
      address: "123 Rue de la Paix, 75001 Paris",
      type: "Ouverture de porte",
      status: "completed",
      technician: "Pierre Martin",
      phone: "+33 6 98 76 54 32",
      description:
        "Ouverture de porte sans dégâts. Remplacement de la serrure recommandé.",
      rating: 5,
      invoice: "FACT-2024-001.pdf",
      photos: [
        "https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg",
        "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg",
      ],
    },
    {
      id: "INT-2024-002",
      date: "2024-01-10",
      time: "09:15",
      address: "123 Rue de la Paix, 75001 Paris",
      type: "Installation serrure",
      status: "completed",
      technician: "Marie Dubois",
      phone: "+33 6 87 65 43 21",
      description: "Installation d'une serrure haute sécurité certifiée A2P.",
      rating: 5,
      invoice: "FACT-2024-002.pdf",
    },
    {
      id: "INT-2024-003",
      date: "2024-01-20",
      time: "16:45",
      address: "123 Rue de la Paix, 75001 Paris",
      type: "Maintenance préventive",
      status: "scheduled",
      technician: "Pierre Martin",
      phone: "+33 6 98 76 54 32",
      description:
        "Maintenance préventive des serrures et vérification de la sécurité.",
    },
  ]);
  const [selectedIntervention, setSelectedIntervention] =
    useState<Intervention | null>(null);
  const [activeTab, setActiveTab] = useState("history");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "scheduled":
        return <Calendar className="w-5 h-5 text-orange-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Terminé";
      case "in_progress":
        return "En cours";
      case "scheduled":
        return "Programmé";
      default:
        return "Inconnu";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "scheduled":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <GlassCard className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Espace Client Privé
              </h1>
              <p className="text-gray-600">
                Accédez à votre historique d'interventions
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Se connecter
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <a
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Contactez-nous
                </a>
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {clientInfo.name}
                </h1>
                <p className="text-sm text-gray-600">Espace client privé</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex flex-wrap gap-2 sm:gap-4 lg:gap-8">
            {[
              { id: "history", label: "Historique", icon: History },
              { id: "profile", label: "Profil", icon: User },
              { id: "documents", label: "Documents", icon: FileText },
              { id: "security", label: "Sécurité", icon: Shield },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Historique des interventions
                </h2>
                <div className="text-sm text-gray-600">
                  {interventions.length} intervention
                  {interventions.length > 1 ? "s" : ""}
                </div>
              </div>

              <div className="grid gap-6">
                {interventions.map((intervention) => (
                  <motion.div
                    key={intervention.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {intervention.type}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {intervention.id} • {intervention.date} à{" "}
                            {intervention.time}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            intervention.status
                          )}`}
                        >
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(intervention.status)}
                            <span>{getStatusText(intervention.status)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="break-words">
                            {intervention.address}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <User className="w-4 h-4 flex-shrink-0" />
                          <span>{intervention.technician}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">
                        {intervention.description}
                      </p>

                      {intervention.rating && (
                        <div className="flex items-center space-x-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < intervention.rating!
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">
                            ({intervention.rating}/5)
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() =>
                              setSelectedIntervention(intervention)
                            }
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Détails</span>
                          </button>
                          {intervention.invoice && (
                            <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 font-medium text-sm">
                              <Download className="w-4 h-4" />
                              <span>Facture</span>
                            </button>
                          )}
                          <a
                            href={`tel:${intervention.phone}`}
                            className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 font-medium text-sm"
                          >
                            <Phone className="w-4 h-4" />
                            <span className="hidden sm:inline">
                              {intervention.phone}
                            </span>
                            <span className="sm:hidden">Appeler</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Informations du profil
              </h2>

              <GlassCard className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={clientInfo.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={clientInfo.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={clientInfo.phone}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={clientInfo.address}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
                    Sauvegarder
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Intervention Details Modal */}
      <AnimatePresence>
        {selectedIntervention && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedIntervention(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedIntervention.type}
                    </h3>
                    <p className="text-gray-600">
                      {selectedIntervention.id} • {selectedIntervention.date} à{" "}
                      {selectedIntervention.time}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedIntervention(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-700">
                      {selectedIntervention.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Technicien
                    </h4>
                    <p className="text-gray-700">
                      {selectedIntervention.technician}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedIntervention.phone}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Adresse
                    </h4>
                    <p className="text-gray-700">
                      {selectedIntervention.address}
                    </p>
                  </div>

                  {selectedIntervention.photos && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Photos
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedIntervention.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientArea;
