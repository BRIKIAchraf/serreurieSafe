import React from 'react';
import { SEO } from '../components/SEO';
import { Check, Shield, Clock, Award, Phone } from 'lucide-react';
import { contactInfo } from '../config/seo';

const Pricing: React.FC = () => {
    const services = [
        {
            category: "Ouverture de Porte",
            items: [
                { name: "Porte claquée (sans casse)", price: "dès 39€", details: "Ouverture à la radio, sans endommagement" },
                { name: "Porte fermée à clé", price: "dès 79€", details: "Ouverture technique, remplacement cylindre si nécessaire" },
                { name: "Porte blindée", price: "dès 150€", details: "Intervention spécialisée, outils professionnels" },
            ]
        },
        {
            category: "Changement de Serrure",
            items: [
                { name: "Cylindre standard", price: "79-120€", details: "Pose incluse, garantie 2 ans" },
                { name: "Cylindre haute sécurité", price: "120-250€", details: "Certification A2P, anti-crochetage" },
                { name: "Serrure multipoints 3 points", price: "200-400€", details: "Installation complète, certification A2P" },
                { name: "Serrure multipoints 5 points", price: "400-800€", details: "Sécurité renforcée, agréé assurances" },
            ]
        },
        {
            category: "Blindage & Sécurité",
            items: [
                { name: "Blindage de porte simple", price: "800-1500€", details: "Renforcement structure existante" },
                { name: "Porte blindée complète", price: "1500-3500€", details: "Bloc-porte certifié, pose incluse" },
                { name: "Certification A2P BP3", price: "2500-5000€", details: "Sécurité maximale, garantie décennale" },
            ]
        }
    ];

    const majorations = [
        { period: "Nuit (20h-8h)", rate: "+30%" },
        { period: "Dimanche", rate: "+40%" },
        { period: "Jours fériés", rate: "+50%" },
    ];

    return (
        <>
            <SEO
                title="Tarifs Serrurier Paris - Prix Transparents 2025"
                description="Découvrez nos tarifs transparents de serrurerie à Paris : ouverture de porte dès 39€, changement de serrure, blindage. Devis gratuit, agréé assurances."
            />

            <div className="pt-20 bg-gray-50">
                {/* Hero */}
                <section className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                            Tarifs Transparents - Serrurerie Paris
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            Prix fixes, devis gratuit, aucune surprise. Agréé assurances.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href={`tel:${contactInfo.phone}`}
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                            >
                                <Phone className="mr-2 h-6 w-6" />
                                {contactInfo.phone}
                            </a>
                        </div>
                    </div>
                </section>

                {/* Trust Badges */}
                <section className="py-12 bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="flex flex-col items-center">
                                <Shield className="h-12 w-12 text-orange-600 mb-3" />
                                <span className="font-semibold text-gray-900">Agréé Assurances</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Award className="h-12 w-12 text-orange-600 mb-3" />
                                <span className="font-semibold text-gray-900">Certifié A2P</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Clock className="h-12 w-12 text-orange-600 mb-3" />
                                <span className="font-semibold text-gray-900">Intervention 30min</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Check className="h-12 w-12 text-orange-600 mb-3" />
                                <span className="font-semibold text-gray-900">Devis Gratuit</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Tables */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Tarifs Détaillés</h2>
                            <p className="text-xl text-gray-600">Prix TTC, pose incluse. Devis obligatoire avant intervention.</p>
                        </div>

                        <div className="space-y-12">
                            {services.map((service, idx) => (
                                <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                                        <h3 className="text-2xl font-bold text-white">{service.category}</h3>
                                    </div>
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {service.items.map((item, itemIdx) => (
                                                <div key={itemIdx} className="flex justify-between items-start border-b border-gray-200 pb-4 last:border-0">
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900 text-lg">{item.name}</h4>
                                                        <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                                                    </div>
                                                    <div className="text-right ml-4">
                                                        <span className="text-2xl font-bold text-orange-600">{item.price}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Majorations */}
                <section className="py-16 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Majorations Horaires</h3>
                        <div className="bg-gray-50 rounded-xl p-8">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-300">
                                        <th className="text-left py-3 text-gray-900 font-semibold">Période</th>
                                        <th className="text-right py-3 text-gray-900 font-semibold">Majoration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {majorations.map((maj, idx) => (
                                        <tr key={idx} className="border-b border-gray-200 last:border-0">
                                            <td className="py-3 text-gray-700">{maj.period}</td>
                                            <td className="py-3 text-right text-orange-600 font-bold">{maj.rate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Guarantees */}
                <section className="py-16 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nos Engagements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-sm">
                                <Check className="h-10 w-10 text-green-500 mb-4" />
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Devis Gratuit Obligatoire</h4>
                                <p className="text-gray-600">
                                    Aucune intervention ne commence sans votre signature du devis détaillé.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-sm">
                                <Check className="h-10 w-10 text-green-500 mb-4" />
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Tarifs Annoncés</h4>
                                <p className="text-gray-600">
                                    Pas de frais cachés ni de majoration abusive. Prix fixes et transparents.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-sm">
                                <Check className="h-10 w-10 text-green-500 mb-4" />
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Garantie 2 ans</h4>
                                <p className="text-gray-600">
                                    Toutes nos installations sont garanties pièces et main d'œuvre.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-3xl font-bold mb-6">Besoin d'un devis personnalisé ?</h3>
                        <p className="text-xl mb-8">Contactez-nous pour une estimation gratuite et sans engagement.</p>
                        <a
                            href={`tel:${contactInfo.phone}`}
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                        >
                            <Phone className="mr-2 h-6 w-6" />
                            Appeler {contactInfo.phone}
                        </a>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Pricing;
