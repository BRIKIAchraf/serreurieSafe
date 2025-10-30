import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  MessageCircle,
  X,
  Phone,
  Clock,
  CheckCircle,
  Zap,
  Star,
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
  const { t } = useTranslation();
  const { playUnlockSound, playKeySound } = useSounds();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<WhatsAppMessage[]>([
    {
      id: "1",
      type: "agent",
      content:
        "Bonjour ! 👋 Je suis l'assistant Serrure Safe. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
      status: "read",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [agentOnline, setAgentOnline] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const quickReplies = [
    "J'ai besoin d'une intervention urgente",
    "Je veux connaître vos tarifs",
    "Comment prendre rendez-vous ?",
    "Où êtes-vous situés ?",
  ];

  const sendMessage = () => {
    if (!message.trim()) return;

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

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        "Merci pour votre message ! Un de nos techniciens va vous répondre dans les plus brefs délais. 🛠️",
        "Parfait ! Je vais vous mettre en contact avec notre équipe d'urgence. Quel est votre numéro de téléphone ?",
        "Excellent ! Nos tarifs sont transparents. Voulez-vous que je vous envoie notre grille tarifaire ?",
        "Parfait ! Je peux vous aider à planifier un rendez-vous. Quand souhaitez-vous que nous intervenions ?",
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
    }, 2000);
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
  };

  const openWhatsApp = () => {
    const phoneNumber = "331 85 09 73 65";
    const message = encodeURIComponent(
      "Bonjour, j'ai besoin d'une intervention de serrurerie."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount((prev) => prev + 1);
    }
  }, [messages, isOpen]);

  return (
    <>
      {/* Floating WhatsApp Button */}
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
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
            >
              {unreadCount}
            </motion.div>
          )}
        </div>
      </motion.button>

      {/* WhatsApp Chat Widget */}
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
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Serrure Safe</h3>
                  <div className="flex items-center space-x-1 text-sm">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        agentOnline ? "bg-green-400" : "bg-gray-400"
                      }`}
                    />
                    <span>{agentOnline ? "En ligne" : "Hors ligne"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 h-80">
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
                          {msg.type === "user" && msg.status && (
                            <div className="flex items-center space-x-1">
                              {msg.status === "sent" && (
                                <CheckCircle className="w-3 h-3" />
                              )}
                              {msg.status === "delivered" && (
                                <div className="flex space-x-0.5">
                                  <CheckCircle className="w-3 h-3" />
                                  <CheckCircle className="w-3 h-3 -ml-1" />
                                </div>
                              )}
                              {msg.status === "read" && (
                                <div className="flex space-x-0.5 text-blue-300">
                                  <CheckCircle className="w-3 h-3" />
                                  <CheckCircle className="w-3 h-3 -ml-1" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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
                  <div className="p-4 bg-gray-50 border-t">
                    <p className="text-sm text-gray-600 mb-3">
                      Réponses rapides :
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="text-left text-xs bg-white border border-gray-200 hover:border-green-500 hover:bg-green-50 p-2 rounded-lg transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Tapez votre message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={openWhatsApp}
                      className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Appeler directement</span>
                    </button>

                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Réponse en 2 min</span>
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
