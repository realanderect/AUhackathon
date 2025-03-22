import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  Portfolio, 
  MarketTrend, 
  InvestmentRecommendation,
  Alert,
  TaxEstimate
} from './types';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Portfolio data
  portfolio: Portfolio | null;
  marketTrends: MarketTrend[];
  recommendations: InvestmentRecommendation[];
  alerts: Alert[];
  taxEstimates: TaxEstimate | null;
  
  // UI state
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setPortfolio: (portfolio: Portfolio) => void;
  setMarketTrends: (trends: MarketTrend[]) => void;
  setRecommendations: (recommendations: InvestmentRecommendation[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  setTaxEstimates: (taxEstimates: TaxEstimate) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  markAlertAsRead: (alertId: string) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      portfolio: null,
      marketTrends: [],
      recommendations: [],
      alerts: [],
      taxEstimates: null,
      theme: 'dark',
      sidebarOpen: true,
      
      // Actions
      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setLoading: (isLoading) => set({ isLoading }),
      setPortfolio: (portfolio) => set({ portfolio }),
      setMarketTrends: (trends) => set({ marketTrends: trends }),
      setRecommendations: (recommendations) => set({ recommendations }),
      setAlerts: (alerts) => set({ alerts }),
      setTaxEstimates: (taxEstimates) => set({ taxEstimates }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      markAlertAsRead: (alertId) => set((state) => ({
        alerts: state.alerts.map(alert => 
          alert.id === alertId ? { ...alert, isRead: true } : alert
        )
      })),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        portfolio: null,
        marketTrends: [],
        recommendations: [],
        alerts: [],
        taxEstimates: null
      }),
    }),
    {
      name: 'fingaze-storage',
      partialize: (state) => ({ 
        theme: state.theme,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);