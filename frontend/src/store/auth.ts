import { create } from 'zustand';
import api from '../services/api';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string, country?: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
}

function loadFromStorage() {
  try {
    return {
      user: JSON.parse(localStorage.getItem('atal_user') || 'null'),
      token: localStorage.getItem('atal_token'),
    };
  } catch {
    return { user: null, token: null };
  }
}

const { user: storedUser, token: storedToken } = loadFromStorage();

export const useAuthStore = create<AuthState>((set, get) => ({
  user: storedUser,
  token: storedToken,

  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('atal_token', data.token);
    localStorage.setItem('atal_user', JSON.stringify(data.user));
    set({ user: data.user, token: data.token });
  },

  register: async (name, email, password, phone, country) => {
    const { data } = await api.post('/auth/register', { name, email, password, phone, country });
    localStorage.setItem('atal_token', data.token);
    localStorage.setItem('atal_user', JSON.stringify(data.user));
    set({ user: data.user, token: data.token });
  },

  logout: () => {
    localStorage.removeItem('atal_token');
    localStorage.removeItem('atal_user');
    set({ user: null, token: null });
  },

  isAdmin: () => get().user?.role === 'admin',
  isAuthenticated: () => !!get().token,
}));
