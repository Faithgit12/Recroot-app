import api from './client';

export interface Job {
  _id: string;
  id?: string;
  title: string;
  description: string;
  createdAt?: string;
}

export const jobService = {
  createJob: async (data: { title: string; description: string }): Promise<Job> => {
    const response = await api.post('/jobs', data);
    return response.data;
  },

  getJobs: async (): Promise<Job[]> => {
    const response = await api.get('/jobs');
    return response.data;
  },

  getJobById: async (id: string): Promise<Job> => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  deleteJob: async (id: string) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },
};
