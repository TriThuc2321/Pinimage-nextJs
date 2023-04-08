import { ReactNode, useReducer, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

import { StoreContext } from './storeContext';
import { IStore, IUser } from '@/interfaces';
import { Loader } from '@/components';
import { storeReducer, EStoreAction } from './storeReducer';
import { getUserByEmail } from '@/services/apis';

interface ProviderProps {
    children: ReactNode;
}

const INIT_USER: IUser = {
    _id: '',
    uid: '',
    name: '',
    picture: '',
    email: '',
};

const INIT_STATE: IStore = {
    user: INIT_USER,
};

export const StoreProvider = ({ children }: ProviderProps) => {
    const auth = getAuth();

    const [store, dispatch] = useReducer(storeReducer, INIT_STATE);
    const [loading, setLoading] = useState(true);

    const setUser = (user: IUser) => {
        dispatch({ type: EStoreAction.SET_USER, payload: user });
    };

    useEffect(() => {
        // auth.signOut();
        const authHandle = auth.onIdTokenChanged(async (user: any) => {
            if (user?.uid) {
                if (user.accessToken !== localStorage.getItem('accessToken')) {
                    localStorage.setItem('accessToken', user.accessToken);
                    window.location.reload();
                }
                const { email } = user;
                const getUser = await getUserByEmail(email);
                setUser(getUser.data);
            } else {
                setUser(INIT_USER);
                localStorage.clear();
            }
            setLoading(false);
        });

        return () => authHandle();
    }, [auth]);

    return <StoreContext.Provider value={{ store, setUser }}>{loading ? <Loader /> : children}</StoreContext.Provider>;
};
