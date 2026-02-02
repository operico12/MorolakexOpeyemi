import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#our-story' },
  { label: 'Details', href: '#details' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
];

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

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-16 md:py-24 bg-black overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span 
          className="font-script text-[20vw] text-white/[0.03] whitespace-nowrap animate-float-slow"
          style={{ animationDuration: '20s' }}
        >
          M & J
        </span>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-20 bg-gradient-to-b from-gold/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-20 bg-gradient-to-b from-gold/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* Names */}
          <div
            className={`transition-all duration-800 custom-ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-script text-5xl md:text-6xl lg:text-7xl text-white mb-4">
              Morolake <span className="text-gold">&</span> Opeyemi
            </h2>
          </div>

          {/* Date */}
          <div
            className={`flex items-center justify-center gap-4 mb-8 transition-all duration-800 custom-ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="h-px w-16 bg-gold/40" />
            <p className="font-body text-gold text-lg tracking-wider">
              June 20, 2025
            </p>
            <div className="h-px w-16 bg-gold/40" />
          </div>

          {/* Quote */}
          <p
            className={`font-script text-2xl md:text-3xl text-white/60 max-w-xl mx-auto transition-all duration-800 custom-ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            "Two souls, one heart, forever intertwined"
          </p>

          {/* Hashtag - Styled differently */}
          <p
            className={`font-body text-lg md:text-xl text-gold/80 max-w-xl mx-auto mt-4 transition-all duration-800 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            #MoLoveStory2026
          </p>
        </div>

        {/* Navigation */}
        <nav
          className={`flex flex-wrap justify-center gap-6 md:gap-10 mb-12 transition-all duration-800 custom-ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="font-body text-sm text-white/60 hover:text-gold transition-colors duration-300 tracking-wide uppercase"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div
          className={`w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8 transition-all duration-800 ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        />

        {/* Copyright */}
        <div
          className={`flex flex-col md:flex-row items-center justify-center gap-4 text-white/40 transition-all duration-800 custom-ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="font-body text-sm flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-gold" fill="currentColor" /> for our special day
          </p>
          <span className="hidden md:block">•</span>
          <p className="font-body text-sm">
            © 2025 Morolake & Opeyemi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
