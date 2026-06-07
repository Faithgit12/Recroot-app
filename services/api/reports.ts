import api from './client';

export interface ActivitySource {
  id: string;
  type: 'resume' | 'job' | 'match' | 'interview';
  title: string;
  subtitle: string;
  icon: string;
  createdAt: string;
}

export const fetchUserActivities = async (): Promise<ActivitySource[]> => {
  try {
    const response = await api.get('/activities/history');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch user activities, falling back to mock data:', error);
    
    // Return mock data for UI development if backend is not ready
    return [
      {
        id: 'Alex_Joshua_Resume.pdf',
        type: 'resume',
        title: 'Alex_Joshua_Resume.pdf',
        subtitle: 'Senior Product Designer',
        icon: 'document-outline',
        createdAt: new Date().toISOString()
      },
      {
        id: 'job_desc_1',
        type: 'job',
        title: 'Job Description',
        subtitle: 'Senior Product Designer at Techcrush',
        icon: 'briefcase-outline',
        createdAt: new Date().toISOString()
      },
      {
        id: 'match_score_1',
        type: 'match',
        title: 'Match Score: Techcrush',
        subtitle: 'Senior Product Designer',
        icon: 'analytics-outline',
        createdAt: new Date().toISOString()
      },
      {
        id: 'interview_prep_1',
        type: 'interview',
        title: 'Interview Prep: Techcrush',
        subtitle: 'Senior Product Designer',
        icon: 'calendar-outline',
        createdAt: new Date().toISOString()
      }
    ];
  }
};
