-- Seed stadium_images table with multiple images per stadium
-- Uses the existing image_url from stadiums table as primary, adds additional views
-- Run with: cat supabase/seed-stadium-images.sql | docker exec -i $(docker ps -qf "name=supabase_db") psql -U postgres

-- Helper: Insert primary image from existing stadium image_url for all NFL stadiums
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, image_url, name || ' - Main View', 'wikipedia', true, 0
FROM stadiums WHERE sport = 'NFL' AND image_url IS NOT NULL;

-- AT&T Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Cowboys_Stadium_interior.jpg/1280px-Cowboys_Stadium_interior.jpg',
'Interior during game day', 'wikipedia', false, 1 FROM stadiums WHERE name = 'AT&T Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Cowboys_stadium_outside.JPG/1280px-Cowboys_stadium_outside.JPG',
'Exterior entrance', 'wikipedia', false, 2 FROM stadiums WHERE name = 'AT&T Stadium';

-- SoFi Stadium additional images (both Rams and Chargers entries)
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/SoFi_Stadium_Rams_vs._Cowboys_%2851610705004%29.jpg/1280px-SoFi_Stadium_Rams_vs._Cowboys_%2851610705004%29.jpg',
'Game day atmosphere', 'wikipedia', false, 1 FROM stadiums WHERE name = 'SoFi Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/SoFi_Stadium_and_YouTube_Theater_Inglewood_California.jpg/1280px-SoFi_Stadium_and_YouTube_Theater_Inglewood_California.jpg',
'Aerial with YouTube Theater', 'wikipedia', false, 2 FROM stadiums WHERE name = 'SoFi Stadium';

-- Lambeau Field additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Lambeau_Field_%2836244503830%29.jpg/1280px-Lambeau_Field_%2836244503830%29.jpg',
'Historic Frozen Tundra', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Lambeau Field';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Lambeau_Field_game.jpg/1280px-Lambeau_Field_game.jpg',
'Game day crowd', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Lambeau Field';

-- Mercedes-Benz Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Mercedes-Benz_Stadium%2C_October_2017.jpg/1280px-Mercedes-Benz_Stadium%2C_October_2017.jpg',
'Exterior at dusk', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Mercedes-Benz Stadium' AND sport = 'NFL';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mercedes_Benz_Stadium_time_lapse.gif/640px-Mercedes_Benz_Stadium_time_lapse.gif',
'Retractable roof in action', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Mercedes-Benz Stadium' AND sport = 'NFL';

-- Allegiant Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Allegiant_Stadium_-_August_2020.jpg/1280px-Allegiant_Stadium_-_August_2020.jpg',
'Las Vegas skyline view', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Allegiant Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Allegiant_Stadium_interior.jpg/1280px-Allegiant_Stadium_interior.jpg',
'Interior bowl view', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Allegiant Stadium';

-- MetLife Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Metlife_stadium_%28Aerial_view%29.jpg/1280px-Metlife_stadium_%28Aerial_view%29.jpg',
'Aerial view', 'wikipedia', false, 1 FROM stadiums WHERE name = 'MetLife Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/New_Meadowlands_Stadium_Mezz_Corner.jpg/1280px-New_Meadowlands_Stadium_Mezz_Corner.jpg',
'Corner view from mezzanine', 'wikipedia', false, 2 FROM stadiums WHERE name = 'MetLife Stadium';

-- Lincoln Financial Field additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Lincoln_Financial_Field_%28Aerial_view%29.jpg/1280px-Lincoln_Financial_Field_%28Aerial_view%29.jpg',
'Philadelphia skyline', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Lincoln Financial Field';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Lincoln_Financial_Field.jpg/1280px-Lincoln_Financial_Field.jpg',
'Interior game day', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Lincoln Financial Field';

-- Caesars Superdome additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Superdome_from_Garage.jpg/1280px-Superdome_from_Garage.jpg',
'Iconic exterior', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Caesars Superdome';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Louisiana_Superdome_2_%282014%29.jpg/1280px-Louisiana_Superdome_2_%282014%29.jpg',
'New Orleans landmark', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Caesars Superdome';

-- U.S. Bank Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/US_Bank_Stadium_-_West_Facade.jpg/1280px-US_Bank_Stadium_-_West_Facade.jpg',
'West facade', 'wikipedia', false, 1 FROM stadiums WHERE name = 'U.S. Bank Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Super_Bowl_LII%2C_U.S._Bank_Stadium_%2839768657554%29.jpg/1280px-Super_Bowl_LII%2C_U.S._Bank_Stadium_%2839768657554%29.jpg',
'Super Bowl LII', 'wikipedia', false, 2 FROM stadiums WHERE name = 'U.S. Bank Stadium';

-- Hard Rock Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Hard_Rock_Stadium_aerial_2019.jpg/1280px-Hard_Rock_Stadium_aerial_2019.jpg',
'Miami Gardens aerial', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Hard Rock Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Super_Bowl_LIV_%2849464815688%29.jpg/1280px-Super_Bowl_LIV_%2849464815688%29.jpg',
'Super Bowl LIV', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Hard Rock Stadium';

-- Lumen Field additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Qwest_Field_North.jpg/1280px-Qwest_Field_North.jpg',
'Seattle skyline', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Lumen Field';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/CenturyLink_Field_-_2018.jpg/1280px-CenturyLink_Field_-_2018.jpg',
'12th Man atmosphere', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Lumen Field';

-- Gillette Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Gillette_Stadium_%28Top_View%29.jpg/1280px-Gillette_Stadium_%28Top_View%29.jpg',
'Patriot Place aerial', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Gillette Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Gillette_Stadium_interior_2019.jpg/1280px-Gillette_Stadium_interior_2019.jpg',
'Interior view', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Gillette Stadium';


-- State Farm Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/University_of_Phoenix_Stadium_aerial.jpg/1280px-University_of_Phoenix_Stadium_aerial.jpg',
'Glendale aerial', 'wikipedia', false, 1 FROM stadiums WHERE name = 'State Farm Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/University_of_Phoenix_Stadium_interior.jpg/1280px-University_of_Phoenix_Stadium_interior.jpg',
'Retractable field', 'wikipedia', false, 2 FROM stadiums WHERE name = 'State Farm Stadium';

-- Raymond James Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Raymond_James_Stadium_Pirate_Ship.jpg/1280px-Raymond_James_Stadium_Pirate_Ship.jpg',
'Famous pirate ship', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Raymond James Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Raymond_James_Stadium.jpg/1280px-Raymond_James_Stadium.jpg',
'Tampa Bay sunset', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Raymond James Stadium';

-- Ford Field additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Ford_Field_interior.jpg/1280px-Ford_Field_interior.jpg',
'Interior bowl', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Ford Field';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Ford_Field_Detroit.jpg/1280px-Ford_Field_Detroit.jpg',
'Downtown Detroit', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Ford Field';

-- NRG Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/NRG_Stadium_aerial_2.jpg/1280px-NRG_Stadium_aerial_2.jpg',
'Houston complex', 'wikipedia', false, 1 FROM stadiums WHERE name = 'NRG Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Reliant_Stadium.jpg/1280px-Reliant_Stadium.jpg',
'Retractable roof open', 'wikipedia', false, 2 FROM stadiums WHERE name = 'NRG Stadium';

-- Lucas Oil Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Lucas_Oil_Stadium_at_night.jpg/1280px-Lucas_Oil_Stadium_at_night.jpg',
'Indianapolis at night', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Lucas Oil Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Lucas_Oil_Stadium_playing_field.jpg/1280px-Lucas_Oil_Stadium_playing_field.jpg',
'Game day interior', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Lucas Oil Stadium';

-- Empower Field additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Invesco_Field_at_Mile_High.JPG/1280px-Invesco_Field_at_Mile_High.JPG',
'Rocky Mountain backdrop', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Empower Field at Mile High';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Sports_Authority_Field_at_Mile_High_July_2015.jpg/1280px-Sports_Authority_Field_at_Mile_High_July_2015.jpg',
'Denver skyline', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Empower Field at Mile High';

-- Soldier Field additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/SoldierFieldInterior.jpg/1280px-SoldierFieldInterior.jpg',
'Historic columns', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Soldier Field';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Soldier_Field2.jpg/1280px-Soldier_Field2.jpg',
'Chicago lakefront', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Soldier Field';

-- M&T Bank Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/M%26T_Bank_Stadium_Exterior.jpg/1280px-M%26T_Bank_Stadium_Exterior.jpg',
'Baltimore exterior', 'wikipedia', false, 1 FROM stadiums WHERE name = 'M&T Bank Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/M%26T_Bank_Stadium_DoD_photo.jpg/1280px-M%26T_Bank_Stadium_DoD_photo.jpg',
'Military appreciation', 'wikipedia', false, 2 FROM stadiums WHERE name = 'M&T Bank Stadium';

-- Highmark Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Bills_Stadium.jpg/1280px-Bills_Stadium.jpg',
'Orchard Park winter', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Highmark Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Ralph_Wilson_Stadium_aerial_2014.jpg/1280px-Ralph_Wilson_Stadium_aerial_2014.jpg',
'Bills Mafia home', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Highmark Stadium';

-- EverBank Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/TIAA_Bank_Field_aerial.jpg/1280px-TIAA_Bank_Field_aerial.jpg',
'Jacksonville riverside', 'wikipedia', false, 1 FROM stadiums WHERE name = 'EverBank Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/EverBank_Field_world%27s_largest_video_boards.jpg/1280px-EverBank_Field_world%27s_largest_video_boards.jpg',
'Giant video boards', 'wikipedia', false, 2 FROM stadiums WHERE name = 'EverBank Stadium';

-- GEHA Field at Arrowhead Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Arrowhead_Stadium_2010.jpg/1280px-Arrowhead_Stadium_2010.jpg',
'Sea of red', 'wikipedia', false, 1 FROM stadiums WHERE name = 'GEHA Field at Arrowhead Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Kansas_City_Chiefs_vs_Green_Bay_Packers.jpg/1280px-Kansas_City_Chiefs_vs_Green_Bay_Packers.jpg',
'Chiefs Kingdom', 'wikipedia', false, 2 FROM stadiums WHERE name = 'GEHA Field at Arrowhead Stadium';

-- Acrisure Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Heinz_Field_exterior_2.JPG/1280px-Heinz_Field_exterior_2.JPG',
'Pittsburgh riverfront', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Acrisure Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Heinz_Field_panorama.jpg/1280px-Heinz_Field_panorama.jpg',
'Steeler Nation', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Acrisure Stadium';

-- Levi's Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Levi%27s_Stadium.jpg/1280px-Levi%27s_Stadium.jpg',
'Santa Clara tech hub', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Levi''s Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Super_Bowl_50_-_Pair_of_Patriots_%2824963578926%29.jpg/1280px-Super_Bowl_50_-_Pair_of_Patriots_%2824963578926%29.jpg',
'Super Bowl 50', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Levi''s Stadium';

-- Bank of America Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Bank_of_America_Stadium.jpg/1280px-Bank_of_America_Stadium.jpg',
'Uptown Charlotte', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Bank of America Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/BofA_stadium_%28aerial%29.jpg/1280px-BofA_stadium_%28aerial%29.jpg',
'Panthers nest', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Bank of America Stadium';

-- Paycor Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Paul_Brown_Stadium.jpg/1280px-Paul_Brown_Stadium.jpg',
'Cincinnati riverfront', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Paycor Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Paul_Brown_Stadium_%28aerial%29.jpg/1280px-Paul_Brown_Stadium_%28aerial%29.jpg',
'Ohio River view', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Paycor Stadium';

-- Huntington Bank Field additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Cleveland_Browns_Stadium_%28aerial%29.jpg/1280px-Cleveland_Browns_Stadium_%28aerial%29.jpg',
'Lake Erie shore', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Huntington Bank Field';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/FirstEnergy_Stadium.jpg/1280px-FirstEnergy_Stadium.jpg',
'Dawg Pound', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Huntington Bank Field';

-- Nissan Stadium Nashville additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/LP_Field_in_Nashville.jpg/1280px-LP_Field_in_Nashville.jpg',
'Nashville skyline', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Nissan Stadium Nashville';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Nissan_Stadium_2018.jpg/1280px-Nissan_Stadium_2018.jpg',
'Titan Up', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Nissan Stadium Nashville';

-- Northwest Stadium additional images
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/FedExField_aerial.jpg/1280px-FedExField_aerial.jpg',
'Landover aerial', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Northwest Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/FedExField01.jpg/1280px-FedExField01.jpg',
'Game day', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Northwest Stadium';

