import api from './client';

export interface ScoreRequest {
  resumeId: string;
  jobDescription: string;
}

export interface ScoreResponse {
  message?: string;
  data: {
    resumeId: string;
    fileName: string;
    matchScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    feedback: string;
  };
}

export const scoringService = {
  score: async (data: ScoreRequest): Promise<ScoreResponse> => {
    const response = await api.post('/scoring/score', data);
    return response.data;
  },
};
