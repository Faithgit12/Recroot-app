import api from './client';

export interface ApplyRequest {
  jobId: string;
  resumeId: string;
}

export interface Application {
  _id: string;
  id?: string;
  jobId: string;
  resumeId: string;
  status: 'applied' | 'under_review' | 'shortlisted' | 'rejected' | 'hired';
  createdAt?: string;
}

export const applicationService = {
  apply: async (data: ApplyRequest): Promise<Application> => {
    const response = await api.post('/applications/apply', data);
    return response.data;
  },

  getMyApplications: async (): Promise<Application[]> => {
    const response = await api.get('/applications/my-applications');
    return response.data;
  },

  getApplicationsByJob: async (jobId: string): Promise<Application[]> => {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
  },

  updateStatus: async (id: string, status: Application['status']): Promise<Application> => {
    const response = await api.patch(`/applications/${id}/status`, { status });
    return response.data;
  },
};
