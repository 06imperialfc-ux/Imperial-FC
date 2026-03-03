// app/src/config.ts

export const siteConfig = {
  title: 'Imperial FC | Official Site',
  brandName: 'IMPERIAL FC',
};

export const heroConfig = {
  brandName: 'IMPERIAL FC',
  decodeText: 'THE VANGUARD',
  decodeChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  subtitle: 'PREMIUM FOOTBALL COLLECTIVE',
  backgroundImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000',
  ctaPrimary: 'LATEST MATCH',
  ctaPrimaryTarget: 'match-report',
  ctaSecondary: 'VIEW SQUAD',
  ctaSecondaryTarget: 'squad',
  navItems: [
    { label: 'MATCH', icon: 'play', sectionId: 'match-report' },
    { label: 'SQUAD', icon: 'disc', sectionId: 'squad' },
    { label: 'FIXTURES', icon: 'calendar', sectionId: 'fixtures' },
  ],
  cornerLabel: 'EST. 2024',
  cornerDetail: 'CITY DIVISION',
};

export const matchReportConfig = {
  matchTitle: 'DOMINANT PERFORMANCE',
  opponent: 'City Rivals',
  score: '3 - 1',
  date: 'FEBRUARY 24, 2026',
  image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200',
  summary: 'A masterclass in clinical finishing saw the Vanguard take all three points in a heated derby.',
  
  // NEW FIELDS
  standing: '3rd', // Update this to 1st, 3rd, 4th, etc.
  spotlightPlayer: 'S. GUMEDE',
  spotlightStat: '2 GOALS, 1 ASSIST',
  allMatchesLink: '#', // Placeholder for future matches page
};

export const squadConfig = {
  title: 'THE VANGUARD',
  viewFullSquadLink: '#', // Placeholder for the full squad page
  players: [
    {
      id: 1,
      name: 'M. KHUMALO',
      position: 'FORWARD',
      number: '09',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600',
      stats: { goals: '12', assists: '4' }
    },
    {
      id: 2,
      name: 'L. DLAMINI',
      position: 'MIDFIELD',
      number: '08',
      image: 'https://images.unsplash.com/photo-1552318975-27dbad9b738d?q=80&w=600',
      stats: { goals: '3', assists: '15' }
    }
  ]
};

export const fixturesConfig = {
  fixtures: [
    { id: 1, opponent: 'United FC', date: 'MAR 05', time: '15:00', venue: 'Imperial Arena', status: 'upcoming' },
    { id: 2, opponent: 'Strikers SC', date: 'FEB 28', time: '14:30', venue: 'West Park', status: 'win', score: '2-0' }
  ]
};

export const footerConfig = {
  brandName: 'IMPERIAL FC',
  brandDescription: 'The elite football collective of the city. Precision, Power, and the Pursuit of Excellence.',
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    whatsapp: 'https://whatsapp.com/channel/your-id'
  },
  contact: {
    email: 'contact@imperialfc.com',
    phone: '+27 00 000 0000',
    location: 'Johannesburg, South Africa'
  }
};
