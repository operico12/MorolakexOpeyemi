import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-12 md:py-16 bg-black overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span 
          className="font-script text-[20vw] text-white/[0.03] whitespace-nowrap"
        >
          M & J
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="text-center mb-8">
          {/* Names */}
          <div
            className={`transition-all duration-800 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-script text-4xl md:text-5xl lg:text-6xl text-white mb-3">
              Morolake <span className="text-gold">&</span> Opeyemi
            </h2>
          </div>

          {/* Date */}
          <div
            className={`flex items-center justify-center gap-4 mb-6 transition-all duration-800 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="h-px w-12 bg-gold/40" />
            <p className="font-body text-gold text-base tracking-wider">
              October 24, 2026
            </p>
            <div className="h-px w-12 bg-gold/40" />
          </div>

          {/* Quote */}
          <p
            className={`font-script text-xl md:text-2xl text-white/60 max-w-xl mx-auto mb-3 transition-all duration-800 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            "Two souls, one heart, forever intertwined"
          </p>

          {/* Hashtag */}
          <p
            className={`font-body text-base md:text-lg text-gold/80 transition-all duration-800 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            #MoLoveStory2026
          </p>
        </div>

        {/* Divider */}
        <div
          className={`w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-6 transition-all duration-800 ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        />

        {/* Copyright */}
        <div
          className={`text-center text-white/40 transition-all duration-800 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <p className="font-body text-sm flex items-center justify-center gap-2 mb-2">
            Made with <Heart className="w-4 h-4 text-gold" fill="currentColor" /> for our special day
          </p>
          <p className="font-body text-xs">
            © 2026 Morolake & Opeyemi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
