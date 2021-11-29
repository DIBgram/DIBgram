import React from 'react';
import __ from '../../../language-pack/language-pack';
import TdApi from '../../../TdWeb/td_api';
import ConfirmDialog from '../../../ui/dialog/confirm-dialog';
import { addDialog } from '../../../ui/dialog/dialogs';
import LinkButton from '../../../ui/elements/link-button';
import './entities.scss';

export default function compileEntities(text: TdApi.td_formattedText): React.ReactNode {
    let last= 0;
    const res: React.ReactNode[]= [];
    /* eslint-disable-next-line no-constant-condition */
    for(const entity of text.entities) {
        res.push(text.text.substr(last, entity.offset-last));
        res.push(getEntityJsx(text.text, entity));
        last= entity.offset + entity.length;
    }
    res.push(text.text.substr(last));
    return res;
}

function getEntityJsx(text: string, entity: TdApi.td_textEntity) {
    const innerText= text.substr(entity.offset, entity.length);

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
            return <pre><code>{innerText}</code></pre>;
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