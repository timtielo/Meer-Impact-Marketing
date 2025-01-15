import React from 'react';
import { FileText, TrendingUp, GitBranch, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const differentiators = [
  {
    icon: FileText,
    title: "Garantie",
    description: "De samenwerking moet een win-win zijn. Dat is de basis van een goede relatie. Jij neemt niet al het risico, die delen we."
  },
  {
    icon: TrendingUp,
    title: "Resultaat",
    description: "Onze focus ligt op het leveren van resultaten. Geen loze beloftes, maar meetbare groei."
  },
  {
    icon: GitBranch,
    title: "Flexibiliteit",
    description: "We passen ons aan jouw behoeften aan. Of je nu een groot project of kleinere ondersteuning nodig hebt, we staan voor je klaar."
  },
  {
    icon: Target,
    title: "Specialisatie",
    description: "Geen allesdoeners, maar experts in ons vakgebied. We richten ons op industrieën die we begrijpen en waar we impact kunnen maken."
  }
];

export default function Differentiators() {
  return (
    <section className="py-32 bg-gradient-to-b from-white via-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-gray-900 mb-6 relative inline-block">
            "Oké, wat maakt jou anders?"
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-orange-500 rounded-full opacity-75" />
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-20 mb-20">
          {differentiators.map((item, index) => (
            <div 
              key={index} 
              className="relative group hover:translate-y-[-8px] transition-all duration-300"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="absolute -top-8 left-8">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 text-lg bg-orange-600 text-white rounded-lg font-medium shadow-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
          >
            Ervaar het verschil
          </Link>
          <p className="mt-4 text-gray-600">
            Laat ons laten zien wat we voor u kunnen betekenen
          </p>
        </div>
      </div>
    </section>
  );
}