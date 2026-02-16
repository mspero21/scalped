/**
 * TheSportsDB Venue Import Script
 * 
 * Fetches all teams and their stadium data from TheSportsDB API
 * and generates SQL insert statements for the stadiums table.
 * 
 * Usage: npx ts-node scripts/import-sportsdb-venues.ts
 */

const API_BASE = 'https://www.thesportsdb.com/api/v1/json/3';

// League configurations with sport type mapping
const LEAGUES = [
  // US Major Sports
  { name: 'NFL', sport: 'NFL', league: 'NFL' },
  { name: 'NBA', sport: 'NBA', league: 'NBA' },
  { name: 'MLB', sport: 'MLB', league: 'MLB' },
  { name: 'NHL', sport: 'NHL', league: 'NHL' },
  { name: 'MLS', sport: 'MLS', league: 'MLS' },
  
  // European Soccer
  { name: 'English Premier League', sport: 'SOCCER', league: 'English Premier League' },
  { name: 'Spanish La Liga', sport: 'SOCCER', league: 'Spanish La Liga' },
  { name: 'German Bundesliga', sport: 'SOCCER', league: 'German Bundesliga' },
  { name: 'Italian Serie A', sport: 'SOCCER', league: 'Italian Serie A' },
  { name: 'French Ligue 1', sport: 'SOCCER', league: 'French Ligue 1' },
  
  // Other Soccer
  { name: 'Australian A-League', sport: 'SOCCER', league: 'Australian A-League' },
  { name: 'Scottish Premiership', sport: 'SOCCER', league: 'Scottish Premiership' },
  { name: 'Dutch Eredivisie', sport: 'SOCCER', league: 'Dutch Eredivisie' },
  { name: 'Portuguese Primeira Liga', sport: 'SOCCER', league: 'Portuguese Primeira Liga' },
  { name: 'Brazilian Serie A', sport: 'SOCCER', league: 'Brazilian Serie A' },
  { name: 'Argentine Primera Division', sport: 'SOCCER', league: 'Argentine Primera Division' },
  { name: 'Mexican Primera League', sport: 'SOCCER', league: 'Mexican Primera League' },
  
  // Rugby
  { name: 'Super Rugby', sport: 'RUGBY', league: 'Super Rugby' },
  
  // Cricket
  { name: 'Indian Premier League', sport: 'CRICKET', league: 'Indian Premier League' },
  
  // Motorsport
  { name: 'Formula 1', sport: 'MOTORSPORT', league: 'Formula 1' },
];

interface Team {
  idTeam: string;
  strTeam: string;
  strStadium: string;
  strLocation: string;
  strCountry: string;
  intStadiumCapacity: string | null;
  intFormedYear: string;
  strSport: string;
  strBadge: string | null;
  strFanart1: string | null;
  idVenue: string | null;
}

interface Venue {
  idVenue: string;
  strVenue: string;
  strVenueLocation: string;
  strCountry: string;
  intCapacity: string | null;
  intFormedYear: string | null;
  strThumb: string | null;
  strFanart1: string | null;
  strFanart2: string | null;
  strFanart3: string | null;
  strFanart4: string | null;
}

interface StadiumRecord {
  name: string;
  city: string;
  state: string;
  country: string;
  sport: string;
  team_name: string;
  capacity: number;
  year_built: number;
  roof_type: string;
  image_url: string | null;
  sportsdb_venue_id: string | null;
  league: string;
}

// Delay helper to avoid rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch teams for a league
async function fetchLeagueTeams(leagueName: string): Promise<Team[]> {
  const url = `${API_BASE}/search_all_teams.php?l=${encodeURIComponent(leagueName)}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.teams || [];
  } catch (error) {
    console.error(`Error fetching ${leagueName}:`, error);
    return [];
  }
}

// Fetch venue details
async function fetchVenue(venueId: string): Promise<Venue | null> {
  const url = `${API_BASE}/lookupvenue.php?id=${venueId}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.venues?.[0] || null;
  } catch (error) {
    console.error(`Error fetching venue ${venueId}:`, error);
    return null;
  }
}

// Parse location into city/state
function parseLocation(location: string, country: string): { city: string; state: string } {
  if (!location) return { city: 'Unknown', state: '' };
  
  const parts = location.split(',').map(p => p.trim());
  
  if (country === 'United States' || country === 'USA') {
    if (parts.length >= 2) {
      return { city: parts[0], state: parts[parts.length - 1] };
    }
  }
  
  return { city: parts[0], state: parts.length > 1 ? parts.slice(1).join(', ') : '' };
}

// Determine roof type (default guess based on sport/location)
function guessRoofType(sport: string, location: string): string {
  const coldCities = ['green bay', 'buffalo', 'chicago', 'detroit', 'minnesota', 'seattle'];
  const loc = location.toLowerCase();
  
  if (sport === 'NBA' || sport === 'NHL') return 'DOME';
  if (coldCities.some(c => loc.includes(c))) return 'DOME';
  
  return 'OPEN';
}

// Escape SQL string
function escapeSql(str: string | null, allowEmpty = false): string {
  if (str === null || str === undefined) return 'NULL';
  if (str === '' && !allowEmpty) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// Escape SQL string, allowing empty strings
function escapeSqlAllowEmpty(str: string | null): string {
  if (str === null || str === undefined) return "''";
  return `'${str.replace(/'/g, "''")}'`;
}

// Convert team data to stadium record with optional venue data
function teamToStadium(team: Team, sportType: string, leagueName: string, venue?: Venue | null): StadiumRecord | null {
  const stadiumName = team.strStadium;
  if (!stadiumName || stadiumName.toLowerCase() === 'unknown' || stadiumName === '') return null;

  const location = team.strLocation || '';
  const country = team.strCountry || 'Unknown';
  const { city, state } = parseLocation(location, country);

  const capacity = parseInt(team.intStadiumCapacity || '0', 10);
  const yearBuilt = parseInt(team.intFormedYear || '2000', 10);

  // Prefer venue images over team fan art - these are actual stadium photos
  const venueImage = venue?.strFanart1 || venue?.strFanart2 || venue?.strFanart3 || venue?.strFanart4 || venue?.strThumb;
  const imageUrl = venueImage || team.strFanart1 || null;

  return {
    name: stadiumName,
    city: city || 'Unknown',
    state: state || '',  // Ensure state is never null (empty string is OK)
    country: normalizeCountry(country),
    sport: sportType,
    team_name: team.strTeam,
    capacity: capacity > 0 ? capacity : 40000, // Default capacity
    year_built: yearBuilt > 1800 ? yearBuilt : 2000, // Sanity check
    roof_type: guessRoofType(sportType, location),
    image_url: imageUrl,
    sportsdb_venue_id: team.idVenue || null,
    league: leagueName,
  };
}

// Normalize country names
function normalizeCountry(country: string): string {
  const countryMap: Record<string, string> = {
    'United States': 'USA',
    'United States of America': 'USA',
    'England': 'United Kingdom',
    'Scotland': 'United Kingdom',
    'Wales': 'United Kingdom',
    'Northern Ireland': 'United Kingdom',
  };
  return countryMap[country] || country;
}

// Generate SQL INSERT statement
function generateSqlInsert(stadium: StadiumRecord): string {
  return `  (${escapeSql(stadium.name)}, ${escapeSql(stadium.city)}, ${escapeSql(stadium.state)}, ${escapeSql(stadium.country)}, '${stadium.sport}', ${escapeSql(stadium.team_name)}, ${stadium.capacity}, ${stadium.year_built}, '${stadium.roof_type}', ${escapeSql(stadium.image_url)})`;
}

// Generate SQL INSERT statement (basic - works with existing schema)
function generateSqlInsertBasic(stadium: StadiumRecord): string {
  return `  (${escapeSql(stadium.name)}, ${escapeSql(stadium.city)}, ${escapeSqlAllowEmpty(stadium.state)}, ${escapeSql(stadium.country)}, '${stadium.sport}', ${escapeSql(stadium.team_name)}, ${stadium.capacity}, ${stadium.year_built}, '${stadium.roof_type}', ${escapeSql(stadium.image_url)})`;
}

// Main execution
async function main() {
  console.log('🏟️  TheSportsDB Venue Import Script');
  console.log('=====================================\n');
  console.log('⚡ Fetching venue images for better stadium photos...\n');

  const allStadiums: StadiumRecord[] = [];
  const seenVenues = new Set<string>(); // Track by name+city to avoid duplicates
  const venueCache = new Map<string, Venue | null>(); // Cache venue lookups

  for (const leagueConfig of LEAGUES) {
    console.log(`📋 Fetching ${leagueConfig.name}...`);

    const teams = await fetchLeagueTeams(leagueConfig.league);
    console.log(`   Found ${teams.length} teams`);

    for (const team of teams) {
      // Fetch venue data for better stadium images
      let venue: Venue | null = null;
      if (team.idVenue) {
        if (venueCache.has(team.idVenue)) {
          venue = venueCache.get(team.idVenue) || null;
        } else {
          venue = await fetchVenue(team.idVenue);
          venueCache.set(team.idVenue, venue);
          await delay(500); // Slower rate limit to avoid 429 errors
        }
      }

      // Convert team to stadium record with venue data for better images
      const stadium = teamToStadium(team, leagueConfig.sport, leagueConfig.name, venue);
      if (stadium) {
        const venueKey = `${stadium.name.toLowerCase()}-${stadium.city.toLowerCase()}`;
        if (!seenVenues.has(venueKey)) {
          seenVenues.add(venueKey);
          allStadiums.push(stadium);
          const hasVenueImage = venue?.strFanart1 || venue?.strThumb;
          console.log(`   ✓ ${stadium.name} (${stadium.team_name})${hasVenueImage ? ' 📸' : ''}`);
        }
      }
    }

    await delay(1000); // Longer delay between leagues to avoid rate limiting
  }

  console.log(`\n✅ Collected ${allStadiums.length} unique stadiums\n`);

  // Generate SQL
  console.log('📝 Generating SQL...\n');

  const sqlStatements = allStadiums.map(generateSqlInsertBasic).join(',\n');

  const fullSql = `-- Auto-generated venue data from TheSportsDB
-- Generated on ${new Date().toISOString()}
-- Total venues: ${allStadiums.length}

INSERT INTO stadiums (name, city, state, country, sport, team_name, capacity, year_built, roof_type, image_url) VALUES
${sqlStatements}
ON CONFLICT DO NOTHING;
`;

  // Write to file
  const fs = await import('fs');
  const outputPath = 'supabase/seed-sportsdb.sql';
  fs.writeFileSync(outputPath, fullSql);

  console.log(`💾 Saved to ${outputPath}`);
  console.log('\n🎉 Import complete!');

  // Also output JSON for reference
  const jsonOutput = 'supabase/venues-sportsdb.json';
  fs.writeFileSync(jsonOutput, JSON.stringify(allStadiums, null, 2));
  console.log(`📄 JSON backup saved to ${jsonOutput}`);
}

main().catch(console.error);

