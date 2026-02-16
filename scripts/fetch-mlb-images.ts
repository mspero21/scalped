/**
 * Fetch Wikipedia images for MLB stadiums
 * Usage: npx ts-node scripts/fetch-mlb-images.ts
 */

import * as fs from 'fs';

const MLB_STADIUMS = [
  { name: 'Chase Field', city: 'Phoenix', state: 'AZ', country: 'USA', team_name: 'Arizona Diamondbacks', capacity: 48519, year_built: 1998 },
  { name: 'Truist Park', city: 'Atlanta', state: 'GA', country: 'USA', team_name: 'Atlanta Braves', capacity: 41084, year_built: 2017 },
  { name: 'Oriole Park at Camden Yards', city: 'Baltimore', state: 'MD', country: 'USA', team_name: 'Baltimore Orioles', capacity: 45971, year_built: 1992 },
  { name: 'Fenway Park', city: 'Boston', state: 'MA', country: 'USA', team_name: 'Boston Red Sox', capacity: 37755, year_built: 1912 },
  { name: 'Wrigley Field', city: 'Chicago', state: 'IL', country: 'USA', team_name: 'Chicago Cubs', capacity: 41649, year_built: 1914 },
  { name: 'Guaranteed Rate Field', city: 'Chicago', state: 'IL', country: 'USA', team_name: 'Chicago White Sox', capacity: 40615, year_built: 1991 },
  { name: 'Great American Ball Park', city: 'Cincinnati', state: 'OH', country: 'USA', team_name: 'Cincinnati Reds', capacity: 42319, year_built: 2003 },
  { name: 'Progressive Field', city: 'Cleveland', state: 'OH', country: 'USA', team_name: 'Cleveland Guardians', capacity: 34788, year_built: 1994 },
  { name: 'Coors Field', city: 'Denver', state: 'CO', country: 'USA', team_name: 'Colorado Rockies', capacity: 50144, year_built: 1995 },
  { name: 'Comerica Park', city: 'Detroit', state: 'MI', country: 'USA', team_name: 'Detroit Tigers', capacity: 41083, year_built: 2000 },
  { name: 'Minute Maid Park', city: 'Houston', state: 'TX', country: 'USA', team_name: 'Houston Astros', capacity: 41168, year_built: 2000 },
  { name: 'Kauffman Stadium', city: 'Kansas City', state: 'MO', country: 'USA', team_name: 'Kansas City Royals', capacity: 37903, year_built: 1973 },
  { name: 'Angel Stadium', city: 'Anaheim', state: 'CA', country: 'USA', team_name: 'Los Angeles Angels', capacity: 45517, year_built: 1966 },
  { name: 'Dodger Stadium', city: 'Los Angeles', state: 'CA', country: 'USA', team_name: 'Los Angeles Dodgers', capacity: 56000, year_built: 1962 },
  { name: 'loanDepot Park', city: 'Miami', state: 'FL', country: 'USA', team_name: 'Miami Marlins', capacity: 36742, year_built: 2012 },
  { name: 'American Family Field', city: 'Milwaukee', state: 'WI', country: 'USA', team_name: 'Milwaukee Brewers', capacity: 41900, year_built: 2001 },
  { name: 'Target Field', city: 'Minneapolis', state: 'MN', country: 'USA', team_name: 'Minnesota Twins', capacity: 38544, year_built: 2010 },
  { name: 'Citi Field', city: 'New York', state: 'NY', country: 'USA', team_name: 'New York Mets', capacity: 41922, year_built: 2009 },
  { name: 'Yankee Stadium', city: 'Bronx', state: 'NY', country: 'USA', team_name: 'New York Yankees', capacity: 46537, year_built: 2009 },
  { name: 'Oakland Coliseum', city: 'Oakland', state: 'CA', country: 'USA', team_name: 'Oakland Athletics', capacity: 46847, year_built: 1966 },
  { name: 'Citizens Bank Park', city: 'Philadelphia', state: 'PA', country: 'USA', team_name: 'Philadelphia Phillies', capacity: 42792, year_built: 2004 },
  { name: 'PNC Park', city: 'Pittsburgh', state: 'PA', country: 'USA', team_name: 'Pittsburgh Pirates', capacity: 38362, year_built: 2001 },
  { name: 'Petco Park', city: 'San Diego', state: 'CA', country: 'USA', team_name: 'San Diego Padres', capacity: 40209, year_built: 2004 },
  { name: 'Oracle Park', city: 'San Francisco', state: 'CA', country: 'USA', team_name: 'San Francisco Giants', capacity: 41915, year_built: 2000 },
  { name: 'T-Mobile Park', city: 'Seattle', state: 'WA', country: 'USA', team_name: 'Seattle Mariners', capacity: 47929, year_built: 1999 },
  { name: 'Busch Stadium', city: 'St. Louis', state: 'MO', country: 'USA', team_name: 'St. Louis Cardinals', capacity: 45538, year_built: 2006 },
  { name: 'Tropicana Field', city: 'St. Petersburg', state: 'FL', country: 'USA', team_name: 'Tampa Bay Rays', capacity: 25000, year_built: 1990 },
  { name: 'Globe Life Field', city: 'Arlington', state: 'TX', country: 'USA', team_name: 'Texas Rangers', capacity: 40300, year_built: 2020 },
  { name: 'Rogers Centre', city: 'Toronto', state: 'ON', country: 'Canada', team_name: 'Toronto Blue Jays', capacity: 49282, year_built: 1989 },
  { name: 'Nationals Park', city: 'Washington', state: 'DC', country: 'USA', team_name: 'Washington Nationals', capacity: 41339, year_built: 2008 },
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

async function findStadiumImage(stadiumName: string, city: string): Promise<string | null> {
  let imageUrl = await fetchWikipediaImage(stadiumName);
  if (imageUrl) return imageUrl;
  await delay(200);
  imageUrl = await fetchWikipediaImage(`${stadiumName} (stadium)`);
  if (imageUrl) return imageUrl;
  await delay(200);
  imageUrl = await searchWikimediaCommons(`${stadiumName} baseball`);
  if (imageUrl) return imageUrl;
  await delay(200);
  imageUrl = await searchWikimediaCommons(`${stadiumName} ${city}`);
  return imageUrl;
}

async function main() {
  console.log('⚾ Fetching Wikipedia images for MLB stadiums...\n');
  const results: Array<typeof MLB_STADIUMS[0] & { image_url: string | null }> = [];

  for (let i = 0; i < MLB_STADIUMS.length; i++) {
    const stadium = MLB_STADIUMS[i];
    console.log(`[${i + 1}/${MLB_STADIUMS.length}] ${stadium.name} (${stadium.team_name})...`);
    const imageUrl = await findStadiumImage(stadium.name, stadium.city);
    results.push({ ...stadium, image_url: imageUrl });
    console.log(imageUrl ? `   ✓ Found image` : `   ✗ No image found`);
    await delay(300);
  }

  const escape = (str: string) => str.replace(/'/g, "''");
  const values = results.map(s => {
    const imageUrl = s.image_url ? `'${escape(s.image_url)}'` : 'NULL';
    return `  ('${escape(s.name)}', '${escape(s.city)}', '${escape(s.state)}', '${escape(s.country)}', 'MLB', '${escape(s.team_name)}', ${s.capacity}, ${s.year_built}, 'OPEN', ${imageUrl})`;
  });

  const sql = `-- MLB Stadium data with Wikipedia images\n-- Generated on ${new Date().toISOString()}\n\nINSERT INTO stadiums (name, city, state, country, sport, team_name, capacity, year_built, roof_type, image_url) VALUES\n${values.join(',\n')}\nON CONFLICT DO NOTHING;\n`;

  console.log('\n--- SQL OUTPUT ---\n');
  console.log(sql);
  fs.writeFileSync('supabase/seed-mlb.sql', sql);
  console.log('\n💾 Saved to supabase/seed-mlb.sql');
}

main().catch(console.error);

