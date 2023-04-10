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
