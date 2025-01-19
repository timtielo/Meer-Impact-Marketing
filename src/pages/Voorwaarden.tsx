import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Voorwaarden() {
  return (
    <>
      <Helmet>
        <title>Algemene Voorwaarden | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Lees onze algemene voorwaarden voor informatie over onze dienstverlening en overeenkomsten." 
        />
        <link rel="canonical" href="https://www.meerimpactmarketing.nl/voorwaarden" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Algemene Voorwaarden</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Definities</h2>
              <p className="text-gray-600 mb-4">
                In deze algemene voorwaarden wordt verstaan onder:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Meer Impact Marketing: de opdrachtnemer</li>
                <li>Opdrachtgever: de natuurlijke of rechtspersoon die de opdracht verstrekt</li>
                <li>Overeenkomst: de overeenkomst van opdracht tussen Meer Impact Marketing en opdrachtgever</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Toepasselijkheid</h2>
              <p className="text-gray-600 mb-4">
                Deze algemene voorwaarden zijn van toepassing op alle offertes, aanbiedingen en overeenkomsten tussen Meer Impact Marketing en opdrachtgever.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Offertes en aanbiedingen</h2>
              <p className="text-gray-600 mb-4">
                Alle offertes en aanbiedingen zijn vrijblijvend en geldig gedurende 30 dagen, tenzij anders aangegeven.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Uitvoering van de overeenkomst</h2>
              <p className="text-gray-600 mb-4">
                Meer Impact Marketing zal de overeenkomst naar beste inzicht en vermogen uitvoeren.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Betaling</h2>
              <p className="text-gray-600 mb-4">
                Betaling dient te geschieden binnen 14 dagen na factuurdatum, tenzij anders overeengekomen.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Aansprakelijkheid</h2>
              <p className="text-gray-600 mb-4">
                Meer Impact Marketing is uitsluitend aansprakelijk voor directe schade die het gevolg is van opzet of bewuste roekeloosheid.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
              <p className="text-gray-600">
                Voor vragen over onze algemene voorwaarden kunt u contact opnemen via{' '}
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