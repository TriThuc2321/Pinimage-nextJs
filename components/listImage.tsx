import React, { CSSProperties } from 'react';
import Image from 'next/image';
import { IPost } from '~/interfaces';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import grey from '~/assets/grey.png';
interface ListImagesProps {
    posts: Array<IPost>;
    className?: string;
}
export default function ListImages({ posts, className }: ListImagesProps) {
    return (
        <div className={className}>
            <Swiper
                style={{ '--swiper-pagination-color': '#d64f64' } as CSSProperties}
                slidesPerView={2.6}
                spaceBetween={5}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
            >
                {posts &&
                    posts.map((item) => (
                        <SwiperSlide key={item._id}>
                            <Image loader={() => item.url} src={grey} className="w-80" alt={item._id} />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}
