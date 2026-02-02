import { useEffect, useRef, useState } from 'react';
import { MapPin, Plane, Car, Hotel, Navigation, Heart } from 'lucide-react';

interface EventDay {
  title: string;
  date: string;
  location: string;
  address: string;
  mapUrl: string;
  type: 'engagement' | 'reception';
}

const eventDetails: EventDay[] = [
  {
    title: 'Engagement Ceremony',
    date: 'Friday, October 23, 2026',
    location: 'Akure, Ondo State',
    address: 'Family Compound, Alagbaka, Akure',
    mapUrl: 'https://maps.google.com/?q=Alagbaka+Akure+Ondo+State+Nigeria',
    type: 'engagement',
  },
  {
    title: 'Wedding Reception',
    date: 'Saturday, October 24, 2026',
    location: 'Akure, Ondo State',
    address: 'Jogor Centre, Igbatoro Road, Akure',
    mapUrl: 'https://maps.google.com/?q=Jogor+Centre+Akure+Ondo+State+Nigeria',
    type: 'reception',
  },
];

const travelInfo = [
  {
    icon: Plane,
    title: 'By Air',
    description: 'Akure Airport is the nearest airport. Lagos Murtala Muhammed International Airport is approximately 4 hours away by road.',
  },
  {
    icon: Car,
    title: 'By Road',
    description: 'Akure is accessible via the Lagos-Benin Expressway. Both venues are located in central Akure, Ondo State.',
  },
  {
    icon: Hotel,
    title: 'Accommodations',
    description: "We've reserved rooms at partner hotels in Akure. Use code 'MOROLAKEOPEYEMI' for special rates.",
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

  return (
    <section
      ref={sectionRef}
      id="venue"
      className="relative w-full py-20 md:py-28 bg-stone-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="h-px w-12 bg-amber-500" />
            <span className="font-body text-amber-500 text-sm tracking-[0.3em] uppercase">
              The Location
            </span>
            <div className="h-px w-12 bg-amber-500" />
          </div>

          <h2
            className={`font-script text-5xl md:text-6xl text-stone-800 mb-4 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Venue & Travel
          </h2>

          <div
            className={`flex items-center justify-center gap-2 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <Heart className="w-4 h-4 text-amber-500" fill="currentColor" />
            <div className="h-px w-16 bg-amber-300" />
            <Heart className="w-4 h-4 text-amber-500" fill="currentColor" />
          </div>
        </div>

        {/* Two Day Event Tabs */}
        <div
          className={`flex justify-center gap-4 mb-8 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '250ms' }}
        >
          {eventDetails.map((event, index) => (
            <button
              key={event.type}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-full font-body text-sm transition-all duration-300 ${
                activeTab === index
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'bg-white text-stone-600 hover:bg-amber-100 border border-stone-200'
              }`}
            >
              {event.type === 'engagement' ? 'Day 1: Engagement' : 'Day 2: Reception'}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Map Cards */}
          <div
            className={`space-y-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {eventDetails.map((event, index) => (
              <div
                key={event.type}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${
                  activeTab === index ? 'ring-2 ring-amber-500' : 'opacity-60 scale-95'
                }`}
              >
                {/* Map Placeholder - Clickable */}
                <div 
                  onClick={() => openMap(event.mapUrl)}
                  className="relative h-48 bg-stone-100 cursor-pointer group overflow-hidden"
                >
                  {/* Stylized Map Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200">
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C8C6E' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                  
                  {/* Center Pin */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <p className="mt-3 font-body text-sm text-stone-600 bg-white/80 px-3 py-1 rounded-full">
                      Click to open map
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-body ${
                      event.type === 'engagement' 
                        ? 'bg-rose-100 text-rose-600' 
                        : 'bg-amber-100 text-amber-600'
                    }`}>
                      {event.type === 'engagement' ? 'Engagement' : 'Reception'}
                    </span>
                    <span className="text-stone-400 text-xs font-body">{event.date}</span>
                  </div>
                  
                  <h3 className="font-script text-2xl text-stone-800 mb-1">
                    {event.title}
                  </h3>
                  <p className="font-body text-stone-600 mb-1">{event.location}</p>
                  <p className="font-body text-sm text-stone-500 mb-4">{event.address}</p>
                  
                  <button
                    onClick={() => openMap(event.mapUrl)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-amber-500 text-amber-600 rounded-lg font-body text-sm hover:bg-amber-500 hover:text-white transition-all duration-300"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Travel Info */}
          <div
            className={`space-y-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {travelInfo.map((info, index) => (
              <div
                key={info.title}
                className={`flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-script text-xl text-stone-800 mb-2">
                    {info.title}
                  </h4>
                  <p className="font-body text-sm text-stone-600 leading-relaxed">
                    {info.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Note Card */}
            <div
              className={`p-6 bg-amber-50 rounded-xl border border-amber-200 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <p className="font-body text-sm text-amber-800 text-center">
                <span className="font-semibold">Need help?</span> Contact us at{' '}
                <a href="tel:+2348012345678" className="underline hover:text-amber-600">
                  +234 801 234 5678
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueTravel;
