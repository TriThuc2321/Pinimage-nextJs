import { INewUser } from '~/interfaces';
import axiosClient from '../axios-client';

const url = 'user';
export const userApi = {
    createUser: (user: INewUser) => axiosClient.post(url, user),
    getUserByEmail: (email: string) => axiosClient.get(`${url}/${email}`),
};
