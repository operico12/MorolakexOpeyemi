import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Heart, Calendar } from 'lucide-react';

interface EventDay {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  mapUrl: string;
  type: 'engagement' | 'reception';
}

const eventDetails: EventDay[] = [
  {
    title: 'Traditional Engagement',
    date: 'Friday, October 23, 2026',
    time: '10:00 AM',
    location: 'Akure, Ondo State',
    address: 'Julie Jane Event Center, Akure',
    mapUrl: 'https://www.google.com/maps/place/Julie+Jane+Event+Center/@7.2880875,5.1581907,17z',
    type: 'engagement',
  },
  {
    title: 'White Wedding Reception',
    date: 'Saturday, October 24, 2026',
    time: '2:00 PM',
    location: 'Akure, Ondo State',
    address: 'Amazing Place Event Centre, Akure',
    mapUrl: 'https://www.google.com/maps/place/Amazing+Place+Event+Centre/@7.2266296,5.2122405,17z',
    type: 'reception',
  },
];

const VenueTravel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openMap = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const activeEvent = eventDetails[activeTab];

  return (
    <section
      ref={sectionRef}
      id="venue"
      className="relative w-full py-20 md:py-24 bg-gradient-to-b from-white via-stone-50 to-white overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      
      {/* Floating Decorations */}
      <div className="absolute top-20 left-10 opacity-10">
        <Heart className="w-24 h-24 text-amber-400" fill="currentColor" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <Heart className="w-32 h-32 text-amber-400" fill="currentColor" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Elegant */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-4 mb-6 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400" />
            <Heart className="w-5 h-5 text-amber-500 animate-pulse" fill="currentColor" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          <p
            className={`font-body text-amber-600 text-sm tracking-[0.4em] uppercase mb-4 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Join Us
          </p>

          <h2
            className={`font-script text-6xl md:text-7xl lg:text-8xl text-stone-800 mb-2 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Celebrate
          </h2>
          
          <p
            className={`font-body text-stone-500 text-lg italic transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Two Days, Two Moments, One Love
          </p>
        </div>

        {/* Day Selector - Pill Style */}
        <div
          className={`flex justify-center mb-10 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="bg-white p-1.5 rounded-full shadow-lg border border-stone-100">
            {eventDetails.map((event, index) => (
              <button
                key={event.type}
                onClick={() => setActiveTab(index)}
                className={`relative px-8 py-3 rounded-full font-body text-sm transition-all duration-500 ${
                  activeTab === index
                    ? 'text-white'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {activeTab === index && (
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-md" />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Day {index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Elegant Card */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-stone-800 to-stone-900 py-6 px-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }} />
              </div>
              <span className={`relative z-10 inline-block px-4 py-1 rounded-full text-xs font-body tracking-wider uppercase ${
                activeEvent.type === 'engagement' 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {activeEvent.type === 'engagement' ? 'Traditional Ceremony' : 'Wedding Reception'}
              </span>
            </div>

            <div className="grid md:grid-cols-2">
              {/* Map Side */}
              <div 
                onClick={() => openMap(activeEvent.mapUrl)}
                className="relative h-72 md:h-auto min-h-[300px] bg-stone-100 cursor-pointer group overflow-hidden"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100">
                  <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
                      </pattern>
                      <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                  </div>
                </div>

                {/* Pulsing Pin */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-20" />
                    <div className="relative w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                      <MapPin className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <p className="mt-6 font-script text-2xl text-stone-700 bg-white/90 px-6 py-2 rounded-full shadow-lg">
                    View on Map
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info Side */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Date Block */}
                  <div className="text-center md:text-left">
                    <p className="font-body text-amber-600 text-sm tracking-widest uppercase mb-2">
                      Save the Date
                    </p>
                    <h3 className="font-script text-4xl md:text-5xl text-stone-800 leading-tight">
                      {activeEvent.date}
                    </h3>
                    <p className="font-body text-stone-500 text-lg mt-1 flex items-center justify-center md:justify-start gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full" />
                      {activeEvent.time}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-24 h-px bg-gradient-to-r from-amber-400 to-transparent mx-auto md:mx-0" />

                  {/* Location Block */}
                  <div className="text-center md:text-left">
                    <p className="font-body text-stone-400 text-sm tracking-widest uppercase mb-2">
                      Venue
                    </p>
                    <h4 className="font-script text-3xl text-stone-700 mb-1">
                      {activeEvent.title}
                    </h4>
                    <p className="font-body text-stone-600 text-lg">
                      {activeEvent.location}
                    </p>
                    <p className="font-body text-stone-400 text-sm mt-1 italic">
                      {activeEvent.address}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => openMap(activeEvent.mapUrl)}
                    className="w-full md:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-stone-800 text-white rounded-xl font-body text-sm tracking-wider uppercase hover:bg-amber-500 transition-all duration-500 shadow-lg hover:shadow-amber-500/30"
                  >
                    <Navigation className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Event Indicator Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {eventDetails.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeTab === index 
                    ? 'bg-amber-500 w-8' 
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueTravel;
