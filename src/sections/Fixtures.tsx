import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ChevronRight, Trophy, Clock } from 'lucide-react';
import { fixturesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Fixtures = () => {
  // Null check
  if (!fixturesConfig.fixtures || fixturesConfig.fixtures.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);

  const pastResults = fixturesConfig.fixtures.filter(f => f.status !== 'upcoming');
  const upcomingFixtures = fixturesConfig.fixtures.filter(f => f.status === 'upcoming');

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

      // Results list animation
      gsap.fromTo(
        resultsRef.current?.children || [],
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: resultsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Upcoming fixtures animation
      gsap.fromTo(
        upcomingRef.current?.children || [],
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: upcomingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'win':
        return <span className="status-win">WIN</span>;
      case 'loss':
        return <span className="status-loss">LOSS</span>;
      case 'draw':
        return <span className="status-upcoming">DRAW</span>;
      default:
        return <span className="status-upcoming">UPCOMING</span>;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="fixtures"
      className="relative w-full min-h-screen bg-black py-20 px-4 md:px-8 lg:px-16"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-2 bg-imperial-yellow" />
          <span className="font-mono-custom text-xs text-imperial-yellow uppercase tracking-[0.2em]">
            {fixturesConfig.sectionLabel}
          </span>
        </div>
        <h2 className="font-aggressive text-4xl md:text-5xl lg:text-6xl text-white">
          {fixturesConfig.sectionTitle}
        </h2>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Past Results */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-5 h-5 text-imperial-yellow" />
            <h3 className="font-aggressive text-2xl text-white">{fixturesConfig.resultsTitle}</h3>
          </div>

          <div ref={resultsRef} className="space-y-4">
            {pastResults.map((fixture) => (
              <div
                key={fixture.id}
                className="fixture-item bg-imperial-void p-5 bevel-sm hover:border-imperial-yellow/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  {/* Left: Date & Opponent */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-imperial-yellow/60" />
                      <span className="font-mono-custom text-xs text-white/60">{fixture.date}</span>
                      <span className="text-white/30">|</span>
                      <Clock className="w-4 h-4 text-imperial-yellow/60" />
                      <span className="font-mono-custom text-xs text-white/60">{fixture.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-aggressive text-lg text-white">
                        vs {fixture.opponent}
                      </span>
                      <span className={`text-xs px-2 py-0.5 border ${fixture.type === 'home' ? 'border-imperial-yellow/40 text-imperial-yellow' : 'border-white/30 text-white/60'}`}>
                        {fixture.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-white/40">
                      <MapPin className="w-3 h-3" />
                      <span className="font-mono-custom text-xs">{fixture.venue}</span>
                    </div>
                  </div>

                  {/* Right: Score & Status */}
                  <div className="flex items-center gap-4">
                    {fixture.score && (
                      <div className="score-box">
                        {fixture.score}
                      </div>
                    )}
                    {getStatusBadge(fixture.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Fixtures */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-5 h-5 text-imperial-yellow" />
            <h3 className="font-aggressive text-2xl text-white">{fixturesConfig.fixturesTitle}</h3>
          </div>

          <div ref={upcomingRef} className="space-y-4">
            {upcomingFixtures.map((fixture) => (
              <div
                key={fixture.id}
                className="fixture-item bg-imperial-void border-2 border-imperial-yellow/30 p-5 bevel-sm hover:border-imperial-yellow transition-all"
              >
                <div className="flex items-center justify-between">
                  {/* Left: Date & Opponent */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-imperial-yellow" />
                      <span className="font-mono-custom text-xs text-imperial-yellow">{fixture.date}</span>
                      <span className="text-white/30">|</span>
                      <Clock className="w-4 h-4 text-imperial-yellow" />
                      <span className="font-mono-custom text-xs text-imperial-yellow">{fixture.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-aggressive text-xl text-white">
                        vs {fixture.opponent}
                      </span>
                      <span className={`text-xs px-2 py-0.5 border ${fixture.type === 'home' ? 'border-imperial-yellow text-imperial-yellow' : 'border-white/40 text-white/70'}`}>
                        {fixture.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-white/50">
                      <MapPin className="w-3 h-3" />
                      <span className="font-mono-custom text-xs">{fixture.venue}</span>
                    </div>
                  </div>

                  {/* Right: Arrow */}
                  <div className="flex items-center justify-center w-12 h-12 bg-imperial-yellow/10 border border-imperial-yellow/30 bevel-sm">
                    <ChevronRight className="w-5 h-5 text-imperial-yellow" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <button className="btn-imperial-outline">
              View Full Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-8 w-32 h-32 border-r-2 border-t-2 border-imperial-yellow/10" />
      <div className="absolute bottom-20 left-8 w-24 h-24 border-l-2 border-b-2 border-imperial-yellow/10" />
    </section>
  );
};

export default Fixtures;
