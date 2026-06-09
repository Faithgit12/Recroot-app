import api from './client';

export interface Resume {
  _id: string; // The backend uses _id for mongo or id
  id?: string;
  name?: string;
  filename?: string;
  url?: string;
  uploadedAt?: string;
}

export const resumeService = {
  uploadResume: async (fileUri: string, fileName: string, mimeType: string) => {
    const formData = new FormData();
    // @ts-ignore - React Native FormData accepts an object with uri, name, type
    formData.append('resume', {
      uri: fileUri,
      name: fileName,
      type: mimeType,
    });

    const response = await api.post('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getMyResumes: async (): Promise<Resume[]> => {
    const response = await api.get('/resumes/my-resumes');
    return response.data;
  },

  getResumeById: async (id: string): Promise<Resume> => {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
  },

  deleteResume: async (id: string) => {
    const response = await api.delete(`/resumes/${id}`);
    return response.data;
  },
};
