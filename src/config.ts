// =============================================================================
// Imperial FC Site Configuration
// Edit ONLY this file to customize all content across the site.
// All animations, layouts, and styles are controlled by the components.
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Imperial FC - The Empire Strikes Back",
  description: "Official website of Imperial FC - A dominant force in football. View fixtures, squad, match reports, and media.",
  language: "en",
};

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId: string;
  icon: "disc" | "play" | "calendar" | "music";
}

export interface HeroConfig {
  backgroundImage: string;
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  cornerLabel: string;
  cornerDetail: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "https://placehold.co/1200x600/000000/fbb616?text=Imperial+FC+Hero+Video+Loop",
  brandName: "IMPERIAL FC",
  decodeText: "THE EMPIRE STRIKES BACK",
  decodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  subtitle: "Welcome to Imperial FC",
  ctaPrimary: "View Latest Fixtures",
  ctaPrimaryTarget: "fixtures",
  ctaSecondary: "Meet The Squad",
  ctaSecondaryTarget: "squad",
  cornerLabel: "EST. 2024",
  cornerDetail: "DOMINANT FORCE",
  navItems: [
    { label: "Match Report", sectionId: "match-report", icon: "play" },
    { label: "Squad", sectionId: "squad", icon: "disc" },
    { label: "Fixtures", sectionId: "fixtures", icon: "calendar" },
    { label: "Media", sectionId: "media", icon: "music" },
  ],
};

// -- Match Report Section (Bento Box) -----------------------------------------
export interface MatchReportConfig {
  sectionLabel: string;
  sectionTitle: string;
  matchImage: string;
  matchTitle: string;
  matchDescription: string;
  score: string;
  opponent: string;
  matchDate: string;
  stats: {
    possession: string;
    shots: string;
    passes: string;
  };
}

export const matchReportConfig: MatchReportConfig = {
  sectionLabel: "LATEST RESULT",
  sectionTitle: "MATCH REPORT",
  matchImage: "https://placehold.co/600x400/000000/fbb616?text=Match+Action+Shot",
  matchTitle: "IMPERIAL FC vs SKAPIE STARS",
  matchDescription: "A hard-fought victory this past Sunday. The squad dug deep to secure the 3 points, sending Skapie Stars packing with a dominant, relentless performance.",
  score: "3 - 1",
  opponent: "Skapie Stars",
  matchDate: "Sunday, March 2, 2025",
  stats: {
    possession: "62%",
    shots: "18",
    passes: "487",
  },
};

// -- Squad Section ------------------------------------------------------------
export interface Player {
  id: number;
  name: string;
  position: string;
  number: string;
  image: string;
  stats: {
    appearances: number;
    goals: number;
    assists: number;
  };
}

export interface SquadConfig {
  sectionLabel: string;
  sectionTitle: string;
  players: Player[];
}

export const squadConfig: SquadConfig = {
  sectionLabel: "THE TEAM",
  sectionTitle: "MEET THE IMPERIAL VANGUARD",
  players: [
    {
      id: 1,
      name: "MARCUS STEELE",
      position: "Striker",
      number: "09",
      image: "https://placehold.co/300x400/000000/fbb616?text=Player+Headshot",
      stats: { appearances: 24, goals: 18, assists: 7 },
    },
    {
      id: 2,
      name: "DIEGO VARGAS",
      position: "Midfielder",
      number: "10",
      image: "https://placehold.co/300x400/000000/fbb616?text=Player+Headshot",
      stats: { appearances: 26, goals: 8, assists: 15 },
    },
    {
      id: 3,
      name: "KAI TANAKA",
      position: "Defender",
      number: "04",
      image: "https://placehold.co/300x400/000000/fbb616?text=Player+Headshot",
      stats: { appearances: 25, goals: 2, assists: 4 },
    },
    {
      id: 4,
      name: "LEO ANDERSON",
      position: "Goalkeeper",
      number: "01",
      image: "https://placehold.co/300x400/000000/fbb616?text=Player+Headshot",
      stats: { appearances: 26, goals: 0, assists: 1 },
    },
  ],
};

// -- Fixtures & Results Section -----------------------------------------------
export interface Fixture {
  id: number;
  date: string;
  time: string;
  opponent: string;
  venue: string;
  type: "home" | "away";
  status: "win" | "loss" | "draw" | "upcoming";
  score?: string;
}

export interface FixturesConfig {
  sectionLabel: string;
  sectionTitle: string;
  resultsTitle: string;
  fixturesTitle: string;
  fixtures: Fixture[];
}

export const fixturesConfig: FixturesConfig = {
  sectionLabel: "SCHEDULE",
  sectionTitle: "FIXTURES & RESULTS",
  resultsTitle: "PAST RESULTS",
  fixturesTitle: "UPCOMING FIXTURES",
  fixtures: [
    {
      id: 1,
      date: "Mar 2, 2025",
      time: "15:00",
      opponent: "Skapie Stars",
      venue: "Imperial Stadium",
      type: "home",
      status: "win",
      score: "3 - 1",
    },
    {
      id: 2,
      date: "Feb 23, 2025",
      time: "14:30",
      opponent: "Thunder United",
      venue: "Thunder Arena",
      type: "away",
      status: "win",
      score: "2 - 0",
    },
    {
      id: 3,
      date: "Feb 16, 2025",
      time: "16:00",
      opponent: "Royal Knights",
      venue: "Imperial Stadium",
      type: "home",
      status: "draw",
      score: "1 - 1",
    },
    {
      id: 4,
      date: "Mar 9, 2025",
      time: "15:00",
      opponent: "City Warriors",
      venue: "Warrior Park",
      type: "away",
      status: "upcoming",
    },
    {
      id: 5,
      date: "Mar 16, 2025",
      time: "14:00",
      opponent: "Northern FC",
      venue: "Imperial Stadium",
      type: "home",
      status: "upcoming",
    },
  ],
};

// -- Media Gallery Section ----------------------------------------------------
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
}

export interface MediaGalleryConfig {
  sectionLabel: string;
  sectionTitle: string;
  images: GalleryImage[];
}

export const mediaGalleryConfig: MediaGalleryConfig = {
  sectionLabel: "GALLERY",
  sectionTitle: "MEDIA CENTER",
  images: [
    {
      id: 1,
      src: "https://placehold.co/400x400/000000/fbb616?text=Gallery+Image+1",
      alt: "Match celebration",
      title: "VICTORY CELEBRATION",
    },
    {
      id: 2,
      src: "https://placehold.co/400x600/000000/fbb616?text=Gallery+Image+2",
      alt: "Team huddle",
      title: "TEAM HUDDLE",
    },
    {
      id: 3,
      src: "https://placehold.co/600x400/000000/fbb616?text=Gallery+Image+3",
      alt: "Goal moment",
      title: "GOAL MOMENT",
    },
    {
      id: 4,
      src: "https://placehold.co/400x500/000000/fbb616?text=Gallery+Image+4",
      alt: "Training session",
      title: "TRAINING",
    },
    {
      id: 5,
      src: "https://placehold.co/500x400/000000/fbb616?text=Gallery+Image+5",
      alt: "Fan celebration",
      title: "FAN ZONE",
    },
    {
      id: 6,
      src: "https://placehold.co/400x400/000000/fbb616?text=Gallery+Image+6",
      alt: "Captain armband",
      title: "CAPTAIN",
    },
  ],
};

// -- Footer Section -----------------------------------------------------------
export interface FooterConfig {
  brandName: string;
  brandDescription: string;
  quickLinksTitle: string;
  quickLinks: string[];
  contactTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  addressLabel: string;
  address: string;
  socialTitle: string;
  copyrightText: string;
  bottomLinks: string[];
}

export const footerConfig: FooterConfig = {
  brandName: "IMPERIAL FC",
  brandDescription: "The Empire Strikes Back. A dominant force in football, built on passion, precision, and relentless pursuit of victory.",
  quickLinksTitle: "QUICK LINKS",
  quickLinks: ["Home", "Fixtures", "Squad", "Media", "Contact"],
  contactTitle: "CONTACT",
  emailLabel: "Email",
  email: "info@imperialfc.com",
  phoneLabel: "Phone",
  phone: "+1 (555) 123-4567",
  addressLabel: "Stadium",
  address: "Imperial Stadium, 123 Champions Way",
  socialTitle: "FOLLOW US",
  copyrightText: "© 2025 Imperial FC. All rights reserved.",
  bottomLinks: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

// Legacy configs (kept for compatibility, return empty arrays to disable sections)
export const albumCubeConfig = {
  albums: [] as Array<{ id: number; title: string; subtitle: string; image: string }>,
  cubeTextures: [] as string[],
  scrollHint: "",
};

export const parallaxGalleryConfig = {
  sectionLabel: "",
  sectionTitle: "",
  galleryLabel: "",
  galleryTitle: "",
  marqueeTexts: [] as string[],
  endCtaText: "",
  parallaxImagesTop: [] as Array<{ id: number; src: string; alt: string }>,
  parallaxImagesBottom: [] as Array<{ id: number; src: string; alt: string }>,
  galleryImages: [] as Array<{ id: number; src: string; title: string; date: string }>,
};

export const tourScheduleConfig = {
  sectionLabel: "",
  sectionTitle: "",
  vinylImage: "",
  buyButtonText: "",
  detailsButtonText: "",
  bottomNote: "",
  bottomCtaText: "",
  statusLabels: {
    onSale: "",
    soldOut: "",
    comingSoon: "",
    default: "",
  },
  tourDates: [] as Array<{
    id: number;
    date: string;
    time: string;
    city: string;
    venue: string;
    status: "on-sale" | "sold-out" | "coming-soon";
    image: string;
  }>,
};
