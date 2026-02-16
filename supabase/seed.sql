-- Seed data for Scalped - Sample stadiums

INSERT INTO stadiums (name, city, state, country, sport, team_name, capacity, year_built, roof_type, image_url) VALUES
-- NFL Stadiums
('SoFi Stadium', 'Inglewood', 'CA', 'USA', 'NFL', 'Los Angeles Rams / Chargers', 70240, 2020, 'DOME', 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800'),
('AT&T Stadium', 'Arlington', 'TX', 'USA', 'NFL', 'Dallas Cowboys', 80000, 2009, 'RETRACTABLE', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800'),
('Lambeau Field', 'Green Bay', 'WI', 'USA', 'NFL', 'Green Bay Packers', 81441, 1957, 'OPEN', 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800'),
('Allegiant Stadium', 'Las Vegas', 'NV', 'USA', 'NFL', 'Las Vegas Raiders', 65000, 2020, 'DOME', 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800'),
('Arrowhead Stadium', 'Kansas City', 'MO', 'USA', 'NFL', 'Kansas City Chiefs', 76416, 1972, 'OPEN', NULL),
('Caesars Superdome', 'New Orleans', 'LA', 'USA', 'NFL', 'New Orleans Saints', 73208, 1975, 'DOME', NULL),
('Highmark Stadium', 'Orchard Park', 'NY', 'USA', 'NFL', 'Buffalo Bills', 71608, 1973, 'OPEN', NULL),
('Lincoln Financial Field', 'Philadelphia', 'PA', 'USA', 'NFL', 'Philadelphia Eagles', 69796, 2003, 'OPEN', NULL),

-- NBA Arenas
('Madison Square Garden', 'New York', 'NY', 'USA', 'NBA', 'New York Knicks', 19812, 1968, 'DOME', 'https://images.unsplash.com/photo-1548127032-79b5ef78104b?w=800'),
('Crypto.com Arena', 'Los Angeles', 'CA', 'USA', 'NBA', 'Los Angeles Lakers / Clippers', 19068, 1999, 'DOME', NULL),
('United Center', 'Chicago', 'IL', 'USA', 'NBA', 'Chicago Bulls', 20917, 1994, 'DOME', NULL),
('TD Garden', 'Boston', 'MA', 'USA', 'NBA', 'Boston Celtics', 19156, 1995, 'DOME', NULL),
('Chase Center', 'San Francisco', 'CA', 'USA', 'NBA', 'Golden State Warriors', 18064, 2019, 'DOME', NULL),

-- MLB Stadiums
('Fenway Park', 'Boston', 'MA', 'USA', 'MLB', 'Boston Red Sox', 37755, 1912, 'OPEN', 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800'),
('Wrigley Field', 'Chicago', 'IL', 'USA', 'MLB', 'Chicago Cubs', 41649, 1914, 'OPEN', 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800'),
('Yankee Stadium', 'Bronx', 'NY', 'USA', 'MLB', 'New York Yankees', 46537, 2009, 'OPEN', NULL),
('Dodger Stadium', 'Los Angeles', 'CA', 'USA', 'MLB', 'Los Angeles Dodgers', 56000, 1962, 'OPEN', NULL),
('Oracle Park', 'San Francisco', 'CA', 'USA', 'MLB', 'San Francisco Giants', 41915, 2000, 'OPEN', NULL),
('PNC Park', 'Pittsburgh', 'PA', 'USA', 'MLB', 'Pittsburgh Pirates', 38362, 2001, 'OPEN', NULL),
('Petco Park', 'San Diego', 'CA', 'USA', 'MLB', 'San Diego Padres', 40209, 2004, 'OPEN', NULL),

-- NHL Arenas
('Bell Centre', 'Montreal', 'QC', 'Canada', 'NHL', 'Montreal Canadiens', 21302, 1996, 'DOME', NULL),
('Scotiabank Arena', 'Toronto', 'ON', 'Canada', 'NHL', 'Toronto Maple Leafs', 19800, 1999, 'DOME', NULL),
('Climate Pledge Arena', 'Seattle', 'WA', 'USA', 'NHL', 'Seattle Kraken', 17100, 2021, 'DOME', NULL),

-- MLS Stadiums
('Mercedes-Benz Stadium', 'Atlanta', 'GA', 'USA', 'MLS', 'Atlanta United', 42500, 2017, 'RETRACTABLE', NULL),
('Allianz Field', 'Saint Paul', 'MN', 'USA', 'MLS', 'Minnesota United', 19400, 2019, 'OPEN', NULL),
('GEODIS Park', 'Nashville', 'TN', 'USA', 'MLS', 'Nashville SC', 30000, 2022, 'OPEN', NULL),

-- College Football
('Michigan Stadium', 'Ann Arbor', 'MI', 'USA', 'NCAA_FOOTBALL', 'Michigan Wolverines', 107601, 1927, 'OPEN', NULL),
('Ohio Stadium', 'Columbus', 'OH', 'USA', 'NCAA_FOOTBALL', 'Ohio State Buckeyes', 102780, 1922, 'OPEN', NULL),
('Neyland Stadium', 'Knoxville', 'TN', 'USA', 'NCAA_FOOTBALL', 'Tennessee Volunteers', 101915, 1921, 'OPEN', NULL),
('Tiger Stadium', 'Baton Rouge', 'LA', 'USA', 'NCAA_FOOTBALL', 'LSU Tigers', 102321, 1924, 'OPEN', NULL),
('Rose Bowl', 'Pasadena', 'CA', 'USA', 'NCAA_FOOTBALL', 'UCLA Bruins', 88565, 1922, 'OPEN', NULL),
('Bryant-Denny Stadium', 'Tuscaloosa', 'AL', 'USA', 'NCAA_FOOTBALL', 'Alabama Crimson Tide', 100077, 1929, 'OPEN', NULL)
ON CONFLICT DO NOTHING;
