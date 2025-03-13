import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Linkedin, MessageCircle, CheckCircle, ArrowRight } from 'lucide-react';

export default function VisitekaartjeSuccess() {
  return (
    <>
      <Helmet>
        <title>Linktree | Meer Impact Marketing</title>
        <meta 
          name="description" 
          content="De social Linktree van Meer Impact Marketing." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-6">
              Bedankt!
            </h1>
            <p className="text-xl text-gray-600">
              De contactgegevens zijn verstuurd. Lars neemt contact met je op. Laten we verbonden blijven!
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="https://wa.me/qr/JUTHWHFW7BIWD1"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#25D366] text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageCircle className="h-8 w-8 mr-4" />
                  <span className="text-lg font-medium">Chat via WhatsApp</span>
                </div>
                <div className="bg-white/20 rounded-full p-2">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/company/meer-impact-marketing/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#0A66C2] text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Linkedin className="h-8 w-8 mr-4" />
                  <span className="text-lg font-medium">Volg ons op LinkedIn</span>
                </div>
                <div className="bg-white/20 rounded-full p-2">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}