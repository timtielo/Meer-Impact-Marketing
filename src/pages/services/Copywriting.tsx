import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PenTool, Target, Users, BarChart, CheckCircle, ArrowRight, FileText, Globe, Mail } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: "Doelgericht",
    description: "Content die resoneert met jouw specifieke doelgroep"
  },
  {
    icon: Users,
    title: "Waarde leverend",
    description: "Teksten die jouw publiek echt helpen en informeren"
  },
  {
    icon: Globe,
    title: "Meer bereik",
    description: "Vergroot je online zichtbaarheid en autoriteit"
  },
  {
    icon: Mail,
    title: "Lead generatie",
    description: "Convert bezoekers naar waardevolle leads"
  }
];

const features = [
  "Website content die converteert",
  "Pakkende social media posts",
  "Effectieve email campagnes",
  "SEO-geoptimaliseerde teksten",
  "Overtuigende landingspagina's",
  "Waardevolle blog artikelen"
];

const process = [
  {
    title: "Analyse",
    description: "We analyseren je doelgroep, tone-of-voice en doelstellingen"
  },
  {
    title: "Strategie",
    description: "We ontwikkelen een content strategie die past bij jouw merk"
  },
  {
    title: "Creatie",
    description: "We schrijven content die aanzet tot actie"
  },
  {
    title: "Optimalisatie",
    description: "We meten en verbeteren continu de resultaten"
  }
];

export default function Copywriting() {
  return (
    <>
      <Helmet>
        <title>Copywriting Services - Converterende Content | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Professionele copywriting services voor website, social media en email marketing. Content die converteert en waarde levert voor je publiek." 
        />
        <link rel="canonical" href="https://www.meerimpactmarketing.nl/diensten/copywriting" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <PenTool className="h-4 w-4 mr-2" />
              Copywriting
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Content die converteert
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professionele teksten die waarde leveren voor je publiek, meer leads genereren 
              en je online aanwezigheid vergroten.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-blue-100 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-32">
            <div>
              <img
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=2000"
                alt="Copywriting Services"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Wat krijg je?
              </h2>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Onze aanpak
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Een bewezen proces voor het creëren van effectieve content.
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
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Klaar om te starten met professionele content?
              </h2>
              <p className="text-xl text-gray-600">
                Laat je content voor je werken
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 text-lg bg-orange-600 text-white rounded-lg font-medium shadow-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
            >
              Start met copywriting
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}