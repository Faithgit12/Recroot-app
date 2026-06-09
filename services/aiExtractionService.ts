import api from './api/client';

export interface ExtractedJobDetails {
  jobTitle: string;
  experience: string;
  jobType: string;
  skills: string;
  location: string;
  keySkills: string[];
}

export interface MatchScoreResult {
  overallScore: number;
  skillsMatch: number;
  qualificationMatch: number;
  experienceMatch: number;
  educationMatch: number;
  overallFit: number;
  missingSkills?: string[];
  matchedSkills?: string[];
  feedback?: string;
  jobTitle?: string;
}

export const extractJobDetails = async (jobDescription: string): Promise<ExtractedJobDetails> => {
  try {
    const response = await api.post('/jobs/extract', { description: jobDescription });
    return response.data;
  } catch (error) {
    console.error('Error extracting job details:', error);
    throw error;
  }
};

export const matchResumeToJob = async (resumeText: string, jobDetails: ExtractedJobDetails): Promise<MatchScoreResult> => {
  // Placeholder for when matchResumeToJob is implemented
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        overallScore: 95,
        skillsMatch: 96,
        qualificationMatch: 96,
        experienceMatch: 96,
        educationMatch: 96,
        overallFit: 96
      });
    }, 2000); // Simulate 2 second AI processing
  });
};
