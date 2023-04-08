import axiosClient from '../axios-client';

export const authApi = {
    login: (accessToken: string) => axiosClient.post('/login', { accessToken }),
    logout: () => axiosClient.post('/logout'),
};
