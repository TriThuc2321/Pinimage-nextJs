import { IStore, IUser } from '~/interfaces';

enum EStoreAction {
    SET_USER = 'SET_USER',
}

type STORE_ACTION = { type: EStoreAction; payload: any };

const storeReducer = (state: IStore, action: STORE_ACTION): IStore => {
    switch (action.type) {
        case EStoreAction.SET_USER:
            return {
                ...state,
                user: action.payload as IUser,
            };
        default:
            return state;
    }
};

export { storeReducer, EStoreAction };
