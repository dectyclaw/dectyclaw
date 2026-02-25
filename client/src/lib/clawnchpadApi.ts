/**
 * Clawnchpad API Service
 * Mengambil data token agent langsung dari Clawnchpad
 */

export interface ClawnchpadToken {
  symbol: string;
  name: string;
  change: string;
  price: string;
  mcap: string;
  volume24h?: string;
  platform?: string;
  launchDate?: string;
  description?: string;
}

/**
 * Fetch token data dari Clawnchpad menggunakan CORS proxy
 */
export async function fetchClawnchpadTokens(): Promise<ClawnchpadToken[]> {
  try {
    // Menggunakan CORS proxy untuk bypass CORS restrictions
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const clawnchpadUrl = 'https://clawn.ch/pad/';

    const response = await fetch(corsProxy + clawnchpadUrl, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();

    // Parse HTML untuk mengambil token data
    const tokens = parseClawnchpadHTML(html);

    return tokens;
  } catch (error) {
    console.error('Error fetching from Clawnchpad:', error);
    return getDefaultTokens();
  }
}

/**
 * Parse HTML dari Clawnchpad untuk mengekstrak token data
 */
function parseClawnchpadHTML(html: string): ClawnchpadToken[] {
  const tokens: ClawnchpadToken[] = [];

  // Regex untuk mencari token entries dalam HTML
  // Format: $SYMBOL +/-X.X% | Name | $Price · MCap $X.XXK/M
  const tokenRegex = /\$([A-Z0-9]+)\s+([\+\-]\d+\.?\d*%)\s*\n\s*([^\n]+)\n\s*\$?([\d.]+[KMB]?)\s*·\s*MCap\s*\$?([\d.]+[KMB]?)/g;

  let match;
  while ((match = tokenRegex.exec(html)) !== null) {
    const [, symbol, change, name, price, mcap] = match;

    tokens.push({
      symbol: symbol.trim(),
      name: name.trim(),
      change: change.trim(),
      price: `$${price}`,
      mcap: `$${mcap}`,
    });
  }

  // Jika regex tidak menemukan apa-apa, gunakan default tokens
  if (tokens.length === 0) {
    return getDefaultTokens();
  }

  return tokens.slice(0, 10); // Return top 10 tokens
}

/**
 * Default tokens jika fetch gagal
 */
function getDefaultTokens(): ClawnchpadToken[] {
  return [
    {
      symbol: 'CLAWNCH',
      name: 'CLAWNCH',
      change: '-1.7%',
      price: '$0.0000701',
      mcap: '$7.01M',
      platform: 'Moltbook',
    },
    {
      symbol: 'ZEEBOT',
      name: 'Zeebot',
      change: '-4.8%',
      price: '$0.00000413',
      mcap: '$412.6K',
      platform: 'Moltbook',
    },
    {
      symbol: 'TRIDENT',
      name: 'OpenTrident',
      change: '+51.0%',
      price: '$0.00000255',
      mcap: '$255.3K',
      platform: 'Moltbook',
    },
    {
      symbol: 'BUNKER',
      name: 'MOLT BUNKER',
      change: '-0.6%',
      price: '$0.00000239',
      mcap: '$238.9K',
      platform: '4claw',
    },
    {
      symbol: 'BV7X',
      name: 'BitVault Signal',
      change: '+29.4%',
      price: '$0.00000235',
      mcap: '$235.1K',
      platform: '4claw',
    },
  ];
}

/**
 * Fetch top tokens dari Clawnchpad dengan retry logic
 */
export async function getTopClawnchTokens(limit: number = 5): Promise<ClawnchpadToken[]> {
  try {
    // Coba fetch dari Clawnchpad
    const tokens = await fetchClawnchpadTokens();

    if (tokens.length > 0) {
      return tokens.slice(0, limit);
    }

    // Fallback ke default jika kosong
    return getDefaultTokens().slice(0, limit);
  } catch (error) {
    console.error('Error getting top tokens:', error);
    return getDefaultTokens().slice(0, limit);
  }
}

/**
 * Fetch token dengan retry
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = 3
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return response;
      }

      if (response.status === 429) {
        // Rate limited, tunggu sebelum retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }

      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }

      // Tunggu sebelum retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }

  throw new Error('Max retries exceeded');
}
