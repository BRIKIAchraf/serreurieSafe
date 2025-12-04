import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const NotFound: React.FC = () => {
    return (
        <>
            <SEO
                title="Page Non Trouvée"
                description="La page que vous recherchez n'existe pas."
                noindex={true}
            />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div>
                        <h1 className="mt-6 text-9xl font-extrabold text-orange-600">404</h1>
                        <h2 className="mt-2 text-3xl font-bold text-gray-900">Page Non Trouvée</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Désolé, nous ne trouvons pas la page que vous recherchez.
                        </p>
                    </div>
                    <div className="mt-5">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
