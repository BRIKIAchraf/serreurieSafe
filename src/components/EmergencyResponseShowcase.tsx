import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, Route, ShieldCheck, Timer } from "lucide-react";

interface ResponseStep {
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  badge: string;
}

const steps: ResponseStep[] = [
  {
    title: "Alerte immédiate",
    description:
      "Diagnostique en ligne et préparation du matériel spécialisé selon votre cas avant même le départ.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    icon: PhoneCall,
    badge: "< 2 min",
  },
  {
    title: "Trajet optimisé",
    description:
      "Notre flotte géolocalisée choisit l'itinéraire le plus rapide avec accès parking et codes d'entrée préparés.",
    image:
      "https://images.unsplash.com/photo-1465446751832-9f11e687fe82?auto=format&fit=crop&w=1200&q=80",
    icon: Route,
    badge: "En route",
  },
  {
    title: "Intervention sécurisée",
    description:
      "Ouverture sans casse ou blindage d'urgence avec traçabilité photos et validation client en fin de mission.",
    image:
      "https://images.unsplash.com/photo-1580894914517-c0c9550adb1b?auto=format&fit=crop&w=1200&q=80",
    icon: ShieldCheck,
    badge: "Sur site",
  },
];

const EmergencyResponseShowcase: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-slate-950 to-black" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200">
              <Timer className="h-4 w-4" />
              Chronologie d'urgence
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Chaque minute compte : notre réponse en images
            </h2>
            <p className="text-base text-slate-300 sm:text-lg">
              Découvrez la séquence complète d'une mission urgente, du premier
              coup de fil à la sécurisation finale. Tous les clichés proviennent
              de nos interventions récentes.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/80">
            Intervention moyenne : 27 minutes
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              >
                <div className="relative h-64">
                  <motion.img
                    src={step.image}
                    alt={step.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/60" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                        {step.badge}
                      </span>
                      <Icon className="h-6 w-6 text-red-200" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <div className="space-y-3 p-6 text-sm text-slate-200 sm:text-base">
                  <p>{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EmergencyResponseShowcase;
