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
import Footer from './components/navigation/Footer';
import './App.css';

function App() {
  return (
    <div className="loom-app">
      <Header />
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
