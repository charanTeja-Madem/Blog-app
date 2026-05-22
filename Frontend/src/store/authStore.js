import { create } from 'zustand';
import API_BASE_URL from '../config/api';
import axios from 'axios';

export const useAuth = create((set) => ({
  currentuser: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Login function
  login: async (email, password, role) => {
    set({ loading: true, error: null });
    try {
      const endpoint = role === 'AUTHOR' ? '/author-api/login' : '/common-api/login';
      const response = await axios.post(
        `${API_BASE_URL}${endpoint}`,
        { email, password, role },
        { withCredentials: true }
      );
      
      const user = response.data.payload || response.data.user;
      set({
        currentuser: user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
      return user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      set({
        isAuthenticated: false,
        loading: false,
        error: errorMessage,
      });
      throw new Error(errorMessage);
    }
  },

  // Logout function
  logout: async () => {
    set({ loading: true });
    try {
      await axios.get(`${API_BASE_URL}/common-api/logout`, {
        withCredentials: true,
      });
      set({
        currentuser: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('Logout error:', err);
      // Clear state even if logout fails
      set({
        currentuser: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },

  // Check session on app load
  checkSession: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/common-api/user`, {
        withCredentials: true,
      });
      
      const user = response.data.payload || response.data.user;
      set({
        currentuser: user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
      return user;
    } catch (err) {
      // Token expired or no session
      set({
        currentuser: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
      return null;
    }
  },

  // Set user
  setUser: (user) => set({ currentuser: user }),

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuth;
