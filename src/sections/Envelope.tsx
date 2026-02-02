import { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope = ({ onOpen }: EnvelopeProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (isOpening || isOpen) return;
    
    setIsOpening(true);
    setShowSparkles(true);
    
    // Sequence the animations
    setTimeout(() => {
      setIsOpen(true);
    }, 800);
    
    setTimeout(() => {
      onOpen();
    }, 2500);
  };

  // Hide sparkles after animation
  useEffect(() => {
    if (showSparkles) {
      const timer = setTimeout(() => setShowSparkles(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSparkles]);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-[#f5e6d3] via-[#faf3e8] to-[#f5e6d3] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #d8af72 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-gold/10 animate-float"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Sparkles Effect */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(12)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-gold animate-ping"
              style={{
                width: '24px',
                height: '24px',
                left: `${20 + (i % 5) * 15}%`,
                top: `${15 + Math.floor(i / 5) * 35}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Invitation Text */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ${
            isOpening ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
          }`}
        >
          <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-4">
            You are invited to
          </p>
          <h1 className="font-script text-5xl md:text-6xl text-black mb-2">
            Megan <span className="text-gold">&</span> John
          </h1>
          <p className="font-body text-gray-2 text-lg">
            Wedding Celebration
          </p>
        </div>

        {/* Envelope */}
        <div
          ref={envelopeRef}
          onClick={handleOpen}
          className={`relative cursor-pointer transition-all duration-700 ${
            isOpening ? 'scale-110' : 'hover:scale-105'
          } ${isOpen ? 'opacity-0 scale-150' : 'opacity-100'}`}
          style={{ perspective: '1000px' }}
        >
          {/* Envelope Body */}
          <div className="relative w-[320px] h-[220px] md:w-[400px] md:h-[260px]">
            {/* Back of Envelope */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8d5c4] to-[#d4c4b0] rounded-lg shadow-2xl" />
            
            {/* Inner Shadow */}
            <div className="absolute inset-2 bg-gradient-to-br from-[#c4b4a0] to-[#b8a894] rounded-md opacity-50" />

            {/* Letter Inside (Visible when opening) */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-t-lg shadow-lg transition-all duration-1000 ${
                isOpening 
                  ? 'bottom-[60%] opacity-100' 
                  : 'bottom-4 opacity-0'
              }`}
              style={{
                height: isOpening ? '140%' : '0%',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Letter Content */}
              <div className="p-6 md:p-8 text-center">
                <Heart className="w-8 h-8 text-gold mx-auto mb-4" fill="currentColor" />
                <p className="font-script text-3xl text-black mb-2">Save the Date</p>
                <p className="font-body text-gold text-lg">June 20, 2025</p>
              </div>
            </div>

            {/* Bottom Flap */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[55%] overflow-hidden"
              style={{ zIndex: 10 }}
            >
              <div 
                className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-[#d4c4b0] to-[#e8d5c4]"
                style={{
                  clipPath: 'polygon(0 100%, 50% 0, 100% 100%)'
                }}
              />
              {/* Flap shadow */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/10 to-transparent"
              />
            </div>

            {/* Side Flaps */}
            <div 
              className="absolute top-0 left-0 w-[35%] h-[75%] overflow-hidden"
              style={{ zIndex: 5 }}
            >
              <div 
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#e8d5c4] to-[#d4c4b0]"
                style={{
                  clipPath: 'polygon(0 0, 100% 35%, 100% 100%, 0 100%)'
                }}
              />
            </div>
            <div 
              className="absolute top-0 right-0 w-[35%] h-[75%] overflow-hidden"
              style={{ zIndex: 5 }}
            >
              <div 
                className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#e8d5c4] to-[#d4c4b0]"
                style={{
                  clipPath: 'polygon(100% 0, 0 35%, 0 100%, 100% 100%)'
                }}
              />
            </div>

            {/* Top Flap (The one that opens) */}
            <div 
              className="absolute top-0 left-0 right-0 h-[55%] overflow-hidden origin-top"
              style={{ 
                zIndex: 20,
                transformStyle: 'preserve-3d',
                transform: isOpening ? 'rotateX(180deg)' : 'rotateX(0deg)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'top center'
              }}
            >
              {/* Front of flap */}
              <div 
                className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-[#f0e0d0] to-[#e8d5c4] backface-hidden"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* Wax Seal */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold to-[#c9a065] shadow-lg flex items-center justify-center border-2 border-[#e5c994]">
                    <Heart className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" />
                  </div>
                  {/* Seal shine */}
                  <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/30" />
                </div>
              </div>
              
              {/* Back of flap (visible when flipped) */}
              <div 
                className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-[#d4c4b0] to-[#c4b4a0]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transform: 'rotateX(180deg)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>

            {/* Envelope Border/Frame */}
            <div className="absolute inset-0 border-2 border-[#c4b4a0]/50 rounded-lg pointer-events-none" style={{ zIndex: 25 }} />
          </div>

          {/* Click Hint */}
          <div 
            className={`absolute -bottom-16 left-1/2 -translate-x-1/2 text-center transition-all duration-500 ${
              isOpening ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <p className="font-body text-gold text-sm animate-pulse">
              Click to open
            </p>
            <div className="mt-2 w-6 h-10 mx-auto border-2 border-gold/40 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-gold/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div 
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 transition-all duration-700 ${
            isOpening ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
          <Heart className="w-4 h-4 text-gold/60" fill="currentColor" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/10" />
      </div>
    </div>
  );
};

export default Envelope;
