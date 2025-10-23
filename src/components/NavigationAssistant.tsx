import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  MessageCircle,
  X,
  Send,
  Phone,
  MapPin,
  Clock,
  Shield,
  HelpCircle,
  ChevronRight,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  Navigation,
  Target,
  Zap,
} from "lucide-react";
import { useSounds } from "./SoundManager";

interface AssistantMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actions?: AssistantAction[];
}

interface AssistantAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  type: "primary" | "secondary";
}

const NavigationAssistant: React.FC = () => {
  const { t } = useTranslation();
  const { playUnlockSound, playKeySound } = useSounds();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Bonjour ! Je suis votre assistant virtuel Serrure Safe. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
      suggestions: [
        "J'ai besoin d'une intervention urgente",
        "Je veux connaître vos tarifs",
        "Où êtes-vous situés ?",
        "Comment prendre rendez-vous ?",
      ],
      actions: [
        {
          id: "emergency",
          label: "Urgence",
          icon: <Phone className="w-4 h-4" />,
          action: () => handleQuickAction("emergency"),
          type: "primary",
        },
        {
          id: "location",
          label: "Localisation",
          icon: <MapPin className="w-4 h-4" />,
          action: () => handleQuickAction("location"),
          type: "secondary",
        },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const quickActions = [
    {
      id: "emergency",
      label: "Urgence 24h/24",
      icon: <Phone className="w-5 h-5" />,
      color: "bg-red-500 hover:bg-red-600",
      action: () => {
        addMessage("user", "J'ai besoin d'une intervention urgente");
        setTimeout(() => {
          addAssistantResponse("emergency");
        }, 1000);
      },
    },
    {
      id: "pricing",
      label: "Tarifs",
      icon: <Star className="w-5 h-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => {
        addMessage("user", "Je veux connaître vos tarifs");
        setTimeout(() => {
          addAssistantResponse("pricing");
        }, 1000);
      },
    },
    {
      id: "location",
      label: "Localisation",
      icon: <MapPin className="w-5 h-5" />,
      color: "bg-green-500 hover:bg-green-600",
      action: () => {
        addMessage("user", "Où êtes-vous situés ?");
        setTimeout(() => {
          addAssistantResponse("location");
        }, 1000);
      },
    },
    {
      id: "appointment",
      label: "Rendez-vous",
      icon: <Clock className="w-5 h-5" />,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => {
        addMessage("user", "Comment prendre rendez-vous ?");
        setTimeout(() => {
          addAssistantResponse("appointment");
        }, 1000);
      },
    },
  ];

  const addMessage = (
    type: "user" | "assistant",
    content: string,
    suggestions?: string[],
    actions?: AssistantAction[]
  ) => {
    const newMessage: AssistantMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      suggestions,
      actions,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addAssistantResponse = (type: string) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      let response = "";
      let suggestions: string[] = [];
      let actions: AssistantAction[] = [];

      switch (type) {
        case "emergency":
          response =
            "🚨 **Intervention d'urgence disponible 24h/24 !**\n\n• Temps d'intervention : < 30 minutes\n• Devis gratuit\n• Équipe mobile certifiée\n• Paiement sécurisé\n\nAppelez-nous immédiatement au **01 23 45 67 89**";
          suggestions = [
            "Appeler maintenant",
            "Demander un devis",
            "Voir nos services",
          ];
          actions = [
            {
              id: "call",
              label: "Appeler",
              icon: <Phone className="w-4 h-4" />,
              action: () => window.open("tel:+33123456789"),
              type: "primary",
            },
          ];
          break;

        case "pricing":
          response =
            "💰 **Nos tarifs transparents :**\n\n• Ouverture de porte : 80-120€\n• Installation serrure : 150-300€\n• Renforcement porte : 200-500€\n• Intervention urgente : +50€\n\n*Tarifs variables selon complexité et matériel*";
          suggestions = [
            "Demander un devis",
            "Voir nos services",
            "Prendre RDV",
          ];
          break;

        case "location":
          response =
            "📍 **Zone d'intervention :**\n\n• Paris et banlieue (75, 92, 93, 94)\n• Temps d'intervention : 15-45 min\n• Équipes mobiles 24h/24\n• Service client réactif";
          suggestions = ["Voir la carte", "Calculer le temps", "Prendre RDV"];
          break;

        case "appointment":
          response =
            "📅 **Prendre rendez-vous :**\n\n• **Urgence** : Appelez le 01 23 45 67 89\n• **Programmé** : Formulaire en ligne\n• **Devis gratuit** : Sans engagement\n• **Disponibilité** : 7j/7, 24h/24";
          suggestions = [
            "Appeler maintenant",
            "Formulaire RDV",
            "Demander devis",
          ];
          actions = [
            {
              id: "call",
              label: "Appeler",
              icon: <Phone className="w-4 h-4" />,
              action: () => window.open("tel:+33123456789"),
              type: "primary",
            },
            {
              id: "form",
              label: "Formulaire",
              icon: <CheckCircle className="w-4 h-4" />,
              action: () => (window.location.href = "/contact"),
              type: "secondary",
            },
          ];
          break;

        default:
          response =
            "Je comprends votre demande. Laissez-moi vous aider avec des informations plus spécifiques.";
          suggestions = ["Urgence", "Tarifs", "Localisation", "Rendez-vous"];
      }

      addMessage("assistant", response, suggestions, actions);
    }, 1500);
  };

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find((a) => a.id === actionId);
    if (action) {
      action.action();
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage("user", inputValue);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      addAssistantResponse("general");
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    addMessage("user", suggestion);
    setInputValue("");

    setTimeout(() => {
      addAssistantResponse("general");
    }, 1000);
  };

  const handleActionClick = (action: AssistantAction) => {
    action.action();
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        onMouseEnter={playUnlockSound}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Assistant Chat Modal */}
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Assistant Serrure Safe</h3>
                      <p className="text-sm opacity-90">Guide virtuel</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 bg-gray-50 border-b">
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className={`${action.color} text-white p-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-md`}
                    >
                      {action.icon}
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>

                      {/* Suggestions */}
                      {message.suggestions &&
                        message.suggestions.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  handleSuggestionClick(suggestion)
                                }
                                className="block w-full text-left text-sm bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}

                      {/* Actions */}
                      {message.actions && message.actions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.actions.map((action) => (
                            <button
                              key={action.id}
                              onClick={() => handleActionClick(action)}
                              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                action.type === "primary"
                                  ? "bg-white text-blue-600 hover:bg-gray-100"
                                  : "bg-blue-500 text-white hover:bg-blue-600"
                              }`}
                            >
                              {action.icon}
                              <span>{action.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
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
                    <div className="bg-gray-100 p-3 rounded-2xl">
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

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Tapez votre message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationAssistant;
