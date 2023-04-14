import Image from 'next/image';
import { HeartIcon, EyeIcon } from '@heroicons/react/24/solid';
import { IPost } from '~/interfaces';
import grey from '~/assets/grey.png';

interface IPostCardProps {
    post: IPost;
}
export default function PostCard({ post }: IPostCardProps) {
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
                        <HeartIcon className="w-4 h-4 mr-1" />
                        <p>{post.heart || '0'}</p>
                    </div>

                    <div className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        <p>{post.views || '0'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
