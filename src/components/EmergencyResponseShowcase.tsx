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
      "Diagnostic instantané et préparation du matériel adapté avant le départ, pour gagner un temps précieux.",
    image: "OIP (3).jpeg",
    icon: PhoneCall,
    badge: "< 2 min",
  },
  {
    title: "Trajet optimisé",
    description:
      "Nos équipes géolocalisées utilisent l’itinéraire le plus rapide avec codes d’accès et parking anticipés.",
    image:
      "optimise-tes-trajets-urbains-avec-itineraire-google-maps-1734058089-1024x682.jpeg",
    icon: Route,
    badge: "En route",
  },
  {
    title: "Intervention sécurisée",
    description:
      "Ouverture sans casse ou sécurisation immédiate avec validation client et photos de fin de mission.",
    image: "OIP (6).jpeg",
    icon: ShieldCheck,
    badge: "Sur site",
  },
];

const EmergencyResponseShowcase: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 text-gray-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              <Timer className="h-4 w-4" />
              Chronologie d'urgence
            </span>
            <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl text-gray-900">
              Chaque minute compte : notre réponse en images
            </h2>
            <p className="text-base text-gray-600 sm:text-lg leading-relaxed">
              Découvrez la séquence complète d'une mission d'urgence — du
              premier appel à la sécurisation finale. Ces images reflètent notre
              savoir-faire et notre efficacité sur le terrain.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-semibold text-orange-700 shadow-sm">
            Temps moyen d’intervention :{" "}
            <span className="text-red-600 font-bold">27 minutes</span>
          </div>
        </div>

        {/* Steps */}
        <div className="grid gap-10 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative h-64">
                  <motion.img
                    src={step.image}
                    alt={step.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-orange-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow">
                        {step.badge}
                      </span>
                      <Icon className="h-6 w-6 text-orange-300 drop-shadow" />
                    </div>
                    <h3 className="text-2xl font-bold text-white drop-shadow">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 p-6 text-sm text-gray-700 sm:text-base leading-relaxed">
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
