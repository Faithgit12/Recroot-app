import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MatchScoreResult } from '../services/aiExtractionService';

interface MatchState {
  recentMatch: MatchScoreResult | null;
  setRecentMatch: (match: MatchScoreResult) => void;
  clearRecentMatch: () => void;
}

export const useMatchStore = create<MatchState>()(
  persist(
    (set) => ({
      recentMatch: null,
      setRecentMatch: (match) => set({ recentMatch: match }),
      clearRecentMatch: () => set({ recentMatch: null }),
    }),
    {
      name: 'match-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
