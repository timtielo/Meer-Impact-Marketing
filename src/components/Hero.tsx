import React from 'react';
import { ArrowRight, Target, Users, BarChart, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Main Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-base font-medium">
              <Zap className="h-5 w-5 mr-2" />
              Boost jouw online aanwezigheid
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-gray-900 leading-tight">
              <span className="text-orange-700 inline-block hover:scale-105 transition-transform duration-300">Meer</span>{' '}
              <span className="text-gray-900">Groei,</span>
              <br />
              <span className="text-orange-700 inline-block hover:scale-105 transition-transform duration-300">Meer</span>{' '}
              <span className="text-gray-900">Klanten,</span>
              <br />
              <span className="text-orange-700 inline-block hover:scale-105 transition-transform duration-300">Meer</span>{' '}
              <span className="text-gray-900">Impact.</span>
            </h1>
            <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-900">
              Gegarandeerd.
            </p>
            <div className="flex flex-wrap gap-4 pt-8">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 text-lg bg-orange-700 text-white rounded-lg font-medium shadow-lg hover:bg-orange-800 transition-all duration-300 hover:shadow-xl"
              >
                Start jouw groei
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
              <Link
                to="/diensten"
                className="inline-flex items-center px-8 py-4 text-lg bg-white text-gray-900 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Ontdek onze aanpak
                <ChevronRight className="ml-2 h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 rounded-2xl animate-gradient opacity-50" />
            <div className="relative grid grid-cols-2 gap-4 p-6 backdrop-blur-sm">
              {[
                { icon: Target, label: "Doelgericht" },
                { icon: BarChart, label: "Meetbaar" },
                { icon: Users, label: "Persoonlijk" },
                { icon: Zap, label: "Effectief" }
              ].map(({ icon: Icon, label }, index) => (
                <div key={label} className={`bg-white/90 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-float-${index + 1}`}>
                  <div className="text-orange-700 mb-3">
                    <Icon className="h-10 w-10" />
                  </div>
                  <p className="font-medium text-gray-900 text-lg">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}