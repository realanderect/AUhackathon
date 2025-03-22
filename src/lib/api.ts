import { API_BASE_URL, getAuthHeaders, setAuthToken, removeAuthToken } from './config';
import type { 
  User, 
  Portfolio, 
  MarketTrend, 
  InvestmentRecommendation,
  TaxEstimate,
  Alert
} from './types';

// Mock data (keeping the original mock data)
const MOCK_DELAY = 800;

const mockPortfolio: Portfolio = {
  id: 'portfolio-1',
  userId: 'user-1',
  totalValue: 125750.42,
  totalInvested: 100000,
  returns: 25750.42,
  returnsPercentage: 25.75,
  lastUpdated: new Date(),
  investments: [
    {
      id: 'inv-1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      type: 'stock',
      purchasePrice: 150.75,
      currentPrice: 182.63,
      quantity: 50,
      purchaseDate: new Date('2022-03-15'),
      sector: 'Technology',
      returns: 1594,
      returnsPercentage: 21.15,
    },
    {
      id: 'inv-2',
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      type: 'stock',
      purchasePrice: 290.35,
      currentPrice: 338.11,
      quantity: 30,
      purchaseDate: new Date('2022-02-10'),
      sector: 'Technology',
      returns: 1432.8,
      returnsPercentage: 16.45,
    },
    {
      id: 'inv-3',
      symbol: 'VTI',
      name: 'Vanguard Total Stock Market ETF',
      type: 'etf',
      purchasePrice: 215.86,
      currentPrice: 242.97,
      quantity: 100,
      purchaseDate: new Date('2021-11-05'),
      returns: 2711,
      returnsPercentage: 12.56,
    },
    {
      id: 'inv-4',
      symbol: 'BTC',
      name: 'Bitcoin',
      type: 'crypto',
      purchasePrice: 37500,
      currentPrice: 43250,
      quantity: 0.5,
      purchaseDate: new Date('2022-01-20'),
      returns: 2875,
      returnsPercentage: 15.33,
    },
  ],
};

const mockMarketTrends: MarketTrend[] = [
  {
    id: 'trend-1',
    title: 'Tech Sector Showing Strong Growth',
    description: 'Technology companies are outperforming market expectations with strong Q2 earnings reports.',
    impactLevel: 'high',
    sentiment: 'bullish',
    relatedSectors: ['Technology', 'Semiconductors'],
    source: 'Market Analysis',
    timestamp: new Date('2023-07-15T10:30:00'),
  },
  {
    id: 'trend-2',
    title: 'Rising Interest Rates Affecting Real Estate',
    description: 'The Federal Reserves recent rate hikes are putting pressure on the real estate market.',
    impactLevel: 'medium',
    sentiment: 'bearish',
    relatedSectors: ['Real Estate', 'Banking'],
    source: 'Economic Report',
    timestamp: new Date('2023-07-14T14:45:00'),
  },
];

const mockRecommendations: InvestmentRecommendation[] = [
  {
    id: 'rec-1',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'stock',
    currentPrice: 452.73,
    recommendationType: 'buy',
    confidence: 85,
    reasoning: 'Strong position in AI and GPU markets with continued growth potential.',
    potentialReturn: 15.3,
    riskLevel: 'medium',
    timeHorizon: 'long',
  },
  {
    id: 'rec-2',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    type: 'stock',
    currentPrice: 142.56,
    recommendationType: 'buy',
    confidence: 78,
    reasoning: 'E-commerce dominance and AWS growth make it a strong long-term investment.',
    potentialReturn: 12.7,
    riskLevel: 'medium',
    timeHorizon: 'long',
  },
];

const mockTaxEstimate: TaxEstimate = {
  year: 2023,
  totalGains: 12500,
  totalLosses: 3200,
  netTaxableGain: 9300,
  estimatedTax: 1395,
  taxRate: 15,
};

const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    userId: 'user-1',
    type: 'price',
    title: 'Price Alert: AAPL',
    message: 'Apple Inc. has increased by 5% today.',
    isRead: false,
    createdAt: new Date('2023-07-15T09:30:00'),
  },
  {
    id: 'alert-2',
    userId: 'user-1',
    type: 'recommendation',
    title: 'New Investment Recommendation',
    message: 'Based on your profile, we recommend adding NVDA to your portfolio.',
    isRead: true,
    createdAt: new Date('2023-07-14T14:15:00'),
  },
];

// API Error handling
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new ApiError(response.status, error.error || 'An error occurred');
  }
  return response.json();
}

export const api = {
  // Auth - Real backend endpoints
  login: async (email: string, password: string): Promise<User> => {
    console.log('[API] Logging in user:', email);
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse<{ user: User; token: string }>(response);
    setAuthToken(data.token);
    return data.user;
  },

  register: async (name: string, email: string, password: string): Promise<User> => {
    console.log('[API] Registering new user:', email);
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name, email, password }),
    });

    const data = await handleResponse<{ user: User; token: string }>(response);
    setAuthToken(data.token);
    return data.user;
  },

  getCurrentUser: async (): Promise<User> => {
    console.log('[API] Getting current user');
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });

    const data = await handleResponse<{ user: User }>(response);
    return data.user;
  },

  logout: (): void => {
    console.log('[API] Logging out user');
    removeAuthToken();
  },

  // Mock endpoints - keeping original mock data
  getPortfolio: async (userId: string): Promise<Portfolio> => {
    console.log('[API] Getting portfolio for user:', userId);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockPortfolio;
  },

  getMarketTrends: async (): Promise<MarketTrend[]> => {
    console.log('[API] Getting market trends');
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockMarketTrends;
  },

  getRecommendations: async (userId: string): Promise<InvestmentRecommendation[]> => {
    console.log('[API] Getting recommendations for user:', userId);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockRecommendations;
  },

  getTaxEstimates: async (userId: string, year: number): Promise<TaxEstimate> => {
    console.log('[API] Getting tax estimates for user:', userId, 'year:', year);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      ...mockTaxEstimate,
      year,
    };
  },

  getAlerts: async (userId: string): Promise<Alert[]> => {
    console.log('[API] Getting alerts for user:', userId);
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockAlerts;
  },
};
