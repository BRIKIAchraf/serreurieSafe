import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ThreeBackground from "./ThreeBackground";
import MorphingSVG from "./MorphingSVG";
import CustomCursor from "./CustomCursor";
import QuoteGenerator from "./QuoteGenerator";
import Chatbot from "./Chatbot";
import LockConfigurator from "./LockConfigurator";
import EasterEgg from "./EasterEgg";
import NavigationAssistant from "./NavigationAssistant";
import UserJourneyGuide from "./UserJourneyGuide";
import WhatsAppButton from "./WhatsAppButton";
import VirtualBusinessCard from "./VirtualBusinessCard";
import Lock3DViewer from "./Lock3DViewer";
import { SoundProvider } from "./SoundManager";

const Layout: React.FC = () => {
  return (
    <SoundProvider>
      <div className="min-h-screen relative overflow-hidden">
        <ThreeBackground />
        <MorphingSVG />
        <CustomCursor />
        <div className="relative z-10">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
        <QuoteGenerator />
        <Chatbot />
        <LockConfigurator />
        <EasterEgg />
        <UserJourneyGuide delay={4000} />
        <NavigationAssistant />
        <WhatsAppButton />
        <VirtualBusinessCard />
        <Lock3DViewer />
      </div>
    </SoundProvider>
  );
};

export default Layout;
