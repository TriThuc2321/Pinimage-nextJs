import { LayoutProps } from '~/interfaces';
import * as React from 'react';
import Header from '~/components/header';

export function MainLayout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
