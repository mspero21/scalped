-- Seed data for NCAA Football and Basketball venues

-- =====================================================
-- NCAA FOOTBALL STADIUMS (Power 4 + Notre Dame + Top G5)
-- =====================================================

INSERT INTO stadiums (name, city, state, country, sport, team_name, capacity, year_built, roof_type, image_url) VALUES

-- SEC
('Kyle Field', 'College Station', 'TX', 'USA', 'NCAA_FOOTBALL', 'Texas A&M Aggies', 102733, 1927, 'OPEN', NULL),
('Sanford Stadium', 'Athens', 'GA', 'USA', 'NCAA_FOOTBALL', 'Georgia Bulldogs', 92746, 1929, 'OPEN', NULL),
('Ben Hill Griffin Stadium', 'Gainesville', 'FL', 'USA', 'NCAA_FOOTBALL', 'Florida Gators', 88548, 1930, 'OPEN', NULL),
('Jordan-Hare Stadium', 'Auburn', 'AL', 'USA', 'NCAA_FOOTBALL', 'Auburn Tigers', 87451, 1939, 'OPEN', NULL),
('Williams-Brice Stadium', 'Columbia', 'SC', 'USA', 'NCAA_FOOTBALL', 'South Carolina Gamecocks', 77559, 1934, 'OPEN', NULL),
('Vaught-Hemingway Stadium', 'Oxford', 'MS', 'USA', 'NCAA_FOOTBALL', 'Ole Miss Rebels', 64038, 1915, 'OPEN', NULL),
('Davis Wade Stadium', 'Starkville', 'MS', 'USA', 'NCAA_FOOTBALL', 'Mississippi State Bulldogs', 61337, 1914, 'OPEN', NULL),
('Donald W. Reynolds Razorback Stadium', 'Fayetteville', 'AR', 'USA', 'NCAA_FOOTBALL', 'Arkansas Razorbacks', 76412, 1938, 'OPEN', NULL),
('Kroger Field', 'Lexington', 'KY', 'USA', 'NCAA_FOOTBALL', 'Kentucky Wildcats', 61000, 1973, 'OPEN', NULL),
('Vanderbilt Stadium', 'Nashville', 'TN', 'USA', 'NCAA_FOOTBALL', 'Vanderbilt Commodores', 40350, 1922, 'OPEN', NULL),
('Texas Memorial Stadium', 'Austin', 'TX', 'USA', 'NCAA_FOOTBALL', 'Texas Longhorns', 100119, 1924, 'OPEN', NULL),
('Gaylord Family Oklahoma Memorial Stadium', 'Norman', 'OK', 'USA', 'NCAA_FOOTBALL', 'Oklahoma Sooners', 80126, 1923, 'OPEN', NULL),
('Missouri Memorial Stadium', 'Columbia', 'MO', 'USA', 'NCAA_FOOTBALL', 'Missouri Tigers', 61621, 1926, 'OPEN', NULL),

-- Big Ten
('Memorial Stadium', 'Lincoln', 'NE', 'USA', 'NCAA_FOOTBALL', 'Nebraska Cornhuskers', 85458, 1923, 'OPEN', NULL),
('Camp Randall Stadium', 'Madison', 'WI', 'USA', 'NCAA_FOOTBALL', 'Wisconsin Badgers', 80321, 1917, 'OPEN', NULL),
('Kinnick Stadium', 'Iowa City', 'IA', 'USA', 'NCAA_FOOTBALL', 'Iowa Hawkeyes', 69250, 1929, 'OPEN', NULL),
('Memorial Stadium', 'Champaign', 'IL', 'USA', 'NCAA_FOOTBALL', 'Illinois Fighting Illini', 60670, 1923, 'OPEN', NULL),
('Ross-Ade Stadium', 'West Lafayette', 'IN', 'USA', 'NCAA_FOOTBALL', 'Purdue Boilermakers', 57236, 1924, 'OPEN', NULL),
('Spartan Stadium', 'East Lansing', 'MI', 'USA', 'NCAA_FOOTBALL', 'Michigan State Spartans', 75005, 1923, 'OPEN', NULL),
('TCF Bank Stadium', 'Minneapolis', 'MN', 'USA', 'NCAA_FOOTBALL', 'Minnesota Golden Gophers', 50805, 2009, 'OPEN', NULL),
('SHI Stadium', 'Piscataway', 'NJ', 'USA', 'NCAA_FOOTBALL', 'Rutgers Scarlet Knights', 52454, 1994, 'OPEN', NULL),
('Maryland Stadium', 'College Park', 'MD', 'USA', 'NCAA_FOOTBALL', 'Maryland Terrapins', 51802, 1950, 'OPEN', NULL),
('Beaver Stadium', 'University Park', 'PA', 'USA', 'NCAA_FOOTBALL', 'Penn State Nittany Lions', 106572, 1960, 'OPEN', NULL),
('Indiana Memorial Stadium', 'Bloomington', 'IN', 'USA', 'NCAA_FOOTBALL', 'Indiana Hoosiers', 52656, 1960, 'OPEN', NULL),
('Ryan Field', 'Evanston', 'IL', 'USA', 'NCAA_FOOTBALL', 'Northwestern Wildcats', 47130, 1926, 'OPEN', NULL),
('UCLA Rose Bowl', 'Pasadena', 'CA', 'USA', 'NCAA_FOOTBALL', 'UCLA Bruins', 88565, 1922, 'OPEN', NULL),
('Los Angeles Memorial Coliseum', 'Los Angeles', 'CA', 'USA', 'NCAA_FOOTBALL', 'USC Trojans', 77500, 1923, 'OPEN', NULL),
('Autzen Stadium', 'Eugene', 'OR', 'USA', 'NCAA_FOOTBALL', 'Oregon Ducks', 54000, 1967, 'OPEN', NULL),
('Husky Stadium', 'Seattle', 'WA', 'USA', 'NCAA_FOOTBALL', 'Washington Huskies', 70083, 1920, 'OPEN', NULL),

-- ACC
('Doak Campbell Stadium', 'Tallahassee', 'FL', 'USA', 'NCAA_FOOTBALL', 'Florida State Seminoles', 79560, 1950, 'OPEN', NULL),
('Memorial Stadium', 'Clemson', 'SC', 'USA', 'NCAA_FOOTBALL', 'Clemson Tigers', 81500, 1942, 'OPEN', NULL),
('Hard Rock Stadium', 'Miami Gardens', 'FL', 'USA', 'NCAA_FOOTBALL', 'Miami Hurricanes', 64767, 1987, 'OPEN', NULL),
('Lane Stadium', 'Blacksburg', 'VA', 'USA', 'NCAA_FOOTBALL', 'Virginia Tech Hokies', 66233, 1965, 'OPEN', NULL),
('Carter-Finley Stadium', 'Raleigh', 'NC', 'USA', 'NCAA_FOOTBALL', 'NC State Wolfpack', 57583, 1966, 'OPEN', NULL),
('Kenan Memorial Stadium', 'Chapel Hill', 'NC', 'USA', 'NCAA_FOOTBALL', 'North Carolina Tar Heels', 50500, 1927, 'OPEN', NULL),
('Wallace Wade Stadium', 'Durham', 'NC', 'USA', 'NCAA_FOOTBALL', 'Duke Blue Devils', 40004, 1929, 'OPEN', NULL),
('Scott Stadium', 'Charlottesville', 'VA', 'USA', 'NCAA_FOOTBALL', 'Virginia Cavaliers', 61500, 1931, 'OPEN', NULL),
('Bobby Dodd Stadium', 'Atlanta', 'GA', 'USA', 'NCAA_FOOTBALL', 'Georgia Tech Yellow Jackets', 55000, 1913, 'OPEN', NULL),
('Cardinal Stadium', 'Louisville', 'KY', 'USA', 'NCAA_FOOTBALL', 'Louisville Cardinals', 60800, 1998, 'OPEN', NULL),
('Heinz Field', 'Pittsburgh', 'PA', 'USA', 'NCAA_FOOTBALL', 'Pittsburgh Panthers', 68400, 2001, 'OPEN', NULL),
('Carrier Dome', 'Syracuse', 'NY', 'USA', 'NCAA_FOOTBALL', 'Syracuse Orange', 49057, 1980, 'DOME', NULL),
('Alumni Stadium', 'Chestnut Hill', 'MA', 'USA', 'NCAA_FOOTBALL', 'Boston College Eagles', 44500, 1957, 'OPEN', NULL),
('BB&T Field', 'Winston-Salem', 'NC', 'USA', 'NCAA_FOOTBALL', 'Wake Forest Demon Deacons', 31500, 1968, 'OPEN', NULL),
('Stanford Stadium', 'Stanford', 'CA', 'USA', 'NCAA_FOOTBALL', 'Stanford Cardinal', 50424, 1921, 'OPEN', NULL),
('California Memorial Stadium', 'Berkeley', 'CA', 'USA', 'NCAA_FOOTBALL', 'California Golden Bears', 62467, 1923, 'OPEN', NULL),
('Mountain West Stadium', 'Reno', 'NV', 'USA', 'NCAA_FOOTBALL', 'Nevada Wolf Pack', 26000, 1966, 'OPEN', NULL),

-- Big 12
('Boone Pickens Stadium', 'Stillwater', 'OK', 'USA', 'NCAA_FOOTBALL', 'Oklahoma State Cowboys', 55509, 1920, 'OPEN', NULL),
('McLane Stadium', 'Waco', 'TX', 'USA', 'NCAA_FOOTBALL', 'Baylor Bears', 45140, 2014, 'OPEN', NULL),
('Amon G. Carter Stadium', 'Fort Worth', 'TX', 'USA', 'NCAA_FOOTBALL', 'TCU Horned Frogs', 47000, 1930, 'OPEN', NULL),
('Bill Snyder Family Stadium', 'Manhattan', 'KS', 'USA', 'NCAA_FOOTBALL', 'Kansas State Wildcats', 50000, 1968, 'OPEN', NULL),
('Jack Trice Stadium', 'Ames', 'IA', 'USA', 'NCAA_FOOTBALL', 'Iowa State Cyclones', 61500, 1975, 'OPEN', NULL),
('David Booth Kansas Memorial Stadium', 'Lawrence', 'KS', 'USA', 'NCAA_FOOTBALL', 'Kansas Jayhawks', 47233, 1921, 'OPEN', NULL),
('Jones AT&T Stadium', 'Lubbock', 'TX', 'USA', 'NCAA_FOOTBALL', 'Texas Tech Red Raiders', 60454, 1947, 'OPEN', NULL),
('Mountaineer Field', 'Morgantown', 'WV', 'USA', 'NCAA_FOOTBALL', 'West Virginia Mountaineers', 60000, 1980, 'OPEN', NULL),
('LaVell Edwards Stadium', 'Provo', 'UT', 'USA', 'NCAA_FOOTBALL', 'BYU Cougars', 63470, 1964, 'OPEN', NULL),
('Rice-Eccles Stadium', 'Salt Lake City', 'UT', 'USA', 'NCAA_FOOTBALL', 'Utah Utes', 51444, 1927, 'OPEN', NULL),
('Sun Devil Stadium', 'Tempe', 'AZ', 'USA', 'NCAA_FOOTBALL', 'Arizona State Sun Devils', 53599, 1958, 'OPEN', NULL),
('Arizona Stadium', 'Tucson', 'AZ', 'USA', 'NCAA_FOOTBALL', 'Arizona Wildcats', 50782, 1928, 'OPEN', NULL),
('Folsom Field', 'Boulder', 'CO', 'USA', 'NCAA_FOOTBALL', 'Colorado Buffaloes', 50183, 1924, 'OPEN', NULL),
('TDECU Stadium', 'Houston', 'TX', 'USA', 'NCAA_FOOTBALL', 'Houston Cougars', 40000, 2014, 'OPEN', NULL),
('Yulman Stadium', 'New Orleans', 'LA', 'USA', 'NCAA_FOOTBALL', 'Tulane Green Wave', 30000, 2014, 'OPEN', NULL),
('Apogee Stadium', 'Denton', 'TX', 'USA', 'NCAA_FOOTBALL', 'North Texas Mean Green', 30850, 2011, 'OPEN', NULL),
('Scheumann Stadium', 'Muncie', 'IN', 'USA', 'NCAA_FOOTBALL', 'Ball State Cardinals', 22500, 1967, 'OPEN', NULL),

-- Notre Dame (Independent)
('Notre Dame Stadium', 'Notre Dame', 'IN', 'USA', 'NCAA_FOOTBALL', 'Notre Dame Fighting Irish', 77622, 1930, 'OPEN', NULL),

-- Top Group of 5
('Spectrum Stadium', 'Orlando', 'FL', 'USA', 'NCAA_FOOTBALL', 'UCF Knights', 44206, 2007, 'OPEN', NULL),
('Raymond James Stadium', 'Tampa', 'FL', 'USA', 'NCAA_FOOTBALL', 'USF Bulls', 65890, 1998, 'OPEN', NULL),
('Nippert Stadium', 'Cincinnati', 'OH', 'USA', 'NCAA_FOOTBALL', 'Cincinnati Bearcats', 40000, 1915, 'OPEN', NULL),
('Liberty Bowl Memorial Stadium', 'Memphis', 'TN', 'USA', 'NCAA_FOOTBALL', 'Memphis Tigers', 58325, 1965, 'OPEN', NULL),
('Albertsons Stadium', 'Boise', 'ID', 'USA', 'NCAA_FOOTBALL', 'Boise State Broncos', 36387, 1970, 'OPEN', NULL),
('SDCCU Stadium', 'San Diego', 'CA', 'USA', 'NCAA_FOOTBALL', 'San Diego State Aztecs', 35000, 1967, 'OPEN', NULL),
('Maverik Stadium', 'Logan', 'UT', 'USA', 'NCAA_FOOTBALL', 'Utah State Aggies', 25513, 1968, 'OPEN', NULL),
('War Memorial Stadium', 'Laramie', 'WY', 'USA', 'NCAA_FOOTBALL', 'Wyoming Cowboys', 29181, 1950, 'OPEN', NULL),
('Canvas Stadium', 'Fort Collins', 'CO', 'USA', 'NCAA_FOOTBALL', 'Colorado State Rams', 36500, 2017, 'OPEN', NULL),
('Dreamstyle Stadium', 'Albuquerque', 'NM', 'USA', 'NCAA_FOOTBALL', 'New Mexico Lobos', 39224, 1960, 'OPEN', NULL),
('Sam Boyd Stadium', 'Las Vegas', 'NV', 'USA', 'NCAA_FOOTBALL', 'UNLV Rebels', 40000, 1971, 'OPEN', NULL),
('Aloha Stadium', 'Honolulu', 'HI', 'USA', 'NCAA_FOOTBALL', 'Hawaii Rainbow Warriors', 50000, 1975, 'OPEN', NULL),
('Bulldog Stadium', 'Fresno', 'CA', 'USA', 'NCAA_FOOTBALL', 'Fresno State Bulldogs', 40727, 1980, 'OPEN', NULL),
('Dignity Health Sports Park', 'Carson', 'CA', 'USA', 'NCAA_FOOTBALL', 'San Jose State Spartans', 27000, 2003, 'OPEN', NULL),
('InfoCision Stadium', 'Akron', 'OH', 'USA', 'NCAA_FOOTBALL', 'Akron Zips', 30000, 2009, 'OPEN', NULL),
('Glass Bowl', 'Toledo', 'OH', 'USA', 'NCAA_FOOTBALL', 'Toledo Rockets', 26038, 1937, 'OPEN', NULL),
('Ford Field', 'Detroit', 'MI', 'USA', 'NCAA_FOOTBALL', 'MAC Championship', 65000, 2002, 'DOME', NULL)

ON CONFLICT DO NOTHING;

-- =====================================================
-- NCAA BASKETBALL ARENAS (Power Conferences + Top Programs)
-- =====================================================

INSERT INTO stadiums (name, city, state, country, sport, team_name, capacity, year_built, roof_type, image_url) VALUES

-- Blue Bloods & Elite Programs
('Cameron Indoor Stadium', 'Durham', 'NC', 'USA', 'NCAA_BASKETBALL', 'Duke Blue Devils', 9314, 1940, 'DOME', NULL),
('Rupp Arena', 'Lexington', 'KY', 'USA', 'NCAA_BASKETBALL', 'Kentucky Wildcats', 20545, 1976, 'DOME', NULL),
('Dean E. Smith Center', 'Chapel Hill', 'NC', 'USA', 'NCAA_BASKETBALL', 'North Carolina Tar Heels', 21750, 1986, 'DOME', NULL),
('Allen Fieldhouse', 'Lawrence', 'KS', 'USA', 'NCAA_BASKETBALL', 'Kansas Jayhawks', 16300, 1955, 'DOME', NULL),
('Pauley Pavilion', 'Los Angeles', 'CA', 'USA', 'NCAA_BASKETBALL', 'UCLA Bruins', 13800, 1965, 'DOME', NULL),
('Assembly Hall', 'Bloomington', 'IN', 'USA', 'NCAA_BASKETBALL', 'Indiana Hoosiers', 17222, 1971, 'DOME', NULL),
('Carrier Dome', 'Syracuse', 'NY', 'USA', 'NCAA_BASKETBALL', 'Syracuse Orange', 35446, 1980, 'DOME', NULL),
('Maples Pavilion', 'Stanford', 'CA', 'USA', 'NCAA_BASKETBALL', 'Stanford Cardinal', 7391, 1969, 'DOME', NULL),

-- Big Ten
('Crisler Center', 'Ann Arbor', 'MI', 'USA', 'NCAA_BASKETBALL', 'Michigan Wolverines', 12707, 1967, 'DOME', NULL),
('Value City Arena', 'Columbus', 'OH', 'USA', 'NCAA_BASKETBALL', 'Ohio State Buckeyes', 19500, 1998, 'DOME', NULL),
('Breslin Center', 'East Lansing', 'MI', 'USA', 'NCAA_BASKETBALL', 'Michigan State Spartans', 14797, 1989, 'DOME', NULL),
('Kohl Center', 'Madison', 'WI', 'USA', 'NCAA_BASKETBALL', 'Wisconsin Badgers', 17287, 1998, 'DOME', NULL),
('Mackey Arena', 'West Lafayette', 'IN', 'USA', 'NCAA_BASKETBALL', 'Purdue Boilermakers', 14804, 1967, 'DOME', NULL),
('Carver-Hawkeye Arena', 'Iowa City', 'IA', 'USA', 'NCAA_BASKETBALL', 'Iowa Hawkeyes', 15500, 1983, 'DOME', NULL),
('Williams Arena', 'Minneapolis', 'MN', 'USA', 'NCAA_BASKETBALL', 'Minnesota Golden Gophers', 14625, 1928, 'DOME', NULL),
('State Farm Center', 'Champaign', 'IL', 'USA', 'NCAA_BASKETBALL', 'Illinois Fighting Illini', 15500, 1963, 'DOME', NULL),
('Pinnacle Bank Arena', 'Lincoln', 'NE', 'USA', 'NCAA_BASKETBALL', 'Nebraska Cornhuskers', 15500, 2013, 'DOME', NULL),
('Bryce Jordan Center', 'University Park', 'PA', 'USA', 'NCAA_BASKETBALL', 'Penn State Nittany Lions', 15261, 1996, 'DOME', NULL),
('Welsh-Ryan Arena', 'Evanston', 'IL', 'USA', 'NCAA_BASKETBALL', 'Northwestern Wildcats', 8117, 1952, 'DOME', NULL),
('Jersey Mike''s Arena', 'Piscataway', 'NJ', 'USA', 'NCAA_BASKETBALL', 'Rutgers Scarlet Knights', 8000, 1977, 'DOME', NULL),
('Xfinity Center', 'College Park', 'MD', 'USA', 'NCAA_BASKETBALL', 'Maryland Terrapins', 17950, 2002, 'DOME', NULL),
('Matthew Knight Arena', 'Eugene', 'OR', 'USA', 'NCAA_BASKETBALL', 'Oregon Ducks', 12364, 2011, 'DOME', NULL),
('Alaska Airlines Arena', 'Seattle', 'WA', 'USA', 'NCAA_BASKETBALL', 'Washington Huskies', 10000, 1999, 'DOME', NULL),
('Galen Center', 'Los Angeles', 'CA', 'USA', 'NCAA_BASKETBALL', 'USC Trojans', 10258, 2006, 'DOME', NULL),

-- SEC
('Thompson-Boling Arena', 'Knoxville', 'TN', 'USA', 'NCAA_BASKETBALL', 'Tennessee Volunteers', 21678, 1987, 'DOME', NULL),
('Stegeman Coliseum', 'Athens', 'GA', 'USA', 'NCAA_BASKETBALL', 'Georgia Bulldogs', 10523, 1964, 'DOME', NULL),
('Stephen C. O''Connell Center', 'Gainesville', 'FL', 'USA', 'NCAA_BASKETBALL', 'Florida Gators', 10133, 1980, 'DOME', NULL),
('Auburn Arena', 'Auburn', 'AL', 'USA', 'NCAA_BASKETBALL', 'Auburn Tigers', 9121, 2010, 'DOME', NULL),
('Coleman Coliseum', 'Tuscaloosa', 'AL', 'USA', 'NCAA_BASKETBALL', 'Alabama Crimson Tide', 15383, 1968, 'DOME', NULL),
('Pete Maravich Assembly Center', 'Baton Rouge', 'LA', 'USA', 'NCAA_BASKETBALL', 'LSU Tigers', 13215, 1972, 'DOME', NULL),
('Reed Arena', 'College Station', 'TX', 'USA', 'NCAA_BASKETBALL', 'Texas A&M Aggies', 12989, 1998, 'DOME', NULL),
('Humphrey Coliseum', 'Starkville', 'MS', 'USA', 'NCAA_BASKETBALL', 'Mississippi State Bulldogs', 10500, 1975, 'DOME', NULL),
('The Pavilion at Ole Miss', 'Oxford', 'MS', 'USA', 'NCAA_BASKETBALL', 'Ole Miss Rebels', 9500, 2016, 'DOME', NULL),
('Colonial Life Arena', 'Columbia', 'SC', 'USA', 'NCAA_BASKETBALL', 'South Carolina Gamecocks', 18000, 2002, 'DOME', NULL),
('Bud Walton Arena', 'Fayetteville', 'AR', 'USA', 'NCAA_BASKETBALL', 'Arkansas Razorbacks', 19200, 1993, 'DOME', NULL),
('Memorial Gymnasium', 'Nashville', 'TN', 'USA', 'NCAA_BASKETBALL', 'Vanderbilt Commodores', 14316, 1952, 'DOME', NULL),
('Frank Erwin Center', 'Austin', 'TX', 'USA', 'NCAA_BASKETBALL', 'Texas Longhorns', 16540, 1977, 'DOME', NULL),
('Lloyd Noble Center', 'Norman', 'OK', 'USA', 'NCAA_BASKETBALL', 'Oklahoma Sooners', 11528, 1975, 'DOME', NULL),
('Mizzou Arena', 'Columbia', 'MO', 'USA', 'NCAA_BASKETBALL', 'Missouri Tigers', 15061, 2004, 'DOME', NULL),

-- ACC
('John Paul Jones Arena', 'Charlottesville', 'VA', 'USA', 'NCAA_BASKETBALL', 'Virginia Cavaliers', 14593, 2006, 'DOME', NULL),
('Cassell Coliseum', 'Blacksburg', 'VA', 'USA', 'NCAA_BASKETBALL', 'Virginia Tech Hokies', 10052, 1962, 'DOME', NULL),
('Donald L. Tucker Civic Center', 'Tallahassee', 'FL', 'USA', 'NCAA_BASKETBALL', 'Florida State Seminoles', 11500, 1981, 'DOME', NULL),
('Littlejohn Coliseum', 'Clemson', 'SC', 'USA', 'NCAA_BASKETBALL', 'Clemson Tigers', 10000, 1968, 'DOME', NULL),
('PNC Arena', 'Raleigh', 'NC', 'USA', 'NCAA_BASKETBALL', 'NC State Wolfpack', 19722, 1999, 'DOME', NULL),
('Watsco Center', 'Coral Gables', 'FL', 'USA', 'NCAA_BASKETBALL', 'Miami Hurricanes', 8000, 2003, 'DOME', NULL),
('McCamish Pavilion', 'Atlanta', 'GA', 'USA', 'NCAA_BASKETBALL', 'Georgia Tech Yellow Jackets', 8600, 2012, 'DOME', NULL),
('KFC Yum! Center', 'Louisville', 'KY', 'USA', 'NCAA_BASKETBALL', 'Louisville Cardinals', 22090, 2010, 'DOME', NULL),
('Petersen Events Center', 'Pittsburgh', 'PA', 'USA', 'NCAA_BASKETBALL', 'Pittsburgh Panthers', 12508, 2002, 'DOME', NULL),
('Conte Forum', 'Chestnut Hill', 'MA', 'USA', 'NCAA_BASKETBALL', 'Boston College Eagles', 8606, 1988, 'DOME', NULL),
('Lawrence Joel Veterans Memorial Coliseum', 'Winston-Salem', 'NC', 'USA', 'NCAA_BASKETBALL', 'Wake Forest Demon Deacons', 14665, 1989, 'DOME', NULL),
('Haas Pavilion', 'Berkeley', 'CA', 'USA', 'NCAA_BASKETBALL', 'California Golden Bears', 11877, 1999, 'DOME', NULL),

-- Big 12
('Gallagher-Iba Arena', 'Stillwater', 'OK', 'USA', 'NCAA_BASKETBALL', 'Oklahoma State Cowboys', 13611, 1938, 'DOME', NULL),
('Foster Pavilion', 'Waco', 'TX', 'USA', 'NCAA_BASKETBALL', 'Baylor Bears', 10284, 1988, 'DOME', NULL),
('Ed and Rae Schollmaier Arena', 'Fort Worth', 'TX', 'USA', 'NCAA_BASKETBALL', 'TCU Horned Frogs', 7201, 1961, 'DOME', NULL),
('Bramlage Coliseum', 'Manhattan', 'KS', 'USA', 'NCAA_BASKETBALL', 'Kansas State Wildcats', 11654, 1988, 'DOME', NULL),
('Hilton Coliseum', 'Ames', 'IA', 'USA', 'NCAA_BASKETBALL', 'Iowa State Cyclones', 14267, 1971, 'DOME', NULL),
('United Supermarkets Arena', 'Lubbock', 'TX', 'USA', 'NCAA_BASKETBALL', 'Texas Tech Red Raiders', 15098, 1999, 'DOME', NULL),
('WVU Coliseum', 'Morgantown', 'WV', 'USA', 'NCAA_BASKETBALL', 'West Virginia Mountaineers', 14000, 1970, 'DOME', NULL),
('Marriott Center', 'Provo', 'UT', 'USA', 'NCAA_BASKETBALL', 'BYU Cougars', 18987, 1971, 'DOME', NULL),
('Jon M. Huntsman Center', 'Salt Lake City', 'UT', 'USA', 'NCAA_BASKETBALL', 'Utah Utes', 15000, 1969, 'DOME', NULL),
('Desert Financial Arena', 'Tempe', 'AZ', 'USA', 'NCAA_BASKETBALL', 'Arizona State Sun Devils', 14198, 1974, 'DOME', NULL),
('McKale Center', 'Tucson', 'AZ', 'USA', 'NCAA_BASKETBALL', 'Arizona Wildcats', 14644, 1973, 'DOME', NULL),
('CU Events Center', 'Boulder', 'CO', 'USA', 'NCAA_BASKETBALL', 'Colorado Buffaloes', 11064, 1979, 'DOME', NULL),
('Fertitta Center', 'Houston', 'TX', 'USA', 'NCAA_BASKETBALL', 'Houston Cougars', 7100, 2018, 'DOME', NULL),
('Devlin Fieldhouse', 'New Orleans', 'LA', 'USA', 'NCAA_BASKETBALL', 'Tulane Green Wave', 3600, 1933, 'DOME', NULL),

-- Other Notable Programs
('Purcell Pavilion', 'Notre Dame', 'IN', 'USA', 'NCAA_BASKETBALL', 'Notre Dame Fighting Irish', 9149, 1968, 'DOME', NULL),
('Fifth Third Arena', 'Cincinnati', 'OH', 'USA', 'NCAA_BASKETBALL', 'Cincinnati Bearcats', 12012, 1989, 'DOME', NULL),
('Addition Financial Arena', 'Orlando', 'FL', 'USA', 'NCAA_BASKETBALL', 'UCF Knights', 10000, 2007, 'DOME', NULL),
('FedExForum', 'Memphis', 'TN', 'USA', 'NCAA_BASKETBALL', 'Memphis Tigers', 18119, 2004, 'DOME', NULL),
('Creighton CHI Health Center', 'Omaha', 'NE', 'USA', 'NCAA_BASKETBALL', 'Creighton Bluejays', 17560, 2003, 'DOME', NULL),
('Hinkle Fieldhouse', 'Indianapolis', 'IN', 'USA', 'NCAA_BASKETBALL', 'Butler Bulldogs', 9100, 1928, 'DOME', NULL),
('Cintas Center', 'Cincinnati', 'OH', 'USA', 'NCAA_BASKETBALL', 'Xavier Musketeers', 10250, 2000, 'DOME', NULL),
('The Pavilion', 'Villanova', 'PA', 'USA', 'NCAA_BASKETBALL', 'Villanova Wildcats', 6500, 1986, 'DOME', NULL),
('Prudential Center', 'Newark', 'NJ', 'USA', 'NCAA_BASKETBALL', 'Seton Hall Pirates', 18711, 2007, 'DOME', NULL),
('Carnesecca Arena', 'Queens', 'NY', 'USA', 'NCAA_BASKETBALL', 'St. John''s Red Storm', 5602, 1961, 'DOME', NULL),
('Capital One Arena', 'Washington', 'DC', 'USA', 'NCAA_BASKETBALL', 'Georgetown Hoyas', 20356, 1997, 'DOME', NULL),
('Liacouras Center', 'Philadelphia', 'PA', 'USA', 'NCAA_BASKETBALL', 'Temple Owls', 10206, 1997, 'DOME', NULL),
('PPG Paints Arena', 'Pittsburgh', 'PA', 'USA', 'NCAA_BASKETBALL', 'Duquesne Dukes', 19100, 2010, 'DOME', NULL),
('Robins Center', 'Richmond', 'VA', 'USA', 'NCAA_BASKETBALL', 'Richmond Spiders', 9071, 1972, 'DOME', NULL),
('Stuart C. Siegel Center', 'Richmond', 'VA', 'USA', 'NCAA_BASKETBALL', 'VCU Rams', 7637, 1999, 'DOME', NULL),
('Ted Constant Convocation Center', 'Norfolk', 'VA', 'USA', 'NCAA_BASKETBALL', 'Old Dominion Monarchs', 8600, 2002, 'DOME', NULL),
('EagleBank Arena', 'Fairfax', 'VA', 'USA', 'NCAA_BASKETBALL', 'George Mason Patriots', 10000, 1985, 'DOME', NULL),
('Vines Center', 'Lynchburg', 'VA', 'USA', 'NCAA_BASKETBALL', 'Liberty Flames', 9547, 1990, 'DOME', NULL),
('ExtraMile Arena', 'Boise', 'ID', 'USA', 'NCAA_BASKETBALL', 'Boise State Broncos', 12380, 1982, 'DOME', NULL),
('The Pit', 'Albuquerque', 'NM', 'USA', 'NCAA_BASKETBALL', 'New Mexico Lobos', 15411, 1966, 'DOME', NULL),
('Viejas Arena', 'San Diego', 'CA', 'USA', 'NCAA_BASKETBALL', 'San Diego State Aztecs', 12414, 1997, 'DOME', NULL),
('Thomas & Mack Center', 'Las Vegas', 'NV', 'USA', 'NCAA_BASKETBALL', 'UNLV Rebels', 18776, 1983, 'DOME', NULL),
('Save Mart Center', 'Fresno', 'CA', 'USA', 'NCAA_BASKETBALL', 'Fresno State Bulldogs', 15596, 2003, 'DOME', NULL),
('Dee Glen Smith Spectrum', 'Logan', 'UT', 'USA', 'NCAA_BASKETBALL', 'Utah State Aggies', 10270, 1970, 'DOME', NULL),
('Arena-Auditorium', 'Laramie', 'WY', 'USA', 'NCAA_BASKETBALL', 'Wyoming Cowboys', 11383, 1982, 'DOME', NULL),
('Moby Arena', 'Fort Collins', 'CO', 'USA', 'NCAA_BASKETBALL', 'Colorado State Rams', 8745, 1966, 'DOME', NULL),
('Stan Sheriff Center', 'Honolulu', 'HI', 'USA', 'NCAA_BASKETBALL', 'Hawaii Rainbow Warriors', 10300, 1994, 'DOME', NULL),
('Moda Center', 'Portland', 'OR', 'USA', 'NCAA_BASKETBALL', 'Portland Pilots', 19393, 1995, 'DOME', NULL),
('McCarthy Athletic Center', 'Spokane', 'WA', 'USA', 'NCAA_BASKETBALL', 'Gonzaga Bulldogs', 6000, 2004, 'DOME', NULL),
('Orleans Arena', 'Las Vegas', 'NV', 'USA', 'NCAA_BASKETBALL', 'WCC Tournament', 9500, 2003, 'DOME', NULL)

ON CONFLICT DO NOTHING;
