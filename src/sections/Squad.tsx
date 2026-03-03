import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, ChevronRight } from 'lucide-react';
import { squadConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Squad = () => {
  if (!squadConfig.players) return null;
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="squad" className="bg-imperial-void py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-imperial-yellow" />
              <span className="font-mono-custom text-imperial-yellow tracking-[0.3em] text-sm">THE SQUAD</span>
            </div>
            <h2 className="font-aggressive text-5xl md:text-7xl text-white tracking-tighter">MEET THE VANGUARD</h2>
          </div>
          <a href={squadConfig.viewFullSquadLink} className="btn-imperial-outline text-xs flex items-center gap-2">
            VIEW FULL SQUAD <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {squadConfig.players.map((player) => (
            <div key={player.id} className="group relative aspect-[16/9] overflow-hidden bevel-md border-2 border-white/5">
              <img src={player.image} alt={player.name} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-mono-custom text-imperial-yellow text-sm mb-1">#{player.number} — {player.position}</p>
                    <h3 className="font-aggressive text-3xl text-white">{player.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-mono-custom text-[10px] text-white/40 uppercase">Season Goals</p>
                    <p className="font-aggressive text-2xl text-imperial-yellow">{player.stats.goals}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Squad;
