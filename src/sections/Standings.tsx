import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchStandings } from '../services/googleSheets';
import { standingsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface StandingRow {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

const IMPERIAL_NAMES = ['IMPERIAL', 'MAMELODI IMPERIAL'];

const isImperial = (team: string) =>
  IMPERIAL_NAMES.some(n => team.toUpperCase().includes(n));

const Standings = () => {
  const [standings, setStandings] = useState<StandingRow[]>([]);
  const [loading, setLoading]     = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const tableRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchStandings()
      .then(rows => setStandings(rows as StandingRow[]))
      .catch(() => setStandings([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo(
        tableRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: tableRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [loading]);

  const imperialRow = standings.find(r => isImperial(r.team));

  const getPositionStyle = (pos: number) => {
    if (pos === 1) return 'text-yellow-400';
    if (pos <= 3)  return 'text-green-400';
    if (pos >= standings.length - 2) return 'text-red-400/70';
    return 'text-white/40';
  };

  return (
    <section
      ref={sectionRef}
      id="standings"
      className="relative w-full bg-black py-20 px-4 md:px-8 lg:px-16"
    >
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-2 bg-imperial-yellow" />
          <span className="font-mono-custom text-xs text-imperial-yellow uppercase tracking-[0.2em]">
            {standingsConfig.sectionLabel}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="font-aggressive text-4xl md:text-5xl lg:text-6xl text-white">
            {standingsConfig.sectionTitle}
          </h2>
          <span className="font-mono-custom text-xs text-white/30 tracking-widest">
            SEASON {standingsConfig.season}
          </span>
        </div>

        {/* Imperial FC quick stat bar */}
        {imperialRow && (
          <div className="mt-8 border border-imperial-yellow/30 bg-imperial-yellow/5 p-4 flex flex-wrap gap-6 md:gap-10">
            <div>
              <p className="font-mono-custom text-[10px] text-imperial-yellow/60 tracking-widest mb-1">POSITION</p>
              <p className="font-aggressive text-3xl text-imperial-yellow">{imperialRow.position}<span className="text-lg text-imperial-yellow/50">th</span></p>
            </div>
            <div>
              <p className="font-mono-custom text-[10px] text-white/40 tracking-widest mb-1">POINTS</p>
              <p className="font-aggressive text-3xl text-white">{imperialRow.points}</p>
            </div>
            <div>
              <p className="font-mono-custom text-[10px] text-white/40 tracking-widest mb-1">RECORD</p>
              <p className="font-aggressive text-3xl text-white">
                {imperialRow.won}
                <span className="text-white/30 text-lg">W </span>
                {imperialRow.drawn}
                <span className="text-white/30 text-lg">D </span>
                {imperialRow.lost}
                <span className="text-white/30 text-lg">L</span>
              </p>
            </div>
            <div>
              <p className="font-mono-custom text-[10px] text-white/40 tracking-widest mb-1">GOALS</p>
              <p className="font-aggressive text-3xl text-white">
                {imperialRow.gf}
                <span className="text-white/30 text-lg"> : </span>
                {imperialRow.ga}
              </p>
            </div>
            <div className="ml-auto self-center">
              <span className="font-mono-custom text-xs text-imperial-yellow border border-imperial-yellow/40 px-3 py-1">
                {standingsConfig.clubName}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-mono-custom text-imperial-yellow tracking-widest animate-pulse">LOADING TABLE...</p>
          </div>
        ) : standings.length === 0 ? (
          <div className="flex items-center justify-center py-20 border border-white/10">
            <p className="font-mono-custom text-white/30 tracking-widest text-sm">TABLE NOT YET AVAILABLE</p>
          </div>
        ) : (
          <>
            {/* Column headers */}
            <div className="grid grid-cols-[2rem_1fr_repeat(8,2.5rem)] md:grid-cols-[2.5rem_1fr_repeat(8,3rem)] gap-2 px-4 py-2 mb-1">
              {['#', 'TEAM', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'PTS'].map(h => (
                <span key={h} className="font-mono-custom text-[10px] text-white/30 tracking-widest text-center first:text-left">
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div ref={tableRef} className="space-y-1">
              {standings.map((row) => {
                const mine = isImperial(row.team);
                return (
                  <div
                    key={row.position}
                    className={`grid grid-cols-[2rem_1fr_repeat(8,2.5rem)] md:grid-cols-[2.5rem_1fr_repeat(8,3rem)] gap-2 px-4 py-3 items-center transition-all
                      ${mine
                        ? 'bg-imperial-yellow/10 border border-imperial-yellow/40'
                        : 'bg-white/[0.02] border border-white/5 hover:border-white/10'
                      }`}
                  >
                    {/* Position */}
                    <span className={`font-mono-custom text-sm font-bold ${getPositionStyle(row.position)}`}>
                      {row.position}
                    </span>

                    {/* Team name */}
                    <span className={`font-aggressive text-sm md:text-base truncate ${mine ? 'text-imperial-yellow' : 'text-white'}`}>
                      {mine ? '★ ' : ''}{row.team}
                    </span>

                    {/* Stats */}
                    {[row.played, row.won, row.drawn, row.lost, row.gf, row.ga, row.gd].map((val, i) => (
                      <span key={i} className={`font-mono-custom text-xs text-center ${mine ? 'text-white' : 'text-white/50'}`}>
                        {val}
                      </span>
                    ))}

                    {/* Points */}
                    <span className={`font-aggressive text-sm text-center ${mine ? 'text-imperial-yellow' : 'text-white'}`}>
                      {row.points}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-6 px-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400" />
                <span className="font-mono-custom text-[10px] text-white/30">1ST PLACE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400" />
                <span className="font-mono-custom text-[10px] text-white/30">TOP 3</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400/70" />
                <span className="font-mono-custom text-[10px] text-white/30">RELEGATION ZONE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono-custom text-[10px] text-imperial-yellow">★</span>
                <span className="font-mono-custom text-[10px] text-white/30">IMPERIAL FC</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Decorative corners */}
      <div className="absolute top-20 right-8 w-32 h-32 border-r-2 border-t-2 border-imperial-yellow/10" />
      <div className="absolute bottom-20 left-8 w-24 h-24 border-l-2 border-b-2 border-imperial-yellow/10" />
    </section>
  );
};

export default Standings;
