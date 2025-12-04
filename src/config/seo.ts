import { Helmet } from 'react-helmet-async';

export const contactInfo = {
  name: "Serrurerie Safe",
  phone: "+33123456789", // Replace with real phone
  email: "contact@serrurerie-safe.fr", // Replace with real email
  address: {
    street: "10 Rue de la Paix", // Replace with real address
    city: "Paris",
    zip: "75001",
    country: "FR"
  },
  geo: {
    lat: "48.8606",
    lon: "2.3376"
  }
};

export const socialLinks = {
  facebook: "https://facebook.com/serrureriesafe",
  instagram: "https://instagram.com/serrureriesafe",
  googleMaps: "https://maps.google.com/?cid=YOUR_CID_HERE" // Replace with real CID
};

export const defaultSEO = {
  title: "Serrurier Paris - Dépannage Urgence 24/7 | Serrurerie Safe",
  titleTemplate: "%s | Serrurerie Safe",
  description: "Serrurier Paris agréé assurances. Ouverture de porte, changement de serrure, blindage. Intervention en 30 min, devis gratuit. Disponible 24h/24 et 7j/7.",
  url: "https://serrurerie-safe.fr",
  siteName: "Serrurerie Safe",
  defaultImage: "https://serrurerie-safe.fr/default-og.jpg",
  locale: "fr_FR",
};

export const businessData = {
  "@context": "https://schema.org",
  "@type": "Locksmith",
  "name": contactInfo.name,
  "image": [
    "https://serrurerie-safe.fr/images/storefront.jpg",
    "https://serrurerie-safe.fr/images/team.jpg"
  ],
  "telephone": contactInfo.phone,
  "email": contactInfo.email,
  "url": defaultSEO.url,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": contactInfo.address.street,
    "addressLocality": contactInfo.address.city,
    "postalCode": contactInfo.address.zip,
    "addressCountry": contactInfo.address.country
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": contactInfo.geo.lat,
    "longitude": contactInfo.geo.lon
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  ],
  "sameAs": [
    socialLinks.facebook,
    socialLinks.instagram,
    socialLinks.googleMaps
  ],
  "priceRange": "€€",
  "paymentAccepted": "Cash, Credit Card",
  "currenciesAccepted": "EUR",
  "serviceType": "Locksmith"
};

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const generateBreadcrumbSchema = (items: { name: string; item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.item
  }))
});
