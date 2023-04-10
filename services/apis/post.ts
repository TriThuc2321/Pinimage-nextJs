import axiosClient from '../axios-client';

interface IPostProp {
    prompt: string;
    hostId: string;
    image: string;
}
export const postApi = {
    createPost: (post: IPostProp) => axiosClient.post('/post', post),
};
