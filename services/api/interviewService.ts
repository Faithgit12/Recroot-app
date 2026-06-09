import api from './client';

export interface GenerateInterviewRequest {
  resumeId?: string;
  jobDescription?: string;
  jobRole?: string;
}

export interface InterviewSession {
  _id: string;
  id?: string;
  resumeId: string;
  jobRole: string;
  questions: string[];
  createdAt?: string;
}

export const interviewService = {
  generate: async (data: GenerateInterviewRequest): Promise<InterviewSession> => {
    const response = await api.post('/interviews/generate', data);
    return response.data;
  },

  getInterviews: async (): Promise<InterviewSession[]> => {
    const response = await api.get('/interviews');
    return response.data;
  },

  getInterviewById: async (id: string): Promise<InterviewSession> => {
    const response = await api.get(`/interviews/${id}`);
    return response.data;
  },

  deleteInterview: async (id: string) => {
    const response = await api.delete(`/interviews/${id}`);
    return response.data;
  },
};
