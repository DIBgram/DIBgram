import React from 'react';
import englishLanguagePack from './english.json';

function getFormattedText(text){
    const formatted= applyFormatting(text);
    if(formatted.length === 1) return formatted[0];
    return formatted;
}

export default function __(key) {
    const languagePack = englishLanguagePack;
    return getFormattedText(languagePack[key]);
}

function applyFormatting(format) {
    var res= [];
    /* eslint-disable-next-line no-constant-condition */
    while(true) {
        if(format.includes('\n')){
            const index= format.indexOf('\n');
            res.push(format.substr(0, index));
            res.push(<br/>);
            format= format.substr(index + 1);
        } 
        else if(/\*\*\w+\*\*/.test(format)){
            const execed= /\*\*(\w+)\*\*/.exec(format);
            applyFormatting(format.substr(0, execed.index)).forEach(e=>res.push(e));
            res.push(<strong>{execed[1]}</strong>);
            format= format.substr(execed.index + execed[1].length+2);
        }
        else break;
    }
    return [...res, format];
}

export function formatString(format, params= {}) {
    var res= [];
    while(/{\w+}/.test(format)){
        const execed= /{(\w+)}/.exec(format);
        if(!params[execed[1]]) continue;
        applyFormatting(format.substr(0, execed.index)).forEach(e=>res.push(e));
        res.push(params[execed[1]]);
        format= format.substr(execed.index + execed[1].length+2);
    }
    return [...res, ...applyFormatting(format)];
}

export function __fmt(name, params) {
    const formatted= formatString(__(name), params);
    if(formatted.length === 1) return formatted[0];
    return formatted;
}