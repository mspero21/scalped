/**
 * Script to fetch stadium images from Wikipedia/Wikimedia Commons
 * These images are free to use under Creative Commons licenses
 */

import * as fs from 'fs';

// Delay helper to respect API rate limits
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface WikipediaPageImage {
  source: string;
  width: number;
  height: number;
}

interface WikipediaPage {
  pageid: number;
  title: string;
  thumbnail?: WikipediaPageImage;
  original?: WikipediaPageImage;
}

interface WikipediaResponse {
  query?: {
    pages?: Record<string, WikipediaPage>;
  };
}

// Fetch main image from Wikipedia article
async function fetchWikipediaImage(
  articleTitle: string,
  thumbSize: number = 800
): Promise<string | null> {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
    articleTitle
  )}&prop=pageimages&format=json&pithumbsize=${thumbSize}&redirects=&origin=*`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const data: WikipediaResponse = await response.json();
    if (!data.query?.pages) return null;

    const pages = Object.values(data.query.pages);
    for (const page of pages) {
      if (page.thumbnail?.source) {
        return page.thumbnail.source;
      }
    }
    return null;
  } catch (error) {
    console.error(`Error fetching Wikipedia image for ${articleTitle}:`, error);
    return null;
  }
}

// Search Wikimedia Commons for stadium images
async function searchWikimediaCommons(
  searchTerm: string,
  thumbSize: number = 800
): Promise<string | null> {
  const url = `https://commons.wikimedia.org/w/api.php?prop=pageimages|info&gsrnamespace=6&pilimit=max&pithumbsize=${thumbSize}&action=query&inprop=url&redirects=&format=json&generator=search&gsrsearch=intitle:${encodeURIComponent(
    searchTerm
  )}&gsrlimit=5&origin=*`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const data: WikipediaResponse = await response.json();
    if (!data.query?.pages) return null;

    const pages = Object.values(data.query.pages);
    // Get the first image with a thumbnail
    for (const page of pages) {
      if (page.thumbnail?.source) {
        return page.thumbnail.source;
      }
    }
    return null;
  } catch (error) {
    console.error(`Error searching Wikimedia Commons for ${searchTerm}:`, error);
    return null;
  }
}

// Try multiple strategies to find a stadium image
async function findStadiumImage(stadiumName: string, city: string): Promise<string | null> {
  // Strategy 1: Try Wikipedia article with exact stadium name
  let imageUrl = await fetchWikipediaImage(stadiumName);
  if (imageUrl) return imageUrl;
  await delay(200);

  // Strategy 2: Try stadium name with "(stadium)" suffix
  imageUrl = await fetchWikipediaImage(`${stadiumName} (stadium)`);
  if (imageUrl) return imageUrl;
  await delay(200);

  // Strategy 3: Search Wikimedia Commons
  imageUrl = await searchWikimediaCommons(`${stadiumName} stadium`);
  if (imageUrl) return imageUrl;
  await delay(200);

  // Strategy 4: Try with city name
  imageUrl = await searchWikimediaCommons(`${stadiumName} ${city}`);
  if (imageUrl) return imageUrl;

  return null;
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
  sportsdb_venue_id?: string;
  league?: string;
}

async function main() {
  console.log('📸 Wikipedia/Wikimedia Commons Stadium Image Import');
  console.log('===================================================\n');

  // Read existing stadium data
  const venuesPath = 'supabase/venues-sportsdb.json';
  if (!fs.existsSync(venuesPath)) {
    console.error(`❌ File not found: ${venuesPath}`);
    console.log('Please run import-sportsdb-venues.ts first to generate venue data.');
    process.exit(1);
  }

  const stadiums: StadiumRecord[] = JSON.parse(fs.readFileSync(venuesPath, 'utf-8'));
  console.log(`Found ${stadiums.length} stadiums to process\n`);

  let updated = 0;
  let failed = 0;

  for (let i = 0; i < stadiums.length; i++) {
    const stadium = stadiums[i];
    console.log(`[${i + 1}/${stadiums.length}] ${stadium.name}...`);

    const imageUrl = await findStadiumImage(stadium.name, stadium.city);
    
    if (imageUrl) {
      stadium.image_url = imageUrl;
      console.log(`   ✓ Found image`);
      updated++;
    } else {
      console.log(`   ✗ No image found`);
      failed++;
    }

    // Rate limiting - be nice to Wikipedia
    await delay(300);
  }

  // Save updated JSON data
  fs.writeFileSync(venuesPath, JSON.stringify(stadiums, null, 2));

  // Generate full SQL seed file
  const escape = (str: string) => str.replace(/'/g, "''");
  const values = stadiums.map(s => {
    const imageUrl = s.image_url ? `'${escape(s.image_url)}'` : 'NULL';
    return `  ('${escape(s.name)}', '${escape(s.city)}', '${escape(s.state)}', '${escape(s.country)}', '${s.sport}', '${escape(s.team_name)}', ${s.capacity}, ${s.year_built}, '${s.roof_type}', ${imageUrl})`;
  });

  const seedSql = `-- Auto-generated venue data with Wikipedia images
-- Generated on ${new Date().toISOString()}
-- Total venues: ${stadiums.length}

INSERT INTO stadiums (name, city, state, country, sport, team_name, capacity, year_built, roof_type, image_url) VALUES
${values.join(',\n')}
ON CONFLICT DO NOTHING;
`;

  const seedPath = 'supabase/seed-sportsdb.sql';
  fs.writeFileSync(seedPath, seedSql);

  console.log(`\n✅ Complete! Updated ${updated} stadiums, ${failed} without images`);
  console.log(`JSON saved to ${venuesPath}`);
  console.log(`SQL seed saved to ${seedPath}`);
}

main().catch(console.error);

