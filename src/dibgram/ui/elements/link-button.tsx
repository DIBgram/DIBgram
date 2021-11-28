import React from 'react';
import './link-button.scss';

type LinkButtonProps= {
    href?: string;
    children: React.ReactNode;
    onClick?: (e: React.SyntheticEvent) => void;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

/**
 * Renders a button looking like a link.
 */
export default function LinkButton({href, children, onClick, ...rest}: LinkButtonProps): JSX.Element {
    const click= href ? ()=> window.open(href) : onClick;
    return (
        <button className="link-button" onClick={click} {...rest}>{children}</button>
    );
}
