/**
 * Fetch Wikipedia images for NBA arenas
 * Usage: npx ts-node scripts/fetch-nba-images.ts
 */

import * as fs from 'fs';

const NBA_ARENAS = [
  { name: 'State Farm Arena', city: 'Atlanta', state: 'GA', country: 'USA', team_name: 'Atlanta Hawks', capacity: 16600, year_built: 1999 },
  { name: 'TD Garden', city: 'Boston', state: 'MA', country: 'USA', team_name: 'Boston Celtics', capacity: 19580, year_built: 1995 },
  { name: 'Barclays Center', city: 'Brooklyn', state: 'NY', country: 'USA', team_name: 'Brooklyn Nets', capacity: 17732, year_built: 2012 },
  { name: 'Spectrum Center', city: 'Charlotte', state: 'NC', country: 'USA', team_name: 'Charlotte Hornets', capacity: 19077, year_built: 2005 },
  { name: 'United Center', city: 'Chicago', state: 'IL', country: 'USA', team_name: 'Chicago Bulls', capacity: 20917, year_built: 1994 },
  { name: 'Rocket Mortgage FieldHouse', city: 'Cleveland', state: 'OH', country: 'USA', team_name: 'Cleveland Cavaliers', capacity: 19432, year_built: 1994 },
  { name: 'American Airlines Center', city: 'Dallas', state: 'TX', country: 'USA', team_name: 'Dallas Mavericks', capacity: 19200, year_built: 2001 },
  { name: 'Ball Arena', city: 'Denver', state: 'CO', country: 'USA', team_name: 'Denver Nuggets', capacity: 19520, year_built: 1999 },
  { name: 'Little Caesars Arena', city: 'Detroit', state: 'MI', country: 'USA', team_name: 'Detroit Pistons', capacity: 20332, year_built: 2017 },
  { name: 'Chase Center', city: 'San Francisco', state: 'CA', country: 'USA', team_name: 'Golden State Warriors', capacity: 18064, year_built: 2019 },
  { name: 'Toyota Center', city: 'Houston', state: 'TX', country: 'USA', team_name: 'Houston Rockets', capacity: 18055, year_built: 2003 },
  { name: 'Gainbridge Fieldhouse', city: 'Indianapolis', state: 'IN', country: 'USA', team_name: 'Indiana Pacers', capacity: 17923, year_built: 1999 },
  { name: 'Crypto.com Arena', city: 'Los Angeles', state: 'CA', country: 'USA', team_name: 'Los Angeles Clippers', capacity: 19068, year_built: 1999 },
  { name: 'Crypto.com Arena', city: 'Los Angeles', state: 'CA', country: 'USA', team_name: 'Los Angeles Lakers', capacity: 19068, year_built: 1999 },
  { name: 'FedExForum', city: 'Memphis', state: 'TN', country: 'USA', team_name: 'Memphis Grizzlies', capacity: 18119, year_built: 2004 },
  { name: 'Kaseya Center', city: 'Miami', state: 'FL', country: 'USA', team_name: 'Miami Heat', capacity: 19600, year_built: 1999 },
  { name: 'Fiserv Forum', city: 'Milwaukee', state: 'WI', country: 'USA', team_name: 'Milwaukee Bucks', capacity: 17341, year_built: 2018 },
  { name: 'Target Center', city: 'Minneapolis', state: 'MN', country: 'USA', team_name: 'Minnesota Timberwolves', capacity: 18798, year_built: 1990 },
  { name: 'Smoothie King Center', city: 'New Orleans', state: 'LA', country: 'USA', team_name: 'New Orleans Pelicans', capacity: 16867, year_built: 1999 },
  { name: 'Madison Square Garden', city: 'New York', state: 'NY', country: 'USA', team_name: 'New York Knicks', capacity: 19812, year_built: 1968 },
  { name: 'Paycom Center', city: 'Oklahoma City', state: 'OK', country: 'USA', team_name: 'Oklahoma City Thunder', capacity: 18203, year_built: 2002 },
  { name: 'Amway Center', city: 'Orlando', state: 'FL', country: 'USA', team_name: 'Orlando Magic', capacity: 18846, year_built: 2010 },
  { name: 'Wells Fargo Center', city: 'Philadelphia', state: 'PA', country: 'USA', team_name: 'Philadelphia 76ers', capacity: 20478, year_built: 1996 },
  { name: 'Footprint Center', city: 'Phoenix', state: 'AZ', country: 'USA', team_name: 'Phoenix Suns', capacity: 17071, year_built: 1992 },
  { name: 'Moda Center', city: 'Portland', state: 'OR', country: 'USA', team_name: 'Portland Trail Blazers', capacity: 19441, year_built: 1995 },
  { name: 'Golden 1 Center', city: 'Sacramento', state: 'CA', country: 'USA', team_name: 'Sacramento Kings', capacity: 17608, year_built: 2016 },
  { name: 'Frost Bank Center', city: 'San Antonio', state: 'TX', country: 'USA', team_name: 'San Antonio Spurs', capacity: 18418, year_built: 2002 },
  { name: 'Scotiabank Arena', city: 'Toronto', state: 'ON', country: 'Canada', team_name: 'Toronto Raptors', capacity: 19800, year_built: 1999 },
  { name: 'Delta Center', city: 'Salt Lake City', state: 'UT', country: 'USA', team_name: 'Utah Jazz', capacity: 18306, year_built: 1991 },
  { name: 'Capital One Arena', city: 'Washington', state: 'DC', country: 'USA', team_name: 'Washington Wizards', capacity: 20356, year_built: 1997 },
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
  console.log('🏀 Fetching Wikipedia images for NBA arenas...\n');

  const results: Array<typeof NBA_ARENAS[0] & { image_url: string | null }> = [];

  for (let i = 0; i < NBA_ARENAS.length; i++) {
    const arena = NBA_ARENAS[i];
    console.log(`[${i + 1}/${NBA_ARENAS.length}] ${arena.name} (${arena.team_name})...`);
    
    const imageUrl = await findArenaImage(arena.name, arena.city);
    results.push({ ...arena, image_url: imageUrl });
    
    if (imageUrl) {
      console.log(`   ✓ Found image`);
    } else {
      console.log(`   ✗ No image found`);
    }
    await delay(300);
  }

  // Generate SQL
  const escape = (str: string) => str.replace(/'/g, "''");
  const values = results.map(a => {
    const imageUrl = a.image_url ? `'${escape(a.image_url)}'` : 'NULL';
    return `  ('${escape(a.name)}', '${escape(a.city)}', '${escape(a.state)}', '${escape(a.country)}', 'NBA', '${escape(a.team_name)}', ${a.capacity}, ${a.year_built}, 'DOME', ${imageUrl})`;
  });

  const sql = `
-- NBA Arena data with Wikipedia images
-- Generated on ${new Date().toISOString()}

INSERT INTO stadiums (name, city, state, country, sport, team_name, capacity, year_built, roof_type, image_url) VALUES
${values.join(',\n')}
ON CONFLICT DO NOTHING;
`;

  console.log('\n--- SQL OUTPUT ---\n');
  console.log(sql);
  
  // Also save to file
  fs.writeFileSync('supabase/seed-nba.sql', sql);
  console.log('\n💾 Saved to supabase/seed-nba.sql');
}

main().catch(console.error);

