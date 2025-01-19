import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Lees onze privacy policy om te begrijpen hoe wij uw gegevens beschermen en gebruiken." 
        />
          <link rel="canonical" href="https://www.meerimpactmarketing.nl/privacy" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Inleiding</h2>
              <p className="text-gray-600 mb-4">
                Meer Impact Marketing respecteert de privacy van alle gebruikers van haar website en draagt er zorg voor dat de persoonlijke informatie die u ons verschaft vertrouwelijk wordt behandeld.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Gegevensverzameling</h2>
              <p className="text-gray-600 mb-4">
                Wij verzamelen alleen persoonlijke gegevens die u vrijwillig aan ons verstrekt, bijvoorbeeld wanneer u:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Het contactformulier invult</li>
                <li>Zich aanmeldt voor onze nieuwsbrief</li>
                <li>De gratis marketing analyse aanvraagt</li>
                <li>De gratis guide downloadt</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Gebruik van gegevens</h2>
              <p className="text-gray-600 mb-4">
                De verzamelde gegevens worden gebruikt voor:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Het beantwoorden van uw vragen en verzoeken</li>
                <li>Het versturen van relevante marketing informatie</li>
                <li>Het verbeteren van onze dienstverlening</li>
                <li>Het nakomen van wettelijke verplichtingen</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Beveiliging</h2>
              <p className="text-gray-600 mb-4">
                Wij nemen beveiligingsmaatregelen om misbruik van en ongeautoriseerde toegang tot persoonsgegevens te beperken.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Uw rechten</h2>
              <p className="text-gray-600 mb-4">
                U heeft het recht om:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Uw persoonsgegevens in te zien</li>
                <li>Uw persoonsgegevens te corrigeren</li>
                <li>Uw persoonsgegevens te laten verwijderen</li>
                <li>Bezwaar te maken tegen de verwerking</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact</h2>
              <p className="text-gray-600">
                Voor vragen over ons privacybeleid kunt u contact opnemen via{' '}
                <a href="mailto:info@meerimpactmarketing.nl" className="text-blue-600 hover:text-blue-700">
                  info@meerimpactmarketing.nl
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}