import axiosClient from '../axios-client';

const url = 'openAI';
export const openAIApi = {
    createImage: async (prompt: string) => await axiosClient.post(url, { prompt }),
};
