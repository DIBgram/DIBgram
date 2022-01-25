import React from 'react';
import './heading.scss';

export default function Heading({children}: {children: React.ReactNode|React.ReactNode[]}): JSX.Element {
    return <div className="tool-strip-heading">{children}</div>;
}