import React from 'react';
import { useRouteError } from 'react-router-dom';
import { SEO } from '../components/SEO';

const ErrorPage: React.FC = () => {
    const error: any = useRouteError();
    console.error(error);

    return (
        <>
            <SEO
                title="Erreur"
                description="Une erreur est survenue."
                noindex={true}
            />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Oups !</h1>
                    <p className="text-lg text-gray-600 mb-8">Désolé, une erreur inattendue s'est produite.</p>
                    <p className="text-sm text-gray-500 mb-8">
                        <i>{error.statusText || error.message}</i>
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        Retour à l'accueil
                    </a>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;
