import { Instagram, Facebook, MessageCircle, Trophy } from 'lucide-react';
import { footerConfig } from '../config';

const Footer = () => {
  return (
    <footer id="footer" className="bg-black border-t-2 border-imperial-yellow/20 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-imperial-yellow flex items-center justify-center bevel-sm">
              <Trophy className="w-5 h-5 text-black" />
            </div>
            <span className="font-aggressive text-xl text-white">{footerConfig.brandName}</span>
          </div>
          <p className="text-white/60 mb-6">{footerConfig.brandDescription}</p>
          <div className="flex gap-4">
            <a href={footerConfig.socials.facebook} className="text-white/40 hover:text-imperial-yellow transition-colors"><Facebook /></a>
            <a href={footerConfig.socials.instagram} className="text-white/40 hover:text-imperial-yellow transition-colors"><Instagram /></a>
            <a href={footerConfig.socials.whatsapp} className="text-white/40 hover:text-imperial-yellow transition-colors"><MessageCircle /></a>
          </div>
        </div>
        
        <div className="md:col-span-2 text-right">
            <p className="font-mono-custom text-xs text-white/20 mb-2">© 2026 IMPERIAL FC. ALL RIGHTS RESERVED.</p>
            <p className="font-mono-custom text-xs text-imperial-yellow/40 uppercase tracking-widest">Victory through precision</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
