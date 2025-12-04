import React from 'react';
import { Star } from 'lucide-react';

interface Review {
    id: number;
    author: string;
    rating: number;
    date: string;
    text: string;
}

interface ReviewsWidgetProps {
    reviews?: Review[];
    showSchema?: boolean;
}

const ReviewsWidget: React.FC<ReviewsWidgetProps> = ({
    reviews = defaultReviews,
    showSchema = true
}) => {
    const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    const totalReviews = reviews.length;

    const aggregateRatingSchema = {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        "ratingValue": averageRating.toFixed(1),
        "reviewCount": totalReviews,
        "bestRating": "5",
        "worstRating": "1"
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            {showSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(aggregateRatingSchema)}
                </script>
            )}

            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-8 w-8 ${i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>
                <p className="text-gray-600">Basé sur {totalReviews} avis Google</p>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h4 className="font-semibold text-gray-900">{review.author}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.text}</p>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
                <a
                    href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                    Laisser un avis Google
                </a>
            </div>
        </div>
    );
};

const defaultReviews: Review[] = [
    {
        id: 1,
        author: "Sophie M.",
        rating: 5,
        date: "Il y a 2 semaines",
        text: "Intervention rapide et professionnelle. Le serrurier est arrivé en 25 minutes et a ouvert ma porte sans l'abîmer. Prix honnête, je recommande !"
    },
    {
        id: 2,
        author: "Thomas L.",
        rating: 5,
        date: "Il y a 1 mois",
        text: "Excellent service ! Changement de serrure A2P réalisé dans les règles de l'art. Devis clair et transparent. Très satisfait."
    },
    {
        id: 3,
        author: "Marie D.",
        rating: 5,
        date: "Il y a 2 mois",
        text: "Serrurier de confiance. Intervention de nuit pour une urgence, tarif respecté, travail impeccable. Merci !"
    },
    {
        id: 4,
        author: "Pierre B.",
        rating: 4,
        date: "Il y a 3 mois",
        text: "Bon rapport qualité/prix. Installation d'une porte blindée, travail soigné. Juste un petit retard sur le rendez-vous."
    },
    {
        id: 5,
        author: "Isabelle R.",
        rating: 5,
        date: "Il y a 4 mois",
        text: "Très professionnel et à l'écoute. A pris le temps de m'expliquer les différentes options. Je recommande vivement !"
    }
];

export default ReviewsWidget;
