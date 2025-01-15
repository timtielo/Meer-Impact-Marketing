import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SeoFields } from '../lib/contentful';

interface SeoProps {
  seo: SeoFields;
  type?: 'website' | 'article';
  schema?: object;
}

export default function Seo({ seo, type = 'website', schema }: SeoProps) {
  const robotsContent = [];
  if (seo.nofollow) robotsContent.push('nofollow');
  if (seo.noindex) robotsContent.push('noindex');

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Meer Impact Marketing',
    url: 'https://meerimpactmarketing.nl',
    logo: 'https://meerimpactmarketing.nl/logo-horizontal.png',
    description: 'Online Marketing Bureau gespecialiseerd in Meta Ads en Social Media Marketing',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Amersfoort',
      addressCountry: 'NL'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+31-6-1234-5678',
      contactType: 'customer service',
      email: 'info@meerimpactmarketing.nl'
    },
    sameAs: [
      'https://www.facebook.com/people/Meer-Impact-Marketing/61566630873245/',
      'https://www.instagram.com/meerimpactmarketing/',
      'https://www.linkedin.com/company/meer-impact-marketing/'
    ]
  };

  return (
    <Helmet>
      <html lang="nl" />
      <title>{seo.pageTitle}</title>
      {seo.pageDescription && <meta name="description" content={seo.pageDescription} />}
      {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
      {robotsContent.length > 0 && <meta name="robots" content={robotsContent.join(',')} />}

      {/* Open Graph */}
      <meta property="og:site_name" content="Meer Impact Marketing" />
      <meta property="og:locale" content="nl_NL" />
      <meta property="og:title" content={seo.pageTitle} />
      {seo.pageDescription && <meta property="og:description" content={seo.pageDescription} />}
      <meta property="og:type" content={type} />
      {seo.canonicalUrl && <meta property="og:url" content={seo.canonicalUrl} />}
      
      {/* Share Images */}
      {seo.shareImages && seo.shareImages.map((image, index) => (
        <React.Fragment key={index}>
          <meta property="og:image" content={`https:${image.url}`} />
          {image.width && <meta property="og:image:width" content={image.width.toString()} />}
          {image.height && <meta property="og:image:height" content={image.height.toString()} />}
          {image.description && <meta property="og:image:alt" content={image.description} />}
        </React.Fragment>
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.pageTitle} />
      {seo.pageDescription && <meta name="twitter:description" content={seo.pageDescription} />}
      {seo.shareImages?.[0] && (
        <>
          <meta name="twitter:image" content={`https:${seo.shareImages[0].url}`} />
          {seo.shareImages[0].description && (
            <meta name="twitter:image:alt" content={seo.shareImages[0].description} />
          )}
        </>
      )}

      {/* Additional Meta Tags */}
      <meta name="author" content="Meer Impact Marketing" />
      <meta name="geo.region" content="NL" />
      <meta name="geo.placename" content="Amersfoort" />
      <meta name="format-detection" content="telephone=yes" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || baseSchema)}
      </script>
    </Helmet>
  );
}