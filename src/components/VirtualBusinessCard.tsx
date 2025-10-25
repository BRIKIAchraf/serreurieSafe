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
  QrCode,
  Copy,
  Check,
  User,
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
  const { playUnlockSound } = useSounds();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<
    "warm" | "dark" | "light"
  >("warm");

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
      id: "warm",
      name: "Rouge / Orange (Serrure Safe)",
      bgColor: "bg-gradient-to-br from-[#E83E00] to-[#F45C23]",
      textColor: "text-white",
      accent: "bg-[#F45C23]",
    },
    {
      id: "dark",
      name: "Anthracite",
      bgColor: "bg-gradient-to-br from-[#2B2B2B] to-[#1A1A1A]",
      textColor: "text-white",
      accent: "bg-[#E83E00]",
    },
    {
      id: "light",
      name: "Clair / Minimal",
      bgColor: "bg-gradient-to-br from-[#FFFFFF] to-[#F9F9F9]",
      textColor: "text-gray-900",
      accent: "bg-[#E83E00]",
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

  const getCurrentTemplate = () =>
    templates.find((t) => t.id === selectedTemplate) || templates[0];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-[#E83E00] to-[#F45C23] hover:from-[#F45C23] hover:to-[#E83E00] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        onMouseEnter={playUnlockSound}
      >
        <User className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#E83E00] to-[#F45C23] text-white p-4 sm:p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">
                      Carte de visite Serrure Safe
                    </h2>
                    <p className="text-orange-100 text-sm sm:text-base">
                      Le réflexe sécurité 🔐
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white text-2xl hover:text-gray-200 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                {/* Template Selector */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                    Choisissez un style :
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id as any)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedTemplate === template.id
                            ? "bg-[#E83E00] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Card Preview */}
                  <motion.div
                    key={selectedTemplate}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative rounded-xl shadow-lg overflow-hidden ${
                      getCurrentTemplate().bgColor
                    }`}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                        <div>
                          <h4
                            className={`text-xl sm:text-2xl font-bold ${
                              getCurrentTemplate().textColor
                            }`}
                          >
                            {businessCardData.name}
                          </h4>
                          <p
                            className={`text-sm sm:text-lg ${
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

                      <p
                        className={`text-sm sm:text-lg font-semibold mb-4 ${
                          getCurrentTemplate().textColor
                        }`}
                      >
                        {businessCardData.company}
                      </p>

                      <div className="space-y-2 sm:space-y-3 mb-6">
                        <div className="flex items-center space-x-3">
                          <Phone
                            className={`w-4 h-4 ${
                              getCurrentTemplate().textColor
                            }`}
                          />
                          <span
                            className={`text-sm sm:text-base ${
                              getCurrentTemplate().textColor
                            }`}
                          >
                            {businessCardData.phone}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail
                            className={`w-4 h-4 ${
                              getCurrentTemplate().textColor
                            }`}
                          />
                          <span
                            className={`text-sm sm:text-base ${
                              getCurrentTemplate().textColor
                            }`}
                          >
                            {businessCardData.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin
                            className={`w-4 h-4 ${
                              getCurrentTemplate().textColor
                            }`}
                          />
                          <span
                            className={`text-sm sm:text-base ${
                              getCurrentTemplate().textColor
                            }`}
                          >
                            {businessCardData.address}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Globe
                            className={`w-4 h-4 ${
                              getCurrentTemplate().textColor
                            }`}
                          />
                          <span
                            className={`text-sm sm:text-base ${
                              getCurrentTemplate().textColor
                            }`}
                          >
                            {businessCardData.website}
                          </span>
                        </div>
                      </div>

                      <p
                        className={`text-sm font-semibold mb-2 ${
                          getCurrentTemplate().textColor
                        }`}
                      >
                        Services :
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {businessCardData.services.map((service, i) => (
                          <span
                            key={i}
                            className={`px-2 py-1 rounded-full text-xs ${
                              getCurrentTemplate().textColor === "text-white"
                                ? "bg-white bg-opacity-20 text-white"
                                : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2 mt-4">
                        <Clock
                          className={`w-4 h-4 ${
                            getCurrentTemplate().textColor
                          }`}
                        />
                        <span
                          className={`text-xs sm:text-sm ${
                            getCurrentTemplate().textColor
                          }`}
                        >
                          {businessCardData.availability}
                        </span>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Actions */}
                  <div className="space-y-5 sm:space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Télécharger la vCard
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Ajoutez la carte à vos contacts.
                      </p>
                      <button
                        onClick={generateVCard}
                        className="flex items-center justify-center space-x-2 w-full bg-[#E83E00] hover:bg-[#F45C23] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Télécharger</span>
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Partager la carte
                      </h4>
                      <button
                        onClick={shareCard}
                        className="flex items-center justify-center space-x-2 w-full bg-[#F45C23] hover:bg-[#E83E00] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Partager</span>
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Contact direct
                      </h4>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href={`tel:${businessCardData.phone}`}
                          className="flex items-center justify-center space-x-2 bg-[#E83E00] hover:bg-[#F45C23] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Appeler</span>
                        </a>
                        <a
                          href={`mailto:${businessCardData.email}`}
                          className="flex items-center justify-center space-x-2 bg-[#F45C23] hover:bg-[#E83E00] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </a>
                        <a
                          href={`https://wa.me/${businessCardData.phone.replace(
                            /[^0-9]/g,
                            ""
                          )}`}
                          className="flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20b857] text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
