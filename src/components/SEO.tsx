import React from 'react';
import { Helmet } from 'react-helmet-async';
import { defaultSEO, businessData } from '../config/seo';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    noindex?: boolean;
    jsonLd?: object[];
    ogImage?: string;
}

export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    noindex = false,
    jsonLd = [],
    ogImage
}) => {
    const siteUrl = defaultSEO.url;

    // Clean canonical URL (remove query params)
    const cleanCanonical = canonical ? canonical.split('?')[0] : undefined;
    const currentUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0] : '';
    const finalCanonical = cleanCanonical || currentUrl;

    const metaTitle = title ? `${title} | ${defaultSEO.siteName}` : defaultSEO.title;
    const metaDescription = description || defaultSEO.description;
    const metaImage = ogImage || defaultSEO.defaultImage;

    const structuredData = [businessData, ...jsonLd];

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={finalCanonical} />

            {/* Robots */}
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalCanonical} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:site_name" content={defaultSEO.siteName} />
            <meta property="og:locale" content={defaultSEO.locale} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* JSON-LD Structured Data */}
            {structuredData.map((data, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(data)}
                </script>
            ))}
        </Helmet>
    );
};
