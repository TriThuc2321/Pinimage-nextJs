import axiosClient from './axios-client';

interface LoginPayload {
    accessToken: string;
}

export const authApi = {
    login(payload: LoginPayload) {
        return axiosClient.post('/login', payload);
    },

    logout() {
        return axiosClient.post('/logout');
    },
};
