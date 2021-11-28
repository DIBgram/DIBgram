import React from 'react';

export const applyKeys= (item, index) => (<React.Fragment key={index}>{item}</React.Fragment>);

export function getFormattedText(text, useFragments=true){
    const formatted= applyFormatting(text);
    if(formatted.length === 1) return formatted[0];
    return formatted.map(useFragments? applyKeys : e=>e);
}

export function applyFormatting(format) {
    var res= [];
    /* eslint-disable-next-line no-constant-condition */
    while(true) {
        if(format.includes('\n')){ // New line
            const index= format.indexOf('\n');
            applyFormatting(format.substr(0, index)).forEach(e=>res.push(e));
            res.push(<br/>);
            format= format.substr(index + 1);
        } 
        else if(format.includes('**')){ // Bold
            const execed= /\*\*(.+)\*\*/.exec(format);
            applyFormatting(format.substr(0, execed.index)).forEach(e=>res.push(e));
            res.push(<strong>{execed[1]}</strong>);
            format= format.substr(execed.index + execed[1].length+4);
        }
        else break;
    }
    res.push(format);
    return res;
}

export function formatString(format, params= {}) {
    var res= [];
    while(format.includes('{')){
        const execed= /{(\w+)}/.exec(format);
        applyFormatting(format.substr(0, execed.index)).forEach(e=>res.push(e));
        res.push(params[execed[1]]);
        format= format.substr(execed.index + execed[1].length+2);
    }
    return [...res, ...applyFormatting(format)];
}

// Same as formatString, but for strings which are split in array elements.
export function formatChunkedString(format, params= {}) {
    var result= [];
    for(const chunk of format) {
        if(typeof chunk == 'string') {
            result.push(formatString(chunk, params));
        }
    }
    return result.flat();
}

// Returns 'zero', 'one', 'two', 'few', 'many' or 'other' depending on the number
export function getCountMode(count) {
    if(count === 0) return 'zero';
    if(count === 1) return 'one';
    if(count === 2) return 'two';
    if(count > 2 && count < 10) return 'few';
    if(count >= 10) return 'many';
    return 'other';
}

export function getPluralString(mode, callback) {
    switch(mode) {
        case 'zero': return callback('zero') || callback('few') || callback('many') || callback('other');
        case 'one': return callback('one') || callback('other');
        case 'two': return callback('two') || callback('few') || callback('many') || callback('other');
        case 'few': return callback('few') || callback('many') || callback('other');
        case 'many': return callback('many') || callback('other');
        case 'other': return callback('other');
    }
}
