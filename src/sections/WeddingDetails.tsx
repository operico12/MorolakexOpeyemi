import { useEffect, useRef, useState } from 'react';
import { Church, Utensils, Music, Clock, MapPin } from 'lucide-react';

interface EventDetail {
  icon: React.ElementType;
  title: string;
  time: string;
  location: string;
  description: string;
}

const events: EventDetail[] = [
  {
    icon: Church,
    title: 'The Ceremony',
    time: '2:00 PM',
    location: 'St. Mary\'s Church',
    description: 'Join us as we exchange our vows in a beautiful ceremony filled with love and joy.',
  },
  {
    icon: Music,
    title: 'The Reception',
    time: '5:00 PM',
    location: 'Grand Ballroom',
    description: 'Cocktails, canapés, and celebration as we begin our journey as husband and wife.',
  },
  {
    icon: Utensils,
    title: 'The Dinner',
    time: '7:00 PM',
    location: 'Garden Terrace',
    description: 'An elegant dinner under the stars with our closest family and friends.',
  },
];

const WeddingDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      ref={sectionRef}
      id="details"
      className="relative w-full py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #d8af72 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div
            className={`flex items-center justify-center gap-3 mb-6 transition-all duration-800 custom-ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-gold text-sm tracking-[0.2em] uppercase">
              Wedding Details
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>

          <h2
            className={`font-script text-5xl md:text-6xl lg:text-7xl text-black transition-all duration-800 custom-ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            The Schedule
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gold/30 -translate-y-1/2" />

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {events.map((event, index) => {
              const Icon = event.icon;
              return (
                <div
                  key={event.title}
                  className={`relative transition-all duration-800 custom-ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  {/* Event Card */}
                  <div className="group relative bg-gray-4 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gold/20">
                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-500 animate-bob">
                        <Icon className="w-8 h-8 text-gold group-hover:text-white transition-colors duration-500" />
                      </div>
                      {/* Connection Dot - Desktop */}
                      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold/30 group-hover:bg-gold transition-colors duration-500" style={{ top: '-40px' }} />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="font-script text-3xl md:text-4xl text-black mb-4">
                        {event.title}
                      </h3>

                      {/* Time & Location */}
                      <div className="flex flex-col items-center gap-2 mb-4">
                        <div className="flex items-center gap-2 text-gold">
                          <Clock className="w-4 h-4" />
                          <span className="font-body text-sm font-medium">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-2">
                          <MapPin className="w-4 h-4" />
                          <span className="font-body text-sm">{event.location}</span>
                        </div>
                      </div>

                      <p className="font-body text-gray-2 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div
          className={`mt-16 md:mt-20 text-center transition-all duration-800 custom-ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <div className="inline-flex items-center gap-4 bg-gold/10 rounded-full px-8 py-4">
            <Clock className="w-5 h-5 text-gold" />
            <span className="font-body text-gray-1">
              Please arrive <span className="text-gold font-medium">30 minutes early</span> for the ceremony
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;
