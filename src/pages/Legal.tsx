import React from 'react';
import { SEO } from '../components/SEO';

const Legal: React.FC = () => {
    return (
        <>
            <SEO
                title="Mentions Légales & CGV - Serrurerie Safe"
                description="Consultez nos mentions légales, conditions générales de vente et politique de confidentialité. Transparence totale."
                noindex={true}
            />
            <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto prose prose-orange">
                    <h1>Mentions Légales</h1>

                    <h2>1. Éditeur du site</h2>
                    <p>
                        Le site <strong>serrurerie-safe.fr</strong> est édité par la société <strong>Serrurerie Safe SAS</strong>.<br />
                        <strong>Siège social :</strong> 10 Rue de la Paix, 75001 Paris<br />
                        <strong>SIRET :</strong> 123 456 789 00012<br />
                        <strong>RCS :</strong> Paris B 123 456 789<br />
                        <strong>Capital social :</strong> 10 000 €<br />
                        <strong>TVA Intracommunautaire :</strong> FR 12 123456789<br />
                        <strong>Directeur de la publication :</strong> M. Jean Dupont
                    </p>

                    <h2>2. Hébergement</h2>
                    <p>
                        Ce site est hébergé par :<br />
                        <strong>Vercel Inc.</strong><br />
                        340 S Lemon Ave #4133<br />
                        Walnut, CA 91789, USA
                    </p>

                    <h2>3. Propriété intellectuelle</h2>
                    <p>
                        L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
                    </p>

                    <hr className="my-12" />

                    <h1>Conditions Générales de Vente (CGV)</h1>

                    <h2>1. Objet</h2>
                    <p>
                        Les présentes conditions régissent les ventes de prestations de services de serrurerie par la société Serrurerie Safe.
                    </p>

                    <h2>2. Prix</h2>
                    <p>
                        Les prix de nos prestations sont indiqués en euros toutes taxes comprises (TTC). Les tarifs sont communiqués au client avant toute intervention via un devis.
                    </p>

                    <h2>3. Modalités de paiement</h2>
                    <p>
                        Le règlement des prestations s'effectue au comptant à la fin de l'intervention, par carte bancaire ou espèces.
                    </p>

                    <h2>4. Droit de rétractation</h2>
                    <p>
                        Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de travaux d'entretien ou de réparation à réaliser en urgence au domicile du consommateur et expressément sollicités par lui.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Legal;
