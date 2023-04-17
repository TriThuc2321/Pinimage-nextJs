import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Discover, Category } from '~/components';
import NewPost from '~/components/newPost';
import { Seo } from '~/components';
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
        <>
            <Seo
                data={{
                    title: 'Home | Pinimage',
                    description:
                        'The Pinimage allows you to create an original image given a text prompt. The more detailed the description, the more likely you are to get the result that you or your end user want.',
                    url: 'https://pinimage-next-js.vercel.app/',
                    thumbnailUrl: 'https://res.cloudinary.com/dpz16u0pa/image/upload/v1678937447/Untitled-2_ecjiqz.png',
                }}
            />
            <div className="top-0 left-0 right-0">
                <Discover />
                <Category />
                {showNewPost && <NewPost />}
            </div>
        </>
    );
}

Home.Layout = MainLayout;
