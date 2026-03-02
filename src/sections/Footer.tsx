import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Mail, Phone, MapPin, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  // Null check
  if (!footerConfig.brandName) {
    return null;
  }

  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (section: string) => {
    const sectionMap: Record<string, string> = {
      'Home': 'hero',
      'Fixtures': 'fixtures',
      'Squad': 'squad',
      'Media': 'media',
      'Contact': 'footer',
    };
    const element = document.getElementById(sectionMap[section] || '');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative w-full bg-black border-t-2 border-imperial-yellow/20"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-imperial-yellow flex items-center justify-center bevel-sm">
                <Trophy className="w-5 h-5 text-black" />
              </div>
              <span className="font-aggressive text-xl text-white tracking-wider">{footerConfig.brandName}</span>
            </div>
            <p className="text-white/60 leading-relaxed mb-6">
              {footerConfig.brandDescription}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-imperial-void border border-imperial-yellow/30 flex items-center justify-center bevel-sm hover:bg-imperial-yellow hover:border-imperial-yellow transition-colors group"
              >
                <Instagram className="w-4 h-4 text-imperial-yellow group-hover:text-black transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-imperial-void border border-imperial-yellow/30 flex items-center justify-center bevel-sm hover:bg-imperial-yellow hover:border-imperial-yellow transition-colors group"
              >
                <Twitter className="w-4 h-4 text-imperial-yellow group-hover:text-black transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-imperial-void border border-imperial-yellow/30 flex items-center justify-center bevel-sm hover:bg-imperial-yellow hover:border-imperial-yellow transition-colors group"
              >
                <Youtube className="w-4 h-4 text-imperial-yellow group-hover:text-black transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-imperial-void border border-imperial-yellow/30 flex items-center justify-center bevel-sm hover:bg-imperial-yellow hover:border-imperial-yellow transition-colors group"
              >
                <Facebook className="w-4 h-4 text-imperial-yellow group-hover:text-black transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-aggressive text-lg text-white mb-6">{footerConfig.quickLinksTitle}</h4>
            <ul className="space-y-3">
              {footerConfig.quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link)}
                    className="text-white/60 hover:text-imperial-yellow transition-colors font-mono-custom text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-aggressive text-lg text-white mb-6">{footerConfig.contactTitle}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-imperial-yellow mt-1" />
                <div>
                  <p className="font-mono-custom text-xs text-white/40 uppercase mb-1">{footerConfig.emailLabel}</p>
                  <a href={`mailto:${footerConfig.email}`} className="text-white/70 hover:text-imperial-yellow transition-colors">
                    {footerConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-imperial-yellow mt-1" />
                <div>
                  <p className="font-mono-custom text-xs text-white/40 uppercase mb-1">{footerConfig.phoneLabel}</p>
                  <a href={`tel:${footerConfig.phone}`} className="text-white/70 hover:text-imperial-yellow transition-colors">
                    {footerConfig.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-imperial-yellow mt-1" />
                <div>
                  <p className="font-mono-custom text-xs text-white/40 uppercase mb-1">{footerConfig.addressLabel}</p>
                  <p className="text-white/70">{footerConfig.address}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-aggressive text-lg text-white mb-6">NEWSLETTER</h4>
            <p className="text-white/60 text-sm mb-4">
              Subscribe for match updates, exclusive content, and behind-the-scenes access.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-imperial-void border border-imperial-yellow/30 text-white placeholder-white/40 font-mono-custom text-sm bevel-sm focus:outline-none focus:border-imperial-yellow transition-colors"
              />
              <button type="submit" className="btn-imperial">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-imperial-yellow/30 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono-custom text-xs text-white/40">
            {footerConfig.copyrightText}
          </p>
          <div className="flex gap-6">
            {footerConfig.bottomLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-mono-custom text-xs text-white/40 hover:text-imperial-yellow transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-imperial-yellow/20" />
      <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-imperial-yellow/20" />
    </footer>
  );
};

export default Footer;
