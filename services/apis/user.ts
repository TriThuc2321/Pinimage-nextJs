import { INewUser } from '@/interfaces';
import axiosClient from '../axios-client';

const url = 'user';
const createUser = async (user: INewUser) => await axiosClient.post(url, user);
const getUserByEmail = async (email: string) => await axiosClient.get(`${url}/${email}`);

export { createUser, getUserByEmail };
