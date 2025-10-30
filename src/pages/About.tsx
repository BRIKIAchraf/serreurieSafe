import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Award, CheckCircle, Star, Target } from "lucide-react";
import GlassCard from "../components/GlassCard";
import LocksmithHeritageTimeline from "../components/LocksmithHeritageTimeline";

const About: React.FC = () => {
  const stats = [
    { number: "15+", label: "Années d'expérience", icon: Star },
    { number: "1000+", label: "Clients satisfaits", icon: Shield },
    { number: "24/7", label: "Disponibilité", icon: Shield },
    { number: "100%", label: "Satisfaction garantie", icon: Award },
  ];

  const certifications = [
    "Certification A2P (Assurance Prévention Protection)",
    "Agrément assurance pour interventions d'urgence",
    "Formation continue en technologies de verrouillage avancées",
    "Respect des normes européennes EN 12209",
    "Garantie décennale sur tous nos travaux",
    "Membre agréé de la Chambre des Métiers et de l'Artisanat",
  ];

  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  return (
    <div className="pt-20 bg-gray-50">
      {/* 🧱 HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80"
          alt="Serrurier au travail"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            À propos de <span className="text-orange-400">Serrure Safe</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Plus de 15 ans d’expérience dans la serrurerie et la sécurisation de
            vos biens. Votre confiance est notre priorité.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 hover:shadow-lg transition-transform"
          >
            Nous contacter
          </a>
        </motion.div>
      </section>

      {/* 🔹 STATISTIQUES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <GlassCard className="p-8 hover:shadow-xl transition">
                <stat.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🕰️ LIGNE DU TEMPS */}
      <LocksmithHeritageTimeline />

      {/* 🔸 HISTOIRE */}
      <section className="py-20 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlassCard className="p-10 bg-white shadow-xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              Notre{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Histoire
              </span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Fondée en 2009, Serrure Safe est née de la passion d’un artisan
              serrurier souhaitant offrir un service fiable, humain et
              transparent.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nous avons grandi avec une seule mission : garantir votre sécurité
              et votre tranquillité d’esprit, tout en assurant des prestations
              de qualité irréprochable.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Aujourd’hui, notre équipe de serruriers experts intervient dans
              toute l’Île-de-France, en urgence ou sur rendez-vous, pour tous
              vos besoins.
            </p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80"
            alt="Équipe Serrure Safe"
            className="rounded-2xl shadow-2xl object-cover h-96 w-full"
          />
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl text-white">
            <h3 className="text-xl font-bold">Notre équipe</h3>
            <p className="text-sm text-gray-200">
              Des professionnels passionnés à votre service
            </p>
          </div>
        </motion.div>
      </section>

      {/* 🔸 SECTION INTERACTIVE : CERTIFICATIONS + MISSION */}
      <section className="relative py-32 overflow-hidden">
        <img
          src="Engagement-qualite-1.webp"
          alt="Sécurité"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-16"
          >
            Notre <span className="text-orange-400">Engagement & Qualité</span>
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Bloc Certifications */}
            <motion.div
              layout
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-left cursor-pointer transition hover:bg-white/20"
              onClick={() => toggleExpand("certifications")}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold flex items-center space-x-2">
                  <Award className="w-7 h-7 text-orange-400" />
                  <span>Certifications & Garanties</span>
                </h3>
                <motion.span
                  animate={{ rotate: expanded === "certifications" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-orange-400 text-2xl"
                >
                  ▼
                </motion.span>
              </div>

              <AnimatePresence>
                {expanded === "certifications" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 space-y-3 text-gray-200"
                  >
                    {certifications.map((item, i) => (
                      <p key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                        <span>{item}</span>
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Bloc Mission */}
            <motion.div
              layout
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-left cursor-pointer transition hover:bg-white/20"
              onClick={() => toggleExpand("mission")}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold flex items-center space-x-2">
                  <Target className="w-7 h-7 text-orange-400" />
                  <span>Notre Mission</span>
                </h3>
                <motion.span
                  animate={{ rotate: expanded === "mission" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-orange-400 text-2xl"
                >
                  ▼
                </motion.span>
              </div>

              <AnimatePresence>
                {expanded === "mission" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 text-gray-200 space-y-4 leading-relaxed"
                  >
                    <p>
                      Offrir un service de serrurerie honnête, rapide et
                      sécurisé à tous nos clients, tout en maintenant des
                      standards d’excellence artisanale.
                    </p>
                    <p>
                      Serrure Safe, c’est avant tout une promesse : celle de la
                      fiabilité, de la transparence et de la sérénité.
                    </p>
                    <span className="inline-block mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold">
                      Certifié A2P & Agréé Assurance
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
