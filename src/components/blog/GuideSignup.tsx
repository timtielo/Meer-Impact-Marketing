import React, { useState } from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GuideSignup() {
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

  return (
    <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 md:p-12 shadow-lg mb-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <FileText className="h-4 w-4 mr-2" />
            Gratis guide
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Wil je meer leren over marketing?
          </h2>
          <p className="text-gray-600 mb-6">
            Schrijf je in voor onze nieuwsbrief en leer hoe je effectief adverteert op Facebook en Instagram. 
            Je krijgt hierbij gratis onze guide. 
          </p>
          <ul className="space-y-3 mb-6">
            {[
              'Stap-voor-stap handleiding',
              'Praktische voorbeelden',
              'Direct toepasbare tips',
              'Kostenbesparende strategieën'
            ].map((benefit, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-3" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  Schrijf je in!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}