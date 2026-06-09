import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SavedApplication {
  jobId: string;
  jobTitle: string;
  company: string;
  applicantId: string;
  resume: string;
  coverLetter: string;
  submittedAt: string;
}

const STORAGE_KEY = '@recroot_applications';

export const saveApplication = async (application: SavedApplication) => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    const applications: SavedApplication[] = existingData ? JSON.parse(existingData) : [];
    applications.unshift(application);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch (error) {
    console.error('Error saving application:', error);
  }
};

export const getApplications = async (): Promise<SavedApplication[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
};
