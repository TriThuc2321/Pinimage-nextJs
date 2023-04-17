import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import React, { useEffect, useState } from 'react';
import { PostCard } from '~/components';
import { postApi } from '~/services/apis/post';
import { INodeApi, IPost } from '~/interfaces';
import { useRouter } from 'next/router';
import { Button } from './custom';

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
    const router = useRouter();
    const [categories, setCategories] = useState<Array<IPost>>([]);
    const [pagination, setPagination] = useState<IPagination>({
        limit: 12,
        page: 0,
        total: 13,
    });
    const [isReachBottom, setIsReachBottom] = useState(true);
    const [loading, setLoading] = useState(false);

    const getPosts = async (page: number) => {
        if (page <= 1) {
            setLoading(true);
        }
        const { data, pagination } = (await postApi.getPosts(`?limit=12&page=${page}`)) as unknown as IDataCategory;
        if (page === 1) {
            setCategories(data);
        } else {
            setCategories([...categories, ...data]);
        }
        setPagination(pagination);
        setLoading(false);
    };
    useBottomScrollListener(() => setIsReachBottom(true), {
        offset: 10,
        debounce: 2000,
    });

    const handleLove = async (isLoved: boolean, postId: string, userId: string) => {
        try {
            if (!userId) {
                router.push('/login');
                return;
            }

            if (isLoved) {
                const { status } = (await postApi.unloved(postId, userId)) as unknown as INodeApi;
                if (status === 'SUCCESS') {
                    setCategories(
                        categories.map((post) => {
                            if (post._id !== postId) return post;

                            const newFavorites = post.favorites?.filter((e) => e.userId !== userId);
                            return {
                                ...post,
                                favorites: newFavorites,
                            };
                        }),
                    );
                }
            } else {
                const { status, data } = (await postApi.loved(postId, userId)) as unknown as INodeApi;
                if (status === 'SUCCESS') {
                    setCategories(
                        categories.map((post) => {
                            if (post._id !== postId) return post;

                            const prevFavorites = !!post?.favorites?.length ? post.favorites : [];
                            const newFavorites = [data, ...prevFavorites];
                            return {
                                ...post,
                                favorites: newFavorites,
                            };
                        }),
                    );
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleReload = () => {
        setCategories([]);
        getPosts(1);
    };

    useEffect(() => {
        if (isReachBottom && pagination.limit * pagination.page < pagination.total) {
            getPosts(+pagination.page + 1);
            setIsReachBottom(false);
        }
    }, [isReachBottom]);

    return (
        <div className="flex flex-col right-0 left-0 m-0 top-96">
            <Button className="w-12 mt-4 ml-6" text="Reload" onClick={handleReload} />

            <div className="p-6 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-8 w-full">
                {loading && (
                    <>
                        <div className="skeleton w-full h-96 rounded-lg" />
                        <div className="skeleton w-full h-96 rounded-lg" />
                        <div className="skeleton w-full h-96 rounded-lg" />
                        <div className="skeleton w-full h-96 rounded-lg" />
                        <div className="skeleton w-full h-96 rounded-lg" />
                        <div className="skeleton w-full h-96 rounded-lg" />
                    </>
                )}
                {!loading &&
                    categories &&
                    categories.map((item) => <PostCard key={item._id} post={item} handleLove={handleLove} />)}
            </div>
        </div>
    );
}
