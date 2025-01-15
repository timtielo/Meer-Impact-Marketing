import React from 'react';
import { Link } from 'react-router-dom';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Niek Speel",
    role: "Mede-eigenaar",
    company: "EnergieStudent",
    quote: "In de samenwerking met Lars vond ik iemand die creatief is, grondig in zijn onderzoek, een goede luisteraar en in staat om verschillende perspectieven aan te nemen. Wat ik vooral belangrijk vond bij Lars was dat zijn gebrek aan ervaring van toen hij begon met werken bij EnergieStudent, werd gecompenseerd doordat Lars erg gedreven is en zoveel mogelijk wil leren. Hierdoor waren we met zijn hulp in staat om te gaan met obstakels en onze volgers/niet-volgers verder te betrekken. Dit stelde ons in staat om steeds meer positieve impact te maken."
  },
  {
    name: "Mees van Zuidam",
    role: "Mede-eigenaar",
    company: "Strength2Strength",
    quote: "Ik werk sinds anderhalve maand samen met Lars (Meer Impact Marketing) en ik wil graag even mijn ervaring delen.\n\nIk houd het kort maar krachtig:\nProfessioneel, duidelijk, meedenkend, neemt initiatief, communiceert duidelijk, levert zijn dienst met zorg, staat open voor feedback/kritiek en de behoefte van de klant staat bij hem op 1."
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-gradient-to-b from-white via-orange-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-gray-900 mb-6 relative inline-block">
            Wat onze klanten zeggen
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-orange-500 rounded-full opacity-75" />
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="absolute -top-6 left-8">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-3 rounded-xl shadow-lg">
                    <Quote className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="pt-6">
                  <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                    {testimonial.quote}
                  </p>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">
                      {testimonial.role} {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 text-lg bg-orange-600 text-white rounded-lg font-medium shadow-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
          >
            Start jouw groeiverhaal
          </Link>
          <p className="mt-4 text-gray-600">
            Ontdek hoe wij ook jouw bedrijf kunnen helpen groeien
          </p>
        </div>
      </div>
    </section>
  );
}