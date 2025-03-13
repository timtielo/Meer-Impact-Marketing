import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Visitekaartje() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    voornaam: '',
    achternaam: '',
    email: '',
    telefoonnummer: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data to marketing analyse webhook
      const marketingAnalyseResponse = await fetch('https://hook.eu2.make.com/x6nvmo3czy1rww6cg9bosjg9pygq81z8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voornaam: formData.voornaam,
          achternaam: formData.achternaam,
          email: formData.email,
          telefoonnummer: formData.telefoonnummer
        }),
      });

      // If newsletter checkbox is checked, send data to free guide webhook
      if (formData.newsletter) {
        await fetch('https://hook.eu2.make.com/hz0sixm7gxoxr5xa35rfsdoj2f8b9y1q', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            voornaam: formData.voornaam,
            email: formData.email
          }),
        });
      }

      if (marketingAnalyseResponse.ok) {
        navigate('/visitekaartje-success');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <Helmet>
        <title>Vraag visitekaartje aan | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="Vraag een visitekaartje aan van Meer Impact Marketing. Wij nemen zo snel mogelijk contact met je op." 
        />
        <link rel="canonical" href="https://www.meerimpactmarketing.nl/visitekaartje" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <CreditCard className="h-4 w-4 mr-2" />
              Visitekaartje aanvragen
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Vraag visitekaartje aan
            </h1>
            <p className="text-xl text-gray-600">
              Vul het formulier in en dan neemt Lars contact met je op.
            </p>
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
                <label htmlFor="achternaam" className="block text-sm font-medium text-gray-700 mb-1">
                  Achternaam
                </label>
                <input
                  type="text"
                  id="achternaam"
                  name="achternaam"
                  value={formData.achternaam}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Jouw achternaam"
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

              <div>
                <label htmlFor="telefoonnummer" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefoonnummer *
                </label>
                <input
                  type="tel"
                  id="telefoonnummer"
                  name="telefoonnummer"
                  required
                  value={formData.telefoonnummer}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Je telefoonnummer"
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <label htmlFor="newsletter" className="ml-3 text-sm text-gray-600">
                  Aanmelden nieuwsbrief en ontvang onze Meta Ads Guide
                </label>
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
                    Vraag visitekaartje aan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}