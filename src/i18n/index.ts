import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      // Navigation
      'nav.home': 'Accueil',
      'nav.services': 'Services',
      'nav.emergency': 'Urgence 24h/24',
      'nav.about': 'À propos',
      'nav.gallery': 'Réalisations',
      'nav.blog': 'Actualités',
      'nav.contact': 'Contact',
      
      // Hero Section
      'hero.title': 'Serrurier à Paris',
      'hero.subtitle': 'Le réflexe sécurité',
      'hero.description': 'Expert en serrurerie et sécurisation depuis 15 ans. Intervention rapide 24h/24 pour tous vos besoins de sécurité à Paris et en Île-de-France.',
      'hero.cta.call': '01 23 45 67 89',
      'hero.cta.services': 'Nos Services',
      
      // Services
      'services.title': 'Nos Services',
      'services.description': 'Des solutions complètes pour tous vos besoins en serrurerie et sécurité',
      'services.door_opening': 'Ouverture de porte',
      'services.lock_installation': 'Installation serrures',
      'services.door_reinforcement': 'Blindage de porte',
      'services.emergency': 'Dépannage urgent',
      
      // Emergency
      'emergency.title': 'Urgence 24h/24',
      'emergency.subtitle': 'Intervention rapide sur Paris et banlieue',
      'emergency.call_now': 'Appeler maintenant',
      'emergency.average_time': 'Temps d\'intervention moyen',
      'emergency.less_than_30min': '< 30 minutes',
      
      // About
      'about.title': 'À propos de Serrure Safe',
      'about.subtitle': 'Votre partenaire de confiance en serrurerie et sécurité depuis plus de 15 ans',
      
      // Contact
      'contact.title': 'Contactez-nous',
      'contact.subtitle': 'Une question ? Un devis ? Une urgence ? Notre équipe est à votre écoute 24h/24',
      'contact.phone': 'Téléphone',
      'contact.email': 'Email',
      'contact.address': 'Zone d\'intervention',
      'contact.hours': 'Horaires',
      
      // Common
      'common.call': 'Appeler',
      'common.contact': 'Contact',
      'common.quote': 'Devis gratuit',
      'common.emergency': 'Urgence',
      'common.available_24_7': 'Disponible 24h/24 - 7j/7',
      'common.paris_area': 'Paris et Île-de-France',
      'common.free_quote': 'Devis gratuit',
      'common.certified': 'Certifié A2P',
      'common.experience': 'ans d\'expérience',
      'common.satisfied_clients': 'Clients satisfaits',
      'common.guarantee': 'Satisfaction garantie',
    }
  },
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.emergency': 'Emergency 24/7',
      'nav.about': 'About',
      'nav.gallery': 'Gallery',
      'nav.blog': 'News',
      'nav.contact': 'Contact',
      
      // Hero Section
      'hero.title': 'Locksmith in Paris',
      'hero.subtitle': 'Your security reflex',
      'hero.description': 'Expert in locksmithing and security for 15 years. Fast 24/7 intervention for all your security needs in Paris and Île-de-France.',
      'hero.cta.call': '01 23 45 67 89',
      'hero.cta.services': 'Our Services',
      
      // Services
      'services.title': 'Our Services',
      'services.description': 'Complete solutions for all your locksmithing and security needs',
      'services.door_opening': 'Door opening',
      'services.lock_installation': 'Lock installation',
      'services.door_reinforcement': 'Door reinforcement',
      'services.emergency': 'Emergency repair',
      
      // Emergency
      'emergency.title': 'Emergency 24/7',
      'emergency.subtitle': 'Fast intervention in Paris and suburbs',
      'emergency.call_now': 'Call now',
      'emergency.average_time': 'Average intervention time',
      'emergency.less_than_30min': '< 30 minutes',
      
      // About
      'about.title': 'About Serrure Safe',
      'about.subtitle': 'Your trusted partner in locksmithing and security for over 15 years',
      
      // Contact
      'contact.title': 'Contact us',
      'contact.subtitle': 'A question? A quote? An emergency? Our team is available 24/7',
      'contact.phone': 'Phone',
      'contact.email': 'Email',
      'contact.address': 'Service area',
      'contact.hours': 'Hours',
      
      // Common
      'common.call': 'Call',
      'common.contact': 'Contact',
      'common.quote': 'Free quote',
      'common.emergency': 'Emergency',
      'common.available_24_7': 'Available 24/7',
      'common.paris_area': 'Paris and Île-de-France',
      'common.free_quote': 'Free quote',
      'common.certified': 'A2P Certified',
      'common.experience': 'years of experience',
      'common.satisfied_clients': 'Satisfied clients',
      'common.guarantee': 'Satisfaction guaranteed',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;