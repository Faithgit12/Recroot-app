import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivitySource } from '../services/api/reports';

interface ReportState {
  recentActivities: ActivitySource[];
  setActivities: (activities: ActivitySource[]) => void;
  clearActivities: () => void;
}

export const useReportStore = create<ReportState>()(
  persist(
    (set) => ({
      recentActivities: [],
      setActivities: (activities) => {
        
        const interviews = activities.filter(a => a.type === 'interview').slice(0, 10);
        const matches = activities.filter(a => a.type === 'match').slice(0, 10);
        const others = activities.filter(a => a.type !== 'interview' && a.type !== 'match');

        set({ recentActivities: [...interviews, ...matches, ...others] });
      },
      clearActivities: () => set({ recentActivities: [] }),
    }),
    {
      name: 'report-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
