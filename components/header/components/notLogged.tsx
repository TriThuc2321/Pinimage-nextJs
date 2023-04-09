import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '~/components/custom';

export default function NotLogged() {
    const router = useRouter();
    return (
        <>
            <Button className="mx-2" text="Login" onClick={() => router.push('/login')} />
        </>
    );
}
