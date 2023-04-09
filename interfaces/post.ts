import { IUser } from './user';

interface IPost {
    _id: string;
    prompt: string;
    url: string;
    host?: IUser;
    view?: number;
    heart?: number;
}

export type { IPost };
