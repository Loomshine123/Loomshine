import { useState, useEffect } from "react";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import HomePage from "./pages/HomePage";
import TrackOrderPage from "./pages/TrackOrderPage";
import Services from "./pages/Services";
import ServiceDetailPage from "./components/services/ServiceDetailPage";
import DryCleaningCatalogue from "./pages/DryCleaningCatalogue";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function getRouteFromHash(hashStr) {
  let hash = hashStr || (typeof window !== "undefined" ? window.location.hash : "") || "";
  if (hash && !hash.startsWith("#")) {
    hash = "#" + hash;
  }

  // Anchor section routes on home page
  const cleanAnchor = hash.replace(/^#\/?/, "").split("?")[0].toLowerCase();
  if (cleanAnchor === "how-it-works" || cleanAnchor === "howitworks") {
    return { page: "home", section: "how-it-works" };
  }
  if (
    cleanAnchor === "business" ||
    cleanAnchor === "business-services" ||
    cleanAnchor === "b2b" ||
    cleanAnchor === "business-b2b"
  ) {
    return { page: "home", section: "business" };
  }
  if (cleanAnchor === "pricing-section" || cleanAnchor === "pricing-table") {
    return { page: "home", section: "pricing" };
  }
  if (cleanAnchor === "testimonials") {
    return { page: "home", section: "testimonials" };
  }
  if (cleanAnchor === "fabrics" || cleanAnchor === "fabric-care") {
    return { page: "home", section: "fabrics" };
  }

  // Shopping Bag / Cart Page
  if (
    hash === "#/cart" ||
    hash === "#cart" ||
    hash.startsWith("#/cart") ||
    hash.startsWith("#cart")
  ) {
    return { page: "cart" };
  }

  // Obsolete auth routes gracefully redirect to home
  if (
    hash === "#/login" ||
    hash.startsWith("#/login") ||
    hash === "#login" ||
    hash === "#/signup" ||
    hash.startsWith("#/signup") ||
    hash === "#signup"
  ) {
    return { page: "home", section: null };
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
    hash === "#/about" ||
    hash.startsWith("#/about") ||
    hash === "#about" ||
    hash.startsWith("#about")
  ) {
    return { page: "about" };
  }
  if (
    hash === "#/contact" ||
    hash === "#contact" ||
    hash.startsWith("#/contact") ||
    hash.startsWith("#contact")
  ) {
    const queryPart = hash.includes("?") ? hash.split("?")[1] : "";
    const params = new URLSearchParams(queryPart);
    return {
      page: "contact",
      service: params.get("service") || params.get("services") || "",
      item: params.get("item") || "",
    };
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
  return { page: "home", section: null };
}

function AppContent() {
  const [route, setRoute] = useState(() => getRouteFromHash(window.location.hash));

  const scrollToSection = (sectionId, retries = 6) => {
    if (!sectionId) return;

    const attemptScroll = (remaining) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (remaining > 0) {
        setTimeout(() => attemptScroll(remaining - 1), 60);
      }
    };

    requestAnimationFrame(() => attemptScroll(retries));
  };

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = getRouteFromHash(window.location.hash);
      setRoute(nextRoute);
      if (nextRoute.section) {
        scrollToSection(nextRoute.section);
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (route.section) {
      scrollToSection(route.section);
    } else {
      window.scrollTo(0, 0);
    }
  }, [route.page, route.section, route.slug]);

  const navigate = (target) => {
    if (!target) return;
    let targetHash = target;
    if (!targetHash.startsWith("#")) {
      targetHash = "#" + targetHash;
    }
    const nextRoute = getRouteFromHash(targetHash);
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    setRoute(nextRoute);

    if (nextRoute.section) {
      scrollToSection(nextRoute.section);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const renderCurrentPage = () => {
    switch (route.page) {
      case "cart":
        return <CartPage />;
      case "services":
        return <Services />;
      case "about":
        return <AboutPage />;
      case "contact":
        return (
          <ContactPage
            initialService={route.service}
            initialItem={route.item}
          />
        );
      case "pricing":
        return <PricingPage initialService={route.service || "dry-cleaning"} />;
      case "dryCleaningCatalogue":
        return <DryCleaningCatalogue />;
      case "serviceDetail":
        return <ServiceDetailPage slug={route.slug} />;
      case "track-order":
        return <TrackOrderPage />;
      default:
        return (
          <main>
            <HomePage />
          </main>
        );
    }
  };

  return (
    <div className="loom-app">
      <Header
        currentPage={route.page}
        currentSection={route.section}
        onNavigate={navigate}
      />
      {renderCurrentPage()}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}