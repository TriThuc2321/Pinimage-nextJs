import { IUser } from './user';

interface IFavorite {
    _id: string;
    userId: string;
    postId: string;
}
interface IPost {
    _id: string;
    prompt: string;
    url: string;
    host?: IUser;
    views?: number;
    favorites?: Array<IFavorite>;
}

export type { IPost };
