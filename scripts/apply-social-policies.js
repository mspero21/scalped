/**
 * Script to apply social feed RLS policies to Supabase database
 * Run with: node scripts/apply-social-policies.js
 */

const fs = require('fs');
const path = require('path');

// Read the migration file
const migrationPath = path.join(__dirname, '../supabase/migrations/008_social_feed_policies.sql');
const sql = fs.readFileSync(migrationPath, 'utf8');

console.log('📝 Social Feed RLS Policies Migration\n');
console.log('SQL to execute:');
console.log('═'.repeat(80));
console.log(sql);
console.log('═'.repeat(80));
console.log('\n📋 Instructions:');
console.log('1. Copy the SQL above');
console.log('2. Open Supabase SQL Editor:');
console.log('   🔗 https://supabase.com/dashboard/project/qihstshxnzejbbkrlarr/sql/new');
console.log('3. Paste and run the SQL');
console.log('4. Once applied, the feed will show activity from followed users!\n');
