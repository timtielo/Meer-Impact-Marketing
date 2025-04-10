import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Share2, Users, Target, BarChart, CheckCircle, ArrowRight, Calendar, FileText, Instagram, Facebook, Linkedin } from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: "Groeiend bereik",
    description: "Vergroot je volgers-aantal en bereik nieuwe doelgroepen"
  },
  {
    icon: Target,
    title: "Doelgericht",
    description: "Bereik precies de juiste mensen buiten je volgers om"
  },
  {
    icon: Calendar,
    title: "Consistent",
    description: "Regelmatige posting volgens content kalender"
  },
  {
    icon: FileText,
    title: "Waardevol",
    description: "Content die resoneert met jouw doelgroep"
  }
];

const features = [
  "Strategische content planning",
  "Professionele content creatie",
  "Community management",
  "Performance analyse",
  "Engagement optimalisatie",
  "Maandelijkse rapportages"
];

const platforms = [
  {
    icon: Instagram,
    name: "Instagram",
    description: "Perfect voor visuele storytelling en engagement"
  },
  {
    icon: Facebook,
    name: "Facebook",
    description: "Ideaal voor community building en adverteren"
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    description: "Professioneel netwerken en B2B marketing"
  }
];

const process = [
  {
    title: "Strategie",
    description: "We ontwikkelen een social media strategie die past bij jouw merk"
  },
  {
    title: "Planning",
    description: "We maken een content kalender voor consistente posting"
  },
  {
    title: "Creatie",
    description: "We produceren waardevolle content voor je kanalen"
  },
  {
    title: "Optimalisatie",
    description: "We monitoren en verbeteren de resultaten"
  }
];

export default function SocialMediaManagement() {
  return (
    <>
      <Helmet>
        <title>Social Media Management - Professioneel beheer | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Professioneel social media beheer voor meer bereik en engagement. Vergroot je volgers-aantal en vul je kanalen met waardevolle content." 
        />
        <link rel="canonical" href="https://www.meerimpactmarketing.nl/diensten/social-media-management" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Share2 className="h-4 w-4 mr-2" />
              Social Media Management
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Professioneel social media beheer
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vergroot je bereik, groei je volgers en vul je social media kanalen met 
              waardevolle content die aanspreekt.
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
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=2000"
                alt="Social Media Management"
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

          {/* Platforms Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Platforms
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We focussen op de platforms waar jouw doelgroep actief is.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Onze aanpak
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Een bewezen proces voor effectief social media management.
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
                Klaar om je social media naar het volgende niveau te tillen?
              </h2>
              <p className="text-xl text-gray-600">
                Laat ons je social media kanalen professioneel beheren
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 text-lg bg-orange-600 text-white rounded-lg font-medium shadow-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
            >
              Start met social media management
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}