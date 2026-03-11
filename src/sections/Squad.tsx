import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import { squadConfig } from '../config';
import { fetchPlayers } from '../services/googleSheets';

gsap.registerPlugin(ScrollTrigger);

// Position colour coding
const POSITION_COLORS: Record<string, string> = {
  GK:  'text-yellow-400 border-yellow-400/40',
  DEF: 'text-blue-400 border-blue-400/40',
  MID: 'text-green-400 border-green-400/40',
  FWD: 'text-red-400 border-red-400/40',
};

// Placeholder image pool (replace with real player photos later)
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600',
  'https://images.unsplash.com/photo-1552318975-27dbad9b738d?q=80&w=600',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600',
  'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600',
];

interface PlayerCard {
  id: number;
  name: string;
  lastName: string;
  firstName: string;
  positions: string[];
  mysafa: string;
  dob: string;
  fifaId: string;
  status: string;
  image: string;
}

const Squad = () => {
  const [players, setPlayers]   = useState<PlayerCard[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState<string>('ALL');

  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPlayers()
      .then(rows => {
        const mapped: PlayerCard[] = rows.map((p, i) => ({
          id:        p.id,
          name:      `${p.lastName} ${p.firstName}`,
          lastName:  p.lastName,
          firstName: p.firstName,
          positions: p.positions,
          mysafa:    p.mysafa,
          dob:       p.dob,
          fifaId:    p.fifaId,
          status:    p.status,
          image:     PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
        }));
        setPlayers(mapped);
      })
      .catch(() => {
        // Fallback to static config players if fetch fails
        const fallback = (squadConfig.players || []).map(p => ({
          id:        p.id,
          name:      p.name,
          lastName:  p.name,
          firstName: '',
          positions: [p.position],
          mysafa:    '',
          dob:       '',
          fifaId:    '',
          status:    'Active',
          image:     p.image,
        }));
        setPlayers(fallback);
      })
      .finally(() => setLoading(false));
  }, []);

  // GSAP animate when data loads
  useEffect(() => {
    if (loading || players.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [loading, players, filter]);

  const positions = ['ALL', 'GK', 'DEF', 'MID', 'FWD'];

  const filtered = filter === 'ALL'
    ? players
    : players.filter(p => p.positions.includes(filter));

  if (loading) {
    return (
      <section id="squad" className="bg-imperial-void py-20 px-4 min-h-screen flex items-center justify-center">
        <p className="font-mono-custom text-imperial-yellow tracking-widest animate-pulse">LOADING SQUAD...</p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="squad" className="bg-imperial-void py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-imperial-yellow" />
              <span className="font-mono-custom text-imperial-yellow tracking-[0.3em] text-sm">THE SQUAD</span>
            </div>
            <h2 className="font-aggressive text-5xl md:text-7xl text-white tracking-tighter">
              MEET THE VANGUARD
            </h2>
          </div>
          <a href={squadConfig.viewFullSquadLink} className="btn-imperial-outline text-xs flex items-center gap-2">
            VIEW FULL SQUAD <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Position Filter */}
        <div className="flex gap-2 mb-12 flex-wrap">
          {positions.map(pos => (
            <button
              key={pos}
              onClick={() => setFilter(pos)}
              className={`font-mono-custom text-xs px-4 py-2 border transition-all ${
                filter === pos
                  ? 'bg-imperial-yellow text-black border-imperial-yellow'
                  : 'border-white/20 text-white/50 hover:border-imperial-yellow/50 hover:text-white'
              }`}
            >
              {pos}
            </button>
          ))}
          <span className="font-mono-custom text-xs text-white/30 self-center ml-auto">
            {filtered.length} PLAYERS
          </span>
        </div>

        {/* Player Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((player) => (
            <div
              key={player.id}
              className="group relative aspect-[3/4] overflow-hidden bevel-md border border-white/5 hover:border-imperial-yellow/40 transition-all duration-500"
            >
              {/* Photo */}
              <img
                src={player.image}
                alt={player.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Position badges top-right */}
              <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                {player.positions.map(pos => (
                  <span
                    key={pos}
                    className={`font-mono-custom text-[10px] px-2 py-0.5 border bg-black/60 ${POSITION_COLORS[pos] || 'text-white/60 border-white/20'}`}
                  >
                    {pos}
                  </span>
                ))}
              </div>

              {/* Player info bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-mono-custom text-imperial-yellow text-xs mb-1 tracking-widest">
                  {player.mysafa ? `MYSAFA ${player.mysafa}` : ''}
                </p>
                <h3 className="font-aggressive text-xl text-white leading-tight">
                  {player.lastName}
                </h3>
                <p className="font-mono-custom text-white/60 text-xs">{player.firstName}</p>

                {/* Hover reveal — DOB & FIFA ID */}
                <div className="mt-3 overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500">
                  <div className="border-t border-imperial-yellow/30 pt-2 space-y-1">
                    {player.dob && (
                      <p className="font-mono-custom text-[10px] text-white/50">
                        DOB: <span className="text-white/80">{player.dob}</span>
                      </p>
                    )}
                    {player.fifaId && player.fifaId !== '—' && (
                      <p className="font-mono-custom text-[10px] text-white/50">
                        FIFA: <span className="text-white/80">{player.fifaId}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Season summary bar */}
        <div className="mt-16 border border-white/10 p-6 flex flex-wrap gap-8 justify-around">
          <div className="text-center">
            <p className="font-mono-custom text-xs text-white/40 tracking-widest mb-1">REGISTERED</p>
            <p className="font-aggressive text-4xl text-imperial-yellow">{players.length}</p>
          </div>
          <div className="text-center">
            <p className="font-mono-custom text-xs text-white/40 tracking-widest mb-1">GOALKEEPERS</p>
            <p className="font-aggressive text-4xl text-white">{players.filter(p => p.positions.includes('GK')).length}</p>
          </div>
          <div className="text-center">
            <p className="font-mono-custom text-xs text-white/40 tracking-widest mb-1">DEFENDERS</p>
            <p className="font-aggressive text-4xl text-white">{players.filter(p => p.positions.includes('DEF')).length}</p>
          </div>
          <div className="text-center">
            <p className="font-mono-custom text-xs text-white/40 tracking-widest mb-1">MIDFIELDERS</p>
            <p className="font-aggressive text-4xl text-white">{players.filter(p => p.positions.includes('MID')).length}</p>
          </div>
          <div className="text-center">
            <p className="font-mono-custom text-xs text-white/40 tracking-widest mb-1">FORWARDS</p>
            <p className="font-aggressive text-4xl text-white">{players.filter(p => p.positions.includes('FWD')).length}</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Squad;
