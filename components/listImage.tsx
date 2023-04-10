import React from 'react';
import { IPost } from '~/interfaces';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

interface ListImagesProps {
    posts: Array<IPost>;
    className?: string;
}
export default function ListImages({ posts, className }: ListImagesProps) {
    return (
        <div className={className}>
            <Swiper
                style={{ '--swiper-pagination-color': '#d64f64' }}
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
                            <img src={item.url} className="w-80" />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}
