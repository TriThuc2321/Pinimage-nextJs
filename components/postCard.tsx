import Image from 'next/image';
import { HeartIcon, EyeIcon } from '@heroicons/react/24/solid';
import { INodeApi, IPost } from '~/interfaces';
import grey from '~/assets/grey.png';
import { useEffect, useState } from 'react';
import { postApi } from '~/services/apis/post';
import { useStore } from '~/hooks';

interface IPostCardProps {
    post: IPost;
    handleLove: (isLoved: boolean, postId: string, userId: string) => void;
}
export default function PostCard({ post, handleLove }: IPostCardProps) {
    const { getUser } = useStore();
    const { _id } = getUser();

    const isLoved = !!post.favorites?.find((e) => e.userId === _id);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const { _id } = getUser();
    //         const a = await postApi.loved(post._id, _id);
    //         console.log(a);
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className="">
            <Image className="rounded-xl w-max" loader={() => post.url} src={grey} alt={post.prompt} />
            <div className="flex items-center justify-between h-10">
                <div className="flex items-center">
                    <Image
                        className="h-6 w-6 rounded-full mr-2"
                        loader={() => post.host?.picture || ''}
                        alt="host"
                        src={grey}
                    />
                    <p className="font-bold text-white ">{post.host?.name}</p>
                </div>

                <div className="flex text-white">
                    <div className="flex items-center mr-4">
                        <HeartIcon
                            className={`w-4 h-4 mr-1 cursor-pointer ${isLoved && 'text-primary'}`}
                            onClick={() => handleLove(isLoved, post._id, _id)}
                        />
                        <p>{post.favorites?.length || '0'}</p>
                    </div>

                    <div className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1 cursor-pointer" />
                        <p>{post.views || '0'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
