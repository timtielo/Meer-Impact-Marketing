import React from 'react';
import { TrendingUp, Users, LineChart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const metrics = [
  {
    icon: Users,
    value: "6+",
    label: "Tevreden Klanten",
    description: "Succesvolle samenwerkingen"
  },
  {
    icon: TrendingUp,
    value: "453%",
    label: "Gemiddelde ROI",
    description: "Return on Investment"
  },
  {
    icon: LineChart,
    value: "€20000+",
    label: "Extra Omzet",
    description: "Voor onze klanten"
  },
  {
    icon: Award,
    value: "100%",
    label: "Klanttevredenheid",
    description: "Blijvend tevreden klanten"
  }
];

export default function MetricsDashboard() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="h-8 w-8 text-blue-600" />
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-orange-600 rounded-full" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-4xl font-black text-gray-900">
                    {metric.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-800">
                    {metric.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {metric.description}
                  </div>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-600 rounded-2xl transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 text-lg bg-orange-600 text-white rounded-lg font-medium shadow-lg hover:bg-orange-700 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
          >
            Ontdek jouw groeipotentieel
          </Link>
          <p className="mt-4 text-gray-600">
            Wij helpen je om jouw doelen te bereiken
          </p>
        </div>
      </div>
    </section>
  );
}