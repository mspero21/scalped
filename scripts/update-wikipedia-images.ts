/**
 * Update stadium images in remote Supabase with Wikipedia URLs
 * Run: npx tsx scripts/update-wikipedia-images.ts
 */

import { createClient } from '@supabase/supabase-js';

// Load from environment or use local .env.local values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Stadium image mappings from seed-sportsdb.sql (Wikipedia URLs)
const stadiumImages: Record<string, string> = {
  // NFL
  'State Farm Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/State_Farm_Stadium_2022.jpg/960px-State_Farm_Stadium_2022.jpg',
  'Mercedes-Benz Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/2025-0120_CFP_NCG_Pre-Game_view_Press_Box.jpg/960px-2025-0120_CFP_NCG_Pre-Game_view_Press_Box.jpg',
  'M&T Bank Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/M%26T_Bank_Stadium_in_Baltimore.jpg/960px-M%26T_Bank_Stadium_in_Baltimore.jpg',
  'Highmark Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Highmark_Stadium_collage.jpg/960px-Highmark_Stadium_collage.jpg',
  'Bank of America Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Aerial_view_of_Bank_of_America_Stadium_in_Charlotte.jpg/960px-Aerial_view_of_Bank_of_America_Stadium_in_Charlotte.jpg',
  'Soldier Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Soldier_Field_S.jpg/960px-Soldier_Field_S.jpg',
  'Paycor Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Paul_Brown_Stadium_interior_2017.jpg/960px-Paul_Brown_Stadium_interior_2017.jpg',
  'Huntington Bank Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/FirstEnergy_Stadium_50_yardline_panorama.png/960px-FirstEnergy_Stadium_50_yardline_panorama.png',
  'AT&T Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Arlington_June_2020_4_%28AT%26T_Stadium%29.jpg/960px-Arlington_June_2020_4_%28AT%26T_Stadium%29.jpg',
  'Empower Field at Mile High': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Empower_Field_at_Mile_High_20241001.jpg/960px-Empower_Field_at_Mile_High_20241001.jpg',
  'Ford Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Detroit_December_2015_09_%28Ford_Field%29.jpg/960px-Detroit_December_2015_09_%28Ford_Field%29.jpg',
  'Lambeau Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Lambeau_Field_-_Green_Bay_Packers_Football_Stadium_-_Wisconsin.jpg/960px-Lambeau_Field_-_Green_Bay_Packers_Football_Stadium_-_Wisconsin.jpg',
  'NRG Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/NRG_Stadium_SBLI.jpg/960px-NRG_Stadium_SBLI.jpg',
  'Lucas Oil Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Aerial_view_of_Indianapolis%2C_Indiana%2C_with_a_focus_on_Lucas_Oil_Stadium%2C_highsm.40934.jpg/960px-Aerial_view_of_Indianapolis%2C_Indiana%2C_with_a_focus_on_Lucas_Oil_Stadium%2C_highsm.40934.jpg',
  'EverBank Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Everbank_Stadium_2024.jpg/960px-Everbank_Stadium_2024.jpg',
  'GEHA Field at Arrowhead Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Aerial_view_of_Arrowhead_Stadium_08-31-2013.jpg/960px-Aerial_view_of_Arrowhead_Stadium_08-31-2013.jpg',
  'Allegiant Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Allegiant_Stadium_%28cropped%29.jpg/960px-Allegiant_Stadium_%28cropped%29.jpg',
  'SoFi Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/SoFi_Stadium_2023.jpg/960px-SoFi_Stadium_2023.jpg',
  'Hard Rock Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Interior_of_updated_Hard_Rock_Stadium.jpg/960px-Interior_of_updated_Hard_Rock_Stadium.jpg',
  'U.S. Bank Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/U.S._Bank_Stadium_2021-09-23.jpg/960px-U.S._Bank_Stadium_2021-09-23.jpg',
  'Gillette Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Gillette_Stadium_%28Top_View%29.jpg/960px-Gillette_Stadium_%28Top_View%29.jpg',
  'Caesars Superdome': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/DHS_Agencies_Support_Super_Bowl_LIX_Security_February_2025_-_108.jpg/960px-DHS_Agencies_Support_Super_Bowl_LIX_Security_February_2025_-_108.jpg',
  'MetLife Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Metlife_stadium_%28Aerial_view%29.jpg/960px-Metlife_stadium_%28Aerial_view%29.jpg',
  'Lincoln Financial Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Lincoln_Financial_Field_%28Aerial_view%29.jpg/960px-Lincoln_Financial_Field_%28Aerial_view%29.jpg',
  'Acrisure Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Acrisure_Stadium_2024.jpg/960px-Acrisure_Stadium_2024.jpg',
  "Levi's Stadium": 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Levi%27s_Stadium_in_February_2016_prior_to_Super_Bowl_50_%2824398261729%29.jpg/960px-Levi%27s_Stadium_in_February_2016_prior_to_Super_Bowl_50_%2824398261729%29.jpg',
  'Lumen Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Qwest_Field_North.jpg/960px-Qwest_Field_North.jpg',
  'Raymond James Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Raymond_James_Stadium_Aerial.jpg/960px-Raymond_James_Stadium_Aerial.jpg',
  'Nissan Stadium Nashville': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Nissan_Stadium_2017.jpg/960px-Nissan_Stadium_2017.jpg',
  'Northwest Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Commanders_vs_Giants_%2853345178211%29.jpg/960px-Commanders_vs_Giants_%2853345178211%29.jpg',
  // NBA
  'State Farm Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/State_Farm_%28Philips%29_Arena%2C_Atlanta%2C_GA_%2846558861525%29_-_2019.jpg/960px-State_Farm_%28Philips%29_Arena%2C_Atlanta%2C_GA_%2846558861525%29_-_2019.jpg',
  'TD Garden': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/TD_Garden_%2854960947755%29.jpg/960px-TD_Garden_%2854960947755%29.jpg',
  'Barclays Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Barclays_Center_-_May_2_2025.jpg/960px-Barclays_Center_-_May_2_2025.jpg',
  'Spectrum Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Spectrum_Center_2018.jpg/960px-Spectrum_Center_2018.jpg',
  'United Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/United_Center_1.jpg/960px-United_Center_1.jpg',
  'Rocket Mortgage FieldHouse': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Rocket_Mortgage_FieldHouse_2022_%28cropped%29.png/960px-Rocket_Mortgage_FieldHouse_2022_%28cropped%29.png',
  'American Airlines Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/American_Airlines_Center_August_2015.jpg/960px-American_Airlines_Center_August_2015.jpg',
  'Ball Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Ball_Arena_exterior_2022.jpg/960px-Ball_Arena_exterior_2022.jpg',
  'Little Caesars Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Little_Caesars_Arena_panorama.jpg/960px-Little_Caesars_Arena_panorama.jpg',
  'Chase Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Chase_Center.jpg/960px-Chase_Center.jpg',
  'Toyota Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Toyota_Center_entr.jpg/960px-Toyota_Center_entr.jpg',
  'Gainbridge Fieldhouse': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Bankers_Life_Fieldhouse%2C_Indian%C3%A1polis%2C_Estados_Unidos%2C_2012-10-22%2C_DD_02.jpg/960px-Bankers_Life_Fieldhouse%2C_Indian%C3%A1polis%2C_Estados_Unidos%2C_2012-10-22%2C_DD_02.jpg',
  'Crypto.com Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Crypto.com_Arena_exterior_2023.jpg/960px-Crypto.com_Arena_exterior_2023.jpg',
  'FedExForum': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/FedExForum_at_night.jpg/960px-FedExForum_at_night.jpg',
  'Kaseya Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Kaseya_Center_Downtown_Miami_FL%2C_5_April_2024.jpg/960px-Kaseya_Center_Downtown_Miami_FL%2C_5_April_2024.jpg',
  'Fiserv Forum': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Milwaukee_July_2022_022_%28Fiserv_Forum%29.jpg/960px-Milwaukee_July_2022_022_%28Fiserv_Forum%29.jpg',
  'Target Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/TargetCenter.jpg/960px-TargetCenter.jpg',
  'Smoothie King Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/New_Orleans_Arena%2C_exterior_view%2C_10_January_2022_%28cropped%29.jpg/960px-New_Orleans_Arena%2C_exterior_view%2C_10_January_2022_%28cropped%29.jpg',
  'Madison Square Garden': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Madison_Square_Garden_%28MSG%29_-_Full_%2848124330357%29.jpg/960px-Madison_Square_Garden_%28MSG%29_-_Full_%2848124330357%29.jpg',
  'Paycom Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Paycom_Center_exterior_aerial_view.jpg/960px-Paycom_Center_exterior_aerial_view.jpg',
  'Amway Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Kia_Center_12-22-24.jpg/960px-Kia_Center_12-22-24.jpg',
  'Wells Fargo Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Wells_Fargo_Center_-_2019_OWL_Grand_Finals.jpg/960px-Wells_Fargo_Center_-_2019_OWL_Grand_Finals.jpg',
  'Footprint Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Footprint_Center_2022.jpg/960px-Footprint_Center_2022.jpg',
  'Moda Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Modacenter2019.jpg/960px-Modacenter2019.jpg',
  'Golden 1 Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Golden_1_Center_2017.jpg/960px-Golden_1_Center_2017.jpg',
  'Frost Bank Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Texasdd.JPG/960px-Texasdd.JPG',
  'Scotiabank Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Scotiabank_Arena_-_2018_%28cropped%29.jpg/960px-Scotiabank_Arena_-_2018_%28cropped%29.jpg',
  'Delta Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Delta_Center_2023.jpg/960px-Delta_Center_2023.jpg',
  'Capital One Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Capital_One_Arena_-_Washington%2C_D.C.jpg/960px-Capital_One_Arena_-_Washington%2C_D.C.jpg',
  // MLB
  'Chase Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Reserve_A-10_Warthogs_Flyover_2023_World_Series_%288099146%29.jpg/960px-Reserve_A-10_Warthogs_Flyover_2023_World_Series_%288099146%29.jpg',
  'Truist Park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Truist_Park_2025.jpg/960px-Truist_Park_2025.jpg',
  'Oriole Park at Camden Yards': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Camden_Yards.jpg/960px-Camden_Yards.jpg',
  'Fenway Park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/131023-F-PR861-033_Hanscom_participates_in_World_Series_pregame_events.jpg/960px-131023-F-PR861-033_Hanscom_participates_in_World_Series_pregame_events.jpg',
  'Wrigley Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Wrigley_Field_in_line_with_sign.jpg/960px-Wrigley_Field_in_line_with_sign.jpg',
  'Guaranteed Rate Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Chicago%2C_Illinois%2C_U.S._%282023%29_-_062.jpg/960px-Chicago%2C_Illinois%2C_U.S._%282023%29_-_062.jpg',
  'Great American Ball Park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/10Cincinnati_2015_%282%29.jpg/960px-10Cincinnati_2015_%282%29.jpg',
  'Progressive Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Cleveland_Guardians_vs._New_York_Yankees_on_Oct_17_2024_%2854102149292%29.jpg/960px-Cleveland_Guardians_vs._New_York_Yankees_on_Oct_17_2024_%2854102149292%29.jpg',
  'Coors Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Coors_Field_July_2015.jpg/960px-Coors_Field_July_2015.jpg',
  'Comerica Park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Detroit_Tigers_opening_game_at_Comerica_Park%2C_2007.jpg/960px-Detroit_Tigers_opening_game_at_Comerica_Park%2C_2007.jpg',
  'Minute Maid Park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Houston%2C_Texas_%282024%29_-_09.jpg/960px-Houston%2C_Texas_%282024%29_-_09.jpg',
  'Kauffman Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Kauffman2017.jpg/960px-Kauffman2017.jpg',
  'Angel Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Angelstadiummarch2019.jpg/960px-Angelstadiummarch2019.jpg',
  'Dodger Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Dodger_Stadium_and_Chavez_Ravine_far_view%2C_Chicago_Cubs_at_Los_Angeles_Dodgers%2C_%28April_12%2C_2025%29.jpg/960px-Dodger_Stadium_and_Chavez_Ravine_far_view%2C_Chicago_Cubs_at_Los_Angeles_Dodgers%2C_%28April_12%2C_2025%29.jpg',
  'loanDepot Park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/LOAN_DEPOT_PARK.jpg/960px-LOAN_DEPOT_PARK.jpg',
  'American Family Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Miller_Park_in_Milwaukee%2C_Wisconsin.jpg/960px-Miller_Park_in_Milwaukee%2C_Wisconsin.jpg',
  'Target Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Target_Field_Aerial.jpg/960px-Target_Field_Aerial.jpg',
  'Citi Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Citi_Field.svg/960px-Citi_Field.svg.png',
  'Yankee Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Yankee_Stadium_overhead_2010.jpg/960px-Yankee_Stadium_overhead_2010.jpg',
  'Oakland Coliseum': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Oakland_Coliseum_overhead_angle%2C_September_2024.jpg/960px-Oakland_Coliseum_overhead_angle%2C_September_2024.jpg',
  'Citizens Bank Park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Citizens_Bank_Park_2021.jpg/960px-Citizens_Bank_Park_2021.jpg',
  'PNC Park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Pittsburgh_Pirates_park_%28Unsplash%29.jpg/960px-Pittsburgh_Pirates_park_%28Unsplash%29.jpg',
  'Petco Park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Petco_Park_Padres_Game.jpg/960px-Petco_Park_Padres_Game.jpg',
  'Oracle Park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Oracle_Park_2021.jpg/960px-Oracle_Park_2021.jpg',
  'T-Mobile Park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/SafecoFieldTop.jpg/960px-SafecoFieldTop.jpg',
  'Busch Stadium': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Busch_Stadium_2022.jpg/960px-Busch_Stadium_2022.jpg',
  'Tropicana Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/PXL_20220528_205520913.jpg/960px-PXL_20220528_205520913.jpg',
  'Globe Life Field': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/GlobeLifeField2021.jpg/960px-GlobeLifeField2021.jpg',
  'Rogers Centre': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Rogers_Centre_%28500_Level%29_-_Toronto%2C_ON.jpg/960px-Rogers_Centre_%28500_Level%29_-_Toronto%2C_ON.jpg',
  'Nationals Park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Nationals_Park_8.16.19_-_7.jpg/960px-Nationals_Park_8.16.19_-_7.jpg',
  // NHL
  'Honda Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Honda_center_2021.jpg/960px-Honda_center_2021.jpg',
  'Mullett Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Mullett_Arena_South_Entrance.jpg/960px-Mullett_Arena_South_Entrance.jpg',
  'KeyBank Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/KeyBank_Center_side_view_from_Main_Street_at_Prime_Street%2C_Buffalo%2C_New_York_-_20210725.jpg/960px-KeyBank_Center_side_view_from_Main_Street_at_Prime_Street%2C_Buffalo%2C_New_York_-_20210725.jpg',
  'Scotiabank Saddledome': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/2020_Calgary_Saddledome.jpg/960px-2020_Calgary_Saddledome.jpg',
  'PNC Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Lenovo_Center_Side.jpg/960px-Lenovo_Center_Side.jpg',
  'Nationwide Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Nationwide_Arena_exterior.jpg/960px-Nationwide_Arena_exterior.jpg',
  'Rogers Place': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Rogers_Place%2C_Edmonton%2C_June_6%2C_2024.jpg/960px-Rogers_Place%2C_Edmonton%2C_June_6%2C_2024.jpg',
  'Amerant Bank Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/View_of_Amerant_Bank_Arena_from_Publix_Plaza_before_a_Florida_Panthers_game_during_the_2023-24_season..jpg/960px-View_of_Amerant_Bank_Arena_from_Publix_Plaza_before_a_Florida_Panthers_game_during_the_2023-24_season..jpg',
  'Xcel Energy Center': 'https://upload.wikimedia.org/wikipedia/commons/8/84/XcelEnergyCenteroverview.jpg',
  'Bell Centre': 'https://upload.wikimedia.org/wikipedia/commons/8/80/CentreBell.jpg',
  'Bridgestone Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Bridgestone_Arena_%28Northeast_corner%29.JPG/960px-Bridgestone_Arena_%28Northeast_corner%29.JPG',
  'Prudential Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/PrudentialCenter.MulberryCommons.Newark.2019.jpg/960px-PrudentialCenter.MulberryCommons.Newark.2019.jpg',
  'UBS Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Belmont_Park_td_%282021-12-19%29_017_-_UBS_Arena.jpg/960px-Belmont_Park_td_%282021-12-19%29_017_-_UBS_Arena.jpg',
  'Canadian Tire Centre': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Canadian_Tire_Centre_exterior_before_a_match_in_2022.jpg/960px-Canadian_Tire_Centre_exterior_before_a_match_in_2022.jpg',
  'PPG Paints Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/PPG_Paints_Arena_-_March_2017.jpg/960px-PPG_Paints_Arena_-_March_2017.jpg',
  'SAP Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/SAP_Center_%2816609288898%29.jpg/960px-SAP_Center_%2816609288898%29.jpg',
  'Climate Pledge Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Climate_Pledge_Arena_N.jpg/960px-Climate_Pledge_Arena_N.jpg',
  'Enterprise Center': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Scottrade_2015.jpg/960px-Scottrade_2015.jpg',
  'Amalie Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Amalie_Arena.jpg/960px-Amalie_Arena.jpg',
  'Rogers Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Rogers_Arena.jpg/960px-Rogers_Arena.jpg',
  'T-Mobile Arena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/T_Mobile_Arena_The_Strip_Las_Vegas_%2829798246202%29.jpg/960px-T_Mobile_Arena_The_Strip_Las_Vegas_%2829798246202%29.jpg',
  'Canada Life Centre': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/MTS_CENTRE_b.jpg/960px-MTS_CENTRE_b.jpg',
};

async function main() {
  console.log('🖼️  Updating stadium images with Wikipedia URLs...\n');

  let updated = 0;
  let failed = 0;

  for (const [name, imageUrl] of Object.entries(stadiumImages)) {
    const { error, count } = await supabase
      .from('stadiums')
      .update({ image_url: imageUrl })
      .eq('name', name);

    if (error) {
      console.log(`❌ ${name}: ${error.message}`);
      failed++;
    } else {
      console.log(`✅ ${name}`);
      updated++;
    }
  }

  console.log(`\n✅ Done! Updated: ${updated}, Failed: ${failed}`);
}

main().catch(console.error);

