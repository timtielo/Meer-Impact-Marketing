import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Users, BarChart, Target, CheckCircle, ArrowRight } from 'lucide-react';

const benefits = [
  "Versterk je merkidentiteit",
  "Vergroot je online zichtbaarheid",
  "Bouw een betrokken community",
  "Genereer organische leads",
  "Verbeter je klantenservice"
];

const services = [
  {
    title: "Content Creatie",
    description: "Professionele content die resoneert met je doelgroep",
    features: [
      "Contentkalender",
      "Fotografie",
      "Copywriting",
      "Stories & Reels"
    ]
  },
  {
    title: "Community Management",
    description: "Actief beheer van je social media accounts",
    features: [
      "Engagement",
      "Moderatie",
      "Support",
      "Monitoring"
    ]
  }
];

const platforms = [
  {
    icon: Instagram,
    name: "Instagram",
    description: "Visueel platform perfect voor branding en engagement"
  },
  {
    icon: Facebook,
    name: "Facebook",
    description: "Ideaal voor community building en klantenbinding"
  }
];

export default function SocialMedia() {
  return (
    <>
      <Helmet>
        <title>Social Media Marketing | Meer Impact Marketing</title>
        <meta
          name="description"
          content="Professioneel social media beheer voor meer bereik en engagement. Ontdek hoe wij je online aanwezigheid versterken."
        />
        <link rel="canonical" href="https://www.meerimpactmarketing.nl/diensten/social-media" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Instagram className="h-4 w-4 mr-2" />
              Social Media
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Bouw een sterke online aanwezigheid
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professioneel social media beheer dat je merk versterkt en je doelgroep betrekt.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-32">
            <div>
              <img
                src="https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&q=80&w=2000"
                alt="Social Media Marketing"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Waarom Social Media Marketing?
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

          {/* Services Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Onze diensten
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete social media ondersteuning voor jouw bedrijf.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Platforms Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Platforms
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              We focussen op de platforms die het beste bij jouw bedrijf passen.
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

          {/* CTA Section */}
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 text-lg bg-orange-600 text-white rounded-lg font-medium shadow-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
            >
              Versterk je social media
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}