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
import Copywriting from './pages/services/Copywriting';
import SocialMediaManagement from './pages/services/SocialMediaManagement';
import Visitekaartje from './pages/Visitekaartje';
import VisitekaartjeSuccess from './pages/VisitekaartjeSuccess';
import GuideLanding from './pages/GuideLanding';

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
      <Routes>
        {/* Landing page route without header/footer */}
        <Route path="/guide" element={<GuideLanding />} />
        
        {/* Routes with header and footer */}
        <Route element={
          <>
            <Header />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/diensten" element={<Services />} />
                <Route path="/diensten/meta-ads" element={<MetaAds />} />
                <Route path="/diensten/email-marketing" element={<EmailMarketing />} />
                <Route path="/diensten/copywriting" element={<Copywriting />} />
                <Route path="/diensten/social-media-management" element={<SocialMediaManagement />} />
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
                <Route path="/visitekaartje" element={<Visitekaartje />} />
                <Route path="/visitekaartje-success" element={<VisitekaartjeSuccess />} />
              </Routes>
            </main>
            <Footer />
          </>
        } path="*" />
      </Routes>
    </Router>
  );
}

export default App;