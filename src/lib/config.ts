export const API_BASE_URL = 'http://localhost:5000/api';

// Token management
export const getAuthToken = (): string | null => localStorage.getItem('authToken');
export const setAuthToken = (token: string): void => localStorage.setItem('authToken', token);
export const removeAuthToken = (): void => localStorage.removeItem('authToken');

// Auth headers helper
export const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
