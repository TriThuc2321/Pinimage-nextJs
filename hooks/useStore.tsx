import { useContext } from 'react';
import { StoreContext } from '../store/storeContext';

export const useStore = () => {
    const { store, setUser, showAlert } = useContext(StoreContext);

    return {
        store,
        getUser: () => store.user,
        setUser,
        showAlert,
    };
};
