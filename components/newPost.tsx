import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { openAIApi } from '~/services/apis/openAI';
import { Button } from '~/components/custom';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useStore } from '~/hooks';

export default function NewPost() {
    const { showAlert } = useStore();
    const router = useRouter();
    const pathname = usePathname();
    const [image, setImage] = useState<string>(
        'https://res.cloudinary.com/dpz16u0pa/image/upload/v1680102367/default_jxhszw.jpg',
    );

    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateImg = async () => {
        setLoading(true);
        const { data } = await openAIApi.createImage(prompt);
        setImage(data);
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center bg-blear text-gray-800 top-0 left-0 right-0 bottom-0 fixed z-50">
            <div className="rounded-sm relative bg-white w-full h-full px-4 pt-4 desktop:w-1/3 desktop:h-5/6">
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
                    className="absolute top-4 right-4 w-6 h-6 hover:text-primary cursor-pointer"
                    onClick={() => router.push(pathname)}
                />

                <p className="mt-4 text-2xl font-bold">Create</p>
                <p>
                    What do you want to try next? Think of something you’re into—like “astronaut in space” and see what
                    you create.
                </p>

                <p className="mt-6">Prompt</p>
                <input
                    className="mt-1 bg-white rounded-sm border px-2 py-1 w-full"
                    type="text"
                    placeholder="Prompt..."
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    disabled={loading}
                />
                <img className="mt-2 w-60" src={image} />

                <Button
                    className="mt-10"
                    status={loading ? 'LOADING' : 'ACTIVE'}
                    outline
                    text="Generate"
                    onClick={handleGenerateImg}
                />
                <Button className="mt-2" text="Share with Pinimage" />
            </div>
        </div>
    );
}
