import { ListImages } from '~/components';
import { posts } from '~/services/mock';

export default function Discover() {
    return (
        <div className="top-0 bottom-0 left-0 right-0">
            <img
                className="h-screen w-screen absolute -z-10"
                src="https://res.cloudinary.com/dpz16u0pa/image/upload/v1678937548/c1fb18f9a6ae217916932d522029a2a5_1_jjoyyx.jpg"
            />

            <div className="flex justify-center items-center w-screen h-screen flex-col desktop:justify-start desktop:flex-row">
                <div className=" desktop:ml-24 max-w-xl text-white desktop:bg-blear rounded-xl shadow-lg px-12 py-8">
                    <p className="text-5xl  font-mono">
                        CREATE YOUR <span className="text-primary">PINIMAGE</span>
                    </p>
                    <p className="text-3xl font-mono">BY YOUR WAY.</p>

                    <p className="mt-6 text-lg">
                        The Pinimage allows you to create an original image given a text prompt. The more detailed the
                        description, the more likely you are to get the result that you or your end user want.
                    </p>
                </div>

                <ListImages
                    posts={posts}
                    className="w-full px-2 desktop:absolute desktop:right-0 desktop:w-1/2 bg-transparent"
                />
            </div>
        </div>
    );
}
