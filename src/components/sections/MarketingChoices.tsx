import React from 'react';
import { Clock, Building2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const choices = [
  {
    icon: Clock,
    title: "Alles zelf doen?",
    description: "Als je genoeg tijd hebt, is dit een optie. Maar vaak leidt het tot gemiste kansen, half werk en stress. Jouw tijd kan beter besteed worden aan waar jij goed in bent.",
    color: "blue"
  },
  {
    icon: Building2,
    title: "Een algemeen marketing kantoor benaderen?",
    description: "Standaardoplossingen, lange wachttijden en onpersoonlijke communicatie zijn vaak het resultaat. Hierdoor krijg je campagnes die niet aansluiten bij jouw specifieke behoeften. Dat kost je tijd én klanten.",
    color: "blue"
  },
  {
    icon: X,
    title: "Niet doen of uitstellen?",
    description: "Elke dag zonder actie betekent gemiste kansen, omzet en groei. Klanten wachten niet op jou. Waarom wachten als je vandaag nog stappen kunt zetten?",
    color: "blue"
  }
];

export default function MarketingChoices() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            De meest gemaakte marketingkeuzes
            <span className="block text-2xl text-blue-600 mt-2">
              (en waarom ze niet werken)
            </span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {choices.map((choice, index) => (
            <div
              key={index}
              className="relative group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <choice.icon className="h-8 w-8" />
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 min-h-[3rem]">
                  {choice.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {choice.description}
                </p>
              </div>
              
              <div className="absolute -bottom-2 left-0 right-0 h-2 bg-blue-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 text-lg bg-orange-600 text-white rounded-lg font-medium shadow-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
          >
            Kies voor een betere aanpak
          </Link>
          <p className="mt-4 text-gray-600">
            Ontdek hoe wij het anders doen
          </p>
        </div>
      </div>
    </section>
  );
}