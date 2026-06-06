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
  match: number;
  skillsMatch2: number; // For the duplicated field in mockup
}

/**
 * Placeholder for the actual AI endpoint. 
 * Replace these when the backend URLs are provided.
 */
const AI_EXTRACTION_URL = '';
const AI_MATCHING_URL = '';

export const extractJobDetails = async (jobDescription: string): Promise<ExtractedJobDetails> => {
  if (AI_EXTRACTION_URL) {
    // TODO: Implement actual fetch call once payload details are provided
    // const response = await fetch(AI_EXTRACTION_URL, { ... });
    // return response.json();
  }

  // Mock implementation for UI development
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        jobTitle: 'Senior Product Designer',
        experience: '2+ Years',
        jobType: 'Remote',
        skills: 'Prototyping, soft skills',
        location: 'Not Specified',
        keySkills: ['Figma', 'Wireframing', 'User Research', 'Prototyping', 'Design Systems']
      });
    }, 3000); // Simulate 3 second AI processing
  });
};

export const matchResumeToJob = async (resumeText: string, jobDetails: ExtractedJobDetails): Promise<MatchScoreResult> => {
  if (AI_MATCHING_URL) {
    // TODO: Implement actual fetch call once payload details are provided
  }

  // Mock implementation for UI development
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        overallScore: 95,
        skillsMatch: 94,
        qualificationMatch: 94,
        experienceMatch: 94,
        match: 94,
        skillsMatch2: 94
      });
    }, 2000); // Simulate 2 second AI processing
  });
};
