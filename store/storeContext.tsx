import { createContext } from 'react';
import { IStore, IUser, IAlertProps } from '~/interfaces';

export type StoreContextPros = {
    store: IStore;
    setUser: (user: IUser) => void;
    showAlert: (alertProps: IAlertProps) => void;
};
export const StoreContext = createContext<StoreContextPros>({} as StoreContextPros);
