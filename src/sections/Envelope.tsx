import { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Mail } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope = ({ onOpen }: EnvelopeProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [ripples, setRipples] = useState<{id: number, x: number, y: number}[]);
  const envelopeRef = useRef<HTMLDivElement>(null);

  const handleOpen = (e: React.MouseEvent) => {
    if (isOpening) return;
    
    // Add ripple effect at click position
    const rect = envelopeRef.current?.getBoundingClientRect();
    if (rect) {
      const newRipple = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 1000);
    }

    setIsOpening(true);
    setShowSparkles(true);
    
    // Break seal after delay
    setTimeout(() => {
      setSealBroken(true);
    }, 400);
    
    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  // Hide sparkles after animation
  useEffect(() => {
    if (showSparkles) {
      const timer = setTimeout(() => setShowSparkles(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showSparkles]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#f5f0e8] flex items-center justify-center overflow-hidden">
      {/* Aged Paper Texture Background */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      
      {/* Coffee Stain Rings */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-4 border-[#8b7355]/10" />
      <div className="absolute bottom-40 right-32 w-48 h-48 rounded-full border-[6px] border-[#a08060]/10" />
      <div className="absolute top-1/3 right-20 w-24 h-24 rounded-full border-2 border-[#8b7355]/5" />

      {/* Dust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37]/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Vintage Border Frame */}
      <div className="absolute inset-4 md:inset-8 border border-[#8b7355]/20 rounded-sm">
        <div className="absolute inset-1 border border-[#8b7355]/10" />
        {/* Corner Ornaments */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#8b7355]/30" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#8b7355]/30" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#8b7355]/30" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#8b7355]/30" />
      </div>

      {/* Sparkles Effect */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(16)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-[#d4af37] animate-ping"
              style={{
                width: '20px',
                height: '20px',
                left: `${15 + (i % 6) * 14}%`,
                top: `${10 + Math.floor(i / 6) * 40}%`,
                animationDelay: `${i * 0.05}s`,
                animationDuration: '0.8s'
              }}
            />
          ))}
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Elegant Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isOpening ? 'opacity-0 -translate-y-12' : 'opacity-100 translate-y-0'
          }`}
        >
          <p className="font-body text-[#8b7355] text-xs tracking-[0.5em] uppercase mb-6">
            The Honor of Your Presence is Requested
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#8b7355]/40" />
            <Mail className="w-5 h-5 text-[#8b7355]/60" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#8b7355]/40" />
          </div>
        </div>

        {/* Vintage Envelope */}
        <div
          ref={envelopeRef}
          onClick={handleOpen}
          className={`relative cursor-pointer transition-all duration-1000 ${
            isOpening ? 'scale-105' : 'hover:scale-102'
          } ${sealBroken ? 'animate-pulse' : ''}`}
          style={{ perspective: '1200px' }}
        >
          {/* Shadow */}
          <div 
            className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/10 blur-xl rounded-full transition-all duration-1000 ${
              isOpening ? 'opacity-0 scale-150' : 'opacity-100'
            }`}
          />

          {/* Ripples */}
          {ripples.map(ripple => (
            <span
              key={ripple.id}
              className="absolute rounded-full border-2 border-[#d4af37]/50 animate-ping pointer-events-none"
              style={{
                left: ripple.x - 50,
                top: ripple.y - 50,
                width: 100,
                height: 100
              }}
            />
          ))}

          {/* Envelope Body - Aged Parchment Look */}
          <div className="relative w-[340px] h-[240px] md:w-[420px] md:h-[280px]">
            {/* Base Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8dcc8] via-[#ddd0bc] to-[#d4c4b0] rounded-sm shadow-2xl">
              {/* Grain Overlay */}
              <div 
                className="absolute inset-0 opacity-30 mix-blend-multiply rounded-sm"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}
              />
              {/* Age Spots */}
              <div className="absolute top-10 left-12 w-8 h-6 bg-[#b8a08a]/20 rounded-full blur-sm" />
              <div className="absolute bottom-16 right-20 w-12 h-8 bg-[#a08060]/15 rounded-full blur-md" />
            </div>

            {/* Inner Shadow for Depth */}
            <div className="absolute inset-3 bg-gradient-to-br from-[#c4b4a0]/30 to-transparent rounded-sm" />

            {/* Letter Peek (Subtle) */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 w-[85%] bg-[#faf8f3] rounded-t-sm shadow-inner transition-all duration-700 ${
                sealBroken ? 'top-2 opacity-100' : 'top-8 opacity-0'
              }`}
              style={{
                height: sealBroken ? '60%' : '0%',
                backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, #e5e5e5 31px, #e5e5e5 32px)`
              }}
            >
              {/* Handwriting Hint */}
              <div className="absolute top-8 left-8 right-8">
                <div className="h-2 bg-[#8b7355]/20 rounded w-3/4 mb-3" />
                <div className="h-2 bg-[#8b7355]/20 rounded w-1/2" />
              </div>
            </div>

            {/* Bottom Flap */}
            <div className="absolute bottom-0 left-0 right-0 h-[55%] overflow-hidden">
              <div 
                className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-[#c9b8a4] to-[#d8c8b8]"
                style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black/5 to-transparent" />
            </div>

            {/* Side Flaps */}
            <div className="absolute top-0 left-0 w-[35%] h-[75%] overflow-hidden">
              <div 
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#e0d0c0] to-[#d0c0b0]"
                style={{ clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0 100%)' }}
              />
            </div>
            <div className="absolute top-0 right-0 w-[35%] h-[75%] overflow-hidden">
              <div 
                className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#e0d0c0] to-[#d0c0b0]"
                style={{ clipPath: 'polygon(100% 0, 0 30%, 0 100%, 100% 100%)' }}
              />
            </div>

            {/* Top Flap */}
            <div 
              className="absolute top-0 left-0 right-0 h-[55%] overflow-hidden origin-top"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: sealBroken ? 'rotateX(175deg)' : 'rotateX(0deg)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'top center'
              }}
            >
              <div 
                className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-[#f0e5d8] to-[#e5d8c8]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              />
            </div>

            {/* VINTAGE WAX SEAL - M&O */}
            <div 
              className={`absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
                sealBroken ? 'scale-75 opacity-0 rotate-12' : 'scale-100 opacity-100 rotate-0'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              {/* Seal Container */}
              <div className="relative">
                {/* Outer Ring - Distressed */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#8b0000] via-[#a52a2a] to-[#5c0000] shadow-2xl border-4 border-[#6b0000]/50 flex items-center justify-center">
                  {/* Inner Texture */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='rough'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23rough)'/%3E%3C/svg%3E")`
                    }}
                  />
                  
                  {/* Cracks for Aged Look */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                    <path d="M 30 20 Q 35 30 30 40" stroke="#3d0000" strokeWidth="1" fill="none" />
                    <path d="M 70 60 Q 65 70 70 80" stroke="#3d0000" strokeWidth="1" fill="none" />
                    <path d="M 20 50 L 25 55" stroke="#3d0000" strokeWidth="0.5" />
                  </svg>

                  {/* M&O Monogram */}
                  <div className="relative z-10 text-center">
                    <span 
                      className="font-serif text-white text-2xl md:text-3xl font-bold tracking-tighter drop-shadow-lg"
                      style={{ 
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        fontFamily: '"Playfair Display", "Times New Roman", serif'
                      }}
                    >
                      M<span className="text-[#d4af37] text-lg">&</span>O
                    </span>
                  </div>

                  {/* Highlight */}
                  <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-white/20" />
                </div>

                {/* Dripping Wax Effect */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className="w-2 h-4 bg-gradient-to-b from-[#8b0000] to-[#5c0000] rounded-full" />
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#a52a2a] to-[#6b0000] rounded-full mt-1" />
                  <div className="w-2 h-3 bg-gradient-to-b from-[#8b0000] to-[#5c0000] rounded-full" />
                </div>
              </div>
            </div>

            {/* Broken Seal Pieces (shown when broken) */}
            {sealBroken && (
              <>
                <div className="absolute top-[55%] left-[45%] w-6 h-6 bg-gradient-to-br from-[#8b0000] to-[#5c0000] rounded-full rotate-45 animate-fade-out" />
                <div className="absolute top-[65%] left-[55%] w-4 h-4 bg-gradient-to-br from-[#a52a2a] to-[#6b0000] rounded-full -rotate-12 animate-fade-out" style={{ animationDelay: '0.1s' }} />
              </>
            )}

            {/* Antique Border */}
            <div className="absolute inset-0 border-2 border-[#8b7355]/20 rounded-sm pointer-events-none">
              <div className="absolute inset-1 border border-[#8b7355]/10" />
            </div>
          </div>

          {/* Elegant Click Hint */}
          <div 
            className={`absolute -bottom-20 left-1/2 -translate-x-1/2 text-center transition-all duration-700 ${
              isOpening ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <p className="font-body text-[#8b7355] text-sm tracking-widest uppercase mb-3">
              Break the Seal
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-[1px] bg-[#8b7355]/30" />
              <div className="w-2 h-2 rounded-full bg-[#d4af37]/60 animate-pulse" />
              <div className="w-8 h-[1px] bg-[#8b7355]/30" />
            </div>
          </div>
        </div>

        {/* Footer Quote */}
        <div 
          className={`absolute bottom-16 left-1/2 -translate-x-1/2 text-center transition-all duration-1000 ${
            isOpening ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
          }`}
        >
          <p className="font-script text-[#8b7355]/60 text-lg italic">
            "Love is the master key"
          </p>
        </div>
      </div>

      {/* Light Leak Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-[#f5e6d3]/50 to-transparent opacity-50 pointer-events-none" />
    </div>
  );
};

export default Envelope;
