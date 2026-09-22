import HeroSection from '../sections/HeroSection';
import ServicesSection from '../sections/ServicesSection';
import FeaturedProductsSection from '../sections/FeaturedProductsSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import BrandPromiseSection from '../sections/BrandPromiseSection';
import FabricCareSection from '../sections/FabricCareSection';
import PricingSection from '../sections/PricingSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import BusinessServicesSection from '../sections/BusinessServicesSection';
import AEOKnowledgeSection from '../components/common/AEOKnowledgeSection';
import FinalCTASection from '../sections/FinalCTASection';
import LocationMapSection from '../sections/LocationMapSection';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedProductsSection />
      <HowItWorksSection />
      <BrandPromiseSection />
      <FabricCareSection />
      <PricingSection />
      <TestimonialsSection />
      <BusinessServicesSection />
      <AEOKnowledgeSection />
      <FinalCTASection />
      <LocationMapSection />
    </>
  );
};

export default HomePage;
