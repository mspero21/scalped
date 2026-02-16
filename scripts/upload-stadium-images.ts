/**
 * Script to download stadium images from Wikipedia and upload to Supabase Storage
 * This creates local copies in Supabase for faster loading and multiple image support
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Supabase client with service role for admin access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Download image from URL and return as Buffer
async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error(`Failed to download ${url}:`, error);
    return null;
  }
}

// Get content type from URL
function getContentType(url: string): string {
  const ext = path.extname(new URL(url).pathname).toLowerCase();
  const types: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
  };
  return types[ext] || 'image/jpeg';
}

// Generate a clean filename from stadium name
function generateFilename(stadiumName: string, index: number = 0): string {
  const clean = stadiumName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return index === 0 ? `${clean}.jpg` : `${clean}-${index}.jpg`;
}

interface Stadium {
  id: string;
  name: string;
  image_url: string | null;
}

async function main() {
  console.log('🖼️  Stadium Image Upload to Supabase Storage');
  console.log('=============================================\n');

  // Fetch all stadiums with image URLs
  const { data: stadiums, error } = await supabase
    .from('stadiums')
    .select('id, name, image_url')
    .not('image_url', 'is', null);

  if (error) {
    console.error('Failed to fetch stadiums:', error);
    process.exit(1);
  }

  console.log(`Found ${stadiums?.length || 0} stadiums with images\n`);

  let uploaded = 0;
  let failed = 0;

  for (const stadium of (stadiums as Stadium[]) || []) {
    if (!stadium.image_url) continue;

    console.log(`[${uploaded + failed + 1}/${stadiums?.length}] ${stadium.name}...`);

    // Download the image
    const imageBuffer = await downloadImage(stadium.image_url);
    if (!imageBuffer) {
      console.log('   ✗ Failed to download');
      failed++;
      await delay(200);
      continue;
    }

    // Upload to Supabase Storage
    const filename = generateFilename(stadium.name);
    const storagePath = `stadiums/${filename}`;
    const contentType = getContentType(stadium.image_url);

    const { error: uploadError } = await supabase.storage
      .from('stadium-images')
      .upload(storagePath, imageBuffer, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.log(`   ✗ Upload failed: ${uploadError.message}`);
      failed++;
      await delay(200);
      continue;
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('stadium-images')
      .getPublicUrl(storagePath);

    // Insert into stadium_images table
    const { error: insertError } = await supabase
      .from('stadium_images')
      .upsert({
        stadium_id: stadium.id,
        image_url: urlData.publicUrl,
        storage_path: storagePath,
        source: 'wikipedia',
        source_url: stadium.image_url,
        is_primary: true,
        display_order: 0,
      }, {
        onConflict: 'stadium_id,is_primary',
        ignoreDuplicates: false,
      });

    if (insertError) {
      // Try insert without conflict handling
      await supabase.from('stadium_images').insert({
        stadium_id: stadium.id,
        image_url: urlData.publicUrl,
        storage_path: storagePath,
        source: 'wikipedia',
        source_url: stadium.image_url,
        is_primary: true,
        display_order: 0,
      });
    }

    // Update the stadium's main image_url to use Supabase Storage
    await supabase
      .from('stadiums')
      .update({ image_url: urlData.publicUrl })
      .eq('id', stadium.id);

    console.log('   ✓ Uploaded');
    uploaded++;
    await delay(300); // Rate limiting
  }

  console.log(`\n✅ Complete! Uploaded ${uploaded}, Failed ${failed}`);
}

main().catch(console.error);

