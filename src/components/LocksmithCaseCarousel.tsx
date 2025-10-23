import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Clock, Award } from "lucide-react";

interface CaseStudy {
  title: string;
  client: string;
  sector: string;
  location: string;
  duration: string;
  result: string;
  summary: string;
  image: string;
  gallery: string[];
}

const caseStudies: CaseStudy[] = [
  {
    title: "Remise en sécurité d'un concept-store premium",
    client: "Maison Altair",
    sector: "Retail haut de gamme",
    location: "Paris 3e",
    duration: "Intervention de nuit - 3h20",
    result:
      "Porte blindée ré-équilibrée, serrure 7 points remplacée, contrôle d'accès temporaire par badges invités.",
    summary:
      "Effraction réalisée en soirée. Nos équipes ont évacué les éclats de métal, sécurisé les vitrines, remplacé le cylindre et reprogrammé les badges du personnel avant la réouverture du lendemain.",
    image:
      "https://images.unsplash.com/photo-1598791318477-1c3e5c3145d2?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1604079628040-94301bb21b07?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580894749427-26b1bd47f0d9?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    title: "Modernisation des accès d'un immeuble bourgeois",
    client: "Copropriété Victor-Hugo",
    sector: "Résidentiel premium",
    location: "Neuilly-sur-Seine",
    duration: "Projet planifié - 4 jours",
    result:
      "Contrôle d'accès connecté, badges nominaux, portail motorisé et monitoring à distance.",
    summary:
      "Suite à plusieurs intrusions, nous avons réalisé un audit complet et installé une solution globale : badges sécurisés, module visiophone, commande smartphone et journal des ouvertures accessible au syndic.",
    image:
      "https://images.unsplash.com/photo-1600585154340-0ef3c08dcdb6?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501183102275-4f876f2b9903?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    title: "Sauvegarde d'un centre de données",
    client: "Datacenter Sequoia",
    sector: "Infrastructure IT critique",
    location: "Saint-Denis",
    duration: "Urgence critique - 2h05",
    result:
      "Blocage temporaire neutralisé, serrure biométrique remise en service, protocole multi-facteurs rétabli.",
    summary:
      "Incident majeur à l'accès principal (clavier biométrique défaillant). Une équipe dédiée est intervenue avec pièces de rechange, reprogrammation des facteurs biométriques et tests de redondance pour éviter un arrêt d'exploitation.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580894740564-55f0923360e7?auto=format&fit=crop&w=1000&q=80",
    ],
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
  }),
};

const LocksmithCaseCarousel: React.FC = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const caseCount = caseStudies.length;

  const currentIndex = useMemo(
    () => ((page % caseCount) + caseCount) % caseCount,
    [page, caseCount]
  );

  const paginate = (newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  const goToIndex = (index: number) => {
    setPage(([prevPage]) => {
      const normalizedPrev =
        ((prevPage % caseCount) + caseCount) % caseCount;
      if (index === normalizedPrev) {
        return [prevPage, 0];
      }
      const delta = index - normalizedPrev;
      const direction = delta > 0 ? 1 : -1;
      return [prevPage + delta, direction];
    });
  };

  const currentCase = caseStudies[currentIndex];

  return (
    <section className="relative bg-slate-900 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a,transparent)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              Cas clients photographiques
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Histoires vraies, preuves à l'appui
            </h2>
            <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
              Chaque diapositive restitue une mission Serrure Safe fondée sur
              des images et des données de terrain : temps d'intervention,
              contexte client, bénéfices obtenus. Faites défiler pour explorer
              nos réalisations.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => paginate(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10"
              aria-label="Étude précédente"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10"
              aria-label="Étude suivante"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-800/40 shadow-2xl backdrop-blur">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2"
            >
              <div className="relative h-72 overflow-hidden rounded-2xl sm:h-80 lg:h-full">
                <motion.img
                  src={currentCase.image}
                  alt={currentCase.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200/90">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                      <MapPin className="h-4 w-4" />
                      {currentCase.location}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                      <Clock className="h-4 w-4" />
                      {currentCase.duration}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                      <Award className="h-4 w-4" />
                      {currentCase.sector}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
                    {currentCase.client}
                  </div>
                  <h3 className="text-2xl font-semibold sm:text-3xl">
                    {currentCase.title}
                  </h3>
                  <p className="text-sm text-slate-200 sm:text-base">
                    {currentCase.summary}
                  </p>
                </div>

                <motion.div
                  key={currentCase.result}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-5 text-sm text-emerald-100 sm:text-base"
                >
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-300">
                    Résultat obtenu
                  </h4>
                  <p>{currentCase.result}</p>
                </motion.div>

                <div className="flex gap-3">
                  {currentCase.gallery.map((image) => (
                    <div
                      key={image}
                      className="relative h-16 w-20 overflow-hidden rounded-xl border border-white/10"
                    >
                      <img
                        src={image}
                        alt={currentCase.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {caseStudies.map((item, index) => (
            <button
              key={item.title}
              onClick={() => goToIndex(index)}
              className={`h-2 w-10 rounded-full transition ${
                index === currentIndex
                  ? "bg-white"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Afficher le cas ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocksmithCaseCarousel;
