/**
 * Fetch multiple images from Wikimedia Commons for each stadium
 * and populate the stadium_images table
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  console.error('Run with: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/fetch-multiple-stadium-images.ts');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function progressBar(current: number, total: number, width: number = 30): string {
  const percent = current / total;
  const filled = Math.round(width * percent);
  const empty = width - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  return `[${bar}] ${current}/${total} (${Math.round(percent * 100)}%)`;
}

interface WikimediaImage {
  title: string;
  url: string;
  thumbUrl: string;
  descriptionUrl: string;
}

// Search Wikimedia Commons for multiple images
async function searchWikimediaCommons(
  searchTerm: string,
  limit: number = 5,
  thumbSize: number = 960
): Promise<WikimediaImage[]> {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=${limit}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=${thumbSize}&format=json&origin=*`;

  try {
    const response = await fetch(url);
    if (!response.ok) return [];

    const data = await response.json();
    if (!data.query?.pages) return [];

    const images: WikimediaImage[] = [];
    for (const page of Object.values(data.query.pages) as any[]) {
      if (page.imageinfo?.[0]) {
        const info = page.imageinfo[0];
        // Skip SVG files and small images
        if (info.url?.endsWith('.svg') || info.thumbwidth < 400) continue;
        
        images.push({
          title: page.title?.replace('File:', '') || '',
          url: info.url,
          thumbUrl: info.thumburl || info.url,
          descriptionUrl: info.descriptionurl,
        });
      }
    }
    return images;
  } catch (error) {
    console.error(`Error searching Wikimedia: ${error}`);
    return [];
  }
}

async function main() {
  console.log('🖼️  Fetching multiple images for stadiums from Wikimedia Commons...\n');

  // First, ensure the stadium_images table exists by trying to query it
  const { error: tableCheckError } = await supabase
    .from('stadium_images')
    .select('id')
    .limit(1);

  if (tableCheckError?.code === 'PGRST116' || tableCheckError?.message?.includes('does not exist')) {
    console.error('❌ The stadium_images table does not exist in the remote database.');
    console.error('   Please run the migration in supabase/migrations/005_stadium_images_storage.sql');
    console.error('   You can do this via the Supabase Dashboard SQL Editor.');
    process.exit(1);
  }

  // Fetch all stadiums
  const { data: stadiums, error: fetchError } = await supabase
    .from('stadiums')
    .select('id, name, city, team_name, sport')
    .order('name');

  if (fetchError || !stadiums) {
    console.error('Failed to fetch stadiums:', fetchError?.message);
    process.exit(1);
  }

  console.log(`Found ${stadiums.length} stadiums to process\n`);

  let totalImages = 0;
  let stadiumsProcessed = 0;

  for (let i = 0; i < stadiums.length; i++) {
    const stadium = stadiums[i];

    // Clear line and show progress
    process.stdout.write(`\r${progressBar(i + 1, stadiums.length)} ${stadium.name.padEnd(35).slice(0, 35)}`);

    // Check if stadium already has images (resume support)
    const { data: existingImages } = await supabase
      .from('stadium_images')
      .select('id')
      .eq('stadium_id', stadium.id)
      .limit(1);

    if (existingImages && existingImages.length > 0) {
      totalImages += 1; // Count as processed
      stadiumsProcessed++;
      continue; // Skip - already has images
    }

    // Search with multiple terms to get variety
    const searchTerms = [
      `${stadium.name} stadium`,
      `${stadium.name} arena`,
      `${stadium.name} ${stadium.city}`,
    ];

    const allImages: WikimediaImage[] = [];
    const seenUrls = new Set<string>();

    for (const term of searchTerms) {
      const images = await searchWikimediaCommons(term, 4);
      for (const img of images) {
        if (!seenUrls.has(img.thumbUrl)) {
          seenUrls.add(img.thumbUrl);
          allImages.push(img);
        }
      }
      await delay(200); // Rate limiting
    }

    if (allImages.length === 0) {
      continue;
    }

    // Limit to 6 images per stadium
    const imagesToInsert = allImages.slice(0, 6);

    // Delete existing images for this stadium first
    await supabase
      .from('stadium_images')
      .delete()
      .eq('stadium_id', stadium.id);

    // Insert new images into stadium_images table
    const records = imagesToInsert.map((img, idx) => ({
      stadium_id: stadium.id,
      image_url: img.thumbUrl,
      caption: img.title.replace(/_/g, ' ').replace(/\.[^.]+$/, ''),
      source: 'wikimedia',
      source_url: img.descriptionUrl,
      is_primary: idx === 0,
      display_order: idx,
    }));

    const { error: insertError } = await supabase
      .from('stadium_images')
      .insert(records);

    if (!insertError) {
      totalImages += imagesToInsert.length;
      stadiumsProcessed++;
    }

    await delay(300); // Rate limiting between stadiums
  }

  console.log(`\n\n✅ Done! Added ${totalImages} images for ${stadiumsProcessed} stadiums`);
}

main().catch(console.error);

