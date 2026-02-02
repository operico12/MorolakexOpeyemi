import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x: x * 5, y: y * 5 });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-gold"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3)_0%,transparent_50%)]" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hearts" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <Heart className="w-4 h-4 text-white/30" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hearts)" />
        </svg>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-white/10 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-white/5 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Hero Image */}
        <div
          className={`relative w-full max-w-4xl mx-auto mb-12 transition-all duration-1500 custom-ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl animate-pulse-soft">
            <img
              src="/images/hero-couple.jpg"
              alt="Morolake and Opeyemi"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
          
          {/* Decorative Frame */}
          <div className="absolute -inset-4 border-2 border-white/30 rounded-3xl pointer-events-none" />
          <div className="absolute -inset-8 border border-white/10 rounded-[2rem] pointer-events-none" />
        </div>

        {/* Title Card with 3D Tilt Effect */}
        <div
          ref={titleRef}
          className={`relative text-center transition-all duration-1000 custom-ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ 
            transitionDelay: '800ms',
            transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
          }}
        >
          {/* Glass Morphism Card */}
          <div className="relative px-12 py-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
            {/* Pre-title */}
            <p
              className={`font-body text-white/80 text-lg tracking-[0.3em] uppercase mb-4 transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              We're getting married
            </p>
            
            {/* Main Title */}
            <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-white mb-6 text-shadow-gold">
              Morolake <span className="text-white/60">&</span> Opeyemi
            </h1>
            
            {/* Date */}
            <div
              className={`flex items-center justify-center gap-4 transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <div className="h-px w-16 bg-white/40" />
              <p className="font-body text-white text-xl md:text-2xl tracking-wider">
                October 24, 2026
              </p>
              <div className="h-px w-16 bg-white/40" />
            </div>
            
            {/* Decorative Hearts */}
            <div className="absolute -top-4 -left-4 text-white/40 animate-bob">
              <Heart className="w-8 h-8" fill="currentColor" />
            </div>
            <div className="absolute -bottom-4 -right-4 text-white/40 animate-bob" style={{ animationDelay: '1.5s' }}>
              <Heart className="w-6 h-6" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="font-body text-sm tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
