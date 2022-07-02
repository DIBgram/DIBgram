import React from 'react';
import __ from '../../../language-pack/language-pack';
import TdApi from '../../../TdWeb/td_api';
import ConfirmDialog from '../../../ui/dialog/confirm-dialog';
import { addDialog } from '../../../ui/dialog/dialogs';
import LinkButton from '../../../ui/elements/link-button';
import dibgramMods from "../../../dibgram-mods";
import './entities.scss';
import { getThemeIsDark, themes, themeStore, ThemeStoreState } from '../../../ui/themes/theme';
import { connect, Provider } from 'react-redux';

function maybeDeleteNewLines(str: string, doIt: boolean) {
    return doIt? str.replace(/(\n|\r|\r\n|\n\r)/g, ' ') : str;
}

export default function compileEntities(text: TdApi.formattedText, singleLine= false): React.ReactNode {
    let last= 0;
    const res: React.ReactNode[]= [];
    /* eslint-disable-next-line no-constant-condition */
    for(const entity of text.entities) {
        res.push(maybeDeleteNewLines(text.text.slice(last, entity.offset), singleLine));
        res.push(getEntityJsx(text.text, entity, singleLine));
        last= entity.offset + entity.length;
    }
    res.push(maybeDeleteNewLines(text.text.slice(last), singleLine));
    return res;
}

function getEntityJsx(text: string, entity: TdApi.textEntity, singleLine=false) {
    const innerText= maybeDeleteNewLines(text.slice(entity.offset, entity.offset + entity.length), singleLine);

    if(singleLine) {
        switch(entity.type['@type']) {
            case 'textEntityTypeEmailAddress':
                return <span className='part-1'>{innerText}</span>;
            case 'textEntityTypeSpoiler':
                return <SpoilerEntity>{innerText}</SpoilerEntity>;
            default:
                return innerText;
        }
    } else {
        switch(entity.type['@type']) {
            // case 'textEntityTypeBankCardNumber':
            case 'textEntityTypeBold':
                return <strong>{innerText}</strong>;
            case 'textEntityTypeBotCommand':
                return <LinkButton>{innerText}</LinkButton>; //TODO: Send bot command when clicked
            case 'textEntityTypeCashtag':
                return <LinkButton>{innerText}</LinkButton>; //TODO: Search for cashtag when clicked
            case 'textEntityTypeCode':
                return <code>{innerText}</code>;
            case 'textEntityTypeEmailAddress':
                return <LinkButton href={'mailto:'+innerText}>{innerText}</LinkButton>;
            case 'textEntityTypeHashtag':
                return <LinkButton>{innerText}</LinkButton>; //TODO: Search for hashtag when clicked
            case 'textEntityTypeItalic':
                return <em>{innerText}</em>;
            // case 'textEntityTypeMediaTimestamp':
            //     return <LinkButton>{innerText}</LinkButton>; //TODO: Open media when clicked
            case 'textEntityTypeMention':
                return <LinkButton>{innerText}</LinkButton>; //TODO: Open user when clicked
            case 'textEntityTypeMentionName':
                return <LinkButton>{innerText}</LinkButton>; //TODO: Open user when clicked
            // case 'textEntityTypePhoneNumber'
            case 'textEntityTypePre':
                return <pre>{innerText}</pre>;
            case 'textEntityTypePreCode':
                return <TextEntityPreCode language={entity.type.language}>{innerText}</TextEntityPreCode>;
            case 'textEntityTypeSpoiler':
                return <SpoilerEntity>{innerText}</SpoilerEntity>;
            case 'textEntityTypeStrikethrough':
                return <del>{innerText}</del>;
            case 'textEntityTypeTextUrl': {
                const url= entity.type.url;
                return (
                    <LinkButton title={url} onClick={()=> {
                        addDialog('textEntityTypeTextUrl_confirm_dialog',
                            <ConfirmDialog id="textEntityTypeTextUrl_confirm_dialog"
                                OKButtonText={__('lng_open_link')}
                                onOK={()=> window.open(url)}
                                largeFont={true}>

                                {__('lng_open_this_link')} <br/>
                                <br/>
                                {url}
                            </ConfirmDialog>
                        );
                    }}>
                        {innerText}
                    </LinkButton>
                );
            }
            case 'textEntityTypeUnderline':
                return <u>{innerText}</u>;
            case 'textEntityTypeUrl':
                if (!/^https?:\/\//i.test(innerText))
                    return <LinkButton href={'https://'+innerText}>{innerText}</LinkButton>;
                return <LinkButton href={innerText}>{innerText}</LinkButton>;
            default:
                return innerText;
        }
    }
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
function SpoilerEntity(props: {[key:string]:any}): JSX.Element {
    const [viewed, setViewed]= React.useState(false);

    return (
        <span className={'spoiler' + (viewed?' viewed' : '')} onClick={()=>setViewed(true)} {...props}/>
    );
}

type TextEntityPreCodeProps= {
    children: string;
    language: string;
}

function TextEntityPreCode({children, language}: TextEntityPreCodeProps): JSX.Element {
    if(dibgramMods.chat_enableSyntaxHighlighting) {
        // Lazy-load syntax-highlighting.js
        
        const SyntaxHighLighting= React.lazy(()=> import('./syntax-highlighting'));
        return (
            <React.Suspense fallback={<pre>{children}</pre>}>
                <Provider store={themeStore}>
                    <SyntaxHighlight lang={language} SyntaxHighLighting={SyntaxHighLighting}>
                        {children}
                    </SyntaxHighlight>
                </Provider>
            </React.Suspense>
        );
    } else {
        return <pre>{children}</pre>;
    }
}

type SyntaxHighlightProps= {
    lang: string;
    children: string;
    SyntaxHighLighting: React.ComponentType<{
        children: string,
        lang: string,
        dark: boolean
    }>
};

const SyntaxHighlight= (connect<{dark:boolean}, unknown, SyntaxHighlightProps, ThemeStoreState>(
    (state: ThemeStoreState)=> ({dark: themes[state.theme].isDark.value=='true'}),
)(function SyntaxHighlight({lang, children, dark, SyntaxHighLighting}: SyntaxHighlightProps & {dark:boolean}): JSX.Element {
    return (
        <SyntaxHighLighting lang={lang} dark={dark}>
            {children}
        </SyntaxHighLighting>
    );
}) as React.ComponentType<SyntaxHighlightProps>);
    