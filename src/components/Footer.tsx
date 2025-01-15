import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: Phone,
      label: "Telefoonnummer",
      value: "+31 6 3648 1352",
      href: "tel:+31636481352"
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@meerimpactmarketing.nl",
      href: "mailto:info@meerimpactmarketing.nl"
    },
    {
      icon: MapPin,
      label: "Locatie",
      value: "Amersfoort, Nederland"
    }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/people/Meer-Impact-Marketing/61566630873245/",
      label: "Facebook"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/meerimpactmarketing/",
      label: "Instagram"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/meer-impact-marketing/",
      label: "LinkedIn"
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Meer Impact Marketing</h3>
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <p key={index} className="flex items-center">
                  <item.icon className="h-5 w-5 mr-2 text-blue-500" />
                  {item.href ? (
                    <a href={item.href} className="hover:text-blue-500 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Snelle Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="hover:text-blue-500 transition-colors">
                  Blog
                </Link>
              </li>
                <li>
                <Link to="/testimonials" className="hover:text-blue-500 transition-colors">
                  Succesverhalen
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Onze Diensten</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/diensten/meta-ads" className="hover:text-blue-500 transition-colors">
                  Meta Ads
                </Link>
              </li>
              <li>
                <Link to="/diensten/email-marketing" className="hover:text-blue-500 transition-colors">
                  Email marketing
                </Link>
              </li>
                 <li>
                <Link to="/diensten/" className="hover:text-blue-500 transition-colors">
                  Alle diensten
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gratis-guide" className="hover:text-blue-500 transition-colors">
                  Gratis Guide
                </Link>
              </li>
              <li>
                <Link to="/marketing-analyse" className="hover:text-blue-500 transition-colors">
                  Marketing Analyse
                </Link>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-white text-sm font-semibold mb-3">Volg ons</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {currentYear} Meer Impact Marketing door{' '}
              <a href="https://tielo-digital.nl/" className="text-sm hover:text-blue-500 transition-colors">
                Tielo Digital
              </a>. Alle rechten voorbehouden.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm hover:text-blue-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/voorwaarden" className="text-sm hover:text-blue-500 transition-colors">
                Algemene Voorwaarden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}