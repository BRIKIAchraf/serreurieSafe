import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, CheckCircle, BarChart3, Award } from "lucide-react";

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
  category: string;
  description?: string;
}

const ImmersivePolls: React.FC = () => {
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
          color: "bg-[#FF6B00]",
        },
        {
          id: "4",
          text: "Très bien",
          votes: 67,
          percentage: 34,
          color: "bg-[#FF8C1A]",
        },
        {
          id: "3",
          text: "Bien",
          votes: 28,
          percentage: 14,
          color: "bg-[#FFB84D]",
        },
        {
          id: "2",
          text: "Moyen",
          votes: 12,
          percentage: 6,
          color: "bg-[#FFD36B]",
        },
        {
          id: "1",
          text: "Mauvais",
          votes: 2,
          percentage: 1,
          color: "bg-[#D72600]",
        },
      ],
      totalVotes: 198,
      category: "Satisfaction",
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
          color: "bg-[#D72600]",
        },
        {
          id: "installation",
          text: "Installation de serrures",
          votes: 98,
          percentage: 26,
          color: "bg-[#FF6B00]",
        },
        {
          id: "maintenance",
          text: "Maintenance préventive",
          votes: 76,
          percentage: 20,
          color: "bg-[#FF8C1A]",
        },
        {
          id: "consultation",
          text: "Conseil en sécurité",
          votes: 61,
          percentage: 16,
          color: "bg-[#FFD36B]",
        },
      ],
      totalVotes: 380,
      category: "Services",
      description: "Découvrez nos services les plus demandés",
    },
    {
      id: "improvement",
      question: "Que pourrions-nous améliorer ?",
      type: "text",
      options: [],
      totalVotes: 0,
      category: "Amélioration",
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
      const newVotes = isMultiple
        ? currentVotes.includes(optionId)
          ? currentVotes.filter((id) => id !== optionId)
          : [...currentVotes, optionId]
        : [optionId];
      return { ...prev, [pollId]: newVotes };
    });
    setShowResults((prev) => ({ ...prev, [pollId]: true }));
  };

  const handleTextSubmit = (pollId: string) => {
    if (textResponse[pollId]?.trim()) {
      console.log(`Text response for ${pollId}:`, textResponse[pollId]);
      setTextResponse((prev) => ({ ...prev, [pollId]: "" }));
    }
  };

  const renderPoll = (poll: Poll) => {
    const userVote = userVotes[poll.id] || [];
    const hasVoted = userVote.length > 0;
    const showPollResults = showResults[poll.id];

    return (
      <motion.div
        key={poll.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 border border-[#FF6B00]/30 rounded-2xl p-6 shadow-lg backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-[#D72600] mb-2">
          {poll.question}
        </h3>
        <p className="text-sm text-gray-700 mb-4">{poll.description}</p>

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
              className="w-full px-4 py-3 bg-white border border-[#FF6B00]/60 text-[#D72600] rounded-lg placeholder-[#FF8C1A] focus:ring-2 focus:ring-[#FF6B00] focus:outline-none resize-none"
              rows={3}
            />
            <button
              onClick={() => handleTextSubmit(poll.id)}
              disabled={!textResponse[poll.id]?.trim()}
              className="w-full bg-gradient-to-r from-[#D72600] to-[#FF6B00] hover:opacity-90 text-white py-2 rounded-lg font-semibold transition"
            >
              Envoyer
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {poll.options.map((option) => {
              const isSelected = userVote.includes(option.id);
              return (
                <motion.button
                  key={option.id}
                  onClick={() =>
                    handleVote(poll.id, option.id, poll.type === "multiple")
                  }
                  disabled={hasVoted && poll.type === "single"}
                  whileHover={!hasVoted ? { scale: 1.02 } : {}}
                  whileTap={!hasVoted ? { scale: 0.98 } : {}}
                  className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                    isSelected
                      ? "border-[#FF6B00] bg-gradient-to-r from-[#FF6B00]/20 to-[#D72600]/20"
                      : "border-[#D72600]/30 hover:bg-[#FF6B00]/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#D72600] font-medium">
                      {option.text}
                    </span>
                    {showPollResults && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-[#D72600] font-semibold">
                          {option.percentage}%
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${option.percentage}%` }}
                            transition={{ duration: 0.8 }}
                            className={`h-2 rounded-full ${option.color}`}
                          />
                        </div>
                      </div>
                    )}
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-[#FF6B00]" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#D72600] to-[#FF6B00] bg-clip-text text-transparent"
        >
          Votre opinion compte 🔥
        </motion.h2>
        <p className="text-lg text-gray-800 mb-12 max-w-2xl mx-auto">
          Participez à nos sondages immersifs et aidez-nous à créer un meilleur
          service.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {polls.map((poll) => renderPoll(poll))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white/80 p-6 rounded-xl border border-[#FF6B00]/40 shadow">
            <BarChart3 className="w-8 h-8 mx-auto text-[#FF6B00] mb-2" />
            <h4 className="text-3xl font-bold text-[#D72600]">3</h4>
            <p className="text-sm text-gray-700">Sondages actifs</p>
          </div>
          <div className="bg-white/80 p-6 rounded-xl border border-[#D72600]/40 shadow">
            <Users className="w-8 h-8 mx-auto text-[#D72600] mb-2" />
            <h4 className="text-3xl font-bold text-[#FF6B00]">
              {polls.reduce((sum, p) => sum + p.totalVotes, 0)}+
            </h4>
            <p className="text-sm text-gray-700">Votes enregistrés</p>
          </div>
          <div className="bg-white/80 p-6 rounded-xl border border-[#FFD36B]/40 shadow">
            <Award className="w-8 h-8 mx-auto text-[#FF8C1A] mb-2" />
            <h4 className="text-3xl font-bold text-[#D72600]">4.9/5</h4>
            <p className="text-sm text-gray-700">Note moyenne</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImmersivePolls;
