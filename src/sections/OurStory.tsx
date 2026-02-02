import { useEffect, useRef, useState } from 'react';
import { Heart, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OurStory = () => {
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
      id="our-story"
      className="relative w-full py-24 md:py-32 bg-gray-4 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1">
            {/* Pre-title */}
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-800 custom-ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="h-px w-12 bg-gold" />
              <span className="font-body text-gold text-sm tracking-[0.2em] uppercase">
                Our Story
              </span>
            </div>

            {/* Title */}
            <h2
              className={`font-script text-5xl md:text-6xl lg:text-7xl text-black mb-8 transition-all duration-800 custom-ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              We are getting<br />married
            </h2>

            {/* Story Text */}
            <div
              className={`space-y-6 transition-all duration-800 custom-ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <p className="font-body text-gray-1 text-lg leading-relaxed">
                We met three years ago at a mutual friend's birthday party. What started as a 
                casual conversation quickly turned into something magical. John spilled his drink 
                on Megan's shoes, and the rest, as they say, is history.
              </p>
              <p className="font-body text-gray-2 leading-relaxed">
                Since that fateful day, we've traveled the world together, built a home filled 
                with love and laughter, and created countless memories that we'll cherish forever. 
                Through every adventure and challenge, our love has only grown stronger.
              </p>
              <p className="font-body text-gray-2 leading-relaxed">
                Now, we're excited to begin this new chapter of our lives together, and we 
                would be honored to have you celebrate this special day with us.
              </p>
            </div>

            {/* Quick Info */}
            <div
              className={`flex flex-wrap gap-6 mt-10 transition-all duration-800 custom-ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-body text-sm text-gray-2">Date</p>
                  <p className="font-body text-black font-medium">June 20, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-body text-sm text-gray-2">Location</p>
                  <p className="font-body text-black font-medium">St. Mary's Church</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div
              className={`mt-10 transition-all duration-800 custom-ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <Button
                variant="outline"
                className="group relative overflow-hidden border-2 border-gold text-gold hover:text-white px-8 py-6 text-lg font-body tracking-wide transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Read our story
                  <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gold transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2 relative">
            {/* Animated Divider Line */}
            <div
              className={`hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px bg-gold/30 transition-all duration-1000 ${
                isVisible ? 'h-full' : 'h-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            />

            <div
              className={`relative transition-all duration-1000 custom-ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/our-story.jpg"
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-gold/30 rounded-2xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/10 rounded-2xl -z-10" />

              {/* Floating Heart */}
              <div className="absolute -top-4 right-10 text-gold animate-bob">
                <Heart className="w-10 h-10" fill="currentColor" />
              </div>

              {/* Quote Card */}
              <div
                className={`absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-6 max-w-xs transition-all duration-800 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <Heart className="w-6 h-6 text-gold mb-3" />
                <p className="font-script text-2xl text-black leading-relaxed">
                  "Love is composed of a single soul inhabiting two bodies."
                </p>
                <p className="font-body text-sm text-gray-2 mt-2">— Aristotle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
