import React from 'react';
import __ from '../../../../language-pack/language-pack';
import TdLib from '../../../../TdWeb/tdlib';
import TdApi from '../../../../TdWeb/td_api';
import { OutlineButton } from '../../../../ui/elements/outline-button';
import chatStore, { getChatNoCache } from '../../../chat-store';
import compileEntities from '../entities';
import { MessageBubble } from '../message-containers';
import './sponsored.scss';

type SponsoredMessageProps= {
    message: TdApi.SponsoredMessage;
    chat_id: number;
    viewport: React.RefObject<HTMLElement>;
}

export default function SponsoredMessage({message, chat_id, viewport}: SponsoredMessageProps): JSX.Element {
    const chat= getChatNoCache(message.sponsor_chat_id) as TdApi.chat;

    const [viewed, setViewed]= React.useState(false);
    const ref= React.useRef<HTMLDivElement>(null);
    let observer: IntersectionObserver|null= null;
    React.useEffect(() => {
        if (ref.current) {
            observer= new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    if(!viewed) {
                        observer?.disconnect();
                        TdLib.sendQuery({
                            '@type': 'viewMessages',
                            chat_id: chat_id,
                            // sponsor_message_id: message.message_id,
                            message_ids: [message.message_id]
                        });
                    }
                    setViewed(true);
                }
            }, {
                root: viewport.current,
                threshold: 1,
            });
            observer.observe(ref.current);
        }
        return () => {
            observer?.disconnect();
            setViewed(false);
        };
    }, [chat_id, message.message_id]);

    return (
        <div className="history-message sponsored">
            <MessageBubble>
                <div className="message-sender">
                    <span className="color_0">{chat.title}</span>
                </div>
                <div className="content">
                    <div ref={ref}>
                        {compileEntities((message.content as TdApi.messageText).text)}
                    </div>
                    <div className="footer">
                        <div className="text"> {__('lng_sponsored')}</div>
                    </div>
                    <div className="after"/>
                    <OutlineButton onClick={()=> {
                        chatStore.dispatch({
                            type: 'SELECT_CHAT',
                            chat_id: message.sponsor_chat_id
                        });
                    }}>
                        {chat.type['@type']== 'chatTypePrivate' ? __('lng_view_button_bot') : __('lng_view_button_channel')}
                    </OutlineButton>
                </div>
            </MessageBubble>
        </div>
    );
}