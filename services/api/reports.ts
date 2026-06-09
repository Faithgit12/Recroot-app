import api from './client';
import { interviewService } from './interviewService';
import { applicationService } from './applicationService';
import { useMatchStore } from '../../store/matchStore';

export interface ActivitySource {
  id: string;
  type: 'resume' | 'job' | 'match' | 'interview';
  title: string;
  subtitle: string;
  icon: string;
  questions?: string[];
  rawData?: any;
  createdAt: string;
}

export const fetchUserActivities = async (): Promise<ActivitySource[]> => {
  try {
    const interviews = await interviewService.getInterviews();
    
    const interviewSources: ActivitySource[] = interviews.map((interview: any) => ({
      id: interview._id || interview.id,
      type: 'interview',
      title: `Interview Prep: ${interview.jobRole || 'Role'}`,
      subtitle: 'Generated Questions',
      icon: 'calendar-outline',
      questions: interview.questions,
      createdAt: interview.createdAt || new Date().toISOString()
    }));

    const applicationsData = await applicationService.getMyApplications();
    const applications = Array.isArray(applicationsData) ? applicationsData : ((applicationsData as any).data || []);

    const applicationSources: ActivitySource[] = applications.map((app: any) => {
      const jobTitle = app.jobId?.title || app.jobTitle || app.role || 'Job Application';
      const score = app.matchScore ?? app.score ?? (app.matchResult && app.matchResult.overallScore) ?? '?';
      return {
        id: app._id || app.id || Math.random().toString(),
        type: 'match',
        title: `Match Score: ${score}%`,
        subtitle: jobTitle,
        icon: 'analytics-outline',
        rawData: {
          overallScore: score,
          matchedSkills: app.matchedSkills || [],
          missingSkills: app.missingSkills || [],
          feedback: app.feedback || ''
        },
        createdAt: app.createdAt || new Date().toISOString()
      };
    });

    const recentMatch = useMatchStore.getState().recentMatch;

    return [
      ...interviewSources,
      ...applicationSources,
      ...(applicationSources.length === 0 ? [{
        id: 'mock_match_score_1',
        type: 'match',
        title: `Match Score: ${recentMatch?.overallScore || '70'}%`,
        subtitle: 'Recent Job Analysis',
        icon: 'analytics-outline',
        rawData: {
          overallScore: recentMatch?.overallScore || 70,
          matchedSkills: recentMatch?.matchedSkills || ['UI Design', 'Figma'],
          missingSkills: recentMatch?.missingSkills || ['React Native'],
          feedback: recentMatch?.feedback || 'This is a mock fallback feedback.'
        },
        createdAt: new Date().toISOString()
      } as ActivitySource] : []),
      {
        id: 'mock_resume_1',
        type: 'resume',
        title: 'Uploaded Resume',
        subtitle: 'Profile Resume',
        icon: 'document-outline',
        createdAt: new Date().toISOString()
      }
    ];
  } catch (error) {
    console.warn('Failed to fetch user activities, falling back to mock data:', error);
    
    return [
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
