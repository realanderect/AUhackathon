import type { 
  User, 
  Portfolio, 
  MarketTrend, 
  InvestmentRecommendation,
  TaxEstimate,
  Alert
} from './types';

// Mock data for development
const MOCK_DELAY = 800;

// Mock user data
const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  profilePicture: 'https://i.pravatar.cc/150?img=68',
  riskProfile: 'moderate',
  financialGoals: [
    {
      id: 'goal-1',
      name: 'Retirement',
      targetAmount: 1000000,
      currentAmount: 250000,
      targetDate: new Date('2050-01-01'),
      priority: 'high',
    },
    {
      id: 'goal-2',
      name: 'House Down Payment',
      targetAmount: 100000,
      currentAmount: 35000,
      targetDate: new Date('2025-06-01'),
      priority: 'medium',
    }
  ],
  createdAt: new Date('2022-01-15'),
};

// Mock portfolio data
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

// Mock market trends
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
    description: 'The Federal Reserve's recent rate hikes are putting pressure on the real estate market.',
    impactLevel: 'medium',
    sentiment: 'bearish',
    relatedSectors: ['Real Estate', 'Banking'],
    source: 'Economic Report',
    timestamp: new Date('2023-07-14T14:45:00'),
  },
  {
    id: 'trend-3',
    title: 'Renewable Energy Investments Surge',
    description: 'New government incentives are driving increased investment in renewable energy companies.',
    impactLevel: 'medium',
    sentiment: 'bullish',
    relatedSectors: ['Energy', 'Utilities'],
    source: 'Industry Analysis',
    timestamp: new Date('2023-07-13T09:15:00'),
  },
];

// Mock investment recommendations
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
  {
    id: 'rec-3',
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    type: 'stock',
    currentPrice: 107.25,
    recommendationType: 'hold',
    confidence: 65,
    reasoning: 'Energy sector volatility suggests maintaining current positions.',
    potentialReturn: 5.2,
    riskLevel: 'medium',
    timeHorizon: 'medium',
  },
];

// Mock tax estimates
const mockTaxEstimate: TaxEstimate = {
  year: 2023,
  totalGains: 12500,
  totalLosses: 3200,
  netTaxableGain: 9300,
  estimatedTax: 1395,
  taxRate: 15,
};

// Mock alerts
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
  {
    id: 'alert-3',
    userId: 'user-1',
    type: 'tax',
    title: 'Tax Document Available',
    message: 'Your Q2 tax estimate report is now available for review.',
    isRead: false,
    createdAt: new Date('2023-07-13T11:45:00'),
  },
];

// API functions
export const api = {
  // Auth
  login: async (email: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    if (email && password) {
      return mockUser;
    }
    throw new Error('Invalid credentials');
  },
  
  register: async (name: string, email: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    if (name && email && password) {
      return {
        ...mockUser,
        name,
        email,
      };
    }
    throw new Error('Registration failed');
  },
  
  // Portfolio
  getPortfolio: async (userId: string): Promise<Portfolio> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockPortfolio;
  },
  
  // Market Trends
  getMarketTrends: async (): Promise<MarketTrend[]> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockMarketTrends;
  },
  
  // Recommendations
  getRecommendations: async (userId: string): Promise<InvestmentRecommendation[]> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockRecommendations;
  },
  
  // Tax
  getTaxEstimates: async (userId: string, year: number): Promise<TaxEstimate> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      ...mockTaxEstimate,
      year,
    };
  },
  
  // Alerts
  getAlerts: async (userId: string): Promise<Alert[]> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockAlerts;
  },
};