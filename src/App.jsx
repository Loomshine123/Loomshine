import { useState, useEffect } from 'react';
import Header from './components/navigation/Header';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import HowItWorksSection from './sections/HowItWorksSection';
import BrandPromiseSection from './sections/BrandPromiseSection';
import FabricCareSection from './sections/FabricCareSection';
import PricingSection from './sections/PricingSection';
import OrderTrackingSection from './sections/OrderTrackingSection';
import TestimonialsSection from './sections/TestimonialsSection';
import BusinessServicesSection from './sections/BusinessServicesSection';
import FinalCTASection from './sections/FinalCTASection';
import LocationMapSection from './sections/LocationMapSection';
import Footer from './components/navigation/Footer';
import AuthPage from './pages/AuthPage';
import './App.css';

//function App() {
  //return (
    //<div className="app-container">
      //<img
        //src="/banner.png"
        //alt="Loom Shine Coming Soon Banner"
        //className="main-banner"
        //onError={(e) => {
          //e.target.onerror = null;
          //
          //e.target.style.display = 'none';
          //e.target.insertAdjacentHTML('afterend', '<h2 style="color: #001A41; font-family: sans-serif;">Please save the banner image as banner.jpg in the public folder.</h2>');
        //}}
      ///>
    //</div>
  //)
//}

//export default App

import Services from "./pages/Services";

function App() {
  const [view, setView] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#login') return 'login';
    if (hash === '#signup') return 'signup';
    return 'landing';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#login') setView('login');
      else if (hash === '#signup') setView('signup');
      else if (hash === '' || hash === '#home') setView('landing');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openAuth = (mode) => {
    setView(mode);
    window.location.hash = mode;
  };

  const backToHome = () => {
    setView('landing');
    if (window.location.hash === '#login' || window.location.hash === '#signup') {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  if (view === 'login' || view === 'signup') {
    return <AuthPage initialMode={view} onBackToHome={backToHome} />;
  }

  return (
    <div className="loom-app">
      <Header onOpenAuth={openAuth} />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <BrandPromiseSection />
        <FabricCareSection />
        <PricingSection />
        <OrderTrackingSection />
        <TestimonialsSection />
        <BusinessServicesSection />
        <FinalCTASection />
        <LocationMapSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
