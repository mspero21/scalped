/**
 * Fetch Wikipedia images for NCAA stadiums and arenas
 * Usage: npx tsx scripts/fetch-ncaa-images.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

async function findStadiumImage(stadiumName: string, teamName: string, city: string): Promise<string | null> {
  // Try exact stadium name
  let imageUrl = await fetchWikipediaImage(stadiumName);
  if (imageUrl) return imageUrl;
  await delay(150);

  // Try with (stadium) suffix
  imageUrl = await fetchWikipediaImage(`${stadiumName} (stadium)`);
  if (imageUrl) return imageUrl;
  await delay(150);

  // Try with (arena) suffix for basketball
  imageUrl = await fetchWikipediaImage(`${stadiumName} (arena)`);
  if (imageUrl) return imageUrl;
  await delay(150);

  // Try Wikimedia Commons search
  imageUrl = await searchWikimediaCommons(`${stadiumName} stadium`);
  if (imageUrl) return imageUrl;
  await delay(150);

  // Try with team name
  imageUrl = await searchWikimediaCommons(`${teamName} stadium`);
  if (imageUrl) return imageUrl;
  await delay(150);

  // Try city + stadium name
  imageUrl = await searchWikimediaCommons(`${stadiumName} ${city}`);
  return imageUrl;
}

async function main() {
  console.log('🏈🏀 Fetching Wikipedia images for NCAA venues...\n');

  // Get all NCAA stadiums without images
  const { data: stadiums, error } = await supabase
    .from('stadiums')
    .select('id, name, team_name, city, sport')
    .in('sport', ['NCAA_FOOTBALL', 'NCAA_BASKETBALL'])
    .is('image_url', null)
    .order('name');

  if (error) {
    console.error('Error fetching stadiums:', error);
    return;
  }

  console.log(`Found ${stadiums.length} NCAA venues without images\n`);

  let updated = 0;
  let failed = 0;

  for (let i = 0; i < stadiums.length; i++) {
    const stadium = stadiums[i];
    const sportEmoji = stadium.sport === 'NCAA_FOOTBALL' ? '🏈' : '🏀';
    console.log(`[${i + 1}/${stadiums.length}] ${sportEmoji} ${stadium.name} (${stadium.team_name})...`);

    const imageUrl = await findStadiumImage(stadium.name, stadium.team_name, stadium.city);

    if (imageUrl) {
      const { error: updateError } = await supabase
        .from('stadiums')
        .update({ image_url: imageUrl })
        .eq('id', stadium.id);

      if (updateError) {
        console.log(`   ❌ Failed to update: ${updateError.message}`);
        failed++;
      } else {
        console.log(`   ✅ Found and saved image`);
        updated++;
      }
    } else {
      console.log(`   ⚠️  No image found`);
      failed++;
    }

    await delay(200);
  }

  console.log(`\n✅ Done! Updated: ${updated}, No image found: ${failed}`);
}

main().catch(console.error);
