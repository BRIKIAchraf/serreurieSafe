import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Video, Calendar } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  availability: string;
  expertise: string;
  contact: string;
  icon: React.ElementType;
}

const team: TeamMember[] = [
  {
    name: "Laura M.",
    role: "Conseillère clientèle",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
    availability: "Répond en 5 minutes",
    expertise: "Devis express & planification",
    contact: "laura@serruresafe.fr",
    icon: Phone,
  },
  {
    name: "Samuel D.",
    role: "Architecte sécurité",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80",
    availability: "Visio 30 min sur rendez-vous",
    expertise: "Projets blindage & access control",
    contact: "samuel@serruresafe.fr",
    icon: Video,
  },
  {
    name: "Inès P.",
    role: "Support technique",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
    availability: "Chat en direct 9h-19h",
    expertise: "Suivi d'intervention & SAV",
    contact: "ines@serruresafe.fr",
    icon: MessageSquare,
  },
  {
    name: "Mathieu L.",
    role: "Planificateur urgence",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=1000&q=80",
    availability: "Sécurise l'arrivée technicien",
    expertise: "Coordination flotte mobile",
    contact: "urgence@serruresafe.fr",
    icon: Calendar,
  },
];

const ContactTeamSpotlight: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1d4ed8,transparent)] opacity-80" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200">
            Votre équipe Serrure Safe
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Des interlocuteurs identifiés, disponibles en photo
          </h2>
          <p className="mt-4 text-base text-slate-200 sm:text-lg">
            Chaque membre de l'équipe relation client est présenté avec son
            expertise, ses horaires et son canal de contact privilégié. Choisissez
            la personne idéale selon votre besoin.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur"
              >
                <div className="relative h-64">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/60" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-center justify-between text-sm text-white/80">
                      <span className="rounded-full bg-white/20 px-3 py-1">
                        {member.role}
                      </span>
                      <span>{member.availability}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-white">
                      {member.name}
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 p-6 text-sm text-slate-100">
                  <p>{member.expertise}</p>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2">
                    <Icon className="h-4 w-4 text-blue-200" />
                    <span>{member.contact}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactTeamSpotlight;
