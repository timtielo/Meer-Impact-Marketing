import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Facebook, Mail, PenTool, Share2, BarChart, Target, Users, Zap, ArrowRight } from 'lucide-react';

const services = [
  {
    title: "Meta Ads",
    description: "Bereik de juiste klanten op Facebook en Instagram met gerichte advertenties die converteren.",
    icon: Facebook,
    benefits: [
      "Bereik je ideale doelgroep",
      "Verhoog je conversies",
      "Optimaliseer je ROI"
    ],
    path: "/diensten/meta-ads",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Email Marketing",
    description: "Bouw een waardevolle klantendatabase en versterk de relatie met je doelgroep.",
    icon: Mail,
    benefits: [
      "Kosteneffectief marketing kanaal",
      "Bouw een klantendatabase",
      "Versterk klantrelaties"
    ],
    path: "/diensten/email-marketing",
    image: "https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Copywriting",
    description: "Professionele teksten die waarde leveren voor je publiek en meer leads genereren.",
    icon: PenTool,
    benefits: [
      "Waarde leveren voor het publiek",
      "Meer leads/klanten aantrekken",
      "Online aanwezigheid vergroten"
    ],
    path: "/diensten/copywriting",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Social Media Management",
    description: "Professioneel beheer van je social media kanalen voor meer bereik en engagement.",
    icon: Share2,
    benefits: [
      "Vergroten van het volgers-aantal",
      "Vergroten van het bereik",
      "Waardevolle content creatie"
    ],
    path: "/diensten/social-media-management",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=2000"
  }
];

const features = [
  {
    icon: Target,
    title: "Doelgericht",
    description: "We richten ons op jouw specifieke doelgroep en bedrijfsdoelen"
  },
  {
    icon: BarChart,
    title: "Meetbaar",
    description: "Volg je resultaten met duidelijke rapportages en analyses"
  },
  {
    icon: Users,
    title: "Persoonlijk",
    description: "Een toegewijd team dat jouw bedrijf door en door kent"
  },
  {
    icon: Zap,
    title: "Effectief",
    description: "Focus op wat werkt, gebaseerd op data en ervaring"
  }
];

export default function Services() {
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'Service',
      position: index + 1,
      name: service.title,
      description: service.description,
      provider: {
        '@type': 'Organization',
        name: 'Meer Impact Marketing'
      },
      url: `https://www.meerimpactmarketing.nl${service.path}`
    }))
  };

  return (
    <>
      <Helmet>
        <title>Online Marketing Diensten | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Ontdek onze effectieve online marketing diensten: Meta Ads, Email Marketing, Copywriting en Social Media Management. Boost jouw online zichtbaarheid en ROI met bewezen strategieën." 
        />
        <link rel="canonical" href="https://www.meerimpactmarketing.nl/diensten" />
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Marketing die écht werkt
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Geen loze beloftes, maar meetbare resultaten. Ontdek hoe onze diensten 
              jouw bedrijf kunnen laten groeien.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 mb-32">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 ml-4">
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-3" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={service.path}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Meer informatie
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Waarom kiezen voor ons?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combineren expertise met een persoonlijke aanpak voor het beste resultaat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-blue-100 p-3 rounded-xl inline-block mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 text-lg bg-orange-600 text-white rounded-lg font-medium shadow-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
            >
              Start een vrijblijvend gesprek
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}