import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Quote, Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  },
  {
    name: "Vybrand Media",
    role: "Marketing Bureau",
    company: "",
    quote: "Onze samenwerking met Meer Impact Marketing was goed. Lars is erg goed in structuur en dat was voor ons erg fijn werken! We raden MIM dan ook aan iedereen aan."
  },
  {
    name: "Joey Angel",
    role: "Ondernemer",
    company: "",
    quote: "Zeer goede ervaring met Lars, Heb het werken als zeer prettig ervaren."
  },
  {
    name: "Tim Tielkemeijer",
    role: "Eigenaar",
    company: "Praktijk Tielo",
    quote: "Fijn om mee samen te werken."
  }
];

const stats = [
  { value: "6+", label: "Tevreden Klanten" },
  { value: "450%", label: "Gemiddelde ROI" },
  { value: "100%", label: "Klanttevredenheid" }
];

export default function Testimonials() {
  return (
    <>
      <Helmet>
        <title>Klantenervaringen & Reviews | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Ontdek wat onze klanten zeggen over onze marketing diensten. Echte verhalen van echte ondernemers die resultaat hebben behaald met onze aanpak." 
        />
         <link rel="canonical" href="https://www.meerimpactmarketing.nl/testimonials" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4 mr-2" />
              Succesverhalen
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Wat onze klanten over ons zeggen
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek hoe wij ondernemers helpen groeien met effectieve marketing strategieën. 
              Dit zijn de ervaringen van enkele van onze tevreden klanten.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-black text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="absolute -top-6 left-8">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-3 rounded-xl shadow-lg">
                    <Quote className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-6">
                    {testimonial.quote}
                  </p>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">
                      {testimonial.role}{testimonial.company && ` bij ${testimonial.company}`}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Klaar om ook resultaat te behalen?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Ontdek hoe wij ook jouw bedrijf kunnen helpen groeien
            </p>
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