import { useEffect } from 'react';
import './index.css';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';
import Hero from './sections/Hero';
import MatchReport from './sections/MatchReport';
import Squad from './sections/Squad';
import Fixtures from './sections/Fixtures';
import MediaGallery from './sections/MediaGallery';
import Footer from './sections/Footer';

function App() {
  // Initialize Lenis smooth scrolling
  useLenis();

  useEffect(() => {
    // Set page title from config
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }

    // Add viewport meta for better mobile experience
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-black overflow-x-hidden">
      {/* Hero Section - Immersive landing with zoom animation */}
      <Hero />

      {/* Match Report Section - Bento-box card */}
      <MatchReport />

      {/* Squad Section - Player profile cards */}
      <Squad />

      {/* Fixtures & Results Section - Flexbox list */}
      <Fixtures />

      {/* Media Gallery Section - Masonry grid */}
      <MediaGallery />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}

export default App;
