import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Shield, Award, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Ouverture de porte', href: '/services' },
        { label: 'Installation serrures', href: '/services' },
        { label: 'Blindage de porte', href: '/services' },
        { label: 'Dépannage urgent', href: '/emergency' },
        { label: 'Conseil sécurité', href: '/services' },
      ]
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'À propos', href: '/about' },
        { label: 'Nos réalisations', href: '/gallery' },
        { label: 'Actualités', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Urgence 24h/24', href: '/emergency' },
        { label: 'Devis gratuit', href: '/contact' },
        { label: 'Zone d\'intervention', href: '/contact' },
        { label: 'FAQ', href: '/contact' },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-8">
              <div>
                <img
                  src="/WhatsApp_Image_2025-10-17_à_15.12.18_29f18722-removebg-preview.png"
                  alt="Serrure Safe"
                  className="h-12 w-auto mb-6"
                />
                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                  Votre expert en sécurité à Paris. Interventions rapides 24h/24 pour tous vos besoins 
                  en serrurerie et sécurisation. Plus de 15 ans d'expérience au service de votre sécurité.
                </p>
              </div>

              {/* Certifications */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-orange-400">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Certifié A2P</span>
                </div>
                <div className="flex items-center space-x-2 text-orange-400">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-medium">15 ans d'expérience</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-400" />
                  <div>
                    <a href="tel:+33123456789" className="text-white font-medium hover:text-orange-400 transition-colors">
                      01 23 45 67 89
                    </a>
                    <p className="text-gray-400 text-sm">Urgences 24h/24 - 7j/7</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-orange-400" />
                  <a href="mailto:contact@serruresafe.fr" className="text-white hover:text-orange-400 transition-colors">
                    contact@serruresafe.fr
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-white">Paris et Île-de-France</p>
                    <p className="text-gray-400 text-sm">Intervention rapide</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-white">Service 24h/24 - 7j/7</p>
                    <p className="text-gray-400 text-sm">Disponible tous les jours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-white font-semibold text-lg mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.href}
                          className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency CTA */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 mb-12">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Urgence serrurerie ?
                </h3>
                <p className="text-orange-100">
                  Intervention rapide 24h/24 - Devis gratuit par téléphone
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+33123456789"
                  className="flex items-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>01 23 45 67 89</span>
                </a>
                <Link
                  to="/emergency"
                  className="flex items-center space-x-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                >
                  <span>Demande urgente</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Serrure Safe. Tous droits réservés.
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                CGV
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                Plan du site
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;