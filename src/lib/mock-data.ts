import { Stadium } from '@/types/database';

export const MOCK_STADIUMS: Stadium[] = [
  // NFL Stadiums
  { id: '1', name: 'SoFi Stadium', city: 'Inglewood', state: 'CA', country: 'USA', sport: 'NFL', team_name: 'Los Angeles Rams / Chargers', capacity: 70240, year_built: 2020, roof_type: 'DOME', image_url: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800', latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '2', name: 'AT&T Stadium', city: 'Arlington', state: 'TX', country: 'USA', sport: 'NFL', team_name: 'Dallas Cowboys', capacity: 80000, year_built: 2009, roof_type: 'RETRACTABLE', image_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800', latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '3', name: 'Lambeau Field', city: 'Green Bay', state: 'WI', country: 'USA', sport: 'NFL', team_name: 'Green Bay Packers', capacity: 81441, year_built: 1957, roof_type: 'OPEN', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '4', name: 'Allegiant Stadium', city: 'Las Vegas', state: 'NV', country: 'USA', sport: 'NFL', team_name: 'Las Vegas Raiders', capacity: 65000, year_built: 2020, roof_type: 'DOME', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '5', name: 'Arrowhead Stadium', city: 'Kansas City', state: 'MO', country: 'USA', sport: 'NFL', team_name: 'Kansas City Chiefs', capacity: 76416, year_built: 1972, roof_type: 'OPEN', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '6', name: 'Caesars Superdome', city: 'New Orleans', state: 'LA', country: 'USA', sport: 'NFL', team_name: 'New Orleans Saints', capacity: 73208, year_built: 1975, roof_type: 'DOME', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  
  // NBA Arenas
  { id: '10', name: 'Madison Square Garden', city: 'New York', state: 'NY', country: 'USA', sport: 'NBA', team_name: 'New York Knicks', capacity: 19812, year_built: 1968, roof_type: 'DOME', image_url: 'https://images.unsplash.com/photo-1548127032-79b5ef78104b?w=800', latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '11', name: 'Crypto.com Arena', city: 'Los Angeles', state: 'CA', country: 'USA', sport: 'NBA', team_name: 'Los Angeles Lakers / Clippers', capacity: 19068, year_built: 1999, roof_type: 'DOME', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '12', name: 'United Center', city: 'Chicago', state: 'IL', country: 'USA', sport: 'NBA', team_name: 'Chicago Bulls', capacity: 20917, year_built: 1994, roof_type: 'DOME', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '13', name: 'TD Garden', city: 'Boston', state: 'MA', country: 'USA', sport: 'NBA', team_name: 'Boston Celtics', capacity: 19156, year_built: 1995, roof_type: 'DOME', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '14', name: 'Chase Center', city: 'San Francisco', state: 'CA', country: 'USA', sport: 'NBA', team_name: 'Golden State Warriors', capacity: 18064, year_built: 2019, roof_type: 'DOME', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },

  // MLB Stadiums  
  { id: '20', name: 'Fenway Park', city: 'Boston', state: 'MA', country: 'USA', sport: 'MLB', team_name: 'Boston Red Sox', capacity: 37755, year_built: 1912, roof_type: 'OPEN', image_url: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800', latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '21', name: 'Wrigley Field', city: 'Chicago', state: 'IL', country: 'USA', sport: 'MLB', team_name: 'Chicago Cubs', capacity: 41649, year_built: 1914, roof_type: 'OPEN', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '22', name: 'Yankee Stadium', city: 'Bronx', state: 'NY', country: 'USA', sport: 'MLB', team_name: 'New York Yankees', capacity: 46537, year_built: 2009, roof_type: 'OPEN', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '23', name: 'Dodger Stadium', city: 'Los Angeles', state: 'CA', country: 'USA', sport: 'MLB', team_name: 'Los Angeles Dodgers', capacity: 56000, year_built: 1962, roof_type: 'OPEN', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '24', name: 'Oracle Park', city: 'San Francisco', state: 'CA', country: 'USA', sport: 'MLB', team_name: 'San Francisco Giants', capacity: 41915, year_built: 2000, roof_type: 'OPEN', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },

  // NHL Arenas
  { id: '30', name: 'Bell Centre', city: 'Montreal', state: 'QC', country: 'Canada', sport: 'NHL', team_name: 'Montreal Canadiens', capacity: 21302, year_built: 1996, roof_type: 'DOME', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '31', name: 'Scotiabank Arena', city: 'Toronto', state: 'ON', country: 'Canada', sport: 'NHL', team_name: 'Toronto Maple Leafs', capacity: 19800, year_built: 1999, roof_type: 'DOME', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '32', name: 'Climate Pledge Arena', city: 'Seattle', state: 'WA', country: 'USA', sport: 'NHL', team_name: 'Seattle Kraken', capacity: 17100, year_built: 2021, roof_type: 'DOME', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },

  // MLS Stadiums
  { id: '40', name: 'Mercedes-Benz Stadium', city: 'Atlanta', state: 'GA', country: 'USA', sport: 'MLS', team_name: 'Atlanta United', capacity: 42500, year_built: 2017, roof_type: 'RETRACTABLE', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '41', name: 'Allianz Field', city: 'Saint Paul', state: 'MN', country: 'USA', sport: 'MLS', team_name: 'Minnesota United', capacity: 19400, year_built: 2019, roof_type: 'OPEN', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },

  // College Football
  { id: '50', name: 'Michigan Stadium', city: 'Ann Arbor', state: 'MI', country: 'USA', sport: 'NCAA_FOOTBALL', team_name: 'Michigan Wolverines', capacity: 107601, year_built: 1927, roof_type: 'OPEN', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '51', name: 'Ohio Stadium', city: 'Columbus', state: 'OH', country: 'USA', sport: 'NCAA_FOOTBALL', team_name: 'Ohio State Buckeyes', capacity: 102780, year_built: 1922, roof_type: 'OPEN', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '52', name: 'Neyland Stadium', city: 'Knoxville', state: 'TN', country: 'USA', sport: 'NCAA_FOOTBALL', team_name: 'Tennessee Volunteers', capacity: 101915, year_built: 1921, roof_type: 'OPEN', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '53', name: 'Tiger Stadium', city: 'Baton Rouge', state: 'LA', country: 'USA', sport: 'NCAA_FOOTBALL', team_name: 'LSU Tigers', capacity: 102321, year_built: 1924, roof_type: 'OPEN', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
  { id: '54', name: 'Rose Bowl', city: 'Pasadena', state: 'CA', country: 'USA', sport: 'NCAA_FOOTBALL', team_name: 'UCLA Bruins', capacity: 88565, year_built: 1922, roof_type: 'OPEN', image_url: null, latitude: null, longitude: null, league: null, created_at: '', updated_at: '' },
];

export function getMockStadium(id: string): Stadium | undefined {
  return MOCK_STADIUMS.find(s => s.id === id);
}

