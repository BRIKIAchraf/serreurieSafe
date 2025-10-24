import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ResponsiveHeader from "./ResponsiveHeader";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import EasterEgg from "./EasterEgg";
import ContactModal from "./ContactModal";
import { SoundProvider } from "./SoundManager";

const Layout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SoundProvider>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="relative z-10">
          <ResponsiveHeader />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
        <WhatsAppButton />
        <EasterEgg />
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-600 hover:to-accent-600 text-white px-4 sm:px-6 py-3 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
        >
          <span>Devis gratuit</span>
        </button>
      </div>
    </SoundProvider>
  );
};

export default Layout;
