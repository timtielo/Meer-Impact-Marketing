import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FreeGuide() {
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

  return (
    <>
      <Helmet>
        <title>Gratis Meta Ads Guide | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Download onze gratis guide en leer hoe je snel nieuwe klanten krijgt met Meta Ads. Praktische tips en strategieën voor Facebook en Instagram advertenties." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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
            <p className="text-lg text-gray-600">
              In deze gratis guide vertellen we je precies hoe je dat kan doen. Geen jargon, geen technische onzin, gewoon een simpel en makkelijk-te-volgen overzicht met wat te doen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
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

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}