import React from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { Phone, Clock, Shield, Star, MapPin, Check } from 'lucide-react';
import { contactInfo } from '../../config/seo';

const LandingPageCity: React.FC = () => {
    const { city } = useParams<{ city: string }>();
    const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : 'Paris';

    // Conversion tracking placeholder
    const handleCallClick = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/LABEL',
            });
        }
    };

    return (
        <>
            <SEO
                title={`Serrurier ${cityName} - Dépannage Urgence 24/7 | Arrivée 30 min`}
                description={`Urgence Serrurier ${cityName} ? Ouverture de porte 39€, Changement de serrure. Agréé Assurances. Intervention immédiate 24/7. Appelez le ${contactInfo.phone}.`}
                noindex={true} // CRITICAL for Ads landing pages
            />

            <div className="bg-white">
                {/* Sticky Header for Mobile */}
                <div className="sticky top-0 z-50 bg-orange-600 text-white p-4 flex justify-between items-center md:hidden shadow-lg">
                    <span className="font-bold text-lg">Serrurier {cityName}</span>
                    <a
                        href={`tel:${contactInfo.phone}`}
                        onClick={handleCallClick}
                        className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold text-sm animate-pulse"
                    >
                        {contactInfo.phone}
                    </a>
                </div>

                {/* Hero Section */}
                <div className="relative bg-gray-900 text-white overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                            alt="Serrurier Urgence"
                            className="w-full h-full object-cover opacity-40"
                        />
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
                        <div className="inline-flex items-center bg-orange-600 px-4 py-1 rounded-full text-sm font-semibold mb-6">
                            <Clock className="w-4 h-4 mr-2" /> Arrivée en 30 minutes à {cityName}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                            Serrurier Urgence <span className="text-orange-500">{cityName}</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
                            Porte claquée ? Clé perdue ? Serrure cassée ?<br />
                            <span className="text-white font-bold">Intervention immédiate 24h/24 et 7j/7</span>
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href={`tel:${contactInfo.phone}`}
                                onClick={handleCallClick}
                                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-xl font-bold rounded-md text-white bg-orange-600 hover:bg-orange-700 shadow-lg transform hover:scale-105 transition-transform"
                            >
                                <Phone className="mr-2 h-6 w-6" />
                                APPELER MAINTENANT
                            </a>
                        </div>
                        <p className="mt-4 text-sm text-gray-400">Devis gratuit • Agréé Assurances • Prix annoncés</p>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-gray-100 py-8 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="flex flex-col items-center">
                                <Shield className="h-8 w-8 text-orange-600 mb-2" />
                                <span className="font-semibold text-gray-900">Agréé Assurances</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Star className="h-8 w-8 text-orange-600 mb-2" />
                                <span className="font-semibold text-gray-900">4.9/5 Avis Google</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Clock className="h-8 w-8 text-orange-600 mb-2" />
                                <span className="font-semibold text-gray-900">Dispo 24/7</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <MapPin className="h-8 w-8 text-orange-600 mb-2" />
                                <span className="font-semibold text-gray-900">Artisan Local</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services & Pricing */}
                <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nos Tarifs Transparents à {cityName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow bg-white">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Ouverture de Porte</h3>
                            <p className="text-4xl font-bold text-orange-600 mb-4">dès 39€</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-gray-600"><Check className="h-5 w-5 text-green-500 mr-2" /> Porte claquée</li>
                                <li className="flex items-center text-gray-600"><Check className="h-5 w-5 text-green-500 mr-2" /> Sans casse (radio)</li>
                                <li className="flex items-center text-gray-600"><Check className="h-5 w-5 text-green-500 mr-2" /> Devis gratuit</li>
                            </ul>
                            <a href={`tel:${contactInfo.phone}`} onClick={handleCallClick} className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800">Commander</a>
                        </div>
                        {/* Card 2 */}
                        <div className="border-2 border-orange-500 rounded-2xl p-8 shadow-xl bg-white relative transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold">LE PLUS POPULAIRE</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Changement Serrure</h3>
                            <p className="text-4xl font-bold text-orange-600 mb-4">dès 79€</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-gray-600"><Check className="h-5 w-5 text-green-500 mr-2" /> Cylindre haute sécurité</li>
                                <li className="flex items-center text-gray-600"><Check className="h-5 w-5 text-green-500 mr-2" /> Toutes marques</li>
                                <li className="flex items-center text-gray-600"><Check className="h-5 w-5 text-green-500 mr-2" /> Garantie 2 ans</li>
                            </ul>
                            <a href={`tel:${contactInfo.phone}`} onClick={handleCallClick} className="block w-full text-center bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700">Commander</a>
                        </div>
                        {/* Card 3 */}
                        <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow bg-white">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Blindage / Sécurité</h3>
                            <p className="text-4xl font-bold text-orange-600 mb-4">Sur Devis</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-gray-600"><Check className="h-5 w-5 text-green-500 mr-2" /> Porte blindée</li>
                                <li className="flex items-center text-gray-600"><Check className="h-5 w-5 text-green-500 mr-2" /> Cornières anti-pinces</li>
                                <li className="flex items-center text-gray-600"><Check className="h-5 w-5 text-green-500 mr-2" /> Installation A2P</li>
                            </ul>
                            <a href={`tel:${contactInfo.phone}`} onClick={handleCallClick} className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800">Demander un devis</a>
                        </div>
                    </div>
                </div>

                {/* Map & Zones */}
                <div className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Zone d'intervention : {cityName} et alentours</h2>
                        <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-xl overflow-hidden shadow-lg">
                            {/* Placeholder for Map - In production use Google Maps Embed API */}
                            <div className="w-full h-96 flex items-center justify-center bg-gray-200 text-gray-500">
                                <MapPin className="h-12 w-12 mb-2" />
                                <span className="text-xl">Carte Google Maps centrée sur {cityName}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer NAP */}
                <div className="bg-gray-900 text-white py-12 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">{contactInfo.name}</h3>
                        <p className="mb-2">{contactInfo.address.street}, {contactInfo.address.zip} {contactInfo.address.city}</p>
                        <p className="mb-6"><a href={`tel:${contactInfo.phone}`} className="text-orange-500 font-bold text-xl">{contactInfo.phone}</a></p>
                        <p className="text-sm text-gray-500">© {new Date().getFullYear()} Serrurerie Safe. Tous droits réservés. Mentions Légales.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPageCity;
