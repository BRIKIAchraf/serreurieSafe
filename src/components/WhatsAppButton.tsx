import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Phone,
  Clock,
  CheckCircle,
  Send,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { useSounds } from "./SoundManager";

interface WhatsAppMessage {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
}

const WhatsAppButton: React.FC = () => {
  const { playUnlockSound, playKeySound } = useSounds();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<WhatsAppMessage[]>([
    {
      id: "1",
      type: "agent",
      content:
        "👋 Bonjour ! Je suis l’assistant Serrure Safe. Comment puis-je vous aider ? 🔐",
      timestamp: new Date(),
      status: "read",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [agentOnline, setAgentOnline] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const quickReplies = [
    "J’ai besoin d’une intervention urgente 🔧",
    "Quels sont vos tarifs ? 💰",
    "Je veux prendre rendez-vous 📅",
    "Où êtes-vous situés ? 📍",
  ];

  const phoneNumber = "33783867650"; // ✅ ton numéro WhatsApp officiel
  const defaultMessage = encodeURIComponent(
    "Bonjour 👋, j’ai besoin d’une intervention de serrurerie."
  );

  // === Ouvre WhatsApp natif ===
  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${defaultMessage}`,
      "_blank"
    );
  };

  // === Envoi de message simulé ===
  const sendMessage = () => {
    if (!message.trim()) return;
    playKeySound();

    const userMessage: WhatsAppMessage = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Merci pour votre message ! Un technicien Serrure Safe va vous répondre sous peu. 🔒",
        "Je comprends. Pouvez-vous m’indiquer votre ville ou votre arrondissement ? 📍",
        "Nos tarifs sont transparents et sur devis. Voulez-vous un devis express ? 🧾",
        "D’accord ! Souhaitez-vous être rappelé dans les 5 prochaines minutes ? 📞",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const agentMessage: WhatsAppMessage = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: randomResponse,
        timestamp: new Date(),
        status: "delivered",
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
      playUnlockSound();
    }, 1200); // plus rapide que 2s
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
    setTimeout(() => sendMessage(), 300);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  // 🔔 Auto ouverture après 10 secondes
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // 🔔 Réduire badge de notification
  useEffect(() => {
    if (isOpen) setUnreadCount(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && messages.length > 1) setUnreadCount((prev) => prev + 1);
  }, [messages, isOpen]);

  return (
    <>
      {/* === Bouton flottant WhatsApp === */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        onMouseEnter={playUnlockSound}
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
            >
              {unreadCount}
            </motion.div>
          )}
        </div>
      </motion.button>

      {/* === Fenêtre de chat WhatsApp === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`fixed bottom-6 left-6 z-50 ${
              isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
            } bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Serrure Safe</h3>
                  <div className="flex items-center space-x-1 text-sm">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        agentOnline ? "bg-green-300" : "bg-gray-400"
                      }`}
                    />
                    <span>{agentOnline ? "En ligne" : "Hors ligne"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:text-gray-200"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contenu du chat */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 h-80">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        msg.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          msg.type === "user"
                            ? "bg-green-500 text-white"
                            : "bg-white text-gray-900 border border-gray-200"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs opacity-70">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="p-3 bg-gray-50 border-t">
                    <p className="text-sm text-gray-600 mb-2">
                      Réponses rapides :
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="text-left text-xs bg-white border border-gray-200 hover:border-green-500 hover:bg-green-50 p-2 rounded-lg transition"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t bg-white">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Écrivez un message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={openWhatsApp}
                      className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Ouvrir dans WhatsApp</span>
                    </button>

                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Réponse en ~2 min</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppButton;
