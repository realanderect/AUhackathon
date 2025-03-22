// Type definitions for the application

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  financialGoals: FinancialGoal[];
  createdAt: Date;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  priority: 'low' | 'medium' | 'high';
}

export interface Portfolio {
  id: string;
  userId: string;
  totalValue: number;
  totalInvested: number;
  returns: number;
  returnsPercentage: number;
  lastUpdated: Date;
  investments: Investment[];
}

export interface Investment {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'etf' | 'crypto' | 'bond' | 'mutual_fund' | 'other';
  purchasePrice: number;
  currentPrice: number;
  quantity: number;
  purchaseDate: Date;
  sector?: string;
  returns?: number;
  returnsPercentage?: number;
}

export interface MarketTrend {
  id: string;
  title: string;
  description: string;
  impactLevel: 'low' | 'medium' | 'high';
  sentiment: 'bearish' | 'neutral' | 'bullish';
  relatedSectors: string[];
  source?: string;
  timestamp: Date;
}

export interface TaxEstimate {
  year: number;
  totalGains: number;
  totalLosses: number;
  netTaxableGain: number;
  estimatedTax: number;
  taxRate: number;
}

export interface InvestmentRecommendation {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'etf' | 'crypto' | 'bond' | 'mutual_fund' | 'other';
  currentPrice: number;
  recommendationType: 'buy' | 'sell' | 'hold';
  confidence: number; // 0-100
  reasoning: string;
  potentialReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  timeHorizon: 'short' | 'medium' | 'long';
}

export interface Alert {
  id: string;
  userId: string;
  type: 'price' | 'news' | 'recommendation' | 'tax';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}