import api from './client';

export interface SignupRequest {
  fullName: string;
  email: string;
  password?: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserProfileUpdate {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  title?: string;
  skills?: string[];
  [key: string]: any;
}

export const authService = {
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  updateProfile: async (data: UserProfileUpdate): Promise<any> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },
};
