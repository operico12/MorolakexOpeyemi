import { useEffect, useRef, useState } from 'react';
import { Heart, Send, Check, User, Mail, Phone, Users, MessageSquare } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Country codes data
const countryCodes = [
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+234', // Default to Nigeria
    phone: '',
    guests: '',
    message: '',
  });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Combine country code and phone for submission
    const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;
    console.log('Submitting:', { ...formData, fullPhoneNumber });
    
    // Simulate API call
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

  // Format phone number as user types (optional formatting)
  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, '');
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      phone: formatted
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative w-full py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className={`flex items-center justify-center gap-3 mb-6 transition-all duration-800 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="h-px w-12 bg-amber-500" />
            <span className="font-body text-amber-500 text-sm tracking-[0.2em] uppercase">
              RSVP
            </span>
            <div className="h-px w-12 bg-amber-500" />
          </div>

          <h2
            className={`font-script text-5xl md:text-6xl lg:text-7xl text-black mb-4 transition-all duration-800 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Will you attend?
          </h2>

          <p
            className={`font-body text-gray-600 text-lg transition-all duration-800 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Please let us know if you can make it to our special day
          </p>
        </div>

        {/* RSVP Form Card */}
        <div
          className={`relative bg-gray-50 rounded-2xl p-8 md:p-12 shadow-xl transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ 
            transitionDelay: '300ms',
            transform: isVisible ? 'perspective(1000px) rotateX(0deg)' : 'perspective(1000px) rotateX(15deg)'
          }}
        >
          {/* Decorative Corner */}
          <div className="absolute -top-4 -right-4 text-amber-500 animate-bounce">
            <Heart className="w-10 h-10" fill="currentColor" />
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div
                className={`space-y-2 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <Label htmlFor="name" className="font-body text-gray-700 flex items-center gap-2">
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
                  className="bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500/20 font-body transition-all duration-300"
                />
              </div>

              {/* Email Field */}
              <div
                className={`space-y-2 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <Label htmlFor="email" className="font-body text-gray-700 flex items-center gap-2">
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
                  className="bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500/20 font-body transition-all duration-300"
                />
              </div>

              {/* Phone Number Field with Country Code - NEW */}
              <div
                className={`space-y-2 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: '550ms' }}
              >
                <Label className="font-body text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" />
                  Phone Number
                </Label>
                
                <div className="flex gap-2">
                  {/* Country Code Select */}
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
                  >
                    <SelectTrigger className="w-[140px] bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500/20 font-body">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {countryCodes.map((country) => (
                        <SelectItem 
                          key={country.code} 
                          value={country.code}
                          className="font-body"
                        >
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span className="font-medium">{country.code}</span>
                            <span className="text-gray-500 text-sm ml-1">({country.country})</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Phone Number Input */}
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="801 234 5678"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    required
                    className="flex-1 bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500/20 font-body transition-all duration-300"
                  />
                </div>
                
                {/* Display full number preview */}
                {formData.phone && (
                  <p className="text-xs text-gray-500 font-body mt-1">
                    Full number: {formData.countryCode} {formData.phone}
                  </p>
                )}
              </div>

              {/* Guests Field */}
              <div
                className={`space-y-2 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <Label htmlFor="guests" className="font-body text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-500" />
                  Number of Guests
                </Label>
                <Select
                  value={formData.guests}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, guests: value }))}
                >
                  <SelectTrigger className="bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500/20 font-body">
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Just me</SelectItem>
                    <SelectItem value="2">2 guests</SelectItem>
                    <SelectItem value="3">3 guests</SelectItem>
                    <SelectItem value="4">4 guests</SelectItem>
                    <SelectItem value="5+">5+ guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message Field */}
              <div
                className={`space-y-2 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                <Label htmlFor="message" className="font-body text-gray-700 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-500" />
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Leave a message for the couple..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500/20 font-body resize-none transition-all duration-300"
                />
              </div>

              {/* Submit Button */}
              <div
                className={`pt-4 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '800ms' }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-body text-lg py-6 transition-all duration-500 relative overflow-hidden group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send RSVP
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-500/10 flex items-center justify-center animate-bounce">
                <Check className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="font-script text-4xl text-black mb-4">
                Thank You!
              </h3>
              <p className="font-body text-gray-600">
                We've received your RSVP and can't wait to celebrate with you!
              </p>
              {formData.phone && (
                <p className="font-body text-sm text-gray-500 mt-2">
                  We'll contact you at {formData.countryCode} {formData.phone}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Additional Note */}
        <div
          className={`mt-8 text-center transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <p className="font-body text-sm text-gray-600">
            Please RSVP by <span className="text-amber-500 font-medium">May 20, 2025</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
