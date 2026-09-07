import { useState, useEffect } from 'react';
import Header from './components/navigation/Header';
import Footer from './components/navigation/Footer';
import HomePage from './pages/HomePage';
import TrackOrderPage from './pages/TrackOrderPage';
import AuthPage from './pages/AuthPage';
import './App.css';

function getPageFromHash(hash) {
  if (hash.startsWith('#track-order') || hash.startsWith('#track')) {
    return 'track-order';
  }
  if (hash.startsWith('#login')) {
    return 'login';
  }
  if (hash.startsWith('#signup')) {
    return 'signup';
  }
  return 'home';
}

function App() {
  const [page, setPage] = useState(() => getPageFromHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      const currentPage = getPageFromHash(window.location.hash);
      setPage(currentPage);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openAuth = (mode) => {
    setPage(mode);
    window.location.hash = mode;
  };

  const backToHome = () => {
    setPage('home');
    window.location.hash = 'home';
    window.history.pushState('', document.title, window.location.pathname);
  };

  if (page === 'login' || page === 'signup') {
    return <AuthPage initialMode={page} onBackToHome={backToHome} />;
  }

  return (
    <div className="loom-app">
      <Header onOpenAuth={openAuth} currentPage={page} />
      <main>
        {page === 'track-order' ? <TrackOrderPage /> : <HomePage />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
