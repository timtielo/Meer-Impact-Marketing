import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import FreeGuide from './pages/FreeGuide';
import FreeGuideBedankt from './pages/FreeGuideBedankt';
import MarketingAnalyse from './pages/MarketingAnalyse';
import MarketingAnalyseBedankt from './pages/MarketingAnalyseBedankt';
import Privacy from './pages/Privacy';
import Voorwaarden from './pages/Voorwaarden';
import MetaAds from './pages/services/MetaAds';
import EmailMarketing from './pages/services/EmailMarketing';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diensten" element={<Services />} />
            <Route path="/diensten/meta-ads" element={<MetaAds />} />
            <Route path="/diensten/email-marketing" element={<EmailMarketing />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gratis-guide" element={<FreeGuide />} />
            <Route path="/gratis-guide-bedankt" element={<FreeGuideBedankt />} />
            <Route path="/marketing-analyse" element={<MarketingAnalyse />} />
            <Route path="/marketing-analyse-bedankt" element={<MarketingAnalyseBedankt />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/voorwaarden" element={<Voorwaarden />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;