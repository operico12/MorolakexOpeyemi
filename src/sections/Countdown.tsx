import { useEffect, useRef, useState } from 'react';
import { Heart, Calendar } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Wedding date: October 24, 2026
  const weddingDate = new Date('2026-10-24T14:00:00');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      ref={sectionRef}
      id="countdown"
      className="relative w-full py-20 md:py-28 bg-gold overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Heart 
          className="absolute top-10 left-10 text-white/20 animate-float" 
          style={{ width: '60px', height: '60px', animationDuration: '5s' }}
          fill="currentColor" 
        />
        <Heart 
          className="absolute bottom-10 right-10 text-white/20 animate-float-slow" 
          style={{ width: '80px', height: '80px', animationDelay: '1s' }}
          fill="currentColor" 
        />
        <Heart 
          className="absolute top-1/2 right-20 text-white/10 animate-float" 
          style={{ width: '40px', height: '40px', animationDuration: '4s', animationDelay: '2s' }}
          fill="currentColor" 
        />
        <Heart 
          className="absolute bottom-20 left-20 text-white/10 animate-bob" 
          style={{ width: '50px', height: '50px' }}
          fill="currentColor" 
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className={`flex items-center justify-center gap-3 mb-6 transition-all duration-800 custom-ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="h-px w-12 bg-white/40" />
            <Calendar className="w-5 h-5 text-white/80" />
            <div className="h-px w-12 bg-white/40" />
          </div>

          <h2
            className={`font-script text-5xl md:text-6xl lg:text-7xl text-white mb-4 transition-all duration-800 custom-ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Counting Down
          </h2>

          <p
            className={`font-body text-white/80 text-lg transition-all duration-800 custom-ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Until we say "I Do"
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className={`relative transition-all duration-800 custom-ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 group hover:bg-white/20 transition-all duration-500">
                {/* Number */}
                <div className="text-center">
                  <span className="font-script text-5xl md:text-6xl lg:text-7xl text-white block leading-none">
                    {formatNumber(unit.value)}
                  </span>
                  <span className="font-body text-sm md:text-base text-white/70 uppercase tracking-widest mt-2 block">
                    {unit.label}
                  </span>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-3 right-3 opacity-30">
                  <Heart className="w-4 h-4 text-white" fill="currentColor" />
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </div>

              {/* Separator (except for last item) */}
              {index < timeUnits.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 text-white/40">
                  <span className="font-script text-3xl">:</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Wedding Date */}
        <div
          className={`mt-12 md:mt-16 text-center transition-all duration-800 custom-ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
            <Heart className="w-5 h-5 text-white" fill="currentColor" />
            <span className="font-body text-white text-lg">
              October 24, 2026 at 2:00 PM
            </span>
            <Heart className="w-5 h-5 text-white" fill="currentColor" />
          </div>
        </div>

        {/* Bottom Quote */}
        <div
          className={`mt-10 text-center transition-all duration-800 custom-ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <p className="font-script text-2xl md:text-3xl text-white/60">
            "Forever starts in..."
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="#f8f8f8"
          />
        </svg>
      </div>
    </section>
  );
};

export default Countdown;
