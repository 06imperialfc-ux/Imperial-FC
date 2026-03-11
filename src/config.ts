// app/src/config.ts

// ── GOOGLE SHEETS ─────────────────────────────────────────────────────────
export const SHEET_ID = '1gnkCEgW5oU8nO0z5lkj2U1h-bBq4tpnDpp8UoCFmpNg';

// ── SITE ──────────────────────────────────────────────────────────────────
export const siteConfig = {
  title: 'Imperial FC | Official Site',
  brandName: 'IMPERIAL FC',
};

// ── HERO ──────────────────────────────────────────────────────────────────
export const heroConfig = {
  brandName: 'IMPERIAL FC',
  decodeText: 'THE VANGUARD',
  decodeChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  subtitle: 'MAMELODI · TSHWANE REGIONAL FA · MALFA PROMOTIONAL LEAGUE',
  backgroundImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000',
  ctaPrimary: 'LATEST MATCH',
  ctaPrimaryTarget: 'match-report',
  ctaSecondary: 'VIEW SQUAD',
  ctaSecondaryTarget: 'squad',
  navItems: [
    { label: 'MATCH',    icon: 'play',     sectionId: 'match-report' },
    { label: 'SQUAD',    icon: 'disc',     sectionId: 'squad'        },
    { label: 'FIXTURES', icon: 'calendar', sectionId: 'fixtures'     },
    { label: 'TABLE',    icon: 'bar-chart',sectionId: 'standings'    },
  ],
  cornerLabel: 'EST. 2024',
  cornerDetail: 'MAMELODI · GP',
};

// ── MATCH REPORT ──────────────────────────────────────────────────────────
// Static fallback — overridden at runtime by lastResult from googleSheets.ts
export const matchReportConfig = {
  matchTitle: 'LATEST RESULT',
  opponent: 'TBC',
  score: '- - -',
  date: 'TBC',
  image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200',
  summary: 'Match report loading...',
  standing: '-',
  spotlightPlayer: '-',
  spotlightStat: '-',
  allMatchesLink: '#fixtures',
};

// ── SQUAD ─────────────────────────────────────────────────────────────────
// players array is intentionally empty — populated live from Google Sheets
export const squadConfig = {
  title: 'THE VANGUARD',
  viewFullSquadLink: '#squad',
  players: [] as {
    id: number;
    name: string;
    position: string;
    number: string;
    image: string;
    stats: { goals: string; assists: string };
  }[],
};

// ── FIXTURES ──────────────────────────────────────────────────────────────
// fixtures array is intentionally empty — populated live from Google Sheets
export const fixturesConfig = {
  sectionLabel: 'SCHEDULE',
  sectionTitle: 'FIXTURES & RESULTS',
  resultsTitle: 'PAST RESULTS',
  fixturesTitle: 'UPCOMING FIXTURES',
  fixtures: [] as {
    id: string | number;
    opponent: string;
    date: string;
    time: string;
    venue: string;
    status: string;
    type: 'home' | 'away';
    score?: string;
  }[],
};

// ── STANDINGS ─────────────────────────────────────────────────────────────
// populated live from Google Sheets
export const standingsConfig = {
  sectionLabel: 'LEAGUE',
  sectionTitle: 'MALFA PROMOTIONAL LEAGUE',
  season: '2025 / 26',
  clubName: 'MAMELODI IMPERIAL FC',
};

// ── GALLERY ───────────────────────────────────────────────────────────────
export type MediaImage = {
  id: number | string;
  src: string;
  alt: string;
  title: string;
  date?: string;
};

export const mediaGalleryConfig: {
  sectionLabel: string;
  sectionTitle: string;
  images: MediaImage[];
} = {
  sectionLabel: 'GALLERY',
  sectionTitle: 'MEDIA',
  images: [],
};

// ── FOOTER ────────────────────────────────────────────────────────────────
export const footerConfig = {
  brandName: 'IMPERIAL FC',
  brandDescription:
    'Mamelodi Imperial FC — competing in the MALFA Promotional League under Tshwane Regional FA (GP). Precision, Power, and the Pursuit of Excellence.',
  socials: {
    facebook:  'https://facebook.com',
    instagram: 'https://instagram.com',
    whatsapp:  'https://whatsapp.com/channel/your-id',
  },
  contact: {
    email:    'contact@imperialfc.com',
    phone:    '+27 00 000 0000',
    location: 'Mamelodi, Tshwane, South Africa',
  },
};
