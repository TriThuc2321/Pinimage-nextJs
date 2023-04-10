import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { openAIApi } from '~/services/apis/openAI';
import { Button } from '~/components/custom';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useStore } from '~/hooks';
import { getRandomPrompt } from '~/utils';
import { postApi } from '~/services/apis/post';

const DEFAULT_IMAGE = 'https://res.cloudinary.com/dpz16u0pa/image/upload/v1680102367/default_jxhszw.jpg';

export default function NewPost() {
    const { showAlert } = useStore();
    const { getUser } = useStore();
    const router = useRouter();
    const pathname = usePathname();
    const [image, setImage] = useState<string>(DEFAULT_IMAGE);

    const [prompt, setPrompt] = useState('');
    const [savedPrompt, setSavePrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingShare, setLoadingShare] = useState(false);

    const handleGetSample = () => {
        const sample = getRandomPrompt(prompt);
        setPrompt(sample);
    };
    const handleGenerateImg = async () => {
        try {
            if (!prompt) {
                showAlert({
                    message: 'Please enter prompt to create image',
                    alertType: 'ERROR',
                });
                return;
            }

            setLoading(true);
            const { data } = await openAIApi.createImage(prompt);
            setImage(data);
            setSavePrompt(prompt);
        } catch (e) {
            console.log({ Error: e });
        } finally {
            setLoading(false);
        }
    };

    const handleShareImage = async () => {
        try {
            if (image === DEFAULT_IMAGE) {
                showAlert({
                    message: 'Generate image to share on Pinimage',
                    alertType: 'ERROR',
                });
                return;
            }

            setLoadingShare(true);
            const { _id } = getUser();
            await postApi.createPost({ prompt: savedPrompt, image, hostId: _id });

            showAlert({
                message: 'Share to Pinimage successfully',
                alertType: 'SUCCESS',
            });
            router.push(pathname);
        } catch (e) {
            console.log({ Error: e });
            showAlert({
                message: 'Somethings went wrong',
                alertType: 'ERROR',
            });
        } finally {
            setLoadingShare(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-blear text-gray-800 top-0 left-0 right-0 bottom-0 fixed z-50">
            <div className="rounded-lg relative bg-white w-full h-full px-4 pt-4 desktop:w-1/3 desktop:h-5/6  overflow-y-scroll">
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()}>
                        <img
                            className="w-8 h-8"
                            src="https://res.cloudinary.com/dpz16u0pa/image/upload/v1678937447/Untitled-2_ecjiqz.png"
                        />
                        <p className="font-bold text-xl">
                            <span className="text-primary">PIN</span>IMAGE
                        </p>
                    </div>

                    <XMarkIcon
                        className=" w-6 h-6 hover:text-primary cursor-pointer"
                        onClick={() => router.push(pathname)}
                    />
                </div>
                <p className="mt-10 text-2xl font-bold">Create</p>
                <p>
                    What do you want to try next? Think of something you’re into—like “astronaut in space” and see what
                    you create.
                </p>

                <div className="flex items-center mt-6 mb-2">
                    <p>Prompt</p>
                    <Button className="h-6 ml-2" text="Get sample" onClick={handleGetSample} />
                </div>
                <textarea
                    className="mt-1 bg-white rounded-sm border px-2 py-1 w-full"
                    placeholder="Prompt..."
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    disabled={loading}
                />
                <img className="mt-2 w-60" src={image} />

                <div className="absolute bottom-0 left-4 right-4">
                    <Button
                        className="mt-10"
                        status={loading ? 'LOADING' : 'ACTIVE'}
                        outline
                        text="Generate"
                        onClick={handleGenerateImg}
                    />
                    <Button
                        className="mt-2 mb-4"
                        status={loadingShare ? 'LOADING' : 'ACTIVE'}
                        text="Share with Pinimage"
                        onClick={handleShareImage}
                    />
                </div>
            </div>
        </div>
    );
}
