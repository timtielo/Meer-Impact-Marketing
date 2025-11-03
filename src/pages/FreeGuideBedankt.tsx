import React from 'react';
import { Helmet } from 'react-helmet-async';
import MarketingAnalysisForm from '../components/forms/MarketingAnalysisForm';
import { FileText, CheckCircle } from 'lucide-react';

const benefits = [
  'Concrete verbeterpunten voor je marketing strategie',
  'Inzicht in je huidige marktpositie',
  'Identificatie van kansen en bedreigingen',
  'Praktische aanbevelingen die je direct kunt toepassen',
  'Persoonlijk advies van een marketing expert'
];

export default function FreeGuideBedankt() {
  return (
    <>
      <Helmet>
        <title>Bedankt voor je aanvraag! | Meer Impact Marketing</title>
        <meta
          name="description"
          content="Je gratis Meta Ads guide is onderweg naar je inbox. Ontdek nu ook hoe wij je kunnen helpen met een gratis marketing analyse."
        />
        <link rel="canonical" href="https://www.meerimpactmarketing.nl/gratis-guide-bedankt" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Bedankt!
            </h1>
            <p className="text-xl text-gray-600">
              Jouw gratis guide is onderweg en je vindt hem binnen 5 minuten in je mailbox. Controleer ook je SPAM als je hem nog niet binnen hebt!
            </p>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Wil je nog meer groeien?
            </h2>
            <p className="text-xl text-gray-600">
              Vraag direct een gratis marketing analyse aan en ontdek hoe wij je kunnen helpen om nog meer uit je marketing te halen.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Wat krijg je?
                </h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <MarketingAnalysisForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}