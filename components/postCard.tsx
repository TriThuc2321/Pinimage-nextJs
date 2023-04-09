import { HeartIcon, EyeIcon } from '@heroicons/react/24/solid';
import { IPost } from '~/interfaces';

interface IPostCardProps {
    post: IPost;
}
export default function PostCard({ post }: IPostCardProps) {
    return (
        <div className="">
            <img className="rounded-xl" src={post.url} alt={post.prompt} />
            <div className="flex items-center justify-between h-10">
                <div className="flex items-center">
                    <img className="h-6 w-6 rounded-full mr-2" src={post.host?.picture || ''} alt="host" />
                    <p className="font-bold text-white ">{post.host?.name}</p>
                </div>

                <div className="flex text-white">
                    <div className="flex items-center mr-4">
                        <HeartIcon className="w-4 h-4 mr-1" />
                        <p>{post.heart}</p>
                    </div>

                    <div className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        <p>{post.view}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
