import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Target, Users, BarChart, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const benefits = [
  "Bereik precies de juiste doelgroep",
  "Verhoog je conversies met gerichte advertenties",
  "Optimaliseer je advertentiebudget",
  "Meet en verbeter je resultaten",
  "Schaal je campagnes op basis van data"
];

const platforms = [
  {
    icon: Facebook,
    name: "Facebook Ads",
    description: "Bereik potentiële klanten waar ze dagelijks actief zijn"
  },
  {
    icon: Instagram,
    name: "Instagram Ads",
    description: "Presenteer je merk visueel aan een betrokken publiek"
  }
];

const process = [
  {
    title: "Analyse",
    description: "We analyseren je huidige situatie, doelgroep en concurrentie"
  },
  {
    title: "Strategie",
    description: "We ontwikkelen een op maat gemaakte advertentiestrategie"
  },
  {
    title: "Implementatie",
    description: "We zetten je campagnes op en optimaliseren continu"
  },
  {
    title: "Rapportage",
    description: "Je ontvangt regelmatig inzicht in de resultaten"
  }
];

export default function MetaAds() {
  return (
    <>
      <Helmet>
        <title>Meta Ads - Facebook & Instagram Adverteren | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Bereik meer klanten met effectieve Facebook en Instagram advertenties. Ontdek hoe wij je helpen groeien met Meta Ads." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Facebook className="h-4 w-4 mr-2" />
              Meta Ads
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Bereik de juiste klanten met Meta Ads
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Converterende Facebook en Instagram advertenties die jouw ideale klanten bereiken 
              en je bedrijf laten groeien.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-32">
            <div>
              <img
                src="https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=2000"
                alt="Meta Ads Dashboard"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Waarom Meta Ads?
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

          {/* Platforms Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Adverteer waar je klanten zijn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Bereik je doelgroep op de platforms waar ze het meest actief zijn.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {platforms.map((platform, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-blue-100 p-4 rounded-xl inline-block mb-6">
                    <platform.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600">
                    {platform.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Onze aanpak
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Een bewezen proces voor het beste resultaat.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div 
                  key={index}
                  className="relative group"
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-orange-600">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 text-lg bg-orange-600 text-white rounded-lg font-medium shadow-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
            >
              Start met Meta Ads
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}