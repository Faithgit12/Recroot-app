import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  fullName: string;
  email: string;
  role: string;
  aboutMe?: string;
  jobTitle?: string;
  company?: string;
  skills?: string[];
  experience?: string;
  location?: string;
  phone?: string;
}

export const calculateProfileStrength = (userProf: any) => {
  if (!userProf) return 0;
  const fieldsToCheck = [
    'fullName', 'email', 'experience', 'company', 
    'jobTitle', 'skills', 'aboutMe', 'location'
  ];
  
  let filledCount = 0;
  fieldsToCheck.forEach(field => {
    if (userProf[field]) {
      filledCount++;
    }
  });

  return Math.round((filledCount / fieldsToCheck.length) * 100);
};

interface AuthState {
  token: string | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  login: (token: string, profile: UserProfile) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      profile: null,
      isAuthenticated: false,
      login: (token, profile) => set({ token, profile, isAuthenticated: true }),
      logout: () => set({ token: null, profile: null, isAuthenticated: false }),
      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
