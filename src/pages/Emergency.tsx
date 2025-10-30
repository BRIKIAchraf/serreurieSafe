import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Phone, Shield, CheckCircle, Zap, MapPin } from "lucide-react";
import EmergencyResponseShowcase from "../components/EmergencyResponseShowcase";
import "leaflet/dist/leaflet.css";

const Emergency: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    urgencyType: "",
    description: "",
  });

  const urgencyTypes = [
    { value: "locked-out", label: "Porte claquée / Clés perdues", icon: "🔑" },
    { value: "broken-lock", label: "Serrure cassée", icon: "🛠️" },
    { value: "burglary", label: "Tentative d'effraction", icon: "🚨" },
    { value: "key-stuck", label: "Clé cassée dans serrure", icon: "🗝️" },
    { value: "other", label: "Autre urgence", icon: "❗" },
  ];

  const guarantees = [
    {
      title: "Intervention rapide",
      description: "Arrivée sur site en moins de 30 minutes",
      icon: Zap,
    },
    {
      title: "Devis transparent",
      description: "Prix annoncé avant intervention",
      icon: CheckCircle,
    },
    {
      title: "Sans casse",
      description: "Ouverture sans dégâts dans 95% des cas",
      icon: Shield,
    },
    {
      title: "Disponible 24h/24",
      description: "Service d'urgence tous les jours",
      icon: Clock,
    },
  ];

  const interventionZones = [
    {
      name: "Paris 1er",
      image: "arrondissement-paris-1068x601.jpg",
    },
    {
      name: "Paris 8e",
      image: "bb2fda69b8bb647d0e617a9531ce3e41.avif",
    },
    {
      name: "Boulogne-Billancourt",
      image: "OIP (10).jpeg",
    },
    {
      name: "Saint-Denis",
      image: "basilica-saint-denis-photo.webp",
    },
    {
      name: "Versailles",
      image: "OIP (9).jpeg",
    },
    {
      name: "Neuilly-sur-Seine",
      image: "neuilly-sur-seine.jpg",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Demande d'urgence:", formData);
  };

  return (
    <>
      <title>Urgence Serrurerie 24h/24 à Paris - Dépannage rapide</title>
      <meta
        name="description"
        content="Serrurier Paris urgence 24h/24 - Intervention rapide en moins de 30 min. Ouverture de porte, serrure cassée, effraction. Devis clair et sans casse."
      />

      <main className="pt-20 bg-white text-gray-900 overflow-hidden">
        {/* === HERO === */}
        <section
          id="urgence-serrurerie"
          className="relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 animate-[zoomSlow_20s_ease-in-out_infinite_alternate]"
            style={{
              backgroundImage:
                "url('1737739270-serrures-connectees-le-guide-ultime-pour-faire-le-bon-choix-1024x585.jpg')",
            }}
          ></div>

          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-orange-900/60 to-transparent"></div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-white px-6 sm:px-8 max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg leading-tight">
              Serrurier d’Urgence 24h/24 à Paris
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-200 font-light">
              <span className="text-orange-300 font-medium">
                Dépannage express
              </span>{" "}
              — Porte bloquée, serrure cassée ou effraction ? Intervention en{" "}
              <span className="font-semibold text-orange-400">30 minutes</span>{" "}
              partout à Paris et en banlieue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+33123456789"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold shadow-lg hover:scale-105 transition-all"
              >
                <Phone className="w-6 h-6 mr-2" /> Appeler maintenant
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/20 border border-white/40 backdrop-blur-md text-white text-lg font-semibold hover:bg-white/30 hover:text-yellow-300 transition-all"
              >
                🧰 Demander un devis
              </a>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-orange-400"
          >
            <MapPin className="w-10 h-10 animate-pulse" />
          </motion.div>
        </section>

        {/* === ZONES D’INTERVENTION (sans carte) === */}
        <section className="py-20 px-6 bg-gradient-to-b from-orange-50 to-white">
          <div className="max-w-7xl mx-auto text-center mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Zones d’intervention
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nos serruriers professionnels interviennent rapidement dans tout
              Paris et ses environs. Cliquez sur une zone pour plus de détails.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {interventionZones.map((zone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-orange-100 cursor-pointer"
              >
                <img
                  src={zone.image}
                  alt={zone.name}
                  className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 text-left text-white">
                  <h3 className="text-xl font-semibold">{zone.name}</h3>
                  <p className="text-sm text-orange-300">
                    Intervention en moins de 30 min
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* === SHOWCASE === */}
        <EmergencyResponseShowcase />

        {/* === FORMULAIRE === */}
        <section
          id="contact"
          className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-orange-100"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center md:justify-start">
                <Phone className="w-7 h-7 text-orange-600 mr-3" />
                Demande d’intervention
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Votre nom complet"
                  required
                  className="p-3 rounded-xl border border-gray-300 focus:border-orange-500 w-full"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Téléphone"
                  type="tel"
                  required
                  className="p-3 rounded-xl border border-gray-300 focus:border-orange-500 w-full"
                />
              </div>

              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Adresse d’intervention"
                required
                className="mt-6 p-3 rounded-xl border border-gray-300 focus:border-orange-500 w-full"
              />

              <select
                name="urgencyType"
                value={formData.urgencyType}
                onChange={handleInputChange}
                required
                className="mt-6 p-3 rounded-xl border border-gray-300 focus:border-orange-500 w-full"
              >
                <option value="">Type d'urgence</option>
                {urgencyTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.icon} {t.label}
                  </option>
                ))}
              </select>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Décrivez votre situation..."
                rows={4}
                className="mt-6 p-3 rounded-xl border border-gray-300 focus:border-orange-500 w-full resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full mt-8 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Envoyer la demande
              </button>
            </motion.form>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">
                Nos garanties serrurerie
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {guarantees.map((g, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start bg-white rounded-xl shadow p-4 border border-orange-100"
                  >
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mr-4">
                      <g.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800">{g.title}</h4>
                      <p className="text-gray-600 text-sm">{g.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Emergency;
