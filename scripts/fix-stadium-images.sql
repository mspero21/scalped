-- Fix stadium images for stadiums with bad thumbnails
-- Run this in Supabase SQL Editor

-- Buffalo Bills - Highmark Stadium (better exterior shot)
UPDATE stadiums SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/New_Era_Field_at_dusk.jpg/960px-New_Era_Field_at_dusk.jpg'
WHERE team_name LIKE '%Buffalo Bills%';

-- Kansas City Chiefs - Arrowhead Stadium (exterior after renovations)
UPDATE stadiums SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Arrowhead_Stadium_2010.JPG/960px-Arrowhead_Stadium_2010.JPG'
WHERE team_name LIKE '%Kansas City Chiefs%';

-- LA Clippers - Intuit Dome (new arena exterior)
UPDATE stadiums SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Intuit_Dome_Eastern_Exterior.jpg/960px-Intuit_Dome_Eastern_Exterior.jpg'
WHERE name = 'Intuit Dome';

-- Also update the old Clippers entry if it exists (Crypto.com Arena)
UPDATE stadiums SET name = 'Intuit Dome', 
                    image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Intuit_Dome_Eastern_Exterior.jpg/960px-Intuit_Dome_Eastern_Exterior.jpg'
WHERE team_name LIKE '%Clippers%' AND sport = 'NBA';

-- Orlando Magic - Kia Center (better exterior)
UPDATE stadiums SET name = 'Kia Center',
                    image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Amway_Center.jpg/960px-Amway_Center.jpg'
WHERE team_name LIKE '%Orlando Magic%';

-- Phoenix Suns - Footprint Center (exterior shot)
UPDATE stadiums SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Talking_Stick_Resort_Arena.jpg/960px-Talking_Stick_Resort_Arena.jpg'
WHERE team_name LIKE '%Phoenix Suns%';

-- Cleveland Cavaliers - Rocket Mortgage FieldHouse
UPDATE stadiums SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Quicken_Loans_Arena.jpg/960px-Quicken_Loans_Arena.jpg'
WHERE team_name LIKE '%Cleveland Cavaliers%';

-- Los Angeles Angels - Angel Stadium (better exterior)
UPDATE stadiums SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Angel_Stadium_of_Anaheim.jpg/960px-Angel_Stadium_of_Anaheim.jpg'
WHERE team_name LIKE '%Los Angeles Angels%';

-- St. Louis Cardinals - Busch Stadium (good exterior view)
UPDATE stadiums SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Busch_Stadium_2019.jpg/960px-Busch_Stadium_2019.jpg'
WHERE team_name LIKE '%St. Louis Cardinals%';

-- New York Mets - Citi Field (game night shot)
UPDATE stadiums SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Citi_Field_Night_Game.jpg/960px-Citi_Field_Night_Game.jpg'
WHERE team_name LIKE '%New York Mets%';

-- Tampa Bay Rays - Tropicana Field (interior game shot)
UPDATE stadiums SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tropicana_Field_-_September_2019.jpg/960px-Tropicana_Field_-_September_2019.jpg'
WHERE team_name LIKE '%Tampa Bay Rays%';

-- Miami Marlins - loanDepot Park (exterior)
UPDATE stadiums SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Marlins_Park%2C_March_2012.jpg/960px-Marlins_Park%2C_March_2012.jpg'
WHERE team_name LIKE '%Miami Marlins%';

-- Oakland Athletics - Oakland Coliseum (exterior)
UPDATE stadiums SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Oakland_Coliseum_Exterior_2017.jpg/960px-Oakland_Coliseum_Exterior_2017.jpg'
WHERE team_name LIKE '%Oakland Athletics%';

-- Verify the updates
SELECT name, team_name, sport, image_url FROM stadiums 
WHERE team_name LIKE '%Bills%' 
   OR team_name LIKE '%Chiefs%'
   OR team_name LIKE '%Clippers%'
   OR team_name LIKE '%Magic%'
   OR team_name LIKE '%Suns%'
   OR team_name LIKE '%Cavaliers%'
   OR team_name LIKE '%Angels%'
   OR team_name LIKE '%Cardinals%'
   OR team_name LIKE '%Mets%'
   OR team_name LIKE '%Rays%'
   OR team_name LIKE '%Marlins%'
   OR team_name LIKE '%Athletics%';

