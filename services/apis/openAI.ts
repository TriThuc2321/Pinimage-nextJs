import axiosClient from '../axios-client';

const url = 'openAI';
const createImage = async (prompt: string) => await axiosClient.post(url, { prompt });

export { createImage };
