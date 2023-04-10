import { getAuth } from 'firebase/auth';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { Button } from '~/components/custom';
import { useStore } from '~/hooks';
import { authApi } from '~/services/apis';
import { createQueryStringFactory } from '~/utils';

export default function Logged() {
    const router = useRouter();
    const auth = getAuth();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const { getUser } = useStore();

    const { name, picture } = getUser();
    const createQueryString = createQueryStringFactory(searchParams);

    return (
        <div className="hidden tablet:flex items-center">
            {/* <p className="font-bold mr-4">{name}</p> */}
            <img className="h-8 w-8 rounded-full mr-4" src={picture || ''} alt="Avatar" />
            <Button
                className="mr-4"
                text="New"
                onClick={() => router.push(pathname + '?' + createQueryString('popup', 'new-post'))}
            />
            <Button
                outline
                text="Logout"
                onClick={() => {
                    auth.signOut();
                    authApi.logout();
                }}
            />
        </div>
    );
}
