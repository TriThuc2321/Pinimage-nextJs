import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Bars3Icon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useStore } from '~/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { Logged, NotLogged } from './components';
import grey from '~/assets/grey.png';
import { getAuth } from 'firebase/auth';
import { authApi } from '~/services/apis';
import { createQueryStringFactory } from '~/utils';

export default function Header() {
    const { getUser } = useStore();
    const router = useRouter();
    const user = getUser();
    const auth = getAuth();
    const searchParams = useSearchParams();

    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const createQueryString = createQueryStringFactory(searchParams);

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

    return (
        <div
            className={clsx([
                { ['bg-second']: scrollPosition > 100 },
                'fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-3 z-50',
            ])}
        >
            <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()}>
                <Image
                    className="w-12 h-12"
                    src={grey}
                    loader={() => 'https://res.cloudinary.com/dpz16u0pa/image/upload/v1678937447/Untitled-2_ecjiqz.png'}
                    alt="Logo"
                />
                <p className="font-bold text-xl">
                    <span className="text-white">PIN</span>IMAGE
                </p>
            </div>

            <div className="absolute left-0 right-0 flex justify-center -z-10">
                <div className="hidden tablet:flex tracking-widest text-white">
                    {menus.map((item) => (
                        <Link href={item.pathname} key={item.id}>
                            <p className={clsx({ ['text-primary font-bold']: pathname === item.pathname }, 'mx-4')}>
                                {item.title}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            {user._id ? <Logged /> : <NotLogged />}

            {user._id && (
                <div className="flex tablet:hidden">
                    <Bars3Icon width={32} height={32} onClick={() => setShowMenu(!showMenu)} />
                    {showMenu && (
                        <div className="bg-blear08 z-50 fixed top-20 left-0 right-0 bottom-0 text-white px-4">
                            {menus.map((item) => (
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

                            <p
                                className={clsx(
                                    // { ['text-primary font-bold']: pathname === item.pathname },
                                    'my-5 mx-5 text-4xl justify-end text-center',
                                )}
                                onClick={() => {
                                    router.push(pathname + '?' + createQueryString('popup', 'new-post'));
                                    setShowMenu(false);
                                }}
                            >
                                New post
                            </p>

                            <div className=" w-full h-0.5 bg-primary" />

                            <p
                                className="my-5 mx-5 text-4xl justify-end text-center"
                                onClick={() => {
                                    auth.signOut();
                                    authApi.logout();
                                }}
                            >
                                Logout
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
