import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users } from 'lucide-react';
import { squadConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Squad = () => {
  // Null check
  if (!squadConfig.players || squadConfig.players.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="squad"
      className="relative w-full min-h-screen bg-imperial-void py-20 px-4 md:px-8 lg:px-16"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-2 bg-imperial-yellow" />
          <span className="font-mono-custom text-xs text-imperial-yellow uppercase tracking-[0.2em]">
            {squadConfig.sectionLabel}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="font-aggressive text-4xl md:text-5xl lg:text-6xl text-white">
            {squadConfig.sectionTitle}
          </h2>
          <div className="flex items-center gap-2 text-white/50">
            <Users className="w-5 h-5" />
            <span className="font-mono-custom text-sm">{squadConfig.players.length} Players</span>
          </div>
        </div>
      </div>

      {/* Player Cards Grid */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {squadConfig.players.map((player) => (
          <div
            key={player.id}
            className="player-card group relative bg-black border-2 border-imperial-yellow/20 overflow-hidden bevel-md"
          >
            {/* Player Image */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Number overlay */}
              <div className="absolute top-4 right-4">
                <div className="bg-imperial-yellow text-black font-aggressive text-2xl px-3 py-1 bevel-sm">
                  #{player.number}
                </div>
              </div>
              {/* Position badge */}
              <div className="absolute bottom-4 left-4">
                <div className="bg-black/80 border border-imperial-yellow/40 text-imperial-yellow font-mono-custom text-xs px-3 py-1 bevel-sm">
                  {player.position.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Player Info */}
            <div className="p-5">
              <h3 className="font-aggressive text-xl text-white mb-4 group-hover:text-imperial-yellow transition-colors">
                {player.name}
              </h3>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-imperial-void border border-imperial-yellow/10">
                  <p className="font-aggressive text-lg text-white">{player.stats.appearances}</p>
                  <p className="font-mono-custom text-[10px] text-white/50 uppercase">Apps</p>
                </div>
                <div className="text-center p-2 bg-imperial-void border border-imperial-yellow/10">
                  <p className="font-aggressive text-lg text-imperial-yellow">{player.stats.goals}</p>
                  <p className="font-mono-custom text-[10px] text-white/50 uppercase">Goals</p>
                </div>
                <div className="text-center p-2 bg-imperial-void border border-imperial-yellow/10">
                  <p className="font-aggressive text-lg text-white">{player.stats.assists}</p>
                  <p className="font-mono-custom text-[10px] text-white/50 uppercase">Asst</p>
                </div>
              </div>
            </div>

            {/* Hover border effect */}
            <div className="absolute inset-0 border-2 border-imperial-yellow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bevel-md" />
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-imperial-yellow/30 to-transparent" />
      <div className="absolute top-40 left-8 w-24 h-24 border-l-2 border-b-2 border-imperial-yellow/10" />
    </section>
  );
};

export default Squad;
