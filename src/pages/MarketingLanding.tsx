import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, CheckCircle, ArrowRight, Target, BarChart, Users, Star, Quote } from 'lucide-react';
import MarketingAnalysisForm from '../components/forms/MarketingAnalysisForm';

const benefits = [
  'Concrete verbeterpunten voor je marketing strategie',
  'Inzicht in je huidige marktpositie',
  'Identificatie van kansen en bedreigingen',
  'Praktische aanbevelingen die je direct kunt toepassen',
  'Persoonlijk advies van een marketing expert'
];

const testimonials = [
  {
    quote: "In de samenwerking met Lars vond ik iemand die creatief is, grondig in zijn onderzoek, een goede luisteraar en in staat om verschillende perspectieven aan te nemen.",
    name: "Niek Speel",
    role: "Mede-eigenaar",
    company: "EnergieStudent"
  },
  {
    quote: "Professioneel, duidelijk, meedenkend, neemt initiatief, communiceert duidelijk, levert zijn dienst met zorg, staat open voor feedback/kritiek en de behoefte van de klant staat bij hem op 1.",
    name: "Mees van Zuidam",
    role: "Mede-eigenaar",
    company: "Strength2Strength"
  }
];

export default function MarketingLanding() {
  return (
    <>
      <Helmet>
        <title>Gratis Marketing Analyse | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Ontvang een gratis, persoonlijke marketing analyse voor jouw bedrijf. Binnen 48 uur inzicht in je groeikansen." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <FileText className="h-4 w-4 mr-2" />
                Gratis analyse
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Ontdek je marketing groeipotentieel
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Ontvang binnen 48 uur een persoonlijke analyse van je huidige marketing aanpak en ontdek waar je kansen liggen.
              </p>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
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

              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: Target, value: "100%", label: "Persoonlijk" },
                  { icon: BarChart, value: "48u", label: "Snelle analyse" },
                  { icon: Users, value: "6+", label: "Tevreden klanten" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-md text-center">
                    <stat.icon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Vraag je gratis analyse aan
              </h2>
              <MarketingAnalysisForm />
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Wat anderen zeggen
              </h2>
              <p className="text-lg text-gray-600">
                Ontdek wat anderen hebben bereikt met onze aanpak
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="mb-6">
                    <Quote className="h-8 w-8 text-blue-100 mb-2" />
                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role} bij {testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}