import React from 'react';
import clsx from 'clsx';
import styles from '~/styles/Button.module.css';
import DotSpinner from './dotSpinner';

interface Props {
    text: string;
    outline?: boolean | null;
    status?: 'ACTIVE' | 'LOADING' | 'DISABLE';
    className?: string | null;
    onClick?: () => void;
    children?: React.ReactNode;
}

const Button: React.FC<Props> = ({ text = '', outline = false, status = 'ACTIVE', className = '', onClick }) => {
    return (
        <div
            onClick={onClick}
            className={clsx(
                {
                    [styles.button]: true,
                    [styles.outline]: outline,
                    [styles.disable]: status == 'DISABLE',
                    [styles.loading]: status == 'LOADING',
                },
                `${className}`,
            )}
        >
            <p>{text}</p>
            {status == 'LOADING' && <DotSpinner className="ml-2 text-white w-6 h-6" />}
        </div>
    );
};

export default Button;
