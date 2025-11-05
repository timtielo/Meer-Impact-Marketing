import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(true);
  const phoneNumber = '+31636481352';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\s/g, '')}`;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div className="bg-white rounded-lg shadow-xl px-4 py-3 max-w-[280px] relative animate-bounce-subtle">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
          aria-label="Sluiten"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
        <p className="text-sm font-semibold text-gray-900 pr-4">
          Vragen? Chat direct met ons!
        </p>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
