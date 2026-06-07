import { create } from 'zustand';

export interface RecentSession {
  id: string;
  type: string;
  date: string;
}

interface AppState {
  overallProgress: number;
  recentSessions: RecentSession[];
  setOverallProgress: (progress: number) => void;
  addSession: (session: Omit<RecentSession, 'id'>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  overallProgress: 0,
  recentSessions: [],
  
  setOverallProgress: (progress) => set({ overallProgress: progress }),
  
  addSession: (session) => set((state) => ({
    recentSessions: [
      { ...session, id: Math.random().toString(36).substring(7) },
      ...state.recentSessions
    ].slice(0, 10) // Keep only the 10 most recent
  })),
}));
