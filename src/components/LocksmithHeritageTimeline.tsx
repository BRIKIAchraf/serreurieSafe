import React from "react";
import { motion } from "framer-motion";

interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  image: string;
  badge: string;
}

const milestones: TimelineMilestone[] = [
  {
    year: "2009",
    title: "Atelier Serrurier Safe",
    description:
      "Ouverture de notre premier atelier à Paris 11e avec une ambition claire : moderniser la serrurerie traditionnelle.",
    image:
      "https://images.unsplash.com/photo-1580894897449-e1b3030e97d5?auto=format&fit=crop&w=1200&q=80",
    badge: "Fondation",
  },
  {
    year: "2014",
    title: "Brigade Urgence 24/7",
    description:
      "Mise en place d'une flotte mobile équipée d'outillage de pointe pour garantir une arrivée sous 30 minutes.",
    image:
      "https://images.unsplash.com/photo-1579389083078-4e7018379f7c?auto=format&fit=crop&w=1200&q=80",
    badge: "Intervention",
  },
  {
    year: "2018",
    title: "Lab Serrures Connectées",
    description:
      "Création d'un laboratoire domotique pour tester cylindre connecté, contrôle d'accès et intégrations smart home.",
    image:
      "https://images.unsplash.com/photo-1580894906472-6f2c78679a7d?auto=format&fit=crop&w=1200&q=80",
    badge: "Innovation",
  },
  {
    year: "2023",
    title: "Studio Sécurité Serrure Safe",
    description:
      "Equipe dédiée aux projets architecturaux : blindages design, vitrages sécurisés et serrures biométriques.",
    image:
      "https://images.unsplash.com/photo-1604079626693-3be927fe6df0?auto=format&fit=crop&w=1200&q=80",
    badge: "Architecture",
  },
];

const LocksmithHeritageTimeline: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b,transparent)]" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
            Héritage Serrure Safe
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Plus d'une décennie de réalisations photographiées
          </h2>
          <p className="mt-4 text-base text-slate-300 sm:text-lg">
            Chaque jalon est illustré par une intervention authentique : atelier
            originel, équipes mobiles, innovations connectées et projets
            architecturaux.
          </p>
        </div>

        <div className="relative grid gap-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:flex-row ${
                index % 2 === 0 ? "lg:text-right lg:pr-10" : "lg:text-left lg:pl-10"
              }`}
            >
              <div
                className={`absolute left-1/2 top-10 hidden h-6 w-6 -translate-x-1/2 rounded-full border-4 border-slate-950 bg-gradient-to-br from-orange-500 to-red-500 shadow-xl lg:block ${
                  index % 2 === 0 ? "-translate-x-[calc(50%-18rem)]" : "-translate-x-[calc(50%+18rem)]"
                }`}
              />

              <div className="relative lg:w-1/2">
                <motion.img
                  src={milestone.image}
                  alt={milestone.title}
                  className="h-64 w-full rounded-2xl object-cover shadow-xl sm:h-72 lg:h-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.35 }}
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  {milestone.badge}
                </span>
              </div>

              <div className="flex flex-col justify-center space-y-4 lg:w-1/2">
                <span className="text-sm font-semibold text-orange-300">
                  {milestone.year}
                </span>
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                  {milestone.title}
                </h3>
                <p className="text-sm text-slate-200 sm:text-base">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocksmithHeritageTimeline;
