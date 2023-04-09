import axiosClient from '../axios-client';

export const authApi = {
    login: (accessToken: string | undefined) => axiosClient.post('/login', { accessToken }),
    logout: () => axiosClient.post('/logout'),
};
