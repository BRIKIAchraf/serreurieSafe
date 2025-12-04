import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { MapPin, Phone, Clock, Shield, CheckCircle } from 'lucide-react';
import { contactInfo } from '../../config/seo';

// This would ideally come from a CMS or a data file
const cityData: Record<string, { name: string; zip: string; description: string }> = {
    'paris-1': { name: 'Paris 1er', zip: '75001', description: 'Intervention rapide près du Louvre et Châtelet.' },
    'paris-2': { name: 'Paris 2ème', zip: '75002', description: 'Serrurier expert Bourse et Sentier.' },
    // ... add more districts
    'boulogne': { name: 'Boulogne-Billancourt', zip: '92100', description: 'Dépannage serrurerie à Boulogne.' },
};

const LocalPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const city = cityData[slug || ''] || {
        name: 'Paris',
        zip: '75000',
        description: 'Intervention rapide dans tout Paris et Île-de-France.'
    };

    const title = `Serrurier ${city.name} (${city.zip}) - Dépannage Urgence 30 min`;
    const description = `Besoin d'un serrurier à ${city.name} ? Ouverture de porte, changement de serrure. Artisan agréé assurances, intervention en 30 min au ${contactInfo.phone}.`;

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "Locksmith",
        "name": `Serrurerie Safe - ${city.name}`,
        "description": description,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Intervention à domicile",
            "addressLocality": city.name,
            "postalCode": city.zip,
            "addressCountry": "FR"
        },
        "areaServed": {
            "@type": "City",
            "name": city.name
        },
        "telephone": contactInfo.phone,
        "priceRange": "€€",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
            }
        ]
    };

    return (
        <>
            <SEO
                title={title}
                description={description}
                jsonLd={[localBusinessSchema]}
            />

            <div className="bg-white">
                {/* Hero Local */}
                <div className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                        <img src="https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Paris" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative max-w-7xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                            Serrurier <span className="text-orange-500">{city.name}</span> ({city.zip})
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            {city.description} Arrivée en 30 minutes garantie.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href={`tel:${contactInfo.phone}`} className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-white bg-orange-600 hover:bg-orange-700 md:text-xl">
                                <Phone className="mr-2 h-6 w-6" />
                                Appeler {contactInfo.phone}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Local Content */}
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Intervention serrurerie à {city.name}</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Notre équipe de serruriers professionnels intervient quotidiennement à <strong>{city.name}</strong> pour tous vos problèmes de serrurerie. Que vous soyez bloqué devant votre porte ou que vous souhaitiez sécuriser votre domicile, nous sommes là.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Ouverture de porte claquée ou fermée à clé</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Installation de serrure haute sécurité (A2P)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                                    <span>Blindage de porte sur mesure</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Pourquoi nous choisir à {city.name} ?</h3>
                            <div className="space-y-6">
                                <div className="flex">
                                    <Clock className="h-6 w-6 text-orange-600 mr-3" />
                                    <div>
                                        <p className="font-semibold">Rapidité</p>
                                        <p className="text-sm text-gray-500">Sur place en 30 min max</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <MapPin className="h-6 w-6 text-orange-600 mr-3" />
                                    <div>
                                        <p className="font-semibold">Proximité</p>
                                        <p className="text-sm text-gray-500">Artisans basés localement</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Shield className="h-6 w-6 text-orange-600 mr-3" />
                                    <div>
                                        <p className="font-semibold">Confiance</p>
                                        <p className="text-sm text-gray-500">Devis gratuit avant travaux</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Internal Linking (Maillage) */}
                <div className="bg-gray-100 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Zones d'intervention proches</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/serrurier-paris-1" className="text-orange-600 hover:underline">Paris 1er</Link>
                            <Link to="/serrurier-paris-2" className="text-orange-600 hover:underline">Paris 2ème</Link>
                            <Link to="/serrurier-boulogne" className="text-orange-600 hover:underline">Boulogne</Link>
                            {/* Add more links dynamically */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LocalPage;
