import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  User,
  MessageCircle,
  X,
} from "lucide-react";
import { useSounds } from "./SoundManager"; // ✅ Import du gestionnaire de sons

const VirtualBusinessCard: React.FC = () => {
  const { playUnlockSound } = useSounds(); // ✅ Hook pour le son
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<
    "warm" | "dark" | "light"
  >("warm");

  const businessCardData = {
    name: "Pierre Martin",
    title: "Technicien Certifié A2P",
    company: "Serrure Safe",
    phone: "+33 6 12 34 56 78",
    email: "pierre.martin@serruresafe.fr",
    website: "https://www.serruresafe.fr",
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
      bg: "bg-gradient-to-br from-[#E83E00] to-[#F45C23]",
      text: "text-white",
    },
    {
      id: "dark",
      name: "Anthracite",
      bg: "bg-gradient-to-br from-[#2B2B2B] to-[#1A1A1A]",
      text: "text-white",
    },
    {
      id: "light",
      name: "Clair / Minimal",
      bg: "bg-gradient-to-br from-white to-gray-100 border border-gray-200",
      text: "text-gray-900",
    },
  ];

  const getCurrentTemplate = () =>
    templates.find((t) => t.id === selectedTemplate) || templates[0];

  // ✅ Fonction de partage universelle
  const shareCard = async () => {
    playUnlockSound(); // 🔊 son au partage
    const shareData = {
      title: `${businessCardData.name} - ${businessCardData.company}`,
      text: `Contactez ${businessCardData.name} pour vos besoins de serrurerie 🔐`,
      url: businessCardData.website,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Erreur de partage :", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(businessCardData.website);
        alert("Lien copié dans le presse-papiers !");
      } catch {
        alert("Impossible de partager ce lien.");
      }
    }
  };

  // ✅ Télécharger la carte de contact
  const generateVCard = () => {
    playUnlockSound(); // 🔊 son au téléchargement
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

  return (
    <>
      {/* 🔹 Bouton flottant */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playUnlockSound(); // 🔊 au clic
          setIsOpen(true);
        }}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-[#E83E00] to-[#F45C23] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all"
      >
        <User className="w-6 h-6" />
      </motion.button>

      {/* 🔹 Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
            >
              {/* HEADER */}
              <div className="bg-gradient-to-r from-[#E83E00] to-[#F45C23] p-4 flex justify-between items-center text-white">
                <h2 className="text-xl font-semibold">
                  Carte de visite — Serrure Safe
                </h2>
                <button
                  onClick={() => {
                    playUnlockSound(); // 🔊 fermeture
                    setIsOpen(false);
                  }}
                  className="text-2xl font-bold hover:text-gray-200"
                >
                  <X />
                </button>
              </div>

              {/* CONTENU */}
              <div className="p-6 space-y-6">
                {/* Sélecteur de style */}
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800">
                    Choisissez un style :
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {templates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelectedTemplate(t.id as any);
                          playUnlockSound(); // 🔊 changement de thème
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          selectedTemplate === t.id
                            ? "bg-[#E83E00] text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grille principale */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* === Carte de visite === */}
                  <motion.div
                    key={selectedTemplate}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative p-6 rounded-2xl ${
                      getCurrentTemplate().bg
                    } ${getCurrentTemplate().text} shadow-xl backdrop-blur-md`}
                  >
                    {/* Profil */}
                    <div className="flex items-center mb-4 gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">
                          {businessCardData.name}
                        </h3>
                        <p className="text-sm opacity-90">
                          {businessCardData.title}
                        </p>
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold mb-3">
                      {businessCardData.company}
                    </h4>

                    {/* Coordonnées */}
                    <div className="space-y-2 text-sm sm:text-base">
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" /> {businessCardData.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" /> {businessCardData.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />{" "}
                        {businessCardData.address}
                      </p>
                      <p className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />{" "}
                        <a
                          href={businessCardData.website}
                          className="underline hover:opacity-80"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {businessCardData.website}
                        </a>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />{" "}
                        {businessCardData.availability}
                      </p>
                    </div>

                    {/* Services */}
                    <div className="mt-4">
                      <h5 className="font-semibold mb-1 text-sm">Services :</h5>
                      <div className="flex flex-wrap gap-2">
                        {businessCardData.services.map((srv, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-full text-xs bg-white/20 backdrop-blur-sm"
                          >
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* QR code */}
                    <div className="absolute bottom-4 right-4 bg-white/20 rounded-lg p-3 backdrop-blur-md">
                      <QrCode className="w-10 h-10 text-white" />
                    </div>

                    {/* Étoiles */}
                    <div className="absolute top-4 right-4 flex space-x-1">
                      {[...Array(businessCardData.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* === Actions === */}
                  <div className="space-y-4">
                    {/* Télécharger */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Télécharger la vCard
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Ajoutez la carte à vos contacts.
                      </p>
                      <button
                        onClick={generateVCard}
                        className="w-full bg-[#E83E00] hover:bg-[#F45C23] text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                      >
                        <Download className="w-4 h-4" /> Télécharger
                      </button>
                    </div>

                    {/* Partager */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Partager la carte
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Envoyez la carte à un contact.
                      </p>
                      <button
                        onClick={shareCard}
                        className="w-full bg-[#F45C23] hover:bg-[#E83E00] text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                      >
                        <Share2 className="w-4 h-4" /> Partager
                      </button>
                    </div>

                    {/* Contact direct */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Contact direct
                      </h4>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href={`tel:${businessCardData.phone}`}
                          onClick={playUnlockSound}
                          className="flex items-center justify-center gap-2 bg-[#E83E00] hover:bg-[#F45C23] text-white px-4 py-2 rounded-lg transition"
                        >
                          <Phone className="w-4 h-4" /> Appeler
                        </a>
                        <a
                          href={`mailto:${businessCardData.email}`}
                          onClick={playUnlockSound}
                          className="flex items-center justify-center gap-2 bg-[#F45C23] hover:bg-[#E83E00] text-white px-4 py-2 rounded-lg transition"
                        >
                          <Mail className="w-4 h-4" /> Email
                        </a>
                        <a
                          href={`https://wa.me/${businessCardData.phone.replace(
                            /[^0-9]/g,
                            ""
                          )}`}
                          onClick={playUnlockSound}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white px-4 py-2 rounded-lg transition"
                        >
                          <MessageCircle className="w-4 h-4" /> WhatsApp
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
