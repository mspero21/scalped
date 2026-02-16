// Team colors data for dynamic theming
// Colors sourced from official team branding

export interface TeamColors {
  primary: string;
  secondary: string;
  tertiary?: string;
}

// Map of team name (lowercase) to their colors
export const TEAM_COLORS: Record<string, TeamColors> = {
  // NFL Teams
  'arizona cardinals': { primary: '#97233F', secondary: '#000000', tertiary: '#FFB612' },
  'atlanta falcons': { primary: '#A71930', secondary: '#000000', tertiary: '#A5ACAF' },
  'baltimore ravens': { primary: '#241773', secondary: '#000000', tertiary: '#9E7C0C' },
  'buffalo bills': { primary: '#00338D', secondary: '#C60C30' },
  'carolina panthers': { primary: '#0085CA', secondary: '#101820', tertiary: '#BFC0BF' },
  'chicago bears': { primary: '#0B162A', secondary: '#C83803' },
  'cincinnati bengals': { primary: '#FB4F14', secondary: '#000000' },
  'cleveland browns': { primary: '#311D00', secondary: '#FF3C00' },
  'dallas cowboys': { primary: '#003594', secondary: '#869397', tertiary: '#FFFFFF' },
  'denver broncos': { primary: '#FB4F14', secondary: '#002244' },
  'detroit lions': { primary: '#0076B6', secondary: '#B0B7BC', tertiary: '#000000' },
  'green bay packers': { primary: '#203731', secondary: '#FFB612' },
  'houston texans': { primary: '#03202F', secondary: '#A71930' },
  'indianapolis colts': { primary: '#002C5F', secondary: '#A2AAAD' },
  'jacksonville jaguars': { primary: '#101820', secondary: '#D7A22A', tertiary: '#006778' },
  'kansas city chiefs': { primary: '#E31837', secondary: '#FFB81C' },
  'las vegas raiders': { primary: '#000000', secondary: '#A5ACAF' },
  'los angeles chargers': { primary: '#0080C6', secondary: '#FFC20E', tertiary: '#FFFFFF' },
  'los angeles rams': { primary: '#003594', secondary: '#FFA300', tertiary: '#FFFFFF' },
  'miami dolphins': { primary: '#008E97', secondary: '#FC4C02', tertiary: '#005778' },
  'minnesota vikings': { primary: '#4F2683', secondary: '#FFC62F' },
  'new england patriots': { primary: '#002244', secondary: '#C60C30', tertiary: '#B0B7BC' },
  'new orleans saints': { primary: '#D3BC8D', secondary: '#101820' },
  'new york giants': { primary: '#0B2265', secondary: '#A71930', tertiary: '#A5ACAF' },
  'new york jets': { primary: '#125740', secondary: '#000000', tertiary: '#FFFFFF' },
  'philadelphia eagles': { primary: '#004C54', secondary: '#A5ACAF', tertiary: '#ACC0C6' },
  'pittsburgh steelers': { primary: '#FFB612', secondary: '#101820' },
  'san francisco 49ers': { primary: '#AA0000', secondary: '#B3995D' },
  'seattle seahawks': { primary: '#002244', secondary: '#69BE28', tertiary: '#A5ACAF' },
  'tampa bay buccaneers': { primary: '#D50A0A', secondary: '#FF7900', tertiary: '#0A0A08' },
  'tennessee titans': { primary: '#0C2340', secondary: '#4B92DB', tertiary: '#C8102E' },
  'washington commanders': { primary: '#5A1414', secondary: '#FFB612' },

  // NBA Teams
  'atlanta hawks': { primary: '#E03A3E', secondary: '#C1D32F', tertiary: '#26282A' },
  'boston celtics': { primary: '#007A33', secondary: '#BA9653', tertiary: '#FFFFFF' },
  'brooklyn nets': { primary: '#000000', secondary: '#FFFFFF' },
  'charlotte hornets': { primary: '#1D1160', secondary: '#00788C', tertiary: '#A1A1A4' },
  'chicago bulls': { primary: '#CE1141', secondary: '#000000' },
  'cleveland cavaliers': { primary: '#6F263D', secondary: '#FFB81C', tertiary: '#041E42' },
  'dallas mavericks': { primary: '#00538C', secondary: '#002B5E', tertiary: '#B8C4CA' },
  'denver nuggets': { primary: '#0E2240', secondary: '#FEC524', tertiary: '#8B2131' },
  'detroit pistons': { primary: '#C8102E', secondary: '#1D42BA', tertiary: '#BEC0C2' },
  'golden state warriors': { primary: '#1D428A', secondary: '#FFC72C' },
  'houston rockets': { primary: '#CE1141', secondary: '#000000', tertiary: '#C4CED4' },
  'indiana pacers': { primary: '#002D62', secondary: '#FDBB30', tertiary: '#BEC0C2' },
  'la clippers': { primary: '#C8102E', secondary: '#1D428A', tertiary: '#BEC0C2' },
  'los angeles lakers': { primary: '#552583', secondary: '#FDB927', tertiary: '#000000' },
  'memphis grizzlies': { primary: '#5D76A9', secondary: '#12173F', tertiary: '#F5B112' },
  'miami heat': { primary: '#98002E', secondary: '#F9A01B', tertiary: '#000000' },
  'milwaukee bucks': { primary: '#00471B', secondary: '#EEE1C6', tertiary: '#0077C0' },
  'minnesota timberwolves': { primary: '#0C2340', secondary: '#236192', tertiary: '#9EA2A2' },
  'new orleans pelicans': { primary: '#0C2340', secondary: '#C8102E', tertiary: '#85714D' },
  'new york knicks': { primary: '#006BB6', secondary: '#F58426', tertiary: '#BEC0C2' },
  'oklahoma city thunder': { primary: '#007AC1', secondary: '#EF3B24', tertiary: '#002D62' },
  'orlando magic': { primary: '#0077C0', secondary: '#C4CED4', tertiary: '#000000' },
  'philadelphia 76ers': { primary: '#006BB6', secondary: '#ED174C', tertiary: '#002B5C' },
  'phoenix suns': { primary: '#1D1160', secondary: '#E56020', tertiary: '#000000' },
  'portland trail blazers': { primary: '#E03A3E', secondary: '#000000' },
  'sacramento kings': { primary: '#5A2D81', secondary: '#63727A', tertiary: '#000000' },
  'san antonio spurs': { primary: '#C4CED4', secondary: '#000000' },
  'toronto raptors': { primary: '#CE1141', secondary: '#000000', tertiary: '#A1A1A4' },
  'utah jazz': { primary: '#002B5C', secondary: '#00471B', tertiary: '#F9A01B' },
  'washington wizards': { primary: '#002B5C', secondary: '#E31837', tertiary: '#C4CED4' },

  // MLB Teams
  'arizona diamondbacks': { primary: '#A71930', secondary: '#000000', tertiary: '#E3D4AD' },
  'atlanta braves': { primary: '#CE1141', secondary: '#13274F' },
  'baltimore orioles': { primary: '#DF4601', secondary: '#000000' },
  'boston red sox': { primary: '#BD3039', secondary: '#0C2340' },
  'chicago cubs': { primary: '#0E3386', secondary: '#CC3433' },
  'chicago white sox': { primary: '#27251F', secondary: '#C4CED4' },
  'cincinnati reds': { primary: '#C6011F', secondary: '#000000' },
  'cleveland guardians': { primary: '#00385D', secondary: '#E50022' },
  'colorado rockies': { primary: '#333366', secondary: '#131413', tertiary: '#C4CED4' },
  'detroit tigers': { primary: '#0C2340', secondary: '#FA4616' },
  'houston astros': { primary: '#002D62', secondary: '#EB6E1F' },
  'kansas city royals': { primary: '#004687', secondary: '#BD9B60' },
  'los angeles angels': { primary: '#003263', secondary: '#BA0021' },
  'los angeles dodgers': { primary: '#005A9C', secondary: '#EF3E42' },
  'miami marlins': { primary: '#00A3E0', secondary: '#EF3340', tertiary: '#000000' },
  'milwaukee brewers': { primary: '#12284B', secondary: '#FFC52F' },
  'minnesota twins': { primary: '#002B5C', secondary: '#D31145' },
  'new york mets': { primary: '#002D72', secondary: '#FF5910' },
  'new york yankees': { primary: '#003087', secondary: '#E4002B' },
  'oakland athletics': { primary: '#003831', secondary: '#EFB21E' },
  'philadelphia phillies': { primary: '#E81828', secondary: '#002D72' },
  'pittsburgh pirates': { primary: '#27251F', secondary: '#FDB827' },
  'san diego padres': { primary: '#2F241D', secondary: '#FFC425' },
  'san francisco giants': { primary: '#FD5A1E', secondary: '#27251F', tertiary: '#EFD19F' },
  'seattle mariners': { primary: '#0C2C56', secondary: '#005C5C', tertiary: '#C4CED4' },
  'st. louis cardinals': { primary: '#C41E3A', secondary: '#0C2340', tertiary: '#FEDB00' },
  'tampa bay rays': { primary: '#092C5C', secondary: '#8FBCE6', tertiary: '#F5D130' },
  'texas rangers': { primary: '#003278', secondary: '#C0111F' },
  'toronto blue jays': { primary: '#134A8E', secondary: '#1D2D5C', tertiary: '#E8291C' },
  'washington nationals': { primary: '#AB0003', secondary: '#14225A' },

  // NHL Teams
  'anaheim ducks': { primary: '#F47A38', secondary: '#B9975B', tertiary: '#000000' },
  'arizona coyotes': { primary: '#8C2633', secondary: '#E2D6B5', tertiary: '#111111' },
  'boston bruins': { primary: '#FFB81C', secondary: '#000000' },
  'buffalo sabres': { primary: '#002654', secondary: '#FCB514', tertiary: '#ADAFAA' },
  'calgary flames': { primary: '#C8102E', secondary: '#F1BE48', tertiary: '#111111' },
  'carolina hurricanes': { primary: '#CC0000', secondary: '#000000', tertiary: '#A2AAAD' },
  'chicago blackhawks': { primary: '#CF0A2C', secondary: '#FF671B', tertiary: '#00833E' },
  'colorado avalanche': { primary: '#6F263D', secondary: '#236192', tertiary: '#A2AAAD' },
  'columbus blue jackets': { primary: '#002654', secondary: '#CE1126', tertiary: '#A4A9AD' },
  'dallas stars': { primary: '#006847', secondary: '#8F8F8C', tertiary: '#111111' },
  'detroit red wings': { primary: '#CE1126', secondary: '#FFFFFF' },
  'edmonton oilers': { primary: '#041E42', secondary: '#FF4C00' },
  'florida panthers': { primary: '#041E42', secondary: '#C8102E', tertiary: '#B9975B' },
  'los angeles kings': { primary: '#111111', secondary: '#A2AAAD', tertiary: '#FFFFFF' },
  'minnesota wild': { primary: '#154734', secondary: '#A6192E', tertiary: '#DDCBA4' },
  'montreal canadiens': { primary: '#AF1E2D', secondary: '#192168' },
  'nashville predators': { primary: '#FFB81C', secondary: '#041E42' },
  'new jersey devils': { primary: '#CE1126', secondary: '#000000' },
  'new york islanders': { primary: '#00539B', secondary: '#F47D30' },
  'new york rangers': { primary: '#0038A8', secondary: '#CE1126', tertiary: '#FFFFFF' },
  'ottawa senators': { primary: '#C52032', secondary: '#C2912C', tertiary: '#000000' },
  'philadelphia flyers': { primary: '#F74902', secondary: '#000000' },
  'pittsburgh penguins': { primary: '#000000', secondary: '#FCB514' },
  'san jose sharks': { primary: '#006D75', secondary: '#EA7200', tertiary: '#000000' },
  'seattle kraken': { primary: '#001628', secondary: '#99D9D9', tertiary: '#355464' },
  'st. louis blues': { primary: '#002F87', secondary: '#FCB514', tertiary: '#041E42' },
  'tampa bay lightning': { primary: '#002868', secondary: '#FFFFFF' },
  'toronto maple leafs': { primary: '#00205B', secondary: '#FFFFFF' },
  'vancouver canucks': { primary: '#00205B', secondary: '#00843D', tertiary: '#041C2C' },
  'vegas golden knights': { primary: '#B4975A', secondary: '#333F42', tertiary: '#C8102E' },
  'washington capitals': { primary: '#C8102E', secondary: '#041E42', tertiary: '#FFFFFF' },
  'winnipeg jets': { primary: '#041E42', secondary: '#004C97', tertiary: '#AC162C' },

  // MLS Teams
  'atlanta united fc': { primary: '#80000A', secondary: '#231F20', tertiary: '#A19060' },
  'austin fc': { primary: '#00B140', secondary: '#000000' },
  'cf montréal': { primary: '#0033A1', secondary: '#000000' },
  'charlotte fc': { primary: '#1A85C8', secondary: '#000000' },
  'chicago fire fc': { primary: '#FF0000', secondary: '#0A174A' },
  'colorado rapids': { primary: '#862633', secondary: '#8BB8E8' },
  'columbus crew': { primary: '#FEDD00', secondary: '#000000' },
  'd.c. united': { primary: '#000000', secondary: '#EF3E42' },
  'fc cincinnati': { primary: '#003087', secondary: '#FE5000', tertiary: '#FFFFFF' },
  'fc dallas': { primary: '#E81F3E', secondary: '#2A4076' },
  'houston dynamo fc': { primary: '#FF6B00', secondary: '#101820' },
  'inter miami cf': { primary: '#F7B5CD', secondary: '#231F20' },
  'la galaxy': { primary: '#00245D', secondary: '#FFD200' },
  'los angeles fc': { primary: '#000000', secondary: '#C39E6D' },
  'minnesota united fc': { primary: '#9BCBEB', secondary: '#231F20' },
  'nashville sc': { primary: '#ECE83A', secondary: '#1F1646' },
  'new england revolution': { primary: '#0A2240', secondary: '#CE0E2D' },
  'new york city fc': { primary: '#6CACE4', secondary: '#041E42', tertiary: '#FF6600' },
  'new york red bulls': { primary: '#ED1E36', secondary: '#23326A', tertiary: '#F7F7F7' },
  'orlando city sc': { primary: '#633492', secondary: '#FDE192' },
  'philadelphia union': { primary: '#071B2C', secondary: '#B18500' },
  'portland timbers': { primary: '#004812', secondary: '#EBE72B' },
  'real salt lake': { primary: '#B30838', secondary: '#013A81', tertiary: '#F1DE00' },
  'san jose earthquakes': { primary: '#0D4C92', secondary: '#000000' },
  'seattle sounders fc': { primary: '#658D1B', secondary: '#005595', tertiary: '#3F1D47' },
  'sporting kansas city': { primary: '#002F65', secondary: '#91B0D5' },
  'st. louis city sc': { primary: '#D22630', secondary: '#0C2340' },
  'toronto fc': { primary: '#E31937', secondary: '#B81137', tertiary: '#455560' },
  'vancouver whitecaps fc': { primary: '#00245E', secondary: '#9DC2EA' },

  // NCAA Teams (Football & Basketball)
  // SEC
  'alabama crimson tide': { primary: '#9E1B32', secondary: '#828A8F' },
  'arkansas razorbacks': { primary: '#9D2235', secondary: '#FFFFFF' },
  'auburn tigers': { primary: '#0C2340', secondary: '#E87722' },
  'florida gators': { primary: '#0021A5', secondary: '#FA4616' },
  'georgia bulldogs': { primary: '#BA0C2F', secondary: '#000000' },
  'kentucky wildcats': { primary: '#0033A0', secondary: '#FFFFFF' },
  'lsu tigers': { primary: '#461D7C', secondary: '#FDD023' },
  'mississippi state bulldogs': { primary: '#660000', secondary: '#FFFFFF' },
  'missouri tigers': { primary: '#F1B82D', secondary: '#000000' },
  'ole miss rebels': { primary: '#CE1126', secondary: '#14213D' },
  'south carolina gamecocks': { primary: '#73000A', secondary: '#000000' },
  'tennessee volunteers': { primary: '#FF8200', secondary: '#FFFFFF' },
  'texas a&m aggies': { primary: '#500000', secondary: '#FFFFFF' },
  'vanderbilt commodores': { primary: '#866D4B', secondary: '#000000' },
  'texas longhorns': { primary: '#BF5700', secondary: '#FFFFFF' },
  'oklahoma sooners': { primary: '#841617', secondary: '#FDF9D8' },

  // Big Ten
  'illinois fighting illini': { primary: '#E84A27', secondary: '#13294B' },
  'indiana hoosiers': { primary: '#990000', secondary: '#FFFFFF' },
  'iowa hawkeyes': { primary: '#FFCD00', secondary: '#000000' },
  'maryland terrapins': { primary: '#E03C31', secondary: '#FFD520', tertiary: '#000000' },
  'michigan wolverines': { primary: '#00274C', secondary: '#FFCB05' },
  'michigan state spartans': { primary: '#18453B', secondary: '#FFFFFF' },
  'minnesota golden gophers': { primary: '#7A0019', secondary: '#FFCC33' },
  'nebraska cornhuskers': { primary: '#E41C38', secondary: '#F5F1E7' },
  'northwestern wildcats': { primary: '#4E2A84', secondary: '#FFFFFF' },
  'ohio state buckeyes': { primary: '#BB0000', secondary: '#666666' },
  'penn state nittany lions': { primary: '#041E42', secondary: '#FFFFFF' },
  'purdue boilermakers': { primary: '#CEB888', secondary: '#000000' },
  'rutgers scarlet knights': { primary: '#CC0033', secondary: '#5F6A72' },
  'wisconsin badgers': { primary: '#C5050C', secondary: '#FFFFFF' },
  'oregon ducks': { primary: '#154733', secondary: '#FEE123' },
  'washington huskies': { primary: '#4B2E83', secondary: '#B7A57A' },
  'usc trojans': { primary: '#990000', secondary: '#FFC72C' },
  'ucla bruins': { primary: '#2D68C4', secondary: '#F2A900' },

  // ACC
  'boston college eagles': { primary: '#98002E', secondary: '#BC9B6A' },
  'clemson tigers': { primary: '#F56600', secondary: '#522D80' },
  'duke blue devils': { primary: '#003087', secondary: '#FFFFFF' },
  'florida state seminoles': { primary: '#782F40', secondary: '#CEB888' },
  'georgia tech yellow jackets': { primary: '#B3A369', secondary: '#003057' },
  'louisville cardinals': { primary: '#AD0000', secondary: '#000000' },
  'miami hurricanes': { primary: '#F47321', secondary: '#005030' },
  'north carolina tar heels': { primary: '#7BAFD4', secondary: '#FFFFFF' },
  'nc state wolfpack': { primary: '#CC0000', secondary: '#FFFFFF' },
  'notre dame fighting irish': { primary: '#0C2340', secondary: '#C99700' },
  'pittsburgh panthers': { primary: '#003594', secondary: '#FFB81C' },
  'syracuse orange': { primary: '#F76900', secondary: '#FFFFFF' },
  'virginia cavaliers': { primary: '#232D4B', secondary: '#F84C1E' },
  'virginia tech hokies': { primary: '#630031', secondary: '#CF4420' },
  'wake forest demon deacons': { primary: '#9E7E38', secondary: '#000000' },
  'california golden bears': { primary: '#003262', secondary: '#FDB515' },
  'stanford cardinal': { primary: '#8C1515', secondary: '#FFFFFF' },

  // Big 12
  'baylor bears': { primary: '#154734', secondary: '#FFB81C' },
  'byu cougars': { primary: '#002E5D', secondary: '#FFFFFF' },
  'cincinnati bearcats': { primary: '#E00122', secondary: '#000000' },
  'colorado buffaloes': { primary: '#CFB87C', secondary: '#000000' },
  'houston cougars': { primary: '#C8102E', secondary: '#FFFFFF' },
  'iowa state cyclones': { primary: '#C8102E', secondary: '#F1BE48' },
  'kansas jayhawks': { primary: '#0051BA', secondary: '#E8000D' },
  'kansas state wildcats': { primary: '#512888', secondary: '#FFFFFF' },
  'oklahoma state cowboys': { primary: '#FF7300', secondary: '#000000' },
  'tcu horned frogs': { primary: '#4D1979', secondary: '#A3A9AC' },
  'texas tech red raiders': { primary: '#CC0000', secondary: '#000000' },
  'ucf knights': { primary: '#BA9B37', secondary: '#000000' },
  'west virginia mountaineers': { primary: '#002855', secondary: '#EAAA00' },
  'arizona wildcats': { primary: '#CC0033', secondary: '#003366' },
  'arizona state sun devils': { primary: '#8C1D40', secondary: '#FFC627' },
  'utah utes': { primary: '#CC0000', secondary: '#FFFFFF' },

  // Other Notable Programs
  'gonzaga bulldogs': { primary: '#002967', secondary: '#C8102E' },
  'villanova wildcats': { primary: '#00205B', secondary: '#13B5EA' },
  'creighton bluejays': { primary: '#005CA9', secondary: '#FFFFFF' },
  'xavier musketeers': { primary: '#0C2340', secondary: '#9EA2A2' },
  'butler bulldogs': { primary: '#13294B', secondary: '#FFFFFF' },
  'memphis tigers': { primary: '#003087', secondary: '#898D8D' },
  'seton hall pirates': { primary: '#004488', secondary: '#FFFFFF' },
  'st. john\'s red storm': { primary: '#BA0C2F', secondary: '#FFFFFF' },
  'georgetown hoyas': { primary: '#041E42', secondary: '#8D817B' },
  'uconn huskies': { primary: '#000E2F', secondary: '#FFFFFF' },
  'marquette golden eagles': { primary: '#003366', secondary: '#FFCC00' },
  'providence friars': { primary: '#000000', secondary: '#FFFFFF' },
  'san diego state aztecs': { primary: '#A6192E', secondary: '#000000' },
  'boise state broncos': { primary: '#0033A0', secondary: '#D64309' },
  'unlv rebels': { primary: '#CF0A2C', secondary: '#666666' },
  'new mexico lobos': { primary: '#BA0C2F', secondary: '#63666A' },
  'fresno state bulldogs': { primary: '#DB0032', secondary: '#13294B' },
  'utah state aggies': { primary: '#0F2439', secondary: '#FFFFFF' },
  'wyoming cowboys': { primary: '#492F24', secondary: '#FFC425' },
  'colorado state rams': { primary: '#1E4D2B', secondary: '#C8C372' },
  'hawaii rainbow warriors': { primary: '#024731', secondary: '#000000' },
  'vcu rams': { primary: '#F8B800', secondary: '#000000' },
  'richmond spiders': { primary: '#990000', secondary: '#00539F' },
  'temple owls': { primary: '#9D2235', secondary: '#FFFFFF' },
};

/**
 * Get team colors by team name (case-insensitive)
 */
export function getTeamColors(teamName: string): TeamColors | null {
  const normalized = teamName.toLowerCase().trim();
  return TEAM_COLORS[normalized] || null;
}

/**
 * Get CSS custom properties for a team's colors
 */
export function getTeamCSSVariables(teamName: string): Record<string, string> {
  const colors = getTeamColors(teamName);
  if (!colors) {
    return {};
  }
  return {
    '--team-primary': colors.primary,
    '--team-secondary': colors.secondary,
    '--team-tertiary': colors.tertiary || colors.secondary,
  };
}

/**
 * Check if a color is light (for determining text color)
 */
export function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

/**
 * Convert hex to "r, g, b" string for use in rgba()
 */
export function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

/**
 * Darken or lighten a hex color by an amount (-255 to 255)
 */
export function adjustColor(hex: string, amount: number): string {
  const r = Math.max(0, Math.min(255, parseInt(hex.slice(1, 3), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.slice(3, 5), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.slice(5, 7), 16) + amount));
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

/**
 * Ensure accent color has sufficient contrast on a white background.
 * Darkens colors that are too light (yellow, gold, light pink, etc.)
 */
export function ensureAccentContrast(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  if (luminance > 0.65) {
    return adjustColor(hex, -80);
  }
  return hex;
}

