-- Scalped Seed Data (normalized: stadiums + teams)

-- ========================
-- Venues -> stadiums table
-- ========================
INSERT INTO stadiums (name, city, state, country, capacity, year_built, roof_type, image_url)
VALUES
  ('State Farm Arena', 'Atlanta', 'GA', 'USA', 16600, 1999, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/State_Farm_%28Philips%29_Arena%2C_Atlanta%2C_GA_%2846558861525%29_-_2019.jpg/960px-State_Farm_%28Philips%29_Arena%2C_Atlanta%2C_GA_%2846558861525%29_-_2019.jpg'),
  ('TD Garden', 'Boston', 'MA', 'USA', 19580, 1995, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/TD_Garden_%2854960947755%29.jpg/960px-TD_Garden_%2854960947755%29.jpg'),
  ('Barclays Center', 'Brooklyn', 'NY', 'USA', 17732, 2012, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Barclays_Center_-_May_2_2025.jpg/960px-Barclays_Center_-_May_2_2025.jpg'),
  ('Spectrum Center', 'Charlotte', 'NC', 'USA', 19077, 2005, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Spectrum_Center_2018.jpg/960px-Spectrum_Center_2018.jpg'),
  ('United Center', 'Chicago', 'IL', 'USA', 20917, 1994, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/United_Center_1.jpg/960px-United_Center_1.jpg'),
  ('Rocket Mortgage FieldHouse', 'Cleveland', 'OH', 'USA', 19432, 1994, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Rocket_Mortgage_FieldHouse_2022_%28cropped%29.png/960px-Rocket_Mortgage_FieldHouse_2022_%28cropped%29.png'),
  ('American Airlines Center', 'Dallas', 'TX', 'USA', 19200, 2001, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/American_Airlines_Center_August_2015.jpg/960px-American_Airlines_Center_August_2015.jpg'),
  ('Ball Arena', 'Denver', 'CO', 'USA', 19520, 1999, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Ball_Arena_exterior_2022.jpg/960px-Ball_Arena_exterior_2022.jpg'),
  ('Little Caesars Arena', 'Detroit', 'MI', 'USA', 20332, 2017, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Little_Caesars_Arena_panorama.jpg/960px-Little_Caesars_Arena_panorama.jpg'),
  ('Chase Center', 'San Francisco', 'CA', 'USA', 18064, 2019, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Chase_Center.jpg/960px-Chase_Center.jpg'),
  ('Toyota Center', 'Houston', 'TX', 'USA', 18055, 2003, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Toyota_Center_entr.jpg/960px-Toyota_Center_entr.jpg'),
  ('Gainbridge Fieldhouse', 'Indianapolis', 'IN', 'USA', 17923, 1999, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Bankers_Life_Fieldhouse%2C_Indian%C3%A1polis%2C_Estados_Unidos%2C_2012-10-22%2C_DD_02.jpg/960px-Bankers_Life_Fieldhouse%2C_Indian%C3%A1polis%2C_Estados_Unidos%2C_2012-10-22%2C_DD_02.jpg'),
  ('Crypto.com Arena', 'Los Angeles', 'CA', 'USA', 19068, 1999, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Crypto.com_Arena_exterior_2023.jpg/960px-Crypto.com_Arena_exterior_2023.jpg'),
  ('FedExForum', 'Memphis', 'TN', 'USA', 18119, 2004, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/FedExForum_at_night.jpg/960px-FedExForum_at_night.jpg'),
  ('Kaseya Center', 'Miami', 'FL', 'USA', 19600, 1999, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Kaseya_Center_Downtown_Miami_FL%2C_5_April_2024.jpg/960px-Kaseya_Center_Downtown_Miami_FL%2C_5_April_2024.jpg'),
  ('Fiserv Forum', 'Milwaukee', 'WI', 'USA', 17341, 2018, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Milwaukee_July_2022_022_%28Fiserv_Forum%29.jpg/960px-Milwaukee_July_2022_022_%28Fiserv_Forum%29.jpg'),
  ('Target Center', 'Minneapolis', 'MN', 'USA', 18798, 1990, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/TargetCenter.jpg/960px-TargetCenter.jpg'),
  ('Smoothie King Center', 'New Orleans', 'LA', 'USA', 16867, 1999, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/New_Orleans_Arena%2C_exterior_view%2C_10_January_2022_%28cropped%29.jpg/960px-New_Orleans_Arena%2C_exterior_view%2C_10_January_2022_%28cropped%29.jpg'),
  ('Madison Square Garden', 'New York', 'NY', 'USA', 19812, 1968, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Madison_Square_Garden_%28MSG%29_-_Full_%2848124330357%29.jpg/960px-Madison_Square_Garden_%28MSG%29_-_Full_%2848124330357%29.jpg'),
  ('Paycom Center', 'Oklahoma City', 'OK', 'USA', 18203, 2002, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Paycom_Center_exterior_aerial_view.jpg/960px-Paycom_Center_exterior_aerial_view.jpg'),
  ('Amway Center', 'Orlando', 'FL', 'USA', 18846, 2010, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Kia_Center_12-22-24.jpg/960px-Kia_Center_12-22-24.jpg'),
  ('Wells Fargo Center', 'Philadelphia', 'PA', 'USA', 20478, 1996, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Wells_Fargo_Center_-_2019_OWL_Grand_Finals.jpg/960px-Wells_Fargo_Center_-_2019_OWL_Grand_Finals.jpg'),
  ('Footprint Center', 'Phoenix', 'AZ', 'USA', 17071, 1992, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Footprint_Center_2022.jpg/960px-Footprint_Center_2022.jpg'),
  ('Moda Center', 'Portland', 'OR', 'USA', 19441, 1995, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Modacenter2019.jpg/960px-Modacenter2019.jpg'),
  ('Golden 1 Center', 'Sacramento', 'CA', 'USA', 17608, 2016, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Golden_1_Center_2017.jpg/960px-Golden_1_Center_2017.jpg'),
  ('Frost Bank Center', 'San Antonio', 'TX', 'USA', 18418, 2002, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Texasdd.JPG/960px-Texasdd.JPG'),
  ('Scotiabank Arena', 'Toronto', 'ON', 'Canada', 19800, 1999, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Scotiabank_Arena_-_2018_%28cropped%29.jpg/960px-Scotiabank_Arena_-_2018_%28cropped%29.jpg'),
  ('Delta Center', 'Salt Lake City', 'UT', 'USA', 18306, 1991, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Delta_Center_2023.jpg/960px-Delta_Center_2023.jpg'),
  ('Capital One Arena', 'Washington', 'DC', 'USA', 20356, 1997, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Capital_One_Arena_-_Washington%2C_D.C.jpg/960px-Capital_One_Arena_-_Washington%2C_D.C.jpg'),
  ('Chase Field', 'Phoenix', 'AZ', 'USA', 48519, 1998, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Reserve_A-10_Warthogs_Flyover_2023_World_Series_%288099146%29.jpg/960px-Reserve_A-10_Warthogs_Flyover_2023_World_Series_%288099146%29.jpg'),
  ('Truist Park', 'Atlanta', 'GA', 'USA', 41084, 2017, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Truist_Park_2025.jpg/960px-Truist_Park_2025.jpg'),
  ('Oriole Park at Camden Yards', 'Baltimore', 'MD', 'USA', 45971, 1992, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Camden_Yards.jpg/960px-Camden_Yards.jpg'),
  ('Fenway Park', 'Boston', 'MA', 'USA', 37755, 1912, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/131023-F-PR861-033_Hanscom_participates_in_World_Series_pregame_events.jpg/960px-131023-F-PR861-033_Hanscom_participates_in_World_Series_pregame_events.jpg'),
  ('Wrigley Field', 'Chicago', 'IL', 'USA', 41649, 1914, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Wrigley_Field_in_line_with_sign.jpg/960px-Wrigley_Field_in_line_with_sign.jpg'),
  ('Guaranteed Rate Field', 'Chicago', 'IL', 'USA', 40615, 1991, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Chicago%2C_Illinois%2C_U.S._%282023%29_-_062.jpg/960px-Chicago%2C_Illinois%2C_U.S._%282023%29_-_062.jpg'),
  ('Great American Ball Park', 'Cincinnati', 'OH', 'USA', 42319, 2003, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/10Cincinnati_2015_%282%29.jpg/960px-10Cincinnati_2015_%282%29.jpg'),
  ('Progressive Field', 'Cleveland', 'OH', 'USA', 34788, 1994, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Cleveland_Guardians_vs._New_York_Yankees_on_Oct_17_2024_%2854102149292%29.jpg/960px-Cleveland_Guardians_vs._New_York_Yankees_on_Oct_17_2024_%2854102149292%29.jpg'),
  ('Coors Field', 'Denver', 'CO', 'USA', 50144, 1995, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Coors_Field_July_2015.jpg/960px-Coors_Field_July_2015.jpg'),
  ('Comerica Park', 'Detroit', 'MI', 'USA', 41083, 2000, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Detroit_Tigers_opening_game_at_Comerica_Park%2C_2007.jpg/960px-Detroit_Tigers_opening_game_at_Comerica_Park%2C_2007.jpg'),
  ('Minute Maid Park', 'Houston', 'TX', 'USA', 41168, 2000, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Houston%2C_Texas_%282024%29_-_09.jpg/960px-Houston%2C_Texas_%282024%29_-_09.jpg'),
  ('Kauffman Stadium', 'Kansas City', 'MO', 'USA', 37903, 1973, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Kauffman2017.jpg/960px-Kauffman2017.jpg'),
  ('Angel Stadium', 'Anaheim', 'CA', 'USA', 45517, 1966, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Angelstadiummarch2019.jpg/960px-Angelstadiummarch2019.jpg'),
  ('Dodger Stadium', 'Los Angeles', 'CA', 'USA', 56000, 1962, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Dodger_Stadium_and_Chavez_Ravine_far_view%2C_Chicago_Cubs_at_Los_Angeles_Dodgers%2C_%28April_12%2C_2025%29.jpg/960px-Dodger_Stadium_and_Chavez_Ravine_far_view%2C_Chicago_Cubs_at_Los_Angeles_Dodgers%2C_%28April_12%2C_2025%29.jpg'),
  ('loanDepot Park', 'Miami', 'FL', 'USA', 36742, 2012, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/LOAN_DEPOT_PARK.jpg/960px-LOAN_DEPOT_PARK.jpg'),
  ('American Family Field', 'Milwaukee', 'WI', 'USA', 41900, 2001, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Miller_Park_in_Milwaukee%2C_Wisconsin.jpg/960px-Miller_Park_in_Milwaukee%2C_Wisconsin.jpg'),
  ('Target Field', 'Minneapolis', 'MN', 'USA', 38544, 2010, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Target_Field_Aerial.jpg/960px-Target_Field_Aerial.jpg'),
  ('Citi Field', 'New York', 'NY', 'USA', 41922, 2009, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Citi_Field.svg/960px-Citi_Field.svg.png'),
  ('Yankee Stadium', 'Bronx', 'NY', 'USA', 46537, 2009, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Yankee_Stadium_overhead_2010.jpg/960px-Yankee_Stadium_overhead_2010.jpg'),
  ('Oakland Coliseum', 'Oakland', 'CA', 'USA', 46847, 1966, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Oakland_Coliseum_overhead_angle%2C_September_2024.jpg/960px-Oakland_Coliseum_overhead_angle%2C_September_2024.jpg'),
  ('Citizens Bank Park', 'Philadelphia', 'PA', 'USA', 42792, 2004, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Citizens_Bank_Park_2021.jpg/960px-Citizens_Bank_Park_2021.jpg'),
  ('PNC Park', 'Pittsburgh', 'PA', 'USA', 38362, 2001, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Pittsburgh_Pirates_park_%28Unsplash%29.jpg/960px-Pittsburgh_Pirates_park_%28Unsplash%29.jpg'),
  ('Petco Park', 'San Diego', 'CA', 'USA', 40209, 2004, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Petco_Park_Padres_Game.jpg/960px-Petco_Park_Padres_Game.jpg'),
  ('Oracle Park', 'San Francisco', 'CA', 'USA', 41915, 2000, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Oracle_Park_2021.jpg/960px-Oracle_Park_2021.jpg'),
  ('T-Mobile Park', 'Seattle', 'WA', 'USA', 47929, 1999, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/SafecoFieldTop.jpg/960px-SafecoFieldTop.jpg'),
  ('Busch Stadium', 'St. Louis', 'MO', 'USA', 45538, 2006, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Busch_Stadium_2022.jpg/960px-Busch_Stadium_2022.jpg'),
  ('Tropicana Field', 'St. Petersburg', 'FL', 'USA', 25000, 1990, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/PXL_20220528_205520913.jpg/960px-PXL_20220528_205520913.jpg'),
  ('Globe Life Field', 'Arlington', 'TX', 'USA', 40300, 2020, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/GlobeLifeField2021.jpg/960px-GlobeLifeField2021.jpg'),
  ('Rogers Centre', 'Toronto', 'ON', 'Canada', 49282, 1989, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Rogers_Centre_%28500_Level%29_-_Toronto%2C_ON.jpg/960px-Rogers_Centre_%28500_Level%29_-_Toronto%2C_ON.jpg'),
  ('Nationals Park', 'Washington', 'DC', 'USA', 41339, 2008, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Nationals_Park_8.16.19_-_7.jpg/960px-Nationals_Park_8.16.19_-_7.jpg'),
  ('Honda Center', 'Anaheim', 'CA', 'USA', 17174, 1993, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Honda_center_2021.jpg/960px-Honda_center_2021.jpg'),
  ('Mullett Arena', 'Tempe', 'AZ', 'USA', 5000, 2022, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Mullett_Arena_South_Entrance.jpg/960px-Mullett_Arena_South_Entrance.jpg'),
  ('KeyBank Center', 'Buffalo', 'NY', 'USA', 19070, 1996, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/KeyBank_Center_side_view_from_Main_Street_at_Prime_Street%2C_Buffalo%2C_New_York_-_20210725.jpg/960px-KeyBank_Center_side_view_from_Main_Street_at_Prime_Street%2C_Buffalo%2C_New_York_-_20210725.jpg'),
  ('Scotiabank Saddledome', 'Calgary', 'AB', 'Canada', 19289, 1983, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/2020_Calgary_Saddledome.jpg/960px-2020_Calgary_Saddledome.jpg'),
  ('PNC Arena', 'Raleigh', 'NC', 'USA', 18680, 1999, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Lenovo_Center_Side.jpg/960px-Lenovo_Center_Side.jpg'),
  ('Nationwide Arena', 'Columbus', 'OH', 'USA', 18500, 2000, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Nationwide_Arena_exterior.jpg/960px-Nationwide_Arena_exterior.jpg'),
  ('Rogers Place', 'Edmonton', 'AB', 'Canada', 18347, 2016, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Rogers_Place%2C_Edmonton%2C_June_6%2C_2024.jpg/960px-Rogers_Place%2C_Edmonton%2C_June_6%2C_2024.jpg'),
  ('Amerant Bank Arena', 'Sunrise', 'FL', 'USA', 19250, 1998, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/View_of_Amerant_Bank_Arena_from_Publix_Plaza_before_a_Florida_Panthers_game_during_the_2023-24_season..jpg/960px-View_of_Amerant_Bank_Arena_from_Publix_Plaza_before_a_Florida_Panthers_game_during_the_2023-24_season..jpg'),
  ('Xcel Energy Center', 'St. Paul', 'MN', 'USA', 17954, 2000, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/8/84/XcelEnergyCenteroverview.jpg'),
  ('Bell Centre', 'Montreal', 'QC', 'Canada', 21302, 1996, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/8/80/CentreBell.jpg'),
  ('Bridgestone Arena', 'Nashville', 'TN', 'USA', 17159, 1996, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Bridgestone_Arena_%28Northeast_corner%29.JPG/960px-Bridgestone_Arena_%28Northeast_corner%29.JPG'),
  ('Prudential Center', 'Newark', 'NJ', 'USA', 16514, 2007, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/PrudentialCenter.MulberryCommons.Newark.2019.jpg/960px-PrudentialCenter.MulberryCommons.Newark.2019.jpg'),
  ('UBS Arena', 'Elmont', 'NY', 'USA', 17255, 2021, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Belmont_Park_td_%282021-12-19%29_017_-_UBS_Arena.jpg/960px-Belmont_Park_td_%282021-12-19%29_017_-_UBS_Arena.jpg'),
  ('Canadian Tire Centre', 'Ottawa', 'ON', 'Canada', 18652, 1996, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Canadian_Tire_Centre_exterior_before_a_match_in_2022.jpg/960px-Canadian_Tire_Centre_exterior_before_a_match_in_2022.jpg'),
  ('PPG Paints Arena', 'Pittsburgh', 'PA', 'USA', 18387, 2010, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/PPG_Paints_Arena_-_March_2017.jpg/960px-PPG_Paints_Arena_-_March_2017.jpg'),
  ('SAP Center', 'San Jose', 'CA', 'USA', 17562, 1993, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/SAP_Center_%2816609288898%29.jpg/960px-SAP_Center_%2816609288898%29.jpg'),
  ('Climate Pledge Arena', 'Seattle', 'WA', 'USA', 17100, 2021, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Climate_Pledge_Arena_N.jpg/960px-Climate_Pledge_Arena_N.jpg'),
  ('Enterprise Center', 'St. Louis', 'MO', 'USA', 18096, 1994, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Scottrade_2015.jpg/960px-Scottrade_2015.jpg'),
  ('Amalie Arena', 'Tampa', 'FL', 'USA', 19092, 1996, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Amalie_Arena.jpg/960px-Amalie_Arena.jpg'),
  ('Rogers Arena', 'Vancouver', 'BC', 'Canada', 18910, 1995, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Rogers_Arena.jpg/960px-Rogers_Arena.jpg'),
  ('T-Mobile Arena', 'Las Vegas', 'NV', 'USA', 17500, 2016, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/T_Mobile_Arena_The_Strip_Las_Vegas_%2829798246202%29.jpg/960px-T_Mobile_Arena_The_Strip_Las_Vegas_%2829798246202%29.jpg'),
  ('Canada Life Centre', 'Winnipeg', 'MB', 'Canada', 15321, 2004, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/MTS_CENTRE_b.jpg/960px-MTS_CENTRE_b.jpg'),
  ('Kyle Field', 'College Station', 'TX', 'USA', 102733, 1927, 'OPEN', NULL),
  ('Sanford Stadium', 'Athens', 'GA', 'USA', 92746, 1929, 'OPEN', NULL),
  ('Ben Hill Griffin Stadium', 'Gainesville', 'FL', 'USA', 88548, 1930, 'OPEN', NULL),
  ('Jordan-Hare Stadium', 'Auburn', 'AL', 'USA', 87451, 1939, 'OPEN', NULL),
  ('Williams-Brice Stadium', 'Columbia', 'SC', 'USA', 77559, 1934, 'OPEN', NULL),
  ('Vaught-Hemingway Stadium', 'Oxford', 'MS', 'USA', 64038, 1915, 'OPEN', NULL),
  ('Davis Wade Stadium', 'Starkville', 'MS', 'USA', 61337, 1914, 'OPEN', NULL),
  ('Donald W. Reynolds Razorback Stadium', 'Fayetteville', 'AR', 'USA', 76412, 1938, 'OPEN', NULL),
  ('Kroger Field', 'Lexington', 'KY', 'USA', 61000, 1973, 'OPEN', NULL),
  ('Vanderbilt Stadium', 'Nashville', 'TN', 'USA', 40350, 1922, 'OPEN', NULL),
  ('Texas Memorial Stadium', 'Austin', 'TX', 'USA', 100119, 1924, 'OPEN', NULL),
  ('Gaylord Family Oklahoma Memorial Stadium', 'Norman', 'OK', 'USA', 80126, 1923, 'OPEN', NULL),
  ('Missouri Memorial Stadium', 'Columbia', 'MO', 'USA', 61621, 1926, 'OPEN', NULL),
  ('Memorial Stadium', 'Lincoln', 'NE', 'USA', 85458, 1923, 'OPEN', NULL),
  ('Camp Randall Stadium', 'Madison', 'WI', 'USA', 80321, 1917, 'OPEN', NULL),
  ('Kinnick Stadium', 'Iowa City', 'IA', 'USA', 69250, 1929, 'OPEN', NULL),
  ('Memorial Stadium', 'Champaign', 'IL', 'USA', 60670, 1923, 'OPEN', NULL),
  ('Ross-Ade Stadium', 'West Lafayette', 'IN', 'USA', 57236, 1924, 'OPEN', NULL),
  ('Spartan Stadium', 'East Lansing', 'MI', 'USA', 75005, 1923, 'OPEN', NULL),
  ('TCF Bank Stadium', 'Minneapolis', 'MN', 'USA', 50805, 2009, 'OPEN', NULL),
  ('SHI Stadium', 'Piscataway', 'NJ', 'USA', 52454, 1994, 'OPEN', NULL),
  ('Maryland Stadium', 'College Park', 'MD', 'USA', 51802, 1950, 'OPEN', NULL),
  ('Beaver Stadium', 'University Park', 'PA', 'USA', 106572, 1960, 'OPEN', NULL),
  ('Indiana Memorial Stadium', 'Bloomington', 'IN', 'USA', 52656, 1960, 'OPEN', NULL),
  ('Ryan Field', 'Evanston', 'IL', 'USA', 47130, 1926, 'OPEN', NULL),
  ('UCLA Rose Bowl', 'Pasadena', 'CA', 'USA', 88565, 1922, 'OPEN', NULL),
  ('Los Angeles Memorial Coliseum', 'Los Angeles', 'CA', 'USA', 77500, 1923, 'OPEN', NULL),
  ('Autzen Stadium', 'Eugene', 'OR', 'USA', 54000, 1967, 'OPEN', NULL),
  ('Husky Stadium', 'Seattle', 'WA', 'USA', 70083, 1920, 'OPEN', NULL),
  ('Doak Campbell Stadium', 'Tallahassee', 'FL', 'USA', 79560, 1950, 'OPEN', NULL),
  ('Memorial Stadium', 'Clemson', 'SC', 'USA', 81500, 1942, 'OPEN', NULL),
  ('Hard Rock Stadium', 'Miami Gardens', 'FL', 'USA', 64767, 1987, 'OPEN', NULL),
  ('Lane Stadium', 'Blacksburg', 'VA', 'USA', 66233, 1965, 'OPEN', NULL),
  ('Carter-Finley Stadium', 'Raleigh', 'NC', 'USA', 57583, 1966, 'OPEN', NULL),
  ('Kenan Memorial Stadium', 'Chapel Hill', 'NC', 'USA', 50500, 1927, 'OPEN', NULL),
  ('Wallace Wade Stadium', 'Durham', 'NC', 'USA', 40004, 1929, 'OPEN', NULL),
  ('Scott Stadium', 'Charlottesville', 'VA', 'USA', 61500, 1931, 'OPEN', NULL),
  ('Bobby Dodd Stadium', 'Atlanta', 'GA', 'USA', 55000, 1913, 'OPEN', NULL),
  ('Cardinal Stadium', 'Louisville', 'KY', 'USA', 60800, 1998, 'OPEN', NULL),
  ('Heinz Field', 'Pittsburgh', 'PA', 'USA', 68400, 2001, 'OPEN', NULL),
  ('Carrier Dome', 'Syracuse', 'NY', 'USA', 49057, 1980, 'DOME', NULL),
  ('Alumni Stadium', 'Chestnut Hill', 'MA', 'USA', 44500, 1957, 'OPEN', NULL),
  ('BB&T Field', 'Winston-Salem', 'NC', 'USA', 31500, 1968, 'OPEN', NULL),
  ('Stanford Stadium', 'Stanford', 'CA', 'USA', 50424, 1921, 'OPEN', NULL),
  ('California Memorial Stadium', 'Berkeley', 'CA', 'USA', 62467, 1923, 'OPEN', NULL),
  ('Mountain West Stadium', 'Reno', 'NV', 'USA', 26000, 1966, 'OPEN', NULL),
  ('Boone Pickens Stadium', 'Stillwater', 'OK', 'USA', 55509, 1920, 'OPEN', NULL),
  ('McLane Stadium', 'Waco', 'TX', 'USA', 45140, 2014, 'OPEN', NULL),
  ('Amon G. Carter Stadium', 'Fort Worth', 'TX', 'USA', 47000, 1930, 'OPEN', NULL),
  ('Bill Snyder Family Stadium', 'Manhattan', 'KS', 'USA', 50000, 1968, 'OPEN', NULL),
  ('Jack Trice Stadium', 'Ames', 'IA', 'USA', 61500, 1975, 'OPEN', NULL),
  ('David Booth Kansas Memorial Stadium', 'Lawrence', 'KS', 'USA', 47233, 1921, 'OPEN', NULL),
  ('Jones AT&T Stadium', 'Lubbock', 'TX', 'USA', 60454, 1947, 'OPEN', NULL),
  ('Mountaineer Field', 'Morgantown', 'WV', 'USA', 60000, 1980, 'OPEN', NULL),
  ('LaVell Edwards Stadium', 'Provo', 'UT', 'USA', 63470, 1964, 'OPEN', NULL),
  ('Rice-Eccles Stadium', 'Salt Lake City', 'UT', 'USA', 51444, 1927, 'OPEN', NULL),
  ('Sun Devil Stadium', 'Tempe', 'AZ', 'USA', 53599, 1958, 'OPEN', NULL),
  ('Arizona Stadium', 'Tucson', 'AZ', 'USA', 50782, 1928, 'OPEN', NULL),
  ('Folsom Field', 'Boulder', 'CO', 'USA', 50183, 1924, 'OPEN', NULL),
  ('TDECU Stadium', 'Houston', 'TX', 'USA', 40000, 2014, 'OPEN', NULL),
  ('Yulman Stadium', 'New Orleans', 'LA', 'USA', 30000, 2014, 'OPEN', NULL),
  ('Apogee Stadium', 'Denton', 'TX', 'USA', 30850, 2011, 'OPEN', NULL),
  ('Scheumann Stadium', 'Muncie', 'IN', 'USA', 22500, 1967, 'OPEN', NULL),
  ('Notre Dame Stadium', 'Notre Dame', 'IN', 'USA', 77622, 1930, 'OPEN', NULL),
  ('Spectrum Stadium', 'Orlando', 'FL', 'USA', 44206, 2007, 'OPEN', NULL),
  ('Raymond James Stadium', 'Tampa', 'FL', 'USA', 65890, 1998, 'OPEN', NULL),
  ('Nippert Stadium', 'Cincinnati', 'OH', 'USA', 40000, 1915, 'OPEN', NULL),
  ('Liberty Bowl Memorial Stadium', 'Memphis', 'TN', 'USA', 58325, 1965, 'OPEN', NULL),
  ('Albertsons Stadium', 'Boise', 'ID', 'USA', 36387, 1970, 'OPEN', NULL),
  ('SDCCU Stadium', 'San Diego', 'CA', 'USA', 35000, 1967, 'OPEN', NULL),
  ('Maverik Stadium', 'Logan', 'UT', 'USA', 25513, 1968, 'OPEN', NULL),
  ('War Memorial Stadium', 'Laramie', 'WY', 'USA', 29181, 1950, 'OPEN', NULL),
  ('Canvas Stadium', 'Fort Collins', 'CO', 'USA', 36500, 2017, 'OPEN', NULL),
  ('Dreamstyle Stadium', 'Albuquerque', 'NM', 'USA', 39224, 1960, 'OPEN', NULL),
  ('Sam Boyd Stadium', 'Las Vegas', 'NV', 'USA', 40000, 1971, 'OPEN', NULL),
  ('Aloha Stadium', 'Honolulu', 'HI', 'USA', 50000, 1975, 'OPEN', NULL),
  ('Bulldog Stadium', 'Fresno', 'CA', 'USA', 40727, 1980, 'OPEN', NULL),
  ('Dignity Health Sports Park', 'Carson', 'CA', 'USA', 27000, 2003, 'OPEN', NULL),
  ('InfoCision Stadium', 'Akron', 'OH', 'USA', 30000, 2009, 'OPEN', NULL),
  ('Glass Bowl', 'Toledo', 'OH', 'USA', 26038, 1937, 'OPEN', NULL),
  ('Ford Field', 'Detroit', 'MI', 'USA', 65000, 2002, 'DOME', NULL),
  ('Cameron Indoor Stadium', 'Durham', 'NC', 'USA', 9314, 1940, 'DOME', NULL),
  ('Rupp Arena', 'Lexington', 'KY', 'USA', 20545, 1976, 'DOME', NULL),
  ('Dean E. Smith Center', 'Chapel Hill', 'NC', 'USA', 21750, 1986, 'DOME', NULL),
  ('Allen Fieldhouse', 'Lawrence', 'KS', 'USA', 16300, 1955, 'DOME', NULL),
  ('Pauley Pavilion', 'Los Angeles', 'CA', 'USA', 13800, 1965, 'DOME', NULL),
  ('Assembly Hall', 'Bloomington', 'IN', 'USA', 17222, 1971, 'DOME', NULL),
  ('Maples Pavilion', 'Stanford', 'CA', 'USA', 7391, 1969, 'DOME', NULL),
  ('Crisler Center', 'Ann Arbor', 'MI', 'USA', 12707, 1967, 'DOME', NULL),
  ('Value City Arena', 'Columbus', 'OH', 'USA', 19500, 1998, 'DOME', NULL),
  ('Breslin Center', 'East Lansing', 'MI', 'USA', 14797, 1989, 'DOME', NULL),
  ('Kohl Center', 'Madison', 'WI', 'USA', 17287, 1998, 'DOME', NULL),
  ('Mackey Arena', 'West Lafayette', 'IN', 'USA', 14804, 1967, 'DOME', NULL),
  ('Carver-Hawkeye Arena', 'Iowa City', 'IA', 'USA', 15500, 1983, 'DOME', NULL),
  ('Williams Arena', 'Minneapolis', 'MN', 'USA', 14625, 1928, 'DOME', NULL),
  ('State Farm Center', 'Champaign', 'IL', 'USA', 15500, 1963, 'DOME', NULL),
  ('Pinnacle Bank Arena', 'Lincoln', 'NE', 'USA', 15500, 2013, 'DOME', NULL),
  ('Bryce Jordan Center', 'University Park', 'PA', 'USA', 15261, 1996, 'DOME', NULL),
  ('Welsh-Ryan Arena', 'Evanston', 'IL', 'USA', 8117, 1952, 'DOME', NULL),
  ('Xfinity Center', 'College Park', 'MD', 'USA', 17950, 2002, 'DOME', NULL),
  ('Matthew Knight Arena', 'Eugene', 'OR', 'USA', 12364, 2011, 'DOME', NULL),
  ('Alaska Airlines Arena', 'Seattle', 'WA', 'USA', 10000, 1999, 'DOME', NULL),
  ('Galen Center', 'Los Angeles', 'CA', 'USA', 10258, 2006, 'DOME', NULL),
  ('Thompson-Boling Arena', 'Knoxville', 'TN', 'USA', 21678, 1987, 'DOME', NULL),
  ('Stegeman Coliseum', 'Athens', 'GA', 'USA', 10523, 1964, 'DOME', NULL),
  ('Auburn Arena', 'Auburn', 'AL', 'USA', 9121, 2010, 'DOME', NULL),
  ('Coleman Coliseum', 'Tuscaloosa', 'AL', 'USA', 15383, 1968, 'DOME', NULL),
  ('Pete Maravich Assembly Center', 'Baton Rouge', 'LA', 'USA', 13215, 1972, 'DOME', NULL),
  ('Reed Arena', 'College Station', 'TX', 'USA', 12989, 1998, 'DOME', NULL),
  ('Humphrey Coliseum', 'Starkville', 'MS', 'USA', 10500, 1975, 'DOME', NULL),
  ('The Pavilion at Ole Miss', 'Oxford', 'MS', 'USA', 9500, 2016, 'DOME', NULL),
  ('Colonial Life Arena', 'Columbia', 'SC', 'USA', 18000, 2002, 'DOME', NULL),
  ('Bud Walton Arena', 'Fayetteville', 'AR', 'USA', 19200, 1993, 'DOME', NULL),
  ('Memorial Gymnasium', 'Nashville', 'TN', 'USA', 14316, 1952, 'DOME', NULL),
  ('Frank Erwin Center', 'Austin', 'TX', 'USA', 16540, 1977, 'DOME', NULL),
  ('Lloyd Noble Center', 'Norman', 'OK', 'USA', 11528, 1975, 'DOME', NULL),
  ('Mizzou Arena', 'Columbia', 'MO', 'USA', 15061, 2004, 'DOME', NULL),
  ('John Paul Jones Arena', 'Charlottesville', 'VA', 'USA', 14593, 2006, 'DOME', NULL),
  ('Cassell Coliseum', 'Blacksburg', 'VA', 'USA', 10052, 1962, 'DOME', NULL),
  ('Donald L. Tucker Civic Center', 'Tallahassee', 'FL', 'USA', 11500, 1981, 'DOME', NULL),
  ('Littlejohn Coliseum', 'Clemson', 'SC', 'USA', 10000, 1968, 'DOME', NULL),
  ('Watsco Center', 'Coral Gables', 'FL', 'USA', 8000, 2003, 'DOME', NULL),
  ('McCamish Pavilion', 'Atlanta', 'GA', 'USA', 8600, 2012, 'DOME', NULL),
  ('KFC Yum! Center', 'Louisville', 'KY', 'USA', 22090, 2010, 'DOME', NULL),
  ('Petersen Events Center', 'Pittsburgh', 'PA', 'USA', 12508, 2002, 'DOME', NULL),
  ('Conte Forum', 'Chestnut Hill', 'MA', 'USA', 8606, 1988, 'DOME', NULL),
  ('Lawrence Joel Veterans Memorial Coliseum', 'Winston-Salem', 'NC', 'USA', 14665, 1989, 'DOME', NULL),
  ('Haas Pavilion', 'Berkeley', 'CA', 'USA', 11877, 1999, 'DOME', NULL),
  ('Gallagher-Iba Arena', 'Stillwater', 'OK', 'USA', 13611, 1938, 'DOME', NULL),
  ('Foster Pavilion', 'Waco', 'TX', 'USA', 10284, 1988, 'DOME', NULL),
  ('Ed and Rae Schollmaier Arena', 'Fort Worth', 'TX', 'USA', 7201, 1961, 'DOME', NULL),
  ('Bramlage Coliseum', 'Manhattan', 'KS', 'USA', 11654, 1988, 'DOME', NULL),
  ('Hilton Coliseum', 'Ames', 'IA', 'USA', 14267, 1971, 'DOME', NULL),
  ('United Supermarkets Arena', 'Lubbock', 'TX', 'USA', 15098, 1999, 'DOME', NULL),
  ('WVU Coliseum', 'Morgantown', 'WV', 'USA', 14000, 1970, 'DOME', NULL),
  ('Marriott Center', 'Provo', 'UT', 'USA', 18987, 1971, 'DOME', NULL),
  ('Jon M. Huntsman Center', 'Salt Lake City', 'UT', 'USA', 15000, 1969, 'DOME', NULL),
  ('Desert Financial Arena', 'Tempe', 'AZ', 'USA', 14198, 1974, 'DOME', NULL),
  ('McKale Center', 'Tucson', 'AZ', 'USA', 14644, 1973, 'DOME', NULL),
  ('CU Events Center', 'Boulder', 'CO', 'USA', 11064, 1979, 'DOME', NULL),
  ('Fertitta Center', 'Houston', 'TX', 'USA', 7100, 2018, 'DOME', NULL),
  ('Devlin Fieldhouse', 'New Orleans', 'LA', 'USA', 3600, 1933, 'DOME', NULL),
  ('Purcell Pavilion', 'Notre Dame', 'IN', 'USA', 9149, 1968, 'DOME', NULL),
  ('Fifth Third Arena', 'Cincinnati', 'OH', 'USA', 12012, 1989, 'DOME', NULL),
  ('Addition Financial Arena', 'Orlando', 'FL', 'USA', 10000, 2007, 'DOME', NULL),
  ('Creighton CHI Health Center', 'Omaha', 'NE', 'USA', 17560, 2003, 'DOME', NULL),
  ('Hinkle Fieldhouse', 'Indianapolis', 'IN', 'USA', 9100, 1928, 'DOME', NULL),
  ('Cintas Center', 'Cincinnati', 'OH', 'USA', 10250, 2000, 'DOME', NULL),
  ('The Pavilion', 'Villanova', 'PA', 'USA', 6500, 1986, 'DOME', NULL),
  ('Liacouras Center', 'Philadelphia', 'PA', 'USA', 10206, 1997, 'DOME', NULL),
  ('Robins Center', 'Richmond', 'VA', 'USA', 9071, 1972, 'DOME', NULL),
  ('Stuart C. Siegel Center', 'Richmond', 'VA', 'USA', 7637, 1999, 'DOME', NULL),
  ('Ted Constant Convocation Center', 'Norfolk', 'VA', 'USA', 8600, 2002, 'DOME', NULL),
  ('EagleBank Arena', 'Fairfax', 'VA', 'USA', 10000, 1985, 'DOME', NULL),
  ('Vines Center', 'Lynchburg', 'VA', 'USA', 9547, 1990, 'DOME', NULL),
  ('ExtraMile Arena', 'Boise', 'ID', 'USA', 12380, 1982, 'DOME', NULL),
  ('The Pit', 'Albuquerque', 'NM', 'USA', 15411, 1966, 'DOME', NULL),
  ('Viejas Arena', 'San Diego', 'CA', 'USA', 12414, 1997, 'DOME', NULL),
  ('Thomas & Mack Center', 'Las Vegas', 'NV', 'USA', 18776, 1983, 'DOME', NULL),
  ('Save Mart Center', 'Fresno', 'CA', 'USA', 15596, 2003, 'DOME', NULL),
  ('Dee Glen Smith Spectrum', 'Logan', 'UT', 'USA', 10270, 1970, 'DOME', NULL),
  ('Arena-Auditorium', 'Laramie', 'WY', 'USA', 11383, 1982, 'DOME', NULL),
  ('Moby Arena', 'Fort Collins', 'CO', 'USA', 8745, 1966, 'DOME', NULL),
  ('Stan Sheriff Center', 'Honolulu', 'HI', 'USA', 10300, 1994, 'DOME', NULL),
  ('McCarthy Athletic Center', 'Spokane', 'WA', 'USA', 6000, 2004, 'DOME', NULL),
  ('Orleans Arena', 'Las Vegas', 'NV', 'USA', 9500, 2003, 'DOME', NULL),
  ('State Farm Stadium', 'Glendale', 'USA', 'USA', 63400, 1898, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/State_Farm_Stadium_2022.jpg/960px-State_Farm_Stadium_2022.jpg'),
  ('Mercedes-Benz Stadium', 'Atlanta', 'Georgia', 'USA', 71228, 1965, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/2025-0120_CFP_NCG_Pre-Game_view_Press_Box.jpg/960px-2025-0120_CFP_NCG_Pre-Game_view_Press_Box.jpg'),
  ('M&T Bank Stadium', 'Baltimore', 'Maryland', 'USA', 71008, 1996, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/M%26T_Bank_Stadium_in_Baltimore.jpg/960px-M%26T_Bank_Stadium_in_Baltimore.jpg'),
  ('Highmark Stadium', 'Orchard Park', 'New York', 'USA', 71608, 1959, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Highmark_Stadium_collage.jpg/960px-Highmark_Stadium_collage.jpg'),
  ('Bank of America Stadium', 'Charlotte', 'North Carolina', 'USA', 74445, 1995, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Aerial_view_of_Bank_of_America_Stadium_in_Charlotte.jpg/960px-Aerial_view_of_Bank_of_America_Stadium_in_Charlotte.jpg'),
  ('Soldier Field', 'Chicago', 'Illinois', 'USA', 61500, 1919, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Soldier_Field_S.jpg/960px-Soldier_Field_S.jpg'),
  ('Paycor Stadium', 'Cincinnati', 'Ohio', 'USA', 65535, 1967, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Paul_Brown_Stadium_interior_2017.jpg/960px-Paul_Brown_Stadium_interior_2017.jpg'),
  ('Huntington Bank Field', 'Cleveland', 'Ohio', 'USA', 67407, 1946, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/FirstEnergy_Stadium_50_yardline_panorama.png/960px-FirstEnergy_Stadium_50_yardline_panorama.png'),
  ('AT&T Stadium', 'Arlington', 'Texas', 'USA', 105121, 1960, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Arlington_June_2020_4_%28AT%26T_Stadium%29.jpg/960px-Arlington_June_2020_4_%28AT%26T_Stadium%29.jpg'),
  ('Empower Field at Mile High', 'Denver', 'Colorado', 'USA', 76125, 1960, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Empower_Field_at_Mile_High_20241001.jpg/960px-Empower_Field_at_Mile_High_20241001.jpg'),
  ('Lambeau Field', 'Green Bay', 'Wisconsin', 'USA', 80735, 1919, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Lambeau_Field_-_Green_Bay_Packers_Football_Stadium_-_Wisconsin.jpg/960px-Lambeau_Field_-_Green_Bay_Packers_Football_Stadium_-_Wisconsin.jpg'),
  ('NRG Stadium', 'Houston', 'Texas', 'USA', 71054, 2002, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/NRG_Stadium_SBLI.jpg/960px-NRG_Stadium_SBLI.jpg'),
  ('Lucas Oil Stadium', 'Indianapolis', 'Indiana', 'USA', 62421, 1953, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Aerial_view_of_Indianapolis%2C_Indiana%2C_with_a_focus_on_Lucas_Oil_Stadium%2C_highsm.40934.jpg/960px-Aerial_view_of_Indianapolis%2C_Indiana%2C_with_a_focus_on_Lucas_Oil_Stadium%2C_highsm.40934.jpg'),
  ('EverBank Stadium', 'Jacksonville', 'Florida', 'USA', 67246, 1993, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Everbank_Stadium_2024.jpg/960px-Everbank_Stadium_2024.jpg'),
  ('GEHA Field at Arrowhead Stadium', 'Kansas City', 'Missouri', 'USA', 76416, 1960, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Aerial_view_of_Arrowhead_Stadium_08-31-2013.jpg/960px-Aerial_view_of_Arrowhead_Stadium_08-31-2013.jpg'),
  ('Allegiant Stadium', 'Paradise', 'Nevada', 'USA', 65000, 1960, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Allegiant_Stadium_%28cropped%29.jpg/960px-Allegiant_Stadium_%28cropped%29.jpg'),
  ('SoFi Stadium', 'Inglewood', 'CA', 'USA', 70240, 1960, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/SoFi_Stadium_2023.jpg/960px-SoFi_Stadium_2023.jpg'),
  ('SoFi Stadium', 'Los Angeles', 'California', 'USA', 70240, 1936, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/SoFi_Stadium_2023.jpg/960px-SoFi_Stadium_2023.jpg'),
  ('U.S. Bank Stadium', 'Minneapolis', 'MN', 'USA', 66860, 1961, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/U.S._Bank_Stadium_2021-09-23.jpg/960px-U.S._Bank_Stadium_2021-09-23.jpg'),
  ('Gillette Stadium', 'Foxborough', 'Massachusetts', 'USA', 68756, 1959, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Gillette_Stadium_%28Top_View%29.jpg/960px-Gillette_Stadium_%28Top_View%29.jpg'),
  ('Caesars Superdome', 'New Orleans', 'Louisiana', 'USA', 73208, 1966, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/DHS_Agencies_Support_Super_Bowl_LIX_Security_February_2025_-_108.jpg/960px-DHS_Agencies_Support_Super_Bowl_LIX_Security_February_2025_-_108.jpg'),
  ('MetLife Stadium', 'East Rutherford', 'New Jersey', 'USA', 82566, 1925, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Metlife_stadium_%28Aerial_view%29.jpg/960px-Metlife_stadium_%28Aerial_view%29.jpg'),
  ('Lincoln Financial Field', 'Philadelphia', 'Pennsylvania', 'USA', 69176, 1933, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Lincoln_Financial_Field_%28Aerial_view%29.jpg/960px-Lincoln_Financial_Field_%28Aerial_view%29.jpg'),
  ('Acrisure Stadium', 'Pittsburgh', 'Pennsylvania', 'USA', 65500, 1933, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Acrisure_Stadium_2024.jpg/960px-Acrisure_Stadium_2024.jpg'),
  ('Lumen Field', 'Seattle', 'Washington', 'USA', 67000, 1974, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Qwest_Field_North.jpg/960px-Qwest_Field_North.jpg'),
  ('Nissan Stadium Nashville', 'Nashville', 'Tennessee', 'USA', 69143, 1960, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Nissan_Stadium_2017.jpg/960px-Nissan_Stadium_2017.jpg'),
  ('Northwest Stadium', 'Landover', 'Maryland', 'USA', 79000, 1932, 'OPEN', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Commanders_vs_Giants_%2853345178211%29.jpg/960px-Commanders_vs_Giants_%2853345178211%29.jpg'),
  ('Spectrum Center', 'Charlotte', 'NC', 'USA', 19077, 2005, 'DOME', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Spectrum_Center_2018.jpg/960px-Spectrum_Center_2018.jpg'),
  ('Allianz Field', 'Saint Paul', 'MN', 'USA', 19400, 2019, 'OPEN', NULL),
  ('GEODIS Park', 'Nashville', 'TN', 'USA', 30000, 2022, 'OPEN', NULL),
  ('Michigan Stadium', 'Ann Arbor', 'MI', 'USA', 107601, 1927, 'OPEN', NULL),
  ('Ohio Stadium', 'Columbus', 'OH', 'USA', 102780, 1922, 'OPEN', NULL),
  ('Neyland Stadium', 'Knoxville', 'TN', 'USA', 101915, 1921, 'OPEN', NULL),
  ('Tiger Stadium', 'Baton Rouge', 'LA', 'USA', 102321, 1924, 'OPEN', NULL),
  ('Rose Bowl', 'Pasadena', 'CA', 'USA', 88565, 1922, 'OPEN', NULL),
  ('Bryant-Denny Stadium', 'Tuscaloosa', 'AL', 'USA', 100077, 1929, 'OPEN', NULL)
ON CONFLICT (name, city) DO NOTHING;

-- ========================
-- Teams -> teams table
-- ========================
INSERT INTO teams (name, sport, stadium_id)
VALUES
  ('Atlanta Hawks', 'NBA', (SELECT id FROM stadiums WHERE name='State Farm Arena' AND city='Atlanta' LIMIT 1)),
  ('Boston Celtics', 'NBA', (SELECT id FROM stadiums WHERE name='TD Garden' AND city='Boston' LIMIT 1)),
  ('Brooklyn Nets', 'NBA', (SELECT id FROM stadiums WHERE name='Barclays Center' AND city='Brooklyn' LIMIT 1)),
  ('Charlotte Hornets', 'NBA', (SELECT id FROM stadiums WHERE name='Spectrum Center' AND city='Charlotte' LIMIT 1)),
  ('Chicago Bulls', 'NBA', (SELECT id FROM stadiums WHERE name='United Center' AND city='Chicago' LIMIT 1)),
  ('Cleveland Cavaliers', 'NBA', (SELECT id FROM stadiums WHERE name='Rocket Mortgage FieldHouse' AND city='Cleveland' LIMIT 1)),
  ('Dallas Mavericks', 'NBA', (SELECT id FROM stadiums WHERE name='American Airlines Center' AND city='Dallas' LIMIT 1)),
  ('Denver Nuggets', 'NBA', (SELECT id FROM stadiums WHERE name='Ball Arena' AND city='Denver' LIMIT 1)),
  ('Detroit Pistons', 'NBA', (SELECT id FROM stadiums WHERE name='Little Caesars Arena' AND city='Detroit' LIMIT 1)),
  ('Golden State Warriors', 'NBA', (SELECT id FROM stadiums WHERE name='Chase Center' AND city='San Francisco' LIMIT 1)),
  ('Houston Rockets', 'NBA', (SELECT id FROM stadiums WHERE name='Toyota Center' AND city='Houston' LIMIT 1)),
  ('Indiana Pacers', 'NBA', (SELECT id FROM stadiums WHERE name='Gainbridge Fieldhouse' AND city='Indianapolis' LIMIT 1)),
  ('Los Angeles Clippers', 'NBA', (SELECT id FROM stadiums WHERE name='Crypto.com Arena' AND city='Los Angeles' LIMIT 1)),
  ('Los Angeles Lakers', 'NBA', (SELECT id FROM stadiums WHERE name='Crypto.com Arena' AND city='Los Angeles' LIMIT 1)),
  ('Memphis Grizzlies', 'NBA', (SELECT id FROM stadiums WHERE name='FedExForum' AND city='Memphis' LIMIT 1)),
  ('Miami Heat', 'NBA', (SELECT id FROM stadiums WHERE name='Kaseya Center' AND city='Miami' LIMIT 1)),
  ('Milwaukee Bucks', 'NBA', (SELECT id FROM stadiums WHERE name='Fiserv Forum' AND city='Milwaukee' LIMIT 1)),
  ('Minnesota Timberwolves', 'NBA', (SELECT id FROM stadiums WHERE name='Target Center' AND city='Minneapolis' LIMIT 1)),
  ('New Orleans Pelicans', 'NBA', (SELECT id FROM stadiums WHERE name='Smoothie King Center' AND city='New Orleans' LIMIT 1)),
  ('New York Knicks', 'NBA', (SELECT id FROM stadiums WHERE name='Madison Square Garden' AND city='New York' LIMIT 1)),
  ('Oklahoma City Thunder', 'NBA', (SELECT id FROM stadiums WHERE name='Paycom Center' AND city='Oklahoma City' LIMIT 1)),
  ('Orlando Magic', 'NBA', (SELECT id FROM stadiums WHERE name='Amway Center' AND city='Orlando' LIMIT 1)),
  ('Philadelphia 76ers', 'NBA', (SELECT id FROM stadiums WHERE name='Wells Fargo Center' AND city='Philadelphia' LIMIT 1)),
  ('Phoenix Suns', 'NBA', (SELECT id FROM stadiums WHERE name='Footprint Center' AND city='Phoenix' LIMIT 1)),
  ('Portland Trail Blazers', 'NBA', (SELECT id FROM stadiums WHERE name='Moda Center' AND city='Portland' LIMIT 1)),
  ('Sacramento Kings', 'NBA', (SELECT id FROM stadiums WHERE name='Golden 1 Center' AND city='Sacramento' LIMIT 1)),
  ('San Antonio Spurs', 'NBA', (SELECT id FROM stadiums WHERE name='Frost Bank Center' AND city='San Antonio' LIMIT 1)),
  ('Toronto Raptors', 'NBA', (SELECT id FROM stadiums WHERE name='Scotiabank Arena' AND city='Toronto' LIMIT 1)),
  ('Utah Jazz', 'NBA', (SELECT id FROM stadiums WHERE name='Delta Center' AND city='Salt Lake City' LIMIT 1)),
  ('Washington Wizards', 'NBA', (SELECT id FROM stadiums WHERE name='Capital One Arena' AND city='Washington' LIMIT 1)),
  ('Arizona Diamondbacks', 'MLB', (SELECT id FROM stadiums WHERE name='Chase Field' AND city='Phoenix' LIMIT 1)),
  ('Atlanta Braves', 'MLB', (SELECT id FROM stadiums WHERE name='Truist Park' AND city='Atlanta' LIMIT 1)),
  ('Baltimore Orioles', 'MLB', (SELECT id FROM stadiums WHERE name='Oriole Park at Camden Yards' AND city='Baltimore' LIMIT 1)),
  ('Boston Red Sox', 'MLB', (SELECT id FROM stadiums WHERE name='Fenway Park' AND city='Boston' LIMIT 1)),
  ('Chicago Cubs', 'MLB', (SELECT id FROM stadiums WHERE name='Wrigley Field' AND city='Chicago' LIMIT 1)),
  ('Chicago White Sox', 'MLB', (SELECT id FROM stadiums WHERE name='Guaranteed Rate Field' AND city='Chicago' LIMIT 1)),
  ('Cincinnati Reds', 'MLB', (SELECT id FROM stadiums WHERE name='Great American Ball Park' AND city='Cincinnati' LIMIT 1)),
  ('Cleveland Guardians', 'MLB', (SELECT id FROM stadiums WHERE name='Progressive Field' AND city='Cleveland' LIMIT 1)),
  ('Colorado Rockies', 'MLB', (SELECT id FROM stadiums WHERE name='Coors Field' AND city='Denver' LIMIT 1)),
  ('Detroit Tigers', 'MLB', (SELECT id FROM stadiums WHERE name='Comerica Park' AND city='Detroit' LIMIT 1)),
  ('Houston Astros', 'MLB', (SELECT id FROM stadiums WHERE name='Minute Maid Park' AND city='Houston' LIMIT 1)),
  ('Kansas City Royals', 'MLB', (SELECT id FROM stadiums WHERE name='Kauffman Stadium' AND city='Kansas City' LIMIT 1)),
  ('Los Angeles Angels', 'MLB', (SELECT id FROM stadiums WHERE name='Angel Stadium' AND city='Anaheim' LIMIT 1)),
  ('Los Angeles Dodgers', 'MLB', (SELECT id FROM stadiums WHERE name='Dodger Stadium' AND city='Los Angeles' LIMIT 1)),
  ('Miami Marlins', 'MLB', (SELECT id FROM stadiums WHERE name='loanDepot Park' AND city='Miami' LIMIT 1)),
  ('Milwaukee Brewers', 'MLB', (SELECT id FROM stadiums WHERE name='American Family Field' AND city='Milwaukee' LIMIT 1)),
  ('Minnesota Twins', 'MLB', (SELECT id FROM stadiums WHERE name='Target Field' AND city='Minneapolis' LIMIT 1)),
  ('New York Mets', 'MLB', (SELECT id FROM stadiums WHERE name='Citi Field' AND city='New York' LIMIT 1)),
  ('New York Yankees', 'MLB', (SELECT id FROM stadiums WHERE name='Yankee Stadium' AND city='Bronx' LIMIT 1)),
  ('Oakland Athletics', 'MLB', (SELECT id FROM stadiums WHERE name='Oakland Coliseum' AND city='Oakland' LIMIT 1)),
  ('Philadelphia Phillies', 'MLB', (SELECT id FROM stadiums WHERE name='Citizens Bank Park' AND city='Philadelphia' LIMIT 1)),
  ('Pittsburgh Pirates', 'MLB', (SELECT id FROM stadiums WHERE name='PNC Park' AND city='Pittsburgh' LIMIT 1)),
  ('San Diego Padres', 'MLB', (SELECT id FROM stadiums WHERE name='Petco Park' AND city='San Diego' LIMIT 1)),
  ('San Francisco Giants', 'MLB', (SELECT id FROM stadiums WHERE name='Oracle Park' AND city='San Francisco' LIMIT 1)),
  ('Seattle Mariners', 'MLB', (SELECT id FROM stadiums WHERE name='T-Mobile Park' AND city='Seattle' LIMIT 1)),
  ('St. Louis Cardinals', 'MLB', (SELECT id FROM stadiums WHERE name='Busch Stadium' AND city='St. Louis' LIMIT 1)),
  ('Tampa Bay Rays', 'MLB', (SELECT id FROM stadiums WHERE name='Tropicana Field' AND city='St. Petersburg' LIMIT 1)),
  ('Texas Rangers', 'MLB', (SELECT id FROM stadiums WHERE name='Globe Life Field' AND city='Arlington' LIMIT 1)),
  ('Toronto Blue Jays', 'MLB', (SELECT id FROM stadiums WHERE name='Rogers Centre' AND city='Toronto' LIMIT 1)),
  ('Washington Nationals', 'MLB', (SELECT id FROM stadiums WHERE name='Nationals Park' AND city='Washington' LIMIT 1)),
  ('Anaheim Ducks', 'NHL', (SELECT id FROM stadiums WHERE name='Honda Center' AND city='Anaheim' LIMIT 1)),
  ('Arizona Coyotes', 'NHL', (SELECT id FROM stadiums WHERE name='Mullett Arena' AND city='Tempe' LIMIT 1)),
  ('Boston Bruins', 'NHL', (SELECT id FROM stadiums WHERE name='TD Garden' AND city='Boston' LIMIT 1)),
  ('Buffalo Sabres', 'NHL', (SELECT id FROM stadiums WHERE name='KeyBank Center' AND city='Buffalo' LIMIT 1)),
  ('Calgary Flames', 'NHL', (SELECT id FROM stadiums WHERE name='Scotiabank Saddledome' AND city='Calgary' LIMIT 1)),
  ('Carolina Hurricanes', 'NHL', (SELECT id FROM stadiums WHERE name='PNC Arena' AND city='Raleigh' LIMIT 1)),
  ('Chicago Blackhawks', 'NHL', (SELECT id FROM stadiums WHERE name='United Center' AND city='Chicago' LIMIT 1)),
  ('Colorado Avalanche', 'NHL', (SELECT id FROM stadiums WHERE name='Ball Arena' AND city='Denver' LIMIT 1)),
  ('Columbus Blue Jackets', 'NHL', (SELECT id FROM stadiums WHERE name='Nationwide Arena' AND city='Columbus' LIMIT 1)),
  ('Dallas Stars', 'NHL', (SELECT id FROM stadiums WHERE name='American Airlines Center' AND city='Dallas' LIMIT 1)),
  ('Detroit Red Wings', 'NHL', (SELECT id FROM stadiums WHERE name='Little Caesars Arena' AND city='Detroit' LIMIT 1)),
  ('Edmonton Oilers', 'NHL', (SELECT id FROM stadiums WHERE name='Rogers Place' AND city='Edmonton' LIMIT 1)),
  ('Florida Panthers', 'NHL', (SELECT id FROM stadiums WHERE name='Amerant Bank Arena' AND city='Sunrise' LIMIT 1)),
  ('Los Angeles Kings', 'NHL', (SELECT id FROM stadiums WHERE name='Crypto.com Arena' AND city='Los Angeles' LIMIT 1)),
  ('Minnesota Wild', 'NHL', (SELECT id FROM stadiums WHERE name='Xcel Energy Center' AND city='St. Paul' LIMIT 1)),
  ('Montreal Canadiens', 'NHL', (SELECT id FROM stadiums WHERE name='Bell Centre' AND city='Montreal' LIMIT 1)),
  ('Nashville Predators', 'NHL', (SELECT id FROM stadiums WHERE name='Bridgestone Arena' AND city='Nashville' LIMIT 1)),
  ('New Jersey Devils', 'NHL', (SELECT id FROM stadiums WHERE name='Prudential Center' AND city='Newark' LIMIT 1)),
  ('New York Islanders', 'NHL', (SELECT id FROM stadiums WHERE name='UBS Arena' AND city='Elmont' LIMIT 1)),
  ('New York Rangers', 'NHL', (SELECT id FROM stadiums WHERE name='Madison Square Garden' AND city='New York' LIMIT 1)),
  ('Ottawa Senators', 'NHL', (SELECT id FROM stadiums WHERE name='Canadian Tire Centre' AND city='Ottawa' LIMIT 1)),
  ('Philadelphia Flyers', 'NHL', (SELECT id FROM stadiums WHERE name='Wells Fargo Center' AND city='Philadelphia' LIMIT 1)),
  ('Pittsburgh Penguins', 'NHL', (SELECT id FROM stadiums WHERE name='PPG Paints Arena' AND city='Pittsburgh' LIMIT 1)),
  ('San Jose Sharks', 'NHL', (SELECT id FROM stadiums WHERE name='SAP Center' AND city='San Jose' LIMIT 1)),
  ('Seattle Kraken', 'NHL', (SELECT id FROM stadiums WHERE name='Climate Pledge Arena' AND city='Seattle' LIMIT 1)),
  ('St. Louis Blues', 'NHL', (SELECT id FROM stadiums WHERE name='Enterprise Center' AND city='St. Louis' LIMIT 1)),
  ('Tampa Bay Lightning', 'NHL', (SELECT id FROM stadiums WHERE name='Amalie Arena' AND city='Tampa' LIMIT 1)),
  ('Toronto Maple Leafs', 'NHL', (SELECT id FROM stadiums WHERE name='Scotiabank Arena' AND city='Toronto' LIMIT 1)),
  ('Vancouver Canucks', 'NHL', (SELECT id FROM stadiums WHERE name='Rogers Arena' AND city='Vancouver' LIMIT 1)),
  ('Vegas Golden Knights', 'NHL', (SELECT id FROM stadiums WHERE name='T-Mobile Arena' AND city='Las Vegas' LIMIT 1)),
  ('Washington Capitals', 'NHL', (SELECT id FROM stadiums WHERE name='Capital One Arena' AND city='Washington' LIMIT 1)),
  ('Winnipeg Jets', 'NHL', (SELECT id FROM stadiums WHERE name='Canada Life Centre' AND city='Winnipeg' LIMIT 1)),
  ('Texas A&M Aggies', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Kyle Field' AND city='College Station' LIMIT 1)),
  ('Georgia Bulldogs', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Sanford Stadium' AND city='Athens' LIMIT 1)),
  ('Florida Gators', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Ben Hill Griffin Stadium' AND city='Gainesville' LIMIT 1)),
  ('Auburn Tigers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Jordan-Hare Stadium' AND city='Auburn' LIMIT 1)),
  ('South Carolina Gamecocks', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Williams-Brice Stadium' AND city='Columbia' LIMIT 1)),
  ('Ole Miss Rebels', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Vaught-Hemingway Stadium' AND city='Oxford' LIMIT 1)),
  ('Mississippi State Bulldogs', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Davis Wade Stadium' AND city='Starkville' LIMIT 1)),
  ('Arkansas Razorbacks', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Donald W. Reynolds Razorback Stadium' AND city='Fayetteville' LIMIT 1)),
  ('Kentucky Wildcats', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Kroger Field' AND city='Lexington' LIMIT 1)),
  ('Vanderbilt Commodores', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Vanderbilt Stadium' AND city='Nashville' LIMIT 1)),
  ('Texas Longhorns', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Texas Memorial Stadium' AND city='Austin' LIMIT 1)),
  ('Oklahoma Sooners', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Gaylord Family Oklahoma Memorial Stadium' AND city='Norman' LIMIT 1)),
  ('Missouri Tigers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Missouri Memorial Stadium' AND city='Columbia' LIMIT 1)),
  ('Nebraska Cornhuskers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Memorial Stadium' AND city='Lincoln' LIMIT 1)),
  ('Wisconsin Badgers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Camp Randall Stadium' AND city='Madison' LIMIT 1)),
  ('Iowa Hawkeyes', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Kinnick Stadium' AND city='Iowa City' LIMIT 1)),
  ('Illinois Fighting Illini', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Memorial Stadium' AND city='Champaign' LIMIT 1)),
  ('Purdue Boilermakers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Ross-Ade Stadium' AND city='West Lafayette' LIMIT 1)),
  ('Michigan State Spartans', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Spartan Stadium' AND city='East Lansing' LIMIT 1)),
  ('Minnesota Golden Gophers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='TCF Bank Stadium' AND city='Minneapolis' LIMIT 1)),
  ('Rutgers Scarlet Knights', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='SHI Stadium' AND city='Piscataway' LIMIT 1)),
  ('Maryland Terrapins', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Maryland Stadium' AND city='College Park' LIMIT 1)),
  ('Penn State Nittany Lions', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Beaver Stadium' AND city='University Park' LIMIT 1)),
  ('Indiana Hoosiers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Indiana Memorial Stadium' AND city='Bloomington' LIMIT 1)),
  ('Northwestern Wildcats', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Ryan Field' AND city='Evanston' LIMIT 1)),
  ('UCLA Bruins', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='UCLA Rose Bowl' AND city='Pasadena' LIMIT 1)),
  ('USC Trojans', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Los Angeles Memorial Coliseum' AND city='Los Angeles' LIMIT 1)),
  ('Oregon Ducks', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Autzen Stadium' AND city='Eugene' LIMIT 1)),
  ('Washington Huskies', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Husky Stadium' AND city='Seattle' LIMIT 1)),
  ('Florida State Seminoles', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Doak Campbell Stadium' AND city='Tallahassee' LIMIT 1)),
  ('Clemson Tigers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Memorial Stadium' AND city='Clemson' LIMIT 1)),
  ('Miami Hurricanes', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Hard Rock Stadium' AND city='Miami Gardens' LIMIT 1)),
  ('Virginia Tech Hokies', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Lane Stadium' AND city='Blacksburg' LIMIT 1)),
  ('NC State Wolfpack', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Carter-Finley Stadium' AND city='Raleigh' LIMIT 1)),
  ('North Carolina Tar Heels', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Kenan Memorial Stadium' AND city='Chapel Hill' LIMIT 1)),
  ('Duke Blue Devils', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Wallace Wade Stadium' AND city='Durham' LIMIT 1)),
  ('Virginia Cavaliers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Scott Stadium' AND city='Charlottesville' LIMIT 1)),
  ('Georgia Tech Yellow Jackets', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Bobby Dodd Stadium' AND city='Atlanta' LIMIT 1)),
  ('Louisville Cardinals', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Cardinal Stadium' AND city='Louisville' LIMIT 1)),
  ('Pittsburgh Panthers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Heinz Field' AND city='Pittsburgh' LIMIT 1)),
  ('Syracuse Orange', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Carrier Dome' AND city='Syracuse' LIMIT 1)),
  ('Boston College Eagles', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Alumni Stadium' AND city='Chestnut Hill' LIMIT 1)),
  ('Wake Forest Demon Deacons', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='BB&T Field' AND city='Winston-Salem' LIMIT 1)),
  ('Stanford Cardinal', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Stanford Stadium' AND city='Stanford' LIMIT 1)),
  ('California Golden Bears', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='California Memorial Stadium' AND city='Berkeley' LIMIT 1)),
  ('Nevada Wolf Pack', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Mountain West Stadium' AND city='Reno' LIMIT 1)),
  ('Oklahoma State Cowboys', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Boone Pickens Stadium' AND city='Stillwater' LIMIT 1)),
  ('Baylor Bears', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='McLane Stadium' AND city='Waco' LIMIT 1)),
  ('TCU Horned Frogs', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Amon G. Carter Stadium' AND city='Fort Worth' LIMIT 1)),
  ('Kansas State Wildcats', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Bill Snyder Family Stadium' AND city='Manhattan' LIMIT 1)),
  ('Iowa State Cyclones', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Jack Trice Stadium' AND city='Ames' LIMIT 1)),
  ('Kansas Jayhawks', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='David Booth Kansas Memorial Stadium' AND city='Lawrence' LIMIT 1)),
  ('Texas Tech Red Raiders', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Jones AT&T Stadium' AND city='Lubbock' LIMIT 1)),
  ('West Virginia Mountaineers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Mountaineer Field' AND city='Morgantown' LIMIT 1)),
  ('BYU Cougars', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='LaVell Edwards Stadium' AND city='Provo' LIMIT 1)),
  ('Utah Utes', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Rice-Eccles Stadium' AND city='Salt Lake City' LIMIT 1)),
  ('Arizona State Sun Devils', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Sun Devil Stadium' AND city='Tempe' LIMIT 1)),
  ('Arizona Wildcats', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Arizona Stadium' AND city='Tucson' LIMIT 1)),
  ('Colorado Buffaloes', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Folsom Field' AND city='Boulder' LIMIT 1)),
  ('Houston Cougars', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='TDECU Stadium' AND city='Houston' LIMIT 1)),
  ('Tulane Green Wave', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Yulman Stadium' AND city='New Orleans' LIMIT 1)),
  ('North Texas Mean Green', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Apogee Stadium' AND city='Denton' LIMIT 1)),
  ('Ball State Cardinals', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Scheumann Stadium' AND city='Muncie' LIMIT 1)),
  ('Notre Dame Fighting Irish', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Notre Dame Stadium' AND city='Notre Dame' LIMIT 1)),
  ('UCF Knights', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Spectrum Stadium' AND city='Orlando' LIMIT 1)),
  ('USF Bulls', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Raymond James Stadium' AND city='Tampa' LIMIT 1)),
  ('Cincinnati Bearcats', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Nippert Stadium' AND city='Cincinnati' LIMIT 1)),
  ('Memphis Tigers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Liberty Bowl Memorial Stadium' AND city='Memphis' LIMIT 1)),
  ('Boise State Broncos', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Albertsons Stadium' AND city='Boise' LIMIT 1)),
  ('San Diego State Aztecs', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='SDCCU Stadium' AND city='San Diego' LIMIT 1)),
  ('Utah State Aggies', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Maverik Stadium' AND city='Logan' LIMIT 1)),
  ('Wyoming Cowboys', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='War Memorial Stadium' AND city='Laramie' LIMIT 1)),
  ('Colorado State Rams', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Canvas Stadium' AND city='Fort Collins' LIMIT 1)),
  ('New Mexico Lobos', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Dreamstyle Stadium' AND city='Albuquerque' LIMIT 1)),
  ('UNLV Rebels', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Sam Boyd Stadium' AND city='Las Vegas' LIMIT 1)),
  ('Hawaii Rainbow Warriors', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Aloha Stadium' AND city='Honolulu' LIMIT 1)),
  ('Fresno State Bulldogs', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Bulldog Stadium' AND city='Fresno' LIMIT 1)),
  ('San Jose State Spartans', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Dignity Health Sports Park' AND city='Carson' LIMIT 1)),
  ('Akron Zips', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='InfoCision Stadium' AND city='Akron' LIMIT 1)),
  ('Toledo Rockets', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Glass Bowl' AND city='Toledo' LIMIT 1)),
  ('MAC Championship', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Ford Field' AND city='Detroit' LIMIT 1)),
  ('Duke Blue Devils', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Cameron Indoor Stadium' AND city='Durham' LIMIT 1)),
  ('Kentucky Wildcats', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Rupp Arena' AND city='Lexington' LIMIT 1)),
  ('North Carolina Tar Heels', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Dean E. Smith Center' AND city='Chapel Hill' LIMIT 1)),
  ('Kansas Jayhawks', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Allen Fieldhouse' AND city='Lawrence' LIMIT 1)),
  ('UCLA Bruins', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Pauley Pavilion' AND city='Los Angeles' LIMIT 1)),
  ('Indiana Hoosiers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Assembly Hall' AND city='Bloomington' LIMIT 1)),
  ('Syracuse Orange', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Carrier Dome' AND city='Syracuse' LIMIT 1)),
  ('Stanford Cardinal', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Maples Pavilion' AND city='Stanford' LIMIT 1)),
  ('Michigan Wolverines', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Crisler Center' AND city='Ann Arbor' LIMIT 1)),
  ('Ohio State Buckeyes', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Value City Arena' AND city='Columbus' LIMIT 1)),
  ('Michigan State Spartans', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Breslin Center' AND city='East Lansing' LIMIT 1)),
  ('Wisconsin Badgers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Kohl Center' AND city='Madison' LIMIT 1)),
  ('Purdue Boilermakers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Mackey Arena' AND city='West Lafayette' LIMIT 1)),
  ('Iowa Hawkeyes', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Carver-Hawkeye Arena' AND city='Iowa City' LIMIT 1)),
  ('Minnesota Golden Gophers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Williams Arena' AND city='Minneapolis' LIMIT 1)),
  ('Illinois Fighting Illini', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='State Farm Center' AND city='Champaign' LIMIT 1)),
  ('Nebraska Cornhuskers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Pinnacle Bank Arena' AND city='Lincoln' LIMIT 1)),
  ('Penn State Nittany Lions', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Bryce Jordan Center' AND city='University Park' LIMIT 1)),
  ('Northwestern Wildcats', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Welsh-Ryan Arena' AND city='Evanston' LIMIT 1)),
  ('Maryland Terrapins', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Xfinity Center' AND city='College Park' LIMIT 1)),
  ('Oregon Ducks', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Matthew Knight Arena' AND city='Eugene' LIMIT 1)),
  ('Washington Huskies', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Alaska Airlines Arena' AND city='Seattle' LIMIT 1)),
  ('USC Trojans', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Galen Center' AND city='Los Angeles' LIMIT 1)),
  ('Tennessee Volunteers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Thompson-Boling Arena' AND city='Knoxville' LIMIT 1)),
  ('Georgia Bulldogs', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Stegeman Coliseum' AND city='Athens' LIMIT 1)),
  ('Auburn Tigers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Auburn Arena' AND city='Auburn' LIMIT 1)),
  ('Alabama Crimson Tide', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Coleman Coliseum' AND city='Tuscaloosa' LIMIT 1)),
  ('LSU Tigers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Pete Maravich Assembly Center' AND city='Baton Rouge' LIMIT 1)),
  ('Texas A&M Aggies', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Reed Arena' AND city='College Station' LIMIT 1)),
  ('Mississippi State Bulldogs', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Humphrey Coliseum' AND city='Starkville' LIMIT 1)),
  ('Ole Miss Rebels', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='The Pavilion at Ole Miss' AND city='Oxford' LIMIT 1)),
  ('South Carolina Gamecocks', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Colonial Life Arena' AND city='Columbia' LIMIT 1)),
  ('Arkansas Razorbacks', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Bud Walton Arena' AND city='Fayetteville' LIMIT 1)),
  ('Vanderbilt Commodores', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Memorial Gymnasium' AND city='Nashville' LIMIT 1)),
  ('Texas Longhorns', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Frank Erwin Center' AND city='Austin' LIMIT 1)),
  ('Oklahoma Sooners', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Lloyd Noble Center' AND city='Norman' LIMIT 1)),
  ('Missouri Tigers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Mizzou Arena' AND city='Columbia' LIMIT 1)),
  ('Virginia Cavaliers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='John Paul Jones Arena' AND city='Charlottesville' LIMIT 1)),
  ('Virginia Tech Hokies', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Cassell Coliseum' AND city='Blacksburg' LIMIT 1)),
  ('Florida State Seminoles', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Donald L. Tucker Civic Center' AND city='Tallahassee' LIMIT 1)),
  ('Clemson Tigers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Littlejohn Coliseum' AND city='Clemson' LIMIT 1)),
  ('NC State Wolfpack', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='PNC Arena' AND city='Raleigh' LIMIT 1)),
  ('Miami Hurricanes', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Watsco Center' AND city='Coral Gables' LIMIT 1)),
  ('Georgia Tech Yellow Jackets', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='McCamish Pavilion' AND city='Atlanta' LIMIT 1)),
  ('Louisville Cardinals', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='KFC Yum! Center' AND city='Louisville' LIMIT 1)),
  ('Pittsburgh Panthers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Petersen Events Center' AND city='Pittsburgh' LIMIT 1)),
  ('Boston College Eagles', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Conte Forum' AND city='Chestnut Hill' LIMIT 1)),
  ('Wake Forest Demon Deacons', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Lawrence Joel Veterans Memorial Coliseum' AND city='Winston-Salem' LIMIT 1)),
  ('California Golden Bears', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Haas Pavilion' AND city='Berkeley' LIMIT 1)),
  ('Oklahoma State Cowboys', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Gallagher-Iba Arena' AND city='Stillwater' LIMIT 1)),
  ('Baylor Bears', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Foster Pavilion' AND city='Waco' LIMIT 1)),
  ('TCU Horned Frogs', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Ed and Rae Schollmaier Arena' AND city='Fort Worth' LIMIT 1)),
  ('Kansas State Wildcats', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Bramlage Coliseum' AND city='Manhattan' LIMIT 1)),
  ('Iowa State Cyclones', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Hilton Coliseum' AND city='Ames' LIMIT 1)),
  ('Texas Tech Red Raiders', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='United Supermarkets Arena' AND city='Lubbock' LIMIT 1)),
  ('West Virginia Mountaineers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='WVU Coliseum' AND city='Morgantown' LIMIT 1)),
  ('BYU Cougars', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Marriott Center' AND city='Provo' LIMIT 1)),
  ('Utah Utes', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Jon M. Huntsman Center' AND city='Salt Lake City' LIMIT 1)),
  ('Arizona State Sun Devils', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Desert Financial Arena' AND city='Tempe' LIMIT 1)),
  ('Arizona Wildcats', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='McKale Center' AND city='Tucson' LIMIT 1)),
  ('Colorado Buffaloes', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='CU Events Center' AND city='Boulder' LIMIT 1)),
  ('Houston Cougars', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Fertitta Center' AND city='Houston' LIMIT 1)),
  ('Tulane Green Wave', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Devlin Fieldhouse' AND city='New Orleans' LIMIT 1)),
  ('Notre Dame Fighting Irish', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Purcell Pavilion' AND city='Notre Dame' LIMIT 1)),
  ('Cincinnati Bearcats', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Fifth Third Arena' AND city='Cincinnati' LIMIT 1)),
  ('UCF Knights', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Addition Financial Arena' AND city='Orlando' LIMIT 1)),
  ('Memphis Tigers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='FedExForum' AND city='Memphis' LIMIT 1)),
  ('Creighton Bluejays', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Creighton CHI Health Center' AND city='Omaha' LIMIT 1)),
  ('Butler Bulldogs', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Hinkle Fieldhouse' AND city='Indianapolis' LIMIT 1)),
  ('Xavier Musketeers', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Cintas Center' AND city='Cincinnati' LIMIT 1)),
  ('Villanova Wildcats', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='The Pavilion' AND city='Villanova' LIMIT 1)),
  ('Seton Hall Pirates', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Prudential Center' AND city='Newark' LIMIT 1)),
  ('Georgetown Hoyas', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Capital One Arena' AND city='Washington' LIMIT 1)),
  ('Temple Owls', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Liacouras Center' AND city='Philadelphia' LIMIT 1)),
  ('Duquesne Dukes', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='PPG Paints Arena' AND city='Pittsburgh' LIMIT 1)),
  ('Richmond Spiders', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Robins Center' AND city='Richmond' LIMIT 1)),
  ('VCU Rams', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Stuart C. Siegel Center' AND city='Richmond' LIMIT 1)),
  ('Old Dominion Monarchs', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Ted Constant Convocation Center' AND city='Norfolk' LIMIT 1)),
  ('George Mason Patriots', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='EagleBank Arena' AND city='Fairfax' LIMIT 1)),
  ('Liberty Flames', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Vines Center' AND city='Lynchburg' LIMIT 1)),
  ('Boise State Broncos', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='ExtraMile Arena' AND city='Boise' LIMIT 1)),
  ('New Mexico Lobos', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='The Pit' AND city='Albuquerque' LIMIT 1)),
  ('San Diego State Aztecs', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Viejas Arena' AND city='San Diego' LIMIT 1)),
  ('UNLV Rebels', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Thomas & Mack Center' AND city='Las Vegas' LIMIT 1)),
  ('Fresno State Bulldogs', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Save Mart Center' AND city='Fresno' LIMIT 1)),
  ('Utah State Aggies', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Dee Glen Smith Spectrum' AND city='Logan' LIMIT 1)),
  ('Wyoming Cowboys', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Arena-Auditorium' AND city='Laramie' LIMIT 1)),
  ('Colorado State Rams', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Moby Arena' AND city='Fort Collins' LIMIT 1)),
  ('Hawaii Rainbow Warriors', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Stan Sheriff Center' AND city='Honolulu' LIMIT 1)),
  ('Portland Pilots', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Moda Center' AND city='Portland' LIMIT 1)),
  ('Gonzaga Bulldogs', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='McCarthy Athletic Center' AND city='Spokane' LIMIT 1)),
  ('WCC Tournament', 'NCAA_BASKETBALL', (SELECT id FROM stadiums WHERE name='Orleans Arena' AND city='Las Vegas' LIMIT 1)),
  ('Arizona Cardinals', 'NFL', (SELECT id FROM stadiums WHERE name='State Farm Stadium' AND city='Glendale' LIMIT 1)),
  ('Atlanta Falcons', 'NFL', (SELECT id FROM stadiums WHERE name='Mercedes-Benz Stadium' AND city='Atlanta' LIMIT 1)),
  ('Baltimore Ravens', 'NFL', (SELECT id FROM stadiums WHERE name='M&T Bank Stadium' AND city='Baltimore' LIMIT 1)),
  ('Buffalo Bills', 'NFL', (SELECT id FROM stadiums WHERE name='Highmark Stadium' AND city='Orchard Park' LIMIT 1)),
  ('Carolina Panthers', 'NFL', (SELECT id FROM stadiums WHERE name='Bank of America Stadium' AND city='Charlotte' LIMIT 1)),
  ('Chicago Bears', 'NFL', (SELECT id FROM stadiums WHERE name='Soldier Field' AND city='Chicago' LIMIT 1)),
  ('Cincinnati Bengals', 'NFL', (SELECT id FROM stadiums WHERE name='Paycor Stadium' AND city='Cincinnati' LIMIT 1)),
  ('Cleveland Browns', 'NFL', (SELECT id FROM stadiums WHERE name='Huntington Bank Field' AND city='Cleveland' LIMIT 1)),
  ('Dallas Cowboys', 'NFL', (SELECT id FROM stadiums WHERE name='AT&T Stadium' AND city='Arlington' LIMIT 1)),
  ('Denver Broncos', 'NFL', (SELECT id FROM stadiums WHERE name='Empower Field at Mile High' AND city='Denver' LIMIT 1)),
  ('Detroit Lions', 'NFL', (SELECT id FROM stadiums WHERE name='Ford Field' AND city='Detroit' LIMIT 1)),
  ('Green Bay Packers', 'NFL', (SELECT id FROM stadiums WHERE name='Lambeau Field' AND city='Green Bay' LIMIT 1)),
  ('Houston Texans', 'NFL', (SELECT id FROM stadiums WHERE name='NRG Stadium' AND city='Houston' LIMIT 1)),
  ('Indianapolis Colts', 'NFL', (SELECT id FROM stadiums WHERE name='Lucas Oil Stadium' AND city='Indianapolis' LIMIT 1)),
  ('Jacksonville Jaguars', 'NFL', (SELECT id FROM stadiums WHERE name='EverBank Stadium' AND city='Jacksonville' LIMIT 1)),
  ('Kansas City Chiefs', 'NFL', (SELECT id FROM stadiums WHERE name='GEHA Field at Arrowhead Stadium' AND city='Kansas City' LIMIT 1)),
  ('Las Vegas Raiders', 'NFL', (SELECT id FROM stadiums WHERE name='Allegiant Stadium' AND city='Paradise' LIMIT 1)),
  ('Los Angeles Chargers', 'NFL', (SELECT id FROM stadiums WHERE name='SoFi Stadium' AND city='Inglewood' LIMIT 1)),
  ('Los Angeles Rams', 'NFL', (SELECT id FROM stadiums WHERE name='SoFi Stadium' AND city='Los Angeles' LIMIT 1)),
  ('Miami Dolphins', 'NFL', (SELECT id FROM stadiums WHERE name='Hard Rock Stadium' AND city='Miami Gardens' LIMIT 1)),
  ('Minnesota Vikings', 'NFL', (SELECT id FROM stadiums WHERE name='U.S. Bank Stadium' AND city='Minneapolis' LIMIT 1)),
  ('New England Patriots', 'NFL', (SELECT id FROM stadiums WHERE name='Gillette Stadium' AND city='Foxborough' LIMIT 1)),
  ('New Orleans Saints', 'NFL', (SELECT id FROM stadiums WHERE name='Caesars Superdome' AND city='New Orleans' LIMIT 1)),
  ('New York Giants', 'NFL', (SELECT id FROM stadiums WHERE name='MetLife Stadium' AND city='East Rutherford' LIMIT 1)),
  ('Philadelphia Eagles', 'NFL', (SELECT id FROM stadiums WHERE name='Lincoln Financial Field' AND city='Philadelphia' LIMIT 1)),
  ('Pittsburgh Steelers', 'NFL', (SELECT id FROM stadiums WHERE name='Acrisure Stadium' AND city='Pittsburgh' LIMIT 1)),
  ('Seattle Seahawks', 'NFL', (SELECT id FROM stadiums WHERE name='Lumen Field' AND city='Seattle' LIMIT 1)),
  ('Tampa Bay Buccaneers', 'NFL', (SELECT id FROM stadiums WHERE name='Raymond James Stadium' AND city='Tampa' LIMIT 1)),
  ('Tennessee Titans', 'NFL', (SELECT id FROM stadiums WHERE name='Nissan Stadium Nashville' AND city='Nashville' LIMIT 1)),
  ('Washington Commanders', 'NFL', (SELECT id FROM stadiums WHERE name='Northwest Stadium' AND city='Landover' LIMIT 1)),
  ('Los Angeles Rams / Chargers', 'NFL', (SELECT id FROM stadiums WHERE name='SoFi Stadium' AND city='Inglewood' LIMIT 1)),
  ('Los Angeles Lakers / Clippers', 'NBA', (SELECT id FROM stadiums WHERE name='Crypto.com Arena' AND city='Los Angeles' LIMIT 1)),
  ('Atlanta United', 'MLS', (SELECT id FROM stadiums WHERE name='Mercedes-Benz Stadium' AND city='Atlanta' LIMIT 1)),
  ('Minnesota United', 'MLS', (SELECT id FROM stadiums WHERE name='Allianz Field' AND city='Saint Paul' LIMIT 1)),
  ('Nashville SC', 'MLS', (SELECT id FROM stadiums WHERE name='GEODIS Park' AND city='Nashville' LIMIT 1)),
  ('Michigan Wolverines', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Michigan Stadium' AND city='Ann Arbor' LIMIT 1)),
  ('Ohio State Buckeyes', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Ohio Stadium' AND city='Columbus' LIMIT 1)),
  ('Tennessee Volunteers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Neyland Stadium' AND city='Knoxville' LIMIT 1)),
  ('LSU Tigers', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Tiger Stadium' AND city='Baton Rouge' LIMIT 1)),
  ('Alabama Crimson Tide', 'NCAA_FOOTBALL', (SELECT id FROM stadiums WHERE name='Bryant-Denny Stadium' AND city='Tuscaloosa' LIMIT 1))
ON CONFLICT DO NOTHING;

-- ========================
-- Stadium Images
-- ========================
-- Seed stadium_images table with multiple images per stadium
-- Uses the existing image_url from stadiums table as primary, adds additional views
-- Run with: cat supabase/seed-stadium-images.sql | docker exec -i $(docker ps -qf "name=supabase_db") psql -U postgres

-- Helper: Insert primary image from existing stadium image_url for all NFL stadiums
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, image_url, name || ' - Main View', 'wikipedia', true, 0
FROM stadiums WHERE image_url IS NOT NULL;

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
'Exterior at dusk', 'wikipedia', false, 1 FROM stadiums WHERE name = 'Mercedes-Benz Stadium';
INSERT INTO stadium_images (stadium_id, image_url, caption, source, is_primary, display_order)
SELECT id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mercedes_Benz_Stadium_time_lapse.gif/640px-Mercedes_Benz_Stadium_time_lapse.gif',
'Retractable roof in action', 'wikipedia', false, 2 FROM stadiums WHERE name = 'Mercedes-Benz Stadium';

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

-- ========================
-- Sync team_name + sport back to stadiums (from teams table, primary team per venue)
-- ========================
UPDATE stadiums s
SET
  sport = t.sport,
  team_name = t.name,
  league = t.league
FROM (
  SELECT DISTINCT ON (stadium_id)
    stadium_id,
    sport,
    name,
    league
  FROM teams
  ORDER BY stadium_id, name
) t
WHERE s.id = t.stadium_id;

