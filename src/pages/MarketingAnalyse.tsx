import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, CheckCircle, ArrowRight } from 'lucide-react';
import MarketingAnalysisForm from '../components/forms/MarketingAnalysisForm';

const benefits = [
  'Concrete verbeterpunten voor je marketing strategie',
  'Inzicht in je huidige marktpositie',
  'Identificatie van kansen en bedreigingen',
  'Praktische aanbevelingen die je direct kunt toepassen',
  'Persoonlijk advies van een marketing expert'
];

export default function MarketingAnalyse() {
  return (
    <>
      <Helmet>
        <title>Gratis Marketing Analyse | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Ontvang een gratis, persoonlijke marketing analyse voor jouw bedrijf. Binnen 48 uur inzicht in je groeikansen." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <FileText className="h-4 w-4 mr-2" />
              Gratis analyse
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Neem contact op voor een <span className="text-orange-600">gratis</span> marketing analyse
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Wil je weten wat we voor je kunnen doen?
            </p>
            <p className="text-lg text-gray-600">
              Vul het onderstaand formulier in en we sturen je binnen 48 uur een gratis analyse op.
              <br />
              Geen kosten, geen verplichtingen, geen vervelende sales pitch. Gegarandeerd.
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