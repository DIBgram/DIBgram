import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { stackoverflowDark, stackoverflowLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './syntax-highlighting.scss';

type SyntaxHighlightingProps = {
    children: string;
    lang: string;
    dark: boolean;
}

export default function SyntaxHighLighting({children, lang, dark}: SyntaxHighlightingProps): JSX.Element {
    return (
        <SyntaxHighlighter language={lang} style={dark? stackoverflowDark : stackoverflowLight} CodeTag={(({children})=> <React.Fragment>{children}</React.Fragment>) as typeof React.Fragment}>
            {children}
        </SyntaxHighlighter>
    );
}