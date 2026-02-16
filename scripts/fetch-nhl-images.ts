/**
 * Fetch Wikipedia images for NHL arenas
 * Usage: npx ts-node scripts/fetch-nhl-images.ts
 */

import * as fs from 'fs';

const NHL_ARENAS = [
  { name: 'Honda Center', city: 'Anaheim', state: 'CA', country: 'USA', team_name: 'Anaheim Ducks', capacity: 17174, year_built: 1993 },
  { name: 'Mullett Arena', city: 'Tempe', state: 'AZ', country: 'USA', team_name: 'Arizona Coyotes', capacity: 5000, year_built: 2022 },
  { name: 'TD Garden', city: 'Boston', state: 'MA', country: 'USA', team_name: 'Boston Bruins', capacity: 17565, year_built: 1995 },
  { name: 'KeyBank Center', city: 'Buffalo', state: 'NY', country: 'USA', team_name: 'Buffalo Sabres', capacity: 19070, year_built: 1996 },
  { name: 'Scotiabank Saddledome', city: 'Calgary', state: 'AB', country: 'Canada', team_name: 'Calgary Flames', capacity: 19289, year_built: 1983 },
  { name: 'PNC Arena', city: 'Raleigh', state: 'NC', country: 'USA', team_name: 'Carolina Hurricanes', capacity: 18680, year_built: 1999 },
  { name: 'United Center', city: 'Chicago', state: 'IL', country: 'USA', team_name: 'Chicago Blackhawks', capacity: 19717, year_built: 1994 },
  { name: 'Ball Arena', city: 'Denver', state: 'CO', country: 'USA', team_name: 'Colorado Avalanche', capacity: 18007, year_built: 1999 },
  { name: 'Nationwide Arena', city: 'Columbus', state: 'OH', country: 'USA', team_name: 'Columbus Blue Jackets', capacity: 18500, year_built: 2000 },
  { name: 'American Airlines Center', city: 'Dallas', state: 'TX', country: 'USA', team_name: 'Dallas Stars', capacity: 18532, year_built: 2001 },
  { name: 'Little Caesars Arena', city: 'Detroit', state: 'MI', country: 'USA', team_name: 'Detroit Red Wings', capacity: 19515, year_built: 2017 },
  { name: 'Rogers Place', city: 'Edmonton', state: 'AB', country: 'Canada', team_name: 'Edmonton Oilers', capacity: 18347, year_built: 2016 },
  { name: 'Amerant Bank Arena', city: 'Sunrise', state: 'FL', country: 'USA', team_name: 'Florida Panthers', capacity: 19250, year_built: 1998 },
  { name: 'Crypto.com Arena', city: 'Los Angeles', state: 'CA', country: 'USA', team_name: 'Los Angeles Kings', capacity: 18230, year_built: 1999 },
  { name: 'Xcel Energy Center', city: 'St. Paul', state: 'MN', country: 'USA', team_name: 'Minnesota Wild', capacity: 17954, year_built: 2000 },
  { name: 'Bell Centre', city: 'Montreal', state: 'QC', country: 'Canada', team_name: 'Montreal Canadiens', capacity: 21302, year_built: 1996 },
  { name: 'Bridgestone Arena', city: 'Nashville', state: 'TN', country: 'USA', team_name: 'Nashville Predators', capacity: 17159, year_built: 1996 },
  { name: 'Prudential Center', city: 'Newark', state: 'NJ', country: 'USA', team_name: 'New Jersey Devils', capacity: 16514, year_built: 2007 },
  { name: 'UBS Arena', city: 'Elmont', state: 'NY', country: 'USA', team_name: 'New York Islanders', capacity: 17255, year_built: 2021 },
  { name: 'Madison Square Garden', city: 'New York', state: 'NY', country: 'USA', team_name: 'New York Rangers', capacity: 18006, year_built: 1968 },
  { name: 'Canadian Tire Centre', city: 'Ottawa', state: 'ON', country: 'Canada', team_name: 'Ottawa Senators', capacity: 18652, year_built: 1996 },
  { name: 'Wells Fargo Center', city: 'Philadelphia', state: 'PA', country: 'USA', team_name: 'Philadelphia Flyers', capacity: 19543, year_built: 1996 },
  { name: 'PPG Paints Arena', city: 'Pittsburgh', state: 'PA', country: 'USA', team_name: 'Pittsburgh Penguins', capacity: 18387, year_built: 2010 },
  { name: 'SAP Center', city: 'San Jose', state: 'CA', country: 'USA', team_name: 'San Jose Sharks', capacity: 17562, year_built: 1993 },
  { name: 'Climate Pledge Arena', city: 'Seattle', state: 'WA', country: 'USA', team_name: 'Seattle Kraken', capacity: 17100, year_built: 2021 },
  { name: 'Enterprise Center', city: 'St. Louis', state: 'MO', country: 'USA', team_name: 'St. Louis Blues', capacity: 18096, year_built: 1994 },
  { name: 'Amalie Arena', city: 'Tampa', state: 'FL', country: 'USA', team_name: 'Tampa Bay Lightning', capacity: 19092, year_built: 1996 },
  { name: 'Scotiabank Arena', city: 'Toronto', state: 'ON', country: 'Canada', team_name: 'Toronto Maple Leafs', capacity: 18819, year_built: 1999 },
  { name: 'Rogers Arena', city: 'Vancouver', state: 'BC', country: 'Canada', team_name: 'Vancouver Canucks', capacity: 18910, year_built: 1995 },
  { name: 'T-Mobile Arena', city: 'Las Vegas', state: 'NV', country: 'USA', team_name: 'Vegas Golden Knights', capacity: 17500, year_built: 2016 },
  { name: 'Capital One Arena', city: 'Washington', state: 'DC', country: 'USA', team_name: 'Washington Capitals', capacity: 18573, year_built: 1997 },
  { name: 'Canada Life Centre', city: 'Winnipeg', state: 'MB', country: 'Canada', team_name: 'Winnipeg Jets', capacity: 15321, year_built: 2004 },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWikipediaImage(articleTitle: string, thumbSize: number = 960): Promise<string | null> {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(articleTitle)}&prop=pageimages&format=json&pithumbsize=${thumbSize}&redirects=&origin=*`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const pages = Object.values(data.query?.pages || {}) as any[];
    for (const page of pages) {
      if (page.thumbnail?.source) return page.thumbnail.source;
    }
    return null;
  } catch { return null; }
}

async function searchWikimediaCommons(searchTerm: string, thumbSize: number = 960): Promise<string | null> {
  const url = `https://commons.wikimedia.org/w/api.php?prop=pageimages|info&gsrnamespace=6&pilimit=max&pithumbsize=${thumbSize}&action=query&inprop=url&redirects=&format=json&generator=search&gsrsearch=intitle:${encodeURIComponent(searchTerm)}&gsrlimit=5&origin=*`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const pages = Object.values(data.query?.pages || {}) as any[];
    for (const page of pages) {
      if (page.thumbnail?.source) return page.thumbnail.source;
    }
    return null;
  } catch { return null; }
}

async function findArenaImage(arenaName: string, city: string): Promise<string | null> {
  let imageUrl = await fetchWikipediaImage(arenaName);
  if (imageUrl) return imageUrl;
  await delay(200);
  imageUrl = await fetchWikipediaImage(`${arenaName} (arena)`);
  if (imageUrl) return imageUrl;
  await delay(200);
  imageUrl = await searchWikimediaCommons(`${arenaName} arena`);
  if (imageUrl) return imageUrl;
  await delay(200);
  imageUrl = await searchWikimediaCommons(`${arenaName} ${city}`);
  return imageUrl;
}

async function main() {
  console.log('🏒 Fetching Wikipedia images for NHL arenas...\n');
  const results: Array<typeof NHL_ARENAS[0] & { image_url: string | null }> = [];

  for (let i = 0; i < NHL_ARENAS.length; i++) {
    const arena = NHL_ARENAS[i];
    console.log(`[${i + 1}/${NHL_ARENAS.length}] ${arena.name} (${arena.team_name})...`);
    const imageUrl = await findArenaImage(arena.name, arena.city);
    results.push({ ...arena, image_url: imageUrl });
    console.log(imageUrl ? `   ✓ Found image` : `   ✗ No image found`);
    await delay(300);
  }

  const escape = (str: string) => str.replace(/'/g, "''");
  const values = results.map(a => {
    const imageUrl = a.image_url ? `'${escape(a.image_url)}'` : 'NULL';
    return `  ('${escape(a.name)}', '${escape(a.city)}', '${escape(a.state)}', '${escape(a.country)}', 'NHL', '${escape(a.team_name)}', ${a.capacity}, ${a.year_built}, 'DOME', ${imageUrl})`;
  });

  const sql = `-- NHL Arena data with Wikipedia images\n-- Generated on ${new Date().toISOString()}\n\nINSERT INTO stadiums (name, city, state, country, sport, team_name, capacity, year_built, roof_type, image_url) VALUES\n${values.join(',\n')}\nON CONFLICT DO NOTHING;\n`;

  console.log('\n--- SQL OUTPUT ---\n');
  console.log(sql);
  fs.writeFileSync('supabase/seed-nhl.sql', sql);
  console.log('\n💾 Saved to supabase/seed-nhl.sql');
}

main().catch(console.error);

