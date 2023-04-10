import { ReactNode, useReducer, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

import { StoreContext } from './storeContext';
import { INodeApi, IStore, IUser } from '~/interfaces';
import { Loader } from '~/components';
import { storeReducer, EStoreAction } from './storeReducer';
import { authApi, userApi } from '~/services/apis';
import { StorageKeys } from '~/constants';
import useAlert from '~/components/custom/alert';

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
    const {Alert, showAlert} = useAlert()

    const [store, dispatch] = useReducer(storeReducer, INIT_STATE);
    const [loading, setLoading] = useState(true);

    const setUser = (user: IUser) => {
        dispatch({ type: EStoreAction.SET_USER, payload: user });
    };

    useEffect(() => {
        // auth.signOut();

        const authHandle = auth.onIdTokenChanged(async (user: any) => {
            if (user?.uid) {
                const { email, uid, accessToken } = user;

                await authApi.login(accessToken);
                const getUser = await userApi.getUserByEmail(email);

                const { _id, name, picture } = getUser.data;
                setUser({ _id, email, name, picture, uid });
            } else {
                setUser(INIT_USER);
            }
            setLoading(false);
        });

        return () => authHandle();
    }, [auth]);

    return <StoreContext.Provider value={{ store, setUser, showAlert }}>{<>{children} <Alert/></>}</StoreContext.Provider>;
};
