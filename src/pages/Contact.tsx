import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Clock, ArrowRight, Building2 } from 'lucide-react';
import MarketingAnalysisForm from '../components/forms/MarketingAnalysisForm';

const contactInfo = [
  {
    icon: Phone,
    label: "Telefoonnummer",
    value: "+31 6 3648 1352",
    href: "tel:+31636481352"
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@meerimpactmarketing.nl",
    href: "mailto:info@meerimpactmarketing.nl"
  },
  {
    icon: MapPin,
    label: "Locatie",
    value: "Amersfoort, Nederland"
  },
  {
    icon: Clock,
    label: "Bereikbaar",
    value: "24/7"
  },
  {
    icon: Building2,
    label: "KvK",
    value: "88716244"
  }
];

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Neem contact op met ons marketing team voor een gratis strategiegesprek. Ontdek hoe wij jouw bedrijf kunnen helpen groeien." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Laten we samen groeien
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Klaar om je marketing naar het volgende niveau te tillen? 
              Neem contact met ons op voor een vrijblijvend gesprek over de mogelijkheden.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Informatie
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-blue-100 rounded-xl p-3 mr-4 flex-shrink-0">
                        <item.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.label}
                        </h3>
                        {item.href ? (
                          <a 
                            href={item.href}
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-300 break-words"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-600 break-words">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Vraag een gratis marketing analyse aan
                </h2>
                <p className="text-gray-600 mb-8">
                  Laat ons je huidige marketing aanpak analyseren en ontvang binnen 48 uur concrete verbeterpunten.
                </p>
                <MarketingAnalysisForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}