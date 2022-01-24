import React from 'react';
import __, { __fmt } from '../../../../language-pack/language-pack';
import TdLib from '../../../../TdWeb/tdlib';
import TdApi from '../../../../TdWeb/td_api';
import { messageStore } from '../../../message-store';
import MessaagePinnedMessage from '../../message-pinned-message';
import { SenderFullName } from '../../message-summary-noicon';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';

export default function MessagePinMessage({message, chat, users}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messagePinMessage') {
        throw new Error('Message is not messagePinMessage');
    }

    const [pinnedMessage, setPinnedMessage] = React.useState<TdApi.td_message|0|-1>(0);

    function handleMessageQuery(result: TdApi.td_message|TdApi.td_error) {
        if(result['@type'] == 'error') {
            setPinnedMessage(-1);
        }
        else {
            setPinnedMessage(result);
        }
    }

    React.useEffect(() => {
        message.content = message.content as TdApi.td_messagePinMessage;
        if(pinnedMessage == 0) {
            const pmessage= messageStore.getState().messages[message.content.message_id];
            if(pmessage) {
                setPinnedMessage(pmessage);
            } else {
                TdLib.sendQuery({
                    '@type': 'getMessage',
                    chat_id: chat.id,
                    message_id: message.content.message_id
                }).then(handleMessageQuery, handleMessageQuery);
            }
        }
    }, []);

    return pinnedMessage == 0 ? (
        <ServiceMessage>
            {__fmt('lng_action_pinned_media', {
                from: <SenderFullName message={message} chat={chat} users={users}/>,
                media: __('lng_contacts_loading')
            })}
        </ServiceMessage>
    ) : pinnedMessage == -1 ? (
        <ServiceMessage>
            {__fmt('lng_action_pinned_media', {
                from: <SenderFullName message={message} chat={chat} users={users}/>,
                media: __('lng_deleted_message')
            })}
        </ServiceMessage>
    ) : (
        <ServiceMessage>
            <MessaagePinnedMessage message={pinnedMessage} from={<SenderFullName message={message} chat={chat} users={users}/>}/>
        </ServiceMessage>
    );
}