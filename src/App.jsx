import { useState, useEffect } from "react";

import Header from "./components/navigation/Header";

import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import BrandPromiseSection from "./sections/BrandPromiseSection";
import FabricCareSection from "./sections/FabricCareSection";
import PricingSection from "./sections/PricingSection";
import OrderTrackingSection from "./sections/OrderTrackingSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import BusinessServicesSection from "./sections/BusinessServicesSection";
import FinalCTASection from "./sections/FinalCTASection";
import LocationMapSection from "./sections/LocationMapSection";

import Footer from "./components/navigation/Footer";

import AuthPage from "./pages/AuthPage";
import Services from "./pages/Services";
import ServiceDetailPage from "./components/services/ServiceDetailPage";
import DryCleaningCatalogue from "./pages/DryCleaningCatalogue";

import "./App.css";


function App() {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash || "";

    if (hash === "#login") {
      return { page: "login" };
    }

    if (hash === "#signup") {
      return { page: "signup" };
    }

    if (hash === "#/services") {
      return { page: "services" };
    }

    // IMPORTANT:
    // Dry Cleaning Catalogue route must come BEFORE
    // the general #/services/:slug route
    if (hash === "#/services/dry-cleaning/catalogue") {
      return { page: "dryCleaningCatalogue" };
    }

    if (hash.startsWith("#/services/")) {
      return {
        page: "serviceDetail",
        slug: hash.replace("#/services/", ""),
      };
    }

    if (hash === "#services") {
      return { page: "services" };
    }

    return { page: "landing" };
  });


  // Listen for URL/hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "";

      if (hash === "#login") {
        setRoute({ page: "login" });
      }

      else if (hash === "#signup") {
        setRoute({ page: "signup" });
      }

      else if (hash === "#/services") {
        setRoute({ page: "services" });
      }

      // IMPORTANT:
      // Check catalogue BEFORE generic service route
      else if (hash === "#/services/dry-cleaning/catalogue") {
        setRoute({ page: "dryCleaningCatalogue" });
      }

      else if (hash.startsWith("#/services/")) {
        setRoute({
          page: "serviceDetail",
          slug: hash.replace("#/services/", ""),
        });
      }

      else if (hash === "#services") {
        setRoute({ page: "services" });
      }

      else {
        setRoute({ page: "landing" });
      }
    };


    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);


  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.page, route.slug]);


  // Open Login / Signup
  const openAuth = (mode) => {
    window.location.hash = `#${mode}`;
  };


  // Go back to homepage
  const backToHome = () => {
    window.location.hash = "#home";
  };


  // LOGIN / SIGNUP
  if (route.page === "login" || route.page === "signup") {
    return (
      <AuthPage
        initialMode={route.page}
        onBackToHome={backToHome}
      />
    );
  }


  // SERVICES LIST PAGE
  if (route.page === "services") {
    return (
      <>
        <Header onOpenAuth={openAuth} />

        <Services />

        <Footer />
      </>
    );
  }


  // DRY CLEANING PRODUCT CATALOGUE
  if (route.page === "dryCleaningCatalogue") {
    return (
      <>
        <Header onOpenAuth={openAuth} />

        <DryCleaningCatalogue />

        <Footer />
      </>
    );
  }


  // INDIVIDUAL SERVICE PAGE
  if (route.page === "serviceDetail") {
    return (
      <>
        <Header onOpenAuth={openAuth} />

        <ServiceDetailPage slug={route.slug} />

        <Footer />
      </>
    );
  }


  // HOMEPAGE
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