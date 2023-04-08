import { LayoutProps } from '~/interfaces';
import * as React from 'react';

export function EmptyLayout({ children }: LayoutProps) {
    return <>{children}</>;
}
