import React from 'react';

export type FormatParams = {
    [key: string]: string | number | React.ReactNode | React.ReactNode[];
}

export const applyKeys= (item: React.ReactNode|React.ReactNode[], index: number): JSX.Element => (
    <React.Fragment key={index}>{item}</React.Fragment>
);

export function getFormattedText(text: string, useFragments=true): React.ReactNode[]|string {
    const formatted= applyFormatting(text);
    if(formatted.length === 1) return formatted[0] as string;
    return formatted.map(useFragments? applyKeys : e=>e);
}

export function applyFormatting(format: string): React.ReactNode[] {
    const res: React.ReactNode[]= [];
    /* eslint-disable-next-line no-constant-condition */
    while(true) {
        if(format.includes('\n')){ // New line
            const index= format.indexOf('\n');
            applyFormatting(format.slice(0, index)).forEach(e=>res.push(e));
            res.push(<br/>);
            format= format.slice(index + 1);
        } 
        else if(/\*\*(.+)\*\*/.test(format)){ // Bold
            const execed= /\*\*(.+)\*\*/.exec(format) as RegExpExecArray;
            applyFormatting(format.slice(0, execed.index)).forEach(e=>res.push(e));
            res.push(<strong>{execed[1]}</strong>);
            format= format.slice(execed.index + execed[1].length+4);
        }
        else break;
    }
    res.push(format);
    return res;
}

export function formatString(format: string, params: FormatParams= {}): React.ReactNode[] {
    const res: React.ReactNode[]= [];
    while(format.includes('{') && format.includes('}')) {
        const execed= /{(\w+)}/.exec(format) as RegExpExecArray;
        applyFormatting(format.slice(0, execed.index)).forEach(e=>res.push(e));
        res.push(params[execed[1]]);
        format= format.slice(execed.index + execed[1].length+2);
    }
    return [...res, ...applyFormatting(format)];
}

// Same as formatString, but for strings which are split in array elements.
export function formatChunkedString<O=React.ReactNode>(format: (string|O)[], params: FormatParams= {}): (O|React.ReactNode)[] {
    const result: (O|React.ReactNode)[]= [];
    for(const chunk of format) {
        if(typeof chunk == 'string') {
            result.push(formatString(chunk, params));
        } else {
            result.push(chunk);
        }
    }
    return result.flat() as (O|React.ReactNode)[];
}

export type PluralMode= 'zero'|'one'|'two'|'few'|'many'|'other';

// Returns 'zero', 'one', 'two', 'few', 'many' or 'other' depending on the number
export function getCountMode(count: number): PluralMode {
    if(count === 0) return 'zero';
    if(count === 1) return 'one';
    if(count === 2) return 'two';
    if(count > 2 && count < 10) return 'few';
    if(count >= 10) return 'many';
    return 'other';
}

export function getPluralString(mode: PluralMode, callback: (mode: PluralMode)=>string): string {
    switch(mode) {
        case 'zero': return callback('zero') || callback('few') || callback('many') || callback('other');
        case 'one': return callback('one') || callback('other');
        case 'two': return callback('two') || callback('few') || callback('many') || callback('other');
        case 'few': return callback('few') || callback('many') || callback('other');
        case 'many': return callback('many') || callback('other');
        case 'other': return callback('other');
    }
}
