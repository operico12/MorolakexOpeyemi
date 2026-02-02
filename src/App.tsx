import { useState, useEffect } from 'react';
import Envelope from './sections/Envelope';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Countdown from './sections/Countdown';
import OurStory from './sections/OurStory';
import WeddingDetails from './sections/WeddingDetails';
import Gallery from './sections/Gallery';
import VenueTravel from './sections/VenueTravel'; // ← ADD THIS LINE
import RSVP from './sections/RSVP';
import Footer from './sections/Footer';
import './App.css';

function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleEnvelopeOpen = () => {
    setEnvelopeOpened(true);
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  // Prevent scrolling when envelope is showing
  useEffect(() => {
    if (!envelopeOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [envelopeOpened]);

  return (
    <div className="relative min-h-screen bg-gray-4 grain-overlay">
      {/* Envelope Overlay */}
      {!envelopeOpened && (
        <Envelope onOpen={handleEnvelopeOpen} />
      )}

      {/* Main Content */}
      <div 
        className={`transition-all duration-1000 ${
          showContent 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <Navigation />
        <main>
          <Hero />
          <Countdown />
          <OurStory />
          <WeddingDetails />
          <Gallery />
          <VenueTravel /> {/* ← ADD THIS LINE */}
          <RSVP />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
