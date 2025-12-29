import React, { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import ResponsiveHeader from "./ResponsiveHeader";
import Footer from "./Footer";
import { SoundProvider } from "./SoundManager";
import CustomCursor from "./CustomCursor";
import QuoteGenerator from "./QuoteGenerator";
import WhatsAppButton from "./WhatsAppButton";
import VirtualBusinessCard from "./VirtualBusinessCard";
import Lock3DViewer from "./Lock3DViewer";
import LockConfigurator from "./LockConfigurator";
import Chatbot from "./Chatbot";
import UserJourneyGuide from "./UserJourneyGuide"; // 🧭 Guide virtuel

const Layout: React.FC = () => {
  const [leftOpen, setLeftOpen] = useState(true);
  const [popupContent, setPopupContent] = useState<React.ReactNode | null>(
    null
  );
  const touchStartX = useRef<number | null>(null);

  // 🔹 Swipe mobile pour ouvrir/fermer le menu latéral
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX.current;

      if (Math.abs(diff) > 60) {
        if (diff > 0 && touchStartX.current < 60) setLeftOpen(true);
        else if (diff < 0 && touchStartX.current < 120) setLeftOpen(false);
      }
      touchStartX.current = null;
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // 🔹 Gestion des popups
  const openPopup = (component: React.ReactNode) => setPopupContent(component);
  const closePopup = () => setPopupContent(null);

  return (
    <SoundProvider>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50">
        {/* ===== Contenu principal ===== */}
        <div className="relative z-10">
          <ResponsiveHeader />
          <CustomCursor />

          <main className="pb-24">
            <Outlet />
          </main>

          <Footer />
        </div>

        {/* ===== Modules additionnels ===== */}
        <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end space-y-[5px]">
          <QuoteGenerator /> {/* 💬 Devis express */}
          {/* 🧭 Guide virtuel (bouton intégré dans le composant lui-même) */}
          <UserJourneyGuide autoStart={false} />
        </div>

        {/* ===== POPUP flottant (3D, carte, chatbot...) ===== */}
        {popupContent && (
          <div
            className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-sm animate-fadeIn"
            onClick={closePopup}
          >
            <div
              className="relative w-[90vw] md:w-[70vw] lg:w-[60vw] max-h-[80vh] bg-white dark:bg-[#111] rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closePopup}
                className="absolute top-3 right-3 bg-[#E83E00] hover:bg-[#F45C23] text-white rounded-full p-2 shadow-md z-50"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="overflow-y-auto max-h-[80vh]">{popupContent}</div>
            </div>
          </div>
        )}

        {/* ===== SIDEBAR GAUCHE ===== */}
        <div
          className={`fixed top-1/2 z-50 transition-all duration-500 transform ${leftOpen ? "left-4 translate-x-0" : "-left-14 -translate-x-8"
            } -translate-y-1/2`}
        >
          <div
            className="bg-white/10 backdrop-blur-md border border-white/20
              rounded-2xl p-3 shadow-2xl flex flex-col gap-3 items-center
              transition-all duration-500 relative"
          >
            {/* Flèche toggle */}
            <button
              onClick={() => setLeftOpen(!leftOpen)}
              className="absolute right-[-18px] top-1/2 -translate-y-1/2
                         bg-gradient-to-b from-[#E83E00] to-[#F45C23]
                         text-white rounded-full w-6 h-12 flex items-center justify-center shadow-md border border-white/30"
              title={leftOpen ? "Réduire" : "Ouvrir"}
            >
              {leftOpen ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {/* === ICONES AVEC LABELS === */}
            {[
              {
                icon: "💬",
                color: "from-green-600 to-green-500",
                label: "Chat WhatsApp",
                onClick: () => openPopup(<WhatsAppButton standalone={true} />),
              },
              {
                icon: "🧱",
                color: "from-orange-600 to-orange-500",
                label: "Vue 3D serrure",
                onClick: () => openPopup(<Lock3DViewer />),
              },
              {
                icon: "⚙️",
                color: "from-blue-600 to-blue-500",
                label: "Configurateur serrure",
                onClick: () => openPopup(<LockConfigurator />),
              },
              {
                icon: "💼",
                color: "from-purple-600 to-purple-500",
                label: "Carte de visite",
                onClick: () => openPopup(<VirtualBusinessCard />),
              },
              {
                icon: "🤖",
                color: "from-amber-500 to-yellow-400",
                label: "Assistant IA (Chatbot)",
                onClick: () => openPopup(<Chatbot />),
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <button
                  onClick={item.onClick}
                  className={`bg-gradient-to-r ${item.color} text-white w-12 h-12 rounded-xl font-bold text-xl shadow-lg hover:scale-110 transition-all flex items-center justify-center`}
                  title={item.label}
                >
                  {item.icon}
                </button>

                {leftOpen && (
                  <span
                    className="absolute left-14 top-1/2 -translate-y-1/2 text-white bg-black/80 backdrop-blur-sm
                    px-3 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md"
                  >
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Animation douce */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
          }
        `}</style>
      </div>
    </SoundProvider>
  );
};

export default Layout;
