#!/bin/bash

API_KEY="${SUPABASE_SERVICE_ROLE_KEY}"
BASE_URL="${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/stadiums"

update_stadium() {
  local filter="$1"
  local data="$2"
  local name="$3"
  
  curl -s -X PATCH "${BASE_URL}?${filter}" \
    -H "apikey: ${API_KEY}" \
    -H "Authorization: Bearer ${API_KEY}" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=minimal" \
    -d "${data}"
  echo " ✓ ${name}"
}

echo "Updating stadium images..."

update_stadium "team_name=like.*Buffalo%20Bills*" \
  '{"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/New_Era_Field_at_dusk.jpg/960px-New_Era_Field_at_dusk.jpg"}' \
  "Bills"

update_stadium "team_name=like.*Kansas%20City%20Chiefs*" \
  '{"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Arrowhead_Stadium_2010.JPG/960px-Arrowhead_Stadium_2010.JPG"}' \
  "Chiefs"

update_stadium "team_name=like.*Clippers*&sport=eq.NBA" \
  '{"name": "Intuit Dome", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Intuit_Dome_Eastern_Exterior.jpg/960px-Intuit_Dome_Eastern_Exterior.jpg"}' \
  "Clippers (Intuit Dome)"

update_stadium "team_name=like.*Orlando%20Magic*" \
  '{"name": "Kia Center", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Amway_Center.jpg/960px-Amway_Center.jpg"}' \
  "Magic (Kia Center)"

update_stadium "team_name=like.*Phoenix%20Suns*" \
  '{"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Talking_Stick_Resort_Arena.jpg/960px-Talking_Stick_Resort_Arena.jpg"}' \
  "Suns"

update_stadium "team_name=like.*Cleveland%20Cavaliers*" \
  '{"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Quicken_Loans_Arena.jpg/960px-Quicken_Loans_Arena.jpg"}' \
  "Cavaliers"

update_stadium "team_name=like.*Los%20Angeles%20Angels*" \
  '{"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Angel_Stadium_of_Anaheim.jpg/960px-Angel_Stadium_of_Anaheim.jpg"}' \
  "Angels"

update_stadium "team_name=like.*St.%20Louis%20Cardinals*" \
  '{"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Busch_Stadium_2019.jpg/960px-Busch_Stadium_2019.jpg"}' \
  "Cardinals"

update_stadium "team_name=like.*New%20York%20Mets*" \
  '{"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Citi_Field_Night_Game.jpg/960px-Citi_Field_Night_Game.jpg"}' \
  "Mets"

update_stadium "team_name=like.*Tampa%20Bay%20Rays*" \
  '{"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tropicana_Field_-_September_2019.jpg/960px-Tropicana_Field_-_September_2019.jpg"}' \
  "Rays"

update_stadium "team_name=like.*Miami%20Marlins*" \
  '{"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Marlins_Park%2C_March_2012.jpg/960px-Marlins_Park%2C_March_2012.jpg"}' \
  "Marlins"

update_stadium "team_name=like.*Oakland%20Athletics*" \
  '{"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Oakland_Coliseum_Exterior_2017.jpg/960px-Oakland_Coliseum_Exterior_2017.jpg"}' \
  "Athletics"

echo ""
echo "Done! All 12 stadium images updated."

