import axiosClient from '../axios-client';

interface IPostProp {
    prompt: string;
    hostId: string;
    image: string;
}
export const postApi = {
    getPosts: (params: string) => axiosClient.get(`/post/${params}`),
    createPost: (post: IPostProp) => axiosClient.post('/post', post),
    loved: (postId: string, userId: string) => axiosClient.post('/post/loved', { postId, userId }),
    unloved: (postId: string, userId: string) => axiosClient.post('/post/unloved', { postId, userId }),
};
