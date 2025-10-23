import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  BarChart3,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  Star,
  ThumbsUp,
  MessageCircle,
  Zap,
  Award,
  Target,
  PieChart,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import GlassCard from "./GlassCard";

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
  color: string;
}

interface Poll {
  id: string;
  question: string;
  type: "single" | "multiple" | "rating" | "text";
  options: PollOption[];
  totalVotes: number;
  isActive: boolean;
  category: string;
  icon: React.ReactNode;
  description?: string;
}

const InteractivePolls: React.FC = () => {
  const { t } = useTranslation();
  const [activePoll, setActivePoll] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [textResponse, setTextResponse] = useState<Record<string, string>>({});

  const polls: Poll[] = [
    {
      id: "satisfaction",
      question: "Comment évaluez-vous notre service ?",
      type: "rating",
      options: [
        {
          id: "5",
          text: "Excellent",
          votes: 89,
          percentage: 45,
          color: "bg-green-500",
        },
        {
          id: "4",
          text: "Très bien",
          votes: 67,
          percentage: 34,
          color: "bg-blue-500",
        },
        {
          id: "3",
          text: "Bien",
          votes: 28,
          percentage: 14,
          color: "bg-yellow-500",
        },
        {
          id: "2",
          text: "Moyen",
          votes: 12,
          percentage: 6,
          color: "bg-orange-500",
        },
        {
          id: "1",
          text: "Mauvais",
          votes: 2,
          percentage: 1,
          color: "bg-red-500",
        },
      ],
      totalVotes: 198,
      isActive: true,
      category: "Satisfaction",
      icon: <Star className="w-5 h-5" />,
      description: "Aidez-nous à améliorer notre service",
    },
    {
      id: "preferred_service",
      question: "Quel service vous intéresse le plus ?",
      type: "multiple",
      options: [
        {
          id: "emergency",
          text: "Intervention d'urgence",
          votes: 145,
          percentage: 38,
          color: "bg-red-500",
        },
        {
          id: "installation",
          text: "Installation de serrures",
          votes: 98,
          percentage: 26,
          color: "bg-blue-500",
        },
        {
          id: "maintenance",
          text: "Maintenance préventive",
          votes: 76,
          percentage: 20,
          color: "bg-green-500",
        },
        {
          id: "consultation",
          text: "Conseil en sécurité",
          votes: 61,
          percentage: 16,
          color: "bg-purple-500",
        },
      ],
      totalVotes: 380,
      isActive: true,
      category: "Services",
      icon: <Target className="w-5 h-5" />,
      description: "Découvrez nos services les plus demandés",
    },
    {
      id: "response_time",
      question: "Quel temps d'intervention préférez-vous ?",
      type: "single",
      options: [
        {
          id: "immediate",
          text: "Immédiat (< 15 min)",
          votes: 78,
          percentage: 42,
          color: "bg-red-500",
        },
        {
          id: "fast",
          text: "Rapide (15-30 min)",
          votes: 89,
          percentage: 48,
          color: "bg-orange-500",
        },
        {
          id: "normal",
          text: "Normal (30-60 min)",
          votes: 19,
          percentage: 10,
          color: "bg-yellow-500",
        },
      ],
      totalVotes: 186,
      isActive: true,
      category: "Urgence",
      icon: <Clock className="w-5 h-5" />,
      description: "Votre préférence pour les interventions",
    },
    {
      id: "improvement",
      question: "Que pourrions-nous améliorer ?",
      type: "text",
      options: [],
      totalVotes: 0,
      isActive: true,
      category: "Amélioration",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Vos suggestions nous aident à progresser",
    },
  ];

  const handleVote = (
    pollId: string,
    optionId: string,
    isMultiple: boolean = false
  ) => {
    setUserVotes((prev) => {
      const currentVotes = prev[pollId] || [];

      if (isMultiple) {
        const newVotes = currentVotes.includes(optionId)
          ? currentVotes.filter((id) => id !== optionId)
          : [...currentVotes, optionId];
        return { ...prev, [pollId]: newVotes };
      } else {
        return { ...prev, [pollId]: [optionId] };
      }
    });

    setShowResults((prev) => ({ ...prev, [pollId]: true }));
  };

  const handleTextSubmit = (pollId: string) => {
    if (textResponse[pollId]?.trim()) {
      // Simulate API call
      console.log(`Text response for ${pollId}:`, textResponse[pollId]);
      setTextResponse((prev) => ({ ...prev, [pollId]: "" }));
    }
  };

  const getPollIcon = (category: string) => {
    switch (category) {
      case "Satisfaction":
        return <Star className="w-5 h-5 text-yellow-500" />;
      case "Services":
        return <Target className="w-5 h-5 text-blue-500" />;
      case "Urgence":
        return <Clock className="w-5 h-5 text-red-500" />;
      case "Amélioration":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      default:
        return <BarChart3 className="w-5 h-5 text-gray-500" />;
    }
  };

  const renderPoll = (poll: Poll) => {
    const userVote = userVotes[poll.id] || [];
    const hasVoted = userVote.length > 0;
    const showPollResults = showResults[poll.id];

    return (
      <motion.div
        key={poll.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getPollIcon(poll.category)}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {poll.question}
              </h3>
              <p className="text-sm text-gray-600">{poll.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{poll.totalVotes} votes</span>
          </div>
        </div>

        {poll.type === "text" ? (
          <div className="space-y-4">
            <textarea
              value={textResponse[poll.id] || ""}
              onChange={(e) =>
                setTextResponse((prev) => ({
                  ...prev,
                  [poll.id]: e.target.value,
                }))
              }
              placeholder="Partagez vos suggestions..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            <button
              onClick={() => handleTextSubmit(poll.id)}
              disabled={!textResponse[poll.id]?.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Envoyer
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {poll.options.map((option) => {
              const isSelected = userVote.includes(option.id);
              const isVoted = hasVoted && isSelected;

              return (
                <motion.button
                  key={option.id}
                  onClick={() =>
                    handleVote(poll.id, option.id, poll.type === "multiple")
                  }
                  disabled={hasVoted && poll.type === "single"}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : hasVoted
                      ? "border-gray-200 bg-gray-50"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  } ${
                    hasVoted && poll.type === "single"
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  whileHover={!hasVoted ? { scale: 1.02 } : {}}
                  whileTap={!hasVoted ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {option.text}
                    </span>

                    {showPollResults && (
                      <div className="flex items-center space-x-3">
                        <div className="text-sm text-gray-600">
                          {option.votes} votes ({option.percentage}%)
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${option.percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className={`h-2 rounded-full ${option.color}`}
                          />
                        </div>
                      </div>
                    )}

                    {isVoted && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </motion.button>
              );
            })}

            {hasVoted && !showPollResults && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() =>
                  setShowResults((prev) => ({ ...prev, [poll.id]: true }))
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Voir les résultats
              </motion.button>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BarChart3 className="w-4 h-4" />
            <span>Sondages interactifs</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Votre avis compte pour{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              nous
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Participez à nos sondages et aidez-nous à améliorer nos services
          </p>
        </ScrollReveal>

        {/* Polls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {polls.map((poll) => renderPoll(poll))}
        </div>

        {/* Statistics */}
        <ScrollReveal>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Statistiques des sondages
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {polls.length}
                </div>
                <p className="text-gray-600">Sondages actifs</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {polls.reduce((sum, poll) => sum + poll.totalVotes, 0)}+
                </div>
                <p className="text-gray-600">Votes totaux</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
                <p className="text-gray-600">Satisfaction</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  4.9/5
                </div>
                <p className="text-gray-600">Note moyenne</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Votre opinion nous importe
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Continuez à participer à nos sondages pour nous aider à vous
              offrir le meilleur service
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Participer aux sondages
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default InteractivePolls;
