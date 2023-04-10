import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Discover, Category } from '~/components';
import NewPost from '~/components/newPost';
import { MainLayout } from '~/layouts';

export default function Home() {
    const [showNewPost, setShowNewPost] = useState(false);
    const searchParams = useSearchParams();
    const popup = searchParams.get('popup');

    useEffect(() => {
        if (popup === 'new-post') {
            setShowNewPost(true);
        } else {
            setShowNewPost(false);
        }
    }, [popup]);

    return (
        <div className="top-0 left-0 right-0">
            <Discover />
            <Category />
            {showNewPost && <NewPost />}
        </div>
    );
}

Home.Layout = MainLayout;
