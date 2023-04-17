import React from 'react';
import { Seo } from '~/components';
import { MainLayout } from '~/layouts';

export default function MyPost() {
    return (
        <>
            <Seo
                data={{
                    title: 'Favorite | Pinimage',
                    description:
                        'The Pinimage allows you to create an original image given a text prompt. The more detailed the description, the more likely you are to get the result that you or your end user want.',
                    url: 'https://pinimage-next-js.vercel.app/',
                    thumbnailUrl: 'https://res.cloudinary.com/dpz16u0pa/image/upload/v1678937447/Untitled-2_ecjiqz.png',
                }}
            />
            <div className="w-screen h-screen flex justify-center items-center">Chưa có code bạn ơi</div>;
        </>
    );
}

MyPost.Layout = MainLayout;
