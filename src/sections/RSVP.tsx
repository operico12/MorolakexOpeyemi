import { useEffect, useRef, useState } from 'react';
import { Heart, Send, Check, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const countryCodes = [
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
];

const RSVP = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+234',
    phone: '',
    message: '',
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;
    console.log('Submitting:', { ...formData, fullPhoneNumber });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, phone: cleaned }));
  };

  const selectedCountry = countryCodes.find(c => c.code === formData.countryCode) || countryCodes[0];

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative w-full py-16 md:py-20 bg-white"
    >
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <div
            className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="h-px w-10 bg-amber-500" />
            <span className="font-body text-amber-500 text-xs tracking-[0.2em] uppercase">RSVP</span>
            <div className="h-px w-10 bg-amber-500" />
          </div>

          <h2
            className={`font-script text-4xl md:text-5xl text-black mb-3 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Will you attend?
          </h2>

          <p
            className={`font-body text-gray-600 text-base transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Please let us know if you can make it
          </p>
        </div>

        {/* RSVP Form Card - REMOVED overflow-hidden */}
        <div
          className={`relative bg-gray-50 rounded-xl p-6 md:p-8 shadow-lg transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="absolute -top-3 -right-3 text-amber-500">
            <Heart className="w-8 h-8" fill="currentColor" />
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div
                className={`space-y-1.5 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <Label htmlFor="name" className="font-body text-gray-700 text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-500" />
                  Your Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-gray-300 focus:border-amber-500 h-10 text-sm"
                />
              </div>

              {/* Email Field */}
              <div
                className={`space-y-1.5 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <Label htmlFor="email" className="font-body text-gray-700 text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-gray-300 focus:border-amber-500 h-10 text-sm"
                />
              </div>

              {/* Phone Number Field - FIXED DROPDOWN */}
              <div
                className={`space-y-1.5 transition-all duration-500 relative z-50 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: '550ms' }}
                ref={dropdownRef}
              >
                <Label className="font-body text-gray-700 text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" />
                  Phone Number
                </Label>
                
                <div className="flex gap-2">
                  {/* Custom Country Code Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:border-amber-500 transition-colors h-10 min-w-[100px]"
                    >
                      <span className="text-base">{selectedCountry.flag}</span>
                      <span className="font-body text-sm font-medium">{selectedCountry.code}</span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform ml-auto ${showCountryDropdown ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu - FIXED POSITIONING */}
                    {showCountryDropdown && (
                      <div 
                        className="fixed left-auto top-auto mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-y-auto"
                        style={{
                          zIndex: 9999,
                        }}
                      >
                        {countryCodes.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, countryCode: country.code }));
                              setShowCountryDropdown(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-amber-50 transition-colors text-left ${
                              formData.countryCode === country.code ? 'bg-amber-50' : ''
                            }`}
                          >
                            <span className="text-lg">{country.flag}</span>
                            <span className="font-body text-sm font-medium">{country.code}</span>
                            <span className="font-body text-xs text-gray-500 truncate">{country.country}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="801 234 5678"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    required
                    className="flex-1 bg-white border-gray-300 focus:border-amber-500 h-10 text-sm"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div
                className={`space-y-1.5 transition-all duration-500 relative z-0 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <Label htmlFor="message" className="font-body text-gray-700 text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-500" />
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Leave a message..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="bg-white border-gray-300 focus:border-amber-500 text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <div
                className={`pt-2 transition-all duration-500 relative z-0 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-body py-5 h-auto"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send RSVP
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Check className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="font-script text-3xl text-black mb-2">Thank You!</h3>
              <p className="font-body text-gray-600 text-sm">We've received your RSVP!</p>
            </div>
          )}
        </div>

        {/* Updated Date */}
        <div
          className={`mt-6 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <p className="font-body text-xs text-gray-500">
            Please RSVP by <span className="text-amber-500 font-medium">October 1, 2026</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
