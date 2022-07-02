import React from 'react';
import TdLib from '../../../../TdWeb/tdlib';
import TdApi from '../../../../TdWeb/td_api';
import { messageStore } from '../../../message-store';
import { ServiceMessageIncludingYou } from '../../message-summary-noicon';
import { MessageProps } from '../message';
import { ServiceMessage } from '../message-containers';

export default function MessageGameScore({message, chat, users}: MessageProps): JSX.Element {
    if(message.content['@type'] != 'messageGameScore') {
        throw new Error('Message is not messageGameScore');
    }

    const [gameMessage, setGameMessage] = React.useState<TdApi.message|0|-1>(0);

    function handleMessageQuery(result: TdApi.message|TdApi.error) {
        if(result['@type'] == 'error') {
            setGameMessage(-1);
        }
        else {
            setGameMessage(result);
        }
    }

    React.useEffect(() => {
        message.content = message.content as TdApi.messageGameScore;
        if(gameMessage == 0) {
            const gmessage= messageStore.getState().messages[message.content.game_message_id];
            if(gmessage) {
                setGameMessage(gmessage);
            } else {
                TdLib.sendQuery({
                    '@type': 'getMessage',
                    chat_id: chat.id,
                    message_id: message.content.game_message_id
                }).then(handleMessageQuery, handleMessageQuery);
            }
        }
    }, []);

    return typeof gameMessage == 'number'? (
        <ServiceMessage>
            <ServiceMessageIncludingYou 
                message={message} chat={chat} users={users}
                lpString="lng_action_game_score_no_game"
                lpString_you="lng_action_game_you_scored_no_game"
                count={message.content.score}/>
        </ServiceMessage>
    ) : (
        <ServiceMessage>
            <ServiceMessageIncludingYou 
                message={message} chat={chat} users={users}
                lpString="lng_action_game_score"
                lpString_you="lng_action_game_you_scored"
                count={message.content.score}
                params={{game: (gameMessage.content as TdApi.messageGame).game.title}}/>
        </ServiceMessage>
    );
}