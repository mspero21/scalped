require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sqlFile = fs.readFileSync('supabase/migrations/009_populate_stadium_coordinates.sql', 'utf8');
const updates = sqlFile.split('\n').filter(line => line.startsWith('UPDATE'));

console.log(`Found ${updates.length} UPDATE statements`);

(async () => {
  let success = 0;
  let failed = 0;
  
  for (const update of updates) {
    // Parse the UPDATE statement
    const latMatch = update.match(/latitude = ([-\d.]+)/);
    const lngMatch = update.match(/longitude = ([-\d.]+)/);
    const idMatch = update.match(/id = '([^']+)'/);
    
    if (latMatch && lngMatch && idMatch) {
      const { error } = await supabase
        .from('stadiums')
        .update({ latitude: parseFloat(latMatch[1]), longitude: parseFloat(lngMatch[1]) })
        .eq('id', idMatch[1]);
      
      if (error) {
        console.error(`Failed: ${error.message}`);
        failed++;
      } else {
        success++;
        if (success % 20 === 0) console.log(`Progress: ${success}/${updates.length}`);
      }
    }
  }
  
  console.log(`\nDone! ✅ ${success} succeeded, ❌ ${failed} failed`);
})();
