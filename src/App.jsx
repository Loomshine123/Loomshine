import { useState, useEffect } from "react";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import HomePage from "./pages/HomePage";
import TrackOrderPage from "./pages/TrackOrderPage";
import AuthPage from "./pages/AuthPage";
import Services from "./pages/Services";
import ServiceDetailPage from "./components/services/ServiceDetailPage";
import DryCleaningCatalogue from "./pages/DryCleaningCatalogue";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";
import "./App.css";

function getRouteFromHash(hashStr) {
  const hash = hashStr || window.location.hash || "";

  if (hash === "#/login" || hash.startsWith("#/login")) {
    return { page: "login" };
  }
  if (hash === "#/signup" || hash.startsWith("#/signup")) {
    return { page: "signup" };
  }
  if (
    hash === "#/track-order" ||
    hash === "#track-order" ||
    hash.startsWith("#/track-order") ||
    hash.startsWith("#track-order") ||
    hash.startsWith("#/track") ||
    hash.startsWith("#track")
  ) {
    return { page: "track-order" };
  }
  if (hash === "#/services" || hash === "#services") {
    return { page: "services" };
  }
  if (
    hash === "#/contact" ||
    hash === "#contact" ||
    hash.startsWith("#/contact") ||
    hash.startsWith("#contact")
  ) {
    return { page: "contact" };
  }
  if (
    hash === "#/pricing" ||
    hash.startsWith("#/pricing") ||
    hash === "#pricing" ||
    hash.startsWith("#pricing?")
  ) {
    const queryPart = hash.includes("?") ? hash.split("?")[1] : "";
    const params = new URLSearchParams(queryPart);
    return {
      page: "pricing",
      service: params.get("service") || "dry-cleaning",
    };
  }
  // IMPORTANT: Dry Cleaning Catalogue route must come BEFORE generic #/services/:slug route
  if (hash === "#/services/dry-cleaning/catalogue") {
    return { page: "dryCleaningCatalogue" };
  }
  if (hash.startsWith("#/services/")) {
    return {
      page: "serviceDetail",
      slug: hash.replace("#/services/", ""),
    };
  }
  return { page: "home" };
}

function App() {
  const [route, setRoute] = useState(() => getRouteFromHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash(window.location.hash));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.page, route.slug]);

  const openAuth = (mode) => {
    window.location.hash = `#${mode}`;
  };

  const backToHome = () => {
    window.location.hash = "#home";
  };

  if (route.page === "login" || route.page === "signup") {
    return <AuthPage initialMode={route.page} onBackToHome={backToHome} />;
  }

  if (route.page === "services") {
    return (
      <>
        <Header onOpenAuth={openAuth} currentPage={route.page} />
        <Services />
        <Footer />
      </>
    );
  }
  if (route.page === "contact") {
    return (
      <>
        <Header onOpenAuth={openAuth} currentPage={route.page} />
        <ContactPage />
        <Footer />
      </>
    );
  }

  if (route.page === "pricing") {
    return (
      <>
        <Header onOpenAuth={openAuth} currentPage={route.page} />
        <PricingPage initialService={route.service || "dry-cleaning"} />
        <Footer />
      </>
    );
  }

  if (route.page === "dryCleaningCatalogue") {
    return (
      <>
        <Header onOpenAuth={openAuth} currentPage={route.page} />
        <DryCleaningCatalogue />
        <Footer />
      </>
    );
  }

  if (route.page === "serviceDetail") {
    return (
      <>
        <Header onOpenAuth={openAuth} currentPage={route.page} />
        <ServiceDetailPage slug={route.slug} />
        <Footer />
      </>
    );
  }

  if (route.page === "track-order") {
    return (
      <>
        <Header onOpenAuth={openAuth} currentPage={route.page} />
        <TrackOrderPage />
        <Footer />
      </>
    );
  }

  return (
    <div className="loom-app">
      <Header onOpenAuth={openAuth} currentPage={route.page} />
      <main>
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default App;