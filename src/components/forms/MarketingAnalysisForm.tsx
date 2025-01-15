import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  voornaam: string;
  achternaam: string;
  email: string;
  telefoonnummer: string;
  bedrijf: string;
  website: string;
  vraag: string;
  marketingBudget: string;
  bron: string;
}

interface MarketingAnalysisFormProps {
  className?: string;
}

export default function MarketingAnalysisForm({ className = '' }: MarketingAnalysisFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    voornaam: '',
    achternaam: '',
    email: '',
    telefoonnummer: '',
    bedrijf: '',
    website: '',
    vraag: '',
    marketingBudget: '',
    bron: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatWebsite = (url: string): string => {
    if (!url) return url;
    
    // Remove any existing protocol
    let formattedUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    
    // Add https:// if not present
    if (formattedUrl && !formattedUrl.startsWith('http')) {
      formattedUrl = `https://${formattedUrl}`;
    }
    
    return formattedUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formattedData = {
        ...formData,
        website: formatWebsite(formData.website)
      };

      const response = await fetch('https://hook.eu2.make.com/x6nvmo3czy1rww6cg9bosjg9pygq81z8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        navigate('/marketing-analyse-bedankt');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="grid md:grid-cols-2 gap-6">
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
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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
            Telefoonnummer
          </label>
          <input
            type="tel"
            id="telefoonnummer"
            name="telefoonnummer"
            value={formData.telefoonnummer}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Je telefoonnummer"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="bedrijf" className="block text-sm font-medium text-gray-700 mb-1">
            Bedrijf *
          </label>
          <input
            type="text"
            id="bedrijf"
            name="bedrijf"
            required
            value={formData.bedrijf}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Naam van je bedrijf"
          />
        </div>
        
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Wat is jouw website?
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="meerimpactmarketing.nl"
          />
        </div>
      </div>

      <div>
        <label htmlFor="vraag" className="block text-sm font-medium text-gray-700 mb-1">
          Wat is je belangrijkste vraag?
        </label>
        <textarea
          id="vraag"
          name="vraag"
          value={formData.vraag}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Vertel ons waar je hulp bij nodig hebt"
        />
      </div>

      <div>
        <label htmlFor="marketingBudget" className="block text-sm font-medium text-gray-700 mb-1">
          Hoeveel besteed je maandelijks aan marketing en advertenties?
        </label>
        <input
          type="text"
          id="marketingBudget"
          name="marketingBudget"
          value={formData.marketingBudget}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Je huidige marketing budget"
        />
      </div>

      <div>
        <label htmlFor="bron" className="block text-sm font-medium text-gray-700 mb-1">
          Hoe heb je ons gevonden?
        </label>
        <input
          type="text"
          id="bron"
          name="bron"
          value={formData.bron}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Google, Social Media, etc."
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
            Stuur mij de gratis analyse!
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
}