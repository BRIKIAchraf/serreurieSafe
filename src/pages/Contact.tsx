import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Star,
} from "lucide-react";
import GlassCard from "../components/GlassCard";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    serviceType: "",
    preferredTime: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceTypes = [
    "Ouverture de porte",
    "Changement de serrure",
    "Installation blindage",
    "Dépannage urgent",
    "Conseil sécurité",
    "Devis personnalisé",
    "Autre",
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      details: "01 85 09 73 65",
      subtitle: "Disponible 24h/24 - 7j/7",
      action: "tel:+330185097365",
      image:
        "eps10-orange-phone-call-or-telephone-abstract-icon-isolated-on-white-background-contact-us-or-hotline-symbol-in-a-simple-flat-trendy-modern-style-for-your-website-design-logo-and-mobile-app-vector.jpg",
    },
    {
      icon: Mail,
      title: "Email",
      details: "contact@serruresafe.fr",
      subtitle: "Réponse rapide garantie",
      action: "mailto:contact@serruresafe.fr",
      image: "OIP (2).jpeg",
    },
    {
      icon: MapPin,
      title: "Zone d'intervention",
      details: "Paris & Île-de-France",
      subtitle: "Déplacement gratuit",
      action: null,
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    },
    {
      icon: Clock,
      title: "Horaires",
      details: "24h/24 - 7j/7",
      subtitle: "Service d'urgence permanent",
      action: null,
      image: "OIP (4).jpeg",
    },
  ];

  const faq = [
    {
      question: "Combien coûte une intervention d'urgence ?",
      answer:
        "Nos tarifs sont transparents et annoncés avant intervention. Le devis est gratuit et sans engagement.",
    },
    {
      question: "Intervenez-vous vraiment 24h/24 ?",
      answer:
        "Oui, notre service d’urgence est disponible 24h/24 et 7j/7, y compris les week-ends et jours fériés.",
    },
    {
      question: "Puis-je avoir un devis avant l’intervention ?",
      answer:
        "Absolument ! Nous établissons toujours un devis gratuit et détaillé avant de commencer les travaux.",
    },
    {
      question: "Vos serrures sont-elles certifiées ?",
      answer:
        "Toutes nos serrures sont certifiées A2P et répondent aux normes de sécurité les plus strictes.",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Envoi message contact:", formData);
      // await sendEmail('template_contact', formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          serviceType: "",
          preferredTime: "",
        });
      }, 3000);
    } catch (error) {
      alert("Une erreur est survenue lors de l'envoi. Veuillez nous contacter par téléphone.");
    }
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* 🧱 HERO SECTION corrigée */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 md:pt-40 pb-20">
        <img
          src="OIP (1).jpeg"
          alt="Technicien serrurier réaliste"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-2xl text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Contactez votre serrurier <br />
              <span className="text-orange-400">Serrure Safe</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Intervention rapide 24h/24 et 7j/7 à Paris et en Île-de-France.
              Obtenez un devis gratuit en quelques clics.
            </p>
            <a
              href="tel:+33185097365"
              className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 hover:shadow-lg transition-transform"
            >
              <Phone className="w-5 h-5 inline-block mr-2" />
              Appeler maintenant
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl text-white mt-10 md:mt-0 max-w-md shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-4 text-center md:text-left">
              Obtenez une réponse en moins de 15 min
            </h3>
            <p className="text-gray-300 mb-6 text-sm text-center md:text-left">
              Remplissez le formulaire ou contactez-nous directement par
              téléphone ou WhatsApp.
            </p>
            <div className="flex flex-col space-y-3">
              <a
                href="tel:+33185097365"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg flex items-center justify-center font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" /> Urgence serrurerie
              </a>
              <a
                href="mailto:contact@serruresafe.fr"
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-lg flex items-center justify-center font-semibold"
              >
                <Mail className="w-5 h-5 mr-2" /> Envoyer un email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🧩 INFOS CONTACT AVEC IMAGES */}
      <section className="py-20 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactInfo.map((info, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <img
              src={info.image}
              alt={info.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="relative z-10 p-8 text-white">
              <info.icon className="w-10 h-10 text-orange-400 mb-3" />
              <h3 className="text-2xl font-bold mb-1">{info.title}</h3>
              <p className="text-lg font-semibold">{info.details}</p>
              <p className="text-sm text-gray-300 mb-3">{info.subtitle}</p>
              {info.action && (
                <a
                  href={info.action}
                  className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm hover:bg-orange-500 hover:border-orange-500 transition"
                >
                  Contacter
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </section>

      {/* 🧾 FORMULAIRE & MAP */}
      <section className="py-20 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-10"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center text-orange-600">
            <MessageCircle className="w-8 h-8 mr-3" /> Envoyez-nous un message
          </h2>

          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-green-600">
                Message envoyé !
              </h3>
              <p className="text-gray-600">
                Nous vous répondrons sous 2 heures maximum.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Nom complet *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Téléphone *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:outline-none"
              />

              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:outline-none"
              >
                <option value="">Type de service</option>
                {serviceTypes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Décrivez votre demande..."
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:outline-none resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
              >
                <Send className="w-5 h-5 inline-block mr-2" /> Envoyer
              </button>
            </form>
          )}
        </motion.div>

        {/* MAP + URGENCE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.94722687195!2d2.277020999999999!3d48.8588897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis!5e0!3m2!1sfr!2sfr!4v1635789012345"
              width="100%"
              height="380"
              loading="lazy"
              className="w-full h-full border-none"
              title="Carte Serrure Safe"
            />
          </div>

          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-2xl text-center shadow-xl">
            <Phone className="w-10 h-10 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-2">Urgence 24h/24</h3>
            <p className="text-white/90 mb-4">
              Besoin d’une intervention immédiate ? Appelez-nous !
            </p>
            <a
              href="tel:+33185097365"
              className="inline-block bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
            >
              01 85 09 73 65
            </a>
          </div>
        </motion.div>
      </section>

      {/* 🧠 FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 text-gray-800"
          >
            Questions{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              fréquentes
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {faq.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex items-start space-x-3">
                  <Star className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
