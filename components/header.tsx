import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import { usePathname } from 'next/navigation';
import { ArrowRightOnRectangleIcon, Bars3Icon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Button } from '~/components/custom';
import { useState, useEffect, useCallback } from 'react';
import { useStore } from '~/hooks';
import Link from 'next/link';

export default function Header() {
    const router = useRouter();
    const { getUser } = useStore();
    const user = getUser();
    const auth = getAuth();

    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState(false);
    const searchParams = useSearchParams();

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => setShowMenu(false), [pathname]);

    const menus = [
        {
            id: '0',
            title: 'Home',
            pathname: '/',
        },
        {
            id: '1',
            title: 'Favorite',
            pathname: '/favorite',
        },
        {
            id: '2',
            title: 'My post',
            pathname: '/my-post',
        },
    ];

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );
    return (
        <div
            className={clsx([
                { ['bg-second']: scrollPosition > 100 },
                'fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-3 z-50',
            ])}
        >
            <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()}>
                <img
                    className="w-12 h-12"
                    src="https://res.cloudinary.com/dpz16u0pa/image/upload/v1678937447/Untitled-2_ecjiqz.png"
                />
                <p className="font-bold text-xl">
                    <span className="text-white">PIN</span>IMAGE
                </p>
            </div>

            <div className="hidden tablet:flex tracking-widest text-white">
                {menus.map((item) => (
                    <Link href={item.pathname} key={item.id}>
                        <p className={clsx({ ['text-primary font-bold']: pathname === item.pathname }, 'mx-4')}>
                            {item.title}
                        </p>
                    </Link>
                ))}
            </div>

            {user._id ? (
                <div className="hidden tablet:flex items-center">
                    <Button
                        className="mx-2"
                        text="New post"
                        onClick={() => router.push(pathname + '?' + createQueryString('popup', 'new-post'))}
                    />
                    <Button className="mx-2" outline text="Logout" onClick={() => auth.signOut()} />
                </div>
            ) : (
                <Button className="mx-2" text="Login" onClick={() => router.push('/login')} />
            )}
            <div className="flex tablet:hidden">
                <Bars3Icon width={32} height={32} onClick={() => setShowMenu(!showMenu)} />
                {showMenu && (
                    <div className="bg-blear08 z-50 fixed top-20 left-0 right-0 bottom-0 text-white px-4">
                        {[...menus, { id: '3', title: 'New post', pathname: '/new-post' }].map((item) => (
                            <Link href={item.pathname} key={item.id}>
                                <p
                                    className={clsx(
                                        { ['text-primary font-bold']: pathname === item.pathname },
                                        'my-5 mx-5 text-4xl justify-end text-center',
                                    )}
                                >
                                    {item.title}
                                </p>
                            </Link>
                        ))}

                        <div className=" w-full h-0.5 bg-primary" />
                        <Link href="/login">
                            <p className="my-5 mx-5 text-4xl justify-end text-center">Login</p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
