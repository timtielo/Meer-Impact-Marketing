import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, CheckCircle, ArrowRight, Star, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GuideLanding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    voornaam: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://hook.eu2.make.com/hz0sixm7gxoxr5xa35rfsdoj2f8b9y1q', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/gratis-guide-bedankt');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const benefits = [
    'Stap-voor-stap handleiding voor het opzetten van effectieve Meta Ads',
    'Tips voor het identificeren van je ideale doelgroep',
    'Voorbeelden van succesvolle advertentiecampagnes',
    'Kostenbesparende strategieën en best practices',
    'Checklist voor het optimaliseren van je advertenties'
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
    },
    {
      quote: "Lars ondersteunt me bij het beheren van mijn Facebook- en Instagram-advertenties en doet dit op een overzichtelijke manier. Hij legt helder uit wat hij test en waarom hij bepaalde keuzes maakt. Daarnaast denkt hij actief mee over de inhoud van de advertenties en content. Ook geeft hij waardevolle feedback om de resultaten steeds te verbeteren. Dankzij zijn aanpak en betrokkenheid is de samenwerking met Lars heel prettig en doeltreffend. Een aanrader in deze wereld van sociale media cowboys.",
      name: "Jorn",
      role: "Eigenaar",
      company: "Betere Mobiliteit"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Gratis Meta Ads Guide | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Download onze gratis guide en leer hoe je snel nieuwe klanten krijgt met Meta Ads. Praktische tips en strategieën voor Facebook en Instagram advertenties." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Column */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <FileText className="h-4 w-4 mr-2" />
                Gratis guide
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Zo krijg je snel nieuwe klanten met Meta Ads
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Facebook en Instagram zijn de snelste en meest kosten-effectieve manier om de perfecte klanten aan te trekken.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                In deze gratis guide vertellen we je precies hoe je dat kan doen. Geen jargon, geen technische onzin, gewoon een simpel en makkelijk-te-volgen overzicht met wat te doen.
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
            </div>

            {/* Right Column */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Download de gratis guide
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="voornaam" className="block text-sm font-medium text-gray-700 mb-1">
                    Voornaam *
                  </label>
                  <input
                    type="text"
                    id="voornaam"
                    name="voornaam"
                    required
                    value={formData.voornaam}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Jouw voornaam"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="jouw@email.nl"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 text-white py-4 px-6 rounded-lg font-medium shadow-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    'Even geduld...'
                  ) : (
                    <>
                      Stuur mij de guide!
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-500">
                Tot snel!
              </div>
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

            <div className="grid md:grid-cols-3 gap-8">
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