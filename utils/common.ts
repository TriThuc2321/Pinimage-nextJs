import { samplePrompts } from '~/constants';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const createQueryStringFactory = (searchParams: ReadonlyURLSearchParams) => {
    return useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );
};

export const getRandomPrompt: (prompt: string) => string = (prompt: string) => {
    const randomIndex = Math.floor(Math.random() * samplePrompts.length);
    const randomPrompt = samplePrompts[randomIndex];

    if (randomPrompt === prompt) return getRandomPrompt(prompt) as string;

    return randomPrompt;
};
