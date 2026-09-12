import { useState, useEffect } from "react";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import HomePage from "./pages/HomePage";
import TrackOrderPage from "./pages/TrackOrderPage";
import AuthPage from "./pages/AuthPage";
import Services from "./pages/Services";
import ServiceDetailPage from "./components/services/ServiceDetailPage";
import DryCleaningCatalogue from "./pages/DryCleaningCatalogue";
import BookPickupPage from "./pages/BookPickupPage";
import "./App.css";

function getRouteFromHash(hashStr) {
  const hash = hashStr || window.location.hash || "";

  if (hash === "#login" || hash.startsWith("#login")) {
    return { page: "login" };
  }
  if (hash === "#signup" || hash.startsWith("#signup")) {
    return { page: "signup" };
  }
  if (hash === "#book-pickup" || hash === "#/book-pickup" || hash.startsWith("#book-pickup")) {
    return { page: "book-pickup" };
  }
  if (hash.startsWith("#track-order") || hash.startsWith("#track")) {
    return { page: "track-order" };
  }
  if (hash === "#/services" || hash === "#services") {
    return { page: "services" };
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

  if (route.page === "book-pickup") {
    return <BookPickupPage onOpenAuth={openAuth} />;
  }

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

  return (
    <div className="loom-app">
      <Header onOpenAuth={openAuth} currentPage={route.page} />
      <main>
        {route.page === "track-order" ? <TrackOrderPage /> : <HomePage />}
      </main>
      <Footer />
    </div>
  );
}

export default App;