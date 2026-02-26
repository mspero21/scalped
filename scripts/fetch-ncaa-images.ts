/**
 * Fetch Wikipedia images for NCAA and MLS stadiums, with Claude vision verification
 * Usage: npx tsx scripts/fetch-ncaa-images.ts
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const HEADERS = { 'User-Agent': 'ScalpedApp/1.0 (stadium-image-fetcher)' };

function upscaleThumb(url: string, targetSize = 960): string {
  return url.replace(/\/\d+px-/, `/${targetSize}px-`);
}

async function fetchWikipediaImage(articleTitle: string): Promise<string | null> {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(articleTitle)}`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.thumbnail?.source) return upscaleThumb(data.thumbnail.source);
    return null;
  } catch { return null; }
}

async function searchWikimediaCommons(searchTerm: string, thumbSize: number = 960): Promise<string | null> {
  const url = `https://commons.wikimedia.org/w/api.php?prop=pageimages|info&gsrnamespace=6&pilimit=max&pithumbsize=${thumbSize}&action=query&inprop=url&redirects=1&format=json&generator=search&gsrsearch=intitle:${encodeURIComponent(searchTerm)}&gsrlimit=5`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    if (!response.ok) return null;
    const data = await response.json();
    const pages = Object.values(data.query?.pages || {}) as any[];
    for (const page of pages) {
      if (page.thumbnail?.source) return page.thumbnail.source;
    }
    return null;
  } catch { return null; }
}

async function findStadiumImage(stadiumName: string, teamName: string, city: string): Promise<string | null> {
  // 1. Try exact article title (REST API, most reliable)
  let imageUrl = await fetchWikipediaImage(stadiumName);
  if (imageUrl) return imageUrl;
  await delay(150);

  // 2. Try team name + "stadium" (e.g. some arenas are redirected under the team name)
  const teamShort = teamName.split(' ').slice(0, 2).join(' ');
  imageUrl = await fetchWikipediaImage(`${teamShort} stadium`);
  if (imageUrl) return imageUrl;
  await delay(150);

  // 3. Wikimedia Commons full-text search
  imageUrl = await searchWikimediaCommons(`${stadiumName}`);
  if (imageUrl) return imageUrl;
  await delay(150);

  // 4. Commons search with city
  imageUrl = await searchWikimediaCommons(`${stadiumName} ${city}`);
  return imageUrl;
}

function getMediaType(url: string): 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif' {
  const lower = url.toLowerCase();
  if (lower.includes('.png')) return 'image/png';
  if (lower.includes('.webp')) return 'image/webp';
  if (lower.includes('.gif')) return 'image/gif';
  return 'image/jpeg';
}

async function verifyIsStadiumImage(imageUrl: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return false;
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const mediaType = getMediaType(imageUrl);

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 10,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 },
            },
            {
              type: 'text',
              text: 'Is this an exterior or interior photograph of a sports stadium, arena, or sports venue? Answer only YES or NO.',
            },
          ],
        },
      ],
    });

    const text = (message.content[0] as { type: string; text: string }).text?.trim().toUpperCase();
    return text === 'YES';
  } catch (err) {
    console.log(`     ⚠️  Vision check error: ${err}`);
    return false;
  }
}

async function main() {
  console.log('🏈🏀⚽ Fetching Wikipedia images for NCAA and MLS venues...\n');

  const { data: stadiums, error } = await supabase
    .from('stadiums')
    .select('id, name, team_name, city, sport')
    .in('sport', ['NCAA_FOOTBALL', 'NCAA_BASKETBALL', 'MLS'])
    .is('image_url', null)
    .order('name');

  if (error) {
    console.error('Error fetching stadiums:', error);
    return;
  }

  console.log(`Found ${stadiums.length} venues without images\n`);

  let updated = 0;
  let rejected = 0;
  let failed = 0;

  for (let i = 0; i < stadiums.length; i++) {
    const stadium = stadiums[i];
    const sportEmoji = stadium.sport === 'NCAA_FOOTBALL' ? '🏈' : stadium.sport === 'NCAA_BASKETBALL' ? '🏀' : '⚽';
    console.log(`[${i + 1}/${stadiums.length}] ${sportEmoji} ${stadium.name} (${stadium.team_name})...`);

    const imageUrl = await findStadiumImage(stadium.name, stadium.team_name, stadium.city);

    if (imageUrl) {
      console.log(`     🔍 Verifying image with Claude...`);
      const isStadium = await verifyIsStadiumImage(imageUrl);

      if (isStadium) {
        const { error: updateError } = await supabase
          .from('stadiums')
          .update({ image_url: imageUrl })
          .eq('id', stadium.id);

        if (updateError) {
          console.log(`     ❌ Failed to save: ${updateError.message}`);
          failed++;
        } else {
          console.log(`     ✅ Verified and saved`);
          updated++;
        }
      } else {
        console.log(`     🚫 Rejected by AI (not a stadium)`);
        rejected++;
      }
    } else {
      console.log(`     ⚠️  No image found`);
      failed++;
    }

    await delay(200);
  }

  console.log(`\n✅ Done!  Saved: ${updated}  Rejected by AI: ${rejected}  No image found: ${failed}`);
}

main().catch(console.error);
