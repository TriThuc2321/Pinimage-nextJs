import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import React, { useEffect, useState } from 'react';
import { PostCard } from '~/components';
import { postApi } from '~/services/apis/post';
import { IPost } from '~/interfaces';

interface IPagination {
    total: number;
    page: number;
    limit: number;
}
interface IDataCategory {
    data: Array<IPost>;
    pagination: IPagination;
}

export default function Category() {
    const [categories, setCategories] = useState<Array<IPost>>([]);
    const [pagination, setPagination] = useState<IPagination>({
        limit: 12,
        page: 0,
        total: 13,
    });
    const [isReachBottom, setIsReachBottom] = useState(true);

    useBottomScrollListener(() => setIsReachBottom(true), {
        offset: 10,
        debounce: 2000,
    });

    useEffect(() => {
        if (isReachBottom && pagination.limit * pagination.page < pagination.total) {
            const getPosts = async (page: number) => {
                const { data, pagination } = (await postApi.getPosts(
                    `?limit=12&page=${page}`,
                )) as unknown as IDataCategory;
                setCategories([...categories, ...data]);
                setPagination(pagination);
            };

            getPosts(+pagination.page + 1);
            setIsReachBottom(false);
        }
    }, [isReachBottom]);
    return (
        <div className="flex flex-col right-0 left-0 m-0 top-96">
            <p className="font-bold text-2xl ml-4 mt-4">Pinimage</p>

            <div className="p-6 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-8 w-full">
                {categories && categories.map((item) => <PostCard key={item._id} post={item} />)}
            </div>
        </div>
    );
}
