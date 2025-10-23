import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Download,
  Share2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  Star,
  Award,
  Shield,
  QrCode,
  Copy,
  Check,
  User,
  Building,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { useSounds } from "./SoundManager";

interface BusinessCardData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  rating: number;
  services: string[];
  availability: string;
  qrCode: string;
}

const VirtualBusinessCard: React.FC = () => {
  const { t } = useTranslation();
  const { playUnlockSound, playKeySound } = useSounds();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<
    "modern" | "classic" | "minimal"
  >("modern");

  const businessCardData: BusinessCardData = {
    name: "Pierre Martin",
    title: "Technicien Certifié A2P",
    company: "Serrure Safe",
    phone: "+33 6 12 34 56 78",
    email: "pierre.martin@serruresafe.fr",
    website: "www.serruresafe.fr",
    address: "123 Rue de la Paix, 75001 Paris",
    rating: 5,
    services: ["Ouverture de porte", "Installation serrures", "Urgence 24h/24"],
    availability: "Disponible 7j/7, 24h/24",
    qrCode: "https://serruresafe.fr/contact",
  };

  const templates = [
    {
      id: "modern",
      name: "Moderne",
      gradient: "from-blue-600 to-purple-600",
      textColor: "text-white",
      bgColor: "bg-gradient-to-br from-blue-600 to-purple-600",
    },
    {
      id: "classic",
      name: "Classique",
      gradient: "from-gray-800 to-gray-900",
      textColor: "text-white",
      bgColor: "bg-gradient-to-br from-gray-800 to-gray-900",
    },
    {
      id: "minimal",
      name: "Minimal",
      gradient: "from-white to-gray-50",
      textColor: "text-gray-900",
      bgColor: "bg-gradient-to-br from-white to-gray-50",
    },
  ];

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
      playUnlockSound();
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${businessCardData.name}
ORG:${businessCardData.company}
TITLE:${businessCardData.title}
TEL:${businessCardData.phone}
EMAIL:${businessCardData.email}
URL:${businessCardData.website}
ADR:;;${businessCardData.address};;;;
NOTE:${businessCardData.services.join(", ")}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${businessCardData.name.replace(" ", "_")}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${businessCardData.name} - ${businessCardData.company}`,
          text: `Contactez ${businessCardData.name} pour vos besoins de serrurerie`,
          url: businessCardData.website,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      copyToClipboard(businessCardData.website, "share");
    }
  };

  const getCurrentTemplate = () => {
    return templates.find((t) => t.id === selectedTemplate) || templates[0];
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        onMouseEnter={playUnlockSound}
      >
        <User className="w-6 h-6" />
      </motion.button>

      {/* Business Card Modal */}
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Carte de visite virtuelle
                    </h2>
                    <p className="text-blue-100">
                      Téléchargez et partagez facilement
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Template Selector */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Choisissez un modèle :
                  </h3>
                  <div className="flex space-x-4">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id as any)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedTemplate === template.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Business Card Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Card Preview */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Aperçu de la carte :
                    </h3>

                    <motion.div
                      key={selectedTemplate}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`relative rounded-xl shadow-lg overflow-hidden ${
                        getCurrentTemplate().bgColor
                      }`}
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h4
                              className={`text-2xl font-bold ${
                                getCurrentTemplate().textColor
                              }`}
                            >
                              {businessCardData.name}
                            </h4>
                            <p
                              className={`text-lg ${
                                getCurrentTemplate().textColor
                              } opacity-90`}
                            >
                              {businessCardData.title}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(businessCardData.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                        </div>

                        {/* Company */}
                        <div className="mb-4">
                          <p
                            className={`text-lg font-semibold ${
                              getCurrentTemplate().textColor
                            }`}
                          >
                            {businessCardData.company}
                          </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center space-x-3">
                            <Phone
                              className={`w-4 h-4 ${
                                getCurrentTemplate().textColor
                              } opacity-80`}
                            />
                            <span className={getCurrentTemplate().textColor}>
                              {businessCardData.phone}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Mail
                              className={`w-4 h-4 ${
                                getCurrentTemplate().textColor
                              } opacity-80`}
                            />
                            <span className={getCurrentTemplate().textColor}>
                              {businessCardData.email}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <MapPin
                              className={`w-4 h-4 ${
                                getCurrentTemplate().textColor
                              } opacity-80`}
                            />
                            <span className={getCurrentTemplate().textColor}>
                              {businessCardData.address}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Globe
                              className={`w-4 h-4 ${
                                getCurrentTemplate().textColor
                              } opacity-80`}
                            />
                            <span className={getCurrentTemplate().textColor}>
                              {businessCardData.website}
                            </span>
                          </div>
                        </div>

                        {/* Services */}
                        <div className="mb-4">
                          <p
                            className={`text-sm font-semibold ${
                              getCurrentTemplate().textColor
                            } mb-2`}
                          >
                            Services :
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {businessCardData.services.map((service, index) => (
                              <span
                                key={index}
                                className={`px-2 py-1 rounded-full text-xs ${
                                  getCurrentTemplate().textColor ===
                                  "text-white"
                                    ? "bg-white bg-opacity-20 text-white"
                                    : "bg-gray-200 text-gray-800"
                                }`}
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Availability */}
                        <div className="flex items-center space-x-2">
                          <Clock
                            className={`w-4 h-4 ${
                              getCurrentTemplate().textColor
                            } opacity-80`}
                          />
                          <span
                            className={`text-sm ${
                              getCurrentTemplate().textColor
                            } opacity-90`}
                          >
                            {businessCardData.availability}
                          </span>
                        </div>
                      </div>

                      {/* QR Code Area */}
                      <div className="absolute top-4 right-4">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                          <QrCode className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Actions disponibles :
                    </h3>

                    {/* Download vCard */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Télécharger vCard
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Téléchargez la carte de visite au format vCard pour
                        l'ajouter à vos contacts
                      </p>
                      <button
                        onClick={generateVCard}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Télécharger vCard</span>
                      </button>
                    </div>

                    {/* Share */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Partager
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Partagez cette carte de visite avec d'autres personnes
                      </p>
                      <button
                        onClick={shareCard}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Partager</span>
                      </button>
                    </div>

                    {/* Copy Contact Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Copier les informations
                      </h4>
                      <div className="space-y-3">
                        {[
                          {
                            label: "Téléphone",
                            value: businessCardData.phone,
                            field: "phone",
                          },
                          {
                            label: "Email",
                            value: businessCardData.email,
                            field: "email",
                          },
                          {
                            label: "Site web",
                            value: businessCardData.website,
                            field: "website",
                          },
                        ].map((item) => (
                          <div
                            key={item.field}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {item.label}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.value}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                copyToClipboard(item.value, item.field)
                              }
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              {copiedField === item.field ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                              <span className="text-sm">
                                {copiedField === item.field
                                  ? "Copié !"
                                  : "Copier"}
                              </span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Contacter directement
                      </h4>
                      <div className="flex space-x-3">
                        <a
                          href={`tel:${businessCardData.phone}`}
                          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Appeler</span>
                        </a>
                        <a
                          href={`mailto:${businessCardData.email}`}
                          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </a>
                        <a
                          href={`https://wa.me/${businessCardData.phone.replace(
                            /[^0-9]/g,
                            ""
                          )}`}
                          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>
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

export default VirtualBusinessCard;
