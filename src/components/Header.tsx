import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const services = [
  { name: 'Meta Ads', path: '/diensten/meta-ads' },
  { name: 'Email Marketing', path: '/diensten/email-marketing' },
  { name: 'Copywriting', path: '/diensten/copywriting' },
  { name: 'Social Media Management', path: '/diensten/social-media-management' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150); // Small delay to prevent menu from closing during gap navigation
  };

  return (
    <header 
      className={`fixed w-full bg-white z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md py-2' : 'shadow-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="relative" ref={menuRef}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className="block"
              aria-label="Meer Impact Marketing - Home"
            >
              <img 
                src="/Meer Impact Marketing logo horizontal.png" 
                alt="Meer Impact Marketing" 
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-10' : 'h-12'
                } w-auto`}
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-3 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Sluit menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/gratis-guide" 
                className="text-gray-700 hover:text-blue-600 py-2"
              >
                Gratis Guide
              </Link>
              <Link 
                to="/marketing-analyse" 
                className="text-gray-700 hover:text-blue-600 py-2"
              >
                Marketing Analyse
              </Link>
              <Link 
                to="/testimonials" 
                className="text-gray-700 hover:text-blue-600 py-2"
              >
                Succesverhalen
              </Link>
              
              {/* Services Dropdown */}
              <div 
                className="relative"
                ref={servicesRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="inline-flex items-center text-gray-700 hover:text-blue-600 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                  aria-expanded={isServicesOpen}
                  aria-haspopup="true"
                >
                  <span className="mr-1">Diensten</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {isServicesOpen && (
                  <div
                    className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    role="menu"
                  >
                    <Link
                      to="/diensten"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      role="menuitem"
                    >
                      Alle diensten
                    </Link>
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        role="menuitem"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-blue-600 py-2"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 ${
                  isScrolled ? 'py-1.5' : 'py-2'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg transition-all duration-200 ease-in-out transform ${
              isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
            id="mobile-menu"
          >
            <div className="p-4 space-y-3">
              <Link
                to="/gratis-guide"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
              >
                Gratis Guide
              </Link>
              <Link
                to="/marketing-analyse"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
              >
                Marketing Analyse
              </Link>
              <Link
                to="/testimonials"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
              >
                Succesverhalen
              </Link>
              <Link
                to="/diensten"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
              >
                Diensten
              </Link>
              {services.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="block px-8 py-3 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                >
                  {service.name}
                </Link>
              ))}
              <Link
                to="/blog"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}