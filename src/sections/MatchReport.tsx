import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Activity, Zap } from 'lucide-react';
import { matchReportConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const MatchReport = () => {
  // Null check
  if (!matchReportConfig.matchTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card reveal animation
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
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

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats stagger
      gsap.fromTo(
        statsRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
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
      id="match-report"
      className="relative w-full min-h-screen bg-black py-20 px-4 md:px-8 lg:px-16"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-2 bg-imperial-yellow" />
          <span className="font-mono-custom text-xs text-imperial-yellow uppercase tracking-[0.2em]">
            {matchReportConfig.sectionLabel}
          </span>
        </div>
        <h2 className="font-aggressive text-4xl md:text-5xl lg:text-6xl text-white">
          {matchReportConfig.sectionTitle}
        </h2>
      </div>

      {/* Bento Box Card */}
      <div
        ref={cardRef}
        className="max-w-7xl mx-auto"
      >
        <div className="card-imperial grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
          {/* Image Side */}
          <div
            ref={imageRef}
            className="relative h-64 lg:h-auto min-h-[400px] overflow-hidden"
          >
            <img
              src={matchReportConfig.matchImage}
              alt="Match action"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Score overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono-custom text-xs text-white/60 uppercase mb-1">Final Score</p>
                  <div className="flex items-center gap-4">
                    <span className="font-aggressive text-4xl text-imperial-yellow">{matchReportConfig.score}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono-custom text-xs text-white/60 uppercase mb-1">vs</p>
                  <span className="font-aggressive text-xl text-white">{matchReportConfig.opponent}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div ref={contentRef} className="p-8 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Match title */}
              <h3 className="font-aggressive text-2xl md:text-3xl text-white mb-4">
                {matchReportConfig.matchTitle}
              </h3>

              {/* Date */}
              <p className="font-mono-custom text-sm text-imperial-yellow/70 mb-6">
                {matchReportConfig.matchDate}
              </p>

              {/* Description */}
              <p className="text-white/70 leading-relaxed mb-8">
                {matchReportConfig.matchDescription}
              </p>
            </div>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4">
              <div className="bg-black/50 border border-imperial-yellow/20 p-4 bevel-sm">
                <Activity className="w-5 h-5 text-imperial-yellow mb-2" />
                <p className="font-mono-custom text-xs text-white/50 uppercase mb-1">Possession</p>
                <p className="font-aggressive text-2xl text-white">{matchReportConfig.stats.possession}</p>
              </div>
              <div className="bg-black/50 border border-imperial-yellow/20 p-4 bevel-sm">
                <Target className="w-5 h-5 text-imperial-yellow mb-2" />
                <p className="font-mono-custom text-xs text-white/50 uppercase mb-1">Shots</p>
                <p className="font-aggressive text-2xl text-white">{matchReportConfig.stats.shots}</p>
              </div>
              <div className="bg-black/50 border border-imperial-yellow/20 p-4 bevel-sm">
                <Zap className="w-5 h-5 text-imperial-yellow mb-2" />
                <p className="font-mono-custom text-xs text-white/50 uppercase mb-1">Passes</p>
                <p className="font-aggressive text-2xl text-white">{matchReportConfig.stats.passes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-20 right-8 w-32 h-32 border-r-2 border-t-2 border-imperial-yellow/10" />
    </section>
  );
};

export default MatchReport;
