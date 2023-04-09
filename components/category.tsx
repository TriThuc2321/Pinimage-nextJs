import React from 'react';
import { posts } from '~/services/mock';
import { PostCard } from '~/components';

export default function Category() {
    return (
        <div className="flex flex-col right-0 left-0 m-0">
            <p className="font-bold text-2xl ml-4 mt-4">Pinimage</p>

            <div className="p-6 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 w-full">
                {posts.map((item) => (
                    <PostCard key={item._id} post={item} />
                ))}
            </div>
        </div>
    );
}
