import { IUser } from './user';

interface IPost {
    _id: string;
    prompt: string;
    url: string;
    host?: IUser;
    views?: number;
    heart?: number;
}

export type { IPost };
