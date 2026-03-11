// app/src/services/googleSheets.ts
// Live data from Imperial FC Google Sheet (published to web)

const SHEET_ID = '1gnkCEgW5oU8nO0z5lkj2U1h-bBq4tpnDpp8UoCFmpNg';

const TABS = {
  standings: '0',
  players:   '812181633',
  fixtures:  '1599112753',
};

function csvUrl(gid: string) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
}

// Parse CSV text into array of objects keyed by header row
function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split('\n').map(l => l.split(',').map(c => c.trim().replace(/^"|"$/g, '')));
  const [headers, ...rows] = lines;
  return rows
    .filter(r => r.some(c => c !== ''))
    .map(r => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ''])));
}

async function fetchTab(gid: string) {
  const res = await fetch(csvUrl(gid));
  const text = await res.text();
  return parseCsv(text);
}

// ── PLAYERS ──────────────────────────────────────────────────────────────
export async function fetchPlayers() {
  const rows = await fetchTab(TABS.players);
  return rows
    .filter(r => r['Last Name'] && !r['Last Name'].startsWith('💡'))
    .map((r, i) => ({
      id: i + 1,
      lastName:  r['Last Name']  || '',
      firstName: r['First Name'] || '',
      name:      `${(r['Last Name'] || '').charAt(0)}. ${r['First Name'] || ''}`,
      mysafa:    r['MYSAFA']      || '',
      dob:       r['DOB']         || '',
      fifaId:    r['FIFA ID']     || '',
      regDate:   r['Reg Date']    || '',
      positions: (r['Position(s)'] || '').split(',').map((p: string) => p.trim()).filter(Boolean),
      status:    r['Status']      || 'Active',
    }));
}

// ── STANDINGS ─────────────────────────────────────────────────────────────
export async function fetchStandings() {
  const rows = await fetchTab(TABS.standings);
  return rows
    .filter(r => r['Team'])
    .map(r => ({
      position: Number(r['Position']) || 0,
      team:     r['Team']   || '',
      played:   Number(r['Played']) || 0,
      won:      Number(r['Won'])    || 0,
      drawn:    Number(r['Drawn'])  || 0,
      lost:     Number(r['Lost'])   || 0,
      gf:       Number(r['GF'])     || 0,
      ga:       Number(r['GA'])     || 0,
      gd:       Number(r['GD'])     || 0,
      points:   Number(r['Points']) || 0,
    }));
}

// ── FIXTURES ──────────────────────────────────────────────────────────────
export async function fetchFixtures() {
  const rows = await fetchTab(TABS.fixtures);
  return rows
    .filter(r => r['Home Team'])
    .map(r => {
      const hs  = r['Home Score'];
      const as_ = r['Away Score'];
      const homeScore = hs  !== '' ? Number(hs)  : null;
      const awayScore = as_ !== '' ? Number(as_) : null;
      const isImperialHome = (r['Home Team'] || '').toUpperCase().includes('IMPERIAL');

      let result: 'win' | 'loss' | 'draw' | null = null;
      if (homeScore !== null && awayScore !== null) {
        const imperialScore = isImperialHome ? homeScore : awayScore;
        const oppScore      = isImperialHome ? awayScore : homeScore;
        result = imperialScore > oppScore ? 'win' : imperialScore === oppScore ? 'draw' : 'loss';
      }

      return {
        matchNum:      r['Match #']   || '',
        week:          r['Week']      || '',
        date:          r['Date']      || 'TBC',
        homeTeam:      r['Home Team'] || '',
        homeScore,
        awayScore,
        awayTeam:      r['Away Team'] || '',
        venue:         r['Venue']     || '',
        status:        r['Status']    || 'Scheduled',
        isImperialHome,
        result,
      };
    });
}

// ── ALL DATA AT ONCE ──────────────────────────────────────────────────────
export async function fetchAllSiteData() {
  const [players, standings, fixtures] = await Promise.all([
    fetchPlayers(),
    fetchStandings(),
    fetchFixtures(),
  ]);

  // Auto-derive Imperial FC's season record from fixture results
  const played = fixtures.filter(f => f.status === 'Played');
  const wins   = played.filter(f => f.result === 'win').length;
  const draws  = played.filter(f => f.result === 'draw').length;
  const losses = played.filter(f => f.result === 'loss').length;
  const gf     = played.reduce((acc, f) => acc + (f.isImperialHome ? (f.homeScore ?? 0) : (f.awayScore ?? 0)), 0);
  const ga     = played.reduce((acc, f) => acc + (f.isImperialHome ? (f.awayScore ?? 0) : (f.homeScore ?? 0)), 0);

  const imperialRecord = {
    played: played.length,
    won: wins, drawn: draws, lost: losses,
    gf, ga, gd: gf - ga,
    points: wins * 3 + draws,
  };

  const lastResult  = [...played].reverse()[0] ?? null;
  const nextFixture = fixtures.find(f => f.status === 'Scheduled') ?? null;

  return { players, standings, fixtures, imperialRecord, lastResult, nextFixture };
}
