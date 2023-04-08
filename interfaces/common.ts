import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { IUser } from './user';

interface LayoutProps {
    children: ReactNode;
}

type NextPageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

interface IStore {
    user: IUser;
}

export type { LayoutProps, NextPageWithLayout, AppPropsWithLayout, IStore };
